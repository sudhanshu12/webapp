<?php
/**
 * Template Name: BSG About Page
 */

// Get basic settings without triggering debug functions
$business_name = 'Roofing Pros';
$phone = '8755026291';
$email = 'sscexamsinfo@gmail.com';
$hero_bg_image = '';
$about_description = '';
$about_team_image = '';
$about_hero_tagline = '';
$about_hero_title = '';

// Initialize meta variables with defaults
$meta_title = '';
$meta_description = '';
$meta_keywords = '';

// Initialize color variables with defaults
$about_who_h2_color = '#000000';
$about_who_description_color = '#4b5563';
$why_h2_color = '#ffffff';
$why_subtitle_color = 'rgba(255,255,255,0.9)';
$why_item_title_color = '#ffffff';
$why_item_description_color = 'rgba(255,255,255,0.9)';
$reviews_text_color = '#000000';


// Initialize Who We Are section variables with defaults
$about_page_who_we_are_headline = 'About Our Company';
$about_page_who_we_are_tagline = 'WHO WE ARE';


// Only get settings if function exists and don't trigger any debug
if (function_exists('bsg_get_settings')) {
    $settings = bsg_get_settings();
    if (is_array($settings) && !empty($settings)) {
        $business_name = $settings['business_name'] ?? 'Roofing Pros';
        $phone = $settings['phone'] ?? '8755026291';
        $email = $settings['email'] ?? 'sscexamsinfo@gmail.com';
        $hero_bg_image = $settings['hero_bg_image'] ?? $hero_bg_image;
        
        // Get meta data from wizard - prioritize about page meta section
        $meta_title = $settings['about_page_meta_title'] ?? $settings['about_meta_title'] ?? 'About ' . $business_name . ' - Professional Services';
        $meta_description = $settings['about_page_meta_description'] ?? $settings['about_meta_description'] ?? 'Learn about ' . $business_name . ' and our professional services. Contact us for expert solutions.';
        $meta_keywords = $settings['about_page_meta_keywords'] ?? $settings['about_meta_keywords'] ?? 'about, company, services, professional';
        
        
        // Get about page specific content from wizard
        $about_description = $settings['about_page_who_description'] ?? $settings['about_description'] ?? '';
        $about_team_image = $settings['about_page_team_image'] ?? $settings['about_image'] ?? '';
        $about_hero_tagline = $settings['about_page_hero_tagline'] ?? 'ABOUT ' . strtoupper($business_name);
        $about_hero_title = $settings['about_page_hero_title'] ?? 'Professional roofing services you can count on';
        
        // Get color settings from wizard
        $about_who_h2_color = $settings['about_page_who_we_are_text_color'] ?? '#000000';
        $about_who_tagline_color = $settings['about_page_who_we_are_tagline_color'] ?? '#14B8A6';
        $about_who_description_color = $settings['about_page_who_we_are_description_color'] ?? '#4b5563';
        $why_h2_color = $settings['about_page_why_work_with_us_heading_color'] ?? '#ffffff';
        $why_subtitle_color = $settings['about_page_why_work_with_us_subtitle_color'] ?? 'rgba(255,255,255,0.9)';
        $why_item_title_color = $settings['about_page_why_work_with_us_item_title_color'] ?? '#ffffff';
        $why_item_description_color = $settings['about_page_why_work_with_us_item_description_color'] ?? 'rgba(255,255,255,0.9)';
        $reviews_text_color = $settings['about_page_reviews_text_color'] ?? '#000000';
        
        
        // Get Who We Are section settings from wizard
        $about_page_who_we_are_tagline = $settings['about_page_who_we_are_tagline'] ?? 'WHO WE ARE';
        $about_page_who_we_are_headline = $settings['about_page_who_we_are_headline'] ?? 'About Our Company';
    }
}

// Override WordPress title and meta tags
add_filter('wp_title', function($title) use ($meta_title) {
    return $meta_title;
}, 10, 1);

add_filter('document_title_parts', function($title_parts) use ($meta_title) {
    $title_parts['title'] = $meta_title;
    return $title_parts;
}, 10, 1);

