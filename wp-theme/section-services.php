<?php
// Prefer centralized getter so build-time injected settings or DB are used
if (!isset($settings) || !is_array($settings)) {
    $settings = function_exists('bsg_get_settings') ? bsg_get_settings() : (get_option('bsg_settings', []) ?: []);
}
$services_visible = $settings['services_visible'] ?? 1;
$services = $settings['services'] ?? [];
$all_pages = get_pages(['sort_column' => 'menu_order']); // Fetch all pages for service linking
?>
<?php if ($services_visible): ?>
<section class="section services-section animate-on-scroll-section" style="background-color: <?php echo esc_attr($settings['services_bg_color'] ?? '#313746'); ?>; color: <?php echo esc_attr($settings['services_text_color'] ?? '#ffffff'); ?>; padding: <?php echo esc_attr($settings['services_padding'] ?? '60'); ?>px 0;">
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 60px;">
        <div class="section-header" style="display:flex;align-items:center;justify-content:space-between;gap:2rem;">
            <div>
                <div class="tagline" style="background:#2ee6c5;color:#fff;display:inline-block;padding:4px 18px;border-radius:4px;font-size:1rem;letter-spacing:2px;font-weight:600;margin-bottom:8px;">
                    <?php echo esc_html($settings['services_label'] ?? 'TOP RATED SERVICES'); ?>
                </div>
                <h2 style="font-size:2.5rem;font-weight:800;margin:0 0 0.5rem 0;line-height:1.1;letter-spacing:-1px;">
                    <?php echo esc_html($settings['services_title'] ?? 'Our Services'); ?>
                </h2>
            </div>
            <?php if (!empty($settings['services_cta_text'])): ?>
            <a href="<?php echo esc_url($settings['services_cta_link'] ?? '#'); ?>" class="btn" style="background: <?php echo esc_attr($settings['button_primary_color'] ?? '#2ee6c5'); ?>; color: <?php echo esc_attr($settings['button_text_color'] ?? '#ffffff'); ?>;font-weight:600;border-radius:8px;padding:0.8rem 2rem;font-size:1.1rem;text-decoration:none;min-width:200px;text-align:center;display:inline-block;transition:all 0.3s ease;" onmouseover="this.style.background='<?php echo esc_attr($settings['button_hover_color'] ?? '#22d3aa'); ?>';this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 25px rgba(0,0,0,0.2)';" onmouseout="this.style.background='<?php echo esc_attr($settings['button_primary_color'] ?? '#2ee6c5'); ?>';this.style.transform='translateY(0)';this.style.boxShadow='none';">
                <?php echo esc_html($settings['services_cta_text']); ?>
            </a>
            <?php endif; ?>
        </div>
        <div style="position:relative;margin-top:2.5rem;">
            <button class="services-arrow left" style="position:absolute;left:-40px;top:50%;transform:translateY(-50%);z-index:2;background:<?php echo esc_attr($settings['button_primary_color'] ?? '#2ee6c5'); ?>;color:<?php echo esc_attr($settings['button_text_color'] ?? '#ffffff'); ?>;border:none;border-radius:50%;width:36px;height:36px;cursor:pointer;font-size:1.5rem;display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;" onmouseover="this.style.background='<?php echo esc_attr($settings['button_hover_color'] ?? '#22d3aa'); ?>';" onmouseout="this.style.background='<?php echo esc_attr($settings['button_primary_color'] ?? '#2ee6c5'); ?>';">&#8592;</button>
            <div class="services-carousel" style="overflow-x:auto;white-space:nowrap;scroll-behavior:smooth;padding-bottom:12px;">
                <?php if (!empty($services)): ?>
                    <?php foreach ($services as $service): ?>
                    <?php $slug = isset($service['name']) ? sanitize_title($service['name']) : ''; ?>
                    <?php
                    $service_page_id = 0;
                    foreach ($all_pages as $page) {
                        if (get_post_meta($page->ID, '_bsg_service', true) && sanitize_title($page->post_title) === $slug) {
                            $service_page_id = $page->ID;
                            break;
                        }
                    }
                    ?>
                    <div class="service-card" style="display:inline-block;vertical-align:top;width:320px;min-width:320px;margin-right:24px;background-color: <?php echo esc_attr($settings['services_card_color'] ?? '#232834'); ?>; color: <?php echo esc_attr($settings['services_text_color'] ?? '#ffffff'); ?>; border-radius: <?php echo esc_attr($settings['services_card_radius'] ?? '12'); ?>px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);padding:0;box-sizing:border-box;overflow:hidden;">
                        <div style="padding: 1.2rem 1.2rem 0.5rem 1.2rem;">
                            <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.7rem;">
                                <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:<?php echo esc_attr($settings['services_icon_color'] ?? '#2ee6c5'); ?>;border-radius:6px;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#232834" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </span>
                            </div>
                            <h3 style="font-size:1.4rem; margin:0 0 0.5rem 0; color:<?php echo esc_attr($settings['services_text_color'] ?? '#ffffff'); ?>; font-weight:700;">
                                <?php echo esc_html($service['name'] ?? ''); ?>
                            </h3>
                            <div class="service-desc-truncate" style="font-size:0.90rem; color:<?php echo esc_attr($settings['services_text_color'] ?? '#e0e0e0'); ?>; margin-bottom:1.5rem; min-height:60px;overflow:visible;display:block;white-space:normal;">
                                <?php echo esc_html($service['metaDescription'] ?? $service['meta_description'] ?? $service['description'] ?? 'Professional ' . ($service['name'] ?? 'service') . ' services tailored to your needs.'); ?>
                            </div>
                        </div>
                        <div style="padding: 0 1.2rem 1.2rem 1.2rem;">
                            <?php
                            // Try to find the service page
                            $service_page_id = 0;
                            $all_pages = get_pages(['sort_column' => 'menu_order']);
                            $slug = sanitize_title($service['name'] ?? '');
                            foreach ($all_pages as $page) {
                                if (get_post_meta($page->ID, '_bsg_service', true) && sanitize_title($page->post_title) === $slug) {
                                    $service_page_id = $page->ID;
                                    break;
                                }
                            }
                            $service_url = $service_page_id ? get_permalink($service_page_id) : home_url('/services/' . $slug . '/');
                            ?>
                            <a href="<?php echo esc_url($service_url); ?>" style="display:inline-block; background:none !important; color:<?php echo esc_attr($settings['button_primary_color'] ?? '#2ee6c5'); ?>; font-weight:600; padding:0; text-decoration:none; border:none; box-shadow:none; transition:all 0.3s ease;" onmouseover="this.style.color='<?php echo esc_attr($settings['button_hover_color'] ?? '#22d3aa'); ?>';" onmouseout="this.style.color='<?php echo esc_attr($settings['button_primary_color'] ?? '#2ee6c5'); ?>';">See More <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:4px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
                        </div>
                    </div>
                    <?php endforeach; ?>
                <?php else: ?>
                    <div class="service-card" style="display:inline-block;vertical-align:top;width:320px;background-color: <?php echo esc_attr($settings['services_card_color'] ?? '#232834'); ?>; color: <?php echo esc_attr($settings['services_text_color'] ?? '#ffffff'); ?>; opacity: 0.7;">
                        <h3>Add Your First Service</h3>
                        <p>Go to the Services section in the admin panel to add your services.</p>
                    </div>
                <?php endif; ?>
            </div>
            <button class="services-arrow right" style="position:absolute;right:-40px;top:50%;transform:translateY(-50%);z-index:2;background:<?php echo esc_attr($settings['button_primary_color'] ?? '#2ee6c5'); ?>;color:<?php echo esc_attr($settings['button_text_color'] ?? '#ffffff'); ?>;border:none;border-radius:50%;width:36px;height:36px;cursor:pointer;font-size:1.5rem;display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;" onmouseover="this.style.background='<?php echo esc_attr($settings['button_hover_color'] ?? '#22d3aa'); ?>';" onmouseout="this.style.background='<?php echo esc_attr($settings['button_primary_color'] ?? '#2ee6c5'); ?>';">&#8594;</button>
            <div class="services-progress-bar" style="height:6px;width:100%;background:rgba(255,255,255,0.2);border-radius:3px;margin-top:18px;overflow:hidden;">
                <div id="services-progress" style="height:100%;width:0;background:<?php echo esc_attr($settings['button_primary_color'] ?? '#2ee6c5'); ?>;transition:width 0.3s;"></div>
            </div>
        </div>
    </div>
