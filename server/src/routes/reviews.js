import { Router } from 'express';
import { supabase } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { optionalAuth } from '../middleware/auth.js';
import { validateBody, sanitize } from '../middleware/validate.js';

const router = Router();

// ── Public: Get approved reviews (for website display) ──
router.get('/public', async (req, res) => {
  try {
    const { tour_id } = req.query;

    let query = supabase
      .from('reviews')
      .select('*')
      .eq('aprobado', 1)
      .order('fecha', { ascending: false });

    if (tour_id) {
      query = query.ilike('tour_id', `%${tour_id}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    res.json({ status: 'success', data: data || [] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ── Public: Submit a review ──
router.post(
  '/public',
  sanitize({ name: 200, comment: 2000, ig_user: 100, driver_name: 100 }),
  validateBody(['name', 'comment']),
  async (req, res) => {
    try {
      const {
        name, tour_type, driver_name, find_us, comment, ig_user,
        country, auth,
        rating_booking, rating_logistics, rating_route,
        rating_driver, rating_vehicle, rating_price,
      } = req.body;

      // Calculate average rating
      const ratingValues = [rating_booking, rating_logistics, rating_route, rating_driver, rating_vehicle, rating_price]
        .map(Number)
        .filter((v) => !isNaN(v) && v >= 1 && v <= 5);
      const avgRating = ratingValues.length > 0
        ? Math.round(ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length)
        : 5;

      const { data, error } = await supabase.from('reviews').insert({
        nombre: name,
        tour_id: tour_type || '',
        driver_name: driver_name || '',
        comentario: comment,
        ig_user: ig_user || '',
        pais: country || '',
        puntuacion: avgRating,
        autorizacion_fotos: auth ? 1 : 0,
        aprobado: 0, // Always pending approval
        rating_booking: Number(rating_booking) || 5,
        rating_logistics: Number(rating_logistics) || 5,
        rating_route: Number(rating_route) || 5,
        rating_driver: Number(rating_driver) || 5,
        rating_vehicle: Number(rating_vehicle) || 5,
        rating_price: Number(rating_price) || 5,
      }).select().single();

      if (error) throw error;
      res.json({ status: 'success', data });
    } catch (err) {
      console.error('Error saving review:', err);
      res.status(500).json({ status: 'error', message: 'Error guardando la reseña' });
    }
  }
);

// ── Admin CRUD ──

router.get('/', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('fecha', { ascending: false });
    if (error) throw error;
    res.json({ status: 'success', data: data || [] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase.from('reviews').insert(req.body).select().single();
    if (error) throw error;
    res.json({ status: 'success', data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('reviews').update(req.body).eq('id', id).select().single();
    if (error) throw error;
    res.json({ status: 'success', data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (error) throw error;
    res.json({ status: 'success' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default router;
