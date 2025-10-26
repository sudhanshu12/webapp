"use client";

import { useState, useEffect } from 'react';
import ConditionalLayout from '../components/conditional-layout';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface UserCredits {
  user_id: string;
  total_credits: number;
  used_credits: number;
  plan_type: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [userCredits, setUserCredits] = useState<{ [key: string]: UserCredits }>({});
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [creditAmount, setCreditAmount] = useState(0);
  const [operation, setOperation] = useState<'add' | 'remove'>('add');
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = () => {
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      try {
        const session = JSON.parse(adminSession);
        // Check if session is not older than 24 hours
        const isExpired = Date.now() - session.timestamp > 24 * 60 * 60 * 1000;
        if (session.authenticated && !isExpired) {
          setIsAuthenticated(true);
          testConnection();
          fetchUsers();
        } else {
          localStorage.removeItem('adminSession');
          window.location.href = '/admin-login';
        }
      } catch (error) {
        localStorage.removeItem('adminSession');
        window.location.href = '/admin-login';
      }
    } else {
      window.location.href = '/admin-login';
    }
    setCheckingAuth(false);
  };

  const testConnection = async () => {
    try {
      const response = await fetch('/api/admin/test-connection');
      if (response.ok) {
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('error');
      }
    } catch (error) {
      console.error('Connection test failed:', error);
      setConnectionStatus('error');
    }
  };

  const fetchUsers = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
        setUserCredits(data.userCredits);
        setMessage(`✅ Refreshed! Found ${data.users.length} users`);
      } else {
        console.error('Failed to fetch users');
        setConnectionStatus('error');
        setMessage('❌ Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setConnectionStatus('error');
      setMessage('❌ Error fetching users');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleCreditUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId || creditAmount <= 0) {
      setMessage('Please select a user and enter a valid credit amount');
      return;
    }

    try {
      const response = await fetch('/api/admin/update-credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUserId,
          amount: creditAmount,
          operation: operation
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(`✅ Successfully ${operation === 'add' ? 'added' : 'removed'} ${creditAmount} credits for ${users.find(u => u.id === selectedUserId)?.email}`);
        setCreditAmount(0);
        fetchUsers(); // Refresh data
      } else {
        const error = await response.json();
        setMessage(`❌ Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error updating credits:', error);
      setMessage('❌ An error occurred while updating credits');
    }
  };

  const handleResetToFree = async (userId: string) => {
    if (!confirm('Are you sure you want to reset this user to Free plan?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/reset-to-free', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setMessage(`✅ Successfully reset user to Free plan`);
        fetchUsers(); // Refresh data
      } else {
        const error = await response.json();
        setMessage(`❌ Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error resetting user:', error);
      setMessage('❌ An error occurred while resetting user');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    if (!confirm(`Are you sure you want to DELETE user "${user.email}"? This action cannot be undone and will remove all their data including credits, sites, and transactions.`)) {
      return;
    }

    try {
      const response = await fetch('/api/admin/delete-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setMessage(`✅ Successfully deleted user "${user.email}"`);
        fetchUsers(); // Refresh data
      } else {
        const error = await response.json();
        setMessage(`❌ Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('❌ An error occurred while deleting user');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    window.location.href = '/admin-login';
  };

  if (checkingAuth) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '18px',
        color: '#6b7280'
      }}>
        Checking admin authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '18px',
        color: '#6b7280'
      }}>
        Redirecting to admin login...
      </div>
    );
  }

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
          Loading admin panel...
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
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <div>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#111827',
              margin: 0
            }}>
              Admin Panel - Credit Management
            </h1>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '8px',
              fontSize: '14px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: connectionStatus === 'connected' ? '#10b981' : 
                                connectionStatus === 'error' ? '#ef4444' : '#f59e0b'
              }}></div>
              <span style={{
                color: connectionStatus === 'connected' ? '#10b981' : 
                       connectionStatus === 'error' ? '#ef4444' : '#f59e0b'
              }}>
                {connectionStatus === 'connected' ? '✅ Supabase Connected' : 
                 connectionStatus === 'error' ? '❌ Database Error' : '🔄 Checking Connection...'}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={fetchUsers}
              disabled={refreshing}
              style={{
                background: refreshing ? '#9ca3af' : '#3b82f6',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: refreshing ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: refreshing ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!refreshing) {
                  e.currentTarget.style.background = '#2563eb';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!refreshing) {
                  e.currentTarget.style.background = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {refreshing ? '🔄 Refreshing...' : '🔄 Refresh Users'}
            </button>
            <button
              onClick={handleLogout}
              style={{
                background: '#dc2626',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#b91c1c';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#dc2626';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Credit Update Form */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '24px'
          }}>
            Update User Credits
          </h2>

          <form onSubmit={handleCreditUpdate}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '24px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Select User
                </label>
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    background: 'white'
                  }}
                  required
                >
                  <option value="">Choose a user...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.email} ({user.first_name} {user.last_name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Operation
                </label>
                <select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value as 'add' | 'remove')}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    background: 'white'
                  }}
                >
                  <option value="add">Add Credits</option>
                  <option value="remove">Remove Credits</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Credit Amount
                </label>
                <input
                  type="number"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(parseInt(e.target.value) || 0)}
                  min="1"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                background: operation === 'add' ? '#059669' : '#dc2626',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {operation === 'add' ? '➕ Add Credits' : '➖ Remove Credits'}
            </button>
          </form>

          {message && (
            <div style={{
              marginTop: '20px',
              padding: '12px',
              borderRadius: '8px',
              background: message.includes('✅') ? '#d1fae5' : '#fee2e2',
              color: message.includes('✅') ? '#065f46' : '#991b1b',
              fontSize: '14px'
            }}>
              {message}
            </div>
          )}
        </div>

        {/* Users List */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '24px'
          }}>
            All Users & Credits
          </h2>

          <div style={{
            display: 'grid',
            gap: '16px'
          }}>
            {users.map((user) => {
              const credits = userCredits[user.id];
              return (
                <div
                  key={user.id}
                  style={{
                    padding: '20px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    cursor: selectedUserId === user.id ? 'pointer' : 'default',
                    borderColor: selectedUserId === user.id ? '#7c3aed' : '#e5e7eb',
                    background: selectedUserId === user.id ? '#f3f4f6' : '#f9fafb'
                  }}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#111827'
                      }}>
                        {user.first_name} {user.last_name}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>
                        {user.email}
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#059669'
                      }}>
                        {credits?.total_credits || 0}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        textTransform: 'uppercase'
                      }}>
                        Total Credits
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#dc2626'
                      }}>
                        {credits?.used_credits || 0}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        textTransform: 'uppercase'
                      }}>
                        Used Credits
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#7c3aed'
                      }}>
                        {credits?.plan_type?.charAt(0).toUpperCase() + credits?.plan_type?.slice(1) || 'Free'}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        textTransform: 'uppercase'
                      }}>
                        Plan Type
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#1f2937'
                      }}>
                        {(credits?.total_credits || 0) - (credits?.used_credits || 0)}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        textTransform: 'uppercase'
                      }}>
                        Remaining
                      </div>
                    </div>

                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResetToFree(user.id);
                        }}
                        style={{
                          background: '#dc2626',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: 'none',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#b91c1c';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#dc2626';
                        }}
                      >
                        Reset to Free
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUser(user.id);
                        }}
                        style={{
                          background: '#991b1b',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: 'none',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#7f1d1d';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#991b1b';
                        }}
                      >
                        Delete User
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ConditionalLayout>
  );
}
