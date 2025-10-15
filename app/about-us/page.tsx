import ConditionalLayout from '../components/conditional-layout';

export default function AboutUsPage() {
  return (
    <ConditionalLayout>
      <div style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px', color: '#111827', textAlign: 'center' }}>About Our Business</h1>
        <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#4b5563', marginBottom: '32px', textAlign: 'center', maxWidth: '800px', margin: '0 auto 32px auto' }}>
          We are dedicated to providing top-notch services and solutions to our clients. Our mission is to empower businesses with innovative tools and exceptional support.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', marginTop: '40px' }}>
          <div style={{ background: '#f9fafb', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>Our Mission</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#4b5563' }}>
              Our mission is to deliver unparalleled value through cutting-edge technology and a customer-centric approach. We strive to build lasting relationships by consistently exceeding expectations and fostering a culture of innovation and excellence.
            </p>
          </div>
          <div style={{ background: '#f9fafb', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>Our Vision</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#4b5563' }}>
              We envision a future where businesses of all sizes can effortlessly establish a strong online presence and connect with their audience. We aim to be the leading provider of AI-powered website generation, making professional web development accessible to everyone.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>Meet Our Team</h2>
          <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#4b5563', maxWidth: '700px', margin: '0 auto' }}>
            Our diverse team of experts is passionate about technology and dedicated to your success. We bring together a wealth of experience in AI, web development, and digital marketing to create exceptional products.
          </p>
        </div>
      </div>
    </ConditionalLayout>
  );
}
