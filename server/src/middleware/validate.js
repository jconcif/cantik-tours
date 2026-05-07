/**
 * Simple request body validation middleware.
 * @param {string[]} requiredFields - Array of field names that must be present and non-empty.
 */
export const validateBody = (requiredFields) => (req, res, next) => {
  const missing = requiredFields.filter(
    (field) => req.body[field] === undefined || req.body[field] === null || req.body[field] === ''
  );

  if (missing.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: `Campos requeridos: ${missing.join(', ')}`,
    });
  }

  next();
};

/**
 * Sanitize string fields: trim whitespace, limit length.
 */
export const sanitize = (maxLengths = {}) => (req, res, next) => {
  for (const [key, value] of Object.entries(req.body)) {
    if (typeof value === 'string') {
      let cleaned = value.trim();
      if (maxLengths[key]) {
        cleaned = cleaned.slice(0, maxLengths[key]);
      }
      req.body[key] = cleaned;
    }
  }
  next();
};

/**
 * Validate that a numeric field is within a range.
 */
export const validateNumericRange = (field, min, max) => (req, res, next) => {
  const val = Number(req.body[field]);
  if (isNaN(val) || val < min || val > max) {
    return res.status(400).json({
      status: 'error',
      message: `${field} debe estar entre ${min} y ${max}`,
    });
  }
  req.body[field] = val;
  next();
};
