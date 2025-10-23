<?php
// Reusable FAQ Section Include
// Load settings if not already loaded
if (!isset($settings) || empty($settings)) {
    if (function_exists('bsg_get_settings')) {
        $settings = bsg_get_settings();
    } else {
        $settings = get_option('bsg_settings', []);
    }
}

// Debug: Check if settings are available
if (current_user_can('manage_options')) {
    echo '<!-- FAQ Debug: faq_visible = ' . (isset($settings['faq_visible']) ? 'true' : 'false') . ' -->';
    echo '<!-- FAQ Debug: faqs count = ' . (isset($settings['faqs']) ? count($settings['faqs']) : '0') . ' -->';
    echo '<!-- FAQ Debug: faqs is array = ' . (isset($settings['faqs']) && is_array($settings['faqs']) ? 'true' : 'false') . ' -->';
}

if (!empty($settings['faq_visible']) && !empty($settings['faqs']) && is_array($settings['faqs'])): 
    $faq_bg = $settings['faq_bg_color'] ?? '#232834';
    $faq_text = $settings['faq_text_color'] ?? '#fff';
    $faq_padding = $settings['faq_padding'] ?? '80';
    $faq_toggle_color = $settings['faq_toggle_color'] ?? '#2ee6c5';
    $faqs = $settings['faqs'];
    $faq_image = !empty($settings['faq_image']) ? $settings['faq_image'] : 
                 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
    
    // Debug: Log FAQ image data
    error_log('=== FAQ IMAGE DEBUG ===');
    error_log('FAQ image URL: ' . ($faq_image ?: 'EMPTY'));
    error_log('FAQ image from settings: ' . ($settings['faq_image'] ?? 'NOT SET'));
    error_log('FAQ heading from settings: ' . ($settings['faq_heading'] ?? 'NOT SET'));
    error_log('FAQ heading color from settings: ' . ($settings['faq_heading_color'] ?? 'NOT SET'));
    error_log('FAQ description color from settings: ' . ($settings['faq_description_color'] ?? 'NOT SET'));
    error_log('=== FAQ IMAGE DEBUG END ===');
    
    // Only use uploaded images - no fallback
    $faq_heading = $settings['faq_heading'] ?? 'Frequently Asked Questions';
    $faq_desc = $settings['faq_desc'] ?? 'Find answers to common questions about our services, pricing, scheduling, and project timelines. Our FAQ section helps you understand our process, what to expect, and how we deliver quality results for every project.';
    $faq_box_color = $settings['faq_box_color'] ?? '#374151';
    $faq_question_color = $settings['faq_question_color'] ?? '#ffffff';
    $faq_answer_color = $settings['faq_answer_color'] ?? '#b0b0b0';
?>
<section class="section faq-section animate-on-scroll-section" style="background: <?php echo esc_attr($faq_bg); ?>; color: <?php echo esc_attr($faq_text); ?>; padding: <?php echo intval($faq_padding); ?>px 0;">
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        <!-- FAQ Header with Image and Text -->
        <div class="faq-header" style="display: flex; align-items: center; gap: 3rem; margin-bottom: 3rem; flex-wrap: wrap;">
            <?php if (!empty($faq_image)): ?>
                <div style="flex: 0 0 350px; max-width: 350px; width: 350px; height: 350px; display: flex; align-items: center; justify-content: center; background: #22242c; border-radius: 24px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
                    <img src="<?php echo esc_url($faq_image); ?>" alt="FAQ" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" decoding="async">
                </div>
            <?php else: ?>
                <!-- Default landscaper image placeholder -->
                <div style="flex: 0 0 350px; max-width: 350px; width: 350px; height: 350px; display: flex; align-items: center; justify-content: center; background: #22242c; border-radius: 24px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
                    <div style="text-align: center; color: #666; padding: 20px;">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        <p style="margin: 10px 0 0 0; font-size: 14px;">Upload FAQ Image</p>
                    </div>
                </div>
            <?php endif; ?>
            
            <div style="flex: 1; min-width: 300px;">
                <h2 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; letter-spacing: -1px; line-height: 1.1; color: <?php echo esc_attr($settings['faq_heading_color'] ?? '#232834'); ?>;">
                    <?php echo esc_html($faq_heading); ?>
                </h2>
                <p style="color: <?php echo esc_attr($settings['faq_description_color'] ?? '#6b7280'); ?>; font-size: 1.15rem; margin-bottom: 0; max-width: 600px; line-height: 1.6;">
                    <?php echo esc_html($faq_desc); ?>
                </p>
            </div>
        </div>

        <!-- FAQ Items Container -->
        <div class="faq-container" style="max-width: 800px; margin: 0 auto;">
            <?php foreach ($faqs as $i => $faq): ?>
                <div class="faq-item" style="background: <?php echo esc_attr($faq_box_color); ?>; color: <?php echo esc_attr($faq_question_color); ?>; border-radius: 16px; margin-bottom: 18px; box-shadow: 0 4px 24px rgba(0,0,0,0.15); transition: all 0.3s ease; overflow: hidden;">
                    <div class="faq-question" style="display: flex; align-items: center; justify-content: space-between; cursor: pointer; font-weight: 700; font-size: 1.1rem; padding: 20px 24px; border-radius: 16px; min-height: unset; color: <?php echo esc_attr($faq_question_color); ?>; transition: background-color 0.3s ease;">
                        <span style="flex: 1; padding-right: 20px;"><?php echo esc_html($faq['question'] ?? ''); ?></span>
                        <span class="faq-icon" style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; font-size: 1.5rem; color: <?php echo esc_attr($faq_toggle_color); ?>; background: rgba(255,255,255,0.08); border-radius: 8px; transition: all 0.3s ease; flex-shrink: 0;">+</span>
                    </div>
                    <div class="faq-answer" style="display: none; padding: 0 24px 20px 24px; color: <?php echo esc_attr($faq_answer_color); ?>; font-size: 1rem; line-height: 1.6; border-radius: 0 0 16px 16px; max-height: 0; overflow: hidden; transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), padding 0.3s;">
                        <p style="margin: 0;"><?php echo nl2br(esc_html($faq['answer'] ?? '')); ?></p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<style>
