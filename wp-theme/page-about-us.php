<?php
/**
 * Template Name: BSG About Us Template
 */

get_header();

$colors = bsg_get_color_scheme();
$settings = bsg_get_settings();

// Get section visibility
$features_visible = $settings['features_visible'] ?? 1;
$services_visible = $settings['services_visible'] ?? 1;
$locations_visible = $settings['locations_visible'] ?? 1;
$reviews_visible = $settings['reviews_visible'] ?? 1;
?>

<style>
/* Desktop Centering Styles */
.bsg-who-content {
    text-align: center !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
}

.bsg-who-description {
    text-align: center !important;
    margin: 0 auto 2rem auto !important;
    width: 100% !important;
}

.bsg-who-tagline {
    text-align: center !important;
    justify-content: center !important;
}

.bsg-who-actions {
    text-align: center !important;
    justify-content: center !important;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
    .bsg-who-we-are {
        flex-direction: column !important;
        gap: 2rem !important;
        justify-content: center !important;
        text-align: center !important;
    }
    
    .bsg-who-content {
        text-align: center !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
    }
    
    .bsg-who-description {
        text-align: center !important;
        margin: 0 auto 2rem auto !important;
    }
    
    .bsg-who-tagline {
        justify-content: center !important;
    }
    
    .bsg-who-actions {
        justify-content: center !important;
    }
    
    .benefit-item {
        padding: 1.5rem !important;
    }
    
    .why-work-with-us .container > div:last-child {
        grid-template-columns: 1fr !important;
        gap: 2rem !important;
    }
    
    .why-work-with-us .container > div:last-child > div {
        grid-template-columns: 1fr !important;
        gap: 2rem !important;
        justify-items: center !important;
    }
}

/* Animation */
.animate-on-scroll-section {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1.2s ease-out, transform 1.2s ease-out;
}

.animate-on-scroll-section.animated {
    opacity: 1;
    transform: translateY(0);
}
</style>

