<?php
/*
 * Template Name: BSG About Us Template
 */

// Get centralized settings
$business = bsg_get_business_info();
$settings = bsg_get_settings();
$colors = bsg_get_color_scheme();

// Hero section
$hero_bg_image = $settings['hero_bg_image'] ?? '';
$hero_bg_color = $settings['hero_bg_color'] ?? '#f5f5f5';
$hero_heading_color = $settings['hero_heading_color'] ?? '#000000';

// About section
$about_image = $settings['about_page_team_image'] ?? $settings['about_image'] ?? '';
$about_tagline = $settings['about_page_who_tagline'] ?? 'WHO WE ARE';
$about_tagline_color = $settings['about_page_who_tagline_color'] ?? '#14b8a6';
$about_description = $settings['about_description'] ?? '';
$about_years = $settings['about_page_years'] ?? '15+';
$about_experience_label = $settings['about_page_experience_label'] ?? 'Years of Experience';
$about_experience_bg = $settings['about_page_experience_bg'] ?? '#14b8a6';
$about_experience_text = $settings['about_page_experience_text'] ?? '#ffffff';
$about_cta_text = $settings['about_page_cta_text'] ?? 'Learn More';
$about_cta_link = $settings['about_page_cta_link'] ?? '#';
$about_cta_bg = $settings['about_page_cta_bg'] ?? '#14b8a6';
$about_cta_text_color = $settings['about_page_cta_text_color'] ?? '#ffffff';

// Features
$features = $settings['features'] ?? [];
$features_visible = $settings['features_visible'] ?? 1;

// Other sections
$services_visible = $settings['services_visible'] ?? 1;
$locations_visible = $settings['locations_visible'] ?? 1;
$reviews_visible = $settings['reviews_visible'] ?? 1;

get_header();
?>

<style>
/* Desktop Layout - Side by Side */
.bsg-who-we-are {
    display: flex !important;
    align-items: center !important;
    gap: 4rem !important;
    max-width: 1000px !important;
    margin: 0 auto !important;
}

.bsg-who-image {
    flex: 0 0 420px !important;
    height: 550px !important;
}

.bsg-who-content {
    flex: 1 !important;
    text-align: left !important;
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .bsg-who-we-are {
        flex-direction: column !important;
        gap: 2rem !important;
    }
    
    .bsg-who-image {
        width: 100% !important;
        max-width: 400px !important;
        height: 300px !important;
    }
    
    .bsg-who-content {
        text-align: center !important;
    }
    
    .bsg-who-actions {
        flex-direction: column !important;
        align-items: center !important;
    }
}

/* Hero Animation */
.hero-content {
    opacity: 0;
    transform: translateY(40px);
    animation: heroFadeIn 1s ease-out 0.2s forwards;
}

