<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
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
