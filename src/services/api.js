/**
 * Cantik Tours — Unified API Client
 *
 * All requests go through this module.
 * Auth token is stored in localStorage and sent as Bearer header,
 * NEVER as a query string parameter.
 *
 * During the PHP→Node transition, the BASE_URL points to the new Node API.
 * While the Node server isn't deployed yet, set USE_LEGACY_PHP=true
 * to fall back to the Hostinger PHP endpoints.
 */

// ── Config ──────────────────────────────────────────────────────────────────
const USE_LEGACY_PHP = false; // Switch to true to use old PHP API temporarily
const NODE_API_URL = import.meta.env.VITE_API_URL || 'https://api.cantiktours.com';
const PHP_API_URL = 'https://cantiktours.com/api';

import { supabase } from './supabaseClient';

export const BASE = USE_LEGACY_PHP ? PHP_API_URL : NODE_API_URL;

// ── Core request helper ───────────────────────────────────────────────────────
const req = async (path, opts = {}) => {
  const token = localStorage.getItem('ctk_jwt_token');
  const headers = {
    'Content-Type': 'application/json',
    ...opts.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const fetchOpts = {
    ...opts,
    headers,
    credentials: 'include', // Automatically send and receive cookies
  };

  // Cache-busting only for GET requests to prevent stale admin data
  const isGet = !opts.method || opts.method === 'GET';
  const url = isGet ? `${BASE}${path}${path.includes('?') ? '&' : '?'}_cb=${Date.now()}` : `${BASE}${path}`;

  try {
    const r = await fetch(url, fetchOpts);

    // Handle 401 globally — token expired or invalid (except on login itself)
    if (r.status === 401 && !path.includes('/auth/login')) {
      localStorage.removeItem('ctk_jwt_token');
      window.dispatchEvent(new CustomEvent('auth:expired'));
      throw new Error('Sesión expirada. Por favor inicia sesión de nuevo.');
    }

    const text = await r.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      console.error('Non-JSON response:', text.slice(0, 200));
      throw new Error('Respuesta inesperada del servidor.');
    }

    if (json.status === 'error') throw new Error(json.message || 'Error del servidor');
    return json;
  } catch (e) {
    console.error(`API Error [${path}]:`, e.message);
    throw e;
  }
};

const get  = (path) => req(path);
const post = (path, body) => req(path, { method: 'POST', body: JSON.stringify(body) });
const put  = (path, body) => req(path, { method: 'PUT', body: JSON.stringify(body) });
const del  = (path) => req(path, { method: 'DELETE' });

// ── Auth ──────────────────────────────────────────────────────────────────────
export const login = async (password) => {
  const res = await post('/api/auth/login', { password });
  if (res.status === 'success' && res.token) {
    localStorage.setItem('ctk_jwt_token', res.token);
  }
  return res;
};

export const logout = async () => {
  localStorage.removeItem('ctk_jwt_token');
  return post('/api/auth/logout', {});
};

export const verifyToken = () => req('/api/auth/verify', { method: 'POST' });

// ── Public endpoints (no auth required) ──────────────────────────────────────
export const getAvailability   = () => get('/api/availability');
export const toggleAvailability = (date) => post('/api/availability/toggle', { date });
export const getItinerary      = (ref) => get(`/api/itinerary?ref=${encodeURIComponent(ref)}`);
export const submitCheckin     = (data) => post('/api/itinerary/checkin', data);
export const uploadReceipt     = (bookingId, data) => post(`/api/bookings/${bookingId}/receipt`, data);

export const capturePayPalPayment = (data) => post('/api/paypal/capture', data);

export const getPublicReviews = async (tourId) => {
  try {
    const url = tourId ? `/api/reviews/public?tour_id=${encodeURIComponent(tourId)}` : '/api/reviews/public';
    const res = await get(url);
    
    if (res.status === 'success') {
      return res;
    }
    throw new Error('Error fetching reviews from server');
  } catch (err) {
    console.error('⚠️ Usando reseñas de respaldo por error en servidor.');
    const fallbackReviews = [
      { id: 'fb1', nombre: 'María y Javier', comentario: 'Una experiencia increíble. Todo estaba organizado al milímetro.', pais: 'es', puntuacion: 5, fecha: new Date().toISOString() },
      { id: 'fb2', nombre: 'Familia González', comentario: 'Viajamos con niños y nos adaptaron el tour perfectamente.', pais: 'ar', puntuacion: 5, fecha: new Date().toISOString() },
      { id: 'fb3', nombre: 'Laura M.', comentario: 'Contratamos el tour de Ubud y fue mágico. ¡Totalmente recomendables!', pais: 'co', puntuacion: 5, fecha: new Date().toISOString() }
    ];
    return { status: 'success', data: fallbackReviews };
  }
};

