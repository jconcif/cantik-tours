import 'dotenv/config';
import { supabase } from './src/db.js';

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