// Set meta tags with high priority to override WordPress defaults
add_action('wp_head', function() use ($meta_title, $meta_description, $meta_keywords, $business_name) {
    echo '<title>' . esc_html($meta_title) . '</title>' . "\n";
    echo '<meta name="description" content="' . esc_attr($meta_description) . '">' . "\n";
    echo '<meta name="keywords" content="' . esc_attr($meta_keywords) . '">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($meta_title) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($meta_description) . '">' . "\n";
    echo '<meta property="og:type" content="website">' . "\n";
    echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr($meta_title) . '">' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr($meta_description) . '">' . "\n";
}, 1);

get_header();
?>

    <style>
    .about-hero { 
        <?php if (!empty($hero_bg_image)): ?>
        background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%), 
                   url('<?php echo esc_url($hero_bg_image); ?>'); 
        background-size: cover; 
        background-position: center; 
        <?php else: ?>
        background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
        <?php endif; ?>
        color: white; 
        padding: 90px 0 !important;
        min-height: 80vh !important;
        text-align: center; 
    }
    .about-hero h1 { font-size: 3.5rem; font-weight: 800; margin: 0 0 1rem 0; color: white; }
    .about-hero h2 { font-size: 2rem; font-weight: 600; margin: 0 0 2rem 0; color: white; opacity: 0.9; }
    .about-btn { background: #f59e0b; color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; }
    .about-section { padding: 80px 0; }
    .about-section-white { background: #fff; }
    .about-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
    .about-experience-box { background: #f8fafc; padding: 1.5rem; border-radius: 8px; text-align: center; margin-bottom: 2rem; }
    .about-experience-number { font-size: 3rem; font-weight: 800; color: #f59e0b; margin: 0; }
    .about-experience-text { color: #4b5563; font-size: 1.1rem; font-weight: 600; }
    .about-team-image { 
        width: 100%; 
        max-width: 400px; 
        height: 500px; 
        object-fit: cover; 
        object-position: center; 
        border-radius: 12px; 
        background: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .about-why-section { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 80px 0; }
    .about-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 2rem; }
    .about-why-grid .about-why-card:nth-child(4), .about-why-grid .about-why-card:nth-child(5) { 
        grid-column: span 1; 
        justify-self: center; 
        max-width: 300px; 
    }
    .about-why-card { background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; text-align: center; backdrop-filter: blur(10px); }
    .about-why-icon { width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem; }
    .about-why-section h2 { color: <?php echo esc_attr($why_h2_color); ?> !important; }
    .about-why-section h3 { color: <?php echo esc_attr($why_item_title_color); ?> !important; }
    .about-why-section p { color: <?php echo esc_attr($why_item_description_color); ?> !important; }
    .about-description { 
        line-height: 1.6; 
        margin-bottom: 2rem; 
        color: <?php echo esc_attr($about_who_description_color); ?>; 
        font-size: 1rem; 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }
    .about-description p { 
        margin-bottom: 1rem; 
        color: <?php echo esc_attr($about_who_description_color); ?>; 
        font-size: 1rem !important; 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
        line-height: 1.6 !important;
    }
    .about-description h1, .about-description h2, .about-description h3, .about-description h4, .about-description h5, .about-description h6 { 
        color: #000000 !important; 
        font-size: 1.8rem !important;
        font-weight: 700 !important;
        margin: 1.5rem 0 0.5rem 0 !important;
    }
    .about-description h3 { 
        color: #000000 !important; 
        margin: 1.5rem 0 0.5rem 0; 
        font-size: 1.8rem !important; 
        font-weight: 700 !important; 
    }
    .about-description ul { 
        color: <?php echo esc_attr($about_who_description_color); ?>; 
        line-height: 1.6; 
        margin: 0 0 1rem 0; 
        font-size: 1rem !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
    }
    .about-description li { 
        margin-bottom: 0.25rem; 
        color: <?php echo esc_attr($about_who_description_color); ?>; 
        font-size: 1rem !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
        line-height: 1.6 !important;
    }
    .about-description strong { 
        color: #000000 !important; 
        font-weight: 700; 
        font-size: 1rem !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
    }
    
    /* Hide any WHO WE ARE text that appears in description */
    .about-description p:first-child {
        display: none !important;
    }
    
    /* Hide any WHO WE ARE text in description */
    .about-description p:contains("WHO WE ARE") {
        display: none !important;
    }
    
    /* Ensure only paragraph text has consistent styling, not headings */
    .about-description p {
        font-size: 1rem !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
        line-height: 1.6 !important;
        color: <?php echo esc_attr($about_who_description_color); ?> !important;
    }
    
    .about-description li {
        font-size: 1rem !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
        line-height: 1.6 !important;
        color: <?php echo esc_attr($about_who_description_color); ?> !important;
    }
    
    /* Override any inline styles that might come from wizard content */
    .about-description p[style] {
        font-size: 1rem !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
        line-height: 1.6 !important;
        color: <?php echo esc_attr($about_who_description_color); ?> !important;
    }
    
    /* Style for Ready to Get Started section */
    .about-cta-section {
        text-align: left;
        background: #f8f9fa;
        padding: 2rem;
        border-radius: 12px;
        border: 1px solid #e9ecef;
        width: 600px;
        height: 240px;
        margin: 2rem auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
    }
    
    .about-cta-section h3 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #000000 !important;
        margin: 0 0 1rem 0;
    }
    
    .about-cta-section p {
        margin: 0 0 1.5rem 0;
        line-height: 1.6;
        color: #34495e;
    }
    
    .about-cta-section .contact-info {
        margin: 0;
        font-size: 1.1rem;
        color: #7f8c8d;
    }
    
    .about-cta-section .contact-info strong {
        color: #2c3e50;
    }
    
    /* Animation styles from homepage - Slower and more visible */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes heroContentFadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes heroElementSlideUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes heroActionsSlideUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Scroll-triggered animation classes - Slower and more visible */
    .animate-on-scroll-section {
        opacity: 0;
        transform: translateY(60px);
        transition: opacity 1.2s ease, transform 1.2s ease;
    }
    
    .animate-on-scroll-section.animated {
        opacity: 1;
        transform: translateY(0);
        animation: fadeInUp 1.2s ease forwards;
    }
    
    /* Debug indicator - shows when animation is working */
    .animate-on-scroll-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, #f97316, #22d3aa);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .animate-on-scroll-section.animated::before {
        opacity: 1;
    }
    
    /* Hero Animation Styles - Advanced Staggered Sequence */
    .about-hero .hero-content {
        opacity: 0;
        transform: translateY(40px);
        animation: heroContentFadeIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
    }
    
    .about-hero h1 {
        opacity: 0;
        transform: translateY(40px) scale(0.98);
        animation: heroElementSlideUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s forwards;
    }
    
    /* Fallback to ensure h1 is visible */
    .about-hero h1.animated {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
    }
    
    /* Force hero tagline to be visible */
    .about-hero h1 {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
        animation: none !important;
    }
    
    .about-hero h2 {
        opacity: 0;
        transform: translateY(35px) scale(0.95);
        animation: heroElementSlideUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s forwards;
    }
    
    .about-hero .about-btn {
        opacity: 0;
        transform: translateY(35px) scale(0.95);
        animation: heroActionsSlideUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1s forwards;
    }
    
    @media (max-width: 768px) {
        .about-hero h1 { font-size: 2.5rem; }
        .about-section { padding: 60px 0; }
        .about-why-grid { grid-template-columns: 1fr; }
        .about-grid-2 { grid-template-columns: 1fr; gap: 2rem; }
        .about-cta-section {
            margin: 1rem auto;
            padding: 1.5rem;
            width: 90%;
            height: auto;
            min-height: 200px;
            }
        }
    </style>

<!-- Hero Section -->
<section class="about-hero">
    <div class="container">
        <div class="hero-content">
            <h1 style="opacity: 1 !important; transform: translateY(0) scale(1) !important; animation: none !important;"><?php echo esc_html($about_hero_tagline ?: 'ABOUT ' . strtoupper($business_name)); ?></h1>
            <h2 style="opacity: 1 !important; transform: translateY(0) scale(1) !important; animation: none !important;"><?php echo esc_html($about_hero_title); ?></h2>
            <a href="tel:<?php echo esc_attr($phone); ?>" class="about-btn" style="opacity: 1 !important; transform: translateY(0) scale(1) !important; animation: none !important;">
                📞 Call (<?php echo esc_attr($phone); ?>)
            </a>
        </div>
    </div>
</section>

<!-- About Our Company Section - Directly below hero -->
<section class="about-section about-section-white animate-on-scroll-section" style="padding: 60px 0;">
    <div class="container">
        <div style="text-align: center; margin-bottom: 3rem;">
            <!-- WHO WE ARE Tagline -->
            <div style="display: flex; align-items: center; margin-bottom: 1rem; justify-content: center;">
                <span style="color: <?php echo esc_attr($about_who_tagline_color); ?>; font-size: 1rem; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">👤 <?php echo esc_html($about_page_who_we_are_tagline); ?></span>
            </div>
            
            <!-- Main Heading -->
            <h2 style="color: <?php echo esc_attr($about_who_h2_color); ?> !important; font-size: 3rem; font-weight: 800; margin-bottom: 2rem; text-shadow: none;"><?php echo esc_html($about_page_who_we_are_headline); ?></h2>
        </div>
        
        <div class="about-grid-2">
            <!-- Team Image on Left -->
            <?php if (!empty($about_team_image)): ?>
            <div style="text-align: center; display: flex; align-items: center; justify-content: center;">
                <img src="<?php echo esc_url($about_team_image); ?>" alt="About <?php echo esc_attr($business_name); ?>" class="about-team-image" style="max-width: 100%; height: auto;">
            </div>
            <?php else: ?>
            <div style="text-align: center; background: #f8f9fa; border-radius: 12px; padding: 2rem; display: flex; align-items: center; justify-content: center; min-height: 400px;">
                <div style="text-align: center; color: #6b7280;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">👥</div>
                    <p style="margin: 0; font-size: 1.1rem;">Team Image</p>
                    <p style="margin: 0; font-size: 0.9rem; opacity: 0.7;">Add your team photo in the wizard</p>
                </div>
            </div>
            <?php endif; ?>
            
            <!-- Content on Right -->
            <div>
                <!-- Description -->
                <div class="about-description" style="font-size: 1rem !important; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important; line-height: 1.6 !important; text-align: left;">
                    <?php 
                    if (!empty($about_description)) {
                        // Display the description from wizard (contains HTML formatting from the wizard)
                        echo $about_description;
                    } else {
                        // Fallback content if wizard description is empty
                        echo '<p>Welcome to <strong>' . esc_html($business_name) . '</strong>, Orlando\'s trusted roofing experts dedicated to providing top-quality roofing solutions. With years of experience and a commitment to excellence, we specialize in residential and commercial roofing, ensuring your property is protected against the elements.</p>';
                        echo '<p>Our skilled team utilizes the latest techniques and materials to deliver durable, aesthetically pleasing roofs that stand the test of time. We understand that your roof is one of the most important investments in your home, which is why we approach every project with meticulous attention to detail and unwavering commitment to quality.</p>';
                        echo '<h3>Why Choose ' . esc_html($business_name) . '?</h3>';
                        echo '<ul>';
                        echo '<li><strong>Expert Craftsmanship:</strong> Our team brings years of experience and professional expertise to every project</li>';
                        echo '<li><strong>Quality Materials:</strong> We use only the finest materials from trusted manufacturers</li>';
                        echo '<li><strong>Licensed & Insured:</strong> Fully licensed and insured for your peace of mind</li>';
                        echo '<li><strong>Competitive Pricing:</strong> Fair, transparent pricing with no hidden costs</li>';
                        echo '<li><strong>Customer Satisfaction:</strong> We stand behind our work with comprehensive warranties</li>';
                        echo '</ul>';
                        echo '<p>Let us enhance your home\'s value and curb appeal—call us today at <strong>' . esc_html($phone) . '</strong> for a free consultation!</p>';
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Why Work With Us Section -->
<section class="why-work-with-us animate-on-scroll-section animated" style="padding: 5rem 0; background: <?php echo esc_attr($settings['button_primary_color'] ?? '#f59e0b'); ?>; position: relative; overflow: hidden;">
    <!-- Background Pattern -->
    <div style="position: absolute; top: 0; right: 0; width: 300px; height: 100%; background: linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.08) 50%, transparent 70%); transform: skewX(-15deg);"></div>
    
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; position: relative; z-index: 2;">
        <div style="text-align: center; margin-bottom: 4rem;">
            <h2 style="color: #ffffff; font-size: 3rem; font-weight: 800; margin-bottom: 0.75rem; letter-spacing: -0.5px; line-height: 1.1;">Why Work With Us?</h2>
            <p style="color: #ffffff; font-size: 1.25rem; margin: 0; font-weight: 500;">Benefits of Working with an Expert Team</p>
                    </div>
                    
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4rem; margin-top: 4rem; max-width: 1000px; margin-left: auto; margin-right: auto;">
            <!-- First row: 3 items -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4rem; justify-items: center;">
            <!-- Proven Expertise -->
            <div class="benefit-item animated" style="text-align: center;">
                <div style="width: 60px; height: 60px; background: #fbbf24; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; border: 1px solid rgba(255, 255, 255, 0.3);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"></path>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
                            </svg>
                </div>
                <h3 style="color: #ffffff; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; letter-spacing: -0.1px; white-space: nowrap;">Proven Expertise</h3>
                <p style="color: #ffffff; margin: 0; line-height: 1.4; font-size: 0.9rem; font-weight: 400; white-space: nowrap;">Years of successful delivery.</p>
                        </div>
                        
            <!-- Tailored Solutions -->
            <div class="benefit-item animated" style="text-align: center;">
                <div style="width: 60px; height: 60px; background: #fbbf24; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; border: 1px solid rgba(255, 255, 255, 0.3);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        <path d="M9 12l2 2 4-4"></path>
                    </svg>
                </div>
                <h3 style="color: #ffffff; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; letter-spacing: -0.1px; white-space: nowrap;">Tailored Solutions</h3>
                <p style="color: #ffffff; margin: 0; line-height: 1.4; font-size: 0.9rem; font-weight: 400; white-space: nowrap;">Built for your unique needs.</p>
            </div>

            <!-- End-to-End Support -->
            <div class="benefit-item animated" style="text-align: center;">
                <div style="width: 60px; height: 60px; background: #fbbf24; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; border: 1px solid rgba(255, 255, 255, 0.3);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10,9 9,9 8,9"></polyline>
                        <path d="M9 12l2 2 4-4"></path>
                    </svg>
                </div>
                <h3 style="color: #ffffff; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; letter-spacing: -0.1px; white-space: nowrap;">End-to-End Support</h3>
                <p style="color: #ffffff; margin: 0; line-height: 1.4; font-size: 0.9rem; font-weight: 400; white-space: nowrap;">Guidance at every step.</p>
            </div>
                        </div>
                        
            <!-- Second row: 2 items centered -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; justify-items: center; max-width: 600px;">

            <!-- Cutting-Edge Technology -->
            <div class="benefit-item animated" style="text-align: center;">
                <div style="width: 60px; height: 60px; background: #fbbf24; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; border: 1px solid rgba(255, 255, 255, 0.3);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                        <circle cx="12" cy="9" r="1"></circle>
                        <path d="M8 9h8"></path>
                    </svg>
                </div>
                <h3 style="color: #ffffff; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; letter-spacing: -0.1px; white-space: nowrap;">Cutting-Edge Technology</h3>
                <p style="color: #ffffff; margin: 0; line-height: 1.4; font-size: 0.9rem; font-weight: 400; white-space: nowrap;">Modern, reliable, scalable systems.</p>
                            </div>
                            
            <!-- Results-Driven -->
            <div class="benefit-item animated" style="text-align: center;">
                <div style="width: 60px; height: 60px; background: #fbbf24; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; border: 1px solid rgba(255, 255, 255, 0.3);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="6"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                </div>
                <h3 style="color: #ffffff; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; letter-spacing: -0.1px; white-space: nowrap;">Results-Driven</h3>
                <p style="color: #ffffff; margin: 0; line-height: 1.4; font-size: 0.9rem; font-weight: 400; white-space: nowrap;">Focused on measurable business impact.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

<!-- Service Section removed -->

<!-- Service Areas Section -->
                                <?php
// Debug: Check if section-areas.php exists and is readable
if (file_exists(dirname(__FILE__) . '/section-areas.php')) {
    include dirname(__FILE__) . '/section-areas.php';
                                            } else {
    echo '<!-- section-areas.php not found -->';
}
?>

<!-- Reviews Section -->
                    <?php
// Debug: Check if section-reviews.php exists and is readable
if (file_exists(dirname(__FILE__) . '/section-reviews.php')) {
    include dirname(__FILE__) . '/section-reviews.php';
                } else {
    echo '<!-- section-reviews.php not found -->';
}
?>

<!-- Commitment Section -->
                    <?php
// Debug: Check if section-commitment.php exists and is readable
if (file_exists(dirname(__FILE__) . '/section-commitment.php')) {
    include dirname(__FILE__) . '/section-commitment.php';
} else {
    echo '<!-- section-commitment.php not found -->';
}
?>

       <script>
       // Enhanced Scroll Animation for About Page (same as homepage)
       document.addEventListener('DOMContentLoaded', function() {
           console.log('🎬 About page animation script loaded successfully');
           
           // Force consistent styling for about description
           function forceAboutDescriptionStyling() {
               const aboutDesc = document.querySelector('.about-description');
               if (aboutDesc) {
                   // Hide any WHO WE ARE text in description
                   const allParagraphs = aboutDesc.querySelectorAll('p');
                   allParagraphs.forEach(p => {
                       if (p.textContent.includes('WHO WE ARE')) {
                           p.style.display = 'none';
                       }
                   });
                   
                   // Force styling on all child elements
                   const allElements = aboutDesc.querySelectorAll('*');
                   allElements.forEach(element => {
                       element.style.fontSize = '1rem';
                       element.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif';
                       element.style.lineHeight = '1.6';
                   });
                   
                   // Force styling on the container itself
                   aboutDesc.style.fontSize = '1rem';
                   aboutDesc.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif';
                   aboutDesc.style.lineHeight = '1.6';
               }
           }
           
           // Apply styling immediately and after a delay
           forceAboutDescriptionStyling();
           setTimeout(forceAboutDescriptionStyling, 100);
           setTimeout(forceAboutDescriptionStyling, 500);
           
           // Enhanced scroll-triggered animations with better timing
           function animateOnScroll() {
               const sections = document.querySelectorAll('.animate-on-scroll-section');
               
               sections.forEach((section, index) => {
                   const rect = section.getBoundingClientRect();
                   const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
                   
                   if (isVisible && !section.classList.contains('animated')) {
                       // Add staggered delay for better visual effect
                       setTimeout(() => {
                           section.classList.add('animated');
                       }, index * 200); // 200ms delay between each section
                   }
               });
           }
           
           // Make function globally available
           window.animateOnScroll = animateOnScroll;
           
           // Add scroll listener with throttling for better performance
           let ticking = false;
           function requestTick() {
               if (!ticking) {
                   requestAnimationFrame(animateOnScroll);
                   ticking = true;
                   setTimeout(() => { ticking = false; }, 100);
               }
           }
           
           window.addEventListener('scroll', requestTick);
           
           // Run immediately and after delays to ensure all sections are animated
           animateOnScroll();
           setTimeout(animateOnScroll, 300);
           setTimeout(animateOnScroll, 800);
           setTimeout(animateOnScroll, 1500);
           
           // Fallback to ensure hero elements are visible
           setTimeout(function() {
               const heroH1 = document.querySelector('.about-hero h1');
               const heroH2 = document.querySelector('.about-hero h2');
               const heroBtn = document.querySelector('.about-hero .about-btn');
               
               if (heroH1 && heroH1.style.opacity === '0') {
                   heroH1.style.opacity = '1';
                   heroH1.style.transform = 'translateY(0) scale(1)';
               }
               if (heroH2 && heroH2.style.opacity === '0') {
                   heroH2.style.opacity = '1';
                   heroH2.style.transform = 'translateY(0) scale(1)';
               }
               if (heroBtn && heroBtn.style.opacity === '0') {
                   heroBtn.style.opacity = '1';
                   heroBtn.style.transform = 'translateY(0) scale(1)';
               }
           }, 2000);
           
           console.log('🚀 About page animations initialized and ready');
       });
       </script>

<?php get_footer(); ?>