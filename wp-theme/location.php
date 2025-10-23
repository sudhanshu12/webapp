<?php
/**
 * Template Name: BSG Location Page
 * Template Post Type: page
 * Description: Location/Service Areas page template for BSG theme
 */

// Get centralized settings
$business = bsg_get_business_info();
$settings = bsg_get_settings();

// Fallback: If settings are empty, try to get them directly
if (empty($settings)) {
    $settings = get_option('bsg_settings', []);
}

// Additional fallback: Try to get settings from theme options
if (empty($settings)) {
    $settings = get_option('bsg_theme_settings', []);
}

// Debug: Log settings
error_log('Final settings loaded: ' . print_r($settings, true));

$location_title = get_the_title();

// Add meta tags to head
add_action('wp_head', function() use ($location_title, $business) {
    $meta_title = 'Service Areas - ' . $location_title . ' | ' . $business['name'];
    $meta_description = 'Professional services in ' . $location_title . ' by ' . $business['name'] . '. Quality work, experienced team, and exceptional results. Contact us today for a free consultation.';
    
    echo '<title>' . esc_html($meta_title) . '</title>' . "\n";
    echo '<meta name="description" content="' . esc_attr($meta_description) . '">' . "\n";
    echo '<meta name="keywords" content="' . strtolower($location_title) . ', professional services, ' . $business['name'] . ', service areas, local business">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($meta_title) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($meta_description) . '">' . "\n";
    echo '<meta property="og:type" content="website">' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr($meta_title) . '">' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr($meta_description) . '">' . "\n";
    echo '<link rel="canonical" href="' . esc_url(get_permalink()) . '">' . "\n";
}, 1);

// Derive request slug from URL as an extra-robust matcher (in case WP returns parent context)
$request_path = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
$request_slug = $request_path ? trim(basename($request_path), '/') : '';

// Get location data from settings to find the specific location
$locations = $settings['locations'] ?? [];
$current_location = null;

// Debug: Log the matching process
error_log('=== LOCATION TEMPLATE DEBUG START ===');
error_log('Location matching debug - Page title: ' . $location_title);
error_log('Location matching debug - Page slug: ' . get_post_field('post_name', get_the_ID()));
error_log('Location matching debug - Settings loaded: ' . (empty($settings) ? 'NO' : 'YES'));
error_log('Location matching debug - Locations count: ' . count($locations));
error_log('Location matching debug - Available locations: ' . print_r(array_column($locations, 'name'), true));
if (!empty($locations)) {
    error_log('Location matching debug - First location: ' . print_r($locations[0], true));
}
error_log('=== LOCATION TEMPLATE DEBUG END ===');

// Prefer direct slug match from the request path first
if (!$current_location && !empty($request_slug)) {
    foreach ($locations as $location) {
        if (!empty($location['slug']) && $location['slug'] === $request_slug) {
            $current_location = $location;
            error_log('Location matched by REQUEST URI slug: ' . $location['slug'] . ' = ' . $request_slug);
            break;
        }
    }
}

// Try multiple matching strategies
foreach ($locations as $location) {
    if (isset($location['name'])) {
        // Strategy 1: Direct name match
        if ($location['name'] === $location_title) {
            $current_location = $location;
            error_log('Location matched by direct name: ' . $location['name']);
            break;
        }
        
        // Strategy 2: Slug match (if page slug matches location slug)
        if (isset($location['slug'])) {
            $page_slug = get_post_field('post_name', get_the_ID());
            if ($location['slug'] === $page_slug) {
        $current_location = $location;
                error_log('Location matched by slug: ' . $location['slug'] . ' = ' . $page_slug);
        break;
    }
}

        // Strategy 3: Sanitized title match
        if (sanitize_title($location['name']) === sanitize_title($location_title)) {
            $current_location = $location;
            error_log('Location matched by sanitized title: ' . sanitize_title($location['name']) . ' = ' . sanitize_title($location_title));
            break;
        }
        
        // Strategy 4: Partial name match (for cases like "Tampa" matching "Tampa, FL")
        if (strpos($location_title, $location['name']) !== false || strpos($location['name'], $location_title) !== false) {
            $current_location = $location;
            error_log('Location matched by partial name: ' . $location['name'] . ' contains ' . $location_title);
            break;
        }
        
        // Strategy 5: Case-insensitive match
        if (strtolower($location['name']) === strtolower($location_title)) {
            $current_location = $location;
            error_log('Location matched by case-insensitive: ' . $location['name'] . ' = ' . $location_title);
            break;
        }
    }
}

