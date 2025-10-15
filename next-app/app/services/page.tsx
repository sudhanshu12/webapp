import ConditionalLayout from '../components/conditional-layout';

export default function ServicesPage() {
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
            Our Services
          </h1>
          <p style={{
            fontSize: 'clamp(18px, 3vw, 22px)',
            marginBottom: '40px',
            maxWidth: '600px',
            opacity: 0.9
          }}>
            Everything you need to build and launch your professional website
          </p>
        </section>

        {/* Services Grid */}
        <section style={{
          background: 'white',
          padding: '80px 20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            <div style={{
              background: '#f8fafc',
              padding: '40px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}>🎨</div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '16px'
              }}>
                Website Design
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Professional templates designed for modern businesses with responsive layouts and beautiful aesthetics.
              </p>
            </div>

            <div style={{
              background: '#f8fafc',
              padding: '40px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}>🤖</div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '16px'
              }}>
                AI Content Generation
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Generate SEO-optimized content for your website using our advanced AI technology.
              </p>
            </div>

            <div style={{
              background: '#f8fafc',
              padding: '40px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}>🚀</div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '16px'
              }}>
                Easy Deployment
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Deploy your website with one click to WordPress or download as static files.
              </p>
            </div>
          </div>
        </section>
      </div>
    </ConditionalLayout>
  );
}
