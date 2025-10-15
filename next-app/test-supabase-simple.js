// Simple Supabase Connection Test
// Run with: node test-supabase-simple.js

const { createClient } = require('@supabase/supabase-js')

// Your Supabase credentials
const supabaseUrl = 'https://xuxfcirqocxlfbcqjcpc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1eGZjaXJxb2N4bGZiY3FqY3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NjAzMDMsImV4cCI6MjA3NDQzNjMwM30.C9O9Pt-53IfYr54_-czRZ3bQbT4-LI-6anugpdwPowI'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    console.log('🔍 Testing Supabase connection...')
    console.log('URL:', supabaseUrl)
    console.log('Key:', supabaseAnonKey.substring(0, 20) + '...')
    
    // Test basic connection by trying to access a table
    const { data, error } = await supabase
      .from('user_credits')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ Database connection failed:', error.message)
      if (error.message.includes('relation "user_credits" does not exist')) {
        console.log('💡 This means the database schema needs to be set up!')
        console.log('   Please run the SQL from supabase-setup.sql in your Supabase dashboard')
      }
      return false
    }
    
    console.log('✅ Supabase connection successful!')
    console.log('✅ Database schema is properly set up!')
    
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
    console.log('You can now:')
    console.log('1. Create .env.local with your Supabase credentials')
    console.log('2. Start your Next.js app with: npm run dev')
    console.log('3. Test the credit system in your browser')
  } else {
    console.log('\n❌ Setup needs attention.')
    console.log('Please check:')
    console.log('1. Supabase project is active')
    console.log('2. Run the SQL schema in Supabase dashboard')
    console.log('3. Check your credentials are correct')
  }
}

main()
