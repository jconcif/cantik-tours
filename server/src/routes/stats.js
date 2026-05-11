import { Router } from 'express';
import { supabase } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    // Revenue from active bookings (Expected Revenue)
    const { data: bookings } = await supabase
      .from('bookings')
      .select('id, total_price, payment_status');

    const activeStatuses = ['payment_confirmed', 'payment_received', 'verifying_payment', 'reserved', 'confirmed', 'in_progress', 'completed'];
    const activeBookings = (bookings || []).filter(b => activeStatuses.includes(b.payment_status));
    const expectedRevenue = activeBookings.reduce((s, b) => s + Number(b.total_price || 0), 0);

    // Total payments actually received
    const { data: payments } = await supabase.from('payments').select('amount');
    const totalPayments = (payments || []).reduce((s, p) => s + Number(p.amount || 0), 0);

    // Total pending collection (Fuga de capital)
    const pendingCollection = expectedRevenue - totalPayments;

    // Total expenses
    const { data: expenses } = await supabase.from('expenses').select('amount');
    const totalExpenses = (expenses || []).reduce((s, e) => s + Number(e.amount || 0), 0);

    // Driver performance from reviews
    const { data: reviews } = await supabase
      .from('reviews')
      .select('driver_name, puntuacion, rating_driver, rating_vehicle, rating_booking, rating_logistics, rating_route, rating_price')
      .eq('aprobado', 1);

    const driverMap = {};
    (reviews || []).forEach(r => {
      const name = r.driver_name || 'Sin asignar';
      if (!driverMap[name]) driverMap[name] = { ratings: [], vehicles: [], total: 0 };
      driverMap[name].ratings.push(Number(r.puntuacion) || 5);
      driverMap[name].vehicles.push(Number(r.rating_vehicle) || 5);
      driverMap[name].total++;
    });

    const driverPerformance = Object.entries(driverMap).map(([name, d]) => ({
      driver_name: name,
      avg_rating: (d.ratings.reduce((a, b) => a + b, 0) / d.ratings.length).toFixed(1),
      avg_vehicle: (d.vehicles.reduce((a, b) => a + b, 0) / d.vehicles.length).toFixed(1),
      total_reviews: d.total,
    }));

    // Service quality averages
    const qualityFields = ['rating_booking', 'rating_logistics', 'rating_route', 'rating_driver', 'rating_vehicle', 'rating_price'];
    const serviceQuality = {};
    qualityFields.forEach(field => {
      const vals = (reviews || []).map(r => Number(r[field])).filter(v => !isNaN(v) && v > 0);
      serviceQuality[field.replace('rating_', '')] = vals.length > 0
        ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)
        : '0.0';
    });

    res.json({
      status: 'success',
      data: {
        revenue: totalPayments,
        expected_revenue: expectedRevenue,
        pending_collection: pendingCollection > 0 ? pendingCollection : 0,
        expenses: totalExpenses,
        profit: totalPayments - totalExpenses,
        total_bookings: (bookings || []).length,
        paid_bookings: activeBookings.length,
        driver_performance: driverPerformance,
        service_quality: serviceQuality,
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default router;
