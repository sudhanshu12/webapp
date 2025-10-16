<?php
/**
 * Template Name: BSG About Us Template
 */

// Get settings safely
$settings = get_option('bsg_settings', array());

get_header();
?>

<style>
@media (max-width: 968px) {
    .about-grid {
        flex-direction: column !important;
    }
    .about-grid > div:first-child {
        flex: 1 !important;
        max-width: 500px !important;
        margin: 0 auto !important;
    }
}
</style>

<main>
    <section style="background-color: #1f2937; padding: 80px 20px; color: #ffffff;">
        <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
            <h1 style="font-size: 3rem; font-weight: 800; margin: 0 0 1rem 0; color: #ffffff;">
                About <?php echo isset($settings['business_name']) ? esc_html($settings['business_name']) : 'Our Company'; ?>
            </h1>
            <p style="font-size: 1.2rem; color: #d1d5db; margin: 0;">
                Your trusted partner for professional services
            </p>
        </div>
    </section>

    <section style="background: #ffffff; padding: 80px 20px;">
        <div style="max-width: 1200px; margin: 0 auto;">
            <div class="about-grid" style="display: flex; gap: 4rem; align-items: flex-start;">
                <!-- Image -->
                <div style="flex: 0 0 420px; min-width: 300px;">
                    <?php if (isset($settings['about_page_team_image']) && !empty($settings['about_page_team_image'])): ?>
                        <img src="<?php echo esc_url($settings['about_page_team_image']); ?>" alt="About <?php echo isset($settings['business_name']) ? esc_attr($settings['business_name']) : 'Our Team'; ?>" style="width: 100%; height: 550px; object-fit: cover; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
                    <?php else: ?>
                        <div style="width: 100%; height: 550px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; font-weight: 600;">
                            Team Photo
                        </div>
                    <?php endif; ?>
                </div>
                
                <!-- Content -->
                <div style="flex: 1; min-width: 300px;">
                    <div style="color: <?php echo isset($settings['about_page_who_tagline_color']) ? esc_attr($settings['about_page_who_tagline_color']) : '#14b8a6'; ?>; font-weight: 700; font-size: 0.95rem; margin-bottom: 1rem; letter-spacing: 1px; text-transform: uppercase;">
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style="display: inline-block; vertical-align: middle; margin-right: 0.5rem;">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <?php echo isset($settings['about_page_who_tagline']) ? esc_html($settings['about_page_who_tagline']) : 'WHO WE ARE'; ?>
                    </div>
                    
                    <h2 style="font-size: 2.75rem; font-weight: 800; margin: 0 0 1.5rem 0; color: <?php echo isset($settings['about_page_who_desc_color']) ? esc_attr($settings['about_page_who_desc_color']) : '#1f2937'; ?>; line-height: 1.2;">
                        About <?php echo isset($settings['business_name']) ? esc_html($settings['business_name']) : 'Our Company'; ?>
                    </h2>
                    
                    <div style="font-size: 1.05rem; margin-bottom: 2.5rem; color: <?php echo isset($settings['about_page_who_desc_color']) ? esc_attr($settings['about_page_who_desc_color']) : '#4b5563'; ?>; line-height: 1.8;">
                        <?php 
                        // Use about_description from settings
                        if (isset($settings['about_description']) && !empty($settings['about_description'])) {
                            echo wp_kses_post($settings['about_description']);
                        } else {
                            echo 'We are a premier company dedicated to transforming your space with professional expertise and exceptional service. Our team brings years of experience and a commitment to quality that sets us apart.';
                        }
                        ?>
                    </div>
                    
                    <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap; margin-top: 2rem;">
                        <div style="background: <?php echo isset($settings['about_page_experience_bg']) ? esc_attr($settings['about_page_experience_bg']) : '#14b8a6'; ?>; color: <?php echo isset($settings['about_page_experience_text']) ? esc_attr($settings['about_page_experience_text']) : '#ffffff'; ?>; padding: 1.5rem 2rem; border-radius: 8px; text-align: center; min-width: 140px;">
                            <div style="font-size: 2.25rem; font-weight: 800; margin: 0; line-height: 1;">
                                <?php echo isset($settings['about_page_years']) ? esc_html($settings['about_page_years']) : '15+'; ?>
                            </div>
                            <div style="font-size: 0.85rem; margin: 0.5rem 0 0 0; font-weight: 500;">
                                <?php echo isset($settings['about_page_experience_label']) ? esc_html($settings['about_page_experience_label']) : 'Years of Experience'; ?>
                            </div>
                        </div>
                        
                        <a href="<?php echo isset($settings['about_page_cta_link']) ? esc_url($settings['about_page_cta_link']) : '#contact'; ?>" style="background: <?php echo isset($settings['about_page_cta_bg']) ? esc_attr($settings['about_page_cta_bg']) : '#14b8a6'; ?>; color: <?php echo isset($settings['about_page_cta_text_color']) ? esc_attr($settings['about_page_cta_text_color']) : '#ffffff'; ?>; padding: 1rem 2.5rem; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 1rem; display: inline-block;">
                            <?php echo isset($settings['about_page_cta_text']) ? esc_html($settings['about_page_cta_text']) : 'Get Started'; ?>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section style="padding: 80px 20px; background-color: #1f2937; color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; text-align: center;">
            <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0;">Get In Touch</h2>
            <p style="font-size: 1.1rem; margin: 0 0 2rem 0; color: #d1d5db;">
                Ready to work with us? Contact <?php echo isset($settings['business_name']) ? esc_html($settings['business_name']) : 'us'; ?> today.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <?php if (isset($settings['phone']) && !empty($settings['phone'])): ?>
                    <a href="tel:<?php echo esc_attr($settings['phone']); ?>" style="background: #f59e0b; color: #ffffff; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                        Call: <?php echo esc_html($settings['phone']); ?>
                    </a>
                <?php endif; ?>
                
                <?php if (isset($settings['email']) && !empty($settings['email'])): ?>
                    <a href="mailto:<?php echo esc_attr($settings['email']); ?>" style="background: transparent; color: #f59e0b; border: 2px solid #f59e0b; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                        Email Us
                    </a>
                <?php endif; ?>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
