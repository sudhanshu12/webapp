<?php
/*
 * Template Name: BSG Dynamic Homepage
 * Description: Dynamic homepage that uses admin panel settings
 * NOTE: Make sure to set this template for your Home page in the Page editor.
 */

// Get centralized settings (cached for performance)
$settings = bsg_get_settings();
$colors = bsg_get_color_scheme();

echo '<!-- BSG DYNAMIC TEMPLATE ACTIVE -->';

// Add custom meta tags to head - this must be done before get_header()
add_action('wp_head', function() use ($settings) {
    // Remove default WordPress title and meta tags
    remove_action('wp_head', '_wp_render_title_tag', 1);
    remove_action('wp_head', 'wp_generator');
    
    // Get meta tags from wizard settings
    $meta_title = $settings['homepage_meta_title'] ?? 'Create Professional Rank and Rent Websites in Minutes - Create A Website Click';
    $meta_description = $settings['homepage_meta_description'] ?? 'Build professional rank and rent business websites in minutes. Create stunning, SEO-optimized websites for your business with our easy-to-use platform.';
    $meta_keywords = $settings['homepage_meta_keywords'] ?? 'rank and rent, professional business website, website builder, SEO website, business website';
    
    echo '<title>' . esc_html($meta_title) . '</title>' . "\n";
    echo '<meta name="description" content="' . esc_attr($meta_description) . '">' . "\n";
    echo '<meta name="keywords" content="' . esc_attr($meta_keywords) . '">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($meta_title) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($meta_description) . '">' . "\n";
    echo '<meta property="og:type" content="website">' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr($meta_title) . '">' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr($meta_description) . '">' . "\n";
    echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
    echo '<link rel="canonical" href="' . esc_url(home_url('/')) . '">' . "\n";
}, 1);

// Force custom document title from wizard settings
add_filter('pre_get_document_title', function($title) use ($settings) {
    return $settings['homepage_meta_title'] ?? 'Create Professional Rank and Rent Websites in Minutes - Create A Website Click';
}, 99);

// Performance optimized - minimal debug output

$business_name = $settings['business_name'] ?? 'Your Business';
$tagline = $settings['tagline'] ?? 'Professional Services You Can Trust';
$phone = $settings['phone'] ?? '';
$email = $settings['email'] ?? '';
$address = $settings['address'] ?? '';

// Add these lines to ensure About and Contact pages are available for the menu
$about_page = get_page_by_path('about-us');
$contact_page = get_page_by_path('contact-us');

// Hero section settings
$hero_visible = $settings['hero_visible'] ?? 1;
$hero_headline = $settings['hero_headline'] ?? 'Find Roofers Near You';
$hero_cta = $settings['hero_cta'] ?? 'Rated 5 Stars On Google';

// Features section settings
$features_visible = $settings['features_visible'] ?? 1;
$features = $settings['features'] ?? [];

// Services section settings
$services_visible = $settings['services_visible'] ?? 1;
$services_title = $settings['services_title'] ?? 'Our Services';
$services_label = $settings['services_label'] ?? 'TOP RATED SERVICES';
$services = $settings['services'] ?? [];

// About section settings
$about_visible = $settings['about_visible'] ?? 1;
$about_tagline = $settings['about_home_tagline'] ?? 'WHO WE ARE';
$about_tagline_color = $settings['about_home_tagline_color'] ?? '#4ecdc4';
$about_headline = $settings['about_home_headline'] ?? 'About Our Company';
$about_headline_color = $settings['about_home_headline_color'] ?? '#fff';
$about_desc = $settings['about_home_desc'] ?? $settings['homepage_about_content'] ?? $settings['about_description'] ?? $settings['about_content'] ?? $settings['description'] ?? '';
$about_desc_color = $settings['about_home_desc_color'] ?? '#cfd8dc';

