<?php
/**
 * Template Name: BSG About Page
 */

// Get settings safely
$settings = get_option('bsg_settings', array());

get_header();
?>

<style>
    /* Mobile Responsive Styles */
    @media (max-width: 968px) {
        .about-page-wrapper .bsg-who-we-are-grid {
            flex-direction: column !important;
            gap: 2.5rem !important;
        }
        
        .about-page-wrapper .bsg-who-image {
            width: 100% !important;
            max-width: 500px !important;
            height: 450px !important;
            margin: 0 auto !important;
        }
        
        .about-page-wrapper .bsg-who-content {
            text-align: left !important;
        }
        
        .about-page-wrapper .bsg-who-actions {
            flex-wrap: wrap !important;
        }
    }
    
    @media (max-width: 640px) {
        .about-page-wrapper .bsg-who-image {
            height: 380px !important;
        }
        
        .about-page-wrapper .bsg-who-content h2 {
            font-size: 2rem !important;
        }
        
        .about-page-wrapper .bsg-who-actions {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1rem !important;
        }
    }
</style>

<main class="about-page-wrapper">
    <section class="about-hero" style="background-color: #1f2937; padding: 80px 0; color: #ffffff;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
            <div class="about-hero-content" style="text-align: center; max-width: 800px; margin: 0 auto;">
                <h1 style="font-size: 3rem; font-weight: 800; margin: 0 0 1rem 0; color: #ffffff;">
                    About <?php echo isset($settings['business_name']) ? esc_html($settings['business_name']) : 'Our Company'; ?>
                </h1>
                <p style="font-size: 1.2rem; color: #d1d5db; margin: 0 0 2rem 0;">
                    Your trusted partner for professional services
                </p>
            </div>
        </div>
    </section>

    <!-- About Page Section -->
    <section style="background: #ffffff; color: #000000; padding: 5rem 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
            <div class="bsg-who-we-are-grid" style="display: flex; align-items: flex-start; gap: 4rem;">
                <!-- Image -->
                <div class="bsg-who-image" style="flex: 0 0 420px; height: 550px; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
                    <?php if (isset($settings['about_page_team_image']) && !empty($settings['about_page_team_image'])): ?>
                        <img src="<?php echo esc_url($settings['about_page_team_image']); ?>" alt="About Team" style="width: 100%; height: 100%; object-fit: cover;">
                    <?php else: ?>
                        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; font-weight: 600;">
                            Team Photo
                        </div>
                    <?php endif; ?>
                </div>
                
                <!-- Content -->
                <div class="bsg-who-content" style="flex: 1; color: #000000;">
                    <div class="bsg-who-tagline" style="display: flex; align-items: center; gap: 0.5rem; color: #14b8a6; font-weight: 700; font-size: 0.95rem; margin-bottom: 1rem; letter-spacing: 1px; text-transform: uppercase;">
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        WHO WE ARE
                    </div>
                    
                    <h2 style="font-size: 2.75rem; font-weight: 800; margin: 0 0 1.5rem 0; color: #1f2937; line-height: 1.2;">
                        About <?php echo isset($settings['business_name']) ? esc_html($settings['business_name']) : 'Our Company'; ?>
                    </h2>
                    
                    <div class="bsg-who-description" style="font-size: 1.05rem; margin-bottom: 2.5rem; color: #4b5563; line-height: 1.8;">
                        <?php 
                        if (isset($settings['about_description']) && !empty($settings['about_description'])) {
                            echo wp_kses_post($settings['about_description']);
                        } else {
                            echo 'We are a premier company dedicated to transforming your space with professional expertise and exceptional service. Our team brings years of experience and a commitment to quality that sets us apart.';
                        }
                        ?>
                    </div>
                    
                    <!-- Experience Badge and CTA Button - Side by Side -->
                    <div class="bsg-who-actions" style="display: flex; align-items: center; gap: 1.5rem; margin-top: 2rem;">
                        <div class="bsg-experience-badge" style="background: #14b8a6; color: #ffffff; padding: 1.5rem 2rem; border-radius: 8px; text-align: center; min-width: 140px;">
                            <div style="font-size: 2.25rem; font-weight: 800; margin: 0; line-height: 1;">
                                <?php echo isset($settings['about_page_years']) ? esc_html($settings['about_page_years']) : '15+'; ?>
                            </div>
                            <div style="font-size: 0.85rem; margin: 0.5rem 0 0 0; font-weight: 500;">
                                <?php echo isset($settings['about_page_experience_label']) ? esc_html($settings['about_page_experience_label']) : 'Years of Experience'; ?>
                            </div>
                        </div>
                        
                        <a href="<?php echo isset($settings['about_page_cta_link']) ? esc_url($settings['about_page_cta_link']) : '#contact'; ?>" class="bsg-cta-button" style="background: #14b8a6; color: #ffffff; padding: 1rem 2.5rem; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 1rem; transition: all 0.3s ease; display: inline-block;">
                            <?php echo isset($settings['about_page_cta_text']) ? esc_html($settings['about_page_cta_text']) : 'Get Started'; ?>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="contact-section" style="padding: 80px 0; background-color: #1f2937; color: #ffffff;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
            <div class="contact-content" style="text-align: center; max-width: 600px; margin: 0 auto;">
                <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0;">Get In Touch</h2>
                <p style="font-size: 1.1rem; margin: 0 0 2rem 0; color: #d1d5db;">
                    Ready to work with us? Contact us today.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <?php if (isset($settings['phone']) && !empty($settings['phone'])): ?>
                    <a href="tel:<?php echo esc_attr($settings['phone']); ?>" class="btn btn-primary" style="background: #f59e0b; color: #ffffff; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                        Call: <?php echo esc_html($settings['phone']); ?>
                    </a>
                    <?php endif; ?>
                    
                    <?php if (isset($settings['email']) && !empty($settings['email'])): ?>
                    <a href="mailto:<?php echo esc_attr($settings['email']); ?>" class="btn btn-secondary" style="background: transparent; color: #f59e0b; border: 2px solid #f59e0b; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                        Email Us
                    </a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
