"use client";

import { useState } from 'react';

export default function TestCreditsPage() {
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const checkCredits = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/credits/check-test');
      const data = await response.json();
      setCredits(data);
      setMessage('Credits fetched successfully!');
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
    setLoading(false);
  };

  const deductCredits = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/credits/deduct-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteName: 'Test Site ' + Date.now(),
          creditsToDeduct: 1
        })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Credits deducted successfully!');
        setCredits(data);
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🧪 Credit System Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={checkCredits}
          disabled={loading}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Check Credits'}
        </button>
        
        <button 
          onClick={deductCredits}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Deduct 1 Credit'}
        </button>
      </div>

      {message && (
        <div style={{
          padding: '10px',
          backgroundColor: message.includes('Error') ? '#ffebee' : '#e8f5e8',
          border: `1px solid ${message.includes('Error') ? '#f44336' : '#4caf50'}`,
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          {message}
        </div>
      )}

      {credits && (
        <div style={{
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '5px',
          border: '1px solid #ddd'
        }}>
          <h3>Current Credits:</h3>
          <p><strong>Total Credits:</strong> {credits.totalCredits}</p>
          <p><strong>Used Credits:</strong> {credits.usedCredits}</p>
          <p><strong>Remaining Credits:</strong> {credits.remainingCredits}</p>
          <p><strong>Plan Type:</strong> {credits.planType}</p>
        </div>
      )}

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
        <h3>📝 Test Instructions:</h3>
        <ol>
          <li>Click "Check Credits" to see current credit status</li>
          <li>Click "Deduct 1 Credit" to simulate creating a site</li>
          <li>Check credits again to see the deduction</li>
          <li>Try deducting more credits than available to test error handling</li>
        </ol>
      </div>
    </div>
  );
}
