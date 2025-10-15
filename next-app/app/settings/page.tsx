"use client";

import { useState, useEffect } from 'react';
import ConditionalLayout from '../components/conditional-layout';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Settings() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openRouterKey, setOpenRouterKey] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check NextAuth session and fetch user details from Supabase
    if (status === 'authenticated' && session?.user?.email) {
      fetchUserDetails(session.user.email);
    } else if (status === 'unauthenticated') {
      window.location.href = '/login';
    }
    
    // Load OpenRouter API key from localStorage
    const savedKey = localStorage.getItem('openRouterApiKey');
    if (savedKey) {
      setOpenRouterKey(savedKey);
    }
  }, [session, status]);

  const fetchUserDetails = async (email: string) => {
    try {
      const response = await fetch(`/api/users/details?email=${encodeURIComponent(email)}`);
      if (response.ok) {
        const userData = await response.json();
        setUser({
          email: userData.email,
          firstName: userData.first_name,
          lastName: userData.last_name,
          name: `${userData.first_name} ${userData.last_name}`.trim(),
          id: userData.id
        });
      } else {
        // Fallback to session data if API fails
        setUser({
          email: session?.user?.email,
          firstName: session?.user?.name?.split(' ')[0] || '',
          lastName: session?.user?.name?.split(' ').slice(1).join(' ') || '',
          name: session?.user?.name,
          id: (session?.user as any)?.id
        });
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      // Fallback to session data
      setUser({
        email: session?.user?.email,
        firstName: session?.user?.name?.split(' ')[0] || '',
        lastName: session?.user?.name?.split(' ').slice(1).join(' ') || '',
        name: session?.user?.name,
        id: (session?.user as any)?.id
      });
    } finally {
      setIsLoaded(true);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const handleSaveOpenRouterKey = () => {
    if (!openRouterKey.trim()) {
      setMessage('Please enter your OpenRouter API key');
      return;
    }
    
    localStorage.setItem('openRouterApiKey', openRouterKey.trim());
    setMessage('✅ OpenRouter API key saved successfully!');
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Please log in to access settings</h1>
          <Link href="/login" style={{
            background: '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            display: 'inline-block',
            marginTop: '16px'
          }}>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Navigation Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 0',
        marginBottom: '0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Left side - Brand and Back link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#111827',
              margin: 0
            }}>
              Business Sites Generator
            </h1>
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
          </div>

          {/* Right side - User info and Contact */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#6b7280',
              fontSize: '14px'
            }}>
              <span>👤</span>
              <span>{user?.firstName || 'User'}</span>
            </div>
            <Link href="/contact" style={{
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '16px'
            }}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        color: 'white',
      }}>
        {/* Sidebar */}
      <div style={{
        width: '280px',
        backgroundColor: '#1e293b',
        borderRight: '1px solid #334155',
        padding: '24px 0'
      }}>
        <div style={{ padding: '0 24px 32px', borderBottom: '1px solid #334155' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            <span style={{ fontSize: '24px' }}>🚀</span>
            Business Sites Generator
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '24px 0' }}>
          <Link href="/dashboard" style={{
            display: 'block',
            padding: '12px 24px',
            margin: '0 16px',
            borderRadius: '8px',
            fontSize: '16px',
            color: '#94a3b8',
            textDecoration: 'none',
            transition: 'all 0.2s ease'
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
            transition: 'all 0.2s ease'
          }}>
            Create Website
          </Link>
          <div style={{
            padding: '12px 24px',
            background: '#3b82f6',
            margin: '0 16px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            color: 'white'
          }}>
            Settings
          </div>
          <Link href="/billing" style={{
            display: 'block',
            padding: '12px 24px',
            margin: '8px 16px',
            borderRadius: '8px',
            fontSize: '16px',
            color: '#94a3b8',
            textDecoration: 'none',
            transition: 'all 0.2s ease'
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
              Settings ⚙️
            </h1>
            <p style={{
              color: '#94a3b8',
              fontSize: '16px'
            }}>
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {/* Account Information */}
          <div style={{
            background: '#1e293b',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #334155'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
              👤 Account Information
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '14px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                  First Name
                </label>
                <input
                  type="text"
                  value={user.firstName || ''}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '14px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                  Last Name
                </label>
                <input
                  type="text"
                  value={user.lastName || ''}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '14px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={user.email || ''}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div style={{
            background: '#1e293b',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #334155'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
              🔒 Security
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={handleLogout}
                style={{
                  background: '#dc2626',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
              >
                Logout
              </button>
            </div>
          </div>

          {/* API Keys */}
          <div style={{
            background: '#1e293b',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #334155'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
              🔑 API Keys
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '16px' }}>
              Manage your API keys for external services
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '14px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                  OpenRouter API Key
                </label>
                <input
                  type="password"
                  value={openRouterKey}
                  onChange={(e) => setOpenRouterKey(e.target.value)}
                  placeholder="Enter your OpenRouter API key"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                />
                <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>
                  Get your API key from <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>OpenRouter.ai</a>
                </p>
              </div>
              <button
                onClick={handleSaveOpenRouterKey}
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Save OpenRouter Key
              </button>
              {message && (
                <div style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: message.includes('✅') ? '#10b981' : '#ef4444',
                  color: 'white',
                  fontSize: '14px'
                }}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
