<?php
/**
 * Template Name: BSG Contact Page
 */

get_header();

$colors = bsg_get_color_scheme();
$settings = bsg_get_settings();
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <!-- Viewport is handled in header.php -->
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="<?php echo get_template_directory_uri(); ?>/favicon.svg">
    <link rel="icon" type="image/x-icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/favicon.svg">
    <?php bsg_output_meta_tags('contact'); ?>
    <?php bsg_output_structured_data('contact'); ?>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php include dirname(__FILE__) . '/section-header.php'; ?>

    <main>
        <section class="contact-hero" style="background-color: var(--surface-color); padding: 80px 0; color: #ffffff;">
  <div class="container">
                <div class="contact-hero-content" style="text-align: center; max-width: 800px; margin: 0 auto;">
                    <h1 style="font-size: 3rem; font-weight: 800; margin: 0 0 1rem 0; color: var(--heading-color);">
                        Contact Roofing Pros 
                    </h1>
                    <p style="font-size: 1.2rem; color: #8f8f8f; margin: 0 0 2rem 0;">
                        Get in touch for professional roofing services
                    </p>
    </div>
  </div>
</section>

        <section class="contact-content" style="padding: 80px 0; background-color: #ffffff;">
  <div class="container">
                <div class="contact-details" style="max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start;">
                    <div class="contact-info">
                        <h2>Get In Touch</h2>
                        <div class="contact-item" style="margin-bottom: 2rem;">
                            <h3>Phone</h3>
                            <p><a href="tel:8755026291" style="color: var(--button-color); text-decoration: none;">8755026291</a></p>
      </div>
                        <div class="contact-item" style="margin-bottom: 2rem;">
                            <h3>Email</h3>
                            <p><a href="mailto:sudhanshuxmen@gmail.com" style="color: var(--button-color); text-decoration: none;">sudhanshuxmen@gmail.com</a></p>
      </div>
                        
                        <div class="contact-item" style="margin-bottom: 2rem;">
                            <h3>Address</h3>
                            <p>Azolla St Orlando, FL 32808<br>Orlando, Florida 12345</p>
      </div>
                        
                        <div class="contact-item">
                            <h3>Service Area</h3>
                            <p>Orlando and surrounding areas</p>
    </div>
  </div>
                    
                    <div class="contact-form">
                        <h2>Send Us a Message</h2>
                        <?php echo bsg_render_contact_form(); ?>
      </div>
    </div>
  </div>
</section>
    </main>

    <?php include dirname(__FILE__) . '/section-footer.php'; ?>
    <?php wp_footer(); ?>
</body>
</html>
<?php get_footer(); ?>