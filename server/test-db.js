import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function check() {
  const { data, error } = await supabase.from('payments').select('*').order('created_at', { ascending: false }).limit(5);
  console.log('Payments:', data);
  const { data: bData } = await supabase.from('bookings').select('id, reference, client_name').order('created_at', { ascending: false }).limit(5);
  console.log('Recent Bookings:', bData);
}
check();
