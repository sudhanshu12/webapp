<?php
/**
 * The template for displaying the footer
 */

$settings = bsg_get_settings();
$business = bsg_get_business_info();

// Force refresh settings if they seem wrong
if (empty($settings['footer_bg_color']) || $settings['footer_bg_color'] === '#1e3a8a') {
    // Clear cache and try again
    delete_transient('bsg_settings_cache');
    $settings = get_option('bsg_settings', []);
}

// Get footer customization settings
$footer_visible = $settings['footer_visible'] ?? true;
$footer_bg_color = $settings['footer_bg_color'] ?? '#1e3a8a';
$footer_heading_color = $settings['footer_heading_color'] ?? '#ffffff';
$footer_links_color = $settings['footer_links_color'] ?? '#cccccc';
$footer_copyright_text = $settings['footer_copyright_text'] ?? '©2025, ' . $business['name'] . '. All Rights Reserved.';
$footer_disclaimer_text = $settings['footer_disclaimer_text'] ?? '';
$footer_padding = $settings['footer_padding'] ?? 60;
$footer_address = $business['address'] ?? '';

// Debug: Log footer settings
error_log('=== FOOTER DEBUG ===');
error_log('Raw settings footer_bg_color: ' . ($settings['footer_bg_color'] ?? 'NOT SET'));
error_log('Raw settings footer_links_color: ' . ($settings['footer_links_color'] ?? 'NOT SET'));
error_log('Raw settings footer_heading_color: ' . ($settings['footer_heading_color'] ?? 'NOT SET'));
error_log('Final footer_bg_color: ' . $footer_bg_color);
error_log('Final footer_links_color: ' . $footer_links_color);
error_log('Final footer_heading_color: ' . $footer_heading_color);
error_log('=== FOOTER DEBUG END ===');

// Get services - try multiple sources
$services = [];

// First, try to get services from WordPress menu (most reliable)
$services_menu = wp_get_nav_menu_object('services');
if ($services_menu) {
    $menu_items = wp_get_nav_menu_items($services_menu->term_id);
    if ($menu_items) {
        foreach (array_slice($menu_items, 0, 5) as $item) {
            if (!empty($item->title)) {
                $services[] = array(
                    'title' => $item->title,
                    'url' => $item->url
                );
            }
        }
    }
}

// If no services from menu, try wizard settings
if (empty($services) && !empty($settings['services'])) {
    foreach (array_slice($settings['services'], 0, 5) as $service) {
        // Check for both 'title' and 'name' fields
        $service_name = !empty($service['name']) ? $service['name'] : (!empty($service['title']) ? $service['title'] : '');
        $service_slug = !empty($service['slug']) ? $service['slug'] : sanitize_title($service_name);
        
        if (!empty($service_name)) {
            $services[] = array(
                'title' => $service_name,
                'url' => home_url('/services/' . $service_slug . '/')
            );
        }
    }
}

// Only use fallback if truly no services exist (don't show hardcoded if wizard has 0 services)
if (empty($services) && empty($settings['services'])) {
    // No fallback - just show nothing if no services are configured
    $services = array();
}

$first_five_services = array_slice($services, 0, 5);

// Don't show footer if disabled
if (!$footer_visible) {
    return;
}
?>

<!-- 3D Line Separator -->
<div style="height: 4px; background: linear-gradient(90deg, transparent 0%, #f97316 20%, #f97316 80%, transparent 100%); margin: 40px 0; box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);"></div>

<style>
:root {
    --footer-bg-color: <?php echo esc_attr($footer_bg_color); ?> !important;
    --footer-text-color: <?php echo esc_attr($footer_links_color); ?> !important;
    --footer-heading-color: <?php echo esc_attr($footer_heading_color); ?> !important;
}

/* Force footer colors with high specificity */
footer {
    background: <?php echo esc_attr($footer_bg_color); ?> !important;
    color: <?php echo esc_attr($footer_links_color); ?> !important;
}

footer h4 {
    color: <?php echo esc_attr($footer_heading_color); ?> !important;
}

footer a {
    color: <?php echo esc_attr($footer_links_color); ?> !important;
}

/* Mobile Responsive Styles for Footer */
@media (max-width: 768px) {
    footer {
        padding: 40px 0 20px !important;
    }
    
    footer .container {
        padding: 0 15px !important;
    }
    
    footer .footer-grid {
        grid-template-columns: 1fr !important;
        gap: 30px !important;
        margin-bottom: 30px !important;
    }
    
    /* Business Info Column */
    footer .footer-grid > div:first-child {
        border: 2px solid #f97316 !important;
        border-radius: 8px !important;
        padding: 20px !important;
        background: rgba(255,255,255,0.05) !important;
        text-align: center !important;
    }
    
    footer .footer-grid > div:first-child h3 {
        font-size: 1.3rem !important;
        margin-bottom: 15px !important;
    }
    
    footer .footer-grid > div:first-child p {
        font-size: 0.85rem !important;
        margin-bottom: 15px !important;
    }
    
    /* All Columns */
    footer .footer-grid > div {
        text-align: center !important;
    }
    
    footer .footer-grid h4 {
        font-size: 1.1rem !important;
        margin-bottom: 15px !important;
    }
    
    footer .footer-grid ul {
        gap: 10px !important;
    }
    
    footer .footer-grid ul li a {
        font-size: 0.9rem !important;
        justify-content: center !important;
    }
    
    /* Contact Info */
    footer .footer-grid > div:last-child {
        text-align: center !important;
    }
    
    footer .footer-grid > div:last-child > div {
        align-items: center !important;
        justify-content: center !important;
    }
    
    /* Copyright Section */
    footer .footer-bottom {
        flex-direction: column !important;
        text-align: center !important;
        gap: 15px !important;
        padding-top: 20px !important;
    }
    
    footer .footer-bottom > div {
        min-width: auto !important;
        text-align: center !important;
    }
    
    footer .footer-bottom p {
        font-size: 0.8rem !important;
    }
}