// Debug: Log about section data
error_log('=== HOMEPAGE ABOUT SECTION DEBUG ===');
error_log('About desc from about_home_desc: ' . ($settings['about_home_desc'] ?? 'NOT SET'));
error_log('About desc from homepage_about_content: ' . ($settings['homepage_about_content'] ?? 'NOT SET'));
error_log('About desc from about_content: ' . ($settings['about_content'] ?? 'NOT SET'));
error_log('About desc from description: ' . ($settings['description'] ?? 'NOT SET'));
error_log('Final about_desc: ' . $about_desc);
error_log('About visible: ' . ($about_visible ? 'YES' : 'NO'));
error_log('=== HOMEPAGE ABOUT SECTION DEBUG END ===');
$about_experience_label = $settings['about_home_experience_label'] ?? 'Years of Experience';
$about_years = $settings['about_home_years'] ?? '15';
$about_experience_color = $settings['about_home_experience_color'] ?? '#232f38';
$about_experience_text_color = $settings['about_home_experience_text_color'] ?? '#4ecdc4';
$about_cta = $settings['about_home_cta'] ?? 'About Us';
$about_cta_color = $settings['about_home_cta_color'] ?? '#4ecdc4';
$about_cta_text_color = $settings['about_home_cta_text_color'] ?? '#232834';
$about_cta_link = $settings['about_home_cta_link'] ?? '/about-us';
$about_image = $settings['about_home_image'] ?? ($settings['about_image'] ?? '');
$about_bg_color = $settings['about_home_bg_color'] ?? '#232834';
$about_text_color = $settings['about_home_text_color'] ?? '#fff';

// Locations section settings
$locations_visible = $settings['locations_visible'] ?? 1;
$locations_headline = $settings['locations_headline'] ?? 'Proudly Serving Boulder And The Surrounding Areas';
$service_areas = $settings['service_areas'] ?? [];
$locations = $settings['locations'] ?? [];

// Reviews section settings
$reviews_visible = $settings['reviews_visible'] ?? 1;
$reviews_title = $settings['reviews_title'] ?? 'What Our Customers Say';
$reviews_subtitle = $settings['reviews_subtitle'] ?? 'Real reviews from satisfied customers';
$reviews = $settings['reviews'] ?? [];

// Commitment section settings are now handled in section-commitment.php

// Use the new color scheme
$primary_color = $colors['primary'];
$secondary_color = $colors['secondary'];
$accent_color = $colors['accent'];
$heading_color = $colors['heading'];
$button_color = $colors['button'];

// Load WordPress header with all necessary meta tags and assets
get_header();
?>
<!-- Enhanced Meta Tags for Homepage -->
<title><?php echo esc_html($settings['homepage_meta_title'] ?? $business_name . ' - Professional Services in ' . ($settings['state'] ?? 'Your Area')); ?></title>
<meta name="description" content="<?php echo esc_attr($settings['homepage_meta_description'] ?? $business_name . ' provides professional services in ' . ($settings['state'] ?? 'your area') . '. Get free estimates, expert installation, and reliable service. Call ' . $phone . ' today!'); ?>">
<meta name="keywords" content="<?php echo esc_attr($settings['homepage_meta_keywords'] ?? 'professional services, ' . strtolower($business_name) . ', ' . ($settings['state'] ?? 'your area') . ', installation, repair, contractor, free estimate'); ?>">
<meta name="author" content="<?php echo esc_attr($business_name); ?>">
<meta name="robots" content="index, follow">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Performance Optimizations -->
<link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
<link rel="dns-prefetch" href="//ik.imagekit.io">
<link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
<link rel="preconnect" href="https://ik.imagekit.io" crossorigin>

<!-- Open Graph Meta Tags -->
<meta property="og:title" content="<?php echo esc_attr($settings['homepage_meta_title'] ?? $business_name . ' - Professional Services in ' . ($settings['state'] ?? 'Your Area')); ?>">
<meta property="og:description" content="<?php echo esc_attr($settings['homepage_meta_description'] ?? $business_name . ' provides professional services in ' . ($settings['state'] ?? 'your area') . '. Get free estimates, expert installation, and reliable service.'); ?>">
<meta property="og:type" content="website">
<meta property="og:url" content="<?php echo esc_url(home_url('/')); ?>">
<meta property="og:site_name" content="<?php echo esc_attr($business_name); ?>">

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?php echo esc_attr($settings['homepage_meta_title'] ?? $business_name . ' - Professional Services in ' . ($settings['state'] ?? 'Your Area')); ?>">
<meta name="twitter:description" content="<?php echo esc_attr($settings['homepage_meta_description'] ?? $business_name . ' provides professional services in ' . ($settings['state'] ?? 'your area') . '. Get free estimates, expert installation, and reliable service.'); ?>">

