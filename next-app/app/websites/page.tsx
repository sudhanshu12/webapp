"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ConditionalLayout from '../components/conditional-layout';
import { useSession } from 'next-auth/react';

interface Site {
  id: string;
  title: string;
  created_at: string;
  business_name?: string;
  business_type?: string;
  status?: string;
}

export default function WebsitesPage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from NextAuth session
    if (status === 'authenticated' && session?.user) {
      setUser({
        email: session.user.email,
        name: session.user.name,
        id: (session.user as any).id
      });
      setIsLoaded(true);
    } else if (status === 'unauthenticated') {
      window.location.href = '/login';
    }
  }, [session, status]);

  const fetchSites = async () => {
    try {
      // Get user email from NextAuth session
      if (!session?.user?.email) {
        console.log('No session found');
        return;
      }
      
      // Fetch sites from Supabase API
      const response = await fetch('/api/sites/list', {
        headers: {
          'x-user-email': session.user.email
        }
      });
      
      if (response.ok) {
        const sitesData = await response.json();
        setSites(sitesData);
      } else {
        console.error('Failed to fetch sites:', response.statusText);
        // Set empty array if API fails
        setSites([]);
      }
    } catch (error) {
      console.error('Error fetching sites:', error);
      // Set empty array on error
      setSites([]);
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

  if (loading) {
    return (
      <ConditionalLayout>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          fontSize: '18px',
          color: '#6b7280'
        }}>
          Loading websites...
        </div>
      </ConditionalLayout>
    );
  }

  return (
    <ConditionalLayout>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        background: '#f9fafb',
        minHeight: '100vh'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '16px'
          }}>
            My Websites
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            View and manage all your generated websites
          </p>
        </div>

        {/* Websites List */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          {sites.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#6b7280'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>
                🌐
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px'
              }}>
                No websites yet
              </h3>
              <p style={{
                fontSize: '16px',
                marginBottom: '24px'
              }}>
                Create your first website to get started
              </p>
              <Link href="/templates" style={{
                background: '#3b82f6',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                display: 'inline-block'
              }}>
                Create Website
              </Link>
            </div>
          ) : (
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '24px'
              }}>
                Generated Websites ({sites.length})
              </h2>
              <div style={{
                display: 'grid',
                gap: '16px'
              }}>
                {sites.map((site) => (
                  <div key={site.id} style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#111827',
                        marginBottom: '4px'
                      }}>
                        {site.business_name || site.title}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#6b7280',
                        marginBottom: '8px'
                      }}>
                        {site.business_type || 'Business Website'}
                      </p>
                      <p style={{
                        fontSize: '12px',
                        color: '#9ca3af'
                      }}>
                        Created: {new Date(site.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        background: '#10b981',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {site.status || 'Completed'}
                      </span>
                      <button style={{
                        background: '#3b82f6',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}>
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ConditionalLayout>
  );
}
