import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

interface CreditInfo {
  totalCredits: number;
  usedCredits: number;
  remainingCredits: number;
  planType: string;
}

// Global credits cache to avoid multiple API calls
let creditsCache: { [email: string]: { data: CreditInfo; timestamp: number } } = {};
const CACHE_DURATION = 30000; // 30 seconds cache

export function useCredits() {
  const { data: session, status } = useSession();
  const [credits, setCredits] = useState<CreditInfo>({
    totalCredits: 1,
    usedCredits: 0,
    remainingCredits: 1,
    planType: 'free'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCredits = useCallback(async (userEmail: string, forceRefresh = false) => {
    try {
      // Check cache first
      const cached = creditsCache[userEmail];
      if (!forceRefresh && cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
        console.log('📦 Using cached credits for:', userEmail);
        setCredits(cached.data);
        setLoading(false);
        return cached.data;
      }

      console.log('🔍 Fetching fresh credits for:', userEmail);
      setLoading(true);
      setError(null);

      const response = await fetch('/api/credits/check', {
        headers: {
          'x-user-email': userEmail
        }
      });

      if (response.ok) {
        const creditData = await response.json();
        
        // Update cache
        creditsCache[userEmail] = {
          data: creditData,
          timestamp: Date.now()
        };
        
        setCredits(creditData);
        setLoading(false);
        return creditData;
      } else {
        throw new Error(`Failed to fetch credits: ${response.statusText}`);
      }
    } catch (err) {
      console.error('Error fetching credits:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch credits');
      
      // Set default credits on error
      const defaultCredits = {
        totalCredits: 1,
        usedCredits: 0,
        remainingCredits: 1,
        planType: 'free'
      };
      
      setCredits(defaultCredits);
      setLoading(false);
      return defaultCredits;
    }
  }, []);

  const refreshCredits = useCallback(() => {
    if (session?.user?.email) {
      return fetchCredits(session.user.email, true);
    }
  }, [session?.user?.email, fetchCredits]);

  // Load credits when session is available
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      fetchCredits(session.user.email);
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [session, status, fetchCredits]);

  // Listen for credit updates from other pages
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'creditsUpdated' && session?.user?.email) {
        fetchCredits(session.user.email, true);
      }
    };

    const handleFocus = () => {
      if (session?.user?.email) {
        fetchCredits(session.user.email, true);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [session?.user?.email, fetchCredits]);

  return {
    credits,
    loading,
    error,
    refreshCredits,
    fetchCredits: session?.user?.email ? () => fetchCredits(session.user.email!) : undefined
  };
}

// Utility function to clear credits cache (useful after credit updates)
export function clearCreditsCache(email?: string) {
  if (email) {
    delete creditsCache[email];
  } else {
    creditsCache = {};
  }
}

// Utility function to update credits cache (useful after credit updates)
export function updateCreditsCache(email: string, credits: CreditInfo) {
  creditsCache[email] = {
    data: credits,
    timestamp: Date.now()
  };
}