.faq-section .faq-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
}

.faq-section .faq-question:hover {
    background: rgba(255,255,255,0.05);
}

.faq-section .faq-icon {
    transition: transform 0.3s ease, background-color 0.3s ease;
}

.faq-section .faq-item.active .faq-icon {
    transform: rotate(45deg);
    background: <?php echo esc_attr($faq_toggle_color); ?> !important;
    color: #fff !important;
}

@media (max-width: 900px) {
    .faq-header { 
        flex-direction: column; 
        gap: 2rem; 
        align-items: center; 
        text-align: center; 
    }
    .faq-header > div[style*='350px'] { 
        width: 100% !important; 
        max-width: 100% !important; 
        height: 250px !important; 
    }
    .faq-container { 
        max-width: 100%; 
        padding: 0 10px; 
    }
    .faq-item { 
        border-radius: 12px; 
        margin-bottom: 16px;
    }
    .faq-question { 
        font-size: 1rem; 
        padding: 18px 20px; 
        border-radius: 12px; 
    }
    .faq-answer { 
        padding: 0 20px 18px 20px; 
        border-radius: 0 0 12px 12px; 
    }
}

@media (max-width: 600px) {
    .faq-header > div[style*='350px'] { 
        height: 200px !important; 
    }
    .faq-header h2 {
        font-size: 2rem !important;
    }
    .faq-header p {
        font-size: 1rem !important;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.faq-question').forEach(function(q) {
        q.addEventListener('click', function() {
            var item = q.parentElement;
            var answer = item.querySelector('.faq-answer');
            var icon = q.querySelector('.faq-icon');
            var isOpen = item.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(function(i) {
                if (i !== item) {
                    i.classList.remove('active');
                    var otherAnswer = i.querySelector('.faq-answer');
                    var otherIcon = i.querySelector('.faq-icon');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                        otherAnswer.style.display = 'none';
                    }
                    if (otherIcon) {
                        otherIcon.style.transform = 'rotate(0deg)';
                        otherIcon.style.background = 'rgba(255,255,255,0.08)';
                        otherIcon.style.color = '<?php echo esc_attr($faq_toggle_color); ?>';
                    }
                }
            });
            
            // Toggle current item
            if (!isOpen) {
                item.classList.add('active');
                answer.style.display = 'block';
                answer.style.maxHeight = answer.scrollHeight + 'px';
                if (icon) {
                    icon.style.transform = 'rotate(45deg)';
                    icon.style.background = '<?php echo esc_attr($faq_toggle_color); ?>';
                    icon.style.color = '#fff';
                }
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = null;
                answer.style.display = 'none';
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                    icon.style.background = 'rgba(255,255,255,0.08)';
                    icon.style.color = '<?php echo esc_attr($faq_toggle_color); ?>';
                }
            }
        });
    });
    
    // On load, ensure all answers are collapsed
    document.querySelectorAll('.faq-answer').forEach(function(a) {
        a.style.maxHeight = null;
        a.style.display = 'none';
    });
});
</script>

<?php
// Add FAQ Schema for SEO
if (!empty($faqs) && is_array($faqs)):
    $faq_entities = [];
    foreach ($faqs as $f) {
        if (!empty($f['question']) && !empty($f['answer'])) {
            $faq_entities[] = [
                '@type' => 'Question',
                'name' => wp_strip_all_tags($f['question']),
                'acceptedAnswer' => [
                    '@type' => 'Answer',
                    'text' => wp_strip_all_tags($f['answer']),
                ]
            ];
        }
    }
    
    if (!empty($faq_entities)):
        $faq_schema = [
            '@context' => 'https://schema.org',
            '@type' => 'FAQPage',
            'mainEntity' => $faq_entities
        ];
        echo '<script type="application/ld+json">' . wp_json_encode($faq_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>';
    endif;
endif;
?>

<?php else: ?>
<!-- Fallback FAQ section if settings are not configured -->
<section class="section faq-section" style="background: #f8f9fa; color: #232834; padding: 40px 0;">
    <div class="container" style="max-width: 800px; margin: 0 auto; text-align: center;">
        <h2 style="font-size:2.2rem;font-weight:800;margin-bottom:1rem;">FAQ Section Not Configured</h2>
        <p style="color:#666;margin-bottom:2rem;">The FAQ section is not showing because:</p>
        <ul style="list-style: none; padding: 0; color: #666;">
            <li>faq_visible is not set to true</li>
            <li>faqs array is empty or not configured</li>
        </ul>
        <p style="margin-top: 2rem;">
            <a href="<?php echo admin_url('admin.php?page=bsg-theme-settings'); ?>" style="background: #007cba; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Configure FAQ Settings
            </a>
        </p>
    </div>
</section>
<?php endif; ?>