<!-- Canonical URL -->
<link rel="canonical" href="<?php echo esc_url(home_url('/')); ?>">
<meta property="og:url" content="<?php echo esc_url(home_url('/')); ?>">
<meta property="og:site_name" content="<?php echo esc_attr($business_name); ?>">

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?php echo esc_attr($settings['homepage_meta_title'] ?? $business_name . ' - ' . ($tagline ?? 'Professional Services')); ?>">
<meta name="twitter:description" content="<?php echo esc_attr($settings['homepage_meta_description'] ?? $business_name . ' provides professional services in ' . ($settings['location'] ?? 'your area') . '. Get free estimates, expert installation, and reliable service.'); ?>">

<!-- Structured Data (JSON-LD) -->
<script type="application/ld+json">
                <?php 
                $services = $settings['services'] ?? [];
                $service_items = [];
                foreach ($services as $service) {
                    if (!empty($service['name'])) {
        $service_items[] = [
            '@type' => 'Offer',
            'name' => $service['name'],
            'category' => $service['name'],
            'areaServed' => ($settings['location'] ?? 'Local Area'),
            'availableAtOrFrom' => [
                '@type' => 'Place',
                'name' => $business_name,
                'address' => $address,
            ],
            'itemOffered' => [
                '@type' => 'Service',
                'name' => $service['name'],
            ],
        ];
    }
}

$homepage_description = $settings['homepage_meta_description'] ?? ($business_name . ' provides professional services in ' . ($settings['location'] ?? 'your area') . '. Get free estimates, expert installation, and reliable service.');

$schema = [
    '@context' => 'https://schema.org',
    '@type' => 'LocalBusiness',
    'name' => $business_name,
    'description' => $homepage_description,
    'url' => home_url('/'),
    'telephone' => $phone,
    'email' => $email,
    'address' => [
        '@type' => 'PostalAddress',
        'streetAddress' => $address,
    ],
    'geo' => [
        '@type' => 'GeoCoordinates',
        'latitude' => $settings['latitude'] ?? '',
        'longitude' => $settings['longitude'] ?? '',
    ],
    'serviceArea' => [
        '@type' => 'GeoCircle',
        'geoRadius' => '50000',
        'geoMidpoint' => [
            '@type' => 'GeoCoordinates',
            'latitude' => $settings['latitude'] ?? '',
            'longitude' => $settings['longitude'] ?? '',
        ],
    ],
    'openingHours' => $settings['business_hours'] ?? 'Mo-Fr 08:00-17:00',
    'priceRange' => '$$',
    'knowsAbout' => array_values(array_filter(array_map(function($s){ return !empty($s['name']) ? $s['name'] : null; }, $services))),
    'areaServed' => $settings['location'] ?? 'Local Area',
    'hasOfferCatalog' => [
        '@type' => 'OfferCatalog',
        'name' => 'Services',
        'itemListElement' => $service_items,
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
        $schema['aggregateRating'] = [
            '@type' => 'AggregateRating',
            'ratingValue' => $avg_rating,
            'reviewCount' => $total_reviews,
            'bestRating' => 5,
            'worstRating' => 1,
        ];
        if (!empty($review_schemas)) {
            $schema['review'] = $review_schemas;
        }
    }
}

echo wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
?>
    </script>
    <?php if (!empty($settings['faqs']) && is_array($settings['faqs'])): ?>
    <script type="application/ld+json">
