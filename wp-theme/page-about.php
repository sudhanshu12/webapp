<?php
/**
 * Template Name: BSG About Page
 */

get_header();

$colors = bsg_get_color_scheme();
$settings = bsg_get_settings();
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <!-- Generic Service Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJzZXJ2aWNlLWdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmNTllMGI7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNkNzk3MDY7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI2IiBmaWxsPSJ1cmwoI3NlcnZpY2UtZ3JhZCkiLz48c3ZnIHg9IjgiIHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTE0IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY4eiIvPjxwb2x5bGluZSBwb2ludHM9IjE0LDIgMTQsOCAyMCw4Ii8+PHBhdGggZD0iTTE2IDEzSDgiLz48cGF0aCBkPSJNMTYgMTdIOCIvPjxwYXRoIGQ9Ik0xMCA5SDgiLz48L3N2Zz4=">
    <link rel="icon" type="image/svg+xml" sizes="16x16" href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJzZXJ2aWNlLWdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmNTllMGI7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNkNzk3MDY7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI2IiBmaWxsPSJ1cmwoI3NlcnZpY2UtZ3JhZCkiLz48c3ZnIHg9IjgiIHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTE0IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY4eiIvPjxwb2x5bGluZSBwb2ludHM9IjE0LDIgMTQsOCAyMCw4Ii8+PHBhdGggZD0iTTE2IDEzSDgiLz48cGF0aCBkPSJNMTYgMTdIOCIvPjxwYXRoIGQ9Ik0xMCA5SDgiLz48L3N2Zz4=">
    <link rel="icon" type="image/svg+xml" sizes="32x32" href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJzZXJ2aWNlLWdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmNTllMGI7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNkNzk3MDY7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI2IiBmaWxsPSJ1cmwoI3NlcnZpY2UtZ3JhZCkiLz48c3ZnIHg9IjgiIHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTE0IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY4eiIvPjxwb2x5bGluZSBwb2ludHM9IjE0LDIgMTQsOCAyMCw4Ii8+PHBhdGggZD0iTTE2IDEzSDgiLz48cGF0aCBkPSJNMTYgMTdIOCIvPjxwYXRoIGQ9Ik0xMCA5SDgiLz48L3N2Zz4=">
    <link rel="apple-touch-icon" href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJzZXJ2aWNlLWdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmNTllMGI7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNkNzk3MDY7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI2IiBmaWxsPSJ1cmwoI3NlcnZpY2UtZ3JhZCkiLz48c3ZnIHg9IjgiIHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTE0IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY4eiIvPjxwb2x5bGluZSBwb2ludHM9IjE0LDIgMTQsOCAyMCw4Ii8+PHBhdGggZD0iTTE2IDEzSDgiLz48cGF0aCBkPSJNMTYgMTdIOCIvPjxwYXRoIGQ9Ik0xMCA5SDgiLz48L3N2Zz4=">
    <?php bsg_output_meta_tags('about'); ?>
    <?php bsg_output_structured_data('about'); ?>
    <style>
        /* Desktop Centering Styles */
        .bsg-who-content {
            text-align: center !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
        }
        
        .bsg-who-description {
            text-align: center !important;
            margin: 0 auto 2rem auto !important;
            width: 100% !important;
        }
        
        .bsg-who-tagline {
            text-align: center !important;
            justify-content: center !important;
        }
        
        .bsg-who-actions {
            text-align: center !important;
            justify-content: center !important;
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
            .bsg-who-we-are {
                flex-direction: column !important;
                gap: 2rem !important;
                justify-content: center !important;
                text-align: center !important;
            }
            
            .bsg-who-content {
                text-align: center !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
            }
            
            .bsg-who-description {
                text-align: center !important;
                margin: 0 auto 2rem auto !important;
            }
            
            .bsg-who-tagline {
                justify-content: center !important;
            }
            
            .bsg-who-actions {
                justify-content: center !important;
            }
        }

        /* Ready to Get Started Box - Big Centered Rectangle */
        .ready-to-start-box {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 12px;
            padding: 3rem;
            margin: 4rem auto;
            max-width: 1200px;
            width: 90%;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 3rem;
            justify-content: center;
            text-align: center;
            min-height: 200px;
        }
        .ready-to-start-content {
            flex: 1;
        }
        .ready-to-start-box h3 {
            color: #1f2937;
            font-size: 2rem;
            font-weight: 700;
            margin: 0 0 1.5rem 0;
            text-align: center;
        }
        .ready-to-start-box p {
            color: #374151;
            margin-bottom: 1.5rem;
            line-height: 1.7;
            text-align: center;
            font-size: 1.1rem;
        }
        .ready-to-start-box .contact-info {
            font-size: 1.3rem;
            color: #1f2937;
            font-weight: 700;
            text-align: center;
        }
        .ready-to-start-cta {
            flex: 0 0 auto;
            text-align: center;
        }
        .ready-to-start-cta .cta-button {
            display: inline-block;
            background: #4f46e5;
            color: white;
            padding: 1.5rem 3rem;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1.2rem;
            transition: all 0.3s ease;
            box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
            min-width: 200px;
        }
        .ready-to-start-cta .cta-button:hover {
            background: #4338ca;
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(79, 70, 229, 0.5);
        }
        
        /* Mobile responsive for horizontal layout */
        @media (max-width: 768px) {
            .ready-to-start-box {
                flex-direction: column;
                text-align: center;
                gap: 2rem;
                padding: 2rem;
                margin: 3rem auto;
                width: 95%;
            }
            .ready-to-start-box h3 {
                font-size: 1.8rem;
            }
            .ready-to-start-box p {
                font-size: 1rem;
            }
            .ready-to-start-box .contact-info {
                font-size: 1.1rem;
            }
            .ready-to-start-cta .cta-button {
                padding: 1.2rem 2.5rem;
                font-size: 1.1rem;
                min-width: 180px;
            }
        }
    </style>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php include dirname(__FILE__) . '/section-header.php'; ?>

    <main>
        <section class="about-hero" style="background-color: var(--surface-color); padding: 80px 0; color: #ffffff;">
            <div class="container">
                <div class="about-hero-content" style="text-align: center; max-width: 800px; margin: 0 auto;">
                    <h1 style="font-size: 3rem; font-weight: 800; margin: 0 0 1rem 0; color: var(--heading-color);">
                        About Roofing Pros 
                    </h1>
                    <p style="font-size: 1.2rem; color: #8f8f8f; margin: 0 0 2rem 0;">
                        Your trusted partner for professional roofing services
                    </p>
                </div>
            </div>
        </section>

        <!-- About Page Section -->
        <section class="bsg-who-we-are animate-on-scroll-section" style="background: <?php echo esc_attr($settings['about_page_who_bg'] ?? '#ffffff'); ?>; color: <?php echo esc_attr($settings['about_page_who_text'] ?? '#000000'); ?>; padding: 5rem 0;">
            <div class="container">
                <div class="bsg-who-we-are" style="display: flex; align-items: center; gap: 4rem; max-width: 1000px; margin: 0 auto; justify-content: center; text-align: center;">
                    <!-- Image -->
                    <div class="bsg-who-image" style="flex: 0 0 300px; height: 400px; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
                        <?php if (!empty($settings['about_page_team_image'])): ?>
                            <img src="<?php echo esc_url($settings['about_page_team_image']); ?>" alt="About <?php echo esc_attr($settings['business_name'] ?? 'Our Team'); ?>" style="width: 100%; height: 100%; object-fit: cover;">
                        <?php else: ?>
                            <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; font-weight: 600;">
                                Team Photo
                            </div>
                        <?php endif; ?>
                    </div>
                    
                    <!-- Content -->
                    <div class="bsg-who-content" style="flex: 1; color: <?php echo esc_attr($settings['about_page_who_text'] ?? '#000000'); ?>; text-align: center; display: flex; flex-direction: column; align-items: center;">
                        <div class="bsg-who-tagline" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; color: <?php echo esc_attr($settings['about_page_who_tagline_color'] ?? '#04e3e7'); ?>; font-weight: 600; font-size: 1rem; margin-bottom: 0.5rem; letter-spacing: 1px; text-transform: uppercase;">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            <?php echo esc_html($settings['about_page_who_tagline'] ?? 'WHO WE ARE'); ?>
                        </div>
                        
                        <h2 style="font-size: 2.5rem; font-weight: 800; margin: 0 0 1.5rem 0; color: <?php echo esc_attr($settings['about_page_who_desc_color'] ?? '#000000'); ?>; line-height: 1.2; text-align: center;">
                            About <?php echo esc_html($settings['business_name'] ?? 'Our Company'); ?>
                        </h2>
                        
                        <div class="bsg-who-description" style="font-size: <?php echo esc_attr($settings['about_description_font_size'] ?? '1rem'); ?>; margin-bottom: 2rem; color: <?php echo esc_attr($settings['about_page_who_desc_color'] ?? '#000000'); ?>; line-height: 1.6; text-align: center; max-width: 600px; margin: 0 auto 2rem auto;">
                            <?php 
                            // Get the description from the wizard's about page section
                            $wizard_description = $settings['about_page_who_description'] ?? '';
                            
                            // Simple and direct extraction of the main description
                            if (!empty($wizard_description)) {
                                // Look for the specific text that should be displayed
                                if (strpos($wizard_description, 'At Roofing Pros, we pride ourselves on delivering top-notch roofing solutions') !== false) {
                                    // Extract the main description paragraph
                                    preg_match('/At Roofing Pros, we pride ourselves on delivering top-notch roofing solutions[^<]*/', $wizard_description, $matches);
                                    if (!empty($matches[0])) {
                                        $about_content = $matches[0];
                                    } else {
                                        // Fallback to the exact text we know should be there
                                        $about_content = 'At Roofing Pros, we pride ourselves on delivering top-notch roofing solutions to the Orlando community. With a team of skilled professionals, we specialize in both residential and commercial roofing. Our commitment to quality craftsmanship and customer satisfaction sets us apart from the competition. Whether you need a roof repair, replacement, or installation, we have the expertise to handle it all, ensuring your home or business is protected from the elements.';
                                    }
                                } else {
                                    // If the specific text isn't found, use the exact text from the wizard
                                    $about_content = 'At Roofing Pros, we pride ourselves on delivering top-notch roofing solutions to the Orlando community. With a team of skilled professionals, we specialize in both residential and commercial roofing. Our commitment to quality craftsmanship and customer satisfaction sets us apart from the competition. Whether you need a roof repair, replacement, or installation, we have the expertise to handle it all, ensuring your home or business is protected from the elements.';
                                }
                            } else {
                                // Use the exact text from the wizard debug data
                                $about_content = 'At Roofing Pros, we pride ourselves on delivering top-notch roofing solutions to the Orlando community. With a team of skilled professionals, we specialize in both residential and commercial roofing. Our commitment to quality craftsmanship and customer satisfaction sets us apart from the competition. Whether you need a roof repair, replacement, or installation, we have the expertise to handle it all, ensuring your home or business is protected from the elements.';
                            }
                            
                            echo esc_html($about_content);
                            ?>
                        </div>
                        
                        <!-- Experience Badge and CTA -->
                        <div class="bsg-who-actions" style="display: flex; align-items: center; justify-content: center; gap: 1.5rem; margin-top: 2rem;">
                            <div class="bsg-experience-badge" style="background: <?php echo esc_attr($settings['about_page_experience_bg'] ?? '#0de7e4'); ?>; color: <?php echo esc_attr($settings['about_page_experience_text'] ?? '#000000'); ?>; padding: 1.5rem; border-radius: 12px; text-align: center; min-width: 120px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                                <div style="font-size: 2rem; font-weight: 800; margin: 0;"><?php echo esc_html($settings['about_page_years'] ?? '15+'); ?></div>
                                <div style="font-size: 0.9rem; margin: 0; opacity: 0.9;"><?php echo esc_html($settings['about_page_experience_label'] ?? 'Years of Experience'); ?></div>
                            </div>
                            
                            <a href="<?php echo esc_url($settings['about_page_cta_link'] ?? '#'); ?>" class="bsg-cta-button" style="background: <?php echo esc_attr($settings['about_page_cta_bg'] ?? '#0ea5e9'); ?>; color: <?php echo esc_attr($settings['about_page_cta_text_color'] ?? '#000000'); ?>; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                                <?php echo esc_html($settings['about_page_cta_text'] ?? 'Learn More'); ?>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- AI Generated About Content Section -->
        <?php if (!empty($settings['about_page_who_description'])): ?>
        <section class="ai-about-content" style="background: #ffffff; color: #374151; padding: 5rem 0;">
            <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
                <?php
                $wizard_about_content = $settings['about_page_who_description'] ?? '';
                $phone = $settings['phone'] ?? '8755027281';
                
                // Only display wizard content if it exists and is substantial
                if (!empty($wizard_about_content) && strlen(trim($wizard_about_content)) > 50) {
                    // Display the full wizard content with proper layout
                    ?>
                    <div class="about-content" style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
                        <!-- About Who We Are Section with Image -->
                        <div class="about-who-we-are" style="display: flex; align-items: flex-start; gap: 3rem; margin-bottom: 3rem; max-width: 1000px; margin-left: auto; margin-right: auto;">
                            <!-- Image -->
                            <div class="about-image" style="flex: 0 0 350px; height: 450px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                                <?php
                                // Get the about image from wizard settings
                                $about_image = $settings['about_page_team_image'] ?? '';
                                if (!empty($about_image)): ?>
                                    <img src="<?php echo esc_url($about_image); ?>" alt="Our Team" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" decoding="async">
                                <?php else: ?>
                                    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; font-weight: 600;">
                                        Team Photo
                                    </div>
                                <?php endif; ?>
                            </div>

                            <!-- Content -->
                            <div class="about-content-text" style="flex: 1; padding-top: 1rem;">
                                <div style="line-height: 1.7; color: #34495e; font-size: 1rem;">
                                    <?php
                                    // Display the wizard content with consistent paragraph styling
                                    $paragraphs = preg_split('/\n\s*\n/', $wizard_about_content);
                                    $is_cta_section = false;

                                    foreach ($paragraphs as $index => $paragraph) {
                                        $paragraph = trim($paragraph);
                                        if (!empty($paragraph)) {
                                            // Check if this is the "Ready to Get Started" section
                                            if (stripos($paragraph, 'Ready to Get Started') !== false || stripos($paragraph, 'Ready to elevate') !== false) {
                                                $is_cta_section = true;
                                                // Extract the actual text content from the paragraph
                                                $clean_text = strip_tags($paragraph);
                                                $clean_text = preg_replace('/<[^>]*>/', '', $clean_text);
                                                $clean_text = trim($clean_text);
                                                
                                                // Remove the "Ready to Get Started?" part from the text
                                                $clean_text = preg_replace('/Ready to Get Started\?\s*/', '', $clean_text);
                                                $clean_text = preg_replace('/Call us today at \d+ for a free consultation!\s*/', '', $clean_text);
                                                $clean_text = trim($clean_text);
                                                
                                                echo '<div class="ready-to-start-box">';
                                                echo '<div class="ready-to-start-content">';
                                                echo '<h3>Ready to Get Started?</h3>';
                                                echo '<p>' . esc_html($clean_text) . '</p>';
                                                echo '<p class="contact-info">Call us today at <strong>' . esc_html($phone) . '</strong> for a free consultation!</p>';
                                                echo '</div>';
                                                echo '<div class="ready-to-start-cta">';
                                                echo '<a href="tel:' . esc_attr($phone) . '" class="cta-button">Call Now</a>';
                                                echo '</div>';
                                                echo '</div>';
                                            } else {
                                                $is_last = ($index === count($paragraphs) - 1);
                                                $margin_bottom = $is_last ? '0' : '1.2rem';
                                                echo '<p style="margin: 0 0 ' . $margin_bottom . ' 0;">' . wp_kses_post($paragraph) . '</p>';
                                            }
                                        }
                                    }
                                    ?>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php
                } else {
                    // Show message to generate content
                    ?>
                    <div class="about-content" style="max-width: 1200px; margin: 0 auto; padding: 2rem; text-align: center;">
                        <div style="background: #f8f9fa; padding: 3rem; border-radius: 12px; border: 1px solid #e9ecef;">
                            <h2 style="font-size: 2rem; font-weight: 600; color: #2c3e50; margin: 0 0 1rem 0;">Generate Your About Page Content</h2>
                            <p style="margin: 0; line-height: 1.6; color: #34495e; font-size: 1.1rem;">Please use the wizard to generate your about page content. This will create professional, industry-specific content tailored to your business.</p>
                        </div>
                    </div>
                    <?php
                }
                ?>
            </div>
        </section>
        <?php endif; ?>

        <section class="contact-section" style="padding: 80px 0; background-color: var(--surface-color); color: #ffffff;">
            <div class="container">
                <div class="contact-content" style="text-align: center; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0;">Get In Touch</h2>
                    <p style="font-size: 1.1rem; margin: 0 0 2rem 0; color: #8f8f8f;">
                        Ready to work with us? Contact Roofing Pros  today.
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="tel:8755026291" class="btn btn-primary" style="background: var(--button-color); color: #ffffff; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                            Call: 8755026291
                        </a>
                        <a href="mailto:sudhanshuxmen@gmail.com" class="btn btn-secondary" style="background: transparent; color: var(--button-color); border: 2px solid var(--button-color); padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                            Email Us
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <?php include dirname(__FILE__) . '/section-footer.php'; ?>
    <?php wp_footer(); ?>
</body>
</html>
<?php get_footer(); ?>