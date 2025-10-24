<?php
/**
 * Template Name: BSG About Page
 */

// Get settings using the proper function
$settings = bsg_get_settings();
$business_name = $settings['business_name'] ?? 'Roofing Pros';
$phone = $settings['phone'] ?? '';
$email = $settings['email'] ?? '';

// Force custom document title from wizard settings
add_filter('pre_get_document_title', function($title) use ($settings, $business_name) {
    return $settings['about_page_meta_title'] ?? 'About ' . $business_name . ' - Expert Roofing Services in Orlando';
}, 99);

// Add meta tags to head
add_action('wp_head', function() use ($settings, $business_name) {
    // Get meta tags from wizard settings
    $meta_title = $settings['about_page_meta_title'] ?? 'About ' . $business_name . ' - Professional Services & Team';
    $meta_description = $settings['about_page_meta_description'] ?? 'Learn about ' . $business_name . ' - our professional team, services, and commitment to excellence. Discover why we\'re the trusted choice for quality work.';
    $meta_keywords = $settings['about_page_meta_keywords'] ?? 'about us, professional services, team, company, business, quality work';
    
    echo '<title>' . esc_html($meta_title) . '</title>' . "\n";
    echo '<meta name="description" content="' . esc_attr($meta_description) . '">' . "\n";
    echo '<meta name="keywords" content="' . esc_attr($meta_keywords) . '">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($meta_title) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($meta_description) . '">' . "\n";
    echo '<meta property="og:type" content="website">' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr($meta_title) . '">' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr($meta_description) . '">' . "\n";
    echo '<link rel="canonical" href="' . esc_url(get_permalink()) . '">' . "\n";
}, 1);

get_header();
?>

