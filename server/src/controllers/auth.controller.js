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

    // Build cookie options for production vs local dev
    // - For cross-site cookie (deployed frontend <> backend) we use sameSite: 'none' and secure: true
    // - For local dev (http), sameSite 'lax' and secure false so cookie can be set on localhost
    const isProd = process.env.NODE_ENV === 'production';

    const cookieOptions = {
      httpOnly: true,
      secure: isProd,               // must be true for HTTPS (Render). false for local dev (localhost)
      sameSite: isProd ? 'none' : 'lax', // none for cross-site in prod, lax works for local dev
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',                    // ensure cookie is sent to root path
      // DO NOT set domain here unless you are 100% sure of its value.
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
  // Clear cookie with same attributes (match path & sameSite/domain if used)
  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie(cookieName, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
  });
  res.json({ message: 'Logged out' });
};
