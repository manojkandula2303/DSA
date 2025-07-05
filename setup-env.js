#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up Supabase environment variables...\n');

const envPath = path.join(__dirname, '.env.local');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local already exists. Please update it manually with your Supabase credentials.');
  console.log('   You need to add:');
  console.log('   https://neflqvroqlhnbhjxsohf.supabase.co');
  console.log('   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lZmxxdnJvcWxobmJoanhzb2hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2ODY3MTMsImV4cCI6MjA2NzI2MjcxM30.tRPplaOWEr8i2GebZfqd5Zekg8OwYFgPLKpuD9g0jUs\n');
} else {
  const envContent = `# Supabase Configuration
# Get these values from your Supabase project dashboard
# Settings → API → Project URL and anon public key

VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Instructions:
# 1. Go to https://supabase.com
# 2. Create a new project
# 3. Go to Settings → API
# 4. Copy Project URL and anon public key
# 5. Replace the values above
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file');
  console.log('📝 Please update it with your Supabase credentials\n');
}

console.log('📖 Next steps:');
console.log('1. Follow the setup guide in SUPABASE_SETUP.md');
console.log('2. Update .env.local with your Supabase credentials');
console.log('3. Run the SQL script in Supabase dashboard');
console.log('4. Start your app with: npm run dev\n');

console.log('�� Happy coding!'); 