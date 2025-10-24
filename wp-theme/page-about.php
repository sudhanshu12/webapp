<?php
/**
 * Template Name: BSG About Page
 */

// Get settings
$settings = bsg_get_settings();
$business_name = $settings['business_name'] ?? 'Roofing Pros';
$phone = $settings['phone'] ?? '';
$email = $settings['email'] ?? '';

// Set page title
add_filter('pre_get_document_title', function($title) use ($settings, $business_name) {
    return $settings['about_page_meta_title'] ?? 'About ' . $business_name . ' - Expert Roofing Services';
}, 99);

get_header();
?>

<style>
    .about-hero { 
        background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%), 
                   url('<?php echo esc_url($settings['hero_bg_image'] ?? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'); 
        background-size: cover; 
        background-position: center; 
        color: white; 
        padding: 120px 0; 
        text-align: center; 
    }
    .about-hero h1 { font-size: 3.5rem; font-weight: 800; margin: 0 0 2rem 0; color: white; }
    .about-btn { background: #f59e0b; color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; }
    .about-section { padding: 80px 0; }
    .about-section-white { background: #fff; }
    .about-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
    .about-experience-box { background: #f8fafc; padding: 1.5rem; border-radius: 8px; text-align: center; margin-bottom: 2rem; }
    .about-experience-number { font-size: 3rem; font-weight: 800; color: #f59e0b; margin: 0; }
    .about-experience-text { color: #4b5563; font-size: 1.1rem; font-weight: 600; }
    .about-team-image { width: 100%; height: 400px; object-fit: cover; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); }
    @media (max-width: 768px) {
        .about-grid-2 { grid-template-columns: 1fr; gap: 2rem; }
        .about-hero h1 { font-size: 2.5rem; }
        .about-section { padding: 60px 0; }
    }
</style>

<!-- Hero Section -->
<section class="about-hero">
    <div class="container">
        <h1><?php echo esc_html($settings['about_page_hero_tagline'] ?? 'ABOUT ' . strtoupper($business_name)); ?></h1>
        <p style="font-size: 1.2rem; margin: 0 0 2rem 0; color: white;">
            <?php echo esc_html($settings['about_page_hero_title'] ?? 'Professional ' . strtolower($settings['business_type'] ?? 'roofing') . ' services you can count on'); ?>
        </p>
        <a href="tel:<?php echo esc_attr($phone); ?>" class="about-btn">
            📞 Call (<?php echo esc_attr($phone); ?>)
        </a>
    </div>
</section>

<!-- About Content Section -->
<section class="about-section about-section-white">
    <div class="container">
        <div class="about-grid-2">
            <div>
                <h2>About <?php echo esc_html($business_name); ?></h2>
                <div style="margin-bottom: 2rem;">
                    <?php 
                    $about_description = $settings['about_description'] ?? '';
                    if (!empty($about_description)) {
                        // Display the description as HTML (it may contain formatting)
                        echo $about_description;
                    } else {
                        echo '<p>With over ' . esc_html($settings['about_years'] ?? '15') . ' years of experience in the ' . strtolower($settings['business_type'] ?? 'roofing') . ' industry, ' . esc_html($business_name) . ' brings unparalleled expertise and quality service to the residents of ' . esc_html($settings['location'] ?? 'your area') . '. Our team is dedicated to delivering exceptional results that exceed your expectations.</p>';
                    }
                    ?>
                </div>
                
                <!-- Years of Experience -->
                <div class="about-experience-box">
                    <div class="about-experience-number"><?php echo esc_html($settings['about_years'] ?? '15'); ?></div>
                    <div class="about-experience-text">Years of Experience</div>
                </div>
                
                <a href="tel:<?php echo esc_attr($phone); ?>" class="about-btn">
                    📞 Call Us Today
                </a>
            </div>
            
            <!-- Team Image -->
            <div>
                <?php 
                $about_image = $settings['about_page_team_image'] ?? $settings['about_image'] ?? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
                ?>
                <img src="<?php echo esc_url($about_image); ?>" alt="About <?php echo esc_attr($business_name); ?>" class="about-team-image">
            </div>
        </div>
    </div>
</section>

<!-- Services Section -->
<?php include dirname(__FILE__) . '/section-services.php'; ?>

<!-- Reviews Section -->
<?php include dirname(__FILE__) . '/section-reviews.php'; ?>

<!-- Commitment Section -->
<?php include dirname(__FILE__) . '/section-commitment.php'; ?>

<?php get_footer(); ?>