<main>
    <!-- Hero Section -->
    <section class="hero-section" style="<?php if (!empty($settings['hero_bg_image'])): ?>background-image: linear-gradient(to left, transparent 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.7) 80%, rgba(255,255,255,0.95) 100%), url('<?php echo esc_url($settings['hero_bg_image']); ?>'); background-size: cover; background-position: center;<?php else: ?>background-color: <?php echo esc_attr($settings['hero_bg_color'] ?? '#f5f5f5'); ?>;<?php endif; ?> padding: 90px 60px;">
        <div class="container" style="max-width: 1200px; margin: 0 auto;">
            <div class="hero-content">
                <h1 style="color: <?php echo esc_attr($settings['hero_heading_color'] ?? '#000000'); ?>; font-size: 3.2rem; font-weight: 800; margin: 0 0 24px 0; line-height: 1.2; max-width: 600px;">
                    About <?php echo esc_html($settings['business_name'] ?? 'Our Company'); ?>
                </h1>
                <a href="tel:<?php echo esc_attr($settings['phone'] ?? ''); ?>" class="btn btn-dark" style="background: <?php echo esc_attr($settings['button_primary_color'] ?? '#f59e0b'); ?>; color: #ffffff; display: inline-flex; align-items: center; gap: 0.6rem; border-radius: 10px; padding: 1rem 1.25rem; font-weight: 700; font-size: 1.1rem; text-decoration: none;">
                    <i class="fa-solid fa-phone"></i> Call us Today
                </a>
            </div>
        </div>
    </section>

    <!-- About Content - Centered Layout -->
    <section class="bsg-who-we-are animate-on-scroll-section" style="background: <?php echo esc_attr($settings['about_page_who_bg'] ?? '#ffffff'); ?>; color: <?php echo esc_attr($settings['about_page_who_text'] ?? '#374151'); ?>; padding: 5rem 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div class="bsg-who-we-are" style="display: flex; align-items: center; gap: 4rem; max-width: 1000px; margin: 0 auto; justify-content: center; text-align: center;">
                <!-- Image -->
                <div class="bsg-who-image" style="flex: 0 0 300px; height: 400px; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
                    <?php if (!empty($settings['about_page_team_image'])): ?>
                        <img src="<?php echo esc_url($settings['about_page_team_image']); ?>" alt="About <?php echo esc_attr($settings['business_name'] ?? 'Our Team'); ?>" style="width: 100%; height: 100%; object-fit: cover;">
                    <?php else: ?>
                        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; font-weight: 600;">
                            Team Photo
                        </div>
                    <?php endif; ?>
                </div>
                
                <!-- Content -->
                <div class="bsg-who-content" style="flex: 1; color: <?php echo esc_attr($settings['about_page_who_text'] ?? '#374151'); ?>; text-align: center; display: flex; flex-direction: column; align-items: center;">
                    <div class="bsg-who-tagline" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; color: <?php echo esc_attr($settings['about_page_who_tagline_color'] ?? '#14b8a6'); ?>; font-weight: 600; font-size: 1rem; margin-bottom: 0.5rem; letter-spacing: 1px; text-transform: uppercase;">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <?php echo esc_html($settings['about_page_who_tagline'] ?? 'WHO WE ARE'); ?>
                    </div>
                    
                    <h2 style="font-size: 2.5rem; font-weight: 800; margin: 0 0 1.5rem 0; color: <?php echo esc_attr($settings['about_page_who_desc_color'] ?? '#1f2937'); ?>; line-height: 1.2; text-align: center;">
                        About <?php echo esc_html($settings['business_name'] ?? 'Our Company'); ?>
                    </h2>
                    
                    <div class="bsg-who-description" style="font-size: <?php echo esc_attr($settings['about_description_font_size'] ?? '1rem'); ?>; margin-bottom: 2rem; color: <?php echo esc_attr($settings['about_page_who_desc_color'] ?? '#4b5563'); ?>; line-height: 1.6; text-align: center; max-width: 600px; margin: 0 auto 2rem auto;">
                        <?php 
                        // Use the clean about_description
                        $about_content = $settings['about_description'] ?? 'We are a premier company dedicated to transforming your space with professional expertise and exceptional service. Our team brings years of experience and a commitment to quality that sets us apart.';
                        
                        // Strip HTML tags to show only plain text
                        echo esc_html(wp_strip_all_tags($about_content));
                        ?>
                    </div>
                    
                    <!-- Experience Badge and CTA -->
                    <div class="bsg-who-actions" style="display: flex; align-items: center; justify-content: center; gap: 1.5rem; margin-top: 2rem;">
                        <div class="bsg-experience-badge" style="background: <?php echo esc_attr($settings['about_page_experience_bg'] ?? '#14b8a6'); ?>; color: <?php echo esc_attr($settings['about_page_experience_text'] ?? '#ffffff'); ?>; padding: 1.5rem; border-radius: 12px; text-align: center; min-width: 120px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <div style="font-size: 2rem; font-weight: 800; margin: 0;"><?php echo esc_html($settings['about_page_years'] ?? '15+'); ?></div>
                            <div style="font-size: 0.9rem; margin: 0; opacity: 0.9;"><?php echo esc_html($settings['about_page_experience_label'] ?? 'Years of Experience'); ?></div>
                        </div>
                        
                        <a href="<?php echo esc_url($settings['about_page_cta_link'] ?? '#'); ?>" class="bsg-cta-button" style="background: <?php echo esc_attr($settings['about_page_cta_bg'] ?? '#14b8a6'); ?>; color: <?php echo esc_attr($settings['about_page_cta_text_color'] ?? '#ffffff'); ?>; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <?php echo esc_html($settings['about_page_cta_text'] ?? 'Learn More'); ?>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Work With Us? -->
    <?php if ($features_visible && !empty($settings['features'])): ?>
    <section class="why-work-with-us animate-on-scroll-section" style="padding: 5rem 0; background: <?php echo esc_attr($settings['features_bg_color'] ?? '#1e3a8a'); ?>;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1.5rem;">
            <div style="text-align: center; margin-bottom: 4rem;">
                <h2 style="color: #ffffff; font-size: 3rem; font-weight: 800; margin-bottom: 0.75rem;"><?php echo esc_html($settings['features_title'] ?? 'Why Work With Us?'); ?></h2>
                <p style="color: #ffffff; font-size: 1.25rem; margin: 0; font-weight: 500;"><?php echo esc_html($settings['features_label'] ?? 'WHY CHOOSE US'); ?></p>
            </div>
            
            <div style="display: flex; flex-direction: column; align-items: center; gap: 4rem;">
                <!-- First row: 3 items -->
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4rem; max-width: 900px;">
                    <?php 
                    $feature_count = count($settings['features']);
                    $first_row = array_slice($settings['features'], 0, 3);
                    foreach ($first_row as $feature): 
                    ?>
                    <div class="benefit-item" style="text-align: center;">
                        <div style="width: 60px; height: 60px; background: <?php echo esc_attr($settings['features_icon_color'] ?? '#3b82f6'); ?>; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; border: 1px solid rgba(255, 255, 255, 0.3);">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                            </svg>
                        </div>
                        <h3 style="color: #ffffff; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem;"><?php echo esc_html($feature['title'] ?? ''); ?></h3>
                        <p style="color: #ffffff; margin: 0; line-height: 1.4; font-size: 0.9rem;"><?php echo esc_html($feature['description'] ?? ''); ?></p>
                    </div>
                    <?php endforeach; ?>
                </div>
                
                <!-- Second row: remaining items centered -->
                <?php if ($feature_count > 3): 
                    $second_row = array_slice($settings['features'], 3);
                ?>
                <div style="display: grid; grid-template-columns: repeat(<?php echo count($second_row); ?>, 1fr); gap: 4rem; max-width: 600px;">
                    <?php foreach ($second_row as $feature): ?>
                    <div class="benefit-item" style="text-align: center;">
                        <div style="width: 60px; height: 60px; background: <?php echo esc_attr($settings['features_icon_color'] ?? '#3b82f6'); ?>; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; border: 1px solid rgba(255, 255, 255, 0.3);">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M12 6v6l4 2"/>
                            </svg>
                        </div>
                        <h3 style="color: #ffffff; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem;"><?php echo esc_html($feature['title'] ?? ''); ?></h3>
                        <p style="color: #ffffff; margin: 0; line-height: 1.4; font-size: 0.9rem;"><?php echo esc_html($feature['description'] ?? ''); ?></p>
                    </div>
                    <?php endforeach; ?>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <?php endif; ?>

    <!-- Reviews -->
    <?php if ($reviews_visible): ?>
        <?php include dirname(__FILE__) . '/section-reviews.php'; ?>
    <?php endif; ?>

    <!-- Services -->
    <?php if ($services_visible): ?>
        <?php include dirname(__FILE__) . '/section-services.php'; ?>
    <?php endif; ?>

    <!-- Service Areas -->
    <?php if ($locations_visible): ?>
        <?php include dirname(__FILE__) . '/section-areas.php'; ?>
    <?php endif; ?>

    <!-- Commitment -->
    <?php include dirname(__FILE__) . '/section-commitment.php'; ?>

    <!-- Contact Section -->
    <section class="contact-section" style="padding: 80px 20px; background-color: #1f2937; color: #ffffff;">
        <div class="container" style="max-width: 1200px; margin: 0 auto;">
            <div class="contact-content" style="text-align: center; max-width: 600px; margin: 0 auto;">
                <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0;">Get In Touch</h2>
                <p style="font-size: 1.1rem; margin: 0 0 2rem 0; color: #d1d5db;">
                    Ready to work with us? Contact <?php echo esc_html($settings['business_name'] ?? 'us'); ?> today.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <?php if (!empty($settings['phone'])): ?>
                    <a href="tel:<?php echo esc_attr($settings['phone']); ?>" class="btn btn-primary" style="background: <?php echo esc_attr($settings['button_primary_color'] ?? '#f59e0b'); ?>; color: #ffffff; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                        Call: <?php echo esc_html($settings['phone']); ?>
                    </a>
                    <?php endif; ?>
                    
                    <?php if (!empty($settings['email'])): ?>
                    <a href="mailto:<?php echo esc_attr($settings['email']); ?>" class="btn btn-secondary" style="background: transparent; color: <?php echo esc_attr($settings['button_primary_color'] ?? '#f59e0b'); ?>; border: 2px solid <?php echo esc_attr($settings['button_primary_color'] ?? '#f59e0b'); ?>; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                        Email Us
                    </a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </section>
</main>

<script>
// Scroll animations
function animateOnScroll() {
    const sections = document.querySelectorAll('.animate-on-scroll-section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 150) {
            section.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
animateOnScroll(); // Run immediately
</script>

<?php get_footer(); ?>
