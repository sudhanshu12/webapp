<?php
/*
 * Template Name: BSG About
 * Description: About page for your business, dynamic sections.
 */

// Get centralized settings
$business = bsg_get_business_info();
$settings = bsg_get_settings();
$about_settings = bsg_get_about_settings();
$commitment_settings = bsg_get_commitment_settings();
$reviews_settings = bsg_get_reviews_settings();
$colors = bsg_get_color_scheme();
$visibility = bsg_get_section_visibility();

// Generate meta title and description for About page - use wizard's about page meta data
$meta_title = $settings['about_page_meta_title'] ?? $settings['about_meta_title'] ?? ('About ' . $business['name'] . ' - Professional Services in ' . $business['state']);
$meta_description = $settings['about_page_meta_description'] ?? $settings['about_meta_description'] ?? ('Learn about ' . $business['name'] . ', a professional ' . $business['business_type'] . ' company serving ' . $business['state'] . '. ' . ($settings['about_years'] ?? 15) . '+ years of experience, quality service, and customer satisfaction.');

// Add meta tags to head
add_action('wp_head', function() use ($meta_title, $meta_description) {
    echo '<title>' . esc_html($meta_title) . '</title>' . "\n";
    echo '<meta name="description" content="' . esc_attr($meta_description) . '">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($meta_title) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($meta_description) . '">' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr($meta_title) . '">' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr($meta_description) . '">' . "\n";
});

// About page specific settings from admin
$about_hero_tagline = $settings['about_hero_tagline'] ?? 'ABOUT ' . $business['name'];
$about_hero_title = $settings['about_hero_title'] ?? 'Professional Services You Can Count On';
$about_hero_text_color = $settings['about_hero_text_color'] ?? '#fff';
$about_hero_bg_color = $settings['about_hero_bg_color'] ?? '#232834';
$about_hero_tagline_color = $settings['about_hero_tagline_color'] ?? ($settings['hero_company_color'] ?? $about_hero_text_color);
$about_hero_title_color = $settings['about_hero_title_color'] ?? $about_hero_text_color;

// Who We Are section settings - Get from wizard about page section
$about_tagline = $settings['about_page_who_tagline'] ?? $settings['about_tagline'] ?? 'WHO WE ARE';
$about_tagline_color = $settings['about_page_who_tagline_color'] ?? $settings['about_tagline_color'] ?? '#1fe0ca';
$about_headline = $settings['about_page_who_headline'] ?? $settings['about_heading'] ?? 'About Our Company';
$about_description = $settings['about_page_who_description'] ?? $settings['about_description'] ?? '';
$about_image = $settings['about_page_team_image'] ?? $settings['about_image'] ?? '';
$about_years = $settings['about_page_years'] ?? $settings['about_years'] ?? '18';
$about_experience_label = $settings['about_page_experience_label'] ?? $settings['about_experience_text'] ?? 'Years of Experience';
$about_experience_bg_color = $settings['about_page_experience_bg'] ?? $settings['about_experience_bg'] ?? '#374151';
$about_experience_text_color = $settings['about_page_experience_text'] ?? $settings['about_experience_text_color'] ?? '#16dfd1';
$about_cta = $settings['about_page_cta_text'] ?? $settings['about_button_text'] ?? 'About Us';
$about_cta_link = $settings['about_page_cta_link'] ?? $settings['about_button_link'] ?? '/about-us';
$about_cta_bg_color = $settings['about_page_cta_bg'] ?? $settings['about_button_color'] ?? '#0de7d9';
$about_cta_text_color = $settings['about_page_cta_text'] ?? $settings['about_button_text_color'] ?? '#374151';

// Debug: Check if AI content exists - Use about page description, not homepage
if (!empty($settings['about_page_who_description']) && $settings['about_page_who_description'] !== 'Your about description here.') {
    $about_description = $settings['about_page_who_description'];
} elseif (!empty($settings['about_description']) && $settings['about_description'] !== 'Your about description here.') {
    $about_description = $settings['about_description'];
} else {
    // Fallback to default description if no custom content is set
    $about_description = 'We are a professional company dedicated to providing exceptional services to our clients. With years of experience and a commitment to quality, we deliver results that exceed expectations.';
}

// Section colors - Get from wizard about page section
$about_bg_color = $settings['about_page_who_bg'] ?? $settings['about_bg_color'] ?? '#1e2834';
$about_text_color = $settings['about_page_who_text'] ?? $settings['about_text_color'] ?? '#ffffff';
$about_heading_color = $settings['about_page_who_desc_color'] ?? $settings['about_heading_color'] ?? '#ffffff';
$about_description_color = $settings['about_page_who_desc_color'] ?? $settings['about_description_color'] ?? '#ffffff';
$about_description_font_size = $settings['about_description_font_size'] ?? '1rem';

// Design colors
$primary_color = $colors['primary'];
$secondary_color = $colors['secondary'];
$accent_color = $colors['accent'];
$teal = $settings['teal'] ?? '#2ee6c5';
$dark_navy = $settings['dark_navy'] ?? '#232834';
$white = $settings['white'] ?? '#ffffff';
$text_gray = $settings['text_gray'] ?? '#b0b0b0';

// Commitment section settings
$commitment_visible = $commitment_settings['visible'];
$commitment_title = $commitment_settings['title'];
$commitment_subtitle = $commitment_settings['subtitle'];
$commitment_text = $commitment_settings['text'];
$commitment_image = $commitment_settings['image'];

