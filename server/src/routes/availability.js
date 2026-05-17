import { Router } from 'express';
import { supabase } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('booking_date, payment_status')
      .not('payment_status', 'in', '("cancelled","refunded")');
    if (error) throw error;
    const counts = {};
    (data || []).forEach((b) => {
      const d = b.booking_date;
      if (d) {
        if (b.payment_status === 'blocked') {
          counts[d] = 999;
        } else {
          counts[d] = (counts[d] || 0) + 1;
        }
      }
    });
    res.json({ status: 'success', data: counts });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.post('/toggle', requireAuth, async (req, res) => {
  const { date } = req.body;
  if (!date) return res.status(400).json({ status: 'error', message: 'Date required' });
  
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('id')
      .eq('booking_date', date)
      .eq('payment_status', 'blocked')
      .limit(1);
      
    if (error) throw error;
    
    if (data && data.length > 0) {
      await supabase.from('bookings').delete().eq('id', data[0].id);
      return res.json({ status: 'success', message: 'Fecha desbloqueada', isBlocked: false });
    } else {
      await supabase.from('bookings').insert({
        booking_date: date,
        client_name: 'FECHA BLOQUEADA',
        tour_title: 'SISTEMA',
        payment_status: 'blocked',
        total_price: 0,
        pax: 0
      });
      return res.json({ status: 'success', message: 'Fecha bloqueada', isBlocked: true });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default router;
