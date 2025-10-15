'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [credits, setCredits] = useState<any>(null);
  const [creditsLoading, setCreditsLoading] = useState(true);

  const fetchCredits = async () => {
    try {
      setCreditsLoading(true);
      
      // Get user email from NextAuth session
      if (!session?.user?.email) {
        setCreditsLoading(false);
        return;
      }
      
      const response = await fetch('/api/credits/check', {
        headers: {
          'x-user-email': session.user.email
        }
      });
      
      if (response.ok) {
        const creditData = await response.json();
        setCredits(creditData);
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
    } finally {
      setCreditsLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    // Load user from NextAuth session
    if (status === 'authenticated' && session?.user) {
      setUser({
        email: session.user.email,
        name: session.user.name,
        firstName: session.user.name?.split(' ')[0] || 'User',
        id: (session.user as any).id
      });
      fetchCredits();
    }
  }, [session, status]);

  // Listen for credit updates
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'creditsUpdated') {
        fetchCredits();
      }
    };

    const handleFocus = () => {
      fetchCredits();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDropdown) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const isAuthPage = pathname?.startsWith('/auth/') || pathname?.startsWith('/login') || pathname?.startsWith('/register');
  const isPublicPage = pathname === '/' || pathname === '/about' || pathname === '/contact' || pathname === '/pricing';

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return <>{children}</>;
  }

  const headerStyle: React.CSSProperties = {
    background: '#fff',
    borderTop: '1px solid #374151',
    borderBottom: '1px solid #e5e7eb',
    padding: '16px 0',
    position: 'sticky',
    top: 0,
    zIndex: 9999,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    width: '100%',
    display: 'block'
  };

  const navStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '24px',
    minHeight: '56px'
  };

  const brandStyle: React.CSSProperties = {
    color: '#111827',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: 'clamp(18px, 4vw, 22px)',
    letterSpacing: '-0.025em'
  };

  const linkStyle: React.CSSProperties = {
    color: '#111827',
    textDecoration: 'none',
    margin: '0 8px',
    fontSize: '16px',
    fontWeight: '400',
    padding: '8px 12px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    border: '1px solid transparent',
    position: 'relative',
    overflow: 'hidden'
  };

  const btnStyle: React.CSSProperties = {
    display: 'inline-block',
    background: '#111827',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '9999px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '600',
    border: '1px solid #111827',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  const btnOutlineStyle: React.CSSProperties = {
    ...btnStyle,
    background: 'transparent',
    color: '#111827'
  };

  return (
    <>
      <style jsx>{`
        .header-nav {
          position: relative !important;
          z-index: 9999 !important;
          background: white !important;
        }
        .nav-links {
          display: flex !important;
          align-items: center !important;
          gap: 16px !important;
        }
        .nav-links a {
          color: #111827 !important;
          text-decoration: none !important;
          font-weight: 400 !important;
          padding: 8px 12px !important;
          border-radius: 6px !important;
          transition: all 0.3s ease !important;
          position: relative !important;
          overflow: hidden !important;
        }
        .nav-links a::before {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: -100% !important;
          width: 100% !important;
          height: 100% !important;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent) !important;
          transition: left 0.5s ease !important;
          z-index: 1 !important;
        }
        .nav-links a:hover::before {
          left: 100% !important;
        }
        .nav-links a:hover {
          background: #f3f4f6 !important;
          color: #3b82f6 !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
        }
        .nav-links a span {
          position: relative !important;
          z-index: 2 !important;
        }
        
        /* Button hover animations */
        .cta-button {
          position: relative !important;
          overflow: hidden !important;
        }
        .cta-button::before {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: -100% !important;
          width: 100% !important;
          height: 100% !important;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent) !important;
          transition: left 0.5s ease !important;
          z-index: 1 !important;
        }
        .cta-button:hover::before {
          left: 100% !important;
        }
        .cta-button:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
        }
        .cta-button span {
          position: relative !important;
          z-index: 2 !important;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: flex !important;
            flex-direction: column !important;
            gap: 12px !important;
            margin-top: 16px !important;
          }
          .nav-links a {
            padding: 10px 16px !important;
            font-size: 15px !important;
          }
        }
      `}</style>
      {!isAuthPage && (
        <header className="header-nav" style={headerStyle}>
          <div style={navStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <Link href="/" style={brandStyle}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Create A Website Click
                </span>
              </Link>
              {!isPublicPage && pathname !== '/dashboard' && (
                <Link href="/dashboard" style={{
                  color: '#6b7280',
                  textDecoration: 'none',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  ← Back to Dashboard
                </Link>
              )}
            </div>
            
            {isPublicPage ? (
              // Public Pages Navigation (Home, About, Contact, Pricing)
              <>
                {/* Navigation Links */}
                <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Link href="/" style={linkStyle}>
                    <span>Home</span>
                  </Link>
                  <Link href="/pricing" style={linkStyle}>
                    <span>Pricing</span>
                  </Link>
                  <Link href="/about" style={linkStyle}>
                    <span>About</span>
                  </Link>
                  <Link href="/contact" style={linkStyle}>
                    <span>Contact</span>
                  </Link>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Login button - only show if user is not logged in */}
                  {!user && (
                    <Link href="/login" style={{
                      ...linkStyle,
                      color: '#6b7280',
                      fontWeight: '500'
                    }}>
                      <span>Login</span>
                    </Link>
                  )}
                  
                  {/* Conditional Button based on login status */}
                  {user ? (
                    // Logged in user - Show "Start Building" button
                    <Link href="/dashboard" className="cta-button" style={{
                      ...btnStyle,
                      borderRadius: '9999px',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}>
                      <span>Start Building</span>
                    </Link>
                  ) : (
                    // Not logged in - Show "Get Started" button
                    <Link href="/register" className="cta-button" style={{
                      ...btnStyle,
                      borderRadius: '9999px',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}>
                      <span>Get Started</span>
                    </Link>
                  )}
                </div>
              </>
            ) : (
              // Inside Pages - Show status indicators and user menu
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Status Indicators */}
                <div style={{
                  background: '#374151',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Websites Built {creditsLoading ? '...' : `${credits?.usedCredits || 0}/${credits?.totalCredits || 1}`}
                </div>
                <div style={{
                  background: '#374151',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Subscription {creditsLoading ? '...' : (credits?.planType ? credits.planType.charAt(0).toUpperCase() + credits.planType.slice(1) : 'Free')}
                </div>
                
                {/* User Dropdown */}
                <div style={{ position: 'relative' }}>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#6b7280',
                      fontSize: '14px',
                      cursor: 'pointer',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => setShowDropdown(!showDropdown)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#8b5cf6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      {(user?.firstName || 'U').charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontSize: '14px', color: '#374151' }}>{user?.firstName || 'User'}</span>
                    <span style={{ fontSize: '12px' }}>▼</span>
                  </div>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: '0',
                      marginTop: '8px',
                      background: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      minWidth: '180px',
                      zIndex: 1000
                    }}>
                      <Link href="/settings" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        color: '#374151',
                        textDecoration: 'none',
                        fontSize: '14px',
                        borderBottom: '1px solid #f3f4f6'
                      }}
                      onClick={() => setShowDropdown(false)}>
                        <span style={{ fontSize: '16px' }}>⚙️</span>
                        Settings
                      </Link>
                      <Link href="/billing" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        color: '#374151',
                        textDecoration: 'none',
                        fontSize: '14px',
                        borderBottom: '1px solid #f3f4f6'
                      }}
                      onClick={() => setShowDropdown(false)}>
                        <span style={{ fontSize: '16px' }}>💳</span>
                        Billing
                      </Link>
                      <button 
                        onClick={handleSignOut}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 16px',
                          color: '#dc2626',
                          background: 'none',
                          border: 'none',
                          fontSize: '14px',
                          cursor: 'pointer',
                          width: '100%',
                          textAlign: 'left'
                        }}
                      >
                        <span style={{ fontSize: '16px' }}>🚪</span>
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </header>
      )}
      <main style={{ paddingTop: !isAuthPage ? 0 : 0 }}>
        {children}
      </main>
      {!isAuthPage && (
        <footer style={{
          background: '#f9fafb',
          padding: '40px 20px',
          textAlign: 'center',
          color: '#6b7280',
          borderTop: '1px solid #e5e7eb'
        }}>
          <div style={{maxWidth: '1200px', margin: '0 auto'}}>
            <p>© 2025 Create A Website Click. All rights reserved.</p>
          </div>
        </footer>
      )}
    </>
  );
}
