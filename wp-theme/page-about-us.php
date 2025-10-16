<?php
/**
 * Template Name: About Us Page
 * 
 * This template displays the about us page with all sections
 */

// Get settings
$settings = get_option('bsg_settings', array());
$business_name = $settings['business_name'] ?? 'Your Business';
$phone = $settings['phone'] ?? '';
$email = $settings['email'] ?? '';

// Add custom styles
function bsg_about_page_styles() {
    $settings = get_option('bsg_settings', array());
    ?>
    <style>
    /* About Page Hero Section */
    .about-hero-section {
        padding: 90px 0;
        min-height: 80vh;
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
        position: relative;
    }
    .about-hero-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 60px;
        color: #ffffff;
    }
    .about-hero-content h1 {
        font-size: 3.2rem;
        font-weight: 800;
        margin: 0 0 24px 0;
        line-height: 1.2;
        color: #1f2937;
        white-space: normal;
        word-wrap: break-word;
    }
    .about-hero-content .btn {
        background: #f59e0b;
        color: #ffffff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.6rem;
        width: 100%;
        max-width: 520px;
        border-radius: 10px;
        padding: 1rem 1.25rem;
        font-weight: 700;
        font-size: 1.1rem;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    .about-hero-content .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    }

    /* About Content Section */
    .about-content-section {
        padding: 80px 20px;
        background: #ffffff;
    }
    .about-grid {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px;
        align-items: center;
    }
    .about-image-wrapper {
        width: 100%;
        height: 500px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    .about-image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .about-content-text {
        padding: 20px 0;
    }
    .about-content-text .tagline {
        color: #14b8a6;
        font-size: 0.9rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .about-content-text h2 {
        font-size: 2.5rem;
        font-weight: 700;
        color: #1f2937;
        margin: 0.5rem 0 1.5rem 0;
        line-height: 1.2;
    }
    .about-description-content {
        margin-bottom: 2rem;
        line-height: 1.7;
        color: #374151;
        font-size: 1.1rem;
    }
    .about-actions {
        display: flex;
        align-items: center;
        gap: 2rem;
        margin-top: 2rem;
    }
    .experience-badge {
        background: #374151;
        color: #ffffff;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        text-align: center;
        min-width: 150px;
    }
    .experience-badge .number {
        font-size: 2.5rem;
        font-weight: 800;
        line-height: 1;
        color: #14b8a6;
    }
    .experience-badge .label {
        font-size: 0.9rem;
        font-weight: 600;
        margin-top: 0.5rem;
    }
    .about-cta-btn {
        background: #14b8a6;
        color: #ffffff;
        padding: 1rem 2rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 700;
        font-size: 1rem;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
    }
    .about-cta-btn:hover {
        background: #0d9488;
        transform: translateY(-2px);
    }

    /* Why Work With Us Section */
    .why-section {
        padding: 80px 20px;
        background: #1e3a8a;
    }
    .why-section h2 {
        color: #ffffff;
        font-size: 2.5rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 1rem;
    }
    .why-section .subtitle {
        color: #ffffff;
        font-size: 1.1rem;
        text-align: center;
        margin-bottom: 3rem;
        opacity: 0.9;
    }
    .benefits-container {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3rem;
    }
    .benefits-row-top {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 3rem;
        width: 100%;
        max-width: 900px;
    }
    .benefits-row-bottom {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 3rem;
        width: 100%;
        max-width: 600px;
    }
    .benefit-item {
        text-align: center;
        padding: 1rem;
    }
    .benefit-item .icon {
        width: 70px;
        height: 70px;
        background: #3b82f6;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
    }
    .benefit-item h3 {
        color: #ffffff;
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
    }
    .benefit-item p {
        color: #ffffff;
        line-height: 1.6;
        margin: 0;
        font-size: 0.95rem;
        opacity: 0.9;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .about-hero-section {
            min-height: 60vh;
            padding: 60px 0;
        }
        .about-hero-content {
            padding: 0 20px;
        }
        .about-hero-content h1 {
            font-size: 2.5rem;
        }
        .about-hero-content .btn {
            max-width: 100%;
        }
        .about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
        }
        .about-image-wrapper {
            height: 400px;
        }
        .about-actions {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
        }
        .benefits-row-top,
        .benefits-row-bottom {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        .why-section h2 {
            font-size: 2rem;
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
    <section class="about-hero-section" style="<?php if (!empty($settings['hero_bg_image'])): ?>background-image: linear-gradient(to left, transparent 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.7) 80%, rgba(255,255,255,3) 100%), url('<?php echo esc_url($settings['hero_bg_image']); ?>'); background-size: cover; background-position: center;<?php else: ?>background-color: <?php echo esc_attr($settings['hero_bg_color'] ?? '#1f2937'); ?>;<?php endif; ?>">
        <div class="about-hero-content">
            <h1 style="color: <?php echo esc_attr($settings['hero_heading_color'] ?? '#1f2937'); ?>;">
                About <?php echo esc_html($business_name); ?>
            </h1>
            <a href="tel:<?php echo esc_attr($phone); ?>" class="btn">
                <i class="fa-solid fa-phone"></i> Call us Today
            </a>
        </div>
    </section>

    <!-- About Content Section -->
    <section class="about-content-section">
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
                    WHO WE ARE
                </p>
                <h2>About <?php echo esc_html($business_name); ?></h2>
                
                <div class="about-description-content">
                    <?php 
                    // Use only about page description from wizard
                    $about_page_description = $settings['about_page_who_description'] ?? '';
                    
                    if (!empty($about_page_description)) {
                        // Extract clean text from about page description
                        $clean_text = strip_tags($about_page_description);
                        
                        // Find the main about paragraph (after "About Us" heading)
                        $about_pos = stripos($clean_text, 'About Us');
                        if ($about_pos !== false) {
                            $after_about = substr($clean_text, $about_pos + 7);
                            // Get the first substantial paragraph
                            $paragraphs = preg_split('/\n\n+/', $after_about);
                            $main_paragraph = '';
                            foreach ($paragraphs as $para) {
                                $para = trim($para);
                                if (strlen($para) > 100 && !preg_match('/(Our Mission|Our Values|Our Team|Our Commitment|Ready to Get Started|\d+\+)/i', $para)) {
                                    $main_paragraph = $para;
                                    break;
                                }
                            }
                            
                            if (!empty($main_paragraph)) {
                                echo '<p>' . esc_html($main_paragraph) . '</p>';
                            } else {
                                // Fallback: show first substantial sentence
                                $sentences = preg_split('/[.!?]+/', $after_about);
                                foreach ($sentences as $sentence) {
                                    $sentence = trim($sentence);
                                    if (strlen($sentence) > 50 && !preg_match('/(Our Mission|Our Values|Our Team|Our Commitment|Ready to Get Started|\d+\+)/i', $sentence)) {
                                        echo '<p>' . esc_html($sentence) . '</p>';
                                        break;
                                    }
                                }
                            }
                        } else {
                            // If no "About Us" found, show first substantial paragraph
                            $paragraphs = preg_split('/\n\n+/', $clean_text);
                            foreach ($paragraphs as $para) {
                                $para = trim($para);
                                if (strlen($para) > 100 && !preg_match('/(Our Mission|Our Values|Our Team|Our Commitment|Ready to Get Started|\d+\+)/i', $para)) {
                                    echo '<p>' . esc_html($para) . '</p>';
                                    break;
                                }
                            }
                        }
                    } else {
                        // Fallback content
                        echo '<p>We are a premier company dedicated to transforming your space with professional expertise and exceptional service. Our team brings years of experience and a commitment to quality that sets us apart.</p>';
                    }
                    ?>
                </div>
                
                <div class="about-actions">
                    <div class="experience-badge">
                        <div class="number"><?php echo esc_html($settings['about_page_years'] ?? '15+'); ?></div>
                        <div class="label">Years of Experience</div>
                    </div>
                    <a href="tel:<?php echo esc_attr($phone); ?>" class="about-cta-btn">
                        Get Started Today
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Work With Us Section -->
    <?php 
    // Check if about_page_why_items exist, if not use features as fallback
    $why_items = !empty($settings['about_page_why_items']) ? $settings['about_page_why_items'] : (!empty($settings['features']) ? $settings['features'] : []);
    if (!empty($why_items)): 
    ?>
    <section class="why-section">
        <div class="container" style="max-width: 1200px; margin: 0 auto;">
            <h2><?php echo esc_html($settings['about_page_why_heading'] ?? 'Why Work With Us?'); ?></h2>
            <p class="subtitle"><?php echo esc_html($settings['about_page_why_subheading'] ?? 'Benefits of Working with an Expert Team'); ?></p>
            
            <div class="benefits-container">
                <!-- Top Row: First 3 items -->
                <div class="benefits-row-top">
                    <?php 
                    $item_count = count($why_items);
                    $top_items = array_slice($why_items, 0, 3);
                    foreach ($top_items as $item): 
                    ?>
                    <div class="benefit-item">
                        <div class="icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5">
                                <path d="M9 11l3 3L22 4"/>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                            </svg>
                        </div>
                        <h3><?php echo esc_html($item['title'] ?? ''); ?></h3>
                        <p><?php echo esc_html($item['description'] ?? ''); ?></p>
                    </div>
                    <?php endforeach; ?>
                </div>
                
                <!-- Bottom Row: Remaining items (centered) -->
                <?php if ($item_count > 3): 
                    $bottom_items = array_slice($why_items, 3);
                ?>
                <div class="benefits-row-bottom">
                    <?php foreach ($bottom_items as $item): ?>
                    <div class="benefit-item">
                        <div class="icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5">
                                <path d="M9 11l3 3L22 4"/>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                            </svg>
                        </div>
                        <h3><?php echo esc_html($item['title'] ?? ''); ?></h3>
                        <p><?php echo esc_html($item['description'] ?? ''); ?></p>
                    </div>
                    <?php endforeach; ?>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <?php endif; ?>

    <!-- Reviews Section -->
    <?php 
    // Force reviews to be visible
    $original_reviews_visible = $settings['reviews_visible'] ?? null;
    $settings['reviews_visible'] = true;
    include dirname(__FILE__) . '/section-reviews.php';
    // Restore original setting
    if ($original_reviews_visible !== null) {
        $settings['reviews_visible'] = $original_reviews_visible;
    }
    ?>

    <!-- Services Section -->
    <?php 
    // Force services to be visible
    $original_services_visible = $settings['services_visible'] ?? null;
    $settings['services_visible'] = true;
    include dirname(__FILE__) . '/section-services.php';
    // Restore original setting
    if ($original_services_visible !== null) {
        $settings['services_visible'] = $original_services_visible;
    }
    ?>

    <!-- Service Areas Section -->
    <?php 
    // Force areas to be visible
    $original_areas_visible = $settings['areas_visible'] ?? null;
    $settings['areas_visible'] = true;
    include dirname(__FILE__) . '/section-areas.php';
    // Restore original setting
    if ($original_areas_visible !== null) {
        $settings['areas_visible'] = $original_areas_visible;
    }
    ?>

    <!-- Commitment Section -->
    <?php 
    // Force commitment to be visible
    $original_commitment_visible = $settings['commitment_visible'] ?? null;
    $settings['commitment_visible'] = true;
    include dirname(__FILE__) . '/section-commitment.php';
    // Restore original setting
    if ($original_commitment_visible !== null) {
        $settings['commitment_visible'] = $original_commitment_visible;
    }
    ?>

    <!-- Contact Section -->
    <section id="contact" class="contact-section" style="padding: 80px 20px; background-color: #1f2937;">
        <div class="container" style="max-width: 600px; margin: 0 auto; text-align: center;">
            <h2 style="color: #ffffff; font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;">Get In Touch</h2>
            <p style="color: #ffffff; font-size: 1.1rem; margin-bottom: 2rem;">Ready to work with us? Contact <?php echo esc_html($business_name); ?> today.</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <?php if (!empty($phone)): ?>
                <a href="tel:<?php echo esc_attr($phone); ?>" style="background: #f59e0b; color: #ffffff; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 0.5rem;">
                    <i class="fa-solid fa-phone"></i> Call: <?php echo esc_html($phone); ?>
                </a>
                <?php endif; ?>
                
                <?php if (!empty($settings['email'])): ?>
                <a href="mailto:<?php echo esc_attr($settings['email']); ?>" style="border: 2px solid #f59e0b; color: #f59e0b; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 0.5rem;">
                    <i class="fa-solid fa-envelope"></i> Email Us
                </a>
                <?php endif; ?>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>