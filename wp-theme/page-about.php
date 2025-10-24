<?php
/**
 * Template Name: BSG About Page
 */

// Get basic settings without debug output
$business_name = 'Roofing Pros';
$phone = '8755026291';
$email = 'sscexamsinfo@gmail.com';

// Try to get settings safely
if (function_exists('bsg_get_settings')) {
    $settings = bsg_get_settings();
    $business_name = $settings['business_name'] ?? 'Roofing Pros';
    $phone = $settings['phone'] ?? '8755026291';
    $email = $settings['email'] ?? 'sscexamsinfo@gmail.com';
}

get_header();
?>

<style>
    .about-hero { 
        background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%), 
                   url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'); 
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
        <h1>ABOUT <?php echo esc_html($business_name); ?></h1>
        <p style="font-size: 1.2rem; margin: 0 0 2rem 0; color: white;">
            Professional roofing services you can count on
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
                    <p>Welcome to <?php echo esc_html($business_name); ?>, Orlando's trusted roofing experts dedicated to providing top-quality roofing solutions. With years of experience and a commitment to excellence, we specialize in residential and commercial roofing, ensuring your property is protected against the elements. Our skilled team utilizes the latest techniques and materials to deliver durable, aesthetically pleasing roofs.</p>
                    
                    <h3>Why Choose Us</h3>
                    <p>Customers choose <?php echo esc_html($business_name); ?> for our unwavering dedication to quality, reliability, and customer satisfaction. We offer personalized service, competitive pricing, and a warranty you can trust. Let us enhance your home's value and curb appeal—call us today at <?php echo esc_html($phone); ?>!</p>
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
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="About <?php echo esc_attr($business_name); ?>" class="about-team-image">
            </div>
        </div>
    </div>
</section>

<!-- Services Section -->
<section class="about-section" style="background-color: #313746; color: white;">
    <div class="container">
        <div style="text-align: center; margin-bottom: 3rem;">
            <div style="background:#2ee6c5;color:#fff;display:inline-block;padding:4px 18px;border-radius:4px;font-size:1rem;letter-spacing:2px;font-weight:600;margin-bottom:8px;">
                TOP RATED SERVICES
            </div>
            <h2 style="font-size:2.5rem;font-weight:800;margin:0 0 0.5rem 0;line-height:1.1;letter-spacing:-1px;color: white;">
                Our Services
            </h2>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            <div style="background: #232834; padding: 2rem; border-radius: 12px; text-align: center;">
                <div style="width: 60px; height: 60px; background: #2ee6c5; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem;">🌱</div>
                <h3 style="color: white; margin-bottom: 1rem;">Roof Repair</h3>
                <p style="color: #d1d5db;">Professional roof repair services to fix leaks, damage, and maintain your roof's integrity.</p>
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
        </div>
    </div>
</section>

<!-- Commitment Section -->
<section class="about-section" style="background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'); background-size: cover; background-position: center; color: white;">
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