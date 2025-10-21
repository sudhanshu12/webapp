<?php
// Load settings if not already loaded
if (!isset($settings) || empty($settings)) {
    if (function_exists('bsg_get_settings')) {
        $settings = bsg_get_settings();
    } else {
        $settings = get_option('bsg_settings', []);
    }
}
$commitment_visible = $settings['commitment_visible'] ?? 1;
$commitment_title = $settings['commitment_title'] ?? 'Our Commitment to You';
$commitment_subtitle = $settings['commitment_subtitle'] ?? 'We promise to deliver exceptional service';
$commitment_text = $settings['commitment_text'] ?? '';
$commitment_image = $settings['commitment_image'] ?? '';

// Debug: Log commitment data
error_log('=== COMMITMENT DEBUG ===');
error_log('Commitment image URL: ' . ($commitment_image ?: 'EMPTY'));
error_log('Commitment image from settings: ' . ($settings['commitment_image'] ?? 'NOT SET'));
error_log('Commitment heading color from settings: ' . ($settings['commitment_heading_color'] ?? 'NOT SET'));
error_log('Commitment subtitle color from settings: ' . ($settings['commitment_subtitle_color'] ?? 'NOT SET'));
error_log('=== COMMITMENT DEBUG END ===');

if ($commitment_visible):
?>
<style>
/* Mobile Responsive Styles for Commitment Section */
@media (max-width: 768px) {
    .commitment-section {
        padding: 60px 0 !important;
    }
    
    .commitment-section .container {
        padding: 0 20px !important;
    }
    
    .commitment-section .two-col-layout {
        display: flex !important;
        flex-direction: column !important;
        gap: 2rem !important;
        align-items: center !important;
    }
    
    .commitment-section .content-image {
        order: 1 !important;
        width: 100% !important;
        max-width: 400px !important;
    }
    
    .commitment-section .content-image img {
        width: 100% !important;
        height: auto !important;
        border-radius: 12px !important;
        object-fit: cover !important;
    }
    
    .commitment-section .commitment-placeholder {
        height: 250px !important;
        border-radius: 12px !important;
    }
    
    .commitment-section .text-content {
        order: 2 !important;
        width: 100% !important;
        text-align: center !important;
    }
    
    .commitment-section .icon-heading {
        justify-content: center !important;
        margin-bottom: 1rem !important;
    }
    
    .commitment-section h2 {
        font-size: 2rem !important;
        line-height: 1.2 !important;
        margin-bottom: 1rem !important;
        text-align: center !important;
    }
    
    .commitment-section .commitment-subtitle {
        font-size: 1.1rem !important;
        line-height: 1.5 !important;
        margin-bottom: 1rem !important;
        text-align: center !important;
    }
    
    .commitment-section .commitment-text p {
        font-size: 1rem !important;
        line-height: 1.6 !important;
        text-align: center !important;
    }
}

@media (max-width: 480px) {
    .commitment-section {
        padding: 40px 0 !important;
    }
    
    .commitment-section .container {
        padding: 0 15px !important;
    }
    
    .commitment-section .two-col-layout {
        gap: 1.5rem !important;
    }
    
    .commitment-section .content-image {
        max-width: 100% !important;
    }
    
    .commitment-section .commitment-placeholder {
        height: 200px !important;
    }
    
    .commitment-section h2 {
        font-size: 1.75rem !important;
    }
    
    .commitment-section .commitment-subtitle {
        font-size: 1rem !important;
    }
    
    .commitment-section .commitment-text p {
        font-size: 0.95rem !important;
    }
}
</style>
<section class="section commitment-section animate-on-scroll-section" style="background-color: <?php echo esc_attr($settings['commitment_bg_color'] ?? '#f8f9fa'); ?>; color: <?php echo esc_attr($settings['commitment_text_color'] ?? '#232834'); ?>; padding: 105px 0;">
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 60px;">
        <div class="two-col-layout" style="display: flex; align-items: center; gap: 3rem;">
            <div class="content-image">
                <?php if (!empty($commitment_image)): ?>
                <img src="<?php echo esc_url($commitment_image); ?>" alt="<?php echo esc_attr($commitment_title); ?>" loading="lazy" decoding="async">
                <?php else: ?>
                <div class="commitment-placeholder" style="background: #f0f0f0; height: 300px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
                    <div style="text-align: center; color: #666;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <p style="margin-top: 10px;">Commitment Image Placeholder</p>
                        <p style="font-size: 0.9em;">Upload an image in the Commitment section</p>
                    </div>
                </div>
                <?php endif; ?>
            </div>
            <div class="text-content">
                <div class="icon-heading">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span>OUR COMMITMENT</span>
                </div>
                <h2 style="color: <?php echo esc_attr($settings['commitment_heading_color'] ?? '#ffffff'); ?>;"><?php echo esc_html($commitment_title); ?></h2>
                <p class="commitment-subtitle" style="color: <?php echo esc_attr($settings['commitment_subtitle_color'] ?? '#cfd8dc'); ?>;"><?php echo esc_html($commitment_subtitle); ?></p>
                <div class="commitment-text">
                    <?php if (!empty($commitment_text)): ?>
                    <p><?php echo esc_html($commitment_text); ?></p>
                    <?php else: ?>
                    <p style="color: #666; font-style: italic;">Add your commitment text in the Commitment section of the admin panel.</p>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</section>
<?php endif; ?>
