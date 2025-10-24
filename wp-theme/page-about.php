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
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 0; text-align: center; }
        .hero h1 { font-size: 3.5rem; font-weight: 800; margin: 0 0 2rem 0; color: #000; }
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
                <p class="mb-2">
                    <?php echo esc_html($settings['about_description'] ?? 'With over ' . ($settings['about_years'] ?? '15') . ' years of experience in the ' . strtolower($settings['business_type'] ?? 'roofing') . ' industry, ' . $business_name . ' brings unparalleled expertise and quality service to the residents of ' . ($settings['location'] ?? 'your area') . '. Our team is dedicated to delivering exceptional results that exceed your expectations.'); ?>
                </p>
                
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

<!-- Why Work With Us Section -->
<section class="section" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 80px 0;">
    <div class="container">
        <div class="text-center mb-3">
            <h2 style="color: white; font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0;">Why Work With Us?</h2>
            <p style="color: white; font-size: 1.2rem; margin: 0;">Benefits of Working with an Expert Team</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; max-width: 1000px; margin: 0 auto;">
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center;">
                <div style="width: 60px; height: 60px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem; font-weight: bold;">✓</div>
                <h3 style="color: #1f2937; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">Proven Expertise</h3>
                <p style="color: #6b7280; margin: 0;">Years of successful delivery.</p>
            </div>
            
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center;">
                <div style="width: 60px; height: 60px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem; font-weight: bold;">$</div>
                <h3 style="color: #1f2937; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">Tailored Solutions</h3>
                <p style="color: #6b7280; margin: 0;">Built for your unique needs.</p>
            </div>
            
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center;">
                <div style="width: 60px; height: 60px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem; font-weight: bold;">📄</div>
                <h3 style="color: #1f2937; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">End-to-End Support</h3>
                <p style="color: #6b7280; margin: 0;">Guidance at every step.</p>
            </div>
            
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center;">
                <div style="width: 60px; height: 60px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem; font-weight: bold;">💻</div>
                <h3 style="color: #1f2937; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">Cutting-Edge Technology</h3>
                <p style="color: #6b7280; margin: 0;">Modern, reliable, scalable systems.</p>
            </div>
            
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center;">
                <div style="width: 60px; height: 60px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem; font-weight: bold;">🎯</div>
                <h3 style="color: #1f2937; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">Results-Driven</h3>
                <p style="color: #6b7280; margin: 0;">Focused on measurable business impact.</p>
            </div>
        </div>
    </div>
</section>

<!-- Reviews Section -->
<section class="section section-white">
    <div class="container">
        <div class="text-center mb-3">
            <h2>What People Say</h2>
            <p class="text-gray">Customer Reviews</p>
        </div>
        
        <?php 
        $reviews = $settings['reviews'] ?? [];
        if (!empty($reviews)): 
        ?>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            <?php foreach (array_slice($reviews, 0, 5) as $review): ?>
                <div class="review-card">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="width: 40px; height: 40px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
                            <?php echo strtoupper(substr($review['name'] ?? 'A', 0, 1)); ?>
                        </div>
                        <div>
                            <div style="font-weight: 600; color: #1f2937;"><?php echo esc_html($review['name'] ?? 'Anonymous'); ?></div>
                            <div style="font-size: 0.9rem; color: #6b7280;">Verified Customer</div>
                        </div>
                    </div>
                    <div style="color: #4b5563; line-height: 1.6; margin-bottom: 1rem;">
                        <?php echo esc_html($review['comment'] ?? 'Great service!'); ?>
                    </div>
                    <div style="color: #9ca3af; font-size: 0.9rem;">
                        — <?php echo esc_html($review['date'] ?? date('Y-m-d')); ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </div>
</section>

<!-- Service Areas Section -->
<section class="section section-dark">
    <div class="container">
        <div class="text-center mb-3">
            <h2 class="text-white">Proudly Serving <?php echo esc_html($settings['location'] ?? 'Your Area'); ?> And The Surrounding Areas</h2>
            <p class="text-light">Proudly serving <?php echo esc_html($settings['location'] ?? 'your area'); ?> and surrounding areas with professional <?php echo strtolower($settings['business_type'] ?? 'services'); ?>. We're committed to delivering quality work wherever you are.</p>
        </div>
        
        <?php 
        $locations = $settings['locations'] ?? [];
        if (!empty($locations)): 
        ?>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; max-width: 800px; margin: 0 auto;">
            <?php foreach (array_slice($locations, 0, 8) as $location): ?>
                <div style="display: flex; align-items: center; gap: 0.5rem; color: white; font-size: 1.1rem;">
                    <span style="color: #f59e0b; font-weight: 600;">✓</span>
                    <span><?php echo esc_html($location['name'] ?? ''); ?></span>
                </div>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </div>
</section>

<!-- Reviews Section -->
<section class="section section-white">
    <div class="container">
        <div class="text-center mb-3">
            <h2>What People Say</h2>
            <p class="text-gray">Customer Reviews</p>
        </div>
        
        <?php 
        $reviews = $settings['reviews'] ?? [];
        if (!empty($reviews)): 
        ?>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            <?php foreach (array_slice($reviews, 0, 5) as $review): ?>
                <div class="review-card">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="width: 40px; height: 40px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
                            <?php echo strtoupper(substr($review['name'] ?? 'A', 0, 1)); ?>
                        </div>
                        <div>
                            <div style="font-weight: 600; color: #1f2937;"><?php echo esc_html($review['name'] ?? 'Anonymous'); ?></div>
                            <div style="font-size: 0.9rem; color: #6b7280;">Verified Customer</div>
                        </div>
                    </div>
                    <div style="color: #4b5563; line-height: 1.6; margin-bottom: 1rem;">
                        <?php echo esc_html($review['comment'] ?? 'Great service!'); ?>
                    </div>
                    <div style="color: #9ca3af; font-size: 0.9rem;">
                        — <?php echo esc_html($review['date'] ?? date('Y-m-d')); ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </div>
</section>

<!-- Commitment Section -->
<section class="section section-blue">
    <div class="container">
        <div class="grid-2">
            <div>
                <h2 class="text-white">Our Promise Of Reliability</h2>
                <p class="text-light mb-2">We promise to deliver exceptional service</p>
                <p class="text-light">
                    At <?php echo esc_html($business_name); ?> in <?php echo esc_html($settings['location'] ?? 'your area'); ?>, we're dedicated to providing reliable, high-quality <?php echo strtolower($settings['business_type'] ?? 'services'); ?> with integrity and care. From repairs to replacements, we ensure your property is in expert hands—on time, on budget, every time.
                </p>
            </div>
            <div class="text-center">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Our Commitment" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.2);">
            </div>
        </div>
    </div>
</section>

</body>
</html>
