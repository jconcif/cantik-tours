-- ============================================================
-- Cantik Tours — Supabase PostgreSQL Schema
-- ============================================================

-- DRIVERS (primero, porque bookings la referencia)
CREATE TABLE IF NOT EXISTS drivers (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  phone       TEXT DEFAULT '',
  car_model   TEXT DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- BOOKINGS
CREATE TABLE IF NOT EXISTS bookings (
  id              BIGSERIAL PRIMARY KEY,
  tour_id         TEXT NOT NULL DEFAULT '',
  tour_title      TEXT NOT NULL DEFAULT '',
  client_name     TEXT NOT NULL,
  client_phone    TEXT DEFAULT '',
  booking_date    DATE,
  hotel           TEXT DEFAULT '',
  pax             INT DEFAULT 2,
  experience      TEXT DEFAULT 'economy',
  payment_type    TEXT DEFAULT 'full',
  total_price     NUMERIC(10,2) DEFAULT 0,
  deposit_amount  NUMERIC(10,2) DEFAULT 0,
  is_paid         INT DEFAULT 0,
  payment_status  TEXT DEFAULT 'requested',
  coupon          TEXT DEFAULT '',
  itinerary       TEXT DEFAULT '',
  driver_id       BIGINT REFERENCES drivers(id) ON DELETE SET NULL,
  notes           TEXT DEFAULT '',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- PAYMENTS (cobros al cliente)
CREATE TABLE IF NOT EXISTS payments (
  id              BIGSERIAL PRIMARY KEY,
  booking_id      BIGINT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  amount          NUMERIC(10,2) NOT NULL DEFAULT 0,
  payment_date    DATE DEFAULT CURRENT_DATE,
  payment_method  TEXT DEFAULT 'Efectivo',
  notes           TEXT DEFAULT '',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- EXPENSES (gastos del negocio)
CREATE TABLE IF NOT EXISTS expenses (
  id            BIGSERIAL PRIMARY KEY,
  booking_id    BIGINT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  concept       TEXT NOT NULL DEFAULT '',
  amount        NUMERIC(10,2) NOT NULL DEFAULT 0,
  expense_date  DATE DEFAULT CURRENT_DATE,
  category      TEXT DEFAULT 'Otros',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- CHARGES (cargos extra al cliente)
CREATE TABLE IF NOT EXISTS charges (
  id           BIGSERIAL PRIMARY KEY,
  booking_id   BIGINT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  concept      TEXT NOT NULL DEFAULT '',
  amount       NUMERIC(10,2) NOT NULL DEFAULT 0,
  charge_date  DATE DEFAULT CURRENT_DATE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- REVIEWS
CREATE TABLE IF NOT EXISTS reviews (
  id                  BIGSERIAL PRIMARY KEY,
  nombre              TEXT NOT NULL,
  tour_id             TEXT DEFAULT '',
  driver_name         TEXT DEFAULT '',
  comentario          TEXT NOT NULL,
  comentario_en       TEXT DEFAULT '',
  ig_user             TEXT DEFAULT '',
  pais                TEXT DEFAULT '',
  puntuacion          INT DEFAULT 5,
  rating_booking      INT DEFAULT 5,
  rating_logistics    INT DEFAULT 5,
  rating_route        INT DEFAULT 5,
  rating_driver       INT DEFAULT 5,
  rating_vehicle      INT DEFAULT 5,
  rating_price        INT DEFAULT 5,
  autorizacion_fotos  INT DEFAULT 0,
  aprobado            INT DEFAULT 0,
  fecha               TIMESTAMPTZ DEFAULT NOW()
);

-- COUPONS
CREATE TABLE IF NOT EXISTS coupons (
  id              BIGSERIAL PRIMARY KEY,
  code            TEXT NOT NULL UNIQUE,
  discount_type   TEXT NOT NULL DEFAULT 'percent',
  discount_value  NUMERIC(10,2) NOT NULL DEFAULT 10,
  max_uses        INT DEFAULT 0,
  times_used      INT DEFAULT 0,
  active          INT DEFAULT 1,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_bookings_date    ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status  ON bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(aprobado);
CREATE INDEX IF NOT EXISTS idx_reviews_tour     ON reviews(tour_id);
CREATE INDEX IF NOT EXISTS idx_payments_booking ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_expenses_booking ON expenses(booking_id);
CREATE INDEX IF NOT EXISTS idx_charges_booking  ON charges(booking_id);

-- Row Level Security (service_role bypasses RLS automatically)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers  ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE charges  ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews  ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons  ENABLE ROW LEVEL SECURITY;

-- Public: anyone can read approved reviews
CREATE POLICY "Public read approved reviews" ON reviews
  FOR SELECT USING (aprobado = 1);
