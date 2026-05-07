import { Router } from 'express';
import { supabase } from '../db.js';

const router = Router();

// Public: Get itinerary by booking reference (CT-123)
router.get('/', async (req, res) => {
  try {
    const { ref } = req.query;
    if (!ref) return res.status(400).json({ status: 'error', message: 'Referencia requerida' });

    const idOrRef = ref.replace('CT-', '');

    // 1. Fetch the booking
    let query = supabase.from('bookings').select('*');
    
    if (/^\d+$/.test(idOrRef)) {
      query = query.or(`id.eq.${idOrRef},reference.eq.${idOrRef}`);
    } else {
      query = query.eq('reference', idOrRef);
    }

    const { data: booking, error: bError } = await query.maybeSingle();

    if (bError) throw bError;
    if (!booking) return res.status(404).json({ status: 'error', message: 'Reserva no encontrada' });

    // 2. Fetch related data in parallel
    const [paymentsRes, chargesRes, driverRes] = await Promise.all([
      supabase.from('payments').select('*').eq('booking_id', booking.id),
      supabase.from('charges').select('*').eq('booking_id', booking.id),
      booking.driver_id ? supabase.from('drivers').select('*').eq('id', booking.driver_id).maybeSingle() : Promise.resolve({ data: null })
    ]);

    res.json({
      status: 'success',
      data: {
        ...booking,
        drivers: driverRes.data
      },
      payments: paymentsRes.data || [],
      charges: chargesRes.data || [],
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default router;
