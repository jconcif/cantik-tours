import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env');
  process.exit(1);
}

console.log(`🔌 Supabase: URL=${supabaseUrl}, Key starts with ${supabaseKey.substring(0, 10)}...`);

export const supabase = createClient(supabaseUrl, supabaseKey);
