<?php
$settings = bsg_get_settings();
$business_name = !empty($settings['business_name']) ? $settings['business_name'] : 'Your Business';
$phone = $settings['phone'] ?? '(555) 123-4567';
$about_page = get_page_by_path('about-us') ?: get_page_by_path('about');
$contact_page = get_page_by_path('contact-us') ?: get_page_by_path('contact');

// Output favicon links
echo '<!-- Generic Service Favicon -->' . "\n";
echo '<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJzZXJ2aWNlLWdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmNTllMGI7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNkNzk3MDY7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI2IiBmaWxsPSJ1cmwoI3NlcnZpY2UtZ3JhZCkiLz48c3ZnIHg9IjgiIHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTE0IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY4eiIvPjxwb2x5bGluZSBwb2ludHM9IjE0LDIgMTQsOCAyMCw4Ii8+PHBhdGggZD0iTTE2IDEzSDgiLz48cGF0aCBkPSJNMTYgMTdIOCIvPjxwYXRoIGQ9Ik0xMCA5SDgiLz48L3N2Zz4=">' . "\n";
echo '<link rel="icon" type="image/svg+xml" sizes="16x16" href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJzZXJ2aWNlLWdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmNTllMGI7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNkNzk3MDY7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI2IiBmaWxsPSJ1cmwoI3NlcnZpY2UtZ3JhZCkiLz48c3ZnIHg9IjgiIHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTE0IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY4eiIvPjxwb2x5bGluZSBwb2ludHM9IjE0LDIgMTQsOCAyMCw4Ii8+PHBhdGggZD0iTTE2IDEzSDgiLz48cGF0aCBkPSJNMTYgMTdIOCIvPjxwYXRoIGQ9Ik0xMCA5SDgiLz48L3N2Zz4=">' . "\n";
echo '<link rel="icon" type="image/svg+xml" sizes="32x32" href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJzZXJ2aWNlLWdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmNTllMGI7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNkNzk3MDY7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI2IiBmaWxsPSJ1cmwoI3NlcnZpY2UtZ3JhZCkiLz48c3ZnIHg9IjgiIHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTE0IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY4eiIvPjxwb2x5bGluZSBwb2ludHM9IjE0LDIgMTQsOCAyMCw4Ii8+PHBhdGggZD0iTTE2IDEzSDgiLz48cGF0aCBkPSJNMTYgMTdIOCIvPjxwYXRoIGQ9Ik0xMCA5SDgiLz48L3N2Zz4=">' . "\n";
echo '<link rel="apple-touch-icon" href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJzZXJ2aWNlLWdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmNTllMGI7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNkNzk3MDY7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI2IiBmaWxsPSJ1cmwoI3NlcnZpY2UtZ3JhZCkiLz48c3ZnIHg9IjgiIHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTE0IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY4eiIvPjxwb2x5bGluZSBwb2ludHM9IjE0LDIgMTQsOCAyMCw4Ii8+PHBhdGggZD0iTTE2IDEzSDgiLz48cGF0aCBkPSJNMTYgMTdIOCIvPjxwYXRoIGQ9Ik0xMCA5SDgiLz48L3N2Zz4=">' . "\n";

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
                    <a href="<?php echo esc_url(home_url('/services/')); ?>" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Services <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg></a>
                    <ul class="dropdown">
                        <?php
                        // Get services from wizard settings
                        $services = $settings['services'] ?? [];
                        if (!empty($services)) {
                            foreach ($services as $service) {
                                if (!empty($service['name'])) {
                                    // Try to find the service page
                                    $service_page_id = 0;
                                    $all_pages = get_pages(['sort_column' => 'menu_order']);
                                    $slug = sanitize_title($service['name']);
                                    foreach ($all_pages as $page) {
                                        if (get_post_meta($page->ID, '_bsg_service', true) && sanitize_title($page->post_title) === $slug) {
                                            $service_page_id = $page->ID;
                                            break;
                                        }
                                    }
                                    $service_url = $service_page_id ? get_permalink($service_page_id) : home_url('/services/' . $slug . '/');
                                    echo '<li><a href="' . esc_url($service_url) . '">' . esc_html($service['name']) . '</a></li>';
                                }
                            }
                        } else {
                            // Fallback: try to get service pages from database
                            $services_parent = get_page_by_path('services');
                            if ($services_parent) {
                                $children = get_pages(['parent' => $services_parent->ID, 'sort_column' => 'menu_order']);
                                foreach ($children as $child) {
                                    echo '<li><a href="' . esc_url(get_permalink($child->ID)) . '">' . esc_html($child->post_title) . '</a></li>';
                                }
                            }
                        }
                        ?>
                    </ul>
                </li>
                <li class="has-dropdown">
                    <a href="<?php echo esc_url(home_url('/service-locations/')); ?>" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Service Locations <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg></a>
                    <ul class="dropdown">
                        <?php
                        // Get locations from wizard settings
                        $locations = $settings['locations'] ?? [];
                        if (!empty($locations)) {
                            foreach ($locations as $location) {
                                if (!empty($location['name']) && !empty($location['slug'])) {
                                    $location_url = home_url('/service-locations/' . $location['slug'] . '/');
                                    echo '<li><a href="' . esc_url($location_url) . '">' . esc_html($location['name']) . '</a></li>';
                                }
                            }
                        } else {
                            // Fallback: try to get location pages from database
                            $locations_parent = get_page_by_path('service-locations');
                            if ($locations_parent) {
                                $children = get_pages(['parent' => $locations_parent->ID, 'sort_column' => 'menu_order']);
                                foreach ($children as $child) {
                                    echo '<li><a href="' . esc_url(get_permalink($child->ID)) . '">' . esc_html($child->post_title) . '</a></li>';
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
                <li><a href="<?php echo esc_url(get_permalink($contact_page->ID)); ?>">Contact Us</a></li>
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
