<?php
/**
 * Template Name: BSG About Page
 */

get_header();

$colors = bsg_get_color_scheme();
$settings = bsg_get_settings();
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php bsg_output_meta_tags('about'); ?>
    <?php bsg_output_structured_data('about'); ?>
    <style>
        /* Mobile Responsive Styles */
        @media (max-width: 968px) {
            .bsg-who-we-are {
                flex-direction: column !important;
                gap: 2.5rem !important;
            }
            
            .bsg-who-image {
                flex: 0 0 auto !important;
                width: 100% !important;
                max-width: 500px !important;
                height: 450px !important;
                margin: 0 auto !important;
            }
            
            .bsg-who-content {
                text-align: left !important;
            }
            
            .bsg-who-actions {
                flex-wrap: wrap !important;
            }
        }
        
        @media (max-width: 640px) {
            .bsg-who-image {
                height: 380px !important;
            }
            
            .bsg-who-content h2 {
                font-size: 2rem !important;
            }
            
            .bsg-who-actions {
                flex-direction: column !important;
                align-items: flex-start !important;
                gap: 1rem !important;
            }
            
            .bsg-experience-badge,
            .bsg-cta-button {
                width: 100% !important;
                text-align: center !important;
            }
        }
    </style>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php include dirname(__FILE__) . '/section-header.php'; ?>

    <main>
        <section class="about-hero" style="background-color: var(--surface-color); padding: 80px 0; color: #ffffff;">
            <div class="container">
                <div class="about-hero-content" style="text-align: center; max-width: 800px; margin: 0 auto;">
                    <h1 style="font-size: 3rem; font-weight: 800; margin: 0 0 1rem 0; color: var(--heading-color);">
                        About Roofing Pros 
                    </h1>
                    <p style="font-size: 1.2rem; color: #8f8f8f; margin: 0 0 2rem 0;">
                        Your trusted partner for professional roofing services
                    </p>
                </div>
            </div>
        </section>

        <!-- About Page Section -->
        <section class="bsg-who-we-are animate-on-scroll-section" style="background: <?php echo esc_attr($settings['about_page_who_bg'] ?? '#ffffff'); ?>; color: <?php echo esc_attr($settings['about_page_who_text'] ?? '#000000'); ?>; padding: 5rem 0;">
            <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                <div class="bsg-who-we-are" style="display: flex; align-items: flex-start; gap: 4rem;">
                    <!-- Image -->
                    <div class="bsg-who-image" style="flex: 0 0 420px; height: 550px; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
                        <?php if (!empty($settings['about_page_team_image'])): ?>
                            <img src="<?php echo esc_url($settings['about_page_team_image']); ?>" alt="About <?php echo esc_attr($settings['business_name'] ?? 'Our Team'); ?>" style="width: 100%; height: 100%; object-fit: cover;">
                        <?php else: ?>
                            <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; font-weight: 600;">
                                Team Photo
                            </div>
                        <?php endif; ?>
                    </div>
                    
                    <!-- Content -->
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
                            // Get the description from the wizard's about page section
                            $wizard_description = $settings['about_page_who_description'] ?? '';
                            
                            if (!empty($wizard_description)) {
                                // Extract just the text from the "WHO WE ARE" section
                                // Look for the about-who-we-are div and extract its main paragraph
                                if (preg_match('/<div class="about-who-we-are"[^>]*>.*?<h2[^>]*>About Us<\/h2>\s*<div[^>]*>(.*?)<\/div>/s', $wizard_description, $matches)) {
                                    echo wp_kses_post(trim($matches[1]));
                                } else {
                                    // Fallback: display from settings or use default
                                    $about_text = $settings['about_description'] ?? '';
                                    if (!empty($about_text)) {
                                        echo wp_kses_post($about_text);
                                    } else {
                                        echo esc_html('We are a premier company dedicated to transforming your space with professional expertise and exceptional service. Our team brings years of experience and a commitment to quality that sets us apart.');
                                    }
                                }
                            } else {
                                // Use about_description from settings as fallback
                                $about_text = $settings['about_description'] ?? '';
                                if (!empty($about_text)) {
                                    echo wp_kses_post($about_text);
                                } else {
                                    echo esc_html('We are a premier company dedicated to transforming your space with professional expertise and exceptional service. Our team brings years of experience and a commitment to quality that sets us apart.');
                                }
                            }
                            ?>
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

        <section class="contact-section" style="padding: 80px 0; background-color: var(--surface-color); color: #ffffff;">
            <div class="container">
                <div class="contact-content" style="text-align: center; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0;">Get In Touch</h2>
                    <p style="font-size: 1.1rem; margin: 0 0 2rem 0; color: #8f8f8f;">
                        Ready to work with us? Contact Roofing Pros  today.
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