<?php
// Prefer centralized getter so build-time injected settings or DB are used
$settings = function_exists('bsg_get_settings') ? bsg_get_settings() : (get_option('bsg_settings', []) ?: []);
$locations = $settings['locations'] ?? [];
?>
<section class="section locations-section animate-on-scroll-section" style="background-color: <?php echo esc_attr($settings['service_areas_bg_color'] ?? '#232834'); ?>; color: <?php echo esc_attr($settings['service_areas_text_color'] ?? '#ffffff'); ?>; padding: 60px 0; margin-top: 0;">
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 60px;">
        <div class="two-col-layout" style="display:flex;align-items:flex-start;gap:3rem;">
            <div class="text-content" style="flex:1;min-width:320px;">
                <div class="icon-heading" style="display:flex;align-items:center;gap:0.5rem;margin-bottom:10px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2ee6c5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    <span style="background:<?php echo esc_attr($settings['service_areas_bg_color'] ?? '#232834'); ?>;color:<?php echo esc_attr($settings['service_areas_text_color'] ?? '#fff'); ?>;padding:4px 18px;border-radius:4px;font-size:1rem;letter-spacing:2px;font-weight:600;">
                        <?php echo esc_html($settings['locations_label'] ?? 'OUR SERVICE AREA'); ?>
                    </span>
                </div>
                <h2 style="font-size:2.5rem;font-weight:800;margin:0 0 1.5rem 0;line-height:1.1;letter-spacing:-1px;color:<?php echo esc_attr($settings['service_areas_heading_color'] ?? '#ffffff'); ?>;">
                    <?php echo esc_html($settings['locations_title'] ?? 'Proudly Serving ' . ($settings['state'] ?? 'Boulder') . ' And The Surrounding Areas'); ?>
                </h2>
                <p style="margin-bottom:2rem; color: <?php echo esc_attr($settings['service_areas_text_color'] ?? '#ffffff'); ?>;">
                    <?php echo wp_kses_post($settings['locations_description'] ?? 'Proudly serving ' . ($settings['state'] ?? 'Boulder') . ' and surrounding areas with professional services. We\'re committed to delivering quality work wherever you are.'); ?>
                </p>
                <?php if (!empty($locations)): ?>
                <div class="locations-grid" id="locations-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem 2rem;margin-bottom:2rem;">
                    <?php foreach (array_slice($locations, 0, 6) as $i => $location): ?>
                    <?php
                    $loc_name = $location['name'] ?? '';
                    if (empty($loc_name)) continue;
                    
                    // Create link using slug from wizard data with service-locations prefix
                    $href = !empty($location['slug']) ? home_url('/service-locations/' . $location['slug'] . '/') : '#';
                    ?>
                    <a href="<?php echo esc_url($href); ?>" class="location-card" style="display:flex;align-items:center;gap:0.7rem;background:<?php echo esc_attr($settings['service_areas_card_bg'] ?? 'rgba(255,255,255,0.1)'); ?>;color:<?php echo esc_attr($settings['service_areas_text_color'] ?? '#ffffff'); ?>;padding:0.8rem 1rem;text-decoration:none;font-weight:500;transition:all 0.2s;border-radius:8px;border:1px solid rgba(255,255,255,0.2);" onmouseover="this.style.background='rgba(46,230,197,0.2)';this.style.borderColor='#2ee6c5';" onmouseout="this.style.background='<?php echo esc_attr($settings['service_areas_card_bg'] ?? 'rgba(255,255,255,0.1)'); ?>';this.style.borderColor='rgba(255,255,255,0.2)';">
                        <span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:#2ee6c5;border-radius:6px;color:#ffffff;font-size:14px;font-weight:bold;">
                            ✓
                        </span>
                        <span style="font-weight: 500; color: <?php echo esc_attr($settings['service_areas_text_color'] ?? '#ffffff'); ?>;"><?php echo esc_html($loc_name); ?></span>
                    </a>
                    <?php endforeach; ?>
                </div>
                
                <!-- Hidden locations for "View All" functionality -->
                <?php if (count($locations) > 6): ?>
                <div class="locations-grid hidden" id="all-locations-grid" style="display:none;grid-template-columns:repeat(3,1fr);gap:1rem 2rem;margin-bottom:2rem;">
                    <?php foreach ($locations as $i => $location): ?>
                    <?php
                    $loc_name = $location['name'] ?? '';
                    if (empty($loc_name)) continue;
                    
                    // Create link using slug from wizard data with service-locations prefix
                    $href = !empty($location['slug']) ? home_url('/service-locations/' . $location['slug'] . '/') : '#';
                    ?>
                    <a href="<?php echo esc_url($href); ?>" class="location-card" style="display:flex;align-items:center;gap:0.7rem;background:<?php echo esc_attr($settings['service_areas_card_bg'] ?? 'rgba(255,255,255,0.1)'); ?>;color:<?php echo esc_attr($settings['service_areas_text_color'] ?? '#ffffff'); ?>;padding:0.8rem 1rem;text-decoration:none;font-weight:500;transition:all 0.2s;border-radius:8px;border:1px solid rgba(255,255,255,0.2);" onmouseover="this.style.background='rgba(46,230,197,0.2)';this.style.borderColor='#2ee6c5';" onmouseout="this.style.background='<?php echo esc_attr($settings['service_areas_card_bg'] ?? 'rgba(255,255,255,0.1)'); ?>';this.style.borderColor='rgba(255,255,255,0.2)';">
                        <span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:#2ee6c5;border-radius:6px;color:#ffffff;font-size:14px;font-weight:bold;">
                            ✓
                        </span>
                        <span style="font-weight: 500; color: <?php echo esc_attr($settings['service_areas_text_color'] ?? '#ffffff'); ?>;"><?php echo esc_html($loc_name); ?></span>
                    </a>
                    <?php endforeach; ?>
                </div>
                <?php endif; ?>
                <?php else: ?>
                <div style="color: #ccc; font-style: italic; margin-bottom: 2rem;">No locations added yet. Add locations in the admin panel.</div>
                <?php endif; ?>
                <?php if (count($locations) > 6): ?>
                <button id="view-all-btn" class="btn" style="background:<?php echo esc_attr($settings['button_primary_color'] ?? '#f97316'); ?>;color:#ffffff;font-weight:600;border-radius:8px;padding:0.8rem 2rem;font-size:1.1rem;text-decoration:none;min-width:200px;text-align:center;display:inline-block;border:none;cursor:pointer;">
                    View All Service Areas
                </button>
                <?php else: ?>
                <a href="<?php echo esc_url(home_url('/service-locations/')); ?>" class="btn" style="background:<?php echo esc_attr($settings['button_primary_color'] ?? '#f97316'); ?>;color:#ffffff;font-weight:600;border-radius:8px;padding:0.8rem 2rem;font-size:1.1rem;text-decoration:none;min-width:200px;text-align:center;display:inline-block;">
                    View All Service Areas
                </a>
                <?php endif; ?>
            </div>
            <div class="content-image" style="flex:1;min-width:320px;max-width:600px;display:flex;justify-content:center;align-items:center;">
                <?php 
                // Get location from general section
                $city = $settings['location'] ?? 'Orlando';
                $state = $settings['state'] ?? 'Florida';
                $full_location = $city . ', ' . $state;
                ?>
                <div class="map-container" style="width:500px;height:400px;border-radius:8px;overflow:hidden;pointer-events:none;margin:0 auto;">
                    <iframe 
                        src="https://maps.google.com/maps?q=<?php echo urlencode($full_location); ?>&t=&z=10&ie=UTF8&iwloc=&output=embed" 
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

<script>
// View All Service Areas functionality
document.addEventListener('DOMContentLoaded', function() {
    const viewAllBtn = document.getElementById('view-all-btn');
    const locationsGrid = document.getElementById('locations-grid');
    const allLocationsGrid = document.getElementById('all-locations-grid');
    
    if (viewAllBtn && locationsGrid && allLocationsGrid) {
        viewAllBtn.addEventListener('click', function() {
            if (allLocationsGrid.style.display === 'none' || allLocationsGrid.style.display === '') {
                // Show all locations
                locationsGrid.style.display = 'none';
                allLocationsGrid.style.display = 'grid';
                viewAllBtn.textContent = 'Show Less';
            } else {
                // Show only first 6 locations
                allLocationsGrid.style.display = 'none';
                locationsGrid.style.display = 'grid';
                viewAllBtn.textContent = 'View All Service Areas';
            }
        });
    }
});
</script>
