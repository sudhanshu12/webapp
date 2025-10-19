<?php
/**
 * Template Name: BSG FAQ Page
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
    <?php bsg_output_meta_tags('faq'); ?>
    <?php bsg_output_structured_data('faq'); ?>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php include dirname(__FILE__) . '/section-header.php'; ?>

    <main>
        <section class="faq-hero" style="background-color: var(--surface-color); padding: 80px 0; color: #ffffff;">
            <div class="container">
                <div class="faq-hero-content" style="text-align: center; max-width: 800px; margin: 0 auto;">
                    <h1 style="font-size: 3rem; font-weight: 800; margin: 0 0 1rem 0; color: var(--heading-color);">
                        Frequently Asked Questions
                    </h1>
                    <p style="font-size: 1.2rem; color: #8f8f8f; margin: 0 0 2rem 0;">
                        Common questions about Roofing Pros  services
                    </p>
    </div>
  </div>
</section>

        <section class="faq-content" style="padding: 80px 0; background-color: #ffffff;">
  <div class="container">
                <div class="faq-details" style="max-width: 800px; margin: 0 auto;">
                    <div class="faq-list">
                        
                        <div class="faq-item" style="margin-bottom: 2rem; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                            <div class="faq-question" style="background: #f8f9fa; padding: 1.5rem; cursor: pointer; border-bottom: 1px solid #e0e0e0;">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">How long does a typical Roofing project take?</h3>
    </div>
                            <div class="faq-answer" style="padding: 1.5rem; background: #ffffff;">
                                <p style="margin: 0; line-height: 1.6; color: #666;">Most roofing projects in Orlando take between 1 to 3 days, depending on the size and complexity. We will assess your specific needs during the consultation and provide a detailed timeline for your project.</p>
                                    </div>
                                </div>
                        
                        <div class="faq-item" style="margin-bottom: 2rem; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                            <div class="faq-question" style="background: #f8f9fa; padding: 1.5rem; cursor: pointer; border-bottom: 1px solid #e0e0e0;">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Do you offer emergency Roofing services?</h3>
    </div>
                            <div class="faq-answer" style="padding: 1.5rem; background: #ffffff;">
                                <p style="margin: 0; line-height: 1.6; color: #666;">Yes, Roofing Pros offers 24/7 emergency roofing services to address urgent issues like leaks or storm damage. Simply call us anytime, and our team will be ready to assist you promptly and effectively.</p>
                                    </div>
                                </div>
                        
                        <div class="faq-item" style="margin-bottom: 2rem; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                            <div class="faq-question" style="background: #f8f9fa; padding: 1.5rem; cursor: pointer; border-bottom: 1px solid #e0e0e0;">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">What areas do you serve in Orlando?</h3>
    </div>
                            <div class="faq-answer" style="padding: 1.5rem; background: #ffffff;">
                                <p style="margin: 0; line-height: 1.6; color: #666;">We proudly serve Orlando and its surrounding communities, including Winter Park, Altamonte Springs, and Kissimmee. Feel free to reach out to confirm if we cover your specific area for roofing services.</p>
                                    </div>
                                </div>
                        
                        <div class="faq-item" style="margin-bottom: 2rem; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                            <div class="faq-question" style="background: #f8f9fa; padding: 1.5rem; cursor: pointer; border-bottom: 1px solid #e0e0e0;">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Do you provide free estimates?</h3>
    </div>
                            <div class="faq-answer" style="padding: 1.5rem; background: #ffffff;">
                                <p style="margin: 0; line-height: 1.6; color: #666;">Absolutely! We offer free, no-obligation estimates for all roofing projects in Orlando. Our team will conduct a thorough assessment and provide you with a detailed quote to help you make an informed decision.</p>
                                    </div>
                                </div>
                        
                        <div class="faq-item" style="margin-bottom: 2rem; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                            <div class="faq-question" style="background: #f8f9fa; padding: 1.5rem; cursor: pointer; border-bottom: 1px solid #e0e0e0;">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">What warranty do you provide on your work?</h3>
    </div>
                            <div class="faq-answer" style="padding: 1.5rem; background: #ffffff;">
                                <p style="margin: 0; line-height: 1.6; color: #666;">We stand behind our work with comprehensive warranty coverage on all roofing services. The details of our warranty will be outlined in your estimate, ensuring you have peace of mind regarding the quality of our craftsmanship.</p>
                                    </div>
                                </div>
                        
                        <div class="faq-item" style="margin-bottom: 2rem; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                            <div class="faq-question" style="background: #f8f9fa; padding: 1.5rem; cursor: pointer; border-bottom: 1px solid #e0e0e0;">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">How do I schedule a consultation?</h3>
    </div>
                            <div class="faq-answer" style="padding: 1.5rem; background: #ffffff;">
                                <p style="margin: 0; line-height: 1.6; color: #666;">Scheduling a consultation is easy! You can call us directly at 8755026291 or fill out our online contact form. We aim to respond within 24 hours to discuss your roofing needs and set up an appointment.</p>
                                    </div>
                                </div>
                        
        </div>
    </div>
  </div>
</section>

        <section class="contact-section" style="padding: 80px 0; background-color: var(--surface-color); color: #ffffff;">
            <div class="container">
                <div class="contact-content" style="text-align: center; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0;">Still Have Questions?</h2>
                    <p style="font-size: 1.1rem; margin: 0 0 2rem 0; color: #8f8f8f;">
                        Contact Roofing Pros  for personalized answers to your questions.
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="tel:8755026291" class="btn btn-primary" style="background: var(--button-color); color: #ffffff; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                            Call: 8755026291
                        </a>
                        <a href="mailto:sudhanshuxmen@gmail.com" class="btn btn-secondary" style="background: transparent; color: var(--button-color); border: 2px solid var(--button-color); padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                            Email Us
                        </a>
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