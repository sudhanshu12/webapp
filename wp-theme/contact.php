<?php
/*
 * Template Name: BSG Contact
 * Description: Contact page for your business, dynamic sections.
 */
// Get centralized settings
$business = bsg_get_business_info();
$settings = bsg_get_settings();
$contact_settings = bsg_get_contact_settings();
$colors = bsg_get_color_scheme();

// Generate meta title and description for Contact page
$meta_title = $settings['contact_meta_title'] ?? ('Contact ' . $business['name'] . ' - Get Free Estimate | Professional Services in ' . $business['state']);
$meta_description = $settings['contact_meta_description'] ?? ('Contact ' . $business['name'] . ' for professional ' . $business['business_type'] . ' services. Get free estimates, expert consultation, and reliable service. Call ' . $business['phone'] . ' or fill out our contact form today!');

// Use general section data for contact information
$contact_description = $settings['contact_description'] ?? '';
$contact_phone = $business['phone'];
$contact_email = $business['email'];
$contact_address = $business['address'];
$contact_heading = $settings['contact_heading'] ?? 'Get In Touch';
$contact_business_name = $business['name'];
// Use new simplified contact field names
$contact_section_bg_color = $settings['contact_section_bg_color'] ?? '#232a36';
$contact_left_bg_color = $settings['contact_left_side_color'] ?? '#2ee6c5';
$contact_right_bg_color = $settings['contact_right_side_color'] ?? '#ffffff';
$contact_text_color = $settings['contact_text_color'] ?? '#ffffff';
$contact_headline_color = $settings['contact_headline_color'] ?? '#ffffff';
$contact_description_color = $settings['contact_description_color'] ?? 'rgba(255,255,255,0.9)';
$contact_form_bg_color = 'transparent';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo esc_html($settings['contact_meta_title'] ?? $business_name . ' - Contact Us | Get Free Estimate'); ?></title>
    <meta name="description" content="<?php echo esc_attr($settings['contact_meta_description'] ?? 'Contact ' . $business_name . ' for professional ' . ($settings['business_type'] ?? 'services') . '. Get free estimates, expert consultation, and reliable service. Call ' . $phone . ' or fill out our contact form today!'); ?>">
    <meta name="keywords" content="<?php echo esc_attr($settings['contact_meta_keywords'] ?? 'contact ' . strtolower($business_name) . ', ' . ($settings['business_type'] ?? 'services') . ' estimate, free consultation, ' . ($settings['business_type'] ?? 'contractor') . ' contact, ' . $phone); ?>">
    <meta name="author" content="<?php echo esc_attr($business_name); ?>">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="<?php echo esc_attr($settings['contact_meta_title'] ?? $business_name . ' - Contact Us | Get Free Estimate'); ?>">
    <meta property="og:description" content="<?php echo esc_attr($settings['contact_meta_description'] ?? 'Contact ' . $business_name . ' for professional ' . ($settings['business_type'] ?? 'services') . '. Get free estimates, expert consultation, and reliable service.'); ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo esc_url(home_url('/contact-us/')); ?>">
    <meta property="og:site_name" content="<?php echo esc_attr($business_name); ?>">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo esc_attr($settings['contact_meta_title'] ?? $business_name . ' - Contact Us | Get Free Estimate'); ?>">
    <meta name="twitter:description" content="<?php echo esc_attr($settings['contact_meta_description'] ?? 'Contact ' . $business_name . ' for professional ' . ($settings['business_type'] ?? 'services') . '. Get free estimates, expert consultation, and reliable service.'); ?>">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="<?php echo esc_url(home_url('/contact-us/')); ?>">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="<?php echo get_template_directory_uri(); ?>/favicon.svg">
    <link rel="icon" type="image/x-icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/favicon.svg">
    
    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
<?php
$main_entity = [
    '@type' => 'LocalBusiness',
    'name' => $business_name,
    'telephone' => $phone,
    'email' => $email,
    'address' => [
        '@type' => 'PostalAddress',
        'streetAddress' => $address,
    ],
    'contactPoint' => [
        '@type' => 'ContactPoint',
        'telephone' => $phone,
        'contactType' => 'customer service',
        'availableLanguage' => 'English',
    ],
];

