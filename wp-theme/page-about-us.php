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
    <!-- Hero Section with Image, Heading, Button -->
    <section class="hero-section" style="<?php if (!empty($settings['hero_bg_image'])): ?>background-image: linear-gradient(to left, transparent 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.7) 80%, rgba(255,255,255,3) 100%), url('<?php echo esc_url($settings['hero_bg_image']); ?>'); background-size: cover; background-position: center; background-attachment: scroll; background-repeat: no-repeat;<?php else: ?>background-color: <?php echo esc_attr($settings['hero_bg_color'] ?? '#f5f5f5'); ?>;<?php endif; ?> padding: 120px 20px;">
        <div class="container" style="max-width: 1200px; margin: 0 auto;">
            <div class="hero-content" style="max-width: 600px;">
                <h1 style="color: <?php echo esc_attr($settings['hero_heading_color'] ?? '#000000'); ?>; font-size: 3.5rem; font-weight: 800; margin: 0 0 2rem 0; line-height: 1.2;">
                    About <?php echo isset($settings['business_name']) ? esc_html($settings['business_name']) : 'Our Company'; ?>
                </h1>
                <a href="tel:<?php echo esc_attr($settings['phone'] ?? ''); ?>" style="background: <?php echo esc_attr($settings['hero_book_btn_bg'] ?? '#14b8a6'); ?>; color: <?php echo esc_attr($settings['hero_book_btn_text'] ?? '#ffffff'); ?>; padding: 1rem 2.5rem; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 1.1rem; display: inline-block;">
                    Call us Today
                </a>
            </div>
        </div>
    </section>

    <!-- About Description with Image Side by Side -->
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
                
                <!-- Content -->
                <div class="about-content" style="flex: 1; min-width: 300px; color: <?php echo isset($settings['about_page_who_text']) ? esc_attr($settings['about_page_who_text']) : '#374151'; ?>;">
                    <div style="color: <?php echo isset($settings['about_page_who_tagline_color']) ? esc_attr($settings['about_page_who_tagline_color']) : '#14b8a6'; ?>; font-weight: 700; font-size: 0.95rem; margin-bottom: 1rem; letter-spacing: 1px; text-transform: uppercase;">
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style="display: inline-block; vertical-align: middle; margin-right: 0.5rem;">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <?php echo isset($settings['about_page_who_tagline']) ? esc_html($settings['about_page_who_tagline']) : 'WHO WE ARE'; ?>
                    </div>
                    
                    <h2 style="font-size: 2.75rem; font-weight: 800; margin: 0 0 1.5rem 0; color: <?php echo isset($settings['about_page_who_desc_color']) ? esc_attr($settings['about_page_who_desc_color']) : '#1f2937'; ?>; line-height: 1.2;">
                        About <?php echo isset($settings['business_name']) ? esc_html($settings['business_name']) : 'Our Company'; ?>
                    </h2>
                    
                    <div style="font-size: 1.05rem; margin-bottom: 2.5rem; line-height: 1.8;">
                        <?php 
                        if (isset($settings['about_description']) && !empty($settings['about_description'])) {
                            echo wp_kses_post($settings['about_description']);
                        } else {
                            echo '<p>We are a premier company dedicated to transforming your space with professional expertise and exceptional service. Our team brings years of experience and a commitment to quality that sets us apart.</p>';
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

    <!-- Why Work With Us? (Features) -->
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

    <!-- Reviews Section -->
    <?php if ($reviews_visible): ?>
        <?php include dirname(__FILE__) . '/section-reviews.php'; ?>
    <?php endif; ?>

    <!-- Services Section -->
    <?php if ($services_visible): ?>
        <?php include dirname(__FILE__) . '/section-services.php'; ?>
    <?php endif; ?>

    <!-- Service Areas Section -->
    <?php if ($locations_visible): ?>
        <?php include dirname(__FILE__) . '/section-areas.php'; ?>
    <?php endif; ?>

    <!-- Commitment Section -->
    <?php include dirname(__FILE__) . '/section-commitment.php'; ?>

    <!-- Contact Form Section -->
    <section style="padding: 80px 20px; background-color: #ffffff;">
        <div style="max-width: 800px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: 700; color: #1f2937; margin: 0 0 1rem 0;">Get In Touch</h2>
                <p style="font-size: 1.1rem; color: #6b7280; margin: 0;">
                    Ready to work with us? Contact <?php echo isset($settings['business_name']) ? esc_html($settings['business_name']) : 'us'; ?> today.
                </p>
            </div>
            
            <form action="<?php echo esc_url(admin_url('admin-post.php')); ?>" method="POST" style="background: #f9fafb; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <input type="hidden" name="action" value="contact_form_submit">
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div>
                        <label for="name" style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Name *</label>
                        <input type="text" id="name" name="name" required style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem; transition: border-color 0.3s;">
                    </div>
                    <div>
                        <label for="email" style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Email *</label>
                        <input type="email" id="email" name="email" required style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem; transition: border-color 0.3s;">
                    </div>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label for="phone" style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Phone</label>
                    <input type="tel" id="phone" name="phone" style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem; transition: border-color 0.3s;">
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label for="message" style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Message *</label>
                    <textarea id="message" name="message" required rows="6" style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem; resize: vertical; transition: border-color 0.3s;"></textarea>
                </div>
                
                <div style="text-align: center;">
                    <button type="submit" style="background: <?php echo esc_attr($settings['button_primary_color'] ?? '#f59e0b'); ?>; color: #ffffff; padding: 1rem 3rem; border: none; border-radius: 8px; font-weight: 700; font-size: 1.1rem; cursor: pointer; transition: all 0.3s ease;">
                        Send Message
                    </button>
                </div>
            </form>
            
            <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem; flex-wrap: wrap;">
                <?php if (isset($settings['phone']) && !empty($settings['phone'])): ?>
                    <a href="tel:<?php echo esc_attr($settings['phone']); ?>" style="background: #f59e0b; color: #ffffff; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem;">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        Call: <?php echo esc_html($settings['phone']); ?>
                    </a>
                <?php endif; ?>
                
                <?php if (isset($settings['email']) && !empty($settings['email'])): ?>
                    <a href="mailto:<?php echo esc_attr($settings['email']); ?>" style="background: transparent; color: #f59e0b; border: 2px solid #f59e0b; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem;">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                        Email Us
                    </a>
                <?php endif; ?>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
