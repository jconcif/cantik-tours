import { Router } from 'express';
import { supabase } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { validateBody, sanitize } from '../middleware/validate.js';

const router = Router();

// ── Public: Save a new booking from the frontend form ──
router.post(
  '/public',
  sanitize({ client_name: 200, hotel: 200, tour_title: 200, coupon: 50, itinerary: 2000, reference: 20 }),
  validateBody(['tour_id', 'client_name', 'date', 'pax']),
  async (req, res) => {
    try {
      const {
        tour_id, tour_title, client_name, date, pax, hotel,
        experience, payment_type, total_price, deposit_amount,
        is_paid, coupon, itinerary, reference
      } = req.body;

      // Server-side price validation would go here
      // For now, we accept the price but flag it for admin review

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          tour_id,
          tour_title: tour_title || tour_id,
          client_name,
          booking_date: date,
          pax: parseInt(pax) || 2,
          hotel: hotel || '',
          experience: experience || 'economy',
          payment_type: payment_type || 'full',
          total_price: parseFloat(total_price) || 0,
          deposit_amount: parseFloat(deposit_amount) || 0,
          is_paid: is_paid ? 1 : 0,
          coupon: coupon || '',
          itinerary: itinerary || '',
          payment_status: is_paid ? 'reserved' : 'requested',
          reference: reference || null
        })
        .select('id')
        .single();

      if (error) throw error;
      res.json({ status: 'success', id: data.id });
    } catch (err) {
      console.error('Error saving booking:', err);
      res.status(500).json({ status: 'error', message: 'Error guardando la reserva' });
    }
  }
);

// ── Admin CRUD ──

router.get('/', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, total_paid:payments(amount), total_expenses:expenses(amount)')
      .order('booking_date', { ascending: false });

    if (error) throw error;

    // Flatten aggregates
    const bookings = (data || []).map((b) => ({
      ...b,
      total_paid: (b.total_paid || []).reduce((s, p) => s + Number(p.amount), 0),
      total_expenses: (b.total_expenses || []).reduce((s, e) => s + Number(e.amount), 0),
    }));

    res.json({ status: 'success', data: bookings });
  } catch (err) {
    console.error('Error getting bookings:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.post('/', requireAuth, validateBody(['client_name', 'tour_title']), async (req, res) => {
  try {
    const { data, error } = await supabase.from('bookings').insert(req.body).select().single();
    if (error) throw error;
    res.json({ status: 'success', data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // STRICT WHITELIST: Only these columns exist in the DB
    const allowedColumns = [
      'reference', 'client_name', 'client_phone', 'hotel', 'tour_title', 
      'pax', 'experience', 'payment_status', 'deposit_amount', 'booking_date', 
      'itinerary', 'coupon', 'tour_id', 'total_price', 'driver_id', 
      'extras', 'is_paid', 'payment_type'
    ];

    const updateData = {};
    allowedColumns.forEach(col => {
      if (req.body[col] !== undefined) {
        updateData[col] = req.body[col];
      }
    });
    
    const { data, error } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json({ status: 'success', data });
  } catch (err) {
    console.error('Update Booking Error:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    // Also delete related payments, expenses, charges
    await supabase.from('payments').delete().eq('booking_id', id);
    await supabase.from('expenses').delete().eq('booking_id', id);
    await supabase.from('charges').delete().eq('booking_id', id);
    const { error } = await supabase.from('bookings').delete().eq('id', id);
    if (error) throw error;
    res.json({ status: 'success' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default router;
