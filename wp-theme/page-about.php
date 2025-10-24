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

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo esc_html($settings['about_page_meta_title'] ?? 'About ' . $business_name . ' - Professional Services'); ?></title>
    <meta name="description" content="<?php echo esc_attr($settings['about_page_meta_description'] ?? 'Learn about ' . $business_name . ' - our professional team and services'); ?>">
    <link rel="canonical" href="<?php echo esc_url(get_permalink()); ?>">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .hero { 
            background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%), 
                       url('<?php echo esc_url($settings['hero_bg_image'] ?? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'); 
            background-size: cover; 
            background-position: center; 
            color: white; 
            padding: 120px 0; 
            text-align: center; 
        }
        .hero h1 { font-size: 3.5rem; font-weight: 800; margin: 0 0 2rem 0; color: white; }
        .btn { background: #f59e0b; color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; }
        .section { padding: 80px 0; }
        .section-white { background: #fff; }
        .section-gray { background: #f8fafc; }
        .section-dark { background: #1f2937; color: white; }
        .section-blue { background: #1e3a8a; color: white; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .grid-5 { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
        .card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; }
        .icon { width: 60px; height: 60px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem; }
        .review-card { background: #f8fafc; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .text-center { text-align: center; }
        .mb-3 { margin-bottom: 3rem; }
        .mb-2 { margin-bottom: 2rem; }
        .mb-1 { margin-bottom: 1rem; }
        h2 { font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0; }
        h3 { font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0; }
        p { color: #4b5563; font-size: 1.1rem; line-height: 1.7; }
        .text-gray { color: #6b7280; }
        .text-white { color: white; }
        .text-light { color: #d1d5db; }
        .experience-box { background: #f8fafc; padding: 1.5rem; border-radius: 8px; text-align: center; margin-bottom: 2rem; }
        .experience-number { font-size: 3rem; font-weight: 800; color: #f59e0b; margin: 0; }
        .experience-text { color: #4b5563; font-size: 1.1rem; font-weight: 600; }
        @media (max-width: 768px) {
            .grid-2 { grid-template-columns: 1fr; gap: 2rem; }
            .hero h1 { font-size: 2.5rem; }
            .section { padding: 60px 0; }
        }
    </style>
</head>
<body>

<!-- Hero Section -->
<section class="hero">
    <div class="container">
        <h1><?php echo esc_html($settings['about_hero_tagline'] ?? 'ABOUT ' . strtoupper($business_name)); ?></h1>
        <p style="font-size: 1.2rem; margin: 0 0 2rem 0; color: #4b5563;">
            <?php echo esc_html($settings['about_hero_title'] ?? 'Professional ' . strtolower($settings['business_type'] ?? 'roofing') . ' services you can count on'); ?>
        </p>
        <a href="tel:<?php echo esc_attr($phone); ?>" class="btn">
            📞 Call (<?php echo esc_attr($phone); ?>)
        </a>
    </div>
</section>

<!-- About Content Section -->
<section class="section section-white">
    <div class="container">
        <div class="grid-2">
            <div>
                <h2>About <?php echo esc_html($business_name); ?></h2>
                <div class="mb-2">
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
                <div class="experience-box">
                    <div class="experience-number"><?php echo esc_html($settings['about_years'] ?? '15'); ?></div>
                    <div class="experience-text">Years of Experience</div>
                </div>
                
                <a href="tel:<?php echo esc_attr($phone); ?>" class="btn">
                    📞 Call Us Today
                </a>
            </div>
            
            <!-- Team Image -->
            <div>
                <?php 
                $about_image = $settings['about_page_team_image'] ?? $settings['about_image'] ?? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
                ?>
                <img src="<?php echo esc_url($about_image); ?>" alt="About <?php echo esc_attr($business_name); ?>" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
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

</body>
</html>
