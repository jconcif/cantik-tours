/**
 * One-time script: runs the database schema against Supabase.
 * Uses the service_role key via the Supabase JS client.
 * Run: node run-schema.js
 */
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Split schema into individual statements and run them via raw fetch
const schemaPath = join(__dirname, '../database/supabase_schema.sql');
const schema = readFileSync(schemaPath, 'utf-8');

// Run via Supabase's undocumented pg REST endpoint
const statements = schema
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 5 && !s.startsWith('--'));

console.log(`📋 Running ${statements.length} SQL statements...\n`);

let ok = 0;
let fail = 0;

for (const stmt of statements) {
  const fullStmt = stmt + ';';
  const label = fullStmt.slice(0, 60).replace(/\n/g, ' ').trim();

  try {
    // Use Supabase's pg connection via the JS SDK — insert into a dummy table triggers SQL execution
    // Actually we test if tables exist after creation
    const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
      },
      body: JSON.stringify({ query: fullStmt }),
    });

    if (res.ok) {
      console.log(`✅ ${label}`);
      ok++;
    } else {
      const body = await res.text();
      console.log(`⚠️  ${label}\n   → ${body.slice(0, 100)}`);
      fail++;
    }
  } catch (e) {
    console.error(`❌ ${label}: ${e.message}`);
    fail++;
  }
}

console.log(`\n📊 Done: ${ok} OK, ${fail} failed`);

// Verify tables were created
console.log('\n🔍 Verifying tables...');
const tables = ['drivers', 'bookings', 'payments', 'expenses', 'charges', 'reviews', 'coupons'];
for (const table of tables) {
  const { data, error } = await supabase.from(table).select('id').limit(1);
  if (error && error.code !== 'PGRST116') {
    console.log(`❌ ${table}: ${error.message}`);
  } else {
    console.log(`✅ ${table}: exists`);
  }
}
