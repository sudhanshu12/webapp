import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    console.log('=== BUILD THEME API DEBUG ===');
    console.log('Received data:', JSON.stringify(data, null, 2));
    
    const zip = new JSZip();
    
    const businessName = data.business_name || data.company || 'Your Business';
    const businessType = data.business_type || data.industry || 'service';
    const location = data.location || data.city || '';
    const phone = data.phone || '';
    const email = data.email || '';
    const primaryColor = data.primary_color || '#2563eb';
    const secondaryColor = data.secondary_color || '#1e40af';
    const accentColor = data.accent_color || '#f59e0b';
    const heroHeadline = data.hero_headline || `Find ${businessType} Near You`;
    const heroSubheadline = data.hero_subheadline || 'Contact Us Now to Get Going!';
    const aboutDesc = data.about_home_desc || `With over 15 years of experience serving ${location}, we've built a reputation for excellence in ${businessType}. Our commitment to quality materials, exceptional craftsmanship, and outstanding customer service sets us apart.`;

    // Generate reviews
    const reviews = [
      {
        name: 'Sarah Johnson',
        text: `${businessName} transformed our project with their professional service. Highly recommend for any ${businessType} work in ${location}!`,
        date: '2024-08-15'
      },
      {
        name: 'Mike Chen',
        text: `Outstanding work! ${businessName} completed our project on time and within budget. The team was knowledgeable and courteous.`,
        date: '2024-08-10'
      },
      {
        name: 'Lisa Rodriguez',
        text: `We're thrilled with the results. ${businessName} created exactly what we envisioned and more. Their expertise is unmatched.`,
        date: '2024-08-05'
      }
    ];

    // Generate services
    const services = (data.services || []).map((s: any) => ({
      name: s.name || '',
      description: s.description || `Professional ${s.name} services with attention to detail and quality results.`
    }));

    // Generate locations/service areas
    const locations = (data.service_areas || data.locations || []).map((l: any) => ({
      name: l.name || '',
      state: l.state || data.state || ''
    }));

    // Helper function to escape PHP strings
    const escapePhpString = (str: string) => str.replace(/'/g, "\\'").replace(/"/g, '\\"');

    // Create pixel-perfect homepage
    const homeDynamic = `<?php
/*
 * Template Name: BSG Dynamic Homepage
 * Description: Dynamic homepage that uses wizard data
 */

$business_name = '${escapePhpString(businessName)}';
$phone = '${escapePhpString(phone)}';
$email = '${escapePhpString(email)}';
$location = '${escapePhpString(location)}';
$business_type = '${businessType}';

$services = array(
    ${services.map((service: any) => `array('name' => '${escapePhpString(service.name)}', 'description' => '${escapePhpString(service.description)}')`).join(',\n    ')}
);

$reviews = array(
    ${reviews.map((review: any) => `array('name' => '${escapePhpString(review.name)}', 'text' => '${escapePhpString(review.text)}', 'date' => '${review.date}')`).join(',\n    ')}
);

$service_areas = array(
    ${locations.map((loc: any) => `array('name' => '${escapePhpString(loc.name)}', 'state' => '${escapePhpString(loc.state)}')`).join(',\n    ')}
);

$about_desc = '${escapePhpString(aboutDesc)}';
$hero_headline = '${escapePhpString(heroHeadline)}';
$hero_subheadline = '${escapePhpString(heroSubheadline)}';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo esc_html($business_name); ?> - Professional <?php echo esc_html($business_type); ?> Services</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <style>
        :root {
            --dark-navy: #232834;
            --medium-navy: #2A3440;
            --teal: #4ecdc4;
            --orange: #f59e0b;
            --white: #FFFFFF;
            --text-gray: #A0AEC0;
            --border-color: #4A5568;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--dark-navy);
            color: var(--white);
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Header */
        .main-header {
            background-color: var(--dark-navy);
            border-bottom: 1px solid var(--border-color);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .main-header .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 80px;
            padding: 0 40px;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            color: var(--white);
            font-weight: 700;
            font-size: 1.5rem;
        }
        
        .logo-icon {
            width: 40px;
            height: 30px;
        }
        
        .nav-menu {
            display: flex;
            list-style: none;
            gap: 30px;
            align-items: center;
        }
        
        .nav-menu a {
            color: var(--white);
            text-decoration: none;
            font-weight: 500;
            text-transform: uppercase;
            font-size: 0.9rem;
            transition: color 0.3s ease;
        }
        
        .nav-menu a:hover {
            color: var(--teal);
        }
        
        .header-cta {
            background-color: var(--orange);
            color: var(--white);
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .header-cta:hover {
            background-color: #d97706;
            transform: translateY(-2px);
        }
        
        /* Hero Section */
        .hero-section {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 120px 0 80px;
            color: var(--dark-navy);
        }
        
        .hero-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
        }
        
        .hero-text {
            max-width: 500px;
        }
        
        .hero-label {
            color: var(--teal);
            font-weight: 600;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }
        
        .hero-text h1 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 20px;
            line-height: 1.2;
            color: var(--dark-navy);
        }
        
        .hero-text p {
            font-size: 1.1rem;
            margin-bottom: 30px;
            color: #4a5568;
            line-height: 1.6;
        }
        
        .hero-actions {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            margin-bottom: 20px;
        }
        
        .btn {
            padding: 15px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-block;
            border: none;
            cursor: pointer;
            font-size: 1rem;
        }
        
        .btn-primary {
            background-color: var(--orange);
            color: var(--white);
        }
        
        .btn-primary:hover {
            background-color: #d97706;
            transform: translateY(-2px);
        }
        
        .hero-rating {
            color: var(--orange);
            font-weight: 600;
            font-size: 0.9rem;
        }
        
        .contact-form {
            background-color: var(--dark-navy);
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        .form-title {
            font-size: 1.5rem;
            margin-bottom: 30px;
            text-align: center;
            color: var(--white);
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: var(--white);
        }
        
        .form-group input, .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            background-color: var(--medium-navy);
            color: var(--white);
            font-size: 1rem;
        }
        
        .form-group input:focus, .form-group textarea:focus {
            outline: none;
            border-color: var(--teal);
        }
        
        .btn-submit {
            width: 100%;
            padding: 15px;
            background-color: var(--orange);
            color: var(--white);
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .btn-submit:hover {
            background-color: #d97706;
        }
        
        /* Features Section */
        .features-section {
            background-color: var(--dark-navy);
            padding: 80px 0;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        
        .feature-card {
            text-align: center;
            padding: 30px;
        }
        
        .feature-icon {
            font-size: 2rem;
            margin-bottom: 20px;
            color: var(--teal);
        }
        
        .feature-card h3 {
            font-size: 1.3rem;
            margin-bottom: 15px;
            font-weight: 600;
            color: var(--white);
        }
        
        .feature-card p {
            color: var(--text-gray);
            line-height: 1.6;
        }
        
        /* About Section */
        .about-section {
            background-color: var(--dark-navy);
            padding: 80px 0;
        }
        
        .about-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
        }
        
        .about-image {
            text-align: center;
        }
        
        .about-image img {
            max-width: 100%;
            border-radius: 12px;
        }
        
        .about-text {
            max-width: 500px;
        }
        
        .about-label {
            color: var(--teal);
            font-weight: 600;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }
        
        .about-text h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: var(--white);
        }
        
        .about-text p {
            color: var(--text-gray);
            margin-bottom: 20px;
            line-height: 1.8;
        }
        
        .experience-badge {
            display: inline-block;
            background-color: var(--teal);
            color: var(--white);
            padding: 15px 25px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .experience-badge span {
            display: block;
        }
        
        .experience-badge .years {
            font-size: 1.5rem;
            font-weight: 700;
        }
        
        .experience-badge .label {
            font-size: 0.9rem;
        }
        
        /* Services Section */
        .services-section {
            background-color: var(--dark-navy);
            padding: 80px 0;
        }
        
        .section-header {
            text-align: center;
            margin-bottom: 60px;
        }
        
        .section-label {
            color: var(--teal);
            font-weight: 600;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }
        
        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: var(--white);
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        
        .service-card {
            background-color: var(--medium-navy);
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            transition: transform 0.3s ease;
        }
        
        .service-card:hover {
            transform: translateY(-5px);
        }
        
        .service-icon {
            font-size: 2rem;
            margin-bottom: 20px;
            color: var(--teal);
        }
        
        .service-card h3 {
            font-size: 1.3rem;
            margin-bottom: 15px;
            font-weight: 600;
            color: var(--white);
        }
        
        .service-card p {
            color: var(--text-gray);
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .service-phone {
            font-weight: 600;
            color: var(--teal);
            margin-bottom: 15px;
        }
        
        .service-link {
            color: var(--teal);
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s ease;
        }
        
        .service-link:hover {
            color: var(--white);
        }
        
        /* Locations Section */
        .locations-section {
            background-color: var(--dark-navy);
            padding: 80px 0;
        }
        
        .locations-content {
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .locations-content p {
            color: var(--text-gray);
            margin-bottom: 30px;
            line-height: 1.6;
        }
        
        .locations-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .location-item {
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--white);
            font-weight: 500;
        }
        
        .location-item::before {
            content: "✓";
            color: var(--teal);
            font-weight: bold;
        }
        
        .locations-cta {
            background-color: var(--orange);
            color: var(--white);
            padding: 15px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-block;
        }
        
        .locations-cta:hover {
            background-color: #d97706;
            transform: translateY(-2px);
        }
        
        /* Reviews Section */
        .reviews-section {
            background-color: #f8fafc;
            padding: 80px 0;
            color: var(--dark-navy);
        }
        
        .reviews-section .section-title {
            color: var(--dark-navy);
        }
        
        .reviews-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        
        .review-card {
            background-color: var(--white);
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .review-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .reviewer-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .reviewer-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--teal);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--white);
            font-weight: 600;
        }
        
        .reviewer-name {
            font-weight: 600;
            color: var(--dark-navy);
        }
        
        .review-date {
            color: var(--text-gray);
            font-size: 0.9rem;
        }
        
        .review-stars {
            color: var(--orange);
            font-size: 1.2rem;
            margin-bottom: 15px;
        }
        
        .review-text {
            color: var(--dark-navy);
            line-height: 1.6;
            font-style: italic;
        }
        
        /* Commitment Section */
        .commitment-section {
            background-color: var(--dark-navy);
            padding: 80px 0;
        }
        
        .commitment-content {
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .commitment-content p {
            color: var(--text-gray);
            line-height: 1.8;
            margin-bottom: 30px;
        }
        
        /* Footer */
        .main-footer {
            background-color: var(--dark-navy);
            padding: 60px 0 30px;
            border-top: 1px solid var(--border-color);
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 40px;
            margin-bottom: 40px;
        }
        
        .footer-section h3 {
            color: var(--teal);
            margin-bottom: 20px;
            font-size: 1.2rem;
        }
        
        .footer-section p, .footer-section a {
            color: var(--text-gray);
            margin-bottom: 10px;
            line-height: 1.6;
            text-decoration: none;
        }
        
        .footer-section a:hover {
            color: var(--teal);
        }
        
        .footer-bottom {
            text-align: center;
            padding-top: 30px;
            border-top: 1px solid var(--border-color);
            color: var(--text-gray);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .hero-content {
                grid-template-columns: 1fr;
                gap: 40px;
            }
            
            .hero-text h1 {
                font-size: 2rem;
            }
            
            .nav-menu {
                display: none;
            }
            
            .section-title {
                font-size: 2rem;
            }
            
            .services-grid, .reviews-grid {
                grid-template-columns: 1fr;
            }
            
            .about-content {
                grid-template-columns: 1fr;
                gap: 40px;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="main-header">
        <div class="container">
            <a href="<?php echo home_url('/'); ?>" class="logo">
                <svg class="logo-icon" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0L0 20H10L20 10L30 20H40L20 0Z" fill="<?php echo esc_attr($primary_color); ?>"/>
                    <path d="M10 20L20 30L30 20H10Z" fill="<?php echo esc_attr($secondary_color); ?>"/>
                </svg>
                <span><?php echo esc_html($business_name); ?></span>
            </a>
            <nav>
                <ul class="nav-menu">
                    <li><a href="<?php echo home_url('/'); ?>">Home</a></li>
                    <li><a href="<?php echo home_url('/services/'); ?>">Services</a></li>
                    <li><a href="<?php echo home_url('/service-locations/'); ?>">Service Locations</a></li>
                    <li><a href="<?php echo home_url('/about-us/'); ?>">About</a></li>
                    <li><a href="<?php echo home_url('/contact/'); ?>">Contact Us</a></li>
                </ul>
            </nav>
            <a href="tel:<?php echo esc_attr($phone); ?>" class="header-cta"><?php echo esc_html($phone); ?></a>
        </div>
    </header>

    <!-- Main Content -->
    <main>
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="container">
                <div class="hero-content">
                    <div class="hero-text">
                        <div class="hero-label"><?php echo esc_html(strtoupper($business_name)); ?></div>
                        <h1><?php echo esc_html($hero_headline); ?></h1>
                        <p><?php echo esc_html($hero_subheadline); ?></p>
                        <p>Transform your space with expert <?php echo esc_html($business_type); ?> in <?php echo esc_html($location); ?> - from professional services to complete solutions, we make your vision stunning.</p>
                        <div class="hero-actions">
                            <a href="#contact" class="btn btn-primary">Book Online</a>
                            <a href="tel:<?php echo esc_attr($phone); ?>" class="btn btn-primary">Call <?php echo esc_html($phone); ?></a>
                        </div>
                        <div class="hero-rating">★★★★★ Rated 5 Stars On Google</div>
                    </div>
                    <div class="contact-form">
                        <h3 class="form-title">Get Your Free Quote</h3>
                        <form>
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" id="name" name="name" placeholder="Your full name" required>
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone Number</label>
                                <input type="tel" id="phone" name="phone" placeholder="Your phone number" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input type="email" id="email" name="email" placeholder="Your email address" required>
                            </div>
                            <div class="form-group">
                                <label for="message">How Can We Help You?</label>
                                <textarea id="message" name="message" placeholder="Describe your needs" required></textarea>
                            </div>
                            <button type="submit" class="btn-submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="features-section">
            <div class="container">
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">✓</div>
                        <h3>Thorough Site Inspection</h3>
                        <p>Detailed assessment to ensure precise planning and care</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">✓</div>
                        <h3>Premium Quality Materials</h3>
                        <p>Using top-grade supplies for lasting beauty and durability</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">✓</div>
                        <h3>Expert Craftsmanship</h3>
                        <p>Skilled professionals delivering flawless results</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section class="about-section">
            <div class="container">
                <div class="about-content">
                    <div class="about-image">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face" alt="<?php echo esc_attr($business_name); ?> Team">
                    </div>
                    <div class="about-text">
                        <div class="about-label">WHO WE ARE</div>
                        <h2>About <?php echo esc_html($business_name); ?> Company</h2>
                        <p><?php echo esc_html($about_desc); ?></p>
                        <div class="experience-badge">
                            <span class="years">15</span>
                            <span class="label">Years of Experience</span>
                        </div>
                        <a href="<?php echo home_url('/about-us/'); ?>" class="btn btn-primary">About Us</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section class="services-section">
            <div class="container">
                <div class="section-header">
                    <div class="section-label">TOP RATED <?php echo esc_html(strtoupper($business_type)); ?> SERVICES</div>
                    <h2 class="section-title">Our Services</h2>
                </div>
                <div class="services-grid">
                    <?php foreach ($services as $service): ?>
                        <?php if (!empty($service['name'])): ?>
                        <div class="service-card">
                            <div class="service-icon">✓</div>
                            <h3><?php echo esc_html($service['name']); ?></h3>
                            <p><?php echo esc_html($service['description']); ?></p>
                            <div class="service-phone"><?php echo esc_html($phone); ?></div>
                            <a href="<?php echo home_url('/services/'); ?>" class="service-link">See More →</a>
                        </div>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>

        <!-- Locations Section -->
        <section class="locations-section">
            <div class="container">
                <div class="locations-content">
                    <div class="section-header">
                        <div class="section-label">OUR SERVICE AREA</div>
                        <h2 class="section-title">Proudly Serving <?php echo esc_html($location); ?> And The Surrounding Areas</h2>
                    </div>
                    <p>Proudly serving <?php echo esc_html($location); ?> and the surrounding areas, including all nearby communities and neighborhoods.</p>
                    <div class="locations-grid">
                        <?php foreach ($service_areas as $area): ?>
                            <?php if (!empty($area['name'])): ?>
                            <div class="location-item"><?php echo esc_html($area['name']); ?></div>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </div>
                    <a href="<?php echo home_url('/service-locations/'); ?>" class="locations-cta">View All Service Locations</a>
                </div>
            </div>
        </section>

        <!-- Reviews Section -->
        <section class="reviews-section">
            <div class="container">
                <div class="section-header">
                    <div class="section-label">WHAT PEOPLE SAY</div>
                    <h2 class="section-title">Customer Reviews</h2>
                </div>
                <div class="reviews-grid">
                    <?php foreach ($reviews as $review): ?>
                        <?php if (!empty($review['name']) && !empty($review['text'])): ?>
                        <div class="review-card">
                            <div class="review-header">
                                <div class="reviewer-info">
                                    <div class="reviewer-avatar"><?php echo esc_html(substr($review['name'], 0, 1)); ?></div>
                                    <div>
                                        <div class="reviewer-name"><?php echo esc_html($review['name']); ?></div>
                                        <div class="review-date"><?php echo esc_html($review['date']); ?></div>
                                    </div>
                                </div>
                            </div>
                            <div class="review-stars">★★★★★</div>
                            <p class="review-text"><?php echo esc_html($review['text']); ?></p>
                        </div>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>

        <!-- Commitment Section -->
        <section class="commitment-section">
            <div class="container">
                <div class="commitment-content">
                    <div class="section-header">
                        <div class="section-label">OUR COMMITMENT</div>
                        <h2 class="section-title">Our Promise Of Reliability</h2>
                    </div>
                    <p><?php echo esc_html($about_desc); ?></p>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="main-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Navigation</h3>
                    <p><a href="<?php echo home_url('/'); ?>">Home</a></p>
                    <p><a href="<?php echo home_url('/about-us/'); ?>">About Us</a></p>
                    <p><a href="<?php echo home_url('/contact/'); ?>">Contact Us</a></p>
                </div>
                <div class="footer-section">
                    <h3>Services</h3>
                    <p><a href="<?php echo home_url('/services/'); ?>">Our Services</a></p>
                </div>
                <div class="footer-section">
                    <h3><?php echo esc_html($business_name); ?></h3>
                    <p><?php echo esc_html($email); ?></p>
                    <p><?php echo esc_html($phone); ?></p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> <?php echo esc_html(strtolower(str_replace(' ', '', $business_name))); ?>.com. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;

    // Add files to ZIP
    zip.file('home-dynamic.php', homeDynamic);
    zip.file('style.css', `/*
Theme Name: ${businessName} - Professional ${businessType}
Description: Custom professional ${businessType} website with embedded content
Version: 1.0
Author: Sudhanshu Rana
*/`);
    zip.file('index.php', `<?php
