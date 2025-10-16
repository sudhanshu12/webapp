<?php
/**
 * Template Name: BSG About Us Template
 */

// Get settings safely
$settings = get_option('bsg_settings', array());
$colors = bsg_get_color_scheme();

// Get all section visibility flags
$features_visible = $settings['features_visible'] ?? 1;
$services_visible = $settings['services_visible'] ?? 1;
$locations_visible = $settings['locations_visible'] ?? 1;
$reviews_visible = $settings['reviews_visible'] ?? 1;

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

.about-content h2,
.about-content h3,
.about-content h4 {
    color: #1f2937 !important;
}

.about-content p,
.about-content li {
    color: #4b5563 !important;
    line-height: 1.8 !important;
}

.about-content .tagline {
    color: #14b8a6 !important;
}

/* Features Section Styles */
.features-section {
    background-color: <?php echo esc_attr($settings['features_bg_color'] ?? '#1f2732'); ?> !important;
    padding: 80px 0 !important;
}
.feature-item {
    background-color: <?php echo esc_attr($settings['features_card_bg'] ?? '#ffffff'); ?> !important;
    color: <?php echo esc_attr($settings['features_text_color'] ?? '#333333'); ?> !important;
    padding: 30px 20px !important;
    margin-bottom: 20px !important;
}
.feature-item h3 {
    color: <?php echo esc_attr($settings['features_text_color'] ?? '#333333'); ?> !important;
    margin-top: 15px !important;
    margin-bottom: 10px !important;
}
.feature-item p {
    color: <?php echo esc_attr($settings['features_text_color'] ?? '#666666'); ?> !important;
    margin-bottom: 0 !important;
}
.feature-item svg {
    stroke: <?php echo esc_attr(!empty($settings['features_icon_color']) ? $settings['features_icon_color'] : $colors['button']); ?> !important;
    color: <?php echo esc_attr(!empty($settings['features_icon_color']) ? $settings['features_icon_color'] : $colors['button']); ?> !important;
    margin-bottom: 10px !important;
}
</style>

