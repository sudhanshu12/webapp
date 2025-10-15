'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error' | 'invalid'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Get token from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');

    if (!token || !email) {
      setVerificationStatus('invalid');
      setMessage('Invalid verification link. Please check your email and try again.');
      return;
    }

    // Verify email with Supabase
    setTimeout(async () => {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
            email: email,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setVerificationStatus('error');
          setMessage(data.error || 'Verification failed. Please try again.');
          return;
        }

        setVerificationStatus('success');
        setMessage('Email verified successfully! You can now log in to your account.');
      } catch (error) {
        setVerificationStatus('error');
        setMessage('Verification failed. Please try again.');
      }
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-[#4C1D95] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center">
          {verificationStatus === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email...</h1>
              <p className="text-gray-600">Please wait while we verify your email address.</p>
            </>
          )}

          {verificationStatus === 'success' && (
            <>
              <div className="text-green-500 text-6xl mb-4">✅</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <Link 
                href="/login" 
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Go to Login
              </Link>
            </>
          )}

          {verificationStatus === 'error' && (
            <>
              <div className="text-red-500 text-6xl mb-4">❌</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-3">
                <Link 
                  href="/register" 
                  className="block bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Register Again
                </Link>
                <Link 
                  href="/login" 
                  className="block bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Try Login
                </Link>
              </div>
            </>
          )}

          {verificationStatus === 'invalid' && (
            <>
              <div className="text-yellow-500 text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Link</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-3">
                <Link 
                  href="/register" 
                  className="block bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Register
                </Link>
                <Link 
                  href="/login" 
                  className="block bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
