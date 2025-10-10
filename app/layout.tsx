import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthSessionProvider from './components/session-provider'
// import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create A Website Click',
  description: 'Launch AI‑written, SEO‑ready business sites in minutes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <head>
      <style dangerouslySetInnerHTML={{
        __html: `
          * { box-sizing: border-box; }
          body { margin: 0; padding: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif; }
          .header { background: #fff !important; border-bottom: 1px solid #e5e7eb !important; }
          .nav { display: flex !important; justify-content: space-between !important; align-items: center !important; }
          .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important; color: white !important; }
          .btn { display: inline-block !important; padding: 10px 20px !important; border-radius: 8px !important; text-decoration: none !important; }
          .btn-primary { background: #111827 !important; color: white !important; }
          .btn-outline { background: transparent !important; color: #111827 !important; border: 1px solid #111827 !important; }
        `
      }} />
    </head>
        <body className={inter.className}>
          <AuthSessionProvider>
            {children}
          </AuthSessionProvider>
        </body>
    </html>
  );
} 