import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

/**
 * POST /api/auth/login
 * Body: { password: string }
 * Returns: { status: 'success', token: string }
 */
router.post('/login', async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ status: 'error', message: 'Contraseña requerida' });
  }

  const hash = process.env.ADMIN_PASSWORD_HASH;
  const plainTextPassword = process.env.ADMIN_PASSWORD;

  if (!hash && !plainTextPassword) {
    return res.status(500).json({ status: 'error', message: 'Auth no configurada en el servidor (faltan variables)' });
  }

  let valid = false;
  if (hash) {
    valid = await bcrypt.compare(password, hash);
  } else {
    // Keep the trim() fix as it helps with common copy-paste issues
    valid = (password.trim() === plainTextPassword.trim());
  }

  if (!valid) {
    return res.status(401).json({ status: 'error', message: 'Contraseña incorrecta' });
  }

  const token = jwt.sign(
    { role: 'admin', iat: Math.floor(Date.now() / 1000) },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('ctk_jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.json({ status: 'success' });
});

/**
 * POST /api/auth/verify
 * Verifies if a token is still valid.
 */
router.post('/verify', (req, res) => {
  const token = req.cookies?.ctk_jwt;
  if (!token) {
    return res.status(401).json({ status: 'error', valid: false });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ status: 'success', valid: true });
  } catch {
    res.status(401).json({ status: 'error', valid: false });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('ctk_jwt');
  res.json({ status: 'success' });
});

export default router;