<main>
    <!-- Hero Section (Same as location/service pages) -->
    <section class="hero-section animate-on-scroll-section" style="<?php if (!empty($settings['about_page_hero_bg_image'])): ?>background-image: linear-gradient(to left, transparent 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.7) 80%, rgba(255,255,255,3) 100%), url('<?php echo esc_url($settings['about_page_hero_bg_image']); ?>'); background-size: cover; background-position: center;<?php elseif (!empty($settings['hero_bg_image'])): ?>background-image: linear-gradient(to left, transparent 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.7) 80%, rgba(255,255,255,3) 100%), url('<?php echo esc_url($settings['hero_bg_image']); ?>'); background-size: cover; background-position: center;<?php else: ?>background-color: <?php echo esc_attr($settings['hero_bg_color'] ?? 'var(--surface-color)'); ?>;<?php endif; ?> padding: 90px 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 60px;">
            <div class="hero-content" style="margin-right: 20px;">
                <h1 style="color: <?php echo esc_attr($settings['about_hero_heading_color'] ?? $settings['hero_heading_color'] ?? '#000000'); ?>; white-space: normal; word-wrap: break-word; line-height: 1.2; font-size: 3.2rem; font-weight: 800; margin: 0 0 32px 0;">
                    <?php echo esc_html($settings['about_page_meta_title'] ?? 'About ' . $business_name); ?>
                </h1>
                <p style="color: <?php echo esc_attr($settings['about_hero_tagline_color'] ?? $settings['hero_tagline_color'] ?? '#4b5563'); ?>; font-size: 1.2rem; margin: 0 0 32px 0; line-height: 1.6;">
                    <?php echo esc_html($settings['about_page_meta_description'] ?? 'Your trusted partner for professional roofing services'); ?>
                </p>
                <div class="hero-actions">
                    <a href="tel:<?php echo esc_attr($phone); ?>" class="btn btn-dark" style="background: #f59e0b; color: #ffffff; display:inline-flex; align-items:center; justify-content:center; gap:0.6rem; width:100%; max-width:520px; border-radius:10px; padding:1rem 1.25rem; font-weight:700; font-size:1.1rem;">
                        <i class="fa-solid fa-phone"></i> Call us Today
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- About Description and Team Image Side by Side -->
    <section class="about-content-section" style="background: #ffffff; padding: 80px 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div class="about-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
                <!-- Content -->
                <div class="about-content">
                    <h2 style="color: #1f2937; font-size: 2.5rem; font-weight: 700; margin: 0 0 1.5rem 0;">About <?php echo esc_html($business_name); ?></h2>
                    <div style="color: #4b5563; font-size: 1.1rem; line-height: 1.7; margin-bottom: 2rem;">
                        <?php 
                        $about_content = $settings['about_page_who_description'] ?? $settings['about_description'] ?? '';
                        if (!empty($about_content)) {
                            echo wp_kses_post($about_content);
                        } else {
                            echo '<p>With over ' . ($settings['about_years'] ?? '15') . ' years of experience in the ' . strtolower($settings['business_type'] ?? 'roofing') . ' industry, ' . $business_name . ' brings unparalleled expertise and quality service to the residents of ' . ($settings['location'] ?? 'your area') . '. Our team is dedicated to delivering exceptional results that exceed your expectations.</p>';
                            echo '<p>At ' . $business_name . ', we understand the common challenges faced by property owners when it comes to maintaining and improving their properties. That\'s why we offer a range of ' . strtolower($settings['business_type'] ?? 'roofing') . ' services tailored to meet your specific needs, ensuring your satisfaction with every project.</p>';
                        }
                        ?>
                    </div>
                    
                    <!-- Years of Experience -->
                    <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; text-align: center; margin-bottom: 2rem;">
                        <div style="font-size: 3rem; font-weight: 800; color: #f59e0b; margin: 0;"><?php echo esc_html($settings['about_years'] ?? '15'); ?></div>
                        <div style="color: #4b5563; font-size: 1.1rem; font-weight: 600;">Years of Experience</div>
                    </div>
                    
                    <a href="tel:<?php echo esc_attr($phone); ?>" class="btn" style="background: #f59e0b; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; font-size: 1.1rem;">
                        <i class="fa-solid fa-phone"></i> Call Us Today
                    </a>
                </div>
                
                <!-- Team Image -->
                <div class="about-image" style="border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
                    <?php 
                    $about_image = $settings['about_page_team_image'] ?? $settings['about_image'] ?? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
                    ?>
                    <img src="<?php echo esc_url($about_image); ?>" alt="About <?php echo esc_attr($business_name); ?>" style="width: 100%; height: 500px; object-fit: cover;" loading="lazy" decoding="async">
                </div>
            </div>
        </div>
    </section>

    <!-- Why Work With Us Section (5 items) -->
    <section class="why-work-section" style="background: #f8fafc; padding: 80px 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="text-align: center; margin-bottom: 3rem;">
                <h2 style="color: #1f2937; font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0;">Why Work With Us?</h2>
                <p style="color: #6b7280; font-size: 1.2rem; margin: 0;">Benefits of Working with an Expert Team</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                <div style="text-align: center; padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    <div style="width: 60px; height: 60px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem;">✓</div>
                    <h3 style="color: #1f2937; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">Proven Expertise</h3>
                    <p style="color: #6b7280; margin: 0;">Years of successful delivery.</p>
                </div>
                
                <div style="text-align: center; padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    <div style="width: 60px; height: 60px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem;">⚙️</div>
                    <h3 style="color: #1f2937; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">Tailored Solutions</h3>
                    <p style="color: #6b7280; margin: 0;">Built for your unique needs.</p>
                </div>
                
                <div style="text-align: center; padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    <div style="width: 60px; height: 60px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem;">🎯</div>
                    <h3 style="color: #1f2937; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">End-to-End Support</h3>
                    <p style="color: #6b7280; margin: 0;">Guidance at every step.</p>
                </div>
                
                <div style="text-align: center; padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    <div style="width: 60px; height: 60px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem;">💻</div>
                    <h3 style="color: #1f2937; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">Cutting-Edge Technology</h3>
                    <p style="color: #6b7280; margin: 0;">Modern, reliable, scalable systems.</p>
                </div>
                
                <div style="text-align: center; padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    <div style="width: 60px; height: 60px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem;">📊</div>
                    <h3 style="color: #1f2937; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;">Results-Driven</h3>
                    <p style="color: #6b7280; margin: 0;">Focused on measurable business impact.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Reviews Section -->
    <section class="reviews-section" style="background: #ffffff; padding: 80px 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="text-align: center; margin-bottom: 3rem;">
                <h2 style="color: #1f2937; font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0;">What People Say</h2>
                <p style="color: #6b7280; font-size: 1.2rem; margin: 0;">Customer Reviews</p>
            </div>
            
            <?php 
            $reviews = $settings['reviews'] ?? [];
            if (!empty($reviews)): 
            ?>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <?php foreach (array_slice($reviews, 0, 5) as $review): ?>
                    <div style="background: #f8fafc; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
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

    <!-- Services Section -->
    <section class="services-section" style="background: #f8fafc; padding: 80px 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="text-align: center; margin-bottom: 3rem;">
                <h2 style="color: #1f2937; font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0;">Our Services</h2>
                <p style="color: #6b7280; font-size: 1.2rem; margin: 0;">Professional <?php echo strtolower($settings['business_type'] ?? 'roofing'); ?> services tailored to your needs</p>
            </div>
            
            <?php 
            $services = $settings['services'] ?? [];
            if (!empty($services)): 
            ?>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                <?php foreach (array_slice($services, 0, 6) as $service): ?>
                    <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center;">
                        <div style="width: 60px; height: 60px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem;">
                            <?php echo esc_html($service['icon'] ?? '🏠'); ?>
                        </div>
                        <h3 style="color: #1f2937; font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0;"><?php echo esc_html($service['name'] ?? ''); ?></h3>
                        <p style="color: #6b7280; margin: 0; font-size: 0.9rem;"><?php echo esc_html($service['description'] ?? ''); ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
        </div>
    </section>

    <!-- Commitment Section -->
    <section class="commitment-section" style="background: #1e3a8a; color: white; padding: 80px 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
                <div>
                    <h2 style="color: white; font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0;">Our Promise Of Reliability</h2>
                    <p style="color: #d1d5db; font-size: 1.2rem; margin: 0 0 2rem 0;">We promise to deliver exceptional service</p>
                    <div style="color: #e5e7eb; font-size: 1.1rem; line-height: 1.7;">
                        At <?php echo esc_html($business_name); ?> in <?php echo esc_html($settings['location'] ?? 'your area'); ?>, we're dedicated to providing reliable, high-quality <?php echo strtolower($settings['business_type'] ?? 'services'); ?> with integrity and care. From repairs to replacements, we ensure your property is in expert hands—on time, on budget, every time.
                    </div>
                </div>
                <div style="text-align: center;">
                    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Our Commitment" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.2);" loading="lazy" decoding="async">
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>