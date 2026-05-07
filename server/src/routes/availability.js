import { Router } from 'express';
import { supabase } from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('booking_date')
      .not('payment_status', 'in', '("cancelled","refunded")');
    if (error) throw error;
    const counts = {};
    (data || []).forEach((b) => {
      const d = b.booking_date;
      if (d) counts[d] = (counts[d] || 0) + 1;
    });
    res.json({ status: 'success', data: counts });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default router;
