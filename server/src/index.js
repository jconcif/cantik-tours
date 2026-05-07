import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// Routes
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/bookings.js';
import reviewRoutes from './routes/reviews.js';
import driverRoutes from './routes/drivers.js';
import couponRoutes from './routes/coupons.js';
import paymentRoutes from './routes/payments.js';
import expenseRoutes from './routes/expenses.js';
import chargeRoutes from './routes/charges.js';
import availabilityRoutes from './routes/availability.js';
import itineraryRoutes from './routes/itinerary.js';
import statsRoutes from './routes/stats.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://cantiktours.com',
  'https://www.cantiktours.com',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));

// ── Rate limiting (basic) ──
const rateLimit = new Map();
app.use((req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const window = 60000; // 1 minute
  const maxRequests = 100;

  if (!rateLimit.has(ip)) rateLimit.set(ip, []);
  const timestamps = rateLimit.get(ip).filter(t => now - t < window);
  timestamps.push(now);
  rateLimit.set(ip, timestamps);

  if (timestamps.length > maxRequests) {
    return res.status(429).json({ status: 'error', message: 'Demasiadas solicitudes. Espera un momento.' });
  }
  next();
});

// Clean up rate limit map periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimit.entries()) {
    const fresh = timestamps.filter(t => now - t < 60000);
    if (fresh.length === 0) rateLimit.delete(ip);
    else rateLimit.set(ip, fresh);
  }
}, 300000);

// ── Root route ──
app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Cantik Tours API is Live', version: '1.0.0' });
});

// ── Routes ──
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/charges', chargeRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/stats', statsRoutes);

// ── Health check ──
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── 404 ──
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Endpoint no encontrado' });
});

// ── Error handler ──
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`🚀 Cantik Tours API running on port ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/api/health`);
});

// Force restart for env load
