// Test Supabase Connection
// Run with: node test-supabase.js

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Please check your .env.local file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    console.log('🔍 Testing Supabase connection...')
    
    // Test basic connection
    const { data, error } = await supabase
      .from('user_credits')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ Database connection failed:', error.message)
      return false
    }
    
    console.log('✅ Supabase connection successful!')
    
    // Test table structure
    const { data: tables, error: tableError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .in('table_name', ['user_credits', 'site_creations', 'credit_transactions'])
    
    if (tableError) {
      console.log('⚠️  Could not verify tables (this is normal)')
    } else {
      console.log('✅ Required tables found:', tables?.map(t => t.table_name))
    }
    
    return true
  } catch (error) {
    console.error('❌ Connection test failed:', error.message)
    return false
  }
}

async function main() {
  console.log('🚀 Supabase Credit System Test')
  console.log('==============================')
  
  const success = await testConnection()
  
  if (success) {
    console.log('\n🎉 Setup is working correctly!')
    console.log('You can now start your Next.js app with: npm run dev')
  } else {
    console.log('\n❌ Setup needs attention.')
    console.log('Please check:')
    console.log('1. Supabase project is active')
    console.log('2. Environment variables are correct')
    console.log('3. Database schema was created')
  }
}

main()