$reviews = $settings['reviews'] ?? [];
if (!empty($reviews) && is_array($reviews)) {
    $total_reviews = count($reviews);
    $avg_rating = $total_reviews ? round(array_sum(array_map(function($r){return floatval($r['rating'] ?? 0);}, $reviews)) / $total_reviews, 1) : 0;

    $review_schemas = [];
    foreach ($reviews as $review) {
        if (empty($review['name']) || empty($review['rating']) || empty($review['text'])) { continue; }
        $review_schemas[] = [
            '@type' => 'Review',
            'author' => [
                '@type' => 'Person',
                'name' => $review['name'],
            ],
            'reviewRating' => [
                '@type' => 'Rating',
                'ratingValue' => intval($review['rating']),
                'bestRating' => 5,
                'worstRating' => 1,
            ],
            'reviewBody' => $review['text'],
            'datePublished' => !empty($review['date']) ? $review['date'] : null,
        ];
    }

    if ($total_reviews > 0) {
        $main_entity['aggregateRating'] = [
            '@type' => 'AggregateRating',
            'ratingValue' => $avg_rating,
            'reviewCount' => $total_reviews,
            'bestRating' => 5,
            'worstRating' => 1,
        ];
        if (!empty($review_schemas)) {
            $main_entity['review'] = $review_schemas;
        }
    }
}

$schema = [
    '@context' => 'https://schema.org',
    '@type' => 'ContactPage',
    'name' => $business_name . ' - Contact Us',
    'description' => ($settings['contact_meta_description'] ?? ('Contact ' . $business_name . ' for professional ' . ($settings['business_type'] ?? 'services') . '. Get free estimates, expert consultation, and reliable service.')),
    'url' => home_url('/contact-us/'),
    'mainEntity' => $main_entity,
];

echo wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
?>
    </script>
    
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/public.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    
    <style>
        :root {
            --primary-color: <?php echo esc_attr($settings['primary_color'] ?? '#2563eb'); ?>;
            --secondary-color: <?php echo esc_attr($settings['secondary_color'] ?? '#0ea5e9'); ?>;
            --surface-color: <?php echo esc_attr($settings['surface_color'] ?? '#0f172a'); ?>;
            --text-color: <?php echo esc_attr($settings['text_color'] ?? '#e5e7eb'); ?>;
        }
        .main-header { background: var(--surface-color); color: var(--text-color); }
        .main-header .nav-menu a { color: var(--text-color); }
        .main-header .container { display:flex; align-items:center; justify-content:space-between; gap:1rem; padding: 0 1.5rem; margin:0; }

        .main-header .logo { display:flex; align-items:center; margin:0; padding:0; color: var(--text-color); text-decoration: none; }
