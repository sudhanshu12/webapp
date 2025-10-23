<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Performance Optimizations -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="https://ik.imagekit.io">
    
    <!-- Critical CSS for faster rendering -->
    <style>
        /* Critical CSS for above-the-fold content */
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .hero-section { min-height: 100vh; display: flex; align-items: center; }
        img { max-width: 100%; height: auto; }
    </style>
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="<?php echo get_template_directory_uri(); ?>/favicon.svg">
    <link rel="icon" type="image/x-icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/favicon.svg">
    <?php
    // Only output meta tags for pages that don't have their own meta tag handling
    // Pages with their own meta tags: about.php, contact.php, page-service.php, location.php, home-dynamic.php, page-about-us.php
    $current_url = $_SERVER['REQUEST_URI'] ?? '';
    $is_service_page = strpos($current_url, '/services/') !== false;
    $is_location_page = strpos($current_url, '/service-locations/') !== false;
    
    if (!is_page_template('about.php') && !is_page_template('contact.php') && 
        !is_page_template('page-service.php') && !is_page_template('location.php') && 
        !is_page_template('home-dynamic.php') && !is_page_template('page-about-us.php') &&
        !is_page_template('page-contact-us.php') && !$is_service_page && !$is_location_page) {
        bsg_output_meta_tags('home');
    }
    ?>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<?php include dirname(__FILE__) . '/section-header.php'; ?>
