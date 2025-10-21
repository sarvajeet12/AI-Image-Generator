import { Router } from 'express';
import passport from 'passport';
import { googleAuth, googleCallback, logout } from '../controllers/auth.controller.js';

const router = Router();

const clientUrl = process.env.CLIENT_URL || '/';

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
// If the user denies consent, redirect back to the frontend with an error query so the client can show a message
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: `${clientUrl}/login?error=access_denied`, session: false }),
    googleCallback
);
router.post('/logout', logout);

export default router;