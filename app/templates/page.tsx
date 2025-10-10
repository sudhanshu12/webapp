'use client';

import Link from 'next/link';
import ConditionalLayout from '../components/conditional-layout';

export default function TemplatesPage() {
  return (
    <ConditionalLayout>
      <div style={{minHeight: '100vh', background: '#0f172a', color: 'white'}}>
        <div style={{maxWidth: 1120, margin: '0 auto', padding: '32px 24px'}}>
        <h1 style={{fontSize: 36, fontWeight: 800, marginBottom: 8}}>Choose Your Template</h1>
        <p style={{color: '#94a3b8', marginBottom: 28}}>Select a template to get started</p>

        <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: 24}}>
          {/* Template Card using provided image */}
          <div style={{background: '#1e293b', border: '1px solid #334155', borderRadius: 12, overflow: 'hidden', width: '420px', margin: '0 auto'}}>
            <div style={{padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span style={{background: '#334155', color: 'white', padding: '4px 10px', borderRadius: 999, fontSize: 12}}>Preview</span>
            </div>
            <div style={{borderTop: '1px solid #334155', borderBottom: '1px solid #334155', width: '100%', height: '320px', background: '#0b1220', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <img src="https://mattslandscapingca.com/wp-content/uploads/2025/09/Screenshot-2025-09-05-at-6.44.22-PM.png" alt="Home Services Template" style={{display: 'block', width: '100%', height: '100%', objectFit: 'cover'}} loading="lazy" decoding="async" />
            </div>
            <div style={{padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <div style={{fontWeight: 700, marginBottom: 4}}>Home Services</div>
                <div style={{color: '#94a3b8', fontSize: 14}}>Service Pages · Service Area Pages</div>
              </div>
              <Link href="/wizard" style={{background: '#8b5cf6', color: 'white', padding: '8px 14px', borderRadius: 8, textDecoration: 'none', fontWeight: 600}}>Use</Link>
            </div>
          </div>

          {/* Only one template shown */}
        </div>
        </div>
      </div>
    </ConditionalLayout>
  );
}


