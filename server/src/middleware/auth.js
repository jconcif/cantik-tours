import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware: Verifies JWT from Authorization header.
 * Sets req.admin = true if valid.
 */
export const requireAuth = (req, res, next) => {
  let token = req.cookies?.ctk_jwt;
  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Token de acceso requerido' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.admin = true;
    req.tokenPayload = payload;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ status: 'error', message: 'Token expirado. Inicia sesión de nuevo.' });
    }
    return res.status(401).json({ status: 'error', message: 'Token inválido' });
  }
};

/**
 * Optional auth: doesn't block the request if no token, but sets req.admin if valid.
 */
export const optionalAuth = (req, res, next) => {
  let token = req.cookies?.ctk_jwt;
  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.admin = true;
      req.tokenPayload = payload;
    } catch {
      req.admin = false;
    }
  } else {
    req.admin = false;
  }

  next();
};
