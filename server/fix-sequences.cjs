require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function fix() {
  const tables = ['coupons', 'bookings', 'payments', 'reviews', 'expenses', 'charges'];
  for (const table of tables) {
    const { error } = await supabase.rpc('query', { 
        sql_string: `SELECT setval(pg_get_serial_sequence('${table}', 'id'), COALESCE((SELECT MAX(id) FROM ${table}), 1), true);` 
    });
    // supabase REST doesn't allow raw SQL easily without a pre-existing RPC.
    // Let's just create an RPC function if it doesn't exist.
  }
}
fix();
