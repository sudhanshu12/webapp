<?php
// Shared About section include
$settings = function_exists('bsg_get_settings') ? bsg_get_settings() : (get_option('bsg_settings', []) ?: []);

$about_visible = $settings['about_visible'] ?? 1;
if (!$about_visible) { return; }

$about_tagline = $settings['about_tagline'] ?? 'WHO WE ARE';
$about_tagline_color = $settings['about_tagline_color'] ?? '#4ecdc4';
$about_headline = $settings['about_heading'] ?? 'About Our Company';
$about_headline_color = $settings['about_heading_color'] ?? '#fff';
$about_desc = $settings['about_description'] ?? '';
$about_desc_color = $settings['about_description_color'] ?? '#cfd8dc';
$about_desc_font_size = $settings['about_description_font_size'] ?? '0.90rem';
$about_years = $settings['about_years'] ?? '15';
$about_experience_label = $settings['about_experience_text'] ?? 'Years of Experience';
$about_experience_color = $settings['about_experience_bg'] ?? '#232f38';
$about_experience_text_color = $settings['about_experience_text_color'] ?? '#4ecdc4';
$about_cta = $settings['about_button_text'] ?? 'About Us';
$about_cta_link = $settings['about_button_link'] ?? 'https://insulationgrants.info/about-us/';
// Use about_home_image first, fallback to about_image
$about_image = !empty($settings['about_home_image']) ? $settings['about_home_image'] : ($settings['about_image'] ?? '');
$about_bg_color = $settings['about_bg_color'] ?? '#232834';
$about_text_color = $settings['about_text_color'] ?? '#fff';
$about_margin_left = $settings['about_margin_left'] ?? 60;
$about_margin_right = $settings['about_margin_right'] ?? 60;
?>
<style>
/* Mobile Responsive Styles for About Section */
@media (max-width: 768px) {
    .about-section {
        padding: 60px 0 !important;
    }
    
    .homepage-about-flex {
        flex-direction: column !important;
        gap: 2rem !important;
        padding: 2rem 20px !important;
        text-align: center !important;
    }
    
    .homepage-about-img {
        order: 1 !important;
        flex: none !important;
        width: 100% !important;
        max-width: 300px !important;
        margin: 0 auto !important;
    }
    
    .homepage-about-img img {
        max-width: 100% !important;
        width: 100% !important;
        height: auto !important;
        border-radius: 12px !important;
    }
    
    .homepage-about-content {
        order: 2 !important;
        flex: none !important;
        width: 100% !important;
        text-align: center !important;
    }
    
    .homepage-about-who {
        justify-content: center !important;
        margin-bottom: 1rem !important;
    }
    
    .homepage-about-who svg {
        width: 18px !important;
        height: 18px !important;
    }
    
    .homepage-about-who {
        font-size: 0.9rem !important;
    }
    
    .about-section h2 {
        font-size: 1.8rem !important;
        line-height: 1.2 !important;
        margin-bottom: 1rem !important;
        text-align: center !important;
    }
    
    .homepage-about-text {
        font-size: 0.95rem !important;
        line-height: 1.6 !important;
        margin-bottom: 1.5rem !important;
        text-align: center !important;
    }
    
    .homepage-about-row {
        flex-direction: column !important;
        gap: 1rem !important;
        align-items: center !important;
        margin-top: 1.5rem !important;
    }
    
    .homepage-about-badge {
        padding: 0.6rem 1rem !important;
        font-size: 1rem !important;
        text-align: center !important;
        width: auto !important;
    }
    
    .homepage-about-btn {
        padding: 0.6rem 1.5rem !important;
        font-size: 0.95rem !important;
        text-align: center !important;
        width: auto !important;
        margin-left: 0 !important;
    }
}

