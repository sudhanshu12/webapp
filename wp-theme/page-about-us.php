<?php
/**
 * Template Name: About Us Page
 * 
 * This template displays the about us page with all sections
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

    /* About Content Section - Side by Side Layout */
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
        align-items: flex-start;
        min-height: 500px;
    }
    .about-image-wrapper {
        width: 100%;
        height: 500px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        position: sticky;
        top: 20px;
        background: #f8f9fa;
        border: 2px solid #e9ecef;
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
    .about-description-content h3 {
        color: #1f2937;
        font-size: 1.5rem;
        font-weight: 600;
        margin: 2rem 0 1rem 0;
        border-left: 4px solid #14b8a6;
        padding-left: 1rem;
    }
    .about-description-content ul {
        margin: 1rem 0;
        padding-left: 1.5rem;
    }
    .about-description-content li {
        margin-bottom: 0.5rem;
        color: #374151;
    }
    .about-description-content p {
        margin-bottom: 1rem;
        color: #374151;
    }

    /* Ready to Get Started Box - Big Centered Rectangle */
    .ready-to-start-box {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 12px;
        padding: 3rem;
        margin: 4rem auto;
        max-width: 1200px;
        width: 90%;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 3rem;
        justify-content: center;
        text-align: center;
        min-height: 200px;
    }
    .ready-to-start-content {
        flex: 1;
    }
    .ready-to-start-box h3 {
        color: #1f2937;
        font-size: 2rem;
        font-weight: 700;
        margin: 0 0 1.5rem 0;
        text-align: center;
    }
    .ready-to-start-box p {
        color: #374151;
        margin-bottom: 1.5rem;
        line-height: 1.7;
        text-align: center;
        font-size: 1.1rem;
    }
    .ready-to-start-box .contact-info {
        font-size: 1.3rem;
        color: #1f2937;
        font-weight: 700;
        text-align: center;
    }
    .ready-to-start-cta {
        flex: 0 0 auto;
        text-align: center;
    }
    .ready-to-start-cta .cta-button {
        display: inline-block;
        background: #4f46e5;
        color: white;
        padding: 1.5rem 3rem;
        text-decoration: none;
        border-radius: 12px;
        font-weight: 700;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
        min-width: 200px;
    }
    .ready-to-start-cta .cta-button:hover {
        background: #4338ca;
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(79, 70, 229, 0.5);
    }
    
    /* Mobile responsive for horizontal layout */
    @media (max-width: 768px) {
        .ready-to-start-box {
            flex-direction: column;
            text-align: center;
            gap: 2rem;
            padding: 2rem;
            margin: 3rem auto;
            width: 95%;
        }
        .ready-to-start-box h3 {
            font-size: 1.8rem;
        }
        .ready-to-start-box p {
            font-size: 1rem;
        }
        .ready-to-start-box .contact-info {
            font-size: 1.1rem;
        }
        .ready-to-start-cta .cta-button {
            padding: 1.2rem 2.5rem;
            font-size: 1.1rem;
            min-width: 180px;
        }
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
            position: static;
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
            <h1 style="color: #000000; white-space: normal; word-wrap: break-word; line-height: 1.2; font-size: 3.2rem; font-weight: 800; margin: 0 0 24px 0;">
                About <?php echo esc_html($business_name); ?>
            </h1>
            <p style="color: <?php echo esc_attr($settings['hero_description_color'] ?? '#6b7280'); ?>; font-size: 1rem; margin: 0 0 32px 0; line-height: 1.6;">
                <?php echo esc_html($settings['hero_description'] ?? 'Learn about ' . $business_name . ', Orlando\'s trusted roofing company. Professional team, quality workmanship, and exceptional service.'); ?>
            </p>
            <a href="tel:<?php echo esc_attr($phone); ?>" class="btn" style="background: #f59e0b; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; font-size: 1.1rem;">
                <i class="fa-solid fa-phone"></i> Call us Today
            </a>
            </div>
        </section>

    <!-- About Content Section - Side by Side Layout -->
    <section class="about-content-section">
        <div class="about-grid">
            <!-- Image on Left -->
            <div class="about-image-wrapper">
                <?php 
                // Use about_page_team_image or about_image from settings, with roofing fallback
                $team_image = !empty($settings['about_page_team_image']) ? $settings['about_page_team_image'] : 
                              (!empty($settings['about_image']) ? $settings['about_image'] : 
                              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80');
                ?>
                <img src="<?php echo esc_url($team_image); ?>" alt="About <?php echo esc_attr($business_name); ?>" loading="lazy" decoding="async">
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
                    // Get the about page description - now AI generates clean content
                    $about_page_description = $settings['about_page_who_description'] ?? '';
                    
                    if (!empty($about_page_description)) {
                        // Display the clean HTML content directly
                        echo wp_kses_post($about_page_description);
                                    } else {
                        // Fallback content
                        echo '<p>We are a premier company dedicated to transforming your space with professional expertise and exceptional service. Our team brings years of experience and a commitment to quality that sets us apart.</p>';
                    }
                    ?>
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
    $reviews = $settings['reviews'] ?? [];
    if (!empty($reviews)): 
    ?>
    <section class="bsg-section reviews-section animate-on-scroll-section" style="background-color: #ffffff; color: var(--text-color); padding: 80px 0; min-height: 300px;">
        <div class="container" style="background:#fff;border-radius:0;padding:2.5rem 2rem;box-shadow:0 2px 16px rgba(0,0,0,0.10);max-width:1200px;margin-left:auto;margin-right:auto;">
            <div class="bsg-section-header" style="text-align:left;margin-bottom:1.2rem;">
                <div class="tagline" style="display:inline-flex;align-items:center;gap:0.7rem;margin-bottom:10px;margin-top:0;background:none;">
                    <span style="display:inline-flex;align-items:center;font-size:1rem;letter-spacing:2px;font-weight:700;text-transform:uppercase;background:rgba(46,230,197,0.08);border-radius:6px;padding:2px 14px 2px 8px;color:#6b7280 !important;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="margin-right:8px;vertical-align:middle;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#2ee6c5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        CUSTOMER REVIEWS
                    </span>
                </div>
                <h2 style="font-size:2.5rem;font-weight:800;margin:0 0 0.5rem 0;line-height:1.1;letter-spacing:-1px;color:#111827 !important;">
                    What Our Customers Say
                </h2>
            </div>
            <div class="reviews-google-bar" style="background:#fff;border-radius:16px;padding:16px 32px 12px 32px;max-width:1020px;margin:0 auto 24px auto;display:flex;align-items:center;justify-content:center;gap:1.2rem;box-shadow:0 2px 12px rgba(0,0,0,0.04);">
                <img src="https://ik.imagekit.io/kauapzysq/Adobe%20Express%20-%20file.png?updatedAt=1752473826860" alt="Google" style="height:40px;width:auto;object-fit:contain;display:block;" loading="lazy" decoding="async">
                <span style="margin:0 10px;color:#232834;">Excellent</span>
                <span style="color:#fbbf24;font-size:1.2rem;">
                    <?php for($i = 0; $i < 5; $i++): ?>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <?php endfor; ?>
                </span>
                <span style="font-weight:600;font-size:1.1rem;color:#232834;"> 4.8 </span>
                <span style="color:#888;"> <?php echo count($reviews); ?> reviews</span>
            </div>
            <div class="reviews-slider-wrapper" style="position:relative;display:flex;align-items:center;">
                <div class="reviews-slider" style="overflow-x:auto;scroll-behavior:smooth;display:flex;gap:2rem;padding-bottom:8px;width:100%;">
                    <?php foreach(array_slice($reviews, 0, 5) as $review): ?>
                    <div class="review-card" style="background:#fff;border-radius:18px;box-shadow:0 2px 12px rgba(0,0,0,0.07);padding:22px 22px 18px 22px;max-width:320px;min-width:260px;width:100%;margin:0 10px;display:flex;flex-direction:column;gap:0.7rem;">
                        <div style="display:flex;align-items:center;gap:0.8rem;">
                            <div style="width:36px;height:36px;border-radius:50%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;color:#374151;font-weight:700;">
                                <?php echo strtoupper(substr($review['name'] ?? 'U', 0, 1)); ?>
                            </div>
                            <div style="display:flex;flex-direction:column;line-height:1.2;">
                                <span style="font-weight:700;color:#1f2937;"><?php echo esc_html($review['name'] ?? 'Customer'); ?></span>
                                <span style="color:#6b7280;font-size:0.875rem;">Verified Customer</span>
                            </div>
                            <span style="margin-left:auto;color:#fbbf24;">
                                <?php for($i = 0; $i < ($review['rating'] ?? 5); $i++): ?>
                                <svg width="16" width="16" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                <?php endfor; ?>
                            </span>
                        </div>
                        <p style="margin:8px 0 6px 0;color:#111827;line-height:1.5;"><?php echo esc_html($review['comment'] ?? ''); ?></p>
                        <span style="color:#9ca3af;font-size:0.85rem;">— <?php echo esc_html($review['date'] ?? ''); ?></span>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </section>
    <?php endif; ?>

    <!-- Service Areas Section -->
    <?php 
    $locations = $settings['locations'] ?? [];
    if (!empty($locations)): 
    ?>
    <section class="bsg-section locations-section animate-on-scroll-section" style="background-color: #1f2937; color: #ffffff; padding: 60px 0; margin-top: 0;">
        <div class="container">
            <div class="bsg-two-col-layout" style="display:flex;align-items:flex-start;gap:3rem;">
                <div class="bsg-text-content" style="flex:1;min-width:320px;">
                    <div class="bsg-icon-heading" style="display:flex;align-items:center;gap:0.5rem;margin-bottom:10px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2ee6c5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        <span class="bsg-section-header tagline" style="background:#1f2937;color:#ffffff;">
                            SERVICE AREAS
                        </span>
                    </div>
                    <h2 style="color:#ffffff;">
                        Areas We Serve
                    </h2>
                    <p style="margin-bottom:2rem; color: #ffffff;">
                        <?php echo esc_html($settings['locations_description'] ?? 'Proudly serving Orlando and surrounding areas with professional roofing services.'); ?>
                    </p>
                    <div class="locations-grid" id="locations-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem 2rem;margin-bottom:2rem;">
                        <?php foreach(array_slice($locations, 0, 6) as $location): ?>
                        <a href="<?php echo esc_url(home_url('/service-locations/' . $location['slug'] . '/')); ?>" class="location-card" style="display:flex;align-items:center;gap:0.7rem;background:rgba(255,255,255,0.08);color:#ffffff;padding:0.8rem 1rem;text-decoration:none;font-weight:500;transition:all 0.2s;border-radius:8px;border:1px solid rgba(255,255,255,0.2);" onmouseover="this.style.background='rgba(46,230,197,0.2)';this.style.borderColor='#2ee6c5';" onmouseout="this.style.background='rgba(255,255,255,0.08)';this.style.borderColor='rgba(255,255,255,0.2)';">
                            <span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:#2ee6c5;border-radius:6px;color:#ffffff;font-size:14px;font-weight:bold;">
                                ✓
                            </span>
                            <span style="font-weight: 500; color: #ffffff;"><?php echo esc_html($location['name']); ?></span>
                        </a>
                        <?php endforeach; ?>
                    </div>
                </div>
                <div class="content-image" style="flex:1;min-width:320px;max-width:600px;display:flex;justify-content:center;align-items:center;">
                    <div class="map-container" style="width:500px;height:400px;border-radius:8px;overflow:hidden;pointer-events:none;margin:0 auto;">
                        <iframe 
                            src="https://maps.google.com/maps?q=Orlando%2C+Florida&t=&z=10&ie=UTF8&iwloc=&output=embed" 
                            width="500" 
                            height="400" 
                            style="border:0;border-radius:8px;pointer-events:none;" 
                            allowfullscreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <?php endif; ?>

    <!-- Commitment Section -->
    <section class="section commitment-section animate-on-scroll-section" style="background-color: #232834; color: #ffffff; padding: 105px 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 60px;">
            <div class="two-col-layout" style="display: flex; align-items: center; gap: 3rem;">
                <div class="content-image">
                    <?php 
                    $commitment_image = !empty($settings['commitment_bg_image']) ? $settings['commitment_bg_image'] : 
                                      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
                    ?>
                    <img src="<?php echo esc_url($commitment_image); ?>" alt="Our Promise Of Reliability" loading="lazy" decoding="async">
                </div>
                <div class="text-content">
                    <div class="icon-heading">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span>OUR COMMITMENT</span>
                    </div>
                    <h2 style="color: #ffffff;">Our Promise Of Reliability</h2>
                    <p class="commitment-subtitle" style="color: #cfd8dc;">We promise to deliver exceptional service</p>
                    <div class="commitment-text">
                        <p><?php echo esc_html($settings['commitment_text'] ?? 'At ' . $business_name . ' in Orlando, we\'re dedicated to providing reliable, high-quality roofing services with integrity and care. From repairs to replacements, we ensure your roof is in expert hands—on time, on budget, every time.'); ?></p>
                    </div>
                </div>
            </div>
        </div>
    </section>

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