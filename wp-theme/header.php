<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php
    // Dynamic favicon generation based on business name
    $settings = bsg_get_settings();
    $business_name = $settings['business_name'] ?? 'Business';
    
    // Generate initials from business name
    $initials = '';
    $words = explode(' ', $business_name);
    foreach ($words as $word) {
        if (!empty($word)) {
            $initials .= strtoupper(substr($word, 0, 1));
        }
    }
    $initials = substr($initials, 0, 2); // Limit to 2 characters
    
    // Generate SVG favicon
    $favicon_svg = '<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect width="32" height="32" rx="6" fill="url(#grad)"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="12" font-weight="bold" 
              text-anchor="middle" dominant-baseline="central" fill="white">' . esc_html($initials) . '</text>
    </svg>';
    
    // Convert to data URL
    $favicon_data_url = 'data:image/svg+xml;base64,' . base64_encode($favicon_svg);
    ?>
    <link rel="icon" type="image/svg+xml" href="<?php echo esc_url($favicon_data_url); ?>">
    <link rel="icon" type="image/svg+xml" sizes="16x16" href="<?php echo esc_url($favicon_data_url); ?>">
    <link rel="icon" type="image/svg+xml" sizes="32x32" href="<?php echo esc_url($favicon_data_url); ?>">
    <link rel="icon" type="image/svg+xml" sizes="48x48" href="<?php echo esc_url($favicon_data_url); ?>">
    <link rel="apple-touch-icon" href="<?php echo esc_url($favicon_data_url); ?>">
    <?php
    // Output meta tags based on page type
    if (is_page_template('page-about-us.php')) {
        bsg_output_meta_tags('about');
    } elseif (is_page_template('page-contact.php')) {
        bsg_output_meta_tags('contact');
    } else {
        bsg_output_meta_tags('home');
    }
    ?>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<?php include dirname(__FILE__) . '/section-header.php'; ?>
