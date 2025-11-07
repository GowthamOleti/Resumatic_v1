import express from 'express';
import passport from 'passport';
import { configurePassport } from '../config/passport.js';
import { register, login, refresh, logout } from '../controllers/auth.controller.js';

configurePassport();

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // passport strategy returns { user, accessT, refreshT } as req.user
    const { user, accessT, refreshT } = req.user || {};
    if (refreshT) {
      res.cookie('refreshToken', refreshT, { httpOnly: true, sameSite: 'lax' });
    }
    // Redirect to CORS_ORIGIN (may be "*", so frontend should handle it)
    const redirectBase = process.env.CORS_ORIGIN === '*' ? '/' : process.env.CORS_ORIGIN;
    return res.redirect(`${redirectBase}/auth/success?token=${accessT}`);
  }
);

export default router;