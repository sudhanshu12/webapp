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

// Only get settings if function exists and don't trigger any debug
if (function_exists('bsg_get_settings')) {
    $settings = bsg_get_settings();
    if (is_array($settings) && !empty($settings)) {
        $business_name = $settings['business_name'] ?? 'Roofing Pros';
        $phone = $settings['phone'] ?? '8755026291';
        $email = $settings['email'] ?? 'sscexamsinfo@gmail.com';
        $hero_bg_image = $settings['hero_bg_image'] ?? $hero_bg_image;
        
        // Get about page specific content from wizard
        $about_description = $settings['about_page_who_description'] ?? $settings['about_description'] ?? '';
        $about_team_image = $settings['about_page_team_image'] ?? $settings['about_image'] ?? '';
        $about_hero_tagline = $settings['about_page_hero_tagline'] ?? 'ABOUT ' . strtoupper($business_name);
        $about_hero_title = $settings['about_page_hero_title'] ?? 'Professional roofing services you can count on';
    }
}

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
    .about-team-image { width: 100%; height: 400px; object-fit: contain; object-position: center; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); background: #f8fafc; }
    .about-why-section { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 80px 0; }
    .about-why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
    .about-why-card { background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; text-align: center; backdrop-filter: blur(10px); }
    .about-why-icon { width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem; }
    @media (max-width: 768px) {
        .about-grid-2 { grid-template-columns: 1fr; gap: 2rem; }
        .about-hero h1 { font-size: 2.5rem; }
        .about-section { padding: 60px 0; }
        .about-why-grid { grid-template-columns: 1fr; }
    }
</style>

