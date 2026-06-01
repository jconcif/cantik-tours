import { Router } from 'express';
import { supabase } from '../db.js';

const router = Router();

router.post('/capture', async (req, res) => {
  try {
    const { orderID, bookingRef, amount, currency, payerName, payerEmail } = req.body;
    if (!orderID || !bookingRef) {
      return res.status(400).json({ status: 'error', message: 'Missing orderID or bookingRef' });
    }

    // 1. Obtener la reserva original
    let query = supabase.from('bookings').select('*');
    // Ensure we don't pass strings with letters to id.eq to prevent PostgREST crashes
    const cleanRef = bookingRef.replace(/^CT-?/i, '').replace(/^0+/, '');
    
    if (/^\d+$/.test(cleanRef)) {
      query = query.or(`reference.eq.${cleanRef},id.eq.${cleanRef}`);
    } else {
      query = query.eq('reference', bookingRef);
    }
    const { data: booking, error: bookingError } = await query.single();

    if (bookingError || !booking) {
      throw new Error('Booking not found');
    }

    // 2. Insertar el pago
    const paymentData = {
      booking_id: booking.id,
      amount: amount,
      method: 'PayPal',
      status: 'verified',
      payment_date: new Date().toISOString(),
      notes: `PayPal Order ID: ${orderID}. Payer: ${payerName} (${payerEmail})`
    };

    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert(paymentData)
      .select()
      .single();

    if (paymentError) throw paymentError;

    // 3. Actualizar la reserva a payment_received (si no estaba en un estado final)
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ payment_status: 'payment_received' })
      .eq('id', booking.id);

    if (updateError) throw updateError;

    res.json({ status: 'success', data: payment });
  } catch (err) {
    console.error('PayPal Capture Error:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default router;
