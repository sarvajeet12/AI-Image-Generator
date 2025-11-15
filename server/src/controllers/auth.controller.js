import passport from 'passport';
import User from '../models/User.js';
import { signToken, cookieName } from '../services/jwt.js';

export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleCallback = (req, res) => {
  try {
    if (!req.user) {
      console.error('googleCallback: req.user is undefined');
      return res.redirect(`${process.env.CLIENT_URL || '/'}?error=auth_failed`);
    }

    const token = signToken(req.user);

    // Build cookie options. Decide secure/sameSite based on the client URL
    // - If the client uses HTTPS (CLIENT_URL starts with https) we must set
    //   `secure: true` and `sameSite: 'none'` so cross-site cookies are allowed.
    // - For local HTTP development we use `secure: false` and `sameSite: 'lax'` so
    //   the browser will accept the cookie on localhost.
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const clientIsHttps = clientUrl.startsWith('https');

    const cookieOptions = {
      httpOnly: true,
      secure: clientIsHttps,
      sameSite: clientIsHttps ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    };

    res.cookie(cookieName, token, cookieOptions);

    const redirectUrl = process.env.CLIENT_URL || '/';
    console.log('googleCallback: set cookie, redirecting to', redirectUrl);
    return res.redirect(redirectUrl);
  } catch (err) {
    console.error('googleCallback error', err);
    return res.redirect(`${process.env.CLIENT_URL || '/'}?error=server_error`);
  }
};

export const logout = async (req, res) => {
  // Clear cookie with the same attributes used when setting it.
  // Match secure/sameSite based on CLIENT_URL protocol so the browser
  // actually removes the cookie in both dev (http) and prod (https).
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const clientIsHttps = clientUrl.startsWith('https');
  res.clearCookie(cookieName, {
    httpOnly: true,
    secure: clientIsHttps,
    sameSite: clientIsHttps ? 'none' : 'lax',
    path: '/',
  });
  res.json({ message: 'Logged out' });
};
