#!/usr/bin/env node
/**
 * Cantik Tours Server — Setup Helper
 *
 * Run: node setup.js
 *
 * This will:
 * 1. Generate a bcrypt hash for your admin password
 * 2. Generate a JWT secret
 * 3. Print a ready-to-use .env file for copy-paste
 */
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = (q) => new Promise((r) => rl.question(q, r));

console.log('\n🔐 Cantik Tours Server — Setup\n');
console.log('This will generate secure credentials for your .env file.\n');

const password = await ask('Enter your admin password: ');
console.log('\n⏳ Generating bcrypt hash (this takes ~2 seconds)...');

const hash = await bcrypt.hash(password, 12);
const jwtSecret = crypto.randomBytes(64).toString('hex');

const supabaseUrl = await ask('\nEnter your Supabase URL (from Supabase > Settings > API): ');
const supabaseKey = await ask('Enter your Supabase SERVICE ROLE key (from same page): ');
const frontendUrl = await ask('Enter your frontend URL (e.g. https://cantiktours.com): ');

rl.close();

const env = `# Supabase
SUPABASE_URL=${supabaseUrl}
SUPABASE_SERVICE_KEY=${supabaseKey}

# Auth
JWT_SECRET=${jwtSecret}
ADMIN_PASSWORD_HASH=${hash}

# CORS
FRONTEND_URL=${frontendUrl}

# Port
PORT=3001
`;

console.log('\n✅ Your .env file content (save this to server/.env):\n');
console.log('─'.repeat(60));
console.log(env);
console.log('─'.repeat(60));
console.log('\n⚠️  IMPORTANT: Keep this file PRIVATE. Never commit .env to git.\n');
console.log('Next steps:');
console.log('  1. Copy the above into server/.env');
console.log('  2. Run the SQL schema: database/supabase_schema.sql in Supabase SQL Editor');
console.log('  3. cd server && npm run dev');
console.log('  4. Test: curl http://localhost:3001/api/health\n');
