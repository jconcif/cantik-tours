import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Testing insert review...');
  const { data, error } = await supabase.from('reviews').insert({
    nombre: 'Test Model Client',
    tour_id: 'ubud_central [CT-Test]',
    driver_name: 'Test Driver',
    comentario: 'This is a test comment that has more than 10 characters to test submission.',
    ig_user: '@test',
    pais: 'es',
    puntuacion: 5,
    rating_booking: 5,
    rating_logistics: 5,
    rating_route: 5,
    rating_driver: 5,
    rating_vehicle: 5,
    rating_price: 5,
    autorizacion_fotos: 0,
    aprobado: 0
  }).select();

  if (error) {
    console.error('Insert error:', error);
  } else {
    console.log('Insert success!', data);
  }
}

run();
