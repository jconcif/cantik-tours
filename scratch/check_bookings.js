import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://aripnjsbtiesmqzrwaez.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaXBuanNidGllc21xenJ3YWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMDQ3NzcsImV4cCI6MjA5MzY4MDc3N30.1ApwoEBZiKfo3VBZ8ui_VRxCk5n19C0qsOmNBr5ss-I");

async function test() {
  const { data, error } = await supabase.from('bookings').select('*');
  console.log('Bookings Count:', data ? data.length : 0);
  if (data && data.length > 0) {
    console.log('Keys of first booking:', Object.keys(data[0]));
    console.log('First booking details:', data[0]);
  }
  if (error) console.error('Error:', error);
}
test();
