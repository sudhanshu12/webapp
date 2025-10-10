import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { supabase } from '@/lib/supabase'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Store user data in Supabase when signing in with Google
      if (account?.provider === 'google' && user.email) {
        try {
          // Check if user already exists
          const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email)
            .single();

          if (!existingUser) {
            // Create new user
            const { error } = await supabase
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
              ]);

            if (error) {
              console.error('Error creating user:', error);
              return false;
            }

            // Get the newly created user to get their ID
            const { data: newUser } = await supabase
              .from('users')
              .select('id')
              .eq('email', user.email)
              .single();

            // Create initial credits for new user
            if (newUser) {
              await supabase
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
            }
          }
        } catch (error) {
          console.error('Error in Google sign-in:', error);
          return false;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to dashboard after successful login
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return `${baseUrl}/dashboard`;
    },
    async session({ session, token }) {
      // Add user ID to session if available
      if (session.user && token.sub) {
        // Get user from Supabase
        const { data: user } = await supabase
          .from('users')
          .select('id')
          .eq('email', session.user.email)
          .single();
        
        if (user) {
          (session.user as any).id = user.id;
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
