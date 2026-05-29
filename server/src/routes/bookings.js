import { Router } from 'express';
import { supabase } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { validateBody, sanitize } from '../middleware/validate.js';
import { sendClientConfirmation, sendAdminAlert, sendReceiptUploadedAlert } from '../services/email.js';
import fs from 'fs';
import path from 'path';

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
        is_paid, coupon, itinerary, reference, client_phone, client_email
      } = req.body;

      // Server-side price validation would go here
      // For now, we accept the price but flag it for admin review

      const initialExtras = {
        logs: [{
          timestamp: new Date().toISOString(),
          text: `Reserva creada e ingresada por el cliente desde la web pública. Estado inicial: ${is_paid ? 'reserved' : 'requested'}.`
        }],
        passengers: [],
        client_email: client_email || ''
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          tour_id,
          tour_title: tour_title || tour_id,
          client_name,
          client_phone: client_phone || '',
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
          reference: reference || null,
          extras: JSON.stringify(initialExtras)
        })
        .select('*')
        .single();

      if (error) throw error;

      // Send emails asynchronously (don't block the HTTP response)
      const bookingForEmail = {
        ...data,
        client_email: client_email || '',
        extras: initialExtras
      };

      sendClientConfirmation(bookingForEmail).catch(err => {
        console.error('Failed to send client confirmation email:', err);
      });

      sendAdminAlert(bookingForEmail).catch(err => {
        console.error('Failed to send admin alert email:', err);
      });

      res.json({ status: 'success', id: data.id });
    } catch (err) {
      console.error('Error saving booking:', err);
      res.status(500).json({ status: 'error', message: 'Error guardando la reserva' });
    }
  }
);

// ── Public: Upload payment receipt for a booking ──
router.post(
  '/:id/receipt',
  validateBody(['filename', 'fileData']),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { filename, fileData } = req.body;

      // Extract raw base64 data by removing any data URL scheme prefix
      const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let base64Content = fileData;
      if (matches && matches.length === 3) {
        base64Content = matches[2];
      }

      const buffer = Buffer.from(base64Content, 'base64');
      
      // Setup file structure
      const uploadDir = path.join(process.cwd(), 'uploads', 'receipts');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Create unique filename to prevent overwrites
      const cleanFilename = `${id}_${Date.now()}_${filename.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
      const filePath = path.join(uploadDir, cleanFilename);

      // Write file
      fs.writeFileSync(filePath, buffer);
      const relativeUrl = `/uploads/receipts/${cleanFilename}`;

      // Get current booking to update its extras
      const { data: currentBooking, error: fetchErr } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchErr || !currentBooking) {
        throw new Error(fetchErr?.message || 'Booking not found');
      }

      // Update extras
      let extrasObj = {};
      try {
        extrasObj = typeof currentBooking.extras === 'string' 
          ? JSON.parse(currentBooking.extras) 
          : (currentBooking.extras || {});
      } catch (e) {
        extrasObj = {};
      }

      extrasObj.receipt_url = relativeUrl;
      if (!extrasObj.receipts) {
        extrasObj.receipts = [];
      }
      extrasObj.receipts.push({
        url: relativeUrl,
        filename: filename,
        timestamp: new Date().toISOString()
      });

      if (!extrasObj.logs) extrasObj.logs = [];
      extrasObj.logs.push({
        timestamp: new Date().toISOString(),
        text: `Comprobante de pago subido por el cliente (${filename}).`
      });

      // Update booking status
      const { data: updatedBooking, error: updateErr } = await supabase
        .from('bookings')
        .update({
          payment_status: 'verifying_payment',
          extras: JSON.stringify(extrasObj)
        })
        .eq('id', id)
        .select('*')
        .single();

      if (updateErr) throw updateErr;

      // Trigger admin email alert asynchronously
      sendReceiptUploadedAlert(updatedBooking, relativeUrl).catch(err => {
        console.error('Failed to send receipt upload email notification:', err);
      });

      res.json({ status: 'success', data: updatedBooking });
    } catch (err) {
      console.error('Error uploading payment receipt:', err);
      res.status(500).json({ status: 'error', message: 'Error al subir el comprobante de pago.' });
    }
  }
);

// ── Admin CRUD ──

router.get('/', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, total_paid:payments(amount), total_expenses:expenses(amount), total_charges:charges(amount)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Flatten aggregates
    const bookings = (data || []).map((b) => ({
      ...b,
      total_paid: (b.total_paid || []).reduce((s, p) => s + Number(p.amount), 0),
      total_expenses: (b.total_expenses || []).reduce((s, e) => s + Number(e.amount), 0),
      total_charges: (b.total_charges || []).reduce((s, c) => s + Number(c.amount), 0),
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
      'extras', 'is_paid', 'payment_type', 'notes'
    ];

    const updateData = {};
    allowedColumns.forEach(col => {
      if (req.body[col] !== undefined) {
        updateData[col] = req.body[col];
      }
    });

    if (updateData.extras !== undefined && typeof updateData.extras === 'object' && updateData.extras !== null) {
      updateData.extras = JSON.stringify(updateData.extras);
    }
    
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
