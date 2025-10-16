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
    /* Hero Section - Match Service Page */
    .about-hero-section {
        padding: 90px 0 !important;
        min-height: 80vh !important;
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
    }
    .about-hero-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 60px;
        color: #ffffff;
        margin-right: 20px;
    }
    .about-hero-content h1 {
        font-size: 3.2rem;
        font-weight: 800;
        margin: 0 0 24px 0;
        line-height: 1.2;
        color: <?php echo esc_attr($settings['hero_heading_color'] ?? '#000000'); ?> !important;
        white-space: normal;
        word-wrap: break-word;
    }
    .about-hero-content .hero-actions {
        margin-top: 0;
    }
    .about-hero-content .btn {
        background: #f59e0b !important;
        color: #ffffff !important;
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

    /* Why Work With Us (About Page Specific) */
    .why-section {
        padding: 80px 20px;
        background: <?php echo esc_attr($settings['about_page_why_bg'] ?? '#1e3a8a'); ?>;
    }
    .why-section h2 {
        color: <?php echo esc_attr($settings['about_page_why_heading_color'] ?? '#ffffff'); ?>;
        font-size: 2.75rem;
        font-weight: 800;
        text-align: center;
        margin-bottom: 0.75rem;
    }
    .why-section .subtitle {
        color: <?php echo esc_attr($settings['about_page_why_subtitle_color'] ?? '#ffffff'); ?>;
        font-size: 1.15rem;
        text-align: center;
        margin-bottom: 4rem;
        font-weight: 400;
    }
    .benefits-container {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4rem;
    }
    .benefits-row-top {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 4rem;
        width: 100%;
        max-width: 900px;
    }
    .benefits-row-bottom {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 4rem;
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
        background: <?php echo esc_attr($settings['about_page_why_icon_bg'] ?? '#1e3a8a'); ?>;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
        border: none;
    }
    .benefit-item h3 {
        color: <?php echo esc_attr($settings['about_page_why_item_title'] ?? '#ffffff'); ?>;
        font-size: 1.3rem;
        font-weight: 700;
        margin-bottom: 0.75rem;
    }
    .benefit-item p {
        color: <?php echo esc_attr($settings['about_page_why_item_desc'] ?? '#ffffff'); ?>;
        line-height: 1.6;
        margin: 0;
        font-size: 0.95rem;
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
        .about-hero-section {
            min-height: 60vh !important;
            padding: 60px 0 !important;
        }
        .about-hero-content {
            padding: 0 20px !important;
        }
        .about-hero-content h1 {
            font-size: 2.5rem !important;
        }
        .about-hero-content .btn {
            max-width: 100% !important;
        }
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
        .benefits-container {
            gap: 2rem;
        }
        .benefits-row-top {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        .benefits-row-bottom {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        .why-section h2 {
            font-size: 2rem;
        }
        .why-section .subtitle {
            font-size: 1rem;
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
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 60px;">
            <div class="about-hero-content">
                <h1 style="color: <?php echo esc_attr($settings['hero_heading_color'] ?? '#000000'); ?>; white-space: normal; word-wrap: break-word; line-height: 1.2; font-size: 3.2rem; font-weight: 800; margin: 0 0 24px 0;">
                    About <?php echo esc_html($business_name); ?>
                </h1>
                <div class="hero-actions">
                    <a href="tel:<?php echo esc_attr($phone); ?>" class="btn btn-dark" style="background: #f59e0b; color: #ffffff; display:inline-flex; align-items:center; justify-content:center; gap:0.6rem; width:100%; max-width:520px; border-radius:10px; padding:1rem 1.25rem; font-weight:700; font-size:1.1rem;">
                        <i class="fa-solid fa-phone"></i> Call us Today
                    </a>
                </div>
            </div>
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
                // Extract clean about description text from wizard
                $about_page_description = $settings['about_page_who_description'] ?? '';
                
                if (!empty($about_page_description)) {
                    // Remove all HTML tags to get plain text
                    $clean_text = strip_tags($about_page_description);
                    
                    // Extract the main "About Us" paragraph (between "WHO WE ARE" and various end markers)
                    // Stop at: Our Mission, Years of Experience, Get Started, or numeric patterns like "10+", "15+"
                    preg_match('/WHO WE ARE.*?About Us(.*?)(?:Our Mission|Years of Experience|\d+\+\s*Years|Get Started Today|Our Values|Our Team)/s', $clean_text, $matches);
                    
                    if (!empty($matches[1])) {
                        $about_text = trim($matches[1]);
                    } else {
                        // Fallback: try to find any substantial paragraph
                        $paragraphs = preg_split('/\n\n+/', $clean_text);
                        $about_text = '';
                        foreach ($paragraphs as $para) {
                            $para = trim($para);
                            // Stop if we hit numeric experience indicators
                            if (preg_match('/^\d+\+/', $para)) {
                                break;
                            }
                            if (strlen($para) > 100 && !preg_match('/(WHO WE ARE|ABOUT YOUR BUSINESS|Our Mission|Our Values|Our Team|Ready to Get Started)/i', $para)) {
                                $about_text = $para;
                                break;
                            }
                        }
                    }
                    
                    // Clean up extra whitespace and remove any trailing numeric patterns
                    $about_text = preg_replace('/\s+/', ' ', $about_text);
                    $about_text = preg_replace('/\s*\d+\+\s*$/', '', $about_text); // Remove trailing "10+", "15+", etc.
                    $about_text = trim($about_text);
                    
                    // Display the clean text
                    if (!empty($about_text) && strlen($about_text) > 50) {
                        echo '<p>' . esc_html($about_text) . '</p>';
                    } else {
                        echo '<p>We are a premier company dedicated to transforming your space with professional expertise and exceptional service. Our team brings years of experience and a commitment to quality that sets us apart.</p>';
                    }
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

    <!-- Why Work With Us? (About Page Specific) -->
    <?php if (!empty($settings['about_page_why_items'])): ?>
    <section class="why-section">
        <div class="container" style="max-width: 1200px; margin: 0 auto;">
            <h2><?php echo esc_html($settings['about_page_why_heading'] ?? 'Why Work With Us?'); ?></h2>
            <p class="subtitle"><?php echo esc_html($settings['about_page_why_subheading'] ?? 'Benefits of Working with an Expert Team'); ?></p>
            
            <div class="benefits-container">
                <!-- Top Row: First 3 items -->
                <div class="benefits-row-top">
                    <?php 
                    $item_count = count($settings['about_page_why_items']);
                    $top_items = array_slice($settings['about_page_why_items'], 0, 3);
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
                    $bottom_items = array_slice($settings['about_page_why_items'], 3);
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