$reviews_visible = $reviews_settings['visible'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo esc_html($settings['about_page_meta_title'] ?? $settings['about_meta_title'] ?? $business_name . ' - About Us | Professional ' . ($settings['business_type'] ?? 'Services')); ?></title>
    <meta name="description" content="<?php echo esc_attr($settings['about_page_meta_description'] ?? $settings['about_meta_description'] ?? 'Learn about ' . $business_name . ', a trusted ' . ($settings['business_type'] ?? 'contractor') . ' with ' . $about_years . ' years of experience. Professional ' . ($settings['business_type'] ?? 'services') . ', quality workmanship, and customer satisfaction in ' . ($settings['location'] ?? 'your area') . '.'); ?>">
    <meta name="keywords" content="<?php echo esc_attr($settings['about_page_meta_keywords'] ?? $settings['about_meta_keywords'] ?? 'about ' . strtolower($business_name) . ', ' . ($settings['business_type'] ?? 'contractor') . ', professional ' . ($settings['business_type'] ?? 'services') . ', ' . $about_years . ' years experience, quality ' . ($settings['business_type'] ?? 'services')); ?>">
    <meta name="author" content="<?php echo esc_attr($business_name); ?>">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="<?php echo esc_attr($settings['about_page_meta_title'] ?? $settings['about_meta_title'] ?? $business_name . ' - About Us | Professional ' . ($settings['business_type'] ?? 'Services')); ?>">
    <meta property="og:description" content="<?php echo esc_attr($settings['about_page_meta_description'] ?? $settings['about_meta_description'] ?? 'Learn about ' . $business_name . ', a trusted ' . ($settings['business_type'] ?? 'contractor') . ' with ' . $about_years . ' years of experience. Professional ' . ($settings['business_type'] ?? 'services') . ', quality workmanship, and customer satisfaction.'); ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo esc_url(home_url('/about-us/')); ?>">
    <meta property="og:site_name" content="<?php echo esc_attr($business_name); ?>">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo esc_attr($settings['about_page_meta_title'] ?? $settings['about_meta_title'] ?? $business_name . ' - About Us | Professional ' . ($settings['business_type'] ?? 'Services')); ?>">
    <meta name="twitter:description" content="<?php echo esc_attr($settings['about_page_meta_description'] ?? $settings['about_meta_description'] ?? 'Learn about ' . $business_name . ', a trusted ' . ($settings['business_type'] ?? 'contractor') . ' with ' . $about_years . ' years of experience. Professional ' . ($settings['business_type'] ?? 'services') . ', quality workmanship, and customer satisfaction.'); ?>">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="<?php echo esc_url(home_url('/about-us/')); ?>">
    
    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
                <?php 
                $services = $settings['services'] ?? [];
                $service_items = [];
                foreach ($services as $service) {
                    if (!empty($service['name'])) {
        $service_items[] = [
            '@type' => 'Offer',
            'itemOffered' => [
                '@type' => 'Service',
                'name' => $service['name'],
            ],
        ];
    }
}

$about_schema_description = $settings['about_meta_description'] ?? ('Learn about ' . $business_name . ', a trusted ' . ($settings['business_type'] ?? 'contractor') . ' with ' . $about_years . ' years of experience. Professional ' . ($settings['business_type'] ?? 'services') . ', quality workmanship, and customer satisfaction.');

$schema = [
    '@context' => 'https://schema.org',
    '@type' => 'LocalBusiness',
    'name' => $business_name,
    'description' => $about_schema_description,
    'url' => home_url('/'),
    'telephone' => $phone,
    'email' => $email,
    'address' => [
        '@type' => 'PostalAddress',
        'streetAddress' => $address,
    ],
    'foundingDate' => date('Y', strtotime('-' . $about_years . ' years')),
    'numberOfEmployees' => $settings['number_of_employees'] ?? '10-50',
    'knowsAbout' => array_values(array_filter(array_map(function($s){ return !empty($s['name']) ? $s['name'] : null; }, $services))),
    'areaServed' => $settings['location'] ?? 'Local Area',
    'hasOfferCatalog' => [
        '@type' => 'OfferCatalog',
        'name' => ucfirst($settings['business_type'] ?? 'Services') . ' Services',
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
    
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/public.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    
    <style>
        :root {
            --primary-color: <?php echo esc_attr($primary_color); ?>;
            --secondary-color: <?php echo esc_attr($secondary_color); ?>;
            --surface-color: <?php echo esc_attr($settings['surface_color'] ?? '#0f172a'); ?>;
            --text-color: <?php echo esc_attr($settings['text_color'] ?? '#e5e7eb'); ?>;
            --nav-bg: var(--surface-color);
            --footer-bg: var(--surface-color);
            --heading-color: var(--text-color);
        }
        /* Animation keyframes */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        /* Scroll-triggered animation classes (match homepage speed) */
        .animate-on-scroll-section { opacity: 0; transform: translateY(50px); transition: opacity 1.2s ease-out, transform 1.2s ease-out; }
        .animate-on-scroll-section.animated { opacity: 1; transform: translateY(0); }

        .main-header { background: var(--nav-bg); color: var(--text-color); }
        .main-header .nav-menu a { color: var(--text-color); }
        .main-header .logo, .main-header .logo span { color: var(--text-color) !important; }
        .main-header a.logo { color: var(--text-color) !important; text-decoration: none; }

        
        
        .main-header .container { display:flex; align-items:center; justify-content:space-between; gap:1rem; padding: 0 1.5rem; margin:0; }
        .main-header .logo { display:flex; align-items:center; margin:0; padding:0; }
        .main-header .logo img, .main-header .logo svg { display:block; }
        
        /* Essential BSG Styles */
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
        
        /* Desktop Layout - Side by Side */
        .bsg-who-we-are {
            display: flex !important;
            align-items: center !important;
            gap: 4rem !important;
            max-width: 1000px !important;
            margin: 0 auto !important;
            justify-content: center !important;
        }
        
        .bsg-who-image {
            flex: 0 0 400px !important;
            height: 500px !important;
        }
        
        .bsg-who-content {
            flex: 1 !important;
            text-align: left !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
        }
        
        .bsg-who-description {
            text-align: left !important;
            max-width: 600px !important;
        }
        
        .bsg-who-tagline {
            justify-content: flex-start !important;
        }
        
        .bsg-who-actions {
            justify-content: flex-start !important;
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
            .bsg-who-we-are {
                flex-direction: column !important;
                gap: 2rem !important;
                justify-content: center !important;
                text-align: center !important;
                padding: 0 20px !important;
            }
            
            .bsg-who-image {
                flex: none !important;
                width: 100% !important;
                max-width: 400px !important;
                height: 300px !important;
                margin: 0 auto !important;
            }
            
            .bsg-who-content {
                text-align: center !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                width: 100% !important;
            }
            
            .bsg-who-description {
                text-align: center !important;
                margin: 0 auto 2rem auto !important;
                max-width: 100% !important;
            }
            
            .bsg-who-tagline {
                justify-content: center !important;
            }
            
            .bsg-who-actions {
                justify-content: center !important;
                flex-direction: column !important;
                gap: 1rem !important;
            }
            
            .bsg-experience-badge {
                width: 100% !important;
                max-width: 200px !important;
            }
        }
        
        @media (max-width: 480px) {
            .bsg-who-we-are {
                gap: 1.5rem !important;
                padding: 0 15px !important;
            }
            
            .bsg-who-image {
                height: 250px !important;
            }
            
            .bsg-who-content h2 {
                font-size: 2rem !important;
            }
            
            .bsg-who-description {
                font-size: 0.9rem !important;
            }
        }
        
        /* Mobile Responsive Styles for About Content */
        @media (max-width: 768px) {
            .about-who-we-are {
                flex-direction: column !important;
                gap: 2rem !important;
                text-align: center !important;
                max-width: 100% !important;
                margin: 0 20px !important;
            }
            
            .about-image {
                flex: none !important;
                width: 100% !important;
                max-width: 400px !important;
                height: 350px !important;
                margin: 0 auto !important;
            }
            
            .about-content-text {
                flex: none !important;
                width: 100% !important;
                text-align: center !important;
                padding-top: 0 !important;
            }
            
            .about-content-text h2 {
                font-size: 1.8rem !important;
            }
            
            .about-content-text p {
                font-size: 0.95rem !important;
            }
            
            .about-cta-section .experience-badge {
                margin-bottom: 1rem !important;
            }
        }
        
        @media (max-width: 480px) {
            .about-who-we-are {
                gap: 1.5rem !important;
                margin: 0 15px !important;
            }
            
            .about-image {
                height: 280px !important;
            }
            
            .about-content-text h2 {
                font-size: 1.6rem !important;
            }
            
            .about-content-text p {
                font-size: 0.9rem !important;
            }
            
            .about-cta-section {
                gap: 1rem !important;
            }
            
            .about-cta-section .experience-badge {
                padding: 1rem 1.5rem !important;
            }
            
            .about-cta-section .cta-button {
                padding: 0.8rem 1.5rem !important;
                font-size: 0.9rem !important;
            }
        }
        .bsg-about-container { max-width: 1200px; margin: 0 auto; padding: 4rem 1.5rem; }
        .bsg-about-section { padding: 4rem 0; }
        .bsg-experience-badge { 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            justify-content: center; 
            padding: 1.5rem; 
            border-radius: 12px; 
            text-align: center; 
            min-height: 80px; 
            font-weight: 700; 
        }
        .bsg-experience-badge h3 { 
            font-size: 1.5rem; 
            margin: 0 0 0.25rem 0; 
            font-weight: 800; 
        }
        .bsg-experience-badge p { 
            font-size: 0.9rem; 
            margin: 0; 
            opacity: 0.9; 
        }
        .bsg-btn-learn-more { 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            padding: 1.5rem; 
            border-radius: 12px; 
            text-decoration: none; 
            font-weight: 700; 
            min-height: 80px; 
            transition: all 0.3s ease; 
        }
        .bsg-btn-learn-more:hover { 
            transform: translateY(-2px); 
            box-shadow: 0 4px 12px rgba(0,0,0,0.2); 
        }
        .main-footer {
            background: var(--footer-bg);
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
        
        /* Desktop Centering Styles */
        .bsg-who-content {
            text-align: center !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
        }
        
        .bsg-who-description {
            text-align: center !important;
            margin: 0 auto 2rem auto !important;
            width: 100% !important;
        }
        
        .bsg-who-tagline {
            text-align: center !important;
            justify-content: center !important;
        }
        
        .bsg-who-actions {
            text-align: center !important;
            justify-content: center !important;
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
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

            /* About page specific mobile styles */
            .about-hero h1 {
                font-size: 2rem;
            }

            .about-hero .tagline {
                font-size: 1rem;
            }

            .about-hero .location {
                font-size: 1.1rem;
            }

            .about-hero {
                padding: 80px 0 !important;
            }

            .bsg-who-we-are {
                flex-direction: column !important;
                gap: 2rem !important;
                justify-content: center !important;
                text-align: center !important;
            }
            
            .bsg-who-content {
                text-align: center !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
            }
            
            .bsg-who-description {
                text-align: center !important;
                margin: 0 auto 2rem auto !important;
            }
            
            .bsg-who-tagline {
                justify-content: center !important;
            }
            
            .bsg-who-actions {
                justify-content: center !important;
            }

            .bsg-team-image {
                flex: 0 0 300px !important;
                height: 400px !important;
                width: 100% !important;
            }

            .services-section {
                margin-top: 2rem;
            }

            .services-section > div {
                grid-template-columns: 1fr !important;
            }

            .bsg-experience-badge,
            .bsg-btn-learn-more {
                min-height: 60px !important;
                font-size: 1rem !important;
                padding: 0.75rem !important;
            }

            .bsg-experience-badge h3 {
                font-size: 1.25rem !important;
            }

            .bsg-experience-badge p {
                font-size: 0.8rem !important;
            }

            /* Service Areas section mobile styles */
            .two-col-layout {
                flex-direction: column !important;
                gap: 2rem !important;
            }

            .locations-grid {
                grid-template-columns: repeat(2, 1fr) !important;
            }

            .location-card {
                padding: 0.5rem 1rem !important;
            }

            .location-card span:last-child {
                font-size: 0.9rem;
            }

            /* Commitment section mobile styles */
            .commitment-section .two-col-layout {
                flex-direction: column-reverse !important;
            }

            .commitment-section h2 {
                font-size: 1.75rem !important;
            }

            /* Footer mobile styles */
            .footer-grid {
                grid-template-columns: 1fr !important;
                gap: 2rem !important;
            }

            .footer-bottom {
                flex-direction: column !important;
                gap: 1rem !important;
                text-align: center !important;
            }

            /* Why Work With Us mobile styles */
            .why-work-with-us {
                padding: 3rem 0 !important;
            }

            .why-work-with-us h2 {
                font-size: 2.2rem !important;
            }

            .why-work-with-us p {
                font-size: 1.1rem !important;
            }

            .why-work-with-us .container > div:last-child {
                grid-template-columns: 1fr !important;
                gap: 3rem !important;
                max-width: 100% !important;
            }
            
            .why-work-with-us .container > div:last-child > div:first-child {
                grid-template-columns: 1fr !important;
                gap: 3rem !important;
                justify-items: center !important;
            }
            
            .why-work-with-us .container > div:last-child > div:last-child {
                grid-template-columns: 1fr !important;
                gap: 3rem !important;
                max-width: 100% !important;
                justify-items: center !important;
            }

            .benefit-item {
                padding: 1rem !important;
            }

            .benefit-item h3 {
                font-size: 1.25rem !important;
            }

            .benefit-item p {
                font-size: 0.95rem !important;
            }

            .benefit-item > div:first-child {
                width: 50px !important;
                height: 50px !important;
            }

            .benefit-item svg {
                width: 20px !important;
                height: 20px !important;
            }

            .benefit-item h3 {
                font-size: 1rem !important;
            }

            .benefit-item p {
                font-size: 0.85rem !important;
            }
        }
        
        /* Force hero section height - match home page */
        .hero-section { 
            padding: 90px 0 !important; 
            min-height: 80vh !important;
        }
        
        /* Force hero colors to match homepage */
        .hero-section h1 {
            color: <?php echo esc_attr($settings['hero_heading_color'] ?? '#000000'); ?> !important;
        }
        .hero-section .btn-dark {
            background: <?php echo esc_attr($settings['button_primary_color'] ?? '#f59e0b'); ?> !important;
            color: #ffffff !important;
        }
        
        /* Hero Animation Styles - Advanced Staggered Sequence */
        .hero-content {
            opacity: 0;
            transform: translateY(40px);
            animation: heroContentFadeIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
        }
        
        .hero-content p {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
            animation: heroElementSlideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards;
        }
        
        .hero-content h1 {
            opacity: 0;
            transform: translateY(40px) scale(0.98);
            animation: heroElementSlideUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s forwards;
        }
        
        .hero-actions {
            opacity: 0;
            transform: translateY(35px) scale(0.95);
            animation: heroActionsSlideUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s forwards;
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
        
    </style>
</head>
<body>
    <?php include dirname(__FILE__) . '/section-header.php'; ?>
    <main>
        <!-- Hero Section -->
        <section class="hero-section" style="<?php if (!empty($settings['hero_bg_image'])): ?>background-image: linear-gradient(to left, transparent 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.7) 80%, rgba(255,255,255,3) 100%), url('<?php echo esc_url($settings['hero_bg_image']); ?>'); background-size: cover; background-position: center;<?php else: ?>background-color: <?php echo esc_attr($settings['hero_bg_color'] ?? 'var(--surface-color)'); ?>;<?php endif; ?> padding: 90px 0;">
            <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 60px;">
            <div class="hero-content" style="margin-right: 20px;">
                <p style="color: <?php echo esc_attr($about_hero_tagline_color); ?>; font-size: 1rem; font-weight: 600; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px;">
                    <?php echo esc_html($about_hero_tagline); ?>
                </p>
                <h1 style="color: <?php echo esc_attr($settings['hero_heading_color'] ?? '#000000'); ?>; white-space: normal; word-wrap: break-word; line-height: 1.2; font-size: 3.2rem; font-weight: 800; margin: 0 0 24px 0;">
                    <?php echo esc_html($about_hero_title); ?>
                </h1>
                <div class="hero-actions">
                    <a href="tel:<?php echo esc_attr($phone); ?>" class="btn btn-dark" style="background: <?php echo esc_attr($settings['button_primary_color'] ?? '#f59e0b'); ?>; color: #ffffff; display:inline-flex; align-items:center; justify-content:center; gap:0.6rem; width:100%; max-width:520px; border-radius:10px; padding:1rem 1.25rem; font-weight:700; font-size:1.1rem;">
                        <i class="fa-solid fa-phone"></i> Call us Today
                    </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Page Content - Image on Left, Content on Right -->
        <section class="bsg-who-we-are animate-on-scroll-section" style="background: <?php echo esc_attr($settings['about_page_who_bg'] ?? '#ffffff'); ?>; color: <?php echo esc_attr($settings['about_page_who_text'] ?? '#000000'); ?>; padding: 5rem 0;">
            <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                <div class="bsg-who-we-are" style="display: flex; align-items: flex-start; gap: 4rem;">
                    <!-- Image on Left -->
                    <div class="bsg-who-image" style="flex: 0 0 420px; height: 550px; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
                        <?php if (!empty($settings['about_page_team_image'])): ?>
                            <img src="<?php echo esc_url($settings['about_page_team_image']); ?>" alt="About <?php echo esc_attr($settings['business_name'] ?? 'Our Team'); ?>" style="width: 100%; height: 100%; object-fit: cover;">
                        <?php else: ?>
                            <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; font-weight: 600;">
                                <div style="text-align: center;">
                                    <svg width="64" height="64" fill="white" viewBox="0 0 24 24" style="margin-bottom: 1rem; opacity: 0.9;">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                    <div>Team Photo</div>
                                </div>
                            </div>
                        <?php endif; ?>
                    </div>
                    
                    <!-- Content on Right -->
                    <div class="bsg-who-content" style="flex: 1; color: <?php echo esc_attr($settings['about_page_who_text'] ?? '#000000'); ?>;">
                        <div class="bsg-who-tagline" style="display: flex; align-items: center; gap: 0.5rem; color: <?php echo esc_attr($settings['about_page_who_tagline_color'] ?? '#14b8a6'); ?>; font-weight: 700; font-size: 0.95rem; margin-bottom: 1rem; letter-spacing: 1px; text-transform: uppercase;">
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            <?php echo esc_html($settings['about_page_who_tagline'] ?? 'WHO WE ARE'); ?>
                        </div>
                        
                        <h2 style="font-size: 2.75rem; font-weight: 800; margin: 0 0 1.5rem 0; color: <?php echo esc_attr($settings['about_page_who_desc_color'] ?? '#1f2937'); ?>; line-height: 1.2;">
                            About <?php echo esc_html($settings['business_name'] ?? 'Our Company'); ?>
                        </h2>
                        
                        <div class="bsg-who-description" style="font-size: 1.05rem; margin-bottom: 2.5rem; color: <?php echo esc_attr($settings['about_page_who_desc_color'] ?? '#4b5563'); ?>; line-height: 1.8;">
                            <?php 
                            // Get the about description from wizard settings
                            $about_description = $settings['about_page_who_description'] ?? $settings['about_description'] ?? '';
                            
                            // Clean and display the description
                            if (!empty($about_description)) {
                                // Remove any HTML tags and decode entities
                                $clean_description = html_entity_decode(strip_tags($about_description));
                                echo wp_kses_post(wpautop($clean_description));
                            } else {
                                // Default description
                                echo '<p>We are a professional service provider dedicated to delivering exceptional results. With years of experience and a commitment to quality, we serve our community with integrity and expertise.</p>';
                            }
                        </div>
                        
                        <!-- Experience Badge and CTA Button - Side by Side -->
                        <div class="bsg-who-actions" style="display: flex; align-items: center; gap: 1.5rem; margin-top: 2rem;">
                            <div class="bsg-experience-badge" style="background: <?php echo esc_attr($settings['about_page_experience_bg'] ?? '#14b8a6'); ?>; color: <?php echo esc_attr($settings['about_page_experience_text'] ?? '#ffffff'); ?>; padding: 1.5rem 2rem; border-radius: 8px; text-align: center; min-width: 140px;">
                                <div style="font-size: 2.25rem; font-weight: 800; margin: 0; line-height: 1;"><?php echo esc_html($settings['about_page_years'] ?? '15+'); ?></div>
                                <div style="font-size: 0.85rem; margin: 0.5rem 0 0 0; font-weight: 500;"><?php echo esc_html($settings['about_page_experience_label'] ?? 'Years of Experience'); ?></div>
                            </div>
                            
                            <a href="<?php echo esc_url($settings['about_page_cta_link'] ?? '#contact'); ?>" class="bsg-cta-button" style="background: <?php echo esc_attr($settings['about_page_cta_bg'] ?? '#14b8a6'); ?>; color: <?php echo esc_attr($settings['about_page_cta_text_color'] ?? '#ffffff'); ?>; padding: 1rem 2.5rem; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 1rem; transition: all 0.3s ease; display: inline-block;">
                                <?php echo esc_html($settings['about_page_cta_text'] ?? 'Get Started'); ?>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Rest of content removed, keeping sections below -->
                            
                            <h2 style="font-size: 2.5rem; font-weight: 700; color: #2c3e50; margin: 0.5rem 0;">Your Trusted Roofing Experts</h2>
                            <p class="location" style="color: #7f8c8d; font-size: 1.1rem; margin: 0;">Serving Orlando and surrounding areas</p>
                        </div>
                        
                        <!-- About Who We Are Section with Image -->
                        <div class="about-who-we-are" style="display: flex; align-items: flex-start; gap: 3rem; margin-bottom: 3rem; max-width: 1000px; margin-left: auto; margin-right: auto;">
                            <!-- Image -->
                            <div class="about-image" style="flex: 0 0 350px; height: 450px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                                <?php 
                                // Get the about image from wizard settings
                                $about_image = $settings['about_image'] ?? '';
                                if (!empty($about_image)): ?>
                                    <img src="<?php echo esc_url($about_image); ?>" alt="Our Team" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" decoding="async">
                                <?php else: ?>
                                    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; font-weight: 600;">
                                        Team Photo
                                    </div>
                                <?php endif; ?>
                            </div>
                            
                            <!-- Content -->
                            <div class="about-content-text" style="flex: 1; padding-top: 1rem;">
                                <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="margin-right: 8px;">
                                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#4ecdc4" stroke-width="2"/>
                                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#4ecdc4" stroke-width="2"/>
                                    </svg>
                                    <p class="tagline" style="color: #4ecdc4; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 0;">WHO WE ARE</p>
                                </div>
                                
                                <h2 style="font-size: 2.2rem; font-weight: 700; color: #2c3e50; margin: 0 0 1.5rem 0; line-height: 1.2;">About Roofing Pros</h2>
                                
                                <div style="line-height: 1.7; color: #34495e; font-size: 1rem;">
                                    <?php 
                                    // Get the about description from wizard settings
                                    $about_description = $settings['about_page_description'] ?? $settings['about_page_who_description'] ?? '';
                                    
                                    if (!empty($about_description) && strlen(trim($about_description)) > 50 && strpos($about_description, 'hi thi stess') === false) {
                                        // Display the wizard content with consistent paragraph styling
                                        $paragraphs = preg_split('/\n\s*\n/', $about_description);
                                        foreach ($paragraphs as $index => $paragraph) {
                                            $paragraph = trim($paragraph);
                                            if (!empty($paragraph)) {
                                                $is_last = ($index === count($paragraphs) - 1);
                                                $margin_bottom = $is_last ? '0' : '1.2rem';
                                                echo '<p style="margin: 0 0 ' . $margin_bottom . ' 0;">' . wp_kses_post($paragraph) . '</p>';
                                            }
                                        }
                                    } else {
                                        // Fallback content with consistent styling
                                        ?>
                                        <p style="margin: 0 0 1.2rem 0;">With over 20 years of experience in the roofing industry, Roofing Pros brings unparalleled expertise and quality service to the residents of Orlando, FL. Our team is dedicated to transforming homes with durable roofing solutions that exceed your expectations.</p>
                                        
                                        <p style="margin: 0 0 1.2rem 0;">At Roofing Pros, we understand the common challenges faced by property owners in Orlando, FL when it comes to maintaining and protecting their homes. That's why we offer a comprehensive range of roofing services tailored to meet your specific needs, ensuring your satisfaction with every project.</p>
                                        
                                        <p style="margin: 0 0 1.2rem 0;">From roof repairs to complete replacements and everything in between, we take pride in our attention to detail, reliability, and commitment to delivering exceptional results. Trust Roofing Pros to enhance your home's protection and enjoy the benefits of a stunning roof that truly stands out.</p>
                                        
                                        <p style="margin: 0; font-weight: 600; color: #2c3e50;">We are committed to quality craftsmanship and exceptional customer experience.</p>
                                        <?php
                                    }
                                    ?>
                                </div>
                            </div>
                        </div>
                        
                        <div class="about-mission-section" style="margin-bottom: 2.5rem;">
                            <h3 style="font-size: 1.5rem; font-weight: 600; color: #2c3e50; margin: 0 0 1rem 0; border-left: 4px solid #4ecdc4; padding-left: 1rem;">Our Mission</h3>
                            <p style="margin: 0; line-height: 1.6; color: #34495e;">Our mission at Roofing Pros is to provide the highest quality roofing services in Orlando while ensuring customer satisfaction through transparency, reliability, and exceptional craftsmanship. We aim to protect your home with durable roofing solutions that stand the test of time, enhancing both safety and aesthetic appeal.</p>
                        </div>
                        
                        <div class="about-values-section" style="margin-bottom: 2.5rem;">
                            <h3 style="font-size: 1.5rem; font-weight: 600; color: #2c3e50; margin: 0 0 1rem 0; border-left: 4px solid #4ecdc4; padding-left: 1rem;">Our Values</h3>
                            <ul class="values-list" style="margin: 0; padding-left: 1.5rem;">
                                <li>Integrity: We believe in honest and transparent communication with our clients.</li><li>Quality: Our work is backed by the highest standards in roofing craftsmanship.</li><li>Customer Focus: We prioritize our customers' needs and satisfaction above all.</li><li>Safety: We ensure a safe working environment for our team and clients.</li><li>Community: We are committed to serving and giving back to our Orlando community.</li>
                            </ul>
                        </div>
                        
                        <div class="about-team-section" style="margin-bottom: 2.5rem;">
                            <h3 style="font-size: 1.5rem; font-weight: 600; color: #2c3e50; margin: 0 0 1rem 0; border-left: 4px solid #4ecdc4; padding-left: 1rem;">Our Team</h3>
                            <p style="margin: 0; line-height: 1.6; color: #34495e;">Our team at Roofing Pros consists of highly skilled and certified roofing professionals with years of experience in the industry. We are equipped with the latest tools and techniques to ensure that every project is completed to perfection. Our team is dedicated to continuous learning and staying updated with industry standards, ensuring that we deliver the best possible service to our clients.</p>
                        </div>
                        
                        <div class="about-commitment-section" style="margin-bottom: 2.5rem;">
                            <h3 style="font-size: 1.5rem; font-weight: 600; color: #2c3e50; margin: 0 0 1rem 0; border-left: 4px solid #4ecdc4; padding-left: 1rem;">Our Commitment</h3>
                            <p style="margin: 0 0 1rem 0; line-height: 1.6; color: #34495e;">At Roofing Pros, we are committed to providing our customers with top-notch roofing services that exceed expectations. We understand that your home is your sanctuary, and we take every measure to protect it with our expert roofing solutions.</p>
                            <ul class="commitment-points" style="margin: 0; padding-left: 1.5rem;">
                                <li>Timely project completion to meet your deadlines.</li><li>Thorough inspections to ensure quality and safety.</li><li>Open communication throughout the project process.</li><li>Post-project support for any concerns or questions.</li>
                            </ul>
                        </div>
                        
                        <!-- Experience Badge and CTA Section -->
                        <div class="about-cta-section" style="text-align: center; margin-bottom: 2.5rem;">
                            <div style="display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                                <?php 
                                // Get experience data from wizard settings
                                $experience_years = $settings['experience_years'] ?? '20+';
                                $experience_term = $settings['experience_term'] ?? 'Years of Experience';
                                ?>
                                <div class="experience-badge" style="display: inline-block; background: #2c3e50; color: white; padding: 1.5rem 2rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                                    <h3 style="font-size: 2rem; font-weight: 800; margin: 0; text-align: center;"><?php echo esc_html($experience_years); ?></h3>
                                    <p style="font-size: 0.9rem; margin: 0; text-align: center; opacity: 0.9;"><?php echo esc_html($experience_term); ?></p>
                                </div>
                                
                                <a href="#contact" class="cta-button" style="display: inline-block; background: #4ecdc4; color: white; padding: 1rem 2rem; text-decoration: none; border-radius: 8px; font-weight: 600; transition: background 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">Get Started Today</a>
                            </div>
                        </div>
                        
                        <div class="about-cta-section" style="text-align: center; background: #f8f9fa; padding: 2rem; border-radius: 12px; border: 1px solid #e9ecef;">
                            <h3 style="font-size: 1.5rem; font-weight: 600; color: #2c3e50; margin: 0 0 1rem 0;">Ready to Get Started?</h3>
                            <p style="margin: 0 0 1.5rem 0; line-height: 1.6; color: #34495e;">Ready to elevate your home with a new roof? Contact Roofing Pros today for a consultation and let us help you protect your investment. Call us at 8755026291 and experience our exceptional service firsthand!</p>
                            <p class="contact-info" style="margin: 0; font-size: 1.1rem; color: #7f8c8d;">Call us today at <strong style="color: #2c3e50;">8755026291</strong> for a free consultation!</p>
                        </div>
                    </div>
                    <?php
                }
                ?>
            </div>
        </section>


        <!-- Why Work With Us Section -->
        <section class="why-work-with-us animate-on-scroll-section" style="padding: 5rem 0; background: <?php echo esc_attr($settings['why_work_bg_color'] ?? ($settings['primary_color'] ?? '#1e3a8a')); ?>; position: relative; overflow: hidden;">
            <!-- Background Pattern -->
            <div style="position: absolute; top: 0; right: 0; width: 300px; height: 100%; background: linear-gradient(45deg, transparent 30%, rgba(<?php echo esc_attr($settings['why_work_pattern_color'] ?? '59, 130, 246'); ?>, 0.08) 50%, transparent 70%); transform: skewX(-15deg);"></div>
            
            <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; position: relative; z-index: 2;">
                <div style="text-align: center; margin-bottom: 4rem;">
                    <h2 style="color: <?php echo esc_attr($settings['why_work_heading_color'] ?? '#ffffff'); ?>; font-size: 3rem; font-weight: 800; margin-bottom: 0.75rem; letter-spacing: -0.5px; line-height: 1.1;"><?php echo esc_html($settings['why_work_heading'] ?? 'Why Work With Us?'); ?></h2>
                    <p style="color: <?php echo esc_attr($settings['why_work_subtitle_color'] ?? '#ffffff'); ?>; font-size: 1.25rem; margin: 0; font-weight: 500;"><?php echo esc_html($settings['why_work_subheading'] ?? 'Benefits of Working with an Expert Team'); ?></p>
                </div>
                
                <div style="display: flex; flex-direction: column; align-items: center; gap: 4rem; margin-top: 4rem; max-width: 1000px; margin-left: auto; margin-right: auto;">
                    <!-- First row: 3 items -->
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4rem; justify-items: center;">
                    <!-- Proven Expertise -->
                    <div class="benefit-item" style="text-align: center;">
                        <div style="width: 60px; height: 60px; background: <?php echo esc_attr($settings['why_work_icon_bg'] ?? ($settings['secondary_color'] ?? '#3b82f6')); ?>; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; border: 1px solid rgba(255, 255, 255, 0.3);">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="<?php echo esc_attr($settings['why_work_icon_color'] ?? '#ffffff'); ?>" stroke-width="2">
                                <path d="M20 6L9 17l-5-5"/>
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                            </svg>
                        </div>
                        <h3 style="color: <?php echo esc_attr($settings['why_work_card_title_color'] ?? '#ffffff'); ?>; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; letter-spacing: -0.1px; white-space: nowrap;">Proven Expertise</h3>
                        <p style="color: <?php echo esc_attr($settings['why_work_card_text_color'] ?? '#ffffff'); ?>; margin: 0; line-height: 1.4; font-size: 0.9rem; font-weight: 400; white-space: nowrap;">Years of successful delivery.</p>
                    </div>

                    <!-- Tailored Solutions -->
                    <div class="benefit-item" style="text-align: center;">
                        <div style="width: 60px; height: 60px; background: <?php echo esc_attr($settings['why_work_icon_bg'] ?? $settings['accent_color'] ?? '#3b82f6'); ?>; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; border: 1px solid rgba(255, 255, 255, 0.3);">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="<?php echo esc_attr($settings['why_work_icon_color'] ?? '#ffffff'); ?>" stroke-width="2">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                                <path d="M9 12l2 2 4-4"/>
                            </svg>
                        </div>
                        <h3 style="color: <?php echo esc_attr($settings['why_work_card_title_color'] ?? '#ffffff'); ?>; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; letter-spacing: -0.1px; white-space: nowrap;">Tailored Solutions</h3>
                        <p style="color: <?php echo esc_attr($settings['why_work_card_text_color'] ?? '#ffffff'); ?>; margin: 0; line-height: 1.4; font-size: 0.9rem; font-weight: 400; white-space: nowrap;">Built for your unique needs.</p>
                    </div>

                    <!-- End-to-End Support -->
                    <div class="benefit-item" style="text-align: center;">
                        <div style="width: 60px; height: 60px; background: <?php echo esc_attr($settings['why_work_icon_bg'] ?? $settings['accent_color'] ?? '#3b82f6'); ?>; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; border: 1px solid rgba(255, 255, 255, 0.3);">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="<?php echo esc_attr($settings['why_work_icon_color'] ?? '#ffffff'); ?>" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10,9 9,9 8,9"/>
                                <path d="M9 12l2 2 4-4"/>
                            </svg>
                        </div>
                        <h3 style="color: <?php echo esc_attr($settings['why_work_card_title_color'] ?? '#ffffff'); ?>; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; letter-spacing: -0.1px; white-space: nowrap;">End-to-End Support</h3>
                        <p style="color: <?php echo esc_attr($settings['why_work_card_text_color'] ?? '#ffffff'); ?>; margin: 0; line-height: 1.4; font-size: 0.9rem; font-weight: 400; white-space: nowrap;">Guidance at every step.</p>
                    </div>
                    </div>
                    
                    <!-- Second row: 2 items centered -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; justify-items: center; max-width: 600px;">

                    <!-- Cutting-Edge Technology -->
                    <div class="benefit-item" style="text-align: center;">
                        <div style="width: 60px; height: 60px; background: <?php echo esc_attr($settings['why_work_icon_bg'] ?? $settings['accent_color'] ?? '#3b82f6'); ?>; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; border: 1px solid rgba(255, 255, 255, 0.3);">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="<?php echo esc_attr($settings['why_work_icon_color'] ?? '#ffffff'); ?>" stroke-width="2">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                <line x1="8" y1="21" x2="16" y2="21"/>
                                <line x1="12" y1="17" x2="12" y2="21"/>
                                <circle cx="12" cy="9" r="1"/>
                                <path d="M8 9h8"/>
                            </svg>
                        </div>
                        <h3 style="color: <?php echo esc_attr($settings['why_work_card_title_color'] ?? '#ffffff'); ?>; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; letter-spacing: -0.1px; white-space: nowrap;">Cutting-Edge Technology</h3>
                        <p style="color: <?php echo esc_attr($settings['why_work_card_text_color'] ?? '#ffffff'); ?>; margin: 0; line-height: 1.4; font-size: 0.9rem; font-weight: 400; white-space: nowrap;">Modern, reliable, scalable systems.</p>
                    </div>

                    <!-- Results-Driven -->
                    <div class="benefit-item" style="text-align: center;">
                        <div style="width: 60px; height: 60px; background: <?php echo esc_attr($settings['why_work_icon_bg'] ?? $settings['accent_color'] ?? '#3b82f6'); ?>; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; border: 1px solid rgba(255, 255, 255, 0.3);">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="<?php echo esc_attr($settings['why_work_icon_color'] ?? '#ffffff'); ?>" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <circle cx="12" cy="12" r="6"/>
                                <circle cx="12" cy="12" r="2"/>
                            </svg>
                        </div>
                        <h3 style="color: <?php echo esc_attr($settings['why_work_card_title_color'] ?? '#ffffff'); ?>; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; letter-spacing: -0.1px; white-space: nowrap;">Results-Driven</h3>
                        <p style="color: <?php echo esc_attr($settings['why_work_card_text_color'] ?? '#ffffff'); ?>; margin: 0; line-height: 1.4; font-size: 0.9rem; font-weight: 400; white-space: nowrap;">Focused on measurable business impact.</p>
                    </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Reviews Section -->
        <?php include dirname(__FILE__) . '/section-reviews.php'; ?>

        <!-- Service Areas Section (shared) -->
        <?php include dirname(__FILE__) . '/section-areas.php'; ?>

        <!-- Standard Services Section -->
        <?php include dirname(__FILE__) . '/section-services.php'; ?>

        <!-- Commitment Section -->
        <?php include dirname(__FILE__) . '/section-commitment.php'; ?>

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
        const benefitItems = document.querySelectorAll('.benefit-item');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionVisible = 150;
            
            if (sectionTop < window.innerHeight - sectionVisible) {
                section.classList.add('animated');
                
                if (section.classList.contains('why-work-with-us')) {
                    benefitItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animated');
                        }, index * 350); // slower stagger for nicer feel
                    });
                }
            }
        });
    }

    // Run on scroll and on page load
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    </script>
    
<?php get_footer(); ?> 