// Debug: Log the result
if ($current_location) {
    error_log('Location found: ' . $current_location['name'] . ' with metaTitle: ' . ($current_location['metaTitle'] ?? 'none'));
} else {
    error_log('No location matched for title: ' . $location_title);
    
    // Fallback: Try to get location data from page meta or post content
    $page_slug = get_post_field('post_name', get_the_ID());
    error_log('Trying fallback with page slug: ' . $page_slug);
    
    // Try to find location by slug in the available locations
    foreach ($locations as $location) {
        if (isset($location['slug']) && $location['slug'] === $page_slug) {
            $current_location = $location;
            error_log('Location found by fallback slug match: ' . $location['name']);
            break;
        }
    }
    
    // If still not found, try to get location data from page meta
    if (!$current_location) {
        $page_id = get_the_ID();
        $meta_title = get_post_meta($page_id, 'meta_title', true);
        $meta_description = get_post_meta($page_id, 'meta_description', true);
        $location_description = get_post_meta($page_id, 'location_description', true);
        
        if ($meta_title || $meta_description || $location_description) {
            $current_location = [
                'name' => $location_title,
                'metaTitle' => $meta_title,
                'metaDescription' => $meta_description,
                'description' => $location_description
            ];
            error_log('Location created from page meta: ' . $current_location['name']);
        }
    }
}

// Generate meta title and description (treat empty strings as missing)
$meta_title = !empty(trim($current_location['metaTitle'] ?? ''))
    ? trim($current_location['metaTitle'])
    : ($business['name'] . ' - ' . $location_title . ' Roofing Services | Professional Roofing in ' . $business['state']);
$meta_description = !empty(trim($current_location['metaDescription'] ?? ''))
    ? trim($current_location['metaDescription'])
    : ('Professional roofing services in ' . $location_title . ', ' . $business['state'] . '. Expert roof repairs, replacements, and inspections. Licensed & insured roofing contractor. Call ' . $business['name'] . ' for a free estimate today.');

// Debug: Log the final meta title
error_log('=== LOCATION FINAL RESULT DEBUG ===');
error_log('Location meta title result: ' . $meta_title);
error_log('Location current_location found: ' . ($current_location ? 'YES' : 'NO'));
if ($current_location) {
    error_log('Location current_location metaTitle: ' . ($current_location['metaTitle'] ?? 'NOT SET'));
    error_log('Location current_location name: ' . ($current_location['name'] ?? 'NOT SET'));
} else {
    error_log('Location current_location is NULL - using fallback meta title');
}
error_log('=== LOCATION FINAL RESULT DEBUG END ===');

// For the hero heading, use the meta title
$hero_title = $meta_title;

// Get location description from wizard data (with page meta fallback)
$location_description = $current_location['description'] ?? '';
if (empty($location_description)) {
    $location_description = get_post_meta(get_the_ID(), 'location_description', true) ?: '';
}

