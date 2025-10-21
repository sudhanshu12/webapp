<?php
/**
 * Standardized Footer Component
 */

$settings = bsg_get_settings();
$business = bsg_get_business_info();

// Get footer customization settings
$footer_bg_color = $settings['footer_bg_color'] ?? '#1a1a1a';
$footer_heading_color = $settings['footer_heading_color'] ?? '#ffffff';
$footer_links_color = $settings['footer_links_color'] ?? '#cccccc';
$footer_copyright_text = $settings['footer_copyright_text'] ?? '©2025, ' . $business['name'] . '. All Rights Reserved.';
$footer_disclaimer_text = $settings['footer_disclaimer_text'] ?? '';

// Get first 5 services
$services = $settings['services'] ?? [];
$first_five_services = array_slice($services, 0, 5);
?>

<footer style="background: <?php echo esc_attr($footer_bg_color); ?>; color: <?php echo esc_attr($footer_links_color); ?>; padding: 60px 0 20px; margin-top: 80px;">
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; margin-bottom: 40px;">
            
            <!-- First Column: Logo, Phone, Address -->
            <div>
                <?php if (!empty($business['logo'])): ?>
                    <div style="margin-bottom: 20px;">
                        <img src="<?php echo esc_url($business['logo']); ?>" alt="<?php echo esc_attr($business['name']); ?>" style="max-height: 60px; width: auto;" loading="lazy" decoding="async">
                    </div>
                <?php else: ?>
                    <h3 style="color: <?php echo esc_attr($footer_heading_color); ?>; font-size: 1.5rem; font-weight: 700; margin-bottom: 20px;">
                        <?php echo esc_html($business['name']); ?>
                    </h3>
                <?php endif; ?>
                
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <?php if (!empty($business['phone'])): ?>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="color: <?php echo esc_attr($footer_links_color); ?>;">📞</span>
                            <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9+]/', '', $business['phone'])); ?>" 
                               style="color: <?php echo esc_attr($footer_links_color); ?>; text-decoration: none;">
                                <?php echo esc_html($business['phone']); ?>
                            </a>
                        </div>
                    <?php endif; ?>
                    
                    <?php if (!empty($business['address'])): ?>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="color: <?php echo esc_attr($footer_links_color); ?>;">📍</span>
                            <span style="color: <?php echo esc_attr($footer_links_color); ?>;">
                                <?php echo esc_html($business['address']); ?>
                            </span>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
            
            <!-- Second Column: Services -->
            <div>
                <h4 style="color: <?php echo esc_attr($footer_heading_color); ?>; font-size: 1.2rem; font-weight: 600; margin-bottom: 20px;">
                    Services
                </h4>
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                    <?php foreach ($first_five_services as $service): ?>
                        <li>
                            <a href="<?php echo esc_url(home_url('/' . sanitize_title($service['title']) . '/')); ?>" 
                               style="color: <?php echo esc_attr($footer_links_color); ?>; text-decoration: none; transition: color 0.3s ease;"
                               onmouseover="this.style.color='<?php echo esc_attr($settings['button_primary_color'] ?? '#2ee6c5'); ?>'"
                               onmouseout="this.style.color='<?php echo esc_attr($footer_links_color); ?>'">
                                <?php echo esc_html($service['title']); ?>
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
            
            <!-- Third Column: Navigation -->
            <div>
                <h4 style="color: <?php echo esc_attr($footer_heading_color); ?>; font-size: 1.2rem; font-weight: 600; margin-bottom: 20px;">
                    Navigation
                </h4>
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                    <li>
                        <a href="<?php echo esc_url(home_url('/')); ?>" 
                           style="color: <?php echo esc_attr($footer_links_color); ?>; text-decoration: none; transition: color 0.3s ease;"
                           onmouseover="this.style.color='<?php echo esc_attr($settings['button_primary_color'] ?? '#2ee6c5'); ?>'"
                           onmouseout="this.style.color='<?php echo esc_attr($footer_links_color); ?>'">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#" 
                           style="color: <?php echo esc_attr($footer_links_color); ?>; text-decoration: none; transition: color 0.3s ease;"
                           onmouseover="this.style.color='<?php echo esc_attr($settings['button_primary_color'] ?? '#2ee6c5'); ?>'"
                           onmouseout="this.style.color='<?php echo esc_attr($footer_links_color); ?>'">
                            Service Locations
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo esc_url(home_url('/about-us/')); ?>" 
                           style="color: <?php echo esc_attr($footer_links_color); ?>; text-decoration: none; transition: color 0.3s ease;"
                           onmouseover="this.style.color='<?php echo esc_attr($settings['button_primary_color'] ?? '#2ee6c5'); ?>'"
                           onmouseout="this.style.color='<?php echo esc_attr($footer_links_color); ?>'">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo esc_url(home_url('/contact-us/')); ?>" 
                           style="color: <?php echo esc_attr($footer_links_color); ?>; text-decoration: none; transition: color 0.3s ease;"
                           onmouseover="this.style.color='<?php echo esc_attr($settings['button_primary_color'] ?? '#2ee6c5'); ?>'"
                           onmouseout="this.style.color='<?php echo esc_attr($footer_links_color); ?>'">
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        
        <!-- Copyright and Disclaimer -->
        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; text-align: center;">
            <p style="color: <?php echo esc_attr($footer_links_color); ?>; margin: 0 0 10px 0; font-size: 0.9rem;">
                <?php echo esc_html($footer_copyright_text); ?>
            </p>
            
            <?php if (!empty($footer_disclaimer_text)): ?>
                <p style="color: <?php echo esc_attr($footer_links_color); ?>; margin: 0; font-size: 0.8rem; opacity: 0.8; max-width: 800px; margin: 0 auto;">
                    <?php echo esc_html($footer_disclaimer_text); ?>
                </p>
            <?php endif; ?>
        </div>
    </div>
</footer>
