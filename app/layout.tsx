import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthSessionProvider from './components/session-provider'
import DynamicFavicon from './components/dynamic-favicon'
// import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Professional Rank and Rent Websites in Minutes - Create A Website Click',
  description: 'Build professional rank and rent business websites in minutes. Create stunning, SEO-optimized websites for your business with our easy-to-use platform.',
  keywords: 'rank and rent, professional business website, website builder, SEO website, business website',
  openGraph: {
    title: 'Create Professional Rank and Rent Websites in Minutes - Create A Website Click',
    description: 'Build professional rank and rent business websites in minutes. Create stunning, SEO-optimized websites for your business with our easy-to-use platform.',
    type: 'website',
  },
  twitter: {
    title: 'Create Professional Rank and Rent Websites in Minutes - Create A Website Click',
    description: 'Build professional rank and rent business websites in minutes. Create stunning, SEO-optimized websites for your business with our easy-to-use platform.',
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <head>
      <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%232ee6c5'/%3E%3Cpath d='M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h12v2H8v-2z' fill='%23fff'/%3E%3C/svg%3E" />
      <link rel="icon" type="image/png" sizes="32x32" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADdSURBVHgB7ZbRDYMwDEQvYgNGYANGYBRGYARGYQRGYARG6Aa0qKoiFZI4hD9I7ySUxE983xlC/wQAoCqllDvnrFLqSt9Ba33nnF+U0hPvHCGEDSFkQwjZ0M9ijDG01hfGGKX0xDtHCGFDCNkQQjZ0C6WUe0rpmVJ64p0jhLAhhGwIIRv6M0op95TSM6X0xDtHCGFDCNkQQjb0C6WUe0rpmVJ64p0jhLAhhGwIIRu6hlLKPaX0TCk98c4RQtgQQjaEkA1dQynlnlJ6ppSeeOcIIWwIIRtCyIYAgD9+AVZbPgFHm9UnAAAAAElFTkSuQmCC" />
      <link rel="apple-touch-icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%232ee6c5'/%3E%3Cpath d='M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h12v2H8v-2z' fill='%23fff'/%3E%3C/svg%3E" />
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
            <DynamicFavicon businessName="Create A Website Click" />
            {children}
          </AuthSessionProvider>
        </body>
    </html>
  );
} // Force deployment - Fri Oct 17 14:14:05 IST 2025
