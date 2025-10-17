<?php
$settings = bsg_get_settings();
$business_name = !empty($settings['business_name']) ? $settings['business_name'] : 'Your Business';
$phone = $settings['phone'] ?? '(555) 123-4567';
$about_page = get_page_by_path('about-us') ?: get_page_by_path('about');
$contact_page = get_page_by_path('contact-us') ?: get_page_by_path('contact');


// Get global theme colors
$colors = bsg_get_color_scheme();
$primary_color = $colors['primary'];
$secondary_color = $colors['secondary'];
$button_color = $colors['button'];
// Compute nav colors once, honoring theme settings globally
$nav_bg = $settings['navigation_bg_color'] ?? $settings['nav_bg_color'] ?? ($settings['surface_color'] ?? '#0f172a');
$nav_text = $settings['navigation_text_color'] ?? $settings['nav_text_color'] ?? ($settings['text_color'] ?? '#e5e7eb');
?>
<style>
    .main-header { background: <?php echo esc_attr($nav_bg); ?>; color: <?php echo esc_attr($nav_text); ?>; }
    .main-header .nav-menu a { color: <?php echo esc_attr($nav_text); ?>; }
    .main-header .logo, .main-header .logo span { color: <?php echo esc_attr($nav_text); ?> !important; opacity: 1 !important; }
    .main-header a.logo { color: <?php echo esc_attr($nav_text); ?> !important; text-decoration: none; }
    .main-header .nav-menu > li > a { opacity: 1 !important; }
    .site-footer { background: <?php echo esc_attr($settings['surface_color'] ?? '#0f172a'); ?>; color: <?php echo esc_attr($settings['text_color'] ?? '#e5e7eb'); ?>; }
    @media (max-width: 768px) {
        .main-header .nav-menu a { color: <?php echo esc_attr($nav_text); ?>; }
    }
    /* Ensure dropdown inherits text color */
    .main-header .dropdown a { color: <?php echo esc_attr($nav_text); ?>; }
    .main-header .dropdown { background: <?php echo esc_attr($nav_bg); ?>; }
    .main-header .hamburger { color: <?php echo esc_attr($nav_text); ?>; }
    .main-header .hamburger span { background: <?php echo esc_attr($nav_text); ?>; }
</style>
<header class="main-header" style="background: <?php echo esc_attr($nav_bg); ?>; color: <?php echo esc_attr($nav_text); ?>;">
    <div class="container">
        <a href="<?php echo home_url('/'); ?>" class="logo">
            <?php if (!empty($settings['business_logo'])): ?>
            <img width="40" height="30" src="<?php echo esc_url($settings['business_logo']); ?>" alt="<?php echo esc_attr($business_name); ?>" class="custom-logo" loading="eager" decoding="async">
            <?php else: ?>
            <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0L0 20H10L20 10L30 20H40L20 0Z" fill="<?php echo esc_attr($primary_color); ?>"/>
                <path d="M10 20L20 30L30 20H10Z" fill="<?php echo esc_attr($secondary_color); ?>"/>
            </svg>
            <?php endif; ?>
            <span><?php echo wp_kses_post(html_entity_decode($business_name)); ?></span>
        </a>
        <div class="hamburger" id="hamburger-menu" aria-label="Open menu" tabindex="0">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <nav class="main-nav" id="main-nav" style="color: var(--text-color);">
            <ul class="nav-menu">
                <li><a href="<?php echo home_url('/'); ?>">Home</a></li>
                <li class="has-dropdown">
                    <a href="#" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false" style="cursor: default; pointer-events: none;">Services <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg></a>
                    <ul class="dropdown">
                        <?php
                        // Get services from wizard settings
                        $services = $settings['services'] ?? [];
                        if (!empty($services)) {
                            foreach ($services as $service) {
                                if (!empty($service['name'])) {
                                    echo '<li><a href="#" style="cursor: default; pointer-events: none;">' . esc_html($service['name']) . '</a></li>';
                                }
                            }
                        } else {
                            // Fallback: try to get service pages from database
                            $services_parent = get_page_by_path('services');
                            if ($services_parent) {
                                $children = get_pages(['parent' => $services_parent->ID, 'sort_column' => 'menu_order']);
                                foreach ($children as $child) {
                                    echo '<li><a href="#" style="cursor: default; pointer-events: none;">' . esc_html($child->post_title) . '</a></li>';
                                }
                            }
                        }
                        ?>
                    </ul>
                </li>
                <li class="has-dropdown">
                    <a href="#" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false" style="cursor: default; pointer-events: none;">Service Locations <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg></a>
                    <ul class="dropdown">
                        <?php
                        // Get locations from wizard settings
                        $locations = $settings['locations'] ?? [];
                        if (!empty($locations)) {
                            foreach ($locations as $location) {
                                if (!empty($location['name'])) {
                                    echo '<li><a href="#" style="cursor: default; pointer-events: none;">' . esc_html($location['name']) . '</a></li>';
                                }
                            }
                        } else {
                            // Fallback: try to get location pages from database
                            $locations_parent = get_page_by_path('service-locations');
                            if ($locations_parent) {
                                $children = get_pages(['parent' => $locations_parent->ID, 'sort_column' => 'menu_order']);
                                foreach ($children as $child) {
                                    echo '<li><a href="#" style="cursor: default; pointer-events: none;">' . esc_html($child->post_title) . '</a></li>';
                                }
                            }
                        }
                        ?>
                    </ul>
                </li>
                <?php if ($about_page): ?>
                <li><a href="<?php echo esc_url(get_permalink($about_page->ID)); ?>">About</a></li>
                <?php endif; ?>
                <?php if ($contact_page): ?>
                <li><a href="<?php echo esc_url(get_permalink($contact_page->ID)); ?>">Contact</a></li>
                <?php endif; ?>
            </ul>
        </nav>
        <div class="header-actions">
            <a href="tel:<?php echo esc_attr($phone); ?>" class="btn btn-teal" style="background: <?php echo esc_attr($button_color); ?>; color: <?php echo esc_attr($settings['hero_call_btn_text'] ?? '#ffffff'); ?>;">
                <i class="fa-solid fa-phone"></i> <?php echo esc_html($phone); ?>
            </a>
        </div>
    </div>
</header>