@media (max-width: 480px) {
    .about-section {
        padding: 40px 0 !important;
    }
    
    .homepage-about-flex {
        padding: 1.5rem 15px !important;
        gap: 1.5rem !important;
    }
    
    .homepage-about-img {
        max-width: 250px !important;
    }
    
    .homepage-about-who {
        font-size: 0.85rem !important;
    }
    
    .homepage-about-who svg {
        width: 16px !important;
        height: 16px !important;
    }
    
    .about-section h2 {
        font-size: 1.6rem !important;
    }
    
    .homepage-about-text {
        font-size: 0.9rem !important;
    }
    
    .homepage-about-badge {
        padding: 0.5rem 0.8rem !important;
        font-size: 0.9rem !important;
    }
    
    .homepage-about-btn {
        padding: 0.5rem 1.2rem !important;
        font-size: 0.9rem !important;
    }
}
</style>
<section class="about-section animate-on-scroll-section" style="background: <?php echo esc_attr($about_bg_color); ?>; color: <?php echo esc_attr($about_text_color); ?>; padding: 80px 0;">
    <div class="homepage-about-flex" style="display: flex; align-items: center; gap: 3rem; max-width: 1200px; margin: 0 auto; padding: 3rem 120px; justify-content: center;">
        <div class="homepage-about-img" style="flex: 1; display: flex; align-items: center; justify-content: center;">
            <?php if (!empty($about_image)): ?>
                <img src="<?php echo esc_url($about_image); ?>" alt="Our Team" style="max-width: 350px; width: 100%; border-radius: 8px; box-shadow: 0 2px 16px rgba(0,0,0,0.08);">
            <?php else: ?>
                <div style="max-width: 350px; width: 100%; height: 400px; border-radius: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; font-weight: 600; box-shadow: 0 2px 16px rgba(0,0,0,0.08);">
                    <div style="text-align: center;">
                        <svg width="64" height="64" fill="white" viewBox="0 0 24 24" style="margin-bottom: 1rem; opacity: 0.9;">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        <div>About Us Image</div>
                    </div>
                </div>
            <?php endif; ?>
        </div>
        <div class="homepage-about-content" style="flex: 2; color: <?php echo esc_attr($about_text_color); ?>;">
            <div class="homepage-about-who" style="display: flex; align-items: center; gap: 0.5rem; color: <?php echo esc_attr($about_tagline_color); ?>; font-weight: 600; font-size: 1rem; margin-bottom: 0.5rem; letter-spacing: 0.5px;">
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                <?php echo esc_html($about_tagline); ?>
            </div>
            <h2 style="font-size: 2.2rem; font-weight: 800; margin: 0 0 1rem 0; color: <?php echo esc_attr($about_headline_color); ?>;">
                <?php echo esc_html($about_headline); ?>
            </h2>
            <div class="homepage-about-text" style="font-size: <?php echo esc_attr($about_desc_font_size); ?>; margin-bottom: 1.2rem; color: <?php echo esc_attr($about_desc_color); ?>;">
                <?php 
                $about_content = $about_desc;
                if (strip_tags($about_content) === $about_content) {
                    $about_content = str_replace("\\'", "'", $about_content);
                    $about_content = str_replace('\"', '"', $about_content);
                    $about_content = preg_replace('/([.?!])(?=[A-Z])/', '$1 ', $about_content);
                    $about_content = wpautop($about_content);
                }
                echo wp_kses_post($about_content);
                ?>
            </div>
            <div class="homepage-about-row" style="display: flex; align-items: center; gap: 1rem; margin-top: 1.2rem;">
                <div class="homepage-about-badge" style="background: <?php echo esc_attr($about_experience_color); ?>; color: <?php echo esc_attr($about_experience_text_color); ?>; padding: 0.7rem 1.2rem 0.7rem 1rem; border-radius: 8px; font-size: 1.1rem; font-weight: 700; display: flex; align-items: center; gap: 0.7rem;">
                    <span style="font-size: 1.4rem; font-weight: 800; margin-right: 0.3rem;"><?php echo esc_html($about_years); ?></span> 
                    <?php echo esc_html($about_experience_label); ?>
                </div>
                <a href="<?php echo esc_url($about_cta_link); ?>" class="homepage-about-btn" style="background: <?php echo esc_attr($settings['about_button_color'] ?? '#2563eb'); ?>; color: <?php echo esc_attr($settings['about_button_text_color'] ?? '#ffffff'); ?>; padding: 0.7rem 1.2rem; border: none; border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer; text-decoration: none; transition: background 0.2s; margin-left: 0.3rem; box-shadow: none;">
                    <?php echo esc_html($about_cta); ?>
                </a>
            </div>
        </div>
    </div>
</section>