.main-header .logo span { color: var(--text-color); }
        .main-header .logo img, .main-header .logo svg { display:block; }
        .site-footer { background: var(--surface-color); color: var(--text-color); }
        
        /* Essential BSG Styles */
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
        .services-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
            gap: 2rem; 
            margin-top: 2rem; 
        }
        .service-areas-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
            gap: 2rem; 
            margin-top: 2rem; 
        }
        
        /* Ensure service area section displays correctly */
        .locations-section .two-col-layout {
            display: flex !important;
            align-items: flex-start !important;
            gap: 3rem !important;
        }
        
        .locations-section .text-content {
            flex: 1 !important;
            min-width: 320px !important;
        }
        
        .locations-section .content-image {
            flex: 1 !important;
            min-width: 320px !important;
            max-width: 600px !important;
        }
        
        .locations-section .map-container {
            width: 500px !important;
            height: 400px !important;
            border-radius: 8px !important;
            overflow: hidden !important;
            pointer-events: none !important;
            margin: 0 auto !important;
        }
        
        /* Mobile responsive styles for service area section */
        @media (max-width: 768px) {
            .locations-section .two-col-layout {
                flex-direction: column !important;
                gap: 2rem !important;
            }
            
            .locations-section .text-content,
            .locations-section .content-image {
                min-width: 100% !important;
                max-width: 100% !important;
            }
            
            .locations-section .map-container {
                width: 100% !important;
                height: 300px !important;
            }
        }
        .faq-grid { 
            display: grid; 
            grid-template-columns: 1fr; 
            gap: 1.5rem; 
            margin-top: 2rem; 
            max-width: 800px; 
            margin-left: auto; 
            margin-right: auto; 
        }
        .main-footer {
            background: var(--surface-color);
            color: var(--text-color);
            padding: 3rem 0 1rem 0;
        }
        .footer-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
            margin-bottom: 2rem;
        }
        .footer-col h4 {
            color: var(--text-color);
            margin-bottom: 1rem;
            font-size: 1rem;
            font-weight: 700;
            letter-spacing: 1px;
        }
        .footer-col ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .footer-col ul li {
            margin-bottom: 0.5rem;
        }
        .footer-col ul li a {
            color: var(--text-color);
            text-decoration: none;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        .footer-col ul li a:hover {
            opacity: 1;
        }
        .footer-logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
            color: var(--text-color);
            text-decoration: none;
            font-weight: 700;
        }
        .footer-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 2rem;
            border-top: 1px solid rgba(255,255,255,0.1);
        }
        .social-icons {
            display: flex;
            gap: 1rem;
        }
        .social-icons a {
            color: var(--text-color);
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        .social-icons a:hover {
            opacity: 1;
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
            .main-header .container {
                padding: 0 1rem;
            }
            
            .main-header .logo {
                font-size: 1.2rem;
            }
            
            .main-header .logo img,
            .main-header .logo svg {
                width: 30px;
                height: 22px;
            }
            
            .header-actions {
                display: none;
            }
            
            .main-nav {
                position: fixed;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100vh;
                background: var(--mobile-menu-bg, rgba(35, 40, 52, 0.98));
                backdrop-filter: blur(10px);
                transition: left 0.3s ease;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .main-nav.open {
                left: 0;
            }
            
            .nav-menu {
                flex-direction: column;
                gap: 2rem;
                text-align: center;
            }
            
            .nav-menu li {
                margin: 0;
            }
            
            .nav-menu a {
                font-size: 1.5rem;
                padding: 1rem;
                display: block;
                color: var(--mobile-menu-link-color, var(--text-color));
            }
            
            .dropdown {
                position: static;
                background: none;
                box-shadow: none;
                padding: 0;
                margin-top: 1rem;
            }
            
            .dropdown li {
                margin: 0.5rem 0;
            }
            
            .dropdown a {
                font-size: 1.2rem;
                padding: 0.5rem;
            }
            
            .hamburger {
                display: block;
                cursor: pointer;
                z-index: 1001;
                color: var(--text-color);
            }
            
            .hamburger span {
                display: block;
                width: 25px;
                height: 3px;
                background: var(--mobile-menu-icon, var(--text-color));
                margin: 5px 0;
                transition: 0.3s;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
            }
        }

        /* Animation keyframes */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Scroll-triggered animation classes */
        .animate-on-scroll-section {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 1.2s ease-out, transform 1.2s ease-out;
        }

        .animate-on-scroll-section.animated {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>
<body>
    
    <?php include dirname(__FILE__) . '/section-header.php'; ?>
    <main>
        <section class="contact-section-custom animate-on-scroll-section" style="background:<?php echo esc_attr($contact_section_bg_color); ?>;padding:80px 0;">
            <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
                <div style="text-align:center;margin-bottom:3rem;">
                    <h1 style="color:<?php echo esc_attr($contact_headline_color); ?>;font-size:2.5rem;font-weight:700;margin-bottom:1rem;line-height:1.2;"><?php echo esc_html($contact_heading); ?></h1>
                    <p style="color:<?php echo esc_attr($contact_description_color); ?>;font-size:1.1rem;max-width:600px;margin:0 auto;"><?php echo esc_html($contact_description); ?></p>
                </div>
                <div class="contact-card" style="display:flex;flex-wrap:wrap;max-width:1000px;width:100%;margin:0 auto;background:#ffffff;border-radius:20px;box-shadow:0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1);overflow:hidden;transform:translateY(0);transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 25px 50px rgba(0,0,0,0.2), 0 12px 24px rgba(0,0,0,0.15)';" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)';">
                    <div class="contact-left" style="flex:1 1 420px;min-width:340px;padding:48px;background:<?php echo esc_attr($contact_left_bg_color); ?>;display:flex;flex-direction:column;justify-content:center;color:<?php echo esc_attr($contact_text_color); ?>;position:relative;">
                        <div style="position:absolute;top:20px;right:20px;width:80px;height:80px;background:rgba(255,255,255,0.1);border-radius:50%;opacity:0.3;"></div>
                        <h2 style="font-size:1.75rem;font-weight:800;margin-bottom:16px;line-height:1.2;color:<?php echo esc_attr($contact_headline_color); ?>;text-shadow:0 2px 4px rgba(0,0,0,0.3);">Contact Information</h2>
                        <div style="display:flex;flex-direction:column;gap:20px;">
                            <div style="display:flex;align-items:center;gap:12px;">
                                <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:rgba(255,255,255,0.2);border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.2);"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 6 6l2.02-2.02a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z"></path></svg></span>
                                <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $contact_phone)); ?>" style="color:inherit;text-decoration:none;font-weight:700;font-size:1.1rem;text-shadow:0 1px 2px rgba(0,0,0,0.3);">
                                    <?php echo esc_html($contact_phone); ?>
                                </a>
                            </div>
                            <div style="display:flex;align-items:center;gap:12px;">
                                <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:rgba(255,255,255,0.2);border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.2);"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg></span>
                                <a href="mailto:<?php echo antispambot($contact_email); ?>" style="color:inherit;text-decoration:none;font-weight:700;font-size:1.1rem;text-shadow:0 1px 2px rgba(0,0,0,0.3);">
                                    <?php echo esc_html($contact_email); ?>
                                </a>
                            </div>
                            <div style="display:flex;align-items:center;gap:12px;">
                                <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:rgba(255,255,255,0.2);border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.2);"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 1 8 8c0 7-8 12-8 12S4 17 4 10a8 8 0 0 1 8-8z"/></svg></span>
                                <span style="font-weight:700;font-size:1.1rem;text-shadow:0 1px 2px rgba(0,0,0,0.3);"><?php echo esc_html($contact_address); ?></span>
                            </div>
                        </div>
                    </div>
                    <div class="contact-right" style="flex:1 1 420px;min-width:340px;padding:48px;background:<?php echo esc_attr($contact_right_bg_color); ?>;display:flex;flex-direction:column;justify-content:center;">
                        <?php echo bsg_render_contact_form(); ?>
                    </div>
                </div>
            </div>
        </section>

        <!-- Commitment Section -->
        <?php include dirname(__FILE__) . '/section-commitment.php'; ?>

        <!-- Services Section -->
        <?php include dirname(__FILE__) . '/section-services.php'; ?>
    </main>
    
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/public.js"></script>
    <script>
    // Hamburger menu toggle for mobile
    const hamburger = document.getElementById('hamburger-menu');
    const nav = document.getElementById('main-nav');
    
    hamburger.addEventListener('click', function() {
        nav.classList.toggle('open');
        hamburger.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    
    // Close menu on nav link click (mobile UX)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('open');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
            nav.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Smooth scrolling for anchor links
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

    // Scroll-triggered animations
    function animateOnScroll() {
        const sections = document.querySelectorAll('.animate-on-scroll-section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionVisible = 150;
            
            if (sectionTop < window.innerHeight - sectionVisible) {
                section.classList.add('animated');
            }
        });
    }

    // Run on scroll and on page load
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    </script>
    
<?php get_footer(); ?>