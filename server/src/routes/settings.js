import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getGlobalSettings, updateGlobalSettings } from '../services/settings.js';

const router = Router();

// Public endpoint so the frontend can fetch the exchange rate
router.get('/global', (req, res) => {
  res.json({ status: 'success', data: getGlobalSettings() });
});

router.post('/global', requireAuth, (req, res) => {
  const updated = updateGlobalSettings(req.body);
  res.json({ status: 'success', data: updated });
});

export default router;
