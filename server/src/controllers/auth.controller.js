import passport from 'passport';
import User from '../models/User.js';
import { signToken, cookieName } from '../services/jwt.js';

export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleCallback = (req, res) => {
  // User is attached to req.user by passport
  const token = signToken(req.user);
  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  const redirectUrl = process.env.CLIENT_URL || '/';
  res.redirect(redirectUrl);
};

export const logout = async (req, res) => {
  res.clearCookie(cookieName);
  res.json({ message: 'Logged out' });
};
