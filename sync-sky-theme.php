<?php
/**
 * Manual Color Theme Sync Script
 * This script manually applies the SKY color theme to your WordPress site
 * Run this script to sync color settings from wizard to WordPress
 */

// WordPress configuration
define('WP_USE_THEMES', false);
require_once('wp-config.php'); // Adjust path if needed

// SKY Color Theme Settings
$sky_theme_settings = [
    'color_theme' => 'sky',
    'use_default_color_scheme' => false,
    'global_primary_color' => '#0ea5e9',
    'global_secondary_color' => '#38bdf8',
    'global_accent_color' => '#0c4a6e',
    'nav_bg_color' => '#0c4a6e',
    'nav_text_color' => '#ffffff',
    'heading_color' => '#23282d',
    'button_primary_color' => '#0ea5e9',
    'button_secondary_color' => '#38bdf8',
    'surface_color' => '#e0f2fe',
    'text_color' => '#23282d',
    
    // Hero section colors
    'hero_bg_color' => '#e0f2fe',
    'hero_heading_color' => '#23282d',
    'hero_subheading_color' => '#64748b',
    'hero_description_color' => '#64748b',
    'hero_company_color' => '#0ea5e9',
    'hero_reviews_text_color' => '#23282d',
    'hero_reviews_star_color' => '#fbbf24',
    'hero_book_btn_bg' => '#0ea5e9',
    'hero_book_btn_text' => '#ffffff',
    'hero_call_btn_bg' => '#0c4a6e',
    'hero_call_btn_text' => '#ffffff',
    
    // Services section colors
    'services_bg_color' => '#f8fafc',
    'services_card_color' => '#ffffff',
    'services_text_color' => '#23282d',
    'services_icon_color' => '#0ea5e9',
    'services_cta_bg' => '#0ea5e9',
    'services_cta_text_color' => '#ffffff',
    
    // Features section colors
    'features_bg_color' => '#e0f2fe',
    'features_card_bg' => '#ffffff',
    'features_text_color' => '#23282d',
    'features_icon_color' => '#0ea5e9',
    
    // About section colors
    'about_bg_color' => '#f8fafc',
    'about_text_color' => '#23282d',
    'about_heading_color' => '#23282d',
    'about_tagline_color' => '#0ea5e9',
    
    // Footer colors
    'footer_bg_color' => '#0c4a6e',
    'footer_text_color' => '#ffffff',
];

// Get existing settings
$existing_settings = get_option('bsg_settings', []);

// Merge with existing settings (preserve other settings)
$updated_settings = array_merge($existing_settings, $sky_theme_settings);

// Save updated settings
$result = update_option('bsg_settings', $updated_settings);

if ($result) {
    echo "✅ SKY color theme applied successfully!\n";
    echo "🎨 Primary Color: #0ea5e9 (Sky Blue)\n";
    echo "🎨 Secondary Color: #38bdf8 (Light Blue)\n";
    echo "🎨 Navigation: #0c4a6e (Dark Blue)\n";
    echo "🎨 Background: #e0f2fe (Light Sky)\n";
    echo "\n🔄 Please refresh your website to see the changes.\n";
    echo "🌐 Website: https://insulationgrants.info/\n";
} else {
    echo "❌ Failed to apply color theme settings.\n";
}

// Clear any CSS cache
delete_transient('bsg_dynamic_css_cache');

echo "\n📝 Settings saved to WordPress options table.\n";
echo "🔧 CSS cache cleared for immediate effect.\n";
?>
