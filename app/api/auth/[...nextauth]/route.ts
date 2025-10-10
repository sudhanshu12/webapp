import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { supabase } from '@/lib/supabase'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  debug: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      // Store user data in Supabase when signing in with Google
      if (account?.provider === 'google' && user.email) {
        try {
          console.log('Google sign-in attempt for:', user.email);
          
          // Check if user already exists
          const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email)
            .maybeSingle();

          if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('Error fetching user:', fetchError);
            // Continue anyway - don't block sign-in
          }

          if (!existingUser) {
            console.log('Creating new user:', user.email);
            // Create new user
            const { data: newUser, error: insertError } = await supabase
              .from('users')
              .insert([
                {
                  email: user.email,
                  first_name: user.name?.split(' ')[0] || '',
                  last_name: user.name?.split(' ').slice(1).join(' ') || '',
                  email_verified: true,
                  provider: 'google',
                  created_at: new Date().toISOString(),
                }
              ])
              .select()
              .single();

            if (insertError) {
              console.error('Error creating user:', insertError);
              // Continue anyway - don't block sign-in
            } else if (newUser) {
              console.log('User created successfully, adding credits');
              // Create initial credits for new user
              const { error: creditsError } = await supabase
                .from('user_credits')
                .insert([
                  {
                    user_id: newUser.id,
                    total_credits: 1,
                    used_credits: 0,
                    remaining_credits: 1,
                    plan_type: 'free',
                  }
                ]);
              
              if (creditsError) {
                console.error('Error creating credits:', creditsError);
              } else {
                console.log('Credits created successfully');
              }
            }
          } else {
            console.log('Existing user found:', user.email);
          }
        } catch (error) {
          console.error('Error in Google sign-in callback:', error);
          // Don't block sign-in even if database operations fail
        }
      }
      
      console.log('Sign-in callback returning true');
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback - url:', url, 'baseUrl:', baseUrl);
      
      // Handle error redirects
      if (url.includes('/api/auth/error')) {
        console.log('Error detected, redirecting to login');
        return `${baseUrl}/login`;
      }
      
      // If URL starts with baseUrl, use it
      if (url.startsWith(baseUrl)) {
        console.log('Using provided URL:', url);
        return url;
      }
      
      // Default to dashboard
      console.log('Redirecting to dashboard');
      return `${baseUrl}/dashboard`;
    },
    async session({ session, token }) {
      // Add user ID and email to session
      if (session.user && session.user.email) {
        try {
          // Get user from Supabase
          const { data: user, error } = await supabase
            .from('users')
            .select('id, email, first_name, last_name')
            .eq('email', session.user.email)
            .single();
          
          if (user && !error) {
            (session.user as any).id = user.id;
            console.log('Session enriched with user ID:', user.id);
          } else if (error) {
            console.error('Error fetching user for session:', error);
          }
        } catch (error) {
          console.error('Error in session callback:', error);
        }
      }
      return session;
    }
  },
  pages: {
    error: '/login',
  },
})

export { handler as GET, handler as POST }
