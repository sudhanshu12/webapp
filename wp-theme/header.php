<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <link rel="icon" type="image/x-icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">
    <link rel="icon" type="image/svg+xml" href="<?php echo get_template_directory_uri(); ?>/favicon.svg">
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/favicon.svg">
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