<!-- Hero Section -->
<section class="about-hero">
    <div class="container">
        <h1><?php echo esc_html($about_hero_tagline); ?></h1>
        <p style="font-size: 1.2rem; margin: 0 0 2rem 0; color: white;">
            <?php echo esc_html($about_hero_title); ?>
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
                    if (!empty($about_description)) {
                        // Display the description from wizard (contains HTML formatting from the wizard)
                        echo $about_description;
                    } else {
                        // Fallback content if wizard description is empty
                        echo '<p>Welcome to <strong>' . esc_html($business_name) . '</strong>, Orlando\'s trusted roofing experts dedicated to providing top-quality roofing solutions. With years of experience and a commitment to excellence, we specialize in residential and commercial roofing, ensuring your property is protected against the elements.</p>';
                        echo '<p>Our skilled team utilizes the latest techniques and materials to deliver durable, aesthetically pleasing roofs that stand the test of time. We understand that your roof is one of the most important investments in your home, which is why we approach every project with meticulous attention to detail and unwavering commitment to quality.</p>';
                        echo '<h3 style="color: #1f2937; margin: 2rem 0 1rem 0; font-size: 1.5rem;">Why Choose ' . esc_html($business_name) . '?</h3>';
                        echo '<ul style="color: #4b5563; line-height: 1.8; margin: 0 0 1.5rem 0;">';
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
                
                <!-- Years of Experience -->
                <div class="about-experience-box">
                    <div class="about-experience-number">15</div>
                    <div class="about-experience-text">Years of Experience</div>
                </div>
                
                <a href="tel:<?php echo esc_attr($phone); ?>" class="about-btn">
                    📞 Call Us Today
                </a>
            </div>
            
            <!-- Team Image -->
            <div>
                <?php if (!empty($about_team_image)): ?>
                <img src="<?php echo esc_url($about_team_image); ?>" alt="About <?php echo esc_attr($business_name); ?>" class="about-team-image">
                <?php else: ?>
                <div class="about-team-image" style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; color: #6b7280; font-size: 1.2rem; border: 2px dashed #d1d5db;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">👥</div>
                    <div style="font-weight: 600; margin-bottom: 0.5rem;">Team Photo</div>
                    <div style="font-size: 0.9rem; text-align: center;">Upload team image in wizard</div>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</section>

<!-- Why Work With Us Section -->
<section class="about-why-section">
    <div class="container">
        <div style="text-align: center; margin-bottom: 3rem;">
            <h2 style="font-size: 2.5rem; font-weight: 800; margin: 0 0 1rem 0; color: white;">
                Why Work With Us?
            </h2>
            <p style="font-size: 1.2rem; color: rgba(255,255,255,0.9);">
                Benefits of Working with an Expert Team
            </p>
        </div>
        
        <div class="about-why-grid">
            <div class="about-why-card">
                <div class="about-why-icon">✓</div>
                <h3 style="color: white; margin-bottom: 1rem;">Quality Guarantee</h3>
                <p style="color: rgba(255,255,255,0.9);">We stand behind our work with comprehensive warranties and quality guarantees.</p>
            </div>
            
            <div class="about-why-card">
                <div class="about-why-icon">$</div>
                <h3 style="color: white; margin-bottom: 1rem;">Competitive Pricing</h3>
                <p style="color: rgba(255,255,255,0.9);">Fair, transparent pricing with no hidden costs or surprises.</p>
            </div>
            
            <div class="about-why-card">
                <div class="about-why-icon">📄</div>
                <h3 style="color: white; margin-bottom: 1rem;">Licensed & Insured</h3>
                <p style="color: rgba(255,255,255,0.9);">Fully licensed and insured for your peace of mind.</p>
            </div>
            
            <div class="about-why-card">
                <div class="about-why-icon">💻</div>
                <h3 style="color: white; margin-bottom: 1rem;">Modern Technology</h3>
                <p style="color: rgba(255,255,255,0.9);">Latest tools and techniques for superior results.</p>
            </div>
            
            <div class="about-why-card">
                <div class="about-why-icon">🎯</div>
                <h3 style="color: white; margin-bottom: 1rem;">Expert Team</h3>
                <p style="color: rgba(255,255,255,0.9);">Experienced professionals dedicated to excellence.</p>
            </div>
        </div>
    </div>
</section>

<!-- Reviews Section -->
<section class="about-section" style="background-color: #ffffff;">
    <div class="container">
        <div style="text-align: center; margin-bottom: 3rem;">
            <div style="background:#2ee6c5;color:#fff;display:inline-block;padding:4px 18px;border-radius:4px;font-size:1rem;letter-spacing:2px;font-weight:600;margin-bottom:8px;">
                CUSTOMER REVIEWS
            </div>
            <h2 style="font-size:2.5rem;font-weight:800;margin:0 0 0.5rem 0;line-height:1.1;letter-spacing:-1px;color: #111827;">
                What Our Customers Say
            </h2>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            <div style="background: #f9fafb; padding: 2rem; border-radius: 12px;">
                <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                    <div style="color: #fbbf24; font-size: 1.2rem;">★★★★★</div>
                    <span style="margin-left: 0.5rem; font-weight: 600;">Jackson Martin</span>
                </div>
                <p style="color: #4b5563; font-style: italic;">"Amazing experience with Roofing Pros from start to finish! Professional, reliable, and the results exceeded my expectations."</p>
            </div>
            
            <div style="background: #f9fafb; padding: 2rem; border-radius: 12px;">
                <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                    <div style="color: #fbbf24; font-size: 1.2rem;">★★★★★</div>
                    <span style="margin-left: 0.5rem; font-weight: 600;">Gabriel Perez</span>
                </div>
                <p style="color: #4b5563; font-style: italic;">"Great experience! Professional team, fair pricing, and excellent results. Would definitely recommend."</p>
            </div>
            
            <div style="background: #f9fafb; padding: 2rem; border-radius: 12px;">
                <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                    <div style="color: #fbbf24; font-size: 1.2rem;">★★★★★</div>
                    <span style="margin-left: 0.5rem; font-weight: 600;">Blake Miller</span>
                </div>
                <p style="color: #4b5563; font-style: italic;">"Highly recommend! Professional service and excellent results."</p>
            </div>
        </div>
    </div>
</section>

<!-- Commitment Section -->
<section class="about-section" style="<?php if (!empty($hero_bg_image)): ?>background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%), url('<?php echo esc_url($hero_bg_image); ?>'); background-size: cover; background-position: center;<?php else: ?>background: linear-gradient(135deg, #1f2937 0%, #374151 100%);<?php endif; ?> color: white;">
    <div class="container">
        <div style="text-align: center;">
            <div style="background:#2ee6c5;color:#fff;display:inline-block;padding:4px 18px;border-radius:4px;font-size:1rem;letter-spacing:2px;font-weight:600;margin-bottom:8px;">
                COMMITTED TO QUALITY
            </div>
            <h2 style="font-size:2.5rem;font-weight:800;margin:0 0 1rem 0;line-height:1.1;letter-spacing:-1px;color: white;">
                Our Promise Of Reliability
            </h2>
            <p style="font-size: 1.2rem; margin-bottom: 2rem; color: white;">
                At <?php echo esc_html($business_name); ?> in Orlando, we're dedicated to providing reliable, high-quality roofing services with integrity and care. From repairs to replacements, we ensure your roof is in expert hands—on time, on budget, every time.
            </p>
            <a href="tel:<?php echo esc_attr($phone); ?>" class="about-btn">
                📞 Request An Estimate
            </a>
        </div>
    </div>
</section>

<?php get_footer(); ?>