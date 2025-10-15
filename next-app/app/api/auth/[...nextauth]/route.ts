import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        // Fetch user from Supabase
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .single();

        if (error || !user) {
          throw new Error('Invalid email or password');
        }

        // Verify email is confirmed
        if (!user.email_verified) {
          throw new Error('Please verify your email before logging in');
        }

        // Verify password
        const isValid = await bcrypt.compare(credentials.password, user.password_hash);
        
        if (!isValid) {
          throw new Error('Invalid email or password');
        }

        // Return user object
        return {
          id: user.id,
          email: user.email,
          name: `${user.first_name} ${user.last_name}`.trim(),
          image: null,
        };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      // Store user data in Supabase when signing in with Google
      if (account?.provider === 'google' && user.email) {
        try {
          console.log('=== Google OAuth Sign-In ===');
          console.log('Email:', user.email);
          console.log('Name:', user.name);
          
          // FIRST: Check if user already exists
          const { data: existingUsers, error: fetchError } = await supabase
            .from('users')
            .select('id, email, email_verified, first_name, last_name, created_at')
            .eq('email', user.email);

          if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('Error fetching users:', fetchError);
            return false;
          }

          // If multiple users found (shouldn't happen with unique constraint)
          if (existingUsers && existingUsers.length > 1) {
            console.error('CRITICAL: Multiple users found with same email!', existingUsers.length);
            // Use the oldest one
            const oldestUser = existingUsers.sort((a, b) => 
              new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            )[0];
            user.id = oldestUser.id;
            user.name = `${oldestUser.first_name} ${oldestUser.last_name}`.trim();
            console.log('Using oldest user ID:', user.id);
            return true;
          }

          // If user exists
          if (existingUsers && existingUsers.length === 1) {
            const existingUser = existingUsers[0];
            console.log('✓ Existing user found - signing in');
            console.log('  User ID:', existingUser.id);
            console.log('  Created:', existingUser.created_at);
            user.id = existingUser.id;
            user.name = `${existingUser.first_name} ${existingUser.last_name}`.trim();
            return true;
          }

          // User doesn't exist, create new user
          console.log('✓ No existing user - creating new account');
          const firstName = user.name?.split(' ')[0] || 'User';
          const lastName = user.name?.split(' ').slice(1).join(' ') || '';
          
          const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert([
              {
                email: user.email,
                first_name: firstName,
                last_name: lastName,
                email_verified: true,
                provider: 'google',
                created_at: new Date().toISOString(),
              }
            ])
            .select()
            .single();

          if (insertError) {
            // Check if error is due to duplicate email (unique constraint violation)
            if (insertError.code === '23505' || insertError.message?.includes('duplicate') || insertError.message?.includes('unique')) {
              console.log('Duplicate email detected, fetching existing user...');
              // Fetch the existing user
              const { data: existingUserRetry, error: retryError } = await supabase
                .from('users')
                .select('id, email, first_name, last_name')
                .eq('email', user.email)
                .single();
              
              if (existingUserRetry) {
                console.log('Found existing user with ID:', existingUserRetry.id);
                user.id = existingUserRetry.id;
                user.name = `${existingUserRetry.first_name} ${existingUserRetry.last_name}`.trim();
                return true;
              } else {
                console.error('Could not fetch existing user after duplicate error:', retryError);
                return false; // Block sign-in if we can't identify the user
              }
            }
            
            console.error('Error creating user (not duplicate):', insertError);
            return false; // Block sign-in on non-duplicate errors
          }

          if (newUser) {
            console.log('User created successfully, ID:', newUser.id);
            user.id = newUser.id;

            // Check if credits already exist
            const { data: existingCredits } = await supabase
              .from('user_credits')
              .select('user_id')
              .eq('user_id', newUser.id)
              .maybeSingle();

            if (!existingCredits) {
              console.log('Creating initial credits for user');
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
            } else {
              console.log('Credits already exist for user');
            }
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
      
      // Always redirect to dashboard after successful OAuth
      console.log('Redirecting to dashboard');
      return `${baseUrl}/dashboard`;
    },
    async session({ session, token }) {
      // Add user ID to session from token
      if (session.user && token.sub) {
        (session.user as any).id = token.sub;
        console.log('Session with user ID:', token.sub);
      }
      return session;
    },
    async jwt({ token, user, account }) {
      // Initial sign in - add user ID to token
      if (user) {
        token.sub = user.id;
        token.email = user.email;
      }
      return token;
    }
  },
  pages: {
    error: '/login',
  },
})

export { handler as GET, handler as POST }
