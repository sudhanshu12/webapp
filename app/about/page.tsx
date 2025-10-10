import ConditionalLayout from '../components/conditional-layout';

export default function AboutPage() {
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
            About Business Sites Generator
          </h1>
          <p style={{
            fontSize: 'clamp(18px, 3vw, 22px)',
            marginBottom: '40px',
            maxWidth: '600px',
            opacity: 0.9
          }}>
            We help businesses create professional websites quickly and easily
          </p>
        </section>

        {/* Content Section */}
        <section style={{
          background: 'white',
          padding: '80px 20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            marginBottom: '60px'
          }}>
            <div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '20px'
              }}>
                Our Mission
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                We believe every business deserves a professional online presence. Our platform makes it easy for anyone to create stunning websites without technical expertise.
              </p>
            </div>
            <div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '20px'
              }}>
                What We Do
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                We provide an intuitive website builder with professional templates, AI-powered content generation, and seamless deployment options for businesses of all sizes.
              </p>
            </div>
          </div>
        </section>
      </div>
    </ConditionalLayout>
  );
}
