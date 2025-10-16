<?php
/**
 * Template Name: BSG About Us Template
 * Description: About Us page with dynamic content and sections.
 */

// Get settings before header
$settings = bsg_get_settings();
$business_name = $settings['business_name'] ?? 'Our Company';
$phone = $settings['phone'] ?? '';

// Add styles to wp_head BEFORE get_header()
function bsg_about_page_styles() {
    global $settings;
?>
<style>
    /* Hero Section */
    .about-hero-section {
        padding: 90px 0 !important;
        min-height: 60vh;
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
    }
    .about-hero-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        color: #ffffff;
    }
    .about-hero-content h1 {
        font-size: 3rem;
        font-weight: 800;
        margin-bottom: 1.5rem;
        line-height: 1.2;
        color: <?php echo esc_attr($settings['hero_heading_color'] ?? '#000000'); ?>;
    }
    .about-hero-content .btn {
        background: <?php echo esc_attr($settings['button_primary_color'] ?? '#f59e0b'); ?>;
        color: #ffffff;
        padding: 1rem 2rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 700;
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        transition: background 0.3s ease;
    }

    /* About Content Section */
    .about-grid {
        display: flex;
        gap: 4rem;
        align-items: flex-start;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }
    .about-image-wrapper {
        flex: 0 0 420px;
        min-width: 300px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }
    .about-image-wrapper img {
        width: 100%;
        height: 550px;
        object-fit: cover;
    }
    .about-content-text {
        flex: 1;
        min-width: 300px;
        padding-top: 1rem;
    }
    .about-content-text .tagline {
        color: <?php echo esc_attr($settings['about_page_who_tagline_color'] ?? '#14b8a6'); ?>;
        font-weight: 700;
        font-size: 0.95rem;
        margin-bottom: 1rem;
        letter-spacing: 1px;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .about-content-text h2 {
        font-size: 2.25rem;
        font-weight: 800;
        margin: 0 0 1.5rem 0;
        color: <?php echo esc_attr($settings['about_page_who_desc_color'] ?? '#1f2937'); ?>;
        line-height: 1.2;
    }
    .about-content-text p {
        font-size: 1.05rem;
        margin-bottom: 1.5rem;
        line-height: 1.8;
        color: <?php echo esc_attr($settings['about_page_who_desc_color'] ?? '#4b5563'); ?>;
    }
    
    /* Rich content sections */
    .about-content-text h3 {
        font-size: 1.5rem;
        font-weight: 600;
        color: <?php echo esc_attr($settings['about_page_who_desc_color'] ?? '#2c3e50'); ?>;
        margin: 2rem 0 1rem 0;
        border-left: 4px solid <?php echo esc_attr($settings['about_page_who_tagline_color'] ?? '#4ecdc4'); ?>;
        padding-left: 1rem;
    }
    .about-content-text ul {
        margin: 1rem 0;
        padding-left: 1.5rem;
        color: <?php echo esc_attr($settings['about_page_who_desc_color'] ?? '#34495e'); ?>;
    }
    .about-content-text ul li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
    }
    
    .about-actions {
        display: flex;
        gap: 1.5rem;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 2rem;
    }
    .experience-badge {
        background: <?php echo esc_attr($settings['about_page_experience_bg'] ?? '#14b8a6'); ?>;
        color: <?php echo esc_attr($settings['about_page_experience_text'] ?? '#ffffff'); ?>;
        padding: 1.5rem 2rem;
        border-radius: 8px;
        text-align: center;
        min-width: 140px;
    }
    .experience-badge div:first-child {
        font-size: 2.25rem;
        font-weight: 800;
        line-height: 1;
    }
    .experience-badge div:last-child {
        font-size: 0.85rem;
        font-weight: 500;
        margin-top: 0.5rem;
    }
    .cta-button {
        background: <?php echo esc_attr($settings['about_page_cta_bg'] ?? '#14b8a6'); ?>;
        color: <?php echo esc_attr($settings['about_page_cta_text_color'] ?? '#ffffff'); ?>;
        padding: 1rem 2.5rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 700;
        font-size: 1rem;
        display: inline-block;
        transition: all 0.3s ease;
    }

    /* Why Work With Us */
    .why-section {
        padding: 80px 20px;
        background: <?php echo esc_attr($settings['features_bg_color'] ?? '#1e3a8a'); ?>;
    }
    .why-section h2 {
        color: #ffffff;
        font-size: 2.5rem;
        font-weight: 800;
        text-align: center;
        margin-bottom: 1rem;
    }
    .why-section .subtitle {
        color: #ffffff;
        font-size: 1.1rem;
        text-align: center;
        margin-bottom: 4rem;
    }
    .benefits-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 3rem;
        max-width: 1200px;
        margin: 0 auto;
    }
    .benefit-item {
        text-align: center;
        padding: 2rem;
    }
    .benefit-item .icon {
        width: 80px;
        height: 80px;
        background: <?php echo esc_attr($settings['features_icon_color'] ?? '#3b82f6'); ?>;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
        border: 2px solid rgba(255, 255, 255, 0.3);
    }
    .benefit-item h3 {
        color: #ffffff;
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 0.75rem;
    }
    .benefit-item p {
        color: #ffffff;
        line-height: 1.6;
        margin: 0;
    }

    /* Contact Section */
    .contact-section {
        padding: 80px 20px;
        background-color: #1f2937;
        color: #ffffff;
        text-align: center;
    }
    .contact-section h2 {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0 0 1rem 0;
    }
    .contact-section p {
        font-size: 1.1rem;
        margin: 0 0 2rem 0;
        color: #d1d5db;
    }
    .contact-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }
    .contact-buttons a {
        padding: 1rem 2rem;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    .btn-primary {
        background: <?php echo esc_attr($settings['button_primary_color'] ?? '#f59e0b'); ?>;
        color: #ffffff;
    }
    .btn-secondary {
        background: transparent;
        color: <?php echo esc_attr($settings['button_primary_color'] ?? '#f59e0b'); ?>;
        border: 2px solid <?php echo esc_attr($settings['button_primary_color'] ?? '#f59e0b'); ?>;
    }

    @media (max-width: 768px) {
        .about-grid {
            flex-direction: column;
            gap: 2rem;
        }
        .about-image-wrapper {
            flex: none;
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
        }
        .about-hero-content h1 {
            font-size: 2rem;
        }
        .benefits-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
    }
</style>
<?php
}
add_action('wp_head', 'bsg_about_page_styles', 20);