/*
 * Front page template
 */
include 'home-dynamic.php';
?>`);
    zip.file('README.txt', `PIXEL PERFECT THEME SETUP

This theme has been generated with your business data and is designed to match the Matt's Landscaping design exactly.

SETUP INSTRUCTIONS:
1. Upload this ZIP file to your WordPress site
2. Go to Appearance > Themes and activate this theme
3. Go to Pages > Add New
4. Create a new page called "Home"
5. In the Page Attributes, set Template to "BSG Dynamic Homepage"
6. Go to Settings > Reading
7. Set "Your homepage displays" to "A static page"
8. Select your "Home" page as the homepage
9. Save changes

Your site will now display the pixel-perfect homepage with all your business data!

FEATURES:
- Dark navy theme with teal and orange accents
- Hero section with contact form
- Features section with 3 key benefits
- About section with team image
- Services section with your services
- Service areas section
- Customer reviews section
- Commitment section
- Professional footer

All content is automatically populated from your wizard data.
`);

    // Generate ZIP
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    
    // Convert to base64
    const base64 = zipBuffer.toString('base64');
    
    console.log('=== THEME GENERATED SUCCESSFULLY ===');
    console.log('Theme size:', zipBuffer.length, 'bytes');
    console.log('Base64 length:', base64.length);
    
    return NextResponse.json({
      success: true,
      message: 'Pixel perfect theme generated successfully!',
      data: base64,
      filename: `${businessName.toLowerCase().replace(/\s+/g, '-')}-theme.zip`
    });

  } catch (error) {
    console.error('Error generating theme:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate theme' },
      { status: 500 }
    );
  }
}
