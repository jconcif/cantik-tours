import { Router } from 'express';
import { supabase } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase.from('coupons').select('*').order('id', { ascending: false });
    if (error) throw error;
    res.json({ status: 'success', data: data || [] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Public: Validate a coupon code
router.get('/validate/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('active', 1)
      .single();

    if (error || !data) {
      return res.json({ status: 'error', message: 'Cupón no válido' });
    }

    // Check max uses
    if (data.max_uses > 0 && data.times_used >= data.max_uses) {
      return res.json({ status: 'error', message: 'Cupón agotado' });
    }

    res.json({
      status: 'success',
      data: {
        code: data.code,
        discount_type: data.discount_type,
        discount_value: data.discount_value,
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const body = { ...req.body, code: (req.body.code || '').toUpperCase() };
    const { data, error } = await supabase.from('coupons').insert(body).select().single();
    if (error) throw error;
    res.json({ status: 'success', data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('coupons').update(req.body).eq('id', id).select().single();
    if (error) throw error;
    res.json({ status: 'success', data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('coupons').delete().eq('id', id);
    if (error) throw error;
    res.json({ status: 'success' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default router;
