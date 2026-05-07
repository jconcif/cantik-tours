import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const { data, error } = await supabase.from('bookings').select('id, client_name').limit(5);
  console.log('Bookings:', data);
  if (error) console.error('Error:', error);
}
test();