get_header();
?>

<main>
    <!-- Hero Section -->
    <section class="about-hero-section" style="<?php if (!empty($settings['hero_bg_image'])): ?>background-image: linear-gradient(to left, transparent 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.7) 80%, rgba(255,255,255,0.95) 100%), url('<?php echo esc_url($settings['hero_bg_image']); ?>');<?php else: ?>background-color: <?php echo esc_attr($settings['hero_bg_color'] ?? '#1f2937'); ?>;<?php endif; ?>">
        <div class="about-hero-content">
            <h1>About <?php echo esc_html($business_name); ?></h1>
            <a href="tel:<?php echo esc_attr($phone); ?>" class="btn">
                <i class="fa-solid fa-phone"></i> Call us Today
            </a>
        </div>
    </section>

    <!-- About Content Section with Image Side by Side -->
    <section style="background: <?php echo esc_attr($settings['about_page_who_bg'] ?? '#ffffff'); ?>; padding: 80px 20px;">
        <div class="about-grid">
            <!-- Image on Left -->
            <div class="about-image-wrapper">
                <?php if (isset($settings['about_page_team_image']) && !empty($settings['about_page_team_image'])): ?>
                    <img src="<?php echo esc_url($settings['about_page_team_image']); ?>" alt="About <?php echo esc_attr($business_name); ?>" loading="lazy" decoding="async">
                <?php else: ?>
                    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; font-weight: 600;">
                        Team Photo
                    </div>
                <?php endif; ?>
            </div>
            
            <!-- Content on Right -->
            <div class="about-content-text">
                <p class="tagline">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <?php echo esc_html($settings['about_page_who_tagline'] ?? 'WHO WE ARE'); ?>
                </p>
                <h2>About <?php echo esc_html($business_name); ?></h2>
                
                <div class="about-description-content">
                <?php 
                // Display the about page description from wizard with HTML formatting preserved
                $about_page_description = $settings['about_page_who_description'] ?? '';
                
                if (!empty($about_page_description)) {
                    // Use wp_kses_post to allow safe HTML rendering
                    echo wp_kses_post($about_page_description);
                } else {
                    // Fallback content
                    echo '<p>We are a premier company dedicated to transforming your space with professional expertise and exceptional service. Our team brings years of experience and a commitment to quality that sets us apart.</p>';
                }
                ?>
                </div>
                
                <div class="about-actions">
                    <div class="experience-badge">
                        <div><?php echo esc_html($settings['about_page_years'] ?? '15+'); ?></div>
                        <div><?php echo esc_html($settings['about_page_experience_label'] ?? 'Years of Experience'); ?></div>
                    </div>
                    <a href="<?php echo esc_url($settings['about_page_cta_link'] ?? '#contact'); ?>" class="cta-button">
                        <?php echo esc_html($settings['about_page_cta_text'] ?? 'Get Started'); ?>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Work With Us? (Features Section) -->
    <?php if (!empty($settings['features']) && ($settings['features_visible'] ?? 1)): ?>
    <section class="why-section">
        <div class="container" style="max-width: 1200px; margin: 0 auto;">
            <h2><?php echo esc_html($settings['features_title'] ?? 'Why Work With Us?'); ?></h2>
            <p class="subtitle"><?php echo esc_html($settings['features_label'] ?? 'Benefits of Working with an Expert Team'); ?></p>
            
            <div class="benefits-grid">
                <?php foreach ($settings['features'] as $feature): ?>
                <div class="benefit-item">
                    <div class="icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2">
                            <path d="M9 11l3 3L22 4"/>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                        </svg>
                    </div>
                    <h3><?php echo esc_html($feature['title'] ?? ''); ?></h3>
                    <p><?php echo esc_html($feature['description'] ?? ''); ?></p>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <?php endif; ?>

    <!-- Reviews Section -->
    <?php if ($settings['reviews_visible'] ?? 1): ?>
        <?php include dirname(__FILE__) . '/section-reviews.php'; ?>
    <?php endif; ?>

    <!-- Services Section -->
    <?php if ($settings['services_visible'] ?? 1): ?>
        <?php include dirname(__FILE__) . '/section-services.php'; ?>
    <?php endif; ?>

    <!-- Service Areas Section -->
    <?php if ($settings['locations_visible'] ?? 1): ?>
        <?php include dirname(__FILE__) . '/section-areas.php'; ?>
    <?php endif; ?>

    <!-- Commitment Section -->
    <?php if ($settings['commitment_visible'] ?? 1): ?>
        <?php include dirname(__FILE__) . '/section-commitment.php'; ?>
    <?php endif; ?>

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
        <div class="container" style="max-width: 600px; margin: 0 auto;">
            <h2>Get In Touch</h2>
            <p>Ready to work with us? Contact <?php echo esc_html($business_name); ?> today.</p>
            <div class="contact-buttons">
                <?php if (!empty($phone)): ?>
                <a href="tel:<?php echo esc_attr($phone); ?>" class="btn-primary">
                    Call: <?php echo esc_html($phone); ?>
                </a>
                <?php endif; ?>
                
                <?php if (!empty($settings['email'])): ?>
                <a href="mailto:<?php echo esc_attr($settings['email']); ?>" class="btn-secondary">
                    Email Us
                </a>
                <?php endif; ?>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