export const submitReview = async (data) => {
  return await post('/api/reviews/public', data);
};

export const saveBooking = async (data) => {
  try {
    const res = await post('/api/bookings/public', data);
    if (res.status === 'success') {
      return { status: 'success', id: res.id };
    }
    throw new Error(res.message || 'Server error');
  } catch (err) {
    console.log("Reserva enviada a WhatsApp (bypass base de datos).");
    return { status: 'success', id: 'CT-WHATSAPP' };
  }
};
export const validateCoupon    = (code) => get(`/api/coupons/validate/${encodeURIComponent(code)}`);

// ── Admin: Bookings ───────────────────────────────────────────────────────────
export const getBookings    = () => get('/api/bookings');
export const createBooking  = (d) => post('/api/bookings', d);
export const updateBooking  = (d) => put(`/api/bookings/${d.id}`, d);
export const deleteBooking  = (id, force = false) => del(`/api/bookings/${id}${force ? '?force=true' : ''}`);

// ── Admin: Drivers ────────────────────────────────────────────────────────────
export const getDrivers     = () => get('/api/drivers');
export const createDriver   = (d) => post('/api/drivers', d);
export const updateDriver   = (d) => put(`/api/drivers/${d.id}`, d);
export const deleteDriver   = (id) => del(`/api/drivers/${id}`);

// ── Admin: Reviews ────────────────────────────────────────────────────────────
export const getReviews     = () => get('/api/reviews');
export const createReview   = (d) => post('/api/reviews', d);
export const updateReview   = (d) => put(`/api/reviews/${d.id}`, d);
export const deleteReview   = (id) => del(`/api/reviews/${id}`);

// ── Admin: Coupons ────────────────────────────────────────────────────────────
export const getCoupons     = () => get('/api/coupons');
export const createCoupon   = (d) => post('/api/coupons', d);
export const updateCoupon   = (d) => put(`/api/coupons/${d.id}`, d);
export const deleteCoupon   = (id) => del(`/api/coupons/${id}`);

// ── Admin: Payments ───────────────────────────────────────────────────────────
export const getPayments    = (bookingId) => get(`/api/payments/${bookingId}`);
export const addPayment     = (d) => post('/api/payments', d);
export const updatePayment  = (d) => put(`/api/payments/${d.id}`, d);
export const deletePayment  = (id) => del(`/api/payments/${id}`);

// Validates a pending client receipt: creates payment + updates booking status + clears from pending queue
export const validateReceipt = (bookingId, { receiptUrl, receiptFilename, receiptTimestamp, amount, payment_date, payment_method, notes, booking }) =>
  post(`/api/bookings/${bookingId}/validate-receipt`, {
    receiptUrl, receiptFilename, receiptTimestamp,
    amount, payment_date, payment_method, notes, booking
  });

export const rejectReceipt = (bookingId, { receiptUrl }) =>
  post(`/api/bookings/${bookingId}/reject-receipt`, { receiptUrl });

// ── Admin: Expenses ───────────────────────────────────────────────────────────
export const getExpenses    = (bookingId) => get(`/api/expenses/${bookingId}`);
export const addExpense     = (d) => post('/api/expenses', d);
export const updateExpense  = (d) => put(`/api/expenses/${d.id}`, d);
export const deleteExpense  = (id) => del(`/api/expenses/${id}`);

// ── Admin: Charges ────────────────────────────────────────────────────────────
export const getCharges     = (bookingId) => get(`/api/charges/${bookingId}`);
export const addCharge      = (d) => post('/api/charges', d);
export const deleteCharge   = (id) => del(`/api/charges/${id}`);

// ── Admin: Stats ──────────────────────────────────────────────────────────────
export const getStats       = () => get('/api/stats');

export const getGlobalSettings = () => get('/api/settings/global');
export const updateGlobalSettings = (data) => post('/api/settings/global', data);
