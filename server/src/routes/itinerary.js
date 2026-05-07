import { Router } from 'express';
import { supabase } from '../db.js';

const router = Router();

// Public: Get itinerary by booking reference (CT-123)
router.get('/', async (req, res) => {
  try {
    const { ref } = req.query;
    if (!ref) return res.status(400).json({ status: 'error', message: 'Referencia requerida' });

    const idOrRef = ref.replace('CT-', '');

    // Search by reference OR by ID if it's a number
    let query = supabase
      .from('bookings')
      .select('*, drivers(name, phone, car_model)');
    
    if (/^\d+$/.test(idOrRef)) {
      query = query.or(`id.eq.${idOrRef},reference.eq.${idOrRef}`);
    } else {
      query = query.eq('reference', idOrRef);
    }

    const { data: booking, error } = await query.maybeSingle();

    if (error || !booking) {
      return res.status(404).json({ status: 'error', message: 'Reserva no encontrada' });
    }

    const [paymentsRes, chargesRes] = await Promise.all([
      supabase.from('payments').select('*').eq('booking_id', id).order('payment_date', { ascending: false }),
      supabase.from('charges').select('*').eq('booking_id', id).order('charge_date', { ascending: false }),
    ]);

    const result = {
      ...booking,
      driver_name: booking.drivers?.name || null,
      car_model: booking.drivers?.car_model || null,
    };
    delete result.drivers;

    res.json({
      status: 'success',
      data: result,
      payments: paymentsRes.data || [],
      charges: chargesRes.data || [],
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default router;