// If description is empty or too short (less than 100 chars) or has no HTML tags, use a rich default
if (empty($location_description) || strlen($location_description) < 100 || strip_tags($location_description) === $location_description) {
    // Store the short description if it exists
    $short_desc = !empty($location_description) ? $location_description : 'professional services in ' . $location_title;
    
    // Create rich default description with HTML formatting
    $location_description = '<h2>Quality Services in ' . esc_html($location_title) . '</h2>
    <p>' . esc_html(ucfirst($short_desc)) . '. Our team is proud to serve the ' . esc_html($location_title) . ' community with dedicated, professional service.</p>
    
    <h3>Why Choose Us in ' . esc_html($location_title) . '?</h3>
    <p>As a trusted local service provider in ' . esc_html($location_title) . ', we understand the unique needs of our community. Our experienced team brings years of expertise combined with a commitment to excellence that sets us apart.</p>
    
    <p>We\'re not just another service company – we\'re your neighbors. We take pride in serving ' . esc_html($location_title) . ' and the surrounding areas with honesty, integrity, and exceptional workmanship. Every project, large or small, receives our full attention and dedication.</p>
    
    <h3>Local Expertise You Can Trust</h3>
    <p>Our deep roots in the ' . esc_html($location_title) . ' area mean we understand local regulations, weather patterns, and community standards. This local knowledge, combined with our technical expertise, ensures that every job is done right the first time.</p>';
}

// Debug: Log location description
error_log('Location description length: ' . strlen($location_description));
error_log('Location description preview: ' . substr($location_description, 0, 200));

// Add meta tags to head - Use higher priority to ensure they override default
add_action('wp_head', function() use ($meta_title, $meta_description) {
    echo '<title>' . esc_html($meta_title) . '</title>' . "\n";
    echo '<meta name="description" content="' . esc_attr($meta_description) . '">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($meta_title) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($meta_description) . '">' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr($meta_title) . '">' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr($meta_description) . '">' . "\n";
}, 1);

// Also force document title for themes/plugins that override <title>
add_filter('pre_get_document_title', function($title) use ($meta_title) {
    return $meta_title ?: $title;
}, 99);
// Yoast/SEO plugins compatibility
add_filter('wpseo_title', function($title) use ($meta_title) { return $meta_title ?: $title; }, 99);
add_filter('wpseo_metadesc', function($desc) use ($meta_description) { return $meta_description ?: $desc; }, 99);

get_header(); ?>

<main id="main" class="site-main">
    <?php
    // Get theme settings
    $settings = get_option('bsg_settings', []);
    $business_name = !empty($settings['business_name']) ? $settings['business_name'] : 'Your Business';
    $phone = $settings['phone'] ?? '(555) 123-4567';
    $email = $settings['email'] ?? 'info@business.com';
    $address = $settings['address'] ?? '123 Main Street';
    $state = $settings['state'] ?? 'Your State';
    $zip = $settings['zip'] ?? '12345';
    
    // Reviews visibility
    $reviews = $settings['reviews'] ?? [];
    $reviews_visible = !empty($settings['reviews_visible']) && !empty($reviews);



    // Get page info
