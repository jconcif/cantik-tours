import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getEmailSettings, updateEmailSettings } from '../services/settings.js';

const router = Router();

router.get('/emails', requireAuth, (req, res) => {
  res.json({ status: 'success', data: getEmailSettings() });
});

router.post('/emails', requireAuth, (req, res) => {
  const updated = updateEmailSettings(req.body);
  res.json({ status: 'success', data: updated });
});

export default router;
