import { Router } from 'express';
import { supabase } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// ── Expenses ──

router.get('/:bookingId', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('booking_id', req.params.bookingId)
      .order('expense_date', { ascending: false });
    if (error) throw error;
    res.json({ status: 'success', data: data || [] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase.from('expenses').insert(req.body).select().single();
    if (error) throw error;
    res.json({ status: 'success', data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('expenses').update(req.body).eq('id', id).select().single();
    if (error) throw error;
    res.json({ status: 'success', data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('expenses').delete().eq('id', id);
    if (error) throw error;
    res.json({ status: 'success' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default router;
