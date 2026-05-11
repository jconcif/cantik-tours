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

    // 3. Fetch related bookings by phone number (if exists)
    let relatedBookings = [];
    if (booking.client_phone) {
      const { data: rb } = await supabase.from('bookings')
        .select('id, reference, booking_date, tour_title')
        .eq('client_phone', booking.client_phone)
        .order('booking_date', { ascending: true });
      if (rb) {
        relatedBookings = rb;
      }
    }

    res.json({
      status: 'success',
      data: {
        ...booking,
        drivers: driverRes.data
      },
      payments: paymentsRes.data || [],
      charges: chargesRes.data || [],
      related: relatedBookings,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Public: Check-in passengers
router.post('/checkin', async (req, res) => {
  try {
    const { ref, passengers } = req.body;
    if (!ref || !passengers) return res.status(400).json({ status: 'error', message: 'Datos incompletos' });
    
    const idOrRef = ref.replace('CT-', '');
    let query = supabase.from('bookings').select('id, extras');
    if (/^\d+$/.test(idOrRef)) query = query.or(`id.eq.${idOrRef},reference.eq.${idOrRef}`);
    else query = query.eq('reference', idOrRef);

    const { data: booking, error: bError } = await query.maybeSingle();
    if (bError || !booking) throw new Error('Reserva no encontrada');

    let extrasObj = {};
    try {
      if (typeof booking.extras === 'string' && booking.extras.trim().startsWith('{')) {
        extrasObj = JSON.parse(booking.extras);
      } else if (typeof booking.extras === 'object' && booking.extras !== null) {
        extrasObj = booking.extras;
      } else if (typeof booking.extras === 'string' && booking.extras.trim()) {
        extrasObj = { notes: booking.extras }; // migrate old text
      }
    } catch(e) {}

    extrasObj.passengers = passengers;

    const { error: uError } = await supabase.from('bookings')
      .update({ extras: JSON.stringify(extrasObj) }) // Store as stringified JSON to be safe with varied column types
      .eq('id', booking.id);
      
    if (uError) throw uError;
    
    res.json({ status: 'success' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default router;