<?php
$faqs = $settings['faqs'];
$faq_entities = [];
foreach ($faqs as $faq) {
    if (empty($faq['question']) || empty($faq['answer'])) { continue; }
    $faq_entities[] = [
        '@type' => 'Question',
        'name' => wp_strip_all_tags($faq['question']),
        'acceptedAnswer' => [
            '@type' => 'Answer',
            'text' => wp_strip_all_tags($faq['answer']),
        ],
    ];
}
$faq_schema = [
    '@context' => 'https://schema.org',
    '@type' => 'FAQPage',
    'mainEntity' => $faq_entities,
];
echo wp_json_encode($faq_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
?>
    </script>
    <?php endif; ?>
    
    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"></noscript>

    <style>
        /* Critical CSS for Above-the-Fold Performance */
        .hero-section {
            display: block !important;
            visibility: visible !important;
        }
        
        /* Image Loading Optimization */
        img {
            max-width: 100%;
            height: auto;
        }
        
        img[loading="lazy"] {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        img[loading="lazy"].loaded {
            opacity: 1;
        }
        
        :root {
            --primary-color: <?php echo esc_attr($primary_color); ?>;
            --secondary-color: <?php echo esc_attr($secondary_color); ?>;
            --accent-color: <?php echo esc_attr($accent_color); ?>;
            --surface-color: <?php echo esc_attr($settings['surface_color'] ?? '#0f172a'); ?>;
            --text-color: <?php echo esc_attr($settings['text_color'] ?? '#e5e7eb'); ?>;
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
                background: var(--mobile-menu-bg, var(--surface-color));
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
            position: relative;
        }

        .animate-on-scroll-section.animated {
            opacity: 1;
            transform: translateY(0);
        }

        /* Debug indicator - shows when animation is working */
        .animate-on-scroll-section::before {
            content: '';
            display: none;
        }

        .animate-on-scroll-section.animated::before {
            content: '';
            display: none;
        }

        .main-header { background: var(--surface-color); color: var(--text-color); }
        .main-header .nav-menu a { color: var(--text-color); }
        .main-header .container { display:flex; align-items:center; justify-content:space-between; gap:1rem; padding: 0 1.5rem; margin:0 auto; }
        .main-header .logo { display:flex; align-items:center; margin:0; padding:0; color: var(--text-color); text-decoration: none; }
        .main-header .logo span { color: var(--text-color); }
        .main-header .logo img, .main-header .logo svg { display:block; }
        .site-footer { background: var(--surface-color); color: var(--text-color); }
        .btn-primary { background: var(--primary-color); color: #fff; }
        .btn-secondary { background: <?php echo esc_attr($settings['secondary_color'] ?? '#1e40af'); ?>; color: #00131a; }
        
        /* Footer Styles */
        .main-footer {
            background: var(--surface-color, #232834);
            color: var(--text-color, #ffffff);
            padding: 3rem 0 1rem 0;
            margin-top: 2rem;
        }
        
        .main-footer .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        .footer-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .footer-col h4 {
            color: var(--text-color, #ffffff);
            margin-bottom: 1rem;
            font-size: 1.1rem;
            font-weight: 600;
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
            color: var(--text-color, #ffffff);
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
            color: var(--text-color, #ffffff);
            text-decoration: none;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        
        .footer-logo img,
        .footer-logo svg {
            display: block;
        }
        
        .footer-bottom {
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .social-icons {
            display: flex;
            gap: 1rem;
        }
        
        .social-icons a {
            color: var(--text-color, #ffffff);
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        
        .social-icons a:hover {
            opacity: 1;
        }
        
        /* Section defaults themed */
        .hero-section, .about-section, .services-section, .locations-section, .reviews-section, .faq-section { background: var(--surface-color); color: var(--text-color); }
        .reviews-section .container, .about-section .container, .services-section .service-card, .locations-section .location-card { background: #ffffff; color: #0f172a; }
    </style>
</head>
<body>

    <?php include dirname(__FILE__) . '/section-header.php'; ?>
    <style>
        /* Homepage-specific: business name color */
        .main-header .logo span { color: #451A03 !important; }
        
        /* Force hero section height */
        .hero-section {
            padding: 90px 0 !important;
            min-height: 80vh !important;
        }
        
        /* Hero Animation Styles - Optimized for Speed */
        .hero-content {
            opacity: 0;
            transform: translateY(20px);
            animation: heroContentFadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s forwards;
        }
        
        .hero-content .subtitle {
            opacity: 0;
            transform: translateY(15px) scale(0.98);
            animation: heroElementSlideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
        }
        
        .hero-content h1 {
            opacity: 0;
            transform: translateY(20px) scale(0.99);
            animation: heroElementSlideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards;
        }
        
        .hero-content p {
            opacity: 0;
            transform: translateY(15px);
            animation: heroElementSlideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards;
        }
        
        .hero-actions {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
            animation: heroActionsSlideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s forwards;
        }
        
        .google-rating {
            opacity: 0;
            transform: translateY(10px) scale(0.99);
            animation: heroElementSlideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s forwards;
        }
        
        @keyframes heroContentFadeIn {
            0% {
                opacity: 0;
                transform: translateY(40px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes heroElementSlideUp {
            0% {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
            }
            60% {
                opacity: 0.8;
                transform: translateY(-5px) scale(1.02);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes heroActionsSlideUp {
            0% {
                opacity: 0;
                transform: translateY(35px) scale(0.95);
            }
            50% {
                opacity: 0.9;
                transform: translateY(-8px) scale(1.03);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        /* Force hero colors with high specificity */
        .hero-section .subtitle {
            color: <?php echo esc_attr($settings['hero_company_color'] ?? '#f6bb25'); ?> !important;
        }
        .hero-section h1 {
            color: <?php echo esc_attr($settings['hero_heading_color'] ?? '#000000'); ?> !important;
        }
        .hero-section .hero-content p:not(.subtitle) {
            color: <?php echo esc_attr($settings['hero_subheading_color'] ?? '#8f8f8f'); ?> !important;
        }
        .hero-section .hero-content p:last-of-type {
            color: <?php echo esc_attr($settings['hero_description_color'] ?? '#616161'); ?> !important;
        }
        .hero-section .btn-teal {
            background: <?php echo esc_attr($settings['hero_book_btn_bg'] ?? '#2ee6c5'); ?> !important;
            color: <?php echo esc_attr($settings['hero_book_btn_text'] ?? '#ffffff'); ?> !important;
        }
        .hero-section .btn-dark {
            background: <?php echo esc_attr($settings['hero_call_btn_bg'] ?? '#232834'); ?> !important;
            color: <?php echo esc_attr($settings['hero_call_btn_text'] ?? '#ffffff'); ?> !important;
        }
        .hero-section .google-rating span {
            color: <?php echo esc_attr($settings['hero_reviews_text_color'] ?? '#232834'); ?> !important;
        }
        
        /* Override any CSS variable conflicts */
        .hero-section .btn {
            --btn-bg: <?php echo esc_attr($settings['hero_book_btn_bg'] ?? '#2ee6c5'); ?> !important;
            --btn-fg: <?php echo esc_attr($settings['hero_book_btn_text'] ?? '#ffffff'); ?> !important;
        }
        
        /* Force all button styles in hero section */
        .hero-section a.btn {
            background: <?php echo esc_attr($settings['hero_book_btn_bg'] ?? '#2ee6c5'); ?> !important;
            color: <?php echo esc_attr($settings['hero_book_btn_text'] ?? '#ffffff'); ?> !important;
        }
        .hero-section a.btn.btn-dark {
            background: <?php echo esc_attr($settings['hero_call_btn_bg'] ?? '#232834'); ?> !important;
            color: <?php echo esc_attr($settings['hero_call_btn_text'] ?? '#ffffff'); ?> !important;
        }
        
        /* Override any external CSS that might be interfering */
        .hero-section .hero-actions a {
            background: <?php echo esc_attr($settings['hero_book_btn_bg'] ?? '#2ee6c5'); ?> !important;
            color: <?php echo esc_attr($settings['hero_book_btn_text'] ?? '#ffffff'); ?> !important;
        }
        .hero-section .hero-actions a.btn-dark {
            background: <?php echo esc_attr($settings['hero_call_btn_bg'] ?? '#232834'); ?> !important;
            color: <?php echo esc_attr($settings['hero_call_btn_text'] ?? '#ffffff'); ?> !important;
        }
        
        /* Force heading color with maximum specificity */
        .hero-section .hero-content h1 {
            color: <?php echo esc_attr($settings['hero_heading_color'] ?? '#000000'); ?> !important;
        }
        
        /* Override CSS variables that are being set by public.css */
        .hero-section {
            --primary-color: <?php echo esc_attr($settings['hero_book_btn_bg'] ?? '#2ee6c5'); ?> !important;
            --secondary-color: <?php echo esc_attr($settings['hero_call_btn_bg'] ?? '#232834'); ?> !important;
        }
        
        /* Maximum specificity for all hero elements */
        .hero-section .hero-content .subtitle {
            color: <?php echo esc_attr($settings['hero_company_color'] ?? '#f6bb25'); ?> !important;
        }
        .hero-section .hero-content h1 {
            color: <?php echo esc_attr($settings['hero_heading_color'] ?? '#000000'); ?> !important;
        }
        .hero-section .hero-content p:not(.subtitle) {
            color: <?php echo esc_attr($settings['hero_subheading_color'] ?? '#8f8f8f'); ?> !important;
        }
        .hero-section .hero-actions .btn-teal {
            background: <?php echo esc_attr($settings['hero_book_btn_bg'] ?? '#2ee6c5'); ?> !important;
            color: <?php echo esc_attr($settings['hero_book_btn_text'] ?? '#ffffff'); ?> !important;
        }
        .hero-section .hero-actions .btn-dark {
            background: <?php echo esc_attr($settings['hero_call_btn_bg'] ?? '#232834'); ?> !important;
            color: <?php echo esc_attr($settings['hero_call_btn_text'] ?? '#ffffff'); ?> !important;
        }
        .hero-section .google-rating span {
            color: <?php echo esc_attr($settings['hero_reviews_text_color'] ?? '#232834'); ?> !important;
        }
    </style>

    <main>
        <?php if ($hero_visible): ?>
        <section class="hero-section" style="<?php if (!empty($settings['hero_bg_image'])): ?>background-image: linear-gradient(to left, transparent 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.7) 80%, rgba(255,255,255,3) 100%), url('<?php echo esc_url($settings['hero_bg_image']); ?>'); background-size: cover; background-position: center; background-attachment: scroll; background-repeat: no-repeat;<?php else: ?>background-color: <?php echo esc_attr($settings['hero_bg_color'] ?? 'var(--surface-color)'); ?>;<?php endif; ?> padding: 120px 0;">
            <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 60px;">
                <div class="hero-content" style="margin-right: 20px;">
                    <p class="subtitle" style="color: <?php echo esc_attr($settings['hero_company_color'] ?? '#f6bb25'); ?>; font-size: 1.2rem; font-weight: 700; margin: 0 0 8px 0; letter-spacing: 0.5px;">
                        <?php echo esc_html(strtoupper($business_name)); ?>
                    </p>
                    <h1 style="color: <?php echo esc_attr($settings['hero_heading_color'] ?? '#000000'); ?>; white-space: normal; word-wrap: break-word; line-height: 1.2; font-size: 3.2rem; font-weight: 800; margin: 0 0 24px 0;">
                        <?php echo esc_html($hero_headline); ?>
                    </h1>
                    <?php if (!empty($settings['hero_description'])): ?>
                    <p style="color: <?php echo esc_attr($settings['hero_description_color'] ?? '#616161'); ?>; font-size: 1rem; margin: 0 0 32px 0; line-height: 1.6;">
                        <?php echo esc_html($settings['hero_description']); ?>
                    </p>
                    <?php endif; ?>
                    <div class="hero-actions" style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
                        <a href="<?php echo esc_url($settings['hero_book_btn_link'] ?? '#'); ?>" class="btn btn-teal" style="background: <?php echo esc_attr($settings['hero_book_btn_bg'] ?? '#2ee6c5'); ?>; color: <?php echo esc_attr($settings['hero_book_btn_text'] ?? '#ffffff'); ?>; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">Book Online</a>
                        <a href="<?php echo esc_url($settings['hero_call_btn_link'] ?? 'tel:' . ($phone ?? '')); ?>" class="btn btn-dark" style="background: <?php echo esc_attr($settings['hero_call_btn_bg'] ?? '#232834'); ?>; color: <?php echo esc_attr($settings['hero_call_btn_text'] ?? '#ffffff'); ?>; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">Call <?php echo esc_html($phone); ?></a>
                    </div>
                    <div class="google-rating" style="display: flex; align-items: center; gap: 0.5rem;">
                        <div class="stars" style="display: flex; gap: 0.2rem;">
                            <?php $star_color = esc_attr($settings['hero_reviews_star_color'] ?? '#fbbf24'); ?>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="<?php echo $star_color; ?>"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="<?php echo $star_color; ?>"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="<?php echo $star_color; ?>"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="<?php echo $star_color; ?>"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="<?php echo $star_color; ?>"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                        </div>
                        <span style="color: <?php echo esc_attr($settings['hero_reviews_text_color'] ?? '#232834'); ?>; font-size: 1rem;">
                            <?php echo esc_html($hero_cta); ?>
                        </span>
                    </div>
                </div>
            </div>
        </section>
        <?php endif; ?>

        <?php if ($features_visible): ?>
        <style>
        .features-section {
            background-color: <?php echo esc_attr($settings['features_bg_color'] ?? '#1f2732'); ?> !important;
            padding: 5px 0 !important;
        }
        .feature-item {
            background-color: <?php echo esc_attr($settings['features_card_bg'] ?? '#ffffff'); ?> !important;
            color: <?php echo esc_attr($settings['features_text_color'] ?? '#333333'); ?> !important;
            padding: 30px 20px !important;
            margin-bottom: 20px !important;
        }
        .feature-item h3 {
            color: <?php echo esc_attr($settings['features_text_color'] ?? '#333333'); ?> !important;
            margin-top: 15px !important;
            margin-bottom: 10px !important;
        }
        .feature-item p {
            color: <?php echo esc_attr($settings['features_text_color'] ?? '#666666'); ?> !important;
            margin-bottom: 0 !important;
        }
        .feature-item svg {
            stroke: <?php echo esc_attr(!empty($settings['features_icon_color']) ? $settings['features_icon_color'] : $colors['button']); ?> !important;
            color: <?php echo esc_attr(!empty($settings['features_icon_color']) ? $settings['features_icon_color'] : $colors['button']); ?> !important;
            margin-bottom: 10px !important;
        }
        </style>
        <section class="features-section animate-on-scroll-section" style="padding: 15px 0; background-color: <?php echo esc_attr($settings['features_bg_color'] ?? '#1f2732'); ?>;">
            <div class="container">
                <div class="features-grid">
                    <?php if (!empty($features)): ?>
                        <?php foreach ($features as $feature): ?>
                        <div class="feature-item" style="background-color: <?php echo esc_attr($settings['features_card_bg'] ?? '#ffffff'); ?>; color: <?php echo esc_attr($settings['features_text_color'] ?? '#333333'); ?>;">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="<?php echo esc_attr(!empty($settings['features_icon_color']) ? $settings['features_icon_color'] : $colors['button']); ?>" style="color: <?php echo esc_attr(!empty($settings['features_icon_color']) ? $settings['features_icon_color'] : $colors['button']); ?>;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            <div>
                                <h3 style="color: <?php echo esc_attr($settings['features_text_color'] ?? '#333333'); ?>;"><?php echo esc_html($feature['title'] ?? ''); ?></h3>
                                <p style="color: <?php echo esc_attr($settings['features_text_color'] ?? '#666666'); ?>;"><?php echo esc_html($feature['description'] ?? ''); ?></p>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <div class="feature-item" style="background-color: <?php echo esc_attr($settings['features_card_bg'] ?? '#ffffff'); ?>; color: <?php echo esc_attr($settings['features_text_color'] ?? '#333333'); ?>; opacity: 0.7;">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="<?php echo esc_attr(!empty($settings['features_icon_color']) ? $settings['features_icon_color'] : $colors['button']); ?>" style="color: <?php echo esc_attr(!empty($settings['features_icon_color']) ? $settings['features_icon_color'] : $colors['button']); ?>;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            <div>
                                <h3 style="color: <?php echo esc_attr($settings['features_text_color'] ?? '#333333'); ?>;">Add Your First Feature</h3>
                                <p style="color: <?php echo esc_attr($settings['features_text_color'] ?? '#666666'); ?>;">Go to the Features section in the admin panel to add your features.</p>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </section>
        <?php endif; ?>

        <?php if ($about_visible): ?>
<style>
.homepage-about-flex {
  display: flex;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 120px;
  justify-content: center;
}
.homepage-about-img {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.homepage-about-img img {
  max-width: 350px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
}
.homepage-about-content {
  flex: 2;
  color: <?php echo esc_attr($about_text_color); ?>;
}
.homepage-about-who {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: <?php echo esc_attr($about_tagline_color); ?>;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
}
.homepage-about-content h2 {
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  color: <?php echo esc_attr($about_headline_color); ?>;
}
.homepage-about-content p {
  font-size: 0.9rem;
  margin-bottom: 1.2rem;
  color: <?php echo esc_attr($about_desc_color); ?>;
}
.homepage-about-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.2rem;
}
.homepage-about-badge {
  background: <?php echo esc_attr($about_experience_color); ?>;
  color: <?php echo esc_attr($about_experience_text_color); ?>;
  padding: 0.7rem 1.2rem 0.7rem 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.homepage-about-badge span {
  font-size: 1.4rem;
  font-weight: 800;
  margin-right: 0.3rem;
}
.homepage-about-btn {
  background: <?php echo esc_attr($settings['primary_color'] ?? '#2563eb'); ?>;
  color: #ffffff;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s;
  margin-left: 0.3rem;
  box-shadow: none;
}
.homepage-about-btn:hover {
  filter: brightness(0.95);
}
@media (max-width: 900px) {
  .homepage-about-flex { flex-direction: column; gap: 2rem; }
  .homepage-about-img, .homepage-about-content { width: 100%; }
}
</style>
        <?php include dirname(__FILE__) . '/section-about.php'; ?>
        <?php endif; ?>

        <?php if ($services_visible): ?>
        <!-- Standard Services Section -->
        <?php include dirname(__FILE__) . '/section-services.php'; ?>
        <?php endif; ?>

<?php if ($locations_visible): ?>
        <!-- Service Areas Section -->
        <?php include dirname(__FILE__) . '/section-areas.php'; ?>
        <?php endif; ?>


        <?php if ($reviews_visible): ?>
        <?php include dirname(__FILE__) . '/section-reviews.php'; ?>
        <?php endif; ?>

<?php // FAQ Section: use shared include for consistency across site
include dirname(__FILE__) . '/faq-section.php';
?>

        <?php // Commitment Section: use shared include for consistency across site
        include dirname(__FILE__) . '/section-commitment.php';
        ?>

    </main>

<?php get_footer(); ?>

<script>
// Make sure this runs after WordPress footer loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 animateOnScroll script loaded successfully');
    
    // Scroll-triggered animations
    function animateOnScroll() {
        const sections = document.querySelectorAll('.animate-on-scroll-section');
        
        sections.forEach((section, index) => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionVisible = 100;
            
            if (sectionTop < window.innerHeight - sectionVisible) {
                section.classList.add('animated');
            }
        });
    }

    // Make function globally available for testing
    window.animateOnScroll = animateOnScroll;

    // Run on scroll and on page load
    window.addEventListener('scroll', animateOnScroll);
    
    // Run immediately and after delays to ensure all sections are animated
    animateOnScroll();
    setTimeout(animateOnScroll, 100);
    setTimeout(animateOnScroll, 500);
    setTimeout(animateOnScroll, 1000);
    
    console.log('🚀 animateOnScroll initialized and ready');
});
</script> 