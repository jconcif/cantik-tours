import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../server/.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function run() {
  try {
    const { data, error } = await supabase.from('settings').select('*').limit(1);
    if (error) {
      console.log('Error querying settings table:', error.message);
    } else {
      console.log('Successfully queried settings table. Data:', data);
    }
  } catch (e) {
    console.error('Exception:', e);
  }
}
run();
