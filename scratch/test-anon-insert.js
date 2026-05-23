import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Parse .env manually
const envPath = path.resolve('/Users/javiercontreras/DEV/cantiktours/.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)\s*$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  console.log('Testing anon insert review...');
  const { data, error } = await supabase.from('reviews').insert({
    nombre: 'Test Anon Client',
    tour_id: 'ubud_central [CT-Test-Anon]',
    driver_name: 'Test Driver Anon',
    comentario: 'This is a test comment that has more than 10 characters to test anon submission.',
    ig_user: '@testanon',
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
