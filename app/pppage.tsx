"use client";

import ConditionalLayout from './components/conditional-layout';

export default function Home() {
  return (
    <ConditionalLayout>
      <div style={{margin: 0, padding: 0, fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif'}}>
        <style jsx>{`
          @media (max-width: 768px) {
            .hero-section {
              padding: 80px 20px 60px 20px !important;
              min-height: 70vh !important;
            }
            .hero-section h1 {
              font-size: 2.5rem !important;
              margin-bottom: 20px !important;
              line-height: 1.2 !important;
            }
            .hero-section p {
              font-size: 1.1rem !important;
              margin-bottom: 30px !important;
              padding: 0 10px !important;
            }
            .hero-section a {
              padding: 14px 24px !important;
              font-size: 16px !important;
              margin: 8px !important;
            }
            .hero-buttons {
              flex-direction: column !important;
              align-items: center !important;
              gap: 12px !important;
            }
            .hero-features {
              flex-direction: column !important;
              gap: 16px !important;
              align-items: center !important;
            }
            .hero-features div {
              font-size: 14px !important;
            }
          }
          
          @media (max-width: 480px) {
            .hero-section h1 {
              font-size: 2rem !important;
            }
            .hero-section p {
              font-size: 1rem !important;
            }
            .hero-section a {
              padding: 12px 20px !important;
              font-size: 14px !important;
            }
          }
          
          @media (max-width: 768px) {
            .process-section {
              padding: 60px 20px !important;
              margin-top: 40px !important;
              margin-bottom: 40px !important;
            }
            .process-section h2 {
              font-size: 2.5rem !important;
              margin-bottom: 30px !important;
            }
            .process-section p {
              font-size: 1.2rem !important;
              margin-bottom: 40px !important;
            }
            .process-steps {
              flex-direction: column !important;
              gap: 20px !important;
            }
            .process-step {
              min-width: 100% !important;
              padding: 30px 20px !important;
            }
            .process-step h3 {
              font-size: 20px !important;
            }
            .process-step p {
              font-size: 14px !important;
            }
            .process-icon {
              width: 60px !important;
              height: 60px !important;
              font-size: 24px !important;
            }
          }
          
          @media (max-width: 768px) {
            .video-section {
              padding: 60px 20px !important;
            }
            .video-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
            .video-content h2 {
              font-size: 2.5rem !important;
              text-align: center !important;
            }
            .video-content p {
              font-size: 1.1rem !important;
              text-align: center !important;
            }
            .video-features {
              justify-content: center !important;
              flex-direction: column !important;
              gap: 16px !important;
            }
            .video-placeholder {
              aspect-ratio: 16/9 !important;
              min-height: 250px !important;
            }
            .video-play-button {
              width: 60px !important;
              height: 60px !important;
              font-size: 24px !important;
            }
          }
        `}</style>
        {/* Hero Section */}
        <section className="hero-section" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '160px 20px 120px 20px',
          textAlign: 'center',
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h1 style={{
            fontSize: 'clamp(56px, 10vw, 96px)',
            fontWeight: 'bold',
            marginBottom: '40px',
            lineHeight: '1.1',
            maxWidth: '1000px',
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}>
            Build Professional Business Websites in Minutes
          </h1>
          <p style={{
            fontSize: 'clamp(20px, 4vw, 28px)',
            marginBottom: '60px',
            maxWidth: '800px',
            opacity: 0.95,
            lineHeight: '1.5',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            Create stunning, professional websites for your business with our easy-to-use website builder. 
            No coding required - just choose your template and customize your content.
          </p>
          <div className="hero-buttons" style={{display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px'}}>
            <a href="/wizard" style={{
              display: 'inline-block',
              background: '#111827',
              color: 'white',
              padding: '20px 40px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '20px',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
            }}>
              ✨ Create Your Site
            </a>
            <a href="#process" style={{
              display: 'inline-block',
              background: 'transparent',
              color: 'white',
              padding: '20px 40px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '20px',
              fontWeight: '700',
              border: '3px solid white',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#667eea';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              📖 Learn More
            </a>
          </div>
          <div className="hero-features" style={{display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', opacity: 0.9, transition: 'all 0.3s ease'}} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.opacity = '1';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '0.9';
            }}>
              <span>🚀</span>
              <span>No credit card</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', opacity: 0.9, transition: 'all 0.3s ease'}} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.opacity = '1';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '0.9';
            }}>
              <span>⚡</span>
              <span>Builds complete in minutes</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', opacity: 0.9, transition: 'all 0.3s ease'}} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.opacity = '1';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '0.9';
            }}>
              <span>🔄</span>
              <span>Unlimited edits</span>
            </div>
          </div>
        </section>

        {/* Process Steps Section */}
        <section id="process" className="process-section" style={{
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          color: 'white',
          padding: '120px 20px',
          position: 'relative',
          transform: 'skewY(-3deg)',
          marginTop: '60px',
          marginBottom: '60px'
        }}>
          <div style={{
            transform: 'skewY(3deg)',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '60px',
              color: 'white'
            }}>
              How It Works
            </h2>
            <p style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              marginBottom: '60px'
            }}>
              From intake to invoice in under 5 minutes
            </p>
            <div className="process-steps" style={{display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center'}}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                padding: '40px',
                borderRadius: '20px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                flex: '1',
                minWidth: '300px',
                color: '#111827',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  margin: '0 auto 20px',
                  boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.3s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotate(360deg) scale(1.1)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                }}>
                  📝
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#111827'
                }}>
                  1. Fill Details
                </h3>
                <p style={{
                  color: '#4b5563',
                  lineHeight: '1.6',
                  fontSize: '16px'
                }}>
                  Enter your business information, services, and locations. Our AI will generate relevant content tailored to your needs.
                </p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                padding: '40px',
                borderRadius: '20px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                flex: '1',
                minWidth: '300px',
                color: '#111827',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  margin: '0 auto 20px',
                  boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.3s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotate(360deg) scale(1.1)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                }}>
                  🤖
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#111827'
                }}>
                  2. Generate Content
                </h3>
                <p style={{
                  color: '#4b5563',
                  lineHeight: '1.6',
                  fontSize: '16px'
                }}>
                  AI creates SEO‑optimized content for your homepage, about page, services, and contact information with industry-specific keywords.
                </p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                padding: '40px',
                borderRadius: '20px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                flex: '1',
                minWidth: '300px',
                color: '#111827',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  margin: '0 auto 20px',
                  boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.3s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotate(360deg) scale(1.1)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                }}>
                  🚀
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#111827'
                }}>
                  3. Download & Deploy
                </h3>
                <p style={{
                  color: '#4b5563',
                  lineHeight: '1.6',
                  fontSize: '16px'
                }}>
                  Get a complete static site and WordPress theme. Deploy anywhere or publish directly to WordPress with one click.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Integration Section */}
        <section className="video-section" style={{
          background: 'white',
          padding: '100px 20px',
          position: 'relative'
        }}>
          <div className="video-grid" style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center'
          }}>
            <div className="video-content">
              <h2 style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '24px',
                lineHeight: '1.2'
              }}>
                Watch It In Action
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '32px'
              }}>
                See how quickly you can go from a simple form to a complete, professional WordPress site ready for your client.
              </p>
              <div className="video-features" style={{display: 'flex', gap: '32px', flexWrap: 'wrap'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', color: '#374151', fontWeight: '500', transition: 'all 0.3s ease'}} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(10px)';
                  e.currentTarget.style.color = '#667eea';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.color = '#374151';
                }}>
                  <span style={{fontSize: '20px'}}>⏱️</span>
                  <span>Under 5 minutes</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', color: '#374151', fontWeight: '500', transition: 'all 0.3s ease'}} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(10px)';
                  e.currentTarget.style.color = '#667eea';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.color = '#374151';
                }}>
                  <span style={{fontSize: '20px'}}>⚡</span>
                  <span>Fully automated</span>
                </div>
              </div>
            </div>
            
            <div className="video-placeholder" style={{
              background: '#f3f4f6',
              borderRadius: '16px',
              aspectRatio: '16/9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
            }}>
              <div className="video-play-button" style={{
                width: '80px',
                height: '80px',
                background: '#f97316',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(249, 115, 22, 0.3)',
                transition: 'all 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.2) rotate(10deg)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(249, 115, 22, 0.5)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 115, 22, 0.3)';
              }}>
                ▶️
              </div>
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#6b7280',
                textAlign: 'center'
              }}>
                Video placeholder - Replace with actual video component
              </div>
            </div>
          </div>
        </section>
      </div>
    </ConditionalLayout>
  );
} 