<main>
    <!-- Hero Section -->
    <section style="background-color: <?php echo isset($settings['about_page_hero_bg_color']) ? esc_attr($settings['about_page_hero_bg_color']) : '#1f2937'; ?>; padding: 80px 20px; color: #ffffff;">
        <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
            <h1 style="font-size: 3rem; font-weight: 800; margin: 0 0 1rem 0; color: <?php echo isset($settings['about_page_hero_heading_color']) ? esc_attr($settings['about_page_hero_heading_color']) : '#ffffff'; ?>;">
                About <?php echo isset($settings['business_name']) ? esc_html($settings['business_name']) : 'Our Company'; ?>
            </h1>
            <p style="font-size: 1.2rem; color: #d1d5db; margin: 0;">
                Your trusted partner for professional services
            </p>
        </div>
    </section>

    <!-- Main About Content with Image and Description Side by Side -->
    <section style="background: <?php echo isset($settings['about_page_who_bg']) ? esc_attr($settings['about_page_who_bg']) : '#ffffff'; ?>; padding: 80px 20px;">
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
                
                <!-- Full Content from wizard -->
                <div class="about-content" style="flex: 1; min-width: 300px; color: <?php echo isset($settings['about_page_who_text']) ? esc_attr($settings['about_page_who_text']) : '#374151'; ?>;">
                    <!-- WHO WE ARE Tagline -->
                    <div style="color: <?php echo isset($settings['about_page_who_tagline_color']) ? esc_attr($settings['about_page_who_tagline_color']) : '#14b8a6'; ?>; font-weight: 700; font-size: 0.95rem; margin-bottom: 1rem; letter-spacing: 1px; text-transform: uppercase;">
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style="display: inline-block; vertical-align: middle; margin-right: 0.5rem;">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <?php echo isset($settings['about_page_who_tagline']) ? esc_html($settings['about_page_who_tagline']) : 'WHO WE ARE'; ?>
                    </div>
                    
                    <h2 style="font-size: 2.75rem; font-weight: 800; margin: 0 0 1.5rem 0; color: <?php echo isset($settings['about_page_who_desc_color']) ? esc_attr($settings['about_page_who_desc_color']) : '#1f2937'; ?>; line-height: 1.2;">
                        About <?php echo isset($settings['business_name']) ? esc_html($settings['business_name']) : 'Our Company'; ?>
                    </h2>
                    
                    <!-- Main About Description -->
                    <div style="font-size: 1.05rem; margin-bottom: 2.5rem; line-height: 1.8;">
                        <?php 
                        // Use the clean about_description text (not the full about_page_who_description with all sections)
                        if (isset($settings['about_description']) && !empty($settings['about_description'])) {
                            echo wp_kses_post($settings['about_description']);
                        } else {
                            echo '<p>We are a premier company dedicated to transforming your space with professional expertise and exceptional service. Our team brings years of experience and a commitment to quality that sets us apart.</p>';
                        }
                        ?>
                    </div>
                    
                    <!-- Experience Badge and CTA Button - Side by Side -->
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

    <!-- Features Section (Why Work With Us?) -->
    <?php if ($features_visible && !empty($settings['features'])): ?>
    <section class="features-section" style="padding: 80px 20px; background-color: <?php echo esc_attr($settings['features_bg_color'] ?? '#1f2732'); ?>;">
        <div class="container" style="max-width: 1200px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: 700; color: <?php echo esc_attr($settings['features_text_color'] ?? '#ffffff'); ?>; margin: 0;">
                    <?php echo esc_html($settings['features_title'] ?? 'Why Work With Us?'); ?>
                </h2>
                <?php if (!empty($settings['features_label'])): ?>
                <p style="color: <?php echo esc_attr($settings['features_text_color'] ?? '#d1d5db'); ?>; margin-top: 0.5rem;">
                    <?php echo esc_html($settings['features_label']); ?>
                </p>
                <?php endif; ?>
            </div>
            <div class="features-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <?php foreach ($settings['features'] as $feature): ?>
                <div class="feature-item" style="background-color: <?php echo esc_attr($settings['features_card_bg'] ?? '#ffffff'); ?>; color: <?php echo esc_attr($settings['features_text_color'] ?? '#333333'); ?>; padding: 2rem; border-radius: 12px; text-align: center;">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="<?php echo esc_attr(!empty($settings['features_icon_color']) ? $settings['features_icon_color'] : $colors['button']); ?>" style="color: <?php echo esc_attr(!empty($settings['features_icon_color']) ? $settings['features_icon_color'] : $colors['button']); ?>; margin: 0 auto 1rem;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <h3 style="color: <?php echo esc_attr($settings['features_text_color'] ?? '#333333'); ?>; margin: 1rem 0 0.5rem; font-size: 1.3rem; font-weight: 700;">
                        <?php echo esc_html($feature['title'] ?? ''); ?>
                    </h3>
                    <p style="color: <?php echo esc_attr($settings['features_text_color'] ?? '#666666'); ?>; margin: 0; line-height: 1.6;">
                        <?php echo esc_html($feature['description'] ?? ''); ?>
                    </p>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <?php endif; ?>

    <!-- Services Section -->
    <?php if ($services_visible): ?>
        <?php include dirname(__FILE__) . '/section-services.php'; ?>
    <?php endif; ?>

    <!-- Service Areas Section -->
    <?php if ($locations_visible): ?>
        <?php include dirname(__FILE__) . '/section-areas.php'; ?>
    <?php endif; ?>

    <!-- Reviews Section -->
    <?php if ($reviews_visible): ?>
        <?php include dirname(__FILE__) . '/section-reviews.php'; ?>
    <?php endif; ?>

    <!-- Commitment Section -->
    <?php include dirname(__FILE__) . '/section-commitment.php'; ?>

    <!-- Contact CTA Section -->
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
