import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env from server/.env
dotenv.config({ path: path.resolve('server/.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

console.log('SUPABASE_URL:', supabaseUrl);
console.log('SUPABASE_SERVICE_KEY (prefix):', supabaseKey ? supabaseKey.substring(0, 15) + '...' : 'undefined');

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('\n--- Querying bookings ---');
  const { data: bookings, error: errBookings } = await supabase
    .from('bookings')
    .select('*')
    .limit(5);

  if (errBookings) {
    console.error('Error fetching bookings:', errBookings);
  } else {
    console.log('Bookings found:', bookings.length);
    console.log(bookings);
  }

  console.log('\n--- Querying reviews ---');
  const { data: reviews, error: errReviews } = await supabase
    .from('reviews')
    .select('*')
    .limit(5);

  if (errReviews) {
    console.error('Error fetching reviews:', errReviews);
  } else {
    console.log('Reviews found:', reviews.length);
    console.log(reviews);
  }
}

run();