@keyframes heroFadeIn {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Scroll animations */
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
    <section class="hero-section" style="<?php if (!empty($hero_bg_image)): ?>background-image: linear-gradient(to left, transparent 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.7) 80%, rgba(255,255,255,0.95) 100%), url('<?php echo esc_url($hero_bg_image); ?>'); background-size: cover; background-position: center;<?php else: ?>background-color: <?php echo esc_attr($hero_bg_color); ?>;<?php endif; ?> padding: 90px 60px;">
        <div class="container" style="max-width: 1200px; margin: 0 auto;">
            <div class="hero-content">
                <h1 style="color: <?php echo esc_attr($hero_heading_color); ?>; font-size: 3.2rem; font-weight: 800; margin: 0 0 24px 0; line-height: 1.2; max-width: 600px;">
                    About <?php echo esc_html($business['name']); ?>
                </h1>
                <a href="tel:<?php echo esc_attr($business['phone']); ?>" class="btn btn-dark" style="background: <?php echo esc_attr($settings['button_primary_color'] ?? '#f59e0b'); ?>; color: #ffffff; display: inline-flex; align-items: center; gap: 0.6rem; border-radius: 10px; padding: 1rem 1.25rem; font-weight: 700; font-size: 1.1rem; text-decoration: none;">
                    <i class="fa-solid fa-phone"></i> Call us Today
                </a>
            </div>
        </div>
    </section>

    <!-- About Content - Image + Description Side by Side -->
    <section class="about-content-section animate-on-scroll-section" style="background: #ffffff; padding: 5rem 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div class="bsg-who-we-are">
                <!-- Image -->
                <div class="bsg-who-image" style="border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
                    <?php if (!empty($about_image)): ?>
                        <img src="<?php echo esc_url($about_image); ?>" alt="About <?php echo esc_attr($business['name']); ?>" style="width: 100%; height: 100%; object-fit: cover;">
                    <?php else: ?>
                        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; font-weight: 600;">
                            Team Photo
                        </div>
                    <?php endif; ?>
                </div>
                
                <!-- Content -->
                <div class="bsg-who-content" style="color: #374151;">
                    <div style="color: <?php echo esc_attr($about_tagline_color); ?>; font-weight: 700; font-size: 0.95rem; margin-bottom: 1rem; letter-spacing: 1px; text-transform: uppercase; display: flex; align-items: center; gap: 0.5rem;">
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <?php echo esc_html($about_tagline); ?>
                    </div>
                    
                    <h2 style="font-size: 2.75rem; font-weight: 800; margin: 0 0 1.5rem 0; color: #1f2937; line-height: 1.2;">
                        About <?php echo esc_html($business['name']); ?>
                    </h2>
                    
                    <div style="font-size: 1.05rem; margin-bottom: 2.5rem; line-height: 1.8; color: #4b5563;">
                        <?php 
                        if (!empty($about_description)) {
                            echo wp_kses_post($about_description);
                        } else {
                            echo '<p>We are a premier company dedicated to transforming your space with professional expertise and exceptional service. Our team brings years of experience and a commitment to quality that sets us apart.</p>';
                        }
                        ?>
                    </div>
                    
                    <!-- Experience Badge and CTA -->
                    <div class="bsg-who-actions" style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
                        <div style="background: <?php echo esc_attr($about_experience_bg); ?>; color: <?php echo esc_attr($about_experience_text); ?>; padding: 1.5rem 2rem; border-radius: 8px; text-align: center; min-width: 140px;">
                            <div style="font-size: 2.25rem; font-weight: 800; margin: 0;"><?php echo esc_html($about_years); ?></div>
                            <div style="font-size: 0.85rem; margin: 0.5rem 0 0 0; font-weight: 500;"><?php echo esc_html($about_experience_label); ?></div>
                        </div>
                        
                        <a href="<?php echo esc_url($about_cta_link); ?>" style="background: <?php echo esc_attr($about_cta_bg); ?>; color: <?php echo esc_attr($about_cta_text_color); ?>; padding: 1rem 2.5rem; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 1rem;">
                            <?php echo esc_html($about_cta_text); ?>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Work With Us? -->
    <?php if ($features_visible && !empty($features)): ?>
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
                    $feature_count = count($features);
                    $first_row_count = min(3, $feature_count);
                    for ($i = 0; $i < $first_row_count; $i++): 
                        $feature = $features[$i];
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
                    <?php endfor; ?>
                </div>
                
                <!-- Second row: remaining items centered -->
                <?php if ($feature_count > 3): ?>
                <div style="display: grid; grid-template-columns: repeat(<?php echo min(2, $feature_count - 3); ?>, 1fr); gap: 4rem; max-width: 600px;">
                    <?php for ($i = 3; $i < $feature_count; $i++): 
                        $feature = $features[$i];
                    ?>
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
                    <?php endfor; ?>
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

    <!-- Contact Form -->
    <section style="padding: 80px 20px; background: #f9fafb;">
        <div style="max-width: 800px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 3rem;">
                <h2 style="font-size: 2.5rem; font-weight: 700; color: #1f2937;">Get In Touch</h2>
                <p style="font-size: 1.1rem; color: #6b7280;">Ready to work with us? Contact us today.</p>
            </div>
            
            <form style="background: #ffffff; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div>
                        <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Name *</label>
                        <input type="text" name="name" required style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;">
                    </div>
                    <div>
                        <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Email *</label>
                        <input type="email" name="email" required style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;">
                    </div>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Phone</label>
                    <input type="tel" name="phone" style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem;">
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Message *</label>
                    <textarea name="message" required rows="6" style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1rem; resize: vertical;"></textarea>
                </div>
                
                <div style="text-align: center;">
                    <button type="submit" style="background: <?php echo esc_attr($settings['button_primary_color'] ?? '#f59e0b'); ?>; color: #ffffff; padding: 1rem 3rem; border: none; border-radius: 8px; font-weight: 700; font-size: 1.1rem; cursor: pointer;">
                        Send Message
                    </button>
                </div>
            </form>
            
            <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                <a href="tel:<?php echo esc_attr($business['phone']); ?>" style="background: #f59e0b; color: #ffffff; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                    Call: <?php echo esc_html($business['phone']); ?>
                </a>
                <a href="mailto:<?php echo esc_attr($business['email']); ?>" style="background: transparent; color: #f59e0b; border: 2px solid #f59e0b; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                    Email Us
                </a>
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
</script>

<?php get_footer(); ?>
