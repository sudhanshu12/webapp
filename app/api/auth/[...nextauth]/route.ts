import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Store user data in localStorage for our system
      if (account?.provider === 'google') {
        const userData = {
          id: user.id,
          firstName: user.name?.split(' ')[0] || '',
          lastName: user.name?.split(' ').slice(1).join(' ') || '',
          email: user.email,
          emailVerified: true, // Google accounts are pre-verified
          createdAt: new Date().toISOString(),
          provider: 'google'
        };

        // Store in localStorage (in a real app, this would be in a database)
        if (typeof window !== 'undefined') {
          const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
          const userExists = existingUsers.find((u: any) => u.email === user.email);
          
          if (!userExists) {
            const updatedUsers = [...existingUsers, userData];
            localStorage.setItem('users', JSON.stringify(updatedUsers));
          }
          
          // Set current user
          localStorage.setItem('currentUser', JSON.stringify(userData));
          
          // Create user credits if they don't exist
          const userCredits = JSON.parse(localStorage.getItem('userCredits') || '{}');
          if (!userCredits[user.id]) {
            userCredits[user.id] = {
              totalCredits: 1,
              usedCredits: 0,
              planType: 'free'
            };
            localStorage.setItem('userCredits', JSON.stringify(userCredits));
          }
        }
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after successful login
      return `${baseUrl}/dashboard`
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
})

export { handler as GET, handler as POST }