</section>
<script>
document.addEventListener('DOMContentLoaded', function() {
    var carousel = document.querySelector('.services-carousel');
    var leftBtn = document.querySelector('.services-arrow.left');
    var rightBtn = document.querySelector('.services-arrow.right');
    var progress = document.getElementById('services-progress');
    var card = document.querySelector('.service-card');
    var cardWidth = card ? card.offsetWidth + 24 : 344;
    if (carousel && leftBtn && rightBtn && progress) {
        function updateProgress() {
            var scrollLeft = carousel.scrollLeft;
            var maxScroll = carousel.scrollWidth - carousel.clientWidth;
            var percent = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
            progress.style.width = percent + '%';
        }
        carousel.addEventListener('scroll', updateProgress);
        leftBtn.addEventListener('click', function() {
            carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
        rightBtn.addEventListener('click', function() {
            carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
        updateProgress();
    }
});
</script>
<style>
.services-carousel::-webkit-scrollbar {
    height: 10px;
}
.services-carousel::-webkit-scrollbar-thumb {
    background: #b0b0b0;
    border-radius: 6px;
}
.services-carousel {
    scrollbar-color: #b0b0b0 #f0f0f0;
    scrollbar-width: thin;
}
/* Mobile Responsive Styles */
@media (max-width: 768px) {
    .container {
        padding: 0 20px !important;
    }
    
    .section-header {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 1.5rem !important;
        text-align: left !important;
    }
    
    .section-header .tagline {
        font-size: 0.85rem !important;
        padding: 3px 12px !important;
        letter-spacing: 1px !important;
    }
    
    .section-header h2 {
        font-size: 2rem !important;
        line-height: 1.2 !important;
        margin-bottom: 1rem !important;
    }
    
    .section-header .btn {
        width: 100% !important;
        min-width: auto !important;
        padding: 0.75rem 1.5rem !important;
        font-size: 1rem !important;
        text-align: center !important;
    }
    
    .services-arrow {
        display: none !important;
    }
    
    .services-carousel {
        padding: 0 10px !important;
        margin: 0 -10px !important;
    }
    
    .service-card {
        width: 280px !important;
        min-width: 280px !important;
        margin-right: 16px !important;
    }
    
    .service-card h3 {
        font-size: 1.2rem !important;
    }
    
    .service-desc-truncate {
        font-size: 0.85rem !important;
        min-height: 50px !important;
    }
    
    .services-progress-bar {
        margin-top: 12px !important;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0 15px !important;
    }
    
    .section-header h2 {
        font-size: 1.75rem !important;
    }
    
    .service-card {
        width: 260px !important;
        min-width: 260px !important;
        margin-right: 12px !important;
    }
    
    .service-card h3 {
        font-size: 1.1rem !important;
    }
    
    .service-desc-truncate {
        font-size: 0.8rem !important;
        min-height: 45px !important;
    }
}

@media (max-width: 1100px) {
    .service-card { width: 300px !important; min-width: 300px !important; }
}

@media (max-width: 800px) {
    .service-card { width: 280px !important; min-width: 280px !important; }
}
</style>
<?php endif; ?> 