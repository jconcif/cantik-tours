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
  if (!hash) {
    return res.status(500).json({ status: 'error', message: 'Auth no configurada en el servidor' });
  }

  const valid = await bcrypt.compare(password, hash);
  if (!valid) {
    return res.status(401).json({ status: 'error', message: 'Contraseña incorrecta' });
  }

  const token = jwt.sign(
    { role: 'admin', iat: Math.floor(Date.now() / 1000) },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ status: 'success', token });
});

/**
 * POST /api/auth/verify
 * Verifies if a token is still valid.
 */
router.post('/verify', (req, res) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'error', valid: false });
  }

  try {
    jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    res.json({ status: 'success', valid: true });
  } catch {
    res.status(401).json({ status: 'error', valid: false });
  }
});

export default router;
