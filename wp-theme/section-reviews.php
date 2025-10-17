<?php
// Always use centralized settings loader so values match everywhere
$settings = function_exists('bsg_get_settings') ? bsg_get_settings() : (get_option('bsg_settings', []) ?: []);
$reviews = is_array($settings['reviews'] ?? null) ? $settings['reviews'] : [];
echo "<!-- BSG REVIEWS DEBUG: reviews_count=" . count($reviews) . " visible=" . (isset($settings['reviews_visible']) ? ($settings['reviews_visible'] ? '1' : '0') : 'unset') . " -->\n";
// Default: show reviews section unless explicitly disabled in wizard
$reviews_visible = isset($settings['reviews_visible']) ? (bool)$settings['reviews_visible'] : true;

if ($reviews_visible):
?>
<style>
/* Reviews Section Styles - Updated <?php echo date('Y-m-d H:i:s'); ?> */
.bsg-reviews .container { max-width: <?php echo esc_attr($settings['reviews_max_width'] ?? '1200'); ?>px !important; margin-left:auto !important; margin-right:auto !important; }
.bsg-reviews .section-header { text-align:left; margin-bottom:1.2rem !important; }
.bsg-reviews .reviews-google-bar { background:#fff; border-radius:16px; box-shadow:0 2px 12px rgba(0,0,0,0.04); }
.bsg-reviews .review-card { background:#fff; border-radius:18px; box-shadow:0 2px 12px rgba(0,0,0,0.07); }
.bsg-reviews .reviews-slider { overflow-x:auto; scroll-behavior:smooth; display:flex; gap:2rem; padding-bottom:8px; }
.bsg-reviews .reviews-slider-arrow { background:none; border:none; box-shadow:none; }
.bsg-reviews .section-header h2 { color: <?php echo esc_attr($settings['reviews_heading_color'] ?? '#1f2937'); ?> !important; }
.bsg-reviews .section-header .tagline span { color: <?php echo esc_attr($settings['reviews_subtitle_color'] ?? '#6b7280'); ?> !important; }
/* Mobile Responsive Styles for Reviews Section */
@media (max-width: 768px) {
    .bsg-reviews .container {
        padding: 1.5rem 1rem !important;
        margin: 0 10px !important;
    }
    
    .bsg-reviews .section-header {
        text-align: center !important;
        margin-bottom: 1.5rem !important;
    }
    
    .bsg-reviews .section-header h2 {
        font-size: 2rem !important;
        line-height: 1.2 !important;
        margin-bottom: 1rem !important;
    }
    
    .bsg-reviews .tagline {
        justify-content: center !important;
        margin-bottom: 0.5rem !important;
    }
    
    .bsg-reviews .reviews-google-bar {
        flex-direction: column !important;
        gap: 0.8rem !important;
        padding: 1rem !important;
        text-align: center !important;
        margin: 0 auto 1.5rem auto !important;
    }
    
    .bsg-reviews .reviews-google-bar img {
        height: 32px !important;
    }
    
    .bsg-reviews .reviews-google-bar span {
        font-size: 0.9rem !important;
    }
    
    .bsg-reviews .reviews-slider-wrapper {
        position: relative !important;
        margin: 0 -10px !important;
        padding: 0 10px !important;
    }
    
    .bsg-reviews .reviews-slider-arrow {
        display: none !important;
    }
    
    .bsg-reviews .reviews-slider {
        gap: 1rem !important;
        padding: 0 5px !important;
        -webkit-overflow-scrolling: touch !important;
        scroll-snap-type: x mandatory !important;
    }
    
    .bsg-reviews .review-card {
        scroll-snap-align: start !important;
    }
    
    .bsg-reviews .review-card {
        min-width: 280px !important;
        max-width: 320px !important;
        margin: 0 5px !important;
        padding: 1.2rem !important;
    }
    
    .bsg-reviews .review-card p {
        font-size: 0.9rem !important;
        line-height: 1.4 !important;
    }
}

@media (max-width: 480px) {
    .bsg-reviews .container {
        padding: 1rem 0.5rem !important;
        margin: 0 5px !important;
    }
    
    .bsg-reviews .section-header h2 {
        font-size: 1.75rem !important;
    }
    
    .bsg-reviews .reviews-google-bar {
        padding: 0.8rem !important;
        gap: 0.6rem !important;
    }
    
    .bsg-reviews .reviews-google-bar img {
        height: 28px !important;
    }
    
    .bsg-reviews .reviews-google-bar span {
        font-size: 0.85rem !important;
    }
    
    .bsg-reviews .review-card {
        min-width: 260px !important;
        max-width: 300px !important;
        padding: 1rem !important;
    }
    
    .bsg-reviews .review-card p {
        font-size: 0.85rem !important;
    }
}

@media (max-width: 900px) { 
    .bsg-reviews .section-header h2 { font-size:2rem !important; } 
}
</style>
<section class="section reviews-section bsg-reviews animate-on-scroll-section" style="background-color: <?php echo esc_attr(($settings['reviews_bg_color'] ?? '') ?: ($settings['surface_color'] ?? 'var(--surface-color)')); ?>; color: <?php echo esc_attr(($settings['reviews_text_color'] ?? '') ?: ($settings['text_color'] ?? 'var(--text-color)')); ?>; padding: <?php echo esc_attr($settings['reviews_padding'] ?? '60'); ?>px 0; min-height: 300px;">
    <div class="container" style="background:<?php echo esc_attr($settings['reviews_card_bg_color'] ?? '#fff'); ?>;border-radius:0;padding:2.5rem 2rem;box-shadow:0 2px 16px rgba(0,0,0,0.10);max-width:<?php echo esc_attr($settings['reviews_max_width'] ?? '1200'); ?>px;margin-left:auto;margin-right:auto;">
        <div class="section-header" style="text-align:left;margin-bottom:1.2rem;">
            <div class="tagline" style="display:inline-flex;align-items:center;gap:0.7rem;margin-bottom:10px;margin-top:0;background:none;">
                <span style="display:inline-flex;align-items:center;font-size:1rem;letter-spacing:2px;font-weight:700;text-transform:uppercase;background:rgba(46,230,197,0.08);border-radius:6px;padding:2px 14px 2px 8px;color:<?php echo esc_attr($settings['reviews_subtitle_color'] ?? '#6b7280'); ?> !important;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="margin-right:8px;vertical-align:middle;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#2ee6c5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <?php echo esc_html($settings['reviews_label'] ?? 'WHAT PEOPLE SAY'); ?>
                </span>
            </div>
            <h2 style="font-size:2.5rem;font-weight:800;margin:0 0 0.5rem 0;line-height:1.1;letter-spacing:-1px;color:<?php echo esc_attr($settings['reviews_heading_color'] ?? '#1f2937'); ?> !important;">
                <?php echo esc_html($settings['reviews_title'] ?? 'What Our Customers Say'); ?>
            </h2>
        </div>
        <?php if (!empty($reviews)): ?>
        <?php
            $total_reviews = count($reviews);
            $avg_rating = $total_reviews ? round(array_sum(array_column($reviews, 'rating')) / $total_reviews, 1) : 5.0;
        ?>
        <div class="reviews-google-bar" style="background:#fff;border-radius:16px;padding:16px 32px 12px 32px;max-width:1020px;margin:0 auto 24px auto;display:flex;align-items:center;justify-content:center;gap:1.2rem;box-shadow:0 2px 12px rgba(0,0,0,0.04);">
            <img src="https://ik.imagekit.io/kauapzysq/Adobe%20Express%20-%20file.png?updatedAt=1752473826860" alt="Google" style="height:40px;width:auto;object-fit:contain;display:block;" loading="lazy" decoding="async">
            <span style="margin:0 10px;color:#232834;">Excellent</span>
            <span style="color:#fbbf24;font-size:1.2rem;">
                <?php for ($i=0; $i<5; $i++): ?>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="<?php echo $i < round($avg_rating) ? '#fbbf24' : '#e5e7eb'; ?>"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <?php endfor; ?>
            </span>
            <span style="font-weight:600;font-size:1.1rem;color:#232834;"> <?php echo $avg_rating; ?> </span>
            <span style="color:#888;"> <?php echo $total_reviews; ?> reviews</span>
            <?php if (!empty($settings['reviews_write_link'])): ?>
            <a href="<?php echo esc_url($settings['reviews_write_link']); ?>" target="_blank" rel="noopener" style="margin-left:auto;background:#2563eb;color:#fff;padding:0.7rem 1.5rem;border-radius:6px;font-weight:600;text-decoration:none;font-size:1rem;box-shadow:0 2px 8px rgba(37,99,235,0.08);">Write a review</a>
            <?php endif; ?>
        </div>
        <div class="reviews-slider-wrapper" style="position:relative;display:flex;align-items:center;">
            <button class="reviews-slider-arrow left" style="position:absolute;left:-56px;top:50%;transform:translateY(-50%);background:none;border:none;color:#b0b6be;width:40px;height:40px;border-radius:50%;font-size:2.2rem;z-index:2;cursor:pointer;box-shadow:none;display:flex;align-items:center;justify-content:center;outline:none;">
                <svg width="28" width="28" viewBox="0 0 24 24" fill="none" stroke="#b0b6be" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div class="reviews-slider" style="overflow-x:auto;scroll-behavior:smooth;display:flex;gap:2rem;padding-bottom:8px;width:100%;">
                <?php foreach ($reviews as $idx => $review): ?>
                <?php 
                    $dbg_text = isset($review['text']) ? $review['text'] : '';
                    $dbg_comment = isset($review['comment']) ? $review['comment'] : '';
                    $review_name = $review['name'] ?? 'Anonymous';
                    $review_initial = !empty($review_name) ? strtoupper(substr($review_name, 0, 1)) : 'A';
                    echo "<!-- BSG REVIEW ITEM #" . ($idx+1) . ": name=" . $review_name . " textlen=" . strlen($dbg_text) . " commentlen=" . strlen($dbg_comment) . " -->\n";
                    // Debug: Show review name even if empty
                    if (empty($review_name) || $review_name === 'Anonymous') {
                        echo "<!-- DEBUG: Review name is empty or Anonymous, using fallback -->\n";
                        $review_name = 'Customer ' . ($idx + 1);
                        $review_initial = strtoupper(substr($review_name, 0, 1));
                    } 
                ?>
                <div class="review-card" style="background:#fff;border-radius:18px;box-shadow:0 2px 12px rgba(0,0,0,0.07);padding:22px 22px 18px 22px;max-width:320px;min-width:260px;width:100%;margin:0 10px;display:flex;flex-direction:column;gap:0.7rem;">
                    <div style="display:flex;align-items:center;gap:0.8rem;">
                        <div style="width:36px;height:36px;border-radius:50%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;color:#374151;font-weight:700;">
                            <?php echo esc_html($review_initial); ?>
                        </div>
                        <div style="display:flex;flex-direction:column;line-height:1.2;">
                            <span style="font-weight:700;color:#1f2937;"><?php echo esc_html($review_name); ?></span>
                            <span style="color:#6b7280;font-size:0.875rem;">Verified Customer</span>
                        </div>
                        <span style="margin-left:auto;color:#fbbf24;">
                            <?php for ($i = 0; $i < 5; $i++): ?>
                                <svg width="16" width="16" viewBox="0 0 24 24" fill="<?php echo $i < intval($review['rating']) ? '#fbbf24' : '#e5e7eb'; ?>"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                            <?php endfor; ?>
                        </span>
                    </div>
                    <?php 
                    $review_text = $review['text'] ?? ($review['comment'] ?? '');
                    ?>
                    <p style="margin:8px 0 6px 0;color:#111827;line-height:1.5;"><?php echo esc_html($review_text); ?></p>
                    <span style="color:#9ca3af;font-size:0.85rem;">— <?php echo esc_html($review['date'] ?? 'Recent'); ?></span>
                </div>
                <?php endforeach; ?>
            </div>
            <button class="reviews-slider-arrow right" style="position:absolute;right:-56px;top:50%;transform:translateY(-50%);background:none;border:none;color:#b0b6be;width:40px;height:40px;border-radius:50%;font-size:2.2rem;z-index:2;cursor:pointer;box-shadow:none;display:flex;align-items:center;justify-content:center;outline:none;">
                <svg width="28" width="28" viewBox="0 0 24 24" fill="none" stroke="#b0b6be" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
        </div>
        <?php else: ?>
        <div style="color: #ccc; font-style: italic; margin-top: 20px;">No reviews added yet. Add reviews in the admin panel.</div>
        <?php endif; ?>
    </div>
</section>
<?php endif; ?>
