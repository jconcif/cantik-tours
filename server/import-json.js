import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function importData() {
  console.log('🚀 Iniciando importación de datos desde data.json...');

  try {
    const filePath = join(__dirname, 'data.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const rawData = JSON.parse(fileData);
    
    // Convert phpMyAdmin export array to a structured object
    const data = {};
    if (Array.isArray(rawData)) {
      rawData.forEach(item => {
        if (item.type === 'table' && item.name && item.data) {
          data[item.name] = item.data;
        }
      });
    } else {
      Object.assign(data, rawData);
    }

    // 1. MIGRAR DRIVERS
    if (data.drivers && data.drivers.length > 0) {
      console.log('⏳ Importando Drivers...');
      const { error } = await supabase.from('drivers').upsert(
        data.drivers.map(d => ({
          id: d.id,
          name: d.name,
          phone: d.phone,
          car_model: d.car_model,
          created_at: d.created_at || new Date().toISOString()
        }))
      );
      if (error) throw error;
      console.log(`✅ ${data.drivers.length} Drivers importados.`);
    }

    // 2. MIGRAR REVIEWS
    if (data.reviews && data.reviews.length > 0) {
      console.log('⏳ Importando Reviews...');
      const { error } = await supabase.from('reviews').upsert(
        data.reviews.map(r => ({
          id: r.id,
          nombre: r.nombre,
          tour_id: r.tour_id,
          driver_name: r.driver_name,
          comentario: r.comentario,
          comentario_en: r.comentario_en,
          ig_user: r.ig_user,
          pais: r.pais,
          puntuacion: r.estrellas || r.puntuacion || 5,
          autorizacion_fotos: r.autorizacion_fotos == 1 ? 1 : 0,
          aprobado: r.aprobado == 1 ? 1 : 0,
          fecha: r.fecha || new Date().toISOString()
        }))
      );
      if (error) throw error;
      console.log(`✅ ${data.reviews.length} Reviews importadas.`);
    }

    // 3. MIGRAR BOOKINGS
    if (data.bookings && data.bookings.length > 0) {
      console.log('⏳ Importando Reservas...');
      const { error } = await supabase.from('bookings').upsert(
        data.bookings.map(b => ({
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
          is_paid: b.is_paid == 1 ? 1 : 0,
          payment_status: b.payment_status || 'requested',
          coupon: b.coupon,
          itinerary: b.itinerary,
          driver_id: b.driver_id || null,
          notes: b.notes,
          created_at: b.created_at || new Date().toISOString()
        }))
      );
      if (error) throw error;
      console.log(`✅ ${data.bookings.length} Reservas importadas.`);
    }

    // 4. MIGRAR COUPONS
    if (data.coupons && data.coupons.length > 0) {
      console.log('⏳ Importando Cupones...');
      const { error } = await supabase.from('coupons').upsert(
        data.coupons.map(c => ({
          id: c.id,
          code: c.code,
          discount_type: c.discount_type,
          discount_value: c.discount_value,
          max_uses: c.max_uses,
          times_used: c.times_used,
          active: c.active == 1 ? 1 : 0,
          created_at: c.created_at || new Date().toISOString()
        }))
      );
      if (error) throw error;
      console.log(`✅ ${data.coupons.length} Cupones importados.`);
    }

    console.log('\n🎉 ¡IMPORTACIÓN COMPLETADA CON ÉXITO! 🎉');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('\n❌ ERROR: No se encontró el archivo "data.json". Por favor, créalo en la carpeta "server" con tus datos.');
    } else {
      console.error('\n❌ ERROR EN LA IMPORTACIÓN:', err);
    }
  }
}

importData();
