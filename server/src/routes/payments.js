import { Router } from 'express';
import { supabase } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Helper to check and update booking payment status based on total paid vs total price
const checkAndUpdateBookingStatus = async (booking_id) => {
  try {
    const [bRes, pRes] = await Promise.all([
      supabase.from('bookings').select('total_price, payment_status').eq('id', booking_id).single(),
      supabase.from('payments').select('amount').eq('booking_id', booking_id)
    ]);
    
    if (bRes.data && pRes.data) {
      const totalPrice = parseFloat(bRes.data.total_price || 0);
      const totalPaid = pRes.data.reduce((sum, p) => sum + Number(p.amount || 0), 0);
      const currentStatus = bRes.data.payment_status;

      if (totalPaid >= totalPrice) {
        // If fully paid, change pending statuses to payment_received
        if (['requested', 'pending_payment', 'verifying_payment'].includes(currentStatus)) {
          await supabase.from('bookings').update({ payment_status: 'payment_received' }).eq('id', booking_id);
          console.log(`Booking ${booking_id} status updated to payment_received (fully paid: ${totalPaid}/${totalPrice})`);
        }
      } else {
        // If there's still a balance but status was marked as received, revert it back to pending
        if (currentStatus === 'payment_received') {
          await supabase.from('bookings').update({ payment_status: 'pending_payment' }).eq('id', booking_id);
          console.log(`Booking ${booking_id} status reverted to pending_payment (partially paid: ${totalPaid}/${totalPrice})`);
        }
      }
    }
  } catch (err) {
    console.error('Error in checkAndUpdateBookingStatus helper:', err);
  }
};

// ── Payments ──

router.get('/:bookingId', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('booking_id', req.params.bookingId)
      .order('payment_date', { ascending: false });
    if (error) throw error;
    res.json({ status: 'success', data: data || [] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase.from('payments').insert(req.body).select().single();
    if (error) throw error;

    if (data && data.booking_id) {
      await checkAndUpdateBookingStatus(data.booking_id);
    }

    res.json({ status: 'success', data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('payments').update(req.body).eq('id', id).select().single();
    if (error) throw error;

    if (data && data.booking_id) {
      await checkAndUpdateBookingStatus(data.booking_id);
    }

    res.json({ status: 'success', data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Fetch the payment before deleting it to get the booking_id
    const { data: payment } = await supabase.from('payments').select('booking_id').eq('id', id).maybeSingle();

    const { error } = await supabase.from('payments').delete().eq('id', id);
    if (error) throw error;

    if (payment && payment.booking_id) {
      await checkAndUpdateBookingStatus(payment.booking_id);
    }

    res.json({ status: 'success' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});


export default router;
