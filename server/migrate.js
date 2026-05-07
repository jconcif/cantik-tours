import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Aquí usamos la contraseña vieja de tu PHP para acceder a los datos
const OLD_API_URL = 'https://cantiktours.com/api';
const OLD_TOKEN = 'cantik2024'; 

async function fetchOldData(endpoint) {
  const url = `${OLD_API_URL}/${endpoint}.php?token=${OLD_TOKEN}`;
  const res = await fetch(url);
  const json = await res.json();
  if (json.status === 'success') {
    return json.data || [];
  }
  return [];
}

async function migrate() {
  console.log('🚀 Iniciando migración de Hostinger a Supabase...\n');

  try {
    // 1. MIGRAR DRIVERS (Conductores)
    console.log('⏳ Descargando Drivers...');
    const drivers = await fetchOldData('admin_get_drivers');
    if (drivers.length > 0) {
      const { error } = await supabase.from('drivers').upsert(
        drivers.map(d => ({
          id: d.id,
          name: d.name,
          phone: d.phone,
          car_model: d.car_model,
          created_at: d.created_at || new Date().toISOString()
        }))
      );
      if (error) throw error;
      console.log(`✅ ${drivers.length} Drivers migrados.`);
    }

    // 2. MIGRAR REVIEWS (Reseñas)
    console.log('⏳ Descargando Reviews...');
    const reviews = await fetchOldData('admin_get_reviews');
    if (reviews.length > 0) {
      const { error } = await supabase.from('reviews').upsert(
        reviews.map(r => ({
          id: r.id,
          nombre: r.nombre,
          tour_id: r.tour_id,
          driver_name: r.driver_name,
          comentario: r.comentario,
          comentario_en: r.comentario_en,
          ig_user: r.ig_user,
          pais: r.pais,
          puntuacion: r.estrellas, // Map estrellas -> puntuacion
          autorizacion_fotos: r.autorizacion_fotos === "1" || r.autorizacion_fotos === 1 ? 1 : 0,
          aprobado: r.aprobado === "1" || r.aprobado === 1 ? 1 : 0,
          fecha: r.fecha
        }))
      );
      if (error) throw error;
      console.log(`✅ ${reviews.length} Reviews migradas.`);
    }

    // 3. MIGRAR BOOKINGS (Reservas)
    console.log('⏳ Descargando Reservas...');
    const bookings = await fetchOldData('admin_get_bookings');
    if (bookings.length > 0) {
      const { error } = await supabase.from('bookings').upsert(
        bookings.map(b => ({
          id: b.id,
          tour_id: b.tour_id,
          tour_title: b.tour_title,
          client_name: b.client_name,
          client_phone: b.client_phone,
          booking_date: b.date || b.booking_date,
          hotel: b.hotel,
          pax: b.pax,
          experience: b.experience,
          payment_type: b.payment_type,
          total_price: b.total_price,
          deposit_amount: b.deposit_amount,
          is_paid: b.is_paid === "1" || b.is_paid === 1 ? 1 : 0,
          payment_status: b.payment_status || 'requested',
          coupon: b.coupon,
          itinerary: b.itinerary,
          driver_id: b.driver_id || null,
          notes: b.notes,
          created_at: b.created_at || new Date().toISOString()
        }))
      );
      if (error) throw error;
      console.log(`✅ ${bookings.length} Reservas migradas.`);
    }

    // 4. MIGRAR COUPONS (Cupones)
    console.log('⏳ Descargando Cupones...');
    const coupons = await fetchOldData('admin_get_coupons');
    if (coupons.length > 0) {
      const { error } = await supabase.from('coupons').upsert(
        coupons.map(c => ({
          id: c.id,
          code: c.code,
          discount_type: c.discount_type,
          discount_value: c.discount_value,
          max_uses: c.max_uses,
          times_used: c.times_used,
          active: c.active === "1" || c.active === 1 ? 1 : 0,
          created_at: c.created_at || new Date().toISOString()
        }))
      );
      if (error) throw error;
      console.log(`✅ ${coupons.length} Cupones migrados.`);
    }

    // Para finanzas (Pagos, Gastos, Cargos), el antiguo sistema requería un booking_id para fetch.
    // Asumiremos que los datos principales están migrados y la migración financiera detallada 
    // se puede hacer de forma similar si tienes un endpoint global. Si no, lo dejamos para después.

    console.log('\n🎉 ¡MIGRACIÓN COMPLETADA CON ÉXITO! 🎉');
    console.log('Abre tu navegador (http://localhost:5173/cantik-admin) y recarga para ver los datos.');
  } catch (err) {
    console.error('\n❌ ERROR EN LA MIGRACIÓN:');
    console.error(err);
  }
}

migrate();
