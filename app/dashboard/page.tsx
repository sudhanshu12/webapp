"use client";

import { useState, useEffect } from 'react';
import ConditionalLayout from '../components/conditional-layout';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useCredits } from '../hooks/useCredits';

interface Site {
  id: string;
  title: string;
  created_at: string;
}

interface CreditInfo {
  totalCredits: number;
  usedCredits: number;
  remainingCredits: number;
  planType: string;
}


export default function Dashboard() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sites, setSites] = useState<Site[]>([]);
  const { credits, loading: creditsLoading, refreshCredits } = useCredits();
  const [loading, setLoading] = useState(true);

  // Auto-process payment if coming from success page
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('payment');
    const orderId = urlParams.get('order_id');
    
    if (paymentSuccess === 'success' && orderId && session?.user?.email) {
      console.log('Payment success detected, processing automatically:', { orderId, userEmail: session.user.email });
      
      // Get user ID from email first
      fetch(`/api/users/check?email=${encodeURIComponent(session.user.email)}`)
        .then(response => response.json())
        .then(userData => {
          if (userData.users && userData.users.length > 0) {
            const userId = userData.users[0].id;
            console.log('Found user ID:', userId);
            
            // Auto-process the payment
            return fetch('/api/auto-process-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId: orderId,
                userId: userId,
                paymentMethod: 'auto'
              })
            });
          } else {
            throw new Error('User not found');
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log('Payment processed automatically:', data);
            // Refresh credits after processing
            fetchCredits();
            // Remove success parameters from URL
            window.history.replaceState({}, '', '/dashboard');
          } else {
            console.error('Auto-payment processing failed:', data);
          }
        })
        .catch(error => {
          console.error('Error processing payment automatically:', error);
        });
    }
  }, [session]);

  // Set page metadata
  useEffect(() => {
    document.title = 'Dashboard - Manage Your Websites | Create A Website Click';
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDesc) {
      metaDesc = document.createElement('meta') as HTMLMetaElement;
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Manage your websites, view credits, and create new professional business websites. Your central hub for website management.';
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta') as HTMLMetaElement;
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'dashboard, website management, business websites, website builder dashboard';
    
    // Add noindex meta tag
    let noindexMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!noindexMeta) {
      noindexMeta = document.createElement('meta') as HTMLMetaElement;
      noindexMeta.name = 'robots';
      document.head.appendChild(noindexMeta);
    }
    noindexMeta.content = 'noindex, nofollow';
  }, []);

  useEffect(() => {
    // All users now use NextAuth session (stored in Supabase)
    if (status === 'authenticated' && session?.user) {
      console.log('NextAuth session found:', session.user);
      setUser({
        email: session.user.email,
        name: session.user.name,
        id: (session.user as any).id
      });
      setIsLoaded(true);
    } else if (status === 'unauthenticated') {
      console.log('No session, redirecting to login');
      window.location.href = '/login';
    }
  }, [session, status]);



  const fetchSites = async () => {
    try {
      const response = await fetch('/api/credits/history?limit=10');
      if (response.ok) {
        const data = await response.json();
        // Filter only site creations from history
        const siteCreations = data.history.filter((item: any) => item.type === 'site_creation');
        setSites(siteCreations.map((site: any) => ({
          id: site.id,
          title: site.site_name,
          created_at: site.created_at
        })));
      }
    } catch (error) {
      console.error('Error fetching sites:', error);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      const loadData = async () => {
        await fetchSites();
        setLoading(false);
      };
      loadData();
    } else if (isLoaded && !user) {
      // Redirect to login if no user is found
      window.location.href = '/login';
    }
  }, [isLoaded, user]);

  // Listen for credit updates from other pages
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'creditsUpdated' && user) {
        refreshCredits();
        fetchSites();
      }
    };

    const handleFocus = () => {
      if (user) {
        refreshCredits();
        fetchSites();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [user, refreshCredits]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userCredits');
    window.location.href = '/login';
  };

  const usagePercentage = credits?.totalCredits > 0 ? (credits.usedCredits / credits.totalCredits) * 100 : 0;

  return (
    <ConditionalLayout>
      <div style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#0f172a',
        color: 'white',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif'
      }}>
        {/* Sidebar */}
      <div style={{
        width: '280px',
        background: '#1e293b',
        borderRight: '1px solid #334155',
        padding: '24px 0',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}>
        {/* Logo */}
        <div style={{
          padding: '0 24px 32px',
          borderBottom: '1px solid #334155'
        }}>
        </div>

        {/* Navigation */}
        <nav style={{padding: '24px 0'}}>
          <Link href="/dashboard" style={{
            display: 'block',
            padding: '12px 24px',
            background: '#3b82f6',
            margin: '0 16px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            color: 'white',
            textDecoration: 'none'
          }}>
            Dashboard
          </Link>
          <Link href="/templates" style={{
            display: 'block',
            padding: '12px 24px',
            margin: '8px 16px',
            borderRadius: '8px',
            fontSize: '16px',
            color: '#94a3b8',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1e293b';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#94a3b8';
          }}>
            Create Website
          </Link>
          <Link href="/settings" style={{
            display: 'block',
            padding: '12px 24px',
            margin: '8px 16px',
            borderRadius: '8px',
            fontSize: '16px',
            color: '#94a3b8',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1e293b';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#94a3b8';
          }}>
            Settings
          </Link>
          <Link href="/billing" style={{
            display: 'block',
            padding: '12px 24px',
            margin: '8px 16px',
            borderRadius: '8px',
            fontSize: '16px',
            color: '#94a3b8',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1e293b';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#94a3b8';
          }}>
            Billing & Usage
          </Link>
        </nav>


      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: '24px'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              Welcome back, {user?.firstName || 'User'}! 👋
            </h1>
            <p style={{
              color: '#94a3b8',
              fontSize: '16px'
            }}>
              Here's what's happening with your websites today.
            </p>
          </div>
          <Link href="/templates" style={{
            background: '#8b5cf6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.background = '#7c3aed';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.background = '#8b5cf6';
          }}>
            + Create Website
          </Link>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <div style={{
            background: '#1e293b',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #334155'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <span style={{fontSize: '20px'}}>🌍</span>
              <span style={{fontSize: '14px', color: '#94a3b8'}}>Total Websites</span>
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold'
            }}>
              {sites.length}
            </div>
          </div>
          <div style={{
            background: '#1e293b',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #334155'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <span style={{fontSize: '20px'}}>📊</span>
              <span style={{fontSize: '14px', color: '#94a3b8'}}>Builds Used</span>
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold'
            }}>
              {credits?.usedCredits || 0}/{credits?.totalCredits || 1}
            </div>
          </div>
          <div style={{
            background: '#1e293b',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #334155'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <span style={{fontSize: '20px'}}>✅</span>
              <span style={{fontSize: '14px', color: '#94a3b8'}}>Active Websites</span>
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold'
            }}>
              {sites.length}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#94a3b8'
            }}>
              {sites.length} building
            </div>
          </div>
          <div style={{
            background: '#1e293b',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #334155'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <span style={{fontSize: '20px'}}>⏰</span>
              <span style={{fontSize: '14px', color: '#94a3b8'}}>Subscription</span>
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold'
            }}>
              {loading ? 'Loading...' : (credits?.planType ? credits.planType.charAt(0).toUpperCase() + credits.planType.slice(1) : 'Free')}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#94a3b8'
            }}>
              Upgrade available
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '24px'
        }}>
          {/* Quick Actions */}
          <div style={{
            background: '#1e293b',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #334155'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '20px'
            }}>
              ⚡ Quick Actions
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <Link href="/templates" style={{
                background: '#3b82f6',
                padding: '16px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2563eb';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.background = '#3b82f6';
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <span style={{fontSize: '20px'}}>➕</span>
                  <div>
                    <div style={{fontWeight: '600'}}>Create New Website</div>
                    <div style={{fontSize: '14px', opacity: 0.8}}>Build a new AI-powered website</div>
                  </div>
                </div>
                <span>→</span>
              </Link>
              <Link href="/websites" style={{
                background: '#334155',
                padding: '16px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.background = '#475569';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.background = '#334155';
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <span style={{fontSize: '20px'}}>🌍</span>
                  <div>
                    <div style={{fontWeight: '600'}}>View All Websites</div>
                    <div style={{fontSize: '14px', opacity: 0.8}}>Manage your existing websites</div>
                  </div>
                </div>
                <span>→</span>
              </Link>
              <Link href="/settings" style={{
                background: '#334155',
                padding: '16px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.background = '#475569';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.background = '#334155';
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <span style={{fontSize: '20px'}}>⚙️</span>
                  <div>
                    <div style={{fontWeight: '600'}}>Account Settings</div>
                    <div style={{fontSize: '14px', opacity: 0.8}}>Update your profile and API keys</div>
                  </div>
                </div>
                <span>→</span>
              </Link>
              <Link href="/billing" style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                padding: '16px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px -1px rgba(124, 58, 237, 0.3)'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #6d28d9 0%, #9333ea 100%)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(124, 58, 237, 0.4)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(124, 58, 237, 0.3)';
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <span style={{fontSize: '20px'}}>🚀</span>
                  <div>
                    <div style={{fontWeight: '600'}}>Upgrade Plan</div>
                    <div style={{fontSize: '14px', opacity: 0.9}}>Get more credits and premium features</div>
                  </div>
                </div>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Build Usage */}
          <div style={{
            background: '#1e293b',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #334155'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600'
              }}>
                🌍 Build Usage
              </h3>
              <span style={{
                color: '#10b981',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                {usagePercentage}% Used
              </span>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: `conic-gradient(#10b981 ${usagePercentage * 3.6}deg, #334155 0deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#1e293b',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold'
                  }}>
                    {credits?.usedCredits || 0}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#94a3b8'
                  }}>
                    of {credits?.totalCredits || 0}
                  </div>
                </div>
              </div>
              <div style={{
                display: 'flex',
                gap: '24px',
                fontSize: '14px',
                color: '#94a3b8'
              }}>
                <div>{credits?.usedCredits || 0} Used</div>
                <div>{credits?.remainingCredits || 0} Remaining</div>
                <div>{credits?.totalCredits || 0} Total</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{
          background: '#1e293b',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid #334155',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '20px'
          }}>
            📈 Recent Activity
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {sites.length > 0 ? (
              sites.slice(0, 5).map((site) => (
                <div key={site.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  background: '#334155',
                  borderRadius: '8px'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <span style={{fontSize: '16px'}}>🌐</span>
                    <div>
                      <div style={{fontWeight: '500'}}>{site.title}</div>
                      <div style={{fontSize: '12px', color: '#94a3b8'}}>
                        Created {new Date(site.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    background: '#059669',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    -1 Credit
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                textAlign: 'center',
                color: '#94a3b8',
                padding: '24px'
              }}>
                No sites created yet. Start building your first website!
              </div>
            )}
          </div>
        </div>

        {/* Upgrade Section */}
        <div style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
          padding: '32px',
          borderRadius: '16px',
          marginBottom: '24px',
          boxShadow: '0 8px 25px rgba(124, 58, 237, 0.3)',
          border: '1px solid rgba(124, 58, 237, 0.2)'
        }}>
          <div style={{
            textAlign: 'center',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}>
              🚀 Need More Credits?
            </h3>
            <p style={{
              fontSize: '16px',
              marginBottom: '24px',
              opacity: 0.9,
              maxWidth: '500px',
              margin: '0 auto 24px'
            }}>
              Upgrade your plan to get more website builds and unlock premium features
            </p>
            <Link 
              href="/billing"
              style={{
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              View Plans & Upgrade →
            </Link>
          </div>
        </div>

        {/* Floating Action Button */}
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          background: '#8b5cf6',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
          transition: 'all 0.3s ease'
        }} onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.background = '#7c3aed';
        }} onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.background = '#8b5cf6';
        }}>
          💬
        </div>
      </div>
      </div>
    </ConditionalLayout>
  );
}