$about_page = get_page_by_path('about-us');
$contact_page = get_page_by_path('contact-us');
    $services_page = get_page_by_path('services');
    
    // Get current service info
    $current_service_slug = get_query_var('service', '');
    $service_title = get_the_title();
    
    // Get service data from settings
    $current_service_data = null;
    if (!empty($current_service_slug) && !empty($settings['services'])) {
        foreach ($settings['services'] as $service) {
            if ($service['slug'] === $current_service_slug) {
                $current_service_data = $service;
                break;
            }
        }
    }
    
    // If no service data found, use page title
    if (!$current_service_data) {
        $current_service_data = [
            'name' => $service_title,
            'description' => 'Professional ' . strtolower($service_title) . ' services',
            'content' => ''
        ];
    }
    
    // Hero background settings
    $hero_bg_image = $settings['hero_bg_image'] ?? '';
    $hero_padding = $settings['hero_padding'] ?? 109;
    ?>

    <!-- Header with Logo and Navigation - Same as Homepage -->
    <?php include dirname(__FILE__) . '/section-header.php'; ?>

    <style>
        /* Hero section styling - consistent across all pages */
        .hero-section {
            color: white;
            padding: 109px 0;
        }
        
        .hero-section h1 {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
            line-height: 1.2;
            white-space: normal;
            word-wrap: break-word;
        }
        
        .hero-section p {
            font-size: 1.25rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto 2rem;
            line-height: 1.6;
        }
        
        .hero-section .cta-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: #d57508;
            color: #ffffff;
            padding: 1rem 2rem;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.1rem;
            transition: all 0.3s ease;
        }
        
        .hero-section .cta-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(46, 230, 197, 0.3);
        }
        
        .hero-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .hero-actions .btn {
            padding: 1rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        .hero-actions .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }
        
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        .content-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
        }
        
        .content-text h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: #232834;
        }
        
        .content-text h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 2rem 0 1rem;
            color: #374151;
        }
        
        .content-text p {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 1rem;
            color: #4b5563;
        }
        
        .content-text ul {
            list-style: none;
                padding: 0;
        }
        
        .content-text li {
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
            color: #4b5563;
        }
        
        .content-text li:before {
            position: absolute;
            left: 0;
            color: #2ee6c5;
            font-weight: bold;
        }
        
        .content-image img {
                width: 100%;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        
        /* Ensure sections are visible */
        .locations-section,
        .commitment-section {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
        
        .two-col-layout {
            display: flex !important;
            align-items: flex-start !important;
            gap: 3rem !important;
        }
        
        /* Scroll-triggered animation classes - Same as Homepage */
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
            content: '🔍 ANIMATION READY';
            position: absolute;
            top: 10px;
            right: 10px;
            background: #ff6b6b;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1000;
            opacity: 0.8;
        }

        .animate-on-scroll-section.animated::before {
            content: '';
            background: #51cf66;
        }
        
        @media (max-width: 768px) {
            .hero-section h1 {
                font-size: 2.5rem;
            }
            
            .content-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .two-col-layout {
                flex-direction: column !important;
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
            background: #f59e0b !important;
            color: #ffffff !important;
        }
        
        /* Hero Animation Styles - Advanced Staggered Sequence */
        .hero-content {
            opacity: 0;
            transform: translateY(40px);
            animation: heroContentFadeIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
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

    <!-- Service Hero Section -->
        <section class="hero-section animate-on-scroll-section" style="<?php if (!empty($settings['hero_bg_image'])): ?>background-image: linear-gradient(to left, transparent 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.7) 80%, rgba(255,255,255,3) 100%), url('<?php echo esc_url($settings['hero_bg_image']); ?>'); background-size: cover; background-position: center;<?php else: ?>background-color: <?php echo esc_attr($settings['hero_bg_color'] ?? 'var(--surface-color)'); ?>;<?php endif; ?> padding: 90px 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 60px;">
            <div class="hero-content" style="margin-right: 20px;">
                <h1 style="color: <?php echo esc_attr($settings['hero_heading_color'] ?? '#000000'); ?>; white-space: normal; word-wrap: break-word; line-height: 1.2; font-size: 3.2rem; font-weight: 800; margin: 0 0 24px 0;">
                    <?php echo esc_html($hero_title); ?>
                </h1>
                <div class="hero-actions">
                    <a href="tel:<?php echo esc_attr($phone); ?>" class="btn btn-dark" style="background: #f59e0b; color: #ffffff; display:inline-flex; align-items:center; justify-content:center; gap:0.6rem; width:100%; max-width:520px; border-radius:10px; padding:1rem 1.25rem; font-weight:700; font-size:1.1rem;">
                        <i class="fa-solid fa-phone"></i> Call us Today
                    </a>
                </div>
            </div>
            </div>
        </section>

    <?php include dirname(__FILE__) . '/section-about.php'; ?>

    <!-- Location Content - White Background -->
    <style>
    /* Override global heading styles for location content */
    .location-content h1, 
    .location-content h2, 
    .location-content h3, 
    .location-content h4, 
    .location-content h5, 
    .location-content h6 {
        color: #1f2937 !important;
    }
    
    .location-content h2 {
        font-size: 2.5rem !important;
        font-weight: 800 !important;
        margin: 0 0 1rem 0 !important;
        color: #1f2937 !important;
    }
    
    .location-content h3 {
        font-size: 1.8rem !important;
        font-weight: 700 !important;
        margin: 2rem 0 1rem 0 !important;
        color: #1f2937 !important;
    }
    
    .location-content p {
        font-size: 1.1rem !important;
        line-height: 1.6 !important;
        margin-bottom: 1.5rem !important;
        color: #374151 !important;
    }
    
    /* Ensure quote box is visible and properly styled */
    .services-contact-box {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 10 !important;
    }
    
    .services-contact-box h3 {
        color: #ffffff !important;
        font-size: 1.5rem !important;
        font-weight: 700 !important;
        margin-bottom: 1rem !important;
        text-align: center !important;
    }
    
    .services-contact-box p {
        color: #ffffff !important;
        text-align: center !important;
        margin-bottom: 1.5rem !important;
        line-height: 1.5 !important;
    }
    
    .services-contact-box a {
        display: inline-flex !important;
        align-items: center !important;
        gap: 0.5rem !important;
        background: #2ee6c5 !important;
        color: #ffffff !important;
        padding: 1rem 1.5rem !important;
        border-radius: 8px !important;
        text-decoration: none !important;
        font-weight: 600 !important;
        font-size: 1rem !important;
        transition: all 0.3s ease !important;
    }
    
    .services-contact-box a:hover {
        background: #22d3aa !important;
        transform: translateY(-2px) !important;
    }
    </style>
    <section class="location-content animate-on-scroll-section" style="padding: <?php echo esc_attr($settings['location_content_padding'] ?? '80'); ?>px 0; background: <?php echo esc_attr($settings['location_description_bg'] ?? $settings['location_content_bg_color'] ?? '#ffffff'); ?>; color: <?php echo esc_attr($settings['location_description_text_color'] ?? '#232834'); ?>;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div class="content-layout" style="display: grid; grid-template-columns: 2fr 1fr; gap: 4rem; align-items: start;">
                <div class="content-text">
                    <?php 
                    // Get location description from wizard data
                    $location_description = $location_description ?? '';
                    
                    // Debug: Show what we're working with
                    echo "<!-- DEBUG: Location description length: " . strlen($location_description) . " -->\n";
                    echo "<!-- DEBUG: Location description preview: " . substr($location_description, 0, 100) . "... -->\n";
                    
                    if (!empty($location_description)) {
                        // Clean up the HTML content
                        $clean_html = $location_description;
                        
                        // Remove code fence markers if present
                        $clean_html = preg_replace('/```[a-zA-Z]*\s*/', '', $clean_html);
                        $clean_html = str_replace('```', '', $clean_html);
                        
                        // Remove script tags for security
                        $clean_html = preg_replace('/<script\b[^>]*>.*?<\/script>/is', '', $clean_html);
                        
                        // Use WordPress's wp_kses_post which allows most HTML tags
                        echo wp_kses_post($clean_html);
                    } else { ?>
                        <!-- Location Description Placeholder - Fallback -->
                        <div class="location-description-placeholder">
                    <h2 style="font-size: 2.5rem; font-weight: 800; margin: 0 0 1rem 0; color: #1f2937;">Our Services in <?php echo esc_html(get_the_title()); ?> <?php echo esc_html($zip); ?></h2>
                    <h3 style="font-size: 1.8rem; font-weight: 700; margin: 0 0 1.5rem 0; color: #1f2937;">Professional Services in <?php echo esc_html(get_the_title()); ?></h3>
                    <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; color: #374151;">
                        We are a professional team dedicated to delivering exceptional service and quality workmanship in <?php echo esc_html(get_the_title()); ?>. With years of experience in the industry, we take pride in every project we undertake. Our commitment to quality, reliability, and customer satisfaction makes us the trusted choice for professional services in <?php echo esc_html(get_the_title()); ?>.
                    </p>
                        </div>
                    <?php } ?>
                                </div>
                
                <!-- Sticky Quote Box - Same as Service Page -->
                <!-- DEBUG: Quote box settings -->
                <!-- location_quote_box_bg: <?php echo esc_attr($settings['location_quote_box_bg'] ?? 'NOT SET'); ?> -->
                <!-- location_contact_box_bg: <?php echo esc_attr($settings['location_contact_box_bg'] ?? 'NOT SET'); ?> -->
                <!-- location_quote_box_text: <?php echo esc_attr($settings['location_quote_box_text'] ?? 'NOT SET'); ?> -->
                <!-- location_contact_title: <?php echo esc_attr($settings['location_contact_title'] ?? 'NOT SET'); ?> -->
                <div class="services-contact-box" style="position: sticky; top: 2rem; background: <?php echo esc_attr($settings['location_quote_box_bg'] ?? $settings['location_contact_box_bg'] ?? '#1a1f28'); ?>; color: <?php echo esc_attr($settings['location_quote_box_text'] ?? $settings['location_contact_box_text_color'] ?? '#ffffff'); ?>; padding: 2rem; border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.15); width: 100%; max-width: 400px; margin: 0 auto;">
                    <div class="icon" style="text-align: center; margin-bottom: 1.5rem;">
                        <div style="width: 60px; height: 60px; background: #2ee6c5; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                            <i class="fa-solid fa-quote-left" style="color: #232834; font-size: 1.5rem;"></i>
                        </div>
                    </div>
                    <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; text-align: center; color: <?php echo esc_attr($settings['location_quote_box_heading_color'] ?? $settings['location_contact_box_text_color'] ?? '#ffffff'); ?>;"><?php echo esc_html($settings['location_contact_title'] ?? 'GET A QUOTE'); ?></h3>
                    <p style="text-align: center; margin-bottom: 1.5rem; color: <?php echo esc_attr($settings['location_quote_box_text'] ?? $settings['location_contact_box_text_color'] ?? '#ffffff'); ?>; line-height: 1.5;">
                        <?php echo esc_html($settings['location_contact_description'] ?? 'Ready to get started? Contact us for a free consultation and estimate.'); ?>
                    </p>
                    <div style="text-align: center;">
                        <a href="tel:<?php echo esc_attr($phone); ?>" style="display: inline-flex; align-items: center; gap: 0.5rem; background: <?php echo esc_attr($settings['location_quote_box_button_bg'] ?? $settings['location_contact_icons_color'] ?? '#2ee6c5'); ?>; color: <?php echo esc_attr($settings['location_quote_box_button_text'] ?? '#ffffff'); ?>; padding: 1rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 1rem; transition: all 0.3s ease;">
                            <i class="fa-solid fa-phone" style="color: <?php echo esc_attr($settings['location_quote_box_button_text'] ?? '#ffffff'); ?>;"></i>
                            Call <?php echo esc_html($phone); ?>
                        </a>
                    </div>
                </div>
            </div>
        </section>

           <!-- Service Section (shared) -->
        <?php include dirname(__FILE__) . '/section-services.php'; ?>

    <?php include dirname(__FILE__) . '/section-reviews.php'; ?>

    <!-- FAQ Section -->
    <?php include dirname(__FILE__) . '/faq-section.php'; ?>



    <!-- Contact Us Section (Matching Contact Page) -->
    <section class="contact-section-custom animate-on-scroll-section" style="background:<?php echo esc_attr($settings['contact_section_bg_color'] ?? '#232a36'); ?>;padding:80px 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="text-align:center;margin-bottom:3rem;">
                <h1 style="color:<?php echo esc_attr($settings['contact_headline_color'] ?? '#ffffff'); ?>;font-size:2.5rem;font-weight:700;margin-bottom:1rem;line-height:1.2;"><?php echo esc_html($settings['contact_heading'] ?? 'Get In Touch'); ?></h1>
                <p style="color:<?php echo esc_attr($settings['contact_description_color'] ?? 'rgba(255,255,255,0.9)'); ?>;font-size:1.1rem;max-width:600px;margin:0 auto;"><?php echo esc_html($settings['contact_description'] ?? 'Ready to get started? Contact us for a free consultation and estimate.'); ?></p>
            </div>
            <div class="contact-card" style="display:flex;flex-wrap:wrap;max-width:800px;width:100%;margin:0 auto;background:#ffffff;border-radius:16px;box-shadow:0 15px 30px rgba(0,0,0,0.12), 0 6px 12px rgba(0,0,0,0.08);overflow:hidden;transform:translateY(0);transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)';" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 15px 30px rgba(0,0,0,0.12), 0 6px 12px rgba(0,0,0,0.08)';">
                <div class="contact-left" style="flex:1 1 350px;min-width:280px;padding:32px;background:<?php echo esc_attr($settings['contact_left_side_color'] ?? '#2ee6c5'); ?>;display:flex;flex-direction:column;justify-content:center;color:<?php echo esc_attr($settings['contact_text_color'] ?? '#ffffff'); ?>;position:relative;">
                    <div style="position:absolute;top:16px;right:16px;width:60px;height:60px;background:rgba(255,255,255,0.1);border-radius:50%;opacity:0.3;"></div>
                    <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:24px;line-height:1.2;color:<?php echo esc_attr($settings['contact_headline_color'] ?? '#ffffff'); ?>;text-shadow:0 2px 4px rgba(0,0,0,0.3);">Contact Information</h2>
                    <div style="display:flex;flex-direction:column;gap:18px;">
                        <div style="display:flex;align-items:center;gap:12px;">
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:rgba(255,255,255,0.2);border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.2);"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 6 6l2.02-2.02a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z"></path></svg></span>
                            <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $settings['phone'] ?? '')); ?>" style="color:inherit;text-decoration:none;font-weight:700;font-size:1rem;text-shadow:0 1px 2px rgba(0,0,0,0.3);">
                                <?php echo esc_html($settings['phone'] ?? '(555) 123-4567'); ?>
                            </a>
                        </div>
                        <div style="display:flex;align-items:center;gap:12px;">
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:rgba(255,255,255,0.2);border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.2);"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg></span>
                            <a href="mailto:<?php echo antispambot($settings['email'] ?? ''); ?>" style="color:inherit;text-decoration:none;font-weight:700;font-size:1rem;text-shadow:0 1px 2px rgba(0,0,0,0.3);">
                                <?php echo esc_html($settings['email'] ?? 'info@example.com'); ?>
                            </a>
                        </div>
                        <div style="display:flex;align-items:center;gap:12px;">
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:rgba(255,255,255,0.2);border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.2);"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 1 8 8c0 7-8 12-8 12S4 17 4 10a8 8 0 0 1 8-8z"/></svg></span>
                            <span style="font-weight:700;font-size:1rem;text-shadow:0 1px 2px rgba(0,0,0,0.3);"><?php echo esc_html($settings['address'] ?? '123 Main St, City, State 12345'); ?></span>
                        </div>
                    </div>
                </div>
                <div class="contact-right" style="flex:1 1 350px;min-width:280px;padding:32px;background:<?php echo esc_attr($settings['contact_right_side_color'] ?? '#ffffff'); ?>;display:flex;flex-direction:column;justify-content:center;">
                <?php echo bsg_render_contact_form(); ?>
                </div>
            </div>
        </div>
    </section>

</main>



<script>
// Make sure this runs after WordPress footer loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 animateOnScroll script loaded successfully');

    // Scroll-triggered animations
    function animateOnScroll() {
        const sections = document.querySelectorAll('.animate-on-scroll-section');
        
        // Debug: Log how many sections found
        console.log('animateOnScroll: Found', sections.length, 'sections to animate');
        
        sections.forEach((section, index) => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionVisible = 150;
            
            // Debug: Log section details
            console.log('Section', index + 1, ':', section.className, 'Top:', sectionTop, 'Window height:', window.innerHeight, 'Should animate:', sectionTop < window.innerHeight - sectionVisible);
            
            if (sectionTop < window.innerHeight - sectionVisible) {
                section.classList.add('animated');
                console.log('✅ Added animated class to section', index + 1);
            }
        });
    }

    // Make function globally available for testing
    window.animateOnScroll = animateOnScroll;

    // Run on scroll and on page load
    window.addEventListener('scroll', animateOnScroll);
    
    // Run immediately and after a short delay
    animateOnScroll();
    setTimeout(animateOnScroll, 100);
    
    console.log('🚀 animateOnScroll initialized and ready');
});
    </script>
    
<?php get_footer(); ?>