@media (max-width: 480px) {
    footer {
        padding: 30px 0 15px !important;
    }
    
    footer .container {
        padding: 0 10px !important;
    }
    
    footer .footer-grid {
        gap: 25px !important;
        margin-bottom: 25px !important;
    }
    
    footer .footer-grid > div:first-child {
        padding: 15px !important;
    }
    
    footer .footer-grid > div:first-child h3 {
        font-size: 1.2rem !important;
    }
    
    footer .footer-grid h4 {
        font-size: 1rem !important;
        margin-bottom: 12px !important;
    }
    
    footer .footer-grid ul li a {
        font-size: 0.85rem !important;
    }
    
    footer .footer-bottom {
        gap: 10px !important;
        padding-top: 15px !important;
    }
    
    footer .footer-bottom p {
        font-size: 0.75rem !important;
    }
}

</style>

<footer style="background: <?php echo esc_attr($footer_bg_color); ?>; color: <?php echo esc_attr($footer_links_color); ?>; padding: 88px 0 30px; margin-top: 0; position: relative; overflow: hidden;">
    
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px; position: relative; z-index: 1;">
        <div class="footer-grid" style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 50px;">
            
            <!-- First Column: Business Info with Orange Border -->
            <div style="border: 2px solid #f97316; border-radius: 8px; padding: 20px; background: rgba(255,255,255,0.05);">
                <!-- Logo and Business Name -->
                <?php if (!empty($business['logo'])): ?>
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                        <img src="<?php echo esc_url($business['logo']); ?>" alt="<?php echo esc_attr($business['name']); ?>" style="max-height: 40px; width: auto;">
                        <h3 style="color: <?php echo esc_attr($footer_heading_color); ?>; font-size: 1.5rem; font-weight: 700; margin: 0; text-transform: uppercase;">
                            <?php echo esc_html($business['name']); ?>
                        </h3>
                    </div>
                <?php else: ?>
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                        <div style="width: 40px; height: 40px; background: #f97316; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                <polyline points="9,22 9,12 15,12 15,22"/>
                            </svg>
                        </div>
                        <h3 style="color: <?php echo esc_attr($footer_heading_color); ?>; font-size: 1.5rem; font-weight: 700; margin: 0; text-transform: uppercase;">
                            <?php echo esc_html($business['name']); ?>
                        </h3>
                    </div>
                <?php endif; ?>
                
                <!-- Business Description -->
                <p style="color: <?php echo esc_attr($footer_links_color); ?>; font-size: 0.9rem; margin-bottom: 20px; line-height: 1.5;">
                    We provide top-quality roofing services tailored to meet your needs with professional expertise and reliable solutions.
                </p>
                
                <!-- Working Hours -->
                <div style="margin-bottom: 15px;">
                    <h4 style="color: <?php echo esc_attr($footer_heading_color); ?>; font-size: 1rem; font-weight: 600; margin-bottom: 8px; text-transform: uppercase;">
                        Working Hours
                    </h4>
                    <div style="color: <?php echo esc_attr($footer_links_color); ?>; font-size: 0.9rem;">
                        <div>Monday - Friday</div>
                        <div>9:00 AM - 6:00 PM</div>
                    </div>
                </div>
            </div>
            
            <!-- Second Column: Quick Links -->
            <div>
                <h4 style="color: <?php echo esc_attr($footer_heading_color); ?>; font-size: 1.2rem; font-weight: 600; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">
                    Quick Links
                </h4>
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px;">
                    <li>
                        <a href="<?php echo esc_url(home_url('/')); ?>" 
                           style="color: <?php echo esc_attr($footer_links_color); ?>; text-decoration: none; transition: color 0.3s ease; display: flex; align-items: center; gap: 8px;"
                           onmouseover="this.style.color='#f97316'"
                           onmouseout="this.style.color='<?php echo esc_attr($footer_links_color); ?>'">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#f97316">
                                <path d="M5 12h14m-7-7l7 7-7 7"/>
                            </svg>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo esc_url(home_url('/about-us/')); ?>" 
                           style="color: <?php echo esc_attr($footer_links_color); ?>; text-decoration: none; transition: color 0.3s ease; display: flex; align-items: center; gap: 8px;"
                           onmouseover="this.style.color='#f97316'"
                           onmouseout="this.style.color='<?php echo esc_attr($footer_links_color); ?>'">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#f97316">
                                <path d="M5 12h14m-7-7l7 7-7 7"/>
                            </svg>
                            About Us
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo esc_url(home_url('/contact-us/')); ?>" 
                           style="color: <?php echo esc_attr($footer_links_color); ?>; text-decoration: none; transition: color 0.3s ease; display: flex; align-items: center; gap: 8px;"
                           onmouseover="this.style.color='#f97316'"
                           onmouseout="this.style.color='<?php echo esc_attr($footer_links_color); ?>'">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#f97316">
                                <path d="M5 12h14m-7-7l7 7-7 7"/>
                            </svg>
                            Contact Us
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo esc_url(home_url('/services/')); ?>" 
                           style="color: <?php echo esc_attr($footer_links_color); ?>; text-decoration: none; transition: color 0.3s ease; display: flex; align-items: center; gap: 8px;"
                           onmouseover="this.style.color='#f97316'"
                           onmouseout="this.style.color='<?php echo esc_attr($footer_links_color); ?>'">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#f97316">
                                <path d="M5 12h14m-7-7l7 7-7 7"/>
                            </svg>
                            Services
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo esc_url(home_url('/service-locations/')); ?>" 
                           style="color: <?php echo esc_attr($footer_links_color); ?>; text-decoration: none; transition: color 0.3s ease; display: flex; align-items: center; gap: 8px;"
                           onmouseover="this.style.color='#f97316'"
                           onmouseout="this.style.color='<?php echo esc_attr($footer_links_color); ?>'">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#f97316">
                                <path d="M5 12h14m-7-7l7 7-7 7"/>
                            </svg>
                            Service Locations
                        </a>
                    </li>
                </ul>
            </div>
            
            <!-- Third Column: Our Services -->
            <div>
                <h4 style="color: <?php echo esc_attr($footer_heading_color); ?>; font-size: 1.2rem; font-weight: 600; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">
                    Our Services
                </h4>
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px;">
                    <?php if (!empty($first_five_services)): ?>
                        <?php foreach ($first_five_services as $service): ?>
                            <li>
                                <a href="<?php echo esc_url($service['url']); ?>" 
                                   style="color: <?php echo esc_attr($footer_links_color); ?>; text-decoration: none; transition: color 0.3s ease; display: flex; align-items: center; gap: 8px;"
                                   onmouseover="this.style.color='#f97316'"
                                   onmouseout="this.style.color='<?php echo esc_attr($footer_links_color); ?>'">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#f97316">
                                        <path d="M5 12h14m-7-7l7 7-7 7"/>
                                    </svg>
                                    <?php echo esc_html($service['title']); ?>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <!-- Fallback message if no services found -->
                        <li style="color: <?php echo esc_attr($footer_links_color); ?>; opacity: 0.7;">
                            No services configured
                        </li>
                    <?php endif; ?>
                </ul>
            </div>
            
            <!-- Fourth Column: Contact Info -->
            <div>
                <h4 style="color: <?php echo esc_attr($footer_heading_color); ?>; font-size: 1.2rem; font-weight: 600; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">
                    Get in Touch
                </h4>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#f97316">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        <a href="tel:<?php echo esc_attr($business['phone']); ?>" 
                           style="color: <?php echo esc_attr($footer_links_color); ?>; text-decoration: none; transition: color 0.3s ease;"
                           onmouseover="this.style.color='#f97316'"
                           onmouseout="this.style.color='<?php echo esc_attr($footer_links_color); ?>'">
                            <?php echo esc_html($business['phone']); ?>
                        </a>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#f97316">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        <a href="mailto:<?php echo esc_attr($business['email']); ?>" 
                           style="color: <?php echo esc_attr($footer_links_color); ?>; text-decoration: none; transition: color 0.3s ease;"
                           onmouseover="this.style.color='#f97316'"
                           onmouseout="this.style.color='<?php echo esc_attr($footer_links_color); ?>'">
                            <?php echo esc_html($business['email']); ?>
                        </a>
                    </div>
                    <div style="display: flex; align-items: flex-start; gap: 8px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#f97316" style="margin-top: 2px;">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span style="color: <?php echo esc_attr($footer_links_color); ?>; line-height: 1.4;">
                            <?php echo esc_html($business['address']); ?>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Copyright and Disclaimer -->
        <div class="footer-bottom" style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <div style="flex: 1; min-width: 200px;">
                <p style="color: <?php echo esc_attr($footer_links_color); ?>; margin: 0; font-size: 0.9rem;">
                    <?php echo esc_html($footer_copyright_text); ?>
                </p>
            </div>
            
            <?php if (!empty($footer_disclaimer_text)): ?>
                <div style="flex: 1; min-width: 200px; text-align: right;">
                    <p style="color: <?php echo esc_attr($footer_links_color); ?>; margin: 0; font-size: 0.8rem; opacity: 0.8;">
                        <?php echo esc_html($footer_disclaimer_text); ?>
                    </p>
                </div>
            <?php endif; ?>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>