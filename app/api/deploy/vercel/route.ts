import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { domain, wizardData, userId } = await request.json()

    if (!domain || !wizardData || !userId) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    // Get user's Vercel OAuth connection
    const { data: connection, error: connectionError } = await supabase
      .from('oauth_connections')
      .select('*')
      .eq('user_id', userId)
      .eq('platform', 'vercel')
      .single()

    if (connectionError || !connection) {
      return NextResponse.json({ error: 'Vercel account not connected' }, { status: 400 })
    }

    // Generate site files
    const siteFiles = await generateSiteFiles(wizardData)
    
    // Create Vercel project
    const projectResponse = await fetch('https://api.vercel.com/v9/projects', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${connection.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: domain.replace('.vercel.app', ''),
        framework: 'static'
      })
    })

    if (!projectResponse.ok) {
      const error = await projectResponse.text()
      console.error('Vercel project creation failed:', error)
      return NextResponse.json({ error: 'Failed to create Vercel project' }, { status: 400 })
    }

    const projectData = await projectResponse.json()

    // Deploy files to Vercel
    const deployResponse = await fetch(`https://api.vercel.com/v13/deployments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${connection.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: projectData.name,
        project: projectData.id,
        files: Object.entries(siteFiles).map(([name, content]) => ({
          file: name,
          data: Buffer.from(content).toString('base64')
        }))
      })
    })

    if (!deployResponse.ok) {
      const error = await deployResponse.text()
      console.error('Vercel deployment failed:', error)
      return NextResponse.json({ error: 'Failed to deploy to Vercel' }, { status: 400 })
    }

    const deployData = await deployResponse.json()
    const deploymentUrl = `https://${projectData.name}.vercel.app`

    return NextResponse.json({
      success: true,
      deploymentUrl,
      projectId: projectData.id,
      deploymentId: deployData.id
    })

  } catch (error) {
    console.error('Vercel deployment error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function generateSiteFiles(wizardData: any) {
  const html = generateHTML(wizardData)
  const css = generateCSS(wizardData)
  const js = generateJS(wizardData)

  return {
    'index.html': html,
    'styles.css': css,
    'script.js': js,
    'vercel.json': JSON.stringify({
      "rewrites": [
        { "source": "/(.*)", "destination": "/index.html" }
      ]
    }, null, 2)
  }
}

function generateHTML(data: any) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.business_name || 'Your Business'}</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <header class="main-header">
        <div class="container">
            <a href="#" class="logo">
                <span>${data.business_name || 'Your Business'}</span>
            </a>
            <nav class="main-nav">
                <ul class="nav-menu">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section id="home" class="hero-section">
            <div class="container">
                <div class="hero-content">
                    <h1>${data.business_name || 'Your Business'}</h1>
                    <p>${data.business_description || 'Professional services for your needs'}</p>
                    <div class="hero-actions">
                        <a href="tel:${data.phone || ''}" class="btn btn-primary">
                            <i class="fas fa-phone"></i> ${data.phone || 'Call Now'}
                        </a>
                        <a href="#contact" class="btn btn-secondary">Get Quote</a>
                    </div>
                </div>
            </div>
        </section>

        <section id="services" class="services-section">
            <div class="container">
                <h2>Our Services</h2>
                <div class="services-grid">
                    ${generateServicesHTML(data.services || [])}
                </div>
            </div>
        </section>

        <section id="about" class="about-section">
            <div class="container">
                <h2>About Us</h2>
                <p>${data.about_text || 'We are a professional business dedicated to providing quality services.'}</p>
            </div>
        </section>

        <section id="contact" class="contact-section">
            <div class="container">
                <h2>Contact Us</h2>
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <span>${data.phone || ''}</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>${data.email || ''}</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${data.address || ''}</span>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="site-footer">
        <div class="container">
            <p>&copy; 2024 ${data.business_name || 'Your Business'}. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`
}

function generateServicesHTML(services: any[]) {
  if (!services || services.length === 0) {
    return `
      <div class="service-card">
        <h3>Service 1</h3>
        <p>Professional service description</p>
      </div>
      <div class="service-card">
        <h3>Service 2</h3>
        <p>Another professional service</p>
      </div>
    `
  }

  return services.map(service => `
    <div class="service-card">
      <h3>${service.name || 'Service'}</h3>
      <p>${service.description || 'Professional service description'}</p>
    </div>
  `).join('')
}

function generateCSS(data: any) {
  return `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #333;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .main-header {
        background: ${data.primary_color || '#0073aa'};
        color: white;
        padding: 1rem 0;
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 1000;
    }

    .main-header .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        color: white;
        text-decoration: none;
        font-size: 1.5rem;
        font-weight: bold;
    }

    .nav-menu {
        display: flex;
        list-style: none;
        gap: 2rem;
    }

    .nav-menu a {
        color: white;
        text-decoration: none;
        transition: opacity 0.3s;
    }

    .nav-menu a:hover {
        opacity: 0.8;
    }

    .hero-section {
        background: linear-gradient(135deg, ${data.primary_color || '#0073aa'}, ${data.secondary_color || '#0056b3'});
        color: white;
        padding: 120px 0 80px;
        text-align: center;
    }

    .hero-content h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .hero-content p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }

    .hero-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .btn {
        display: inline-block;
        padding: 12px 24px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s;
    }

    .btn-primary {
        background: ${data.button_color || '#ff6b35'};
        color: white;
    }

    .btn-secondary {
        background: transparent;
        color: white;
        border: 2px solid white;
    }

    .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .services-section, .about-section, .contact-section {
        padding: 80px 0;
    }

    .services-section {
        background: #f8f9fa;
    }

    .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .service-card {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        text-align: center;
    }

    .service-card h3 {
        color: ${data.primary_color || '#0073aa'};
        margin-bottom: 1rem;
    }

    .contact-info {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .contact-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
    }

    .contact-item i {
        color: ${data.primary_color || '#0073aa'};
        font-size: 1.2rem;
    }

    .site-footer {
        background: #333;
        color: white;
        text-align: center;
        padding: 2rem 0;
    }

    @media (max-width: 768px) {
        .hero-content h1 {
            font-size: 2rem;
        }
        
        .nav-menu {
            display: none;
        }
        
        .hero-actions {
            flex-direction: column;
            align-items: center;
        }
    }
  `
}

function generateJS(data: any) {
  return `
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 115, 170, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '${data.primary_color || '#0073aa'}';
            header.style.backdropFilter = 'none';
        }
    });
  `
}
