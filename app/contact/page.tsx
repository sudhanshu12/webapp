import ConditionalLayout from '../components/conditional-layout';

export default function ContactPage() {
  return (
    <ConditionalLayout>
      <div style={{margin: 0, padding: 0, fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif'}}>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '120px 20px',
          textAlign: 'center',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(48px, 8vw, 64px)',
            fontWeight: 'bold',
            marginBottom: '24px',
            lineHeight: '1.1',
            maxWidth: '800px'
          }}>
            Contact Us
          </h1>
          <p style={{
            fontSize: 'clamp(18px, 3vw, 22px)',
            marginBottom: '40px',
            maxWidth: '600px',
            opacity: 0.9
          }}>
            Get in touch with our team for support and questions
          </p>
        </section>

        {/* Contact Section */}
        <section style={{
          background: 'white',
          padding: '80px 20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px'
          }}>
            <div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '30px'
              }}>
                Get in Touch
              </h2>
              <div style={{marginBottom: '30px'}}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '10px'
                }}>
                  Email
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#6b7280'
                }}>
                  support@businesssitesgenerator.com
                </p>
              </div>
              <div style={{marginBottom: '30px'}}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '10px'
                }}>
                  Support Hours
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#6b7280'
                }}>
                  Monday - Friday: 9:00 AM - 6:00 PM EST
                </p>
              </div>
            </div>

            <div style={{
              background: '#f8fafc',
              padding: '40px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '20px'
              }}>
                Send us a Message
              </h3>
              <form style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  style={{
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  style={{
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                />
                <textarea 
                  placeholder="Your Message" 
                  rows={5}
                  style={{
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                />
                <button 
                  type="submit"
                  style={{
                    background: '#3b82f6',
                    color: 'white',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </ConditionalLayout>
  );
}
