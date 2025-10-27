<?php
if (!defined('ABSPATH')) exit;

// Include wizard data saving functionality
require_once get_template_directory() . '/save-wizard-data.php';

// Build-time injected settings placeholder (replaced during theme generation)
// The build process will replace this with: $settings = json_decode('...JSON...', true);
$settings = null;

// Automatic template assignment functions
function bsg_auto_template_selection($template) {
    global $post;
    
    if (!$post) return $template;
    
    // Get the current page slug
    $page_slug = $post->post_name;
    
    // Check if this is a service page
    if (strpos($page_slug, 'roof-installation') !== false || 
        strpos($page_slug, 'roof-repair') !== false || 
        strpos($page_slug, 'sod-installation') !== false ||
        strpos($page_slug, 'service') !== false) {
        
        // Use service template
        $service_template = get_template_directory() . '/page-service.php';
        if (file_exists($service_template)) {
            return $service_template;
        }
    }
    
    // Check if this is a location page (but not the main service-locations page)
    if (strpos($page_slug, 'boulder') !== false || 
        strpos($page_slug, 'location') !== false ||
        (strpos($page_slug, 'service-locations') !== false && $page_slug !== 'service-locations')) {
        
        // Use location template
        $location_template = get_template_directory() . '/location.php';
        if (file_exists($location_template)) {
            return $location_template;
        }
    }
    
    // Check if this is an about page
    if (strpos($page_slug, 'about') !== false || 
        strpos($page_slug, 'about-us') !== false) {
        
        // Use about template
        $about_template = get_template_directory() . '/page-about.php';
        if (file_exists($about_template)) {
            return $about_template;
        }
    }
    
    // Check if this is a contact page
    if (strpos($page_slug, 'contact') !== false || 
        strpos($page_slug, 'contact-us') !== false) {
        
        // Use contact template
        $contact_template = get_template_directory() . '/contact.php';
        if (file_exists($contact_template)) {
            return $contact_template;
        }
    }
    
    // Check if this is the homepage
    if (is_front_page() || is_home()) {
        $home_template = get_template_directory() . '/home-dynamic.php';
        if (file_exists($home_template)) {
            return $home_template;
        }
    }
    
    return $template;
}

// Hook into template selection
add_filter('template_include', 'bsg_auto_template_selection', 99);

// Force template assignment for specific pages
function bsg_force_template_assignment() {
    // Get all pages
    $pages = get_pages();
    
    foreach ($pages as $page) {
        $page_slug = $page->post_name;
        $current_template = get_post_meta($page->ID, '_wp_page_template', true);
        
        // Auto-assign templates based on slug
        if (strpos($page_slug, 'roof-installation') !== false || 
            strpos($page_slug, 'roof-repair') !== false || 
            strpos($page_slug, 'sod-installation') !== false) {
            
            if ($current_template !== 'page-service.php') {
                update_post_meta($page->ID, '_wp_page_template', 'page-service.php');
            }
        }
        
        // Auto-assign service-locations template for main service-locations page
        if ($page_slug === 'service-locations') {
            if ($current_template !== 'page-service-locations.php') {
                update_post_meta($page->ID, '_wp_page_template', 'page-service-locations.php');
            }
        }
        
        if (strpos($page_slug, 'boulder') !== false || 
            (strpos($page_slug, 'service-locations') !== false && $page_slug !== 'service-locations')) {
            
            if ($current_template !== 'location.php') {
                update_post_meta($page->ID, '_wp_page_template', 'location.php');
            }
        }
        
        if (strpos($page_slug, 'about') !== false || 
            strpos($page_slug, 'about-us') !== false) {
            
            if ($current_template !== 'page-about.php') {
                update_post_meta($page->ID, '_wp_page_template', 'page-about.php');
            }
        }
        
        if (strpos($page_slug, 'contact') !== false || 
            strpos($page_slug, 'contact-us') !== false) {
            
            if ($current_template !== 'contact.php') {
                update_post_meta($page->ID, '_wp_page_template', 'contact.php');
            }
        }
    }
}

// Run template assignment on theme activation
add_action('after_switch_theme', 'bsg_force_template_assignment');

// Also run when admin visits the site
add_action('admin_init', 'bsg_force_template_assignment');

// Auto-assign template when page is saved
add_action('save_post', 'bsg_auto_assign_template_on_save', 10, 2);

function bsg_auto_assign_template_on_save($post_id, $post) {
    // Only run for pages
    if ($post->post_type !== 'page') {
        return;
    }
    
    // Don't run on autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    $page_slug = $post->post_name;
    $current_template = get_post_meta($post_id, '_wp_page_template', true);
    
    // Auto-assign service template
    if (strpos($page_slug, 'roof-installation') !== false || 
        strpos($page_slug, 'roof-repair') !== false || 
        strpos($page_slug, 'sod-installation') !== false ||
        strpos($page_slug, 'service') !== false) {
        
        if ($current_template !== 'page-service.php') {
            update_post_meta($post_id, '_wp_page_template', 'page-service.php');
        }
    }
    
    // Auto-assign service-locations template for main service-locations page
    if ($page_slug === 'service-locations') {
        if ($current_template !== 'page-service-locations.php') {
            update_post_meta($post_id, '_wp_page_template', 'page-service-locations.php');
        }
    }
    
    // Auto-assign location template (but not for main service-locations page)
    if (strpos($page_slug, 'boulder') !== false || 
        strpos($page_slug, 'location') !== false ||
        (strpos($page_slug, 'service-locations') !== false && $page_slug !== 'service-locations')) {
        
        if ($current_template !== 'location.php') {
            update_post_meta($post_id, '_wp_page_template', 'location.php');
        }
    }
    
    // Auto-assign about template
    if (strpos($page_slug, 'about') !== false || 
        strpos($page_slug, 'about-us') !== false) {
        
        if ($current_template !== 'page-about.php') {
            update_post_meta($post_id, '_wp_page_template', 'page-about.php');
        }
    }
    
    // Auto-assign contact template
    if (strpos($page_slug, 'contact') !== false || 
        strpos($page_slug, 'contact-us') !== false) {
        
        if ($current_template !== 'contact.php') {
            update_post_meta($post_id, '_wp_page_template', 'contact.php');
        }
    }
}

// Save JSON values to wp_options on theme activation
function bsg_theme_activate() {
    // Full settings array with all variables from your JSON
 $settings = json_decode('{"business_name":"Roofing Pros ","business_logo":"https://mriscandehradun.in/wp-content/uploads/2025/08/logo_100x100.png","business_type":"Roofing","phone":"8755026291","email":"sudhanshuxmen@gmail.com","address":"Azolla St Orlando, FL 32808","location":"Orlando","state":"Florida","zip":"12345","about_years":"18","openai_api_key":"YOUR_OPENAI_API_KEY_HERE","color_theme":"amber","admin_theme":"dark","use_dynamic_template":true,"use_default_color_scheme":true,"global_primary_color":"#f59e0b","global_secondary_color":"#d97706","global_accent_color":"#92400e","nav_bg_color":"#fffbeb","nav_text_color":"#134e4a","heading_color":"#92400e","button_primary_color":"#f59e0b","homepage_meta_title":"Roofing Pros - Get Professional Roofing Services Near You","homepage_meta_description":"Trusted roofing company in Orlando offering expert roof repair, replacement, and installation services. Affordable, reliable, and backed by years of experience. Get a free estimate today!","homepage_meta_keywords":"roofing services, roof repair","about_page_meta_title":"Roofing Pros - About Us | Professional Roofing Services","about_page_meta_description":"Learn about Roofing Pros, a trusted roofing contractor with 15 years of experience. Professional services, quality workmanship, and customer satisfaction.","about_page_meta_keywords":"about, contractor, professional services, quality, 15 years experience","about_page_hero_title":"","about_page_hero_subtitle":"","about_page_hero_description":"","about_page_hero_bg_image":"","about_page_content":"","about_page_team_title":"","about_page_team_description":"","about_page_values_title":"","about_page_values_description":"","hero_visible":true,"hero_headline":"Find Best Roofers Near You","hero_description":"Check here for the description","hero_cta":"Rated 5 Stars On Google","hero_cta_link":"#contact","hero_rating":"Rated 5 Stars On Google","hero_bg_image":"https://insulationgrants.info/wp-content/uploads/2025/09/Screenshot-2025-09-19-at-4.57.15-PM.png","hero_side_image":"https://www.watergateroofing.com/wp-content/uploads/2023/08/5-Signs-a-Roof-Leak-is-Too-Big-to-Handle.jpg","hero_bg_color":"#ffffff","hero_padding":80,"use_global_hero_image":true,"service_page_hero_bg_image":"","location_page_hero_bg_image":"","hero_company_color":"#f6bb25","hero_heading_color":"#363030","hero_subheading_color":"#8f8f8f","hero_description_color":"#616161","hero_reviews_text_color":"#232834","hero_reviews_star_color":"#fbbf24","hero_book_btn_bg":"#2ee6c5","hero_book_btn_text":"#ffffff","hero_call_btn_bg":"#232834","hero_call_btn_text":"#ffffff","hero_book_btn_link":"#","hero_call_btn_link":"tel:8755026201","services_visible":true,"services_label":"TOP RATED ROOFING SERVICES","services_title":"Our Services","services_cta_text":"Get A Free Estimate","services_cta_link":"#","services_cta_bg":"#2ee6c5","services_cta_text_color":"#232834","services_bg_color":"#374658","services_card_color":"#232834","services_text_color":"#ffffff","services_icon_color":"#2ee6c5","services_card_radius":12,"services_button_text":"#2ee6c5","services_progress_color":"#2ee6c5","services_padding":60,"service_hero_heading_color":"#000000","location_hero_heading_color":"#000000","service_hero_description_color":"#333738","services_contact_title":"GET A QUOTE","services_contact_description":"Serving Orlando and the surrounding areas with professional roofing services.","service_contact_box_bg":"#2a3440","service_contact_box_text":"#cfd8dc","service_contact_icons_color":"#2ee6c5","service_content_bg_color":"#232834","service_content_padding":80,"features_visible":true,"features_label":"WHY CHOOSE US","features_title":"What Makes Us Different","features_description":"","features_bg_color":"#374658","features_card_bg":"#374658","features_text_color":"#ffffff","features_icon_color":"#1fe0ca","features_padding":80,"about_visible":true,"about_label":"ABOUT US","about_title":"Your Trusted Roofing Partner","about_description":"\\n<p>Welcome to Roofing Pros, your trusted roofing partner in Orlando. With years of experience, we specialize in delivering high-quality roofing solutions tailored to meet your needs. Our skilled team is dedicated to using the finest materials and techniques to ensure durability and aesthetic appeal. We take pride in enhancing the value and safety of your home.</p>\\n\\n<h3>Why Choose Us</h3>\\n<p>At Roofing Pros, customer satisfaction is our top priority. We offer competitive pricing, transparent communication, and timely project completion. Our commitment to excellence and attention to detail set us apart, making us the go-to choice for all your roofing needs in Orlando. Call us today at 8755026291!</p>","about_description_font_size":"0.90rem","about_margin_left":60,"about_margin_right":60,"about_image":"https://mattslandscapingca.com/wp-content/uploads/2025/08/ChatGPT-Image-Aug-17-2025-11_07_32-PM.png","about_bg_color":"#1e2834","about_text_color":"#ffffff","about_padding":80,"about_projects":"500+","about_customers":"1000+","about_team":"25+","about_tagline":"WHO WE ARE","about_tagline_color":"#1fe0ca","about_heading":"About Our Company","about_heading_color":"#ffffff","about_description_color":"#ffffff","about_experience_text":"Years of Experience","about_experience_bg":"#374151","about_experience_text_color":"#16dfd1","about_button_text":"About Us","about_button_color":"#0de7d9","about_button_text_color":"#374151","about_button_link":"about-us","about_use_default_prompts":true,"about_page_hero_tagline":"ABOUT ROOFING PROS","about_page_hero_tagline_color":"#a35f00","about_page_hero_heading_color":"#000000","about_page_hero_bg_color":"#ffffff","about_page_who_tagline":"WHO WE ARE","about_page_who_tagline_color":"#04e3e7","about_page_who_headline":"About Roofing Pros","about_page_who_description":"hi thi stess","about_page_team_image":"https://mattslandscapingca.com/wp-content/uploads/2025/08/ChatGPT-Image-Aug-17-2025-11_07_32-PM.png","about_page_who_bg":"#ffffff","about_page_who_text":"#000000","about_page_who_desc_color":"#242628","about_page_years":"15+","about_page_experience_label":"Years of Experience","about_page_experience_bg":"#0de7e4","about_page_experience_text":"#000000","about_page_cta_text":"Learn More","about_page_cta_link":"#","about_page_cta_bg":"#0ea5e9","about_page_cta_text_color":"#000000","about_page_button_bg":"#0d9488","about_page_button_text":"#374151","about_page_why_heading":"Why Work With Us?","about_page_why_subheading":"Benefits of Working with an Expert Team","about_page_why_bg":"#14a4e1","about_page_why_heading_color":"#ffffff","about_page_why_subtitle_color":"#ffffff","about_page_why_item_title":"#ffffff","about_page_why_item_desc":"#ffffff","about_page_why_icon_bg":"#1e3a8a","about_page_why_icon":"#ffffff","about_page_why_section_bg":"#374151","about_page_why_section_text":"#000000","about_page_use_default_prompts":true,"locations_visible":true,"locations_label":"OUR SERVICE AREAS","locations_title":"Proudly serving Orlando and nearby areas","locations_description":"Proudly serving Orlando and surrounding areas with reliable, professional services tailored to homes and businesses across Central Florida communities.","locations_padding":80,"service_areas_bg_color":"#232834","service_areas_text_color":"#ffffff","service_areas_heading_color":"#ffffff","service_areas_card_bg":"rgba(255,255,255,0.1)","location_description_bg":"#ffffff","location_description_heading_color":"#232834","location_description_text_color":"#374151","location_quote_box_bg":"#1a1f28","location_quote_box_text":"#ffffff","location_quote_box_heading_color":"#ffffff","location_quote_box_button_bg":"#2ee6c5","location_quote_box_button_text":"#ffffff","reviews_visible":true,"reviews_label":"CUSTOMER REVIEWS","reviews_title":"What Our Customers Says","reviews_heading_color":"#2c2826","reviews_subtitle_color":"#6b7280","reviews_bg_color":"#f8f9fa","reviews_card_bg":"#ffffff","reviews_star_color":"#fbbf24","reviews_padding":80,"commitment_visible":true,"commitment_label":"COMMITTED TO QUALITY","commitment_title":"Our Promise Of Reliability","commitment_subtitle":"We promise to deliver exceptional service","commitment_text":"The best domain names are short, relevant, easy to spell, and ideally include your core keyword—so people instantly understand your service. Many popular tools like","commitment_bg_image":"https://mattslandscapingca.com/wp-content/uploads/2025/08/ChatGPT-Image-Aug-17-2025-11_33_38-PM.png","commitment_bg_color":"#374658","commitment_text_color":"#3f3b3b","commitment_heading_color":"#ffffff","commitment_subtitle_color":"#9fa1a3","commitment_padding":60,"faq_visible":true,"faq_label":"FREQUENTLY ASKED QUESTIONS","faq_title":"Common Questions","faq_heading":"Frequently Asked Questions","faq_desc":"Smart move! The best domain names are short, relevant, easy to spell, and ideally include your core keyword","faq_image":"https://mattslandscapingca.com/wp-content/uploads/2025/08/young-man-safety-mask-gloves-shaping-bushes-scaled.jpg","faq_heading_color":"#ffffff","faq_description_color":"#61646b","faq_answer_color":"#d9d9d9","faq_bg_color":"#1e2834","faq_padding":80,"contact_visible":true,"contact_heading":"GET IN TOUCH","contact_description":"Have questions or need assistance? Our team is here to help. Reach out to us anytime through the form below, call us directly, or send us an email. We’ll get back to you as soon as possible.","contact_section_bg_color":"#232a36","contact_left_side_color":"#1bd0af","contact_right_side_color":"#ffffff","contact_text_color":"#000000","contact_headline_color":"#ffffff","contact_description_color":"#fafafa","contact_padding":80,"footer_visible":true,"footer_bg_color":"#02172a","footer_heading_color":"#ffffff","footer_links_color":"#ffffff","footer_copyright_text":"©2025, Roofing Pros. All Rights Reserved.","footer_disclaimer_text":"This website earns affiliate, but it won\'t affect the pricing of the product.","footer_padding":40,"services":[{"id":"1","name":"Roof Installation","description":"Professional roof installation services","icon":"🏠","image":"","content":"\\n<div class=\\"service-description\\">\\n    <p class=\\"service-intro\\"><p>At Roofing Pros, we specialize in high-quality roof installation services for both residential and commercial properties in the Orlando area. Our experienced team is dedicated to providing durable, reliable, and aesthetically pleasing roofing solutions that stand the test of time.</p></p>\\n    \\n    <div class=\\"service-section\\">\\n        <h3>Why Choose Our Roof Installation</h3>\\n        <p><p>Choosing Roofing Pros means you’re selecting a trusted partner committed to excellence and customer satisfaction.</p></p>\\n        <ul class=\\"benefits-list\\">\\n            <li>Expert installation by certified roofing professionals.</li><li>High-quality materials for long-lasting durability.</li><li>Comprehensive warranties for peace of mind.</li><li>Customized roofing solutions tailored to your needs.</li><li>Timely project completion with minimal disruption.</li><li>Competitive pricing without compromising quality.</li>\\n        </ul>\\n    </div>\\n    \\n    <div class=\\"service-section\\">\\n        <h3>Our Roof Installation Process</h3>\\n        <p><p>Our roof installation process is designed to ensure efficiency and quality from start to finish. Here’s how we do it:</p></p>\\n        <ol class=\\"process-steps\\">\\n            <li>Initial consultation to assess your roofing needs.</li><li>Thorough inspection and measurement of your property.</li><li>Selection of materials based on your preferences.</li><li>Detailed proposal outlining the project scope and costs.</li><li>Expert installation by our skilled roofing team.</li><li>Final inspection and customer walkthrough to ensure satisfaction.</li>\\n        </ol>\\n    </div>\\n    \\n    <div class=\\"service-section\\">\\n        <h3>What to Expect</h3>\\n        <p><p>When you choose Roofing Pros, you can expect professionalism and quality at every stage of your roof installation.</p></p>\\n        <ul class=\\"expectation-points\\">\\n            <li>Clear communication throughout the project.</li><li>Respect for your property and timely project management.</li><li>High standards of workmanship and safety.</li><li>Post-installation support and maintenance tips.</li><li>Commitment to customer satisfaction.</li><li>Transparent pricing with no hidden costs.</li>\\n        </ul>\\n    </div>\\n    \\n    <div class=\\"service-section\\">\\n        <h3>Service Features</h3>\\n        <ul class=\\"feature-list\\">\\n            <li>Variety of roofing materials including shingles, tiles, and metal.</li><li>Experienced team with extensive industry knowledge.</li><li>Free estimates and consultations available.</li><li>Emergency roofing services for urgent needs.</li><li>Local Orlando expertise ensuring compliance with regulations.</li><li>Flexible financing options to fit your budget.</li>\\n        </ul>\\n    </div>\\n    \\n    <div class=\\"service-section\\">\\n        <h3>Customer Testimonials</h3>\\n        <div class=\\"testimonials\\">\\n            <div class=\\"testimonial\\"><p>\\"Roofing Pros did an amazing job on our new roof! Highly recommend their services.\\" - Sarah J.</p></div><div class=\\"testimonial\\"><p>\\"Professional, punctual, and very knowledgeable. Couldn\'t be happier with my roof!\\" - John D.</p></div><div class=\\"testimonial\\"><p>\\"The team at Roofing Pros was fantastic. They guided us through every step of the process.\\" - Emily R.</p></div>\\n        </div>\\n    </div>\\n    \\n    <div class=\\"call-to-action\\">\\n        <h3>Ready to Get Started?</h3>\\n        <p><p>Ready to enhance your home with a new roof? Contact Roofing Pros today at 8755026291 for a free consultation and estimate. Let us help you protect your property with our expert roofing services!</p></p>\\n        <p class=\\"contact-info\\">Call us today at <strong>8755026291</strong> for a free consultation!</p>\\n    </div>\\n</div>","slug":"roof-installation","metaTitle":"Professional Roof Installation Services in Orlando","metaDescription":"Smart move! The best domain names are short, relevant, easy to spell, and ideally include your core keyword—so people instantly understand your service. Many popular tools like","featuresText":"","useDefaultPrompt":true,"customPrompt":""},{"id":"1757423936402","name":"Solar Installation","description":"","icon":"🏠","image":"","content":"\\n<div class=\\"service-description\\">\\n    <p class=\\"service-intro\\"><p>At Roofing Pros, we specialize in solar installation services tailored to meet the unique energy needs of Orlando residents. Our expert team ensures a seamless integration of solar technology with your roofing system, providing sustainable energy solutions that reduce utility costs and enhance your home\'s value.</p></p>\\n    \\n    <div class=\\"service-section\\">\\n        <h3>Why Choose Our Solar Installation</h3>\\n        <p><p>Choosing Roofing Pros for your solar installation means partnering with experienced professionals dedicated to quality and customer satisfaction.</p></p>\\n        <ul class=\\"benefits-list\\">\\n            <li>Reduce your energy bills significantly over time.</li><li>Increase your property value with solar upgrades.</li><li>Contribute to a cleaner environment and sustainability.</li><li>Enjoy reliable energy sources with minimal maintenance.</li><li>Take advantage of local and federal tax incentives.</li><li>Expert installation by a trusted Orlando roofing company.</li>\\n        </ul>\\n    </div>\\n    \\n    <div class=\\"service-section\\">\\n        <h3>Our Solar Installation Process</h3>\\n        <p><p>Our solar installation process is designed to be straightforward and efficient, ensuring your transition to solar energy is as smooth as possible.</p></p>\\n        <ol class=\\"process-steps\\">\\n            <li>Initial consultation to assess your energy needs.</li><li>Site evaluation and system design tailored to your home.</li><li>Obtain necessary permits and approvals for installation.</li><li>Install solar panels with precision and care.</li><li>Conduct a thorough inspection to ensure quality.</li><li>Provide ongoing support and maintenance for your system.</li>\\n        </ol>\\n    </div>\\n    \\n    <div class=\\"service-section\\">\\n        <h3>What to Expect</h3>\\n        <p><p>When you choose Roofing Pros for your solar installation, you can expect professionalism, transparency, and excellent service from start to finish.</p></p>\\n        <ul class=\\"expectation-points\\">\\n            <li>Clear communication throughout the installation process.</li><li>Timely completion of your solar project.</li><li>High-quality materials and workmanship.</li><li>Comprehensive warranty for your peace of mind.</li><li>Post-installation support and guidance.</li><li>Continuous monitoring of your solar system\'s performance.</li>\\n        </ul>\\n    </div>\\n    \\n    <div class=\\"service-section\\">\\n        <h3>Service Features</h3>\\n        <ul class=\\"feature-list\\">\\n            <li>Custom solar solutions tailored to your needs.</li><li>Experienced technicians with roofing expertise.</li><li>High-efficiency solar panels for optimal performance.</li><li>Seamless integration with existing roofing systems.</li><li>Flexible financing options available.</li><li>Comprehensive maintenance and support plans.</li>\\n        </ul>\\n    </div>\\n    \\n    <div class=\\"service-section\\">\\n        <h3>Customer Testimonials</h3>\\n        <div class=\\"testimonials\\">\\n            <div class=\\"testimonial\\"><p>\\"The team at Roofing Pros made our solar installation a breeze! Highly recommend them.\\" - Sarah T.</p></div><div class=\\"testimonial\\"><p>\\"Professional, efficient, and knowledgeable. We love our new solar system!\\" - Mark L.</p></div><div class=\\"testimonial\\"><p>\\"Roofing Pros exceeded our expectations from start to finish. Fantastic service!\\" - Jessica R.</p></div>\\n        </div>\\n    </div>\\n    \\n    <div class=\\"call-to-action\\">\\n        <h3>Ready to Get Started?</h3>\\n        <p><p>Ready to harness the power of the sun? Contact Roofing Pros today at 8755026291 for a free consultation and let us help you make the switch to solar energy!</p></p>\\n        <p class=\\"contact-info\\">Call us today at <strong>8755026291</strong> for a free consultation!</p>\\n    </div>\\n</div>","slug":"solar-installation","metaTitle":"Professional Solar Installation in Orlando","metaDescription":"check out the services.","featuresText":"","useDefaultPrompt":true,"customPrompt":""},{"id":"1758520846493","name":"Lawn Care","description":"","icon":"🏠","image":"","content":"\\n<div class=\\"service-description\\">\\n    <p class=\\"service-intro\\"><p>At Roofing Pros, we offer professional lawn care services tailored to the unique needs of Orlando residents. Our experienced team ensures your lawn remains lush and healthy, enhancing the beauty of your property while promoting a safe and enjoyable outdoor environment.</p></p>\\n    \\n    <div class=\\"service-section\\">\\n        <h3>Why Choose Our Lawn Care</h3>\\n        <p><p>Choosing Roofing Pros means selecting a trusted partner with extensive knowledge in lawn care and roofing services.</p></p>\\n        <ul class=\\"benefits-list\\">\\n            <li>Expert care from trained lawn care professionals.</li><li>Custom lawn maintenance plans tailored to your needs.</li><li>High-quality products that promote healthy growth.</li><li>Timely service to keep your lawn looking its best.</li><li>Eco-friendly practices for a sustainable lawn.</li><li>Increased property value and curb appeal.</li>\\n        </ul>\\n    </div>\\n    \\n    <div class=\\"service-section\\">\\n        <h3>Our Lawn Care Process</h3>\\n        <p><p>Our lawn care process is designed to deliver exceptional results efficiently. We assess your lawn\'s condition and create a customized plan tailored to your specific needs.</p></p>\\n        <ol class=\\"process-steps\\">\\n            <li>Initial lawn assessment to identify needs.</li><li>Develop a customized lawn care plan.</li><li>Implement fertilization and weed control measures.</li><li>Regular mowing and trimming services.</li><li>Ongoing monitoring and adjustments as needed.</li><li>Final evaluation to ensure satisfaction and results.</li>\\n        </ol>\\n    </div>\\n    \\n    <div class=\\"service-section\\">\\n        <h3>What to Expect</h3>\\n        <p><p>When you choose us for your lawn care, you can expect professionalism and high-quality service at every step.</p></p>\\n        <ul class=\\"expectation-points\\">\\n            <li>Clear communication throughout the entire process.</li><li>Timely arrival and efficient service delivery.</li><li>Attention to detail in every lawn care task.</li><li>Friendly and knowledgeable team members.</li><li>Follow-up consultations to ensure satisfaction.</li><li>Commitment to your lawn\'s health and beauty.</li>\\n        </ul>\\n    </div>\\n    \\n    <div class=\\"service-section\\">\\n        <h3>Service Features</h3>\\n        <ul class=\\"feature-list\\">\\n            <li>Comprehensive lawn care services available.</li><li>Experienced team with industry knowledge.</li><li>Customized care plans for all lawn types.</li><li>Advanced equipment for efficient service.</li><li>Affordable pricing options to fit your budget.</li><li>Dedicated customer support for all inquiries.</li>\\n        </ul>\\n    </div>\\n    \\n    <div class=\\"service-section\\">\\n        <h3>Customer Testimonials</h3>\\n        <div class=\\"testimonials\\">\\n            <div class=\\"testimonial\\"><p>\\"Roofing Pros transformed my lawn! Their team is professional and knowledgeable.\\" - Sarah J.</p></div><div class=\\"testimonial\\"><p>\\"I love my new lawn! The service was top-notch and very efficient.\\" - Mike T.</p></div><div class=\\"testimonial\\"><p>\\"Highly recommend Roofing Pros for their exceptional lawn care services!\\" - Linda K.</p></div>\\n        </div>\\n    </div>\\n    \\n    <div class=\\"call-to-action\\">\\n        <h3>Ready to Get Started?</h3>\\n        <p><p>Ready to transform your lawn with the best in the business? Contact Roofing Pros today at 8755026291 for a free consultation and let us help you achieve the lawn of your dreams!</p></p>\\n        <p class=\\"contact-info\\">Call us today at <strong>8755026291</strong> for a free consultation!</p>\\n    </div>\\n</div>","slug":"lawn-care","metaTitle":"Professional Lawn Care services in. Orlando","metaDescription":"check out the services","featuresText":"","useDefaultPrompt":true,"customPrompt":""}],"locations":[{"id":"1757323154591","name":"saint Maria","state":"Maryland","zip":"21742","description":"<h2>Location Overview</h2>\\n<p>Welcome to Roofing Pros, your premier roofing service provider in Ohio. With a commitment to excellence and a strong focus on customer satisfaction, we pride ourselves on delivering high-quality roofing solutions tailored to meet the unique needs of Ohio residents. Our team of skilled professionals is dedicated to enhancing the safety and aesthetic appeal of your home through exceptional roofing services.</p>\\n\\n<h3>Roofing Services Offered in Ohio</h3>\\n<p>At Roofing Pros, we offer a comprehensive range of roofing services designed to address all your roofing needs. Whether you require residential or commercial roofing, our services include roof installations, repairs, replacements, and maintenance. We specialize in various roofing materials, including asphalt shingles, metal roofing, and flat roofs, ensuring that we have the perfect solution for any property type. Our experienced team utilizes cutting-edge techniques and high-quality materials to guarantee durability and reliability for years to come.</p>\\n\\n<h3>Why Choose Roofing Pros in Ohio</h3>\\n<p>Choosing Roofing Pros means choosing a company that values integrity, quality, and customer satisfaction above all else. We understand the importance of having a reliable roof over your head, and that’s why we go the extra mile to deliver superior craftsmanship on every project. Our transparent pricing, timely project completion, and dedicated customer service set us apart from the competition. When you partner with us, you can rest assured that you are in the hands of roofing experts who genuinely care about your needs.</p>\\n\\n<h3>Local Expertise and Experience in Ohio</h3>\\n<p>Roofing Pros has been serving the Ohio community for many years, building a strong reputation for excellence in the roofing industry. Our local expertise allows us to understand the unique challenges posed by Ohio’s weather conditions and architectural styles. We are familiar with the local building codes and regulations, ensuring that all our projects comply with state standards. Our experienced team brings a wealth of knowledge and skill to every job, providing you with peace of mind knowing that your roofing project is in capable hands.</p>\\n\\n<h3>Customer Testimonials and Local Reputation</h3>\\n<p>Our commitment to quality and customer satisfaction has earned us a stellar reputation in the Ohio community. We take pride in the positive feedback we receive from our clients, who often commend our professionalism, attention to detail, and reliable service. Many of our customers refer us to their friends and family, and we are grateful for the trust they place in us. At Roofing Pros, we believe that our work speaks for itself, and we strive to continue exceeding expectations with every project.</p>\\n\\n<h3>Call-to-Action Section</h3>\\n<p>If you are in need of roofing services in Ohio, look no further than Roofing Pros. Our team is ready to assist you with all your roofing needs, ensuring a safe and beautiful roof for your home or business. Contact us today at 8755026291 to schedule a consultation or to request a free estimate. Let us help you protect your investment with our expert roofing solutions!</p>","slug":"saint-maria-21742","metaTitle":"Professional Roofing Services Near Me  in Saint Maria","metaDescription":"","useDefaultPrompt":true,"customPrompt":""},{"id":"1757329499008","name":"Boston","state":"Massachusetts","zip":"02155","description":"```html\\n<h2>Location Overview</h2>\\n<p>Welcome to Roofing Pros, your trusted roofing partner located in the heart of Boston. We pride ourselves on delivering high-quality roofing solutions tailored to meet the unique needs of our community. With a deep commitment to excellence and customer satisfaction, we have established ourselves as the premier roofing service provider in the Boston area. Whether you are looking for roof repairs, replacements, or installations, Roofing Pros has got you covered.</p>\\n\\n<h3>Roofing Services Offered in Boston</h3>\\n<p>At Roofing Pros, we offer a comprehensive range of roofing services designed to protect and enhance your property. Our services include residential and commercial roof installation, roof repair, routine maintenance, and emergency roofing services. We work with various roofing materials, including asphalt shingles, metal roofing, and flat roofs, ensuring that we meet the diverse needs of Boston homeowners and businesses. Our skilled team uses the latest techniques and high-quality materials to ensure your roof stands the test of time.</p>\\n\\n<h3>Why Choose Roofing Pros in Boston</h3>\\n<p>Choosing Roofing Pros means choosing quality, reliability, and peace of mind. Our experienced team is dedicated to providing exceptional service from start to finish. We understand the local climate and building codes, which allows us to deliver solutions that are both durable and compliant. We offer free estimates and transparent pricing, ensuring that there are no hidden surprises. Our commitment to customer satisfaction is evident in every project we undertake, making us the preferred choice for roofing in Boston.</p>\\n\\n<h3>Local Expertise and Experience in Boston</h3>\\n<p>With years of experience serving the Boston area, Roofing Pros brings unparalleled local expertise to every project. Our team is familiar with the architectural styles and roofing challenges specific to Boston, allowing us to provide tailored solutions that meet the needs of our clients. We are proud to be part of the Boston community, and we strive to contribute positively through our high-quality workmanship and community engagement. Trust us to handle your roofing project with the care and attention it deserves.</p>\\n\\n<h3>Customer Testimonials and Local Reputation</h3>\\n<p>At Roofing Pros, our reputation is built on the satisfaction of our clients. We have received numerous positive testimonials from homeowners and businesses across Boston who commend our professionalism, quality of work, and dedication to customer service. Our commitment to excellence has earned us a strong reputation in the local market, and we take pride in being a roofing company that Boston residents can trust. We invite you to read our testimonials and see why so many choose Roofing Pros for their roofing needs.</p>\\n\\n<h3>Call-to-Action Section</h3>\\n<p>Ready to start your roofing project with a trusted partner? Contact Roofing Pros today at 8755026291 for a free estimate or to discuss your roofing needs. Our friendly team is here to assist you and provide the best roofing solutions in Boston. Don’t wait until it’s too late; let us help you protect your home or business with a roof that lasts!</p>\\n```","slug":"boston-02155","metaTitle":"Professional Roofing Services Near Me  in Boston","metaDescription":"dscdscdscs","useDefaultPrompt":true,"customPrompt":""},{"id":"1757329547315","name":"Portland","state":"Oregon","zip":"85365","description":"<html>\\n  <body>\\n    <h2>Location Overview</h2>\\n    <p>Welcome to Roofing Pros, your trusted roofing partner in Portland. We take pride in offering top-notch roofing solutions tailored to meet the unique needs of our local community. With years of experience and a commitment to quality, we ensure that every roof we work on is durable, reliable, and aesthetically pleasing. Our team is dedicated to serving the Portland area, providing expert guidance and exceptional service to all our clients.</p>\\n\\n    <h3>Roofing Services Offered in Portland</h3>\\n    <p>At Roofing Pros, we offer a comprehensive range of roofing services to cater to both residential and commercial properties. Our services include roof installations, repairs, inspections, and maintenance. Whether you need a new roof for your home or require urgent repairs due to storm damage, our skilled professionals are equipped to handle any roofing challenge. We specialize in various roofing materials, including asphalt shingles, metal roofing, and flat roofs, ensuring we have the right solution for your property.</p>\\n\\n    <h3>Why Choose Roofing Pros in Portland</h3>\\n    <p>Choosing Roofing Pros means choosing quality, reliability, and professionalism. We understand that your roof is a critical investment, and we are committed to protecting that investment with our high-quality services. Our team is fully licensed and insured, ensuring peace of mind for our clients. We pride ourselves on our transparent communication, competitive pricing, and attention to detail, making us the preferred roofing contractor in Portland.</p>\\n\\n    <h3>Local Expertise and Experience in Portland</h3>\\n    <p>Our deep roots in the Portland community allow us to understand the specific roofing needs of our neighbors. We are familiar with the local climate, building codes, and materials best suited for the region. This local expertise enables us to provide tailored solutions that not only meet but exceed industry standards. With Roofing Pros, you can trust that your roof will be built to withstand Portland\'s unique weather conditions.</p>\\n\\n    <h3>Customer Testimonials and Local Reputation</h3>\\n    <p>Our reputation in Portland speaks for itself, with countless satisfied customers who have experienced our commitment to excellence. We value our clients\' feedback and continually strive to improve our services. Many of our customers commend us for our professionalism, punctuality, and the high quality of our workmanship. When you choose Roofing Pros, you are not just hiring a contractor; you are partnering with a company that values trust and integrity.</p>\\n\\n    <h3>Call-to-Action Section</h3>\\n    <p>If you\'re looking for reliable and professional roofing services in Portland, look no further than Roofing Pros. Contact us today at 8755026291 to schedule a consultation or receive a free estimate. Let us help you protect your home or business with a roof that stands the test of time. Your satisfaction is our priority, and we look forward to serving you!</p>\\n  </body>\\n</html>","slug":"portland-85365","metaTitle":"Professional Roofing Services Near Me  in Portland","metaDescription":"cdcdscdsccsd","useDefaultPrompt":true,"customPrompt":""},{"id":"1758544961224","name":"Mission Hills","state":"California","zip":"","description":"```html\\n\\n<p>Welcome to Roofing Pros, your premier roofing service provider in Mission Hills. We take pride in delivering high-quality roofing solutions tailored to meet the unique needs of our community. With years of experience in the industry, our dedicated team is committed to ensuring the safety and durability of your home. Located conveniently in Mission Hills, we are just a call away whenever you need reliable roofing services.</p>\\n\\n<h3>Roofing Services Offered in Mission Hills</h3>\\n<p>At Roofing Pros, we offer a comprehensive range of roofing services designed to address all your roofing needs. Whether you require roof repairs, installations, inspections, or maintenance, our skilled professionals are equipped to handle projects of any size. We specialize in various roofing materials, including asphalt shingles, metal roofing, and flat roofs, ensuring that you receive the best options available for your property. Our commitment to quality and customer satisfaction means that we use only the highest-grade materials and techniques, making your roof not only functional but aesthetically pleasing as well.</p>\\n\\n<h3>Why Choose Roofing Pros in Mission Hills</h3>\\n<p>Choosing Roofing Pros means choosing a team that values integrity, professionalism, and excellence. We understand that your roof is one of the most critical components of your home, and we treat it as such. Our team is fully licensed and insured, and we adhere to all local building codes and regulations. We pride ourselves on our transparent communication, ensuring you are informed and involved throughout the entire process. With competitive pricing and no hidden fees, we provide exceptional value for our services, making us the preferred roofing contractor in Mission Hills.</p>\\n\\n<h3>Local Expertise and Experience in Mission Hills</h3>\\n<p>Our extensive experience in the Mission Hills area gives us a unique understanding of the local climate and roofing challenges. We know how to design and install roofs that withstand the elements while enhancing the beauty of your home. Our team is composed of local professionals who are passionate about serving the Mission Hills community. We have built a reputation for excellence through our commitment to quality workmanship and customer service, ensuring that every project meets the highest standards.</p>\\n\\n<h3>Customer Testimonials and Local Reputation</h3>\\n<p>At Roofing Pros, our reputation speaks for itself. We have received numerous positive testimonials from satisfied customers throughout Mission Hills, highlighting our reliability, quality of work, and dedication to customer satisfaction. Our clients appreciate our attention to detail and our commitment to completing projects on time and within budget. Whether you are looking for a minor repair or a complete roof replacement, you can trust that we will provide you with exceptional service and results that exceed your expectations.</p>\\n\\n<h3>Call-to-Action</h3>\\n<p>If you’re ready to enhance the safety and aesthetics of your home with a new roof or need repairs on your existing roof, don’t hesitate to reach out to us at Roofing Pros. Call us today at 8755026291 for a free consultation and estimate. Let us show you why we are the leading roofing experts in Mission Hills, dedicated to serving our community with excellence.</p>\\n```","slug":"mission-hills","metaTitle":"Roofing services near me in Mission Hills","metaDescription":"The zip code for Mission Hills depends on its specific location, as there are multiple places named Mission Hills. For Mission Hills, California (Los Angeles), the zip code is 91345","useDefaultPrompt":true,"customPrompt":""}],"reviews":[{"id":"1","name":"Emily Carter","rating":5,"comment":"Roofing Pros did an amazing job on our new roof! Their team was efficient and respectful. They answered all our questions and made the whole process seamless. Highly recommend their services to anyone in Orlando!","date":"2025-09-11"},{"id":"2","name":"David Thompson","rating":5,"comment":"I couldn\'t be happier with Roofing Pros! From the initial consultation to the final inspection, they were professional and thorough. They transformed our home with a beautiful new roof. Outstanding service and highly trustworthy!","date":"2025-09-11"},{"id":"3","name":"Jessica Lee","rating":5,"comment":"Roofing Pros exceeded my expectations! Their crew worked diligently and completed the project ahead of schedule. The quality of the work is top-notch, and the customer service was beyond excellent. Will definitely recommend them to friends!","date":"2025-09-11"},{"id":"4","name":"Tom Harris","rating":5,"comment":"Fantastic experience with Roofing Pros! They provided detailed estimates and kept us updated throughout the project. The roof looks great, and I appreciate their commitment to quality and customer satisfaction. A true gem in Orlando!","date":"2025-09-11"},{"id":"5","name":"Megan Wright","rating":5,"comment":"I highly recommend Roofing Pros for any roofing needs! Their team was prompt, courteous, and skilled. They took the time to explain everything and ensured we were happy with the results. Truly a five-star experience!","date":"2025-09-11"}],"features":[{"id":"1","title":"Expert Team","icon":"👨‍🔧","description":"Our skilled roofing professionals have extensive experience"},{"id":"2","title":"Quality Materials","icon":"🏗️","description":"We source top-grade materials from trusted suppliers to guarantee "},{"id":"3","title":"Local Expertise","icon":"📍","description":"With in-depth knowledge of Orlando’s climate and building codes"}],"commitments":[{"id":"1","title":"Quality Guarantee","description":"We guarantee the quality of our work","icon":"✅"}],"faqs":[{"id":"1","question":"How long does a typical Roofing project take?","answer":"Most roofing projects in Orlando take between 1 to 3 days, depending on the size and complexity. We will assess your specific needs during the consultation and provide a detailed timeline for your project."},{"id":"2","question":"Do you offer emergency Roofing services?","answer":"Yes, Roofing Pros offers 24/7 emergency roofing services to address urgent issues like leaks or storm damage. Simply call us anytime, and our team will be ready to assist you promptly and effectively."},{"id":"3","question":"What areas do you serve in Orlando?","answer":"We proudly serve Orlando and its surrounding communities, including Winter Park, Altamonte Springs, and Kissimmee. Feel free to reach out to confirm if we cover your specific area for roofing services."},{"id":"4","question":"Do you provide free estimates?","answer":"Absolutely! We offer free, no-obligation estimates for all roofing projects in Orlando. Our team will conduct a thorough assessment and provide you with a detailed quote to help you make an informed decision."},{"id":"5","question":"What warranty do you provide on your work?","answer":"We stand behind our work with comprehensive warranty coverage on all roofing services. The details of our warranty will be outlined in your estimate, ensuring you have peace of mind regarding the quality of our craftsmanship."},{"id":"6","question":"How do I schedule a consultation?","answer":"Scheduling a consultation is easy! You can call us directly at 8755026291 or fill out our online contact form. We aim to respond within 24 hours to discuss your roofing needs and set up an appointment."}]}', true);

    // Save settings into wp_options
    update_option('bsg_settings', $settings);

    // Create essential pages if they don't exist
    $pages_to_create = [
        [
            'title' => 'Home',
            'template' => 'home-dynamic.php',
            'is_front' => true
        ],
        [
            'title' => 'About Us',
            'template' => 'page-about.php',
            'slug' => 'about-us'
        ],
        [
            'title' => 'Contact Us',
            'template' => 'page-contact.php',
            'slug' => 'contact-us'
        ],
        [
            'title' => 'Our Services',
            'template' => 'page-services.php',
            'slug' => 'services'
        ],
        [
            'title' => 'Service Locations',
            'template' => 'location.php',
            'slug' => 'service-locations'
        ]
    ];

    foreach ($pages_to_create as $page_data) {
        $existing_page = get_page_by_title($page_data['title']);
        
        if (!$existing_page) {
            $page_args = [
                'post_title'     => $page_data['title'],
                'post_content'   => '',
                'post_status'    => 'publish',
                'post_type'      => 'page',
                'post_author'    => 1,
                'comment_status' => 'closed'
            ];
            
            // Add slug if specified
            if (!empty($page_data['slug'])) {
                $page_args['post_name'] = $page_data['slug'];
            }
            
            $page_id = wp_insert_post($page_args);
            
            if ($page_id && !is_wp_error($page_id)) {
                // Assign template to new page
                update_post_meta($page_id, '_wp_page_template', $page_data['template']);
                
                // If this is the home page, make it the front page
                if (!empty($page_data['is_front'])) {
                    update_option('show_on_front', 'page');
                    update_option('page_on_front', $page_id);
                }
            }
        } else {
            // Update existing page template
            update_post_meta($existing_page->ID, '_wp_page_template', $page_data['template']);
            
            // If this is the home page, ensure it's set as front page
            if (!empty($page_data['is_front'])) {
                update_option('show_on_front', 'page');
                update_option('page_on_front', $existing_page->ID);
                
                // Wipe shortcode if leftover
                if (has_shortcode($existing_page->post_content, 'rbs_homepage')) {
                    wp_update_post([
                        'ID'           => $existing_page->ID,
                        'post_content' => ''
                    ]);
                }
            }
        }
    }

    // Service pages are now handled by bsg_sync_service_pages() function

    // Create individual location pages based on locations array
    if (!empty($settings['locations']) && is_array($settings['locations'])) {
        // Get the main service-locations page
        $service_locations_parent_page = get_page_by_path('service-locations');
        
        foreach ($settings['locations'] as $location) {
            if (!empty($location['name'])) {
                $location_slug = sanitize_title($location['name']);
                $location_page = get_page_by_path('service-locations/' . $location_slug);
                
                if (!$location_page) {
                    $location_page_id = wp_insert_post([
                        'post_title'     => $location['name'] . ' Services',
                        'post_content'   => '',
                        'post_status'    => 'publish',
                        'post_type'      => 'page',
                        'post_author'    => 1,
                        'comment_status' => 'closed',
                        'post_name'      => $location_slug,
                        'post_parent'    => $service_locations_parent_page ? $service_locations_parent_page->ID : 0
                    ]);
                    
                    if ($location_page_id && !is_wp_error($location_page_id)) {
                        // Assign individual location template
                        update_post_meta($location_page_id, '_wp_page_template', 'location.php');
                        // Mark as location page
                        update_post_meta($location_page_id, '_bsg_location_name', $location['name']);
                    }
                }
            }
        }
    }
    
    // Flush rewrite rules to ensure new URL structure works
    flush_rewrite_rules();
}
add_action('after_switch_theme', 'bsg_theme_activate');

/**
 * Theme Functions
 */

// Basic theme setup
function bsg_theme_setup() {
	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');
	add_theme_support('menus');
	register_nav_menus([
		'primary' => __('Primary Menu', 'my-custom-theme'),
		'footer' => __('Footer Menu', 'my-custom-theme'),
	]);
}
add_action('after_setup_theme', 'bsg_theme_setup');

// Enqueue theme styles/scripts
function bsg_enqueue_assets() {
	// Main theme stylesheet
	wp_enqueue_style('bsg-style', get_stylesheet_uri(), [], wp_get_theme()->get('Version'));
	
	// Public CSS for frontend
	wp_enqueue_style('bsg-public-css', get_template_directory_uri() . '/assets/css/public.css', [], '1.0.0');
	
	// Consistent section styles
	wp_enqueue_style('bsg-consistent-styles', get_template_directory_uri() . '/assets/css/bsg-consistent-styles.css', [], '1.0.0');
	
	// Font Awesome
	wp_enqueue_style('bsg-fontawesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css', [], '6.5.0');
	
	// Public JavaScript
	wp_enqueue_script('bsg-public-js', get_template_directory_uri() . '/assets/js/public.js', ['jquery'], '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'bsg_enqueue_assets');

// Add rewrite rules for services and locations
function bsg_add_rewrite_rules() {
    // Add rewrite rule for services: /services/service-name
    add_rewrite_rule(
        '^services/([^/]+)/?$',
        'index.php?pagename=services&service=$matches[1]',
        'top'
    );
    
    // Add rewrite rule for locations: /service-locations/location-name
    add_rewrite_rule(
        '^service-locations/([^/]+)/?$',
        'index.php?pagename=service-locations&location=$matches[1]',
        'top'
    );
}

// Handle individual service and location pages
function bsg_template_redirect() {
    global $wp_query;
    
    // Check if this is a service URL
    if (isset($wp_query->query_vars['service'])) {
        $service_slug = $wp_query->query_vars['service'];
        
        // Check if we have a template for individual services
        $template_path = get_template_directory() . '/page-service.php';
        if (file_exists($template_path)) {
            include $template_path;
            exit;
        }
    }
    
    // Check if this is a location URL
    if (isset($wp_query->query_vars['location'])) {
        $location_slug = $wp_query->query_vars['location'];
        
        // Check if we have a template for individual locations
        $template_path = get_template_directory() . '/location.php';
        if (file_exists($template_path)) {
            include $template_path;
            exit;
        }
    }
}
add_action('template_redirect', 'bsg_template_redirect');
add_action('init', 'bsg_add_rewrite_rules');

// Contact form handling hooks
add_action('init', 'bsg_handle_contact_form_submission');
add_action('wp_ajax_bsg_ajax_contact_form_submission', 'bsg_ajax_contact_form_submission');
add_action('wp_ajax_nopriv_bsg_ajax_contact_form_submission', 'bsg_ajax_contact_form_submission');
add_action('after_switch_theme', 'bsg_create_contact_messages_table');

// Add query vars for services and locations
function bsg_add_query_vars($vars) {
    $vars[] = 'service';
    $vars[] = 'location';
    return $vars;
}
add_filter('query_vars', 'bsg_add_query_vars');

// Enqueue admin styles/scripts
function bsg_enqueue_admin_assets($hook) {
	// Only load on theme customizer or specific admin pages
	if (in_array($hook, ['appearance_page_customize', 'customize.php', 'post.php', 'post-new.php', 'edit.php'])) {
		wp_enqueue_style('bsg-admin-css', get_template_directory_uri() . '/assets/css/admin.css', [], '1.0.0');
		wp_enqueue_script('bsg-admin-js', get_template_directory_uri() . '/assets/js/admin.js', ['jquery'], '1.0.0', true);
	}
}
add_action('admin_enqueue_scripts', 'bsg_enqueue_admin_assets');

// BSG Settings menu removed - no longer needed

// Temporary debug function - remove after testing
function bsg_debug_settings() {
    if (current_user_can('manage_options')) {
        $settings = get_option('bsg_settings', []);
        echo '<div style="background: #fff; padding: 20px; margin: 20px; border: 1px solid #ccc;">';
        echo '<h3>BSG Settings Debug (Admin Only)</h3>';
        echo '<pre>' . print_r($settings, true) . '</pre>';
        echo '</div>';
    }
}
// Uncomment the next line to see settings on frontend (admin only)
// add_action('wp_footer', 'bsg_debug_settings');

// Fallback menu function
function bsg_fallback_menu() {
    $settings = get_option('bsg_settings', []);
    $business_name = !empty($settings['business_name']) ? $settings['business_name'] : get_bloginfo('name');
    
    echo '<ul id="primary-menu" class="nav-menu">';
    echo '<li><a href="' . esc_url(home_url('/')) . '">Home</a></li>';
    
    // Add About page if it exists
    $about_page = get_page_by_path('about-us');
    if ($about_page) {
        echo '<li><a href="' . esc_url(get_permalink($about_page->ID)) . '">About Us</a></li>';
    }
    
    // Add Contact page if it exists
    $contact_page = get_page_by_path('contact-us');
    if ($contact_page) {
        echo '<li><a href="' . esc_url(get_permalink($contact_page->ID)) . '">Contact</a></li>';
    }
    
    // Add Services page if it exists
    $services_page = get_page_by_path('services');
    if ($services_page) {
        echo '<li><a href="' . esc_url(get_permalink($services_page->ID)) . '">Services</a></li>';
    }
    
    echo '</ul>';
}

// ============================================================================
// CENTRALIZED SETTINGS FUNCTIONS
// ============================================================================

/**
 * Get all theme settings with fallbacks
 */
function bsg_get_settings() {
    // PRIORITY 1: Use build-time injected settings if available (from theme generation)
    global $settings;
    if (isset($settings) && is_array($settings) && !empty($settings)) {
        return $settings;
    }
    
    // PRIORITY 2: Try to read latest saved settings from database
    $stored = get_option('bsg_settings', []);
    if (!empty($stored)) {
        // Refresh cache with latest
        set_transient('bsg_settings_cache', $stored, HOUR_IN_SECONDS);
        return $stored;
    }

    // PRIORITY 3: Fallback to transient cache if database is empty
    $cached_settings = get_transient('bsg_settings_cache');
    if ($cached_settings !== false) {
        return $cached_settings;
    }

    return [];
}

/**
 * Register REST endpoint to save wizard data directly into wp_options (bsg_settings)
 */
add_action('rest_api_init', function () {
    register_rest_route('bsg/v1', '/save-wizard-data', [
        'methods'  => 'POST',
        'callback' => function (WP_REST_Request $request) {
            $payload = $request->get_json_params();
            if (!is_array($payload)) {
                return new WP_REST_Response([ 'success' => false, 'error' => 'Invalid JSON' ], 400);
            }

            // Basic sanitization
            $settings = is_array($payload) ? $payload : [];

            // Persist to wp_options
            update_option('bsg_settings', $settings, false);
            // Refresh transient cache
            set_transient('bsg_settings_cache', $settings, HOUR_IN_SECONDS);

            return new WP_REST_Response([ 'success' => true, 'settings' => $settings ], 200);
        },
        'permission_callback' => '__return_true', // Assumes protected by external source; lock down if needed
    ]);
});

/**
 * Get business information
 */
function bsg_get_business_info() {
    $settings = bsg_get_settings();
    return [
        'name' => $settings['business_name'] ?? 'Roofing Pros',
        'logo' => $settings['business_logo'] ?? '',
        'phone' => $settings['phone'] ?? '(555) 123-4567',
        'email' => $settings['email'] ?? 'info@yourbusiness.com',
        'address' => $settings['address'] ?? '123 Main Street',
        'state' => $settings['state'] ?? 'Your State',
        'zip' => $settings['zip'] ?? '12345',
        'business_type' => $settings['business_type'] ?? 'contractor',
        'location' => $settings['location'] ?? 'your area'
    ];
}

/**
 * Generate meta tags for any page
 */
function bsg_generate_meta_tags($page_type = 'home', $custom_title = '', $custom_description = '') {
    $settings = bsg_get_settings();
    $business = bsg_get_business_info();
    
    $meta_data = [];
    
    switch ($page_type) {
        case 'home':
            $meta_data['title'] = $custom_title ?: ($settings['homepage_meta_title'] ?: $business['name'] . ' - Professional Services in ' . $business['state']);
            $meta_data['description'] = $custom_description ?: ($settings['homepage_meta_description'] ?: $business['name'] . ' provides professional services in ' . $business['state'] . '. Get free estimates, expert installation, and reliable service. Call ' . $business['phone'] . ' today!');
            $meta_data['keywords'] = $settings['homepage_meta_keywords'] ?: 'professional services, ' . strtolower($business['name']) . ', ' . $business['state'] . ', installation, repair, contractor, free estimate';
            break;
            
        case 'about':
            $meta_data['title'] = $custom_title ?: ($settings['about_page_meta_title'] ?: $settings['about_meta_title'] ?: $business['name'] . ' - About Us | Professional ' . $business['business_type']);
            $meta_data['description'] = $custom_description ?: ($settings['about_page_meta_description'] ?: $settings['about_meta_description'] ?: 'Learn about ' . $business['name'] . ', a trusted ' . $business['business_type'] . ' with ' . ($settings['about_years'] ?? '15+') . ' years of experience. Professional ' . $business['business_type'] . ', quality workmanship, and customer satisfaction in ' . $business['location'] . '.');
            $meta_data['keywords'] = $settings['about_page_meta_keywords'] ?: $settings['about_meta_keywords'] ?: 'about ' . strtolower($business['name']) . ', ' . $business['business_type'] . ', professional ' . $business['business_type'] . ', ' . ($settings['about_years'] ?? '15+') . ' years experience, quality ' . $business['business_type'];
            break;
            
        case 'contact':
            $meta_data['title'] = $custom_title ?: ($settings['contact_meta_title'] ?: $business['name'] . ' - Contact Us | Get Free Estimate');
            $meta_data['description'] = $custom_description ?: ($settings['contact_meta_description'] ?: 'Contact ' . $business['name'] . ' for professional ' . $business['business_type'] . '. Get free estimates, expert consultation, and reliable service. Call ' . $business['phone'] . ' or fill out our contact form today!');
            $meta_data['keywords'] = $settings['contact_meta_keywords'] ?: 'contact ' . strtolower($business['name']) . ', ' . $business['business_type'] . ' estimate, free consultation, ' . $business['business_type'] . ' contact, ' . $business['phone'];
            break;
            
        case 'service':
            $service_name = $custom_title ?: 'Professional Services';
            $meta_data['title'] = $service_name . ' Services in ' . $business['state'] . ' | ' . $business['name'];
            $meta_data['description'] = $custom_description ?: ('Professional ' . strtolower($service_name) . ' services in ' . $business['state'] . '. Get expert ' . strtolower($service_name) . ' installation, repair, and maintenance. Call ' . $business['name'] . ' for a free estimate today.');
            $meta_data['keywords'] = strtolower($service_name) . ' services, ' . $business['state'] . ', ' . $business['business_type'] . ', professional installation, repair, maintenance';
            break;
            
        case 'location':
            $location_name = $custom_title ?: 'Professional Services';
            $meta_data['title'] = 'Professional Services in ' . $location_name . ', ' . $business['state'] . ' | ' . $business['name'];
            $meta_data['description'] = $custom_description ?: ('Get professional services in ' . $location_name . ', ' . $business['state'] . '. Expert installation, repair, and maintenance services. Local expertise with quality workmanship. Call ' . $business['name'] . ' for a free estimate today.');
            $meta_data['keywords'] = 'professional services, ' . $location_name . ', ' . $business['state'] . ', local contractor, installation, repair, maintenance';
            break;
    }
    
    return $meta_data;
}

/**
 * Output meta tags to head
 */
function bsg_output_meta_tags($page_type = 'home', $custom_title = '', $custom_description = '') {
    // Remove WordPress default meta tags to prevent duplicates
    remove_action('wp_head', '_wp_render_title_tag', 1);
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'rel_canonical');
    
    $meta = bsg_generate_meta_tags($page_type, $custom_title, $custom_description);
    $business = bsg_get_business_info();
    
    echo '<title>' . esc_html($meta['title']) . '</title>' . "\n";
    echo '<meta name="description" content="' . esc_attr($meta['description']) . '">' . "\n";
    echo '<meta name="keywords" content="' . esc_attr($meta['keywords']) . '">' . "\n";
    echo '<meta name="author" content="' . esc_attr($business['name']) . '">' . "\n";
    echo '<meta name="robots" content="index, follow">' . "\n";
    
    // Open Graph Meta Tags
    echo '<meta property="og:title" content="' . esc_attr($meta['title']) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($meta['description']) . '">' . "\n";
    echo '<meta property="og:type" content="website">' . "\n";
    echo '<meta property="og:url" content="' . esc_url(get_permalink()) . '">' . "\n";
    echo '<meta property="og:site_name" content="' . esc_attr($business['name']) . '">' . "\n";
    
    // Twitter Card Meta Tags
    echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr($meta['title']) . '">' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr($meta['description']) . '">' . "\n";
    
    // Canonical URL
    echo '<link rel="canonical" href="' . esc_url(get_permalink()) . '">' . "\n";
}

/**
 * Generate structured data (JSON-LD) for any page
 */
function bsg_generate_structured_data($page_type = 'home', $custom_data = []) {
    $settings = bsg_get_settings();
    $business = bsg_get_business_info();
    
    $schema = [
        '@context' => 'https://schema.org',
        '@type' => 'LocalBusiness',
        'name' => $business['name'],
        'url' => home_url('/'),
        'telephone' => $business['phone'],
        'email' => $business['email'],
        'address' => [
            '@type' => 'PostalAddress',
            'streetAddress' => $business['address'],
        ],
        'areaServed' => $business['location'],
    ];
    
    // Add services if available
    $services = $settings['services'] ?? [];
    if (!empty($services)) {
        $service_items = [];
        foreach ($services as $service) {
            if (!empty($service['name'])) {
                $service_items[] = [
                    '@type' => 'Offer',
                    'itemOffered' => [
                        '@type' => 'Service',
                        'name' => $service['name'],
                    ],
                ];
            }
        }
        $schema['hasOfferCatalog'] = [
            '@type' => 'OfferCatalog',
            'name' => ucfirst($business['business_type']) . ' Services',
            'itemListElement' => $service_items,
        ];
    }
    
    // Add reviews if available
    $reviews = $settings['reviews'] ?? [];
    if (!empty($reviews) && is_array($reviews)) {
        $total_reviews = count($reviews);
        $avg_rating = $total_reviews ? round(array_sum(array_map(function($r){return floatval($r['rating'] ?? 0);}, $reviews)) / $total_reviews, 1) : 0;
        
        if ($total_reviews > 0) {
            $schema['aggregateRating'] = [
                '@type' => 'AggregateRating',
                'ratingValue' => $avg_rating,
                'reviewCount' => $total_reviews,
                'bestRating' => 5,
                'worstRating' => 1,
            ];
        }
    }
    
    // Page-specific modifications
    switch ($page_type) {
        case 'contact':
            $schema['@type'] = 'ContactPage';
            $schema['name'] = $business['name'] . ' - Contact Us';
            break;
            
        case 'about':
            $schema['foundingDate'] = date('Y', strtotime('-' . ($settings['about_years'] ?? '15') . ' years'));
            $schema['numberOfEmployees'] = $settings['number_of_employees'] ?? '10-50';
            break;
    }
    
    return $schema;
}

/**
 * Output structured data to head
 */
function bsg_output_structured_data($page_type = 'home', $custom_data = []) {
    $schema = bsg_generate_structured_data($page_type, $custom_data);
    echo '<script type="application/ld+json">' . "\n";
    echo wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    echo "\n" . '</script>' . "\n";
}

/**
 * Get section visibility settings
 */
function bsg_get_section_visibility() {
    $settings = bsg_get_settings();
    return [
        'hero' => $settings['hero_visible'] ?? true,
        'features' => $settings['features_visible'] ?? true,
        'services' => $settings['services_visible'] ?? true,
        'about' => $settings['about_visible'] ?? true,
        'locations' => $settings['locations_visible'] ?? true,
        'reviews' => $settings['reviews_visible'] ?? true,
        'commitment' => $settings['commitment_visible'] ?? true,
        'faq' => $settings['faq_visible'] ?? true,
        'contact' => $settings['contact_visible'] ?? true,
    ];
}

/**
 * Get color scheme settings
 */
function bsg_get_color_scheme() {
    $settings = bsg_get_settings();
    
    // Use global theme colors if available, otherwise fall back to SKY theme defaults
    $primary = $settings['global_primary_color'] ?? $settings['primary_color'] ?? '#0ea5e9';
    $secondary = $settings['global_secondary_color'] ?? $settings['secondary_color'] ?? '#38bdf8';
    $accent = $settings['global_accent_color'] ?? $settings['accent_color'] ?? '#0c4a6e';
    $heading = $settings['heading_color'] ?? '#23282d';
    // Default CTA/button color is sky blue; overrideable via settings
    $button = $settings['button_primary_color'] ?? '#0ea5e9';
    
    // If no settings are loaded, use SKY theme as default
    if (empty($settings) || $settings === null) {
        $primary = '#0ea5e9';
        $secondary = '#38bdf8';
        $accent = '#0c4a6e';
        $heading = '#23282d';
        $button = '#0ea5e9';
    }
    
    return [
        'primary' => $primary,
        'secondary' => $secondary,
        'accent' => $accent,
        'heading' => $heading,
        'button' => $button,
        'surface' => $settings['surface_color'] ?? '#f8fafc',
        'text' => $settings['text_color'] ?? '#1f2937',
        'hero_bg' => $settings['hero_bg_color'] ?? '#232834',
        'hero_heading' => $settings['hero_heading_color'] ?? $heading,
        'hero_subheading' => $settings['hero_subheading_color'] ?? '#b0b0b0',
        'hero_company' => $settings['hero_company_color'] ?? '#b0b0b0',
        'hero_reviews_text' => $settings['hero_reviews_text_color'] ?? '#232834',
        'hero_reviews_star' => $settings['hero_reviews_star_color'] ?? '#fbbf24',
        'hero_book_btn_bg' => $settings['hero_book_btn_bg'] ?? $button,
        'hero_book_btn_text' => $settings['hero_book_btn_text'] ?? '#ffffff',
        'hero_call_btn_bg' => $settings['hero_call_btn_bg'] ?? '#232834',
        'hero_call_btn_text' => $settings['hero_call_btn_text'] ?? '#ffffff',
    ];
}

/**
 * Generate dynamic CSS with theme colors
 */
function bsg_generate_dynamic_css() {
    // Use caching for CSS generation (1 hour cache)
    $cached_css = get_transient('bsg_dynamic_css_cache');
    if ($cached_css !== false) {
        return $cached_css;
    }
    
    $colors = bsg_get_color_scheme();
    $settings = bsg_get_settings();
    // Default navbar using SKY theme: dark blue background with white text, overrideable from settings
    $nav_bg = isset($settings['nav_bg_color']) && !empty($settings['nav_bg_color']) ? $settings['nav_bg_color'] : '#0c4a6e';
    $nav_text = isset($settings['nav_text_color']) && !empty($settings['nav_text_color']) ? $settings['nav_text_color'] : '#ffffff';
    
    $css = "
    :root {
        --primary-color: {$colors['primary']};
        --secondary-color: {$colors['secondary']};
        --accent-color: {$colors['accent']};
        --heading-color: {$colors['heading']};
        --button-color: {$colors['button']};
        --surface-color: {$colors['surface']};
        --text-color: {$colors['text']};
        --nav-bg: {$nav_bg};
        --nav-bg-color: {$nav_bg};
        --nav-text-color: {$nav_text};
        --features-bg-color: " . ($settings['features_bg_color'] ?? '#1f2732') . ";
        --features-card-bg: " . ($settings['features_card_bg'] ?? '#ffffff') . ";
        --features-text-color: " . ($settings['features_text_color'] ?? 'var(--text-color)') . ";
        --features-icon-color: " . (!empty($settings['features_icon_color']) ? $settings['features_icon_color'] : $colors['button']) . ";
    }
    
    /* Global headings default to white */
    h1, h2, h3, h4, h5, h6 {
        color: #ffffff !important;
    }
    
    /* Only hero headings take the theme heading color */
    .hero-section h1, .hero-section h2, .hero-section h3, .hero-section h4, .hero-section h5, .hero-section h6 {
        color: var(--heading-color) !important;
    }
    
    /* Force white headings on dark sections (except nav and hero) */
    .features-section h1, .features-section h2, .features-section h3, .features-section h4, .features-section h5, .features-section h6,
    .locations-section h1, .locations-section h2, .locations-section h3, .locations-section h4, .locations-section h5, .locations-section h6,
    .service-hero h1, .service-hero h2, .service-hero h3, .service-hero h4, .service-hero h5, .service-hero h6,
    .review-hero h1, .review-hero h2, .review-hero h3, .review-hero h4, .review-hero h5, .review-hero h6 {
        color: #ffffff !important;
    }
    
    /* Apply theme colors to buttons */
    .btn, .btn-teal, .btn-primary, .btn-submit {
        background-color: var(--button-color) !important;
        color: #ffffff !important;
        border: none !important;
    }
    
    .btn:hover, .btn-teal:hover, .btn-primary:hover, .btn-submit:hover {
        background-color: var(--secondary-color) !important;
        opacity: 0.9;
    }
    
    /* Apply theme colors to navigation */
    .main-header {
        background-color: var(--nav-bg-color) !important;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .main-header .logo span {
        color: var(--nav-text-color) !important;
    }
    
    .main-nav a {
        color: var(--nav-text-color) !important;
        transition: color 0.3s ease;
    }
    
    .main-nav a:hover {
        color: var(--primary-color) !important;
    }
    
    /* Apply theme colors to sections */
    .hero-section {
        background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
        color: #ffffff;
        padding: 80px 0;
    }
    
    .services-section {
        background-color: #f8fafc;
        padding: 80px 0;
    }
    
    .about-section {
        background-color: #ffffff;
        padding: 80px 0;
    }
    
    .features-section {
        background-color: #1f2732;
        padding: 80px 0;
        color: #ffffff;
    }
    
    /* Features section dynamic colors */
    .features-section {
        background-color: var(--features-bg-color, #1f2732) !important;
    }
    
    .feature-item {
        background-color: var(--features-card-bg, #ffffff) !important;
        color: var(--features-text-color, var(--text-color)) !important;
    }
    
    .feature-item svg {
        stroke: var(--features-icon-color, var(--button-color)) !important;
    }
    
    .locations-section {
        background-color: #1f2937;
        color: #ffffff;
        padding: 80px 0;
    }
    
    .reviews-section {
        background-color: #ffffff;
        padding: 80px 0;
    }
    
    .commitment-section {
        background-color: #f8fafc;
        padding: 80px 0;
    }
    
    .contact-section {
        background-color: #ffffff;
        padding: 80px 0;
    }
    
    .footer {
        background-color: var(--surface-color) !important;
        color: var(--text-color) !important;
    }
    
    /* Apply theme colors to cards and content */
    .service-card, .location-card, .review-card, .feature-card {
        background-color: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        padding: 24px;
        margin-bottom: 20px;
    }
    
    .service-card:hover, .location-card:hover, .review-card:hover, .feature-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    /* Professional section styling */
    .section {
        margin: 0;
        padding: 80px 0;
    }
    
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }
    
    /* Professional typography */
    h1, h2, h3, h4, h5, h6 {
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 16px;
    }
    
    h1 { font-size: 2.5rem; }
    h2 { font-size: 2rem; }
    h3 { font-size: 1.5rem; }
    
    /* Professional button styling */
    .btn, .btn-teal, .btn-primary, .btn-submit {
        border-radius: 8px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
    }
    
    .btn:hover, .btn-teal:hover, .btn-primary:hover, .btn-submit:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }
    
    /* Apply theme colors to form elements */
    input[type='text'], input[type='email'], input[type='tel'], textarea, select {
        border: 2px solid #e5e7eb;
        transition: border-color 0.3s ease;
    }
    
    input[type='text']:focus, input[type='email']:focus, input[type='tel']:focus, textarea:focus, select:focus {
        border-color: var(--primary-color);
        outline: none;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
    
    /* Apply theme colors to links */
    a {
        color: var(--primary-color);
        text-decoration: none;
        transition: color 0.3s ease;
    }
    
    a:hover {
        color: var(--secondary-color);
    }
    
    /* Apply theme colors to icons and accents */
    .icon, .fa, .fas, .far, .fab {
        color: var(--primary-color);
    }
    
    /* Apply theme colors to progress bars and highlights */
    .progress-bar, .highlight {
        background-color: var(--primary-color);
    }
    
    /* Apply theme colors to borders and dividers */
    .divider, .border-primary {
        border-color: var(--primary-color);
    }
    ";
    
    // Cache the generated CSS for 1 hour
    set_transient('bsg_dynamic_css_cache', $css, HOUR_IN_SECONDS);
    
    return $css;
}

/**
 * Enqueue styles and scripts
 */
function bsg_enqueue_scripts() {
    // Enqueue the main CSS file with cache-busting based on file modification time
    $css_path = get_template_directory() . '/assets/css/public.css';
    $css_version = file_exists($css_path) ? filemtime($css_path) : time();
    wp_enqueue_style('bsg-public-css', get_template_directory_uri() . '/assets/css/public.css', [], $css_version);
    
    // Add dynamic CSS
    $dynamic_css = bsg_generate_dynamic_css();
    wp_add_inline_style('bsg-public-css', $dynamic_css);
    
    // Enqueue JavaScript
    wp_enqueue_script('bsg-public-js', get_template_directory_uri() . '/assets/js/public.js', [], '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'bsg_enqueue_scripts');

/**
 * Auto-create pages when theme is activated
 */
function bsg_create_default_pages() {
    // Always run page creation to ensure pages exist
    // Remove the prevention mechanism to allow pages to be created
    
    try {
        $settings = bsg_get_settings();
    
    // If no settings available, try to save them to database for future use
    if (empty($settings)) {
        global $settings;
        if (isset($settings) && is_array($settings) && !empty($settings)) {
            update_option('bsg_settings', $settings);
            error_log('BSG: Saved settings to database during page creation');
        }
    }
    
    // Debug: Log if settings are available
    if (current_user_can('manage_options')) {
        error_log('BSG: Creating default pages. Settings available: ' . (empty($settings) ? 'NO' : 'YES'));
        error_log('BSG: Services count: ' . count($settings['services'] ?? []));
        error_log('BSG: Locations count: ' . count($settings['locations'] ?? []));
    }
    
    // Ensure a Home page exists and is set as the static front page
    $home_page = get_page_by_path('home');
    if (!$home_page) {
        $home_id = wp_insert_post([
            'post_title' => 'Home',
            'post_name' => 'home',
            'post_content' => '',
            'post_status' => 'publish',
            'post_type' => 'page',
        ]);
        if ($home_id && !is_wp_error($home_id)) {
            $home_page = get_post($home_id);
            error_log('BSG: Created Home page with ID: ' . $home_id);
        }
    } else {
        error_log('BSG: Found existing Home page with ID: ' . $home_page->ID);
    }
    
    if ($home_page) {
        update_option('show_on_front', 'page');
        update_option('page_on_front', $home_page->ID);
        error_log('BSG: Set Home page as front page with ID: ' . $home_page->ID);
    } else {
        error_log('BSG: Failed to create or find Home page');
    }
    
    // Create About page if it doesn't exist
    $about_page = get_page_by_path('about') ?: get_page_by_path('about-us');
    if (!$about_page) {
        $about_content = !empty($settings['about_description']) ? $settings['about_description'] : 
            '<h2>About ' . ($settings['business_name'] ?? 'Our Company') . '</h2>
            <p>We are a professional ' . ($settings['business_type'] ?? 'service') . ' company serving ' . ($settings['location'] ?? 'your area') . ' and surrounding areas.</p>
            <p>With ' . ($settings['about_years'] ?? 15) . '+ years of experience, we are committed to delivering high-quality services that exceed our customers\' expectations.</p>';
        
        $about_id = wp_insert_post([
            'post_title' => 'About Us',
            'post_name' => 'about-us',
            'post_content' => $about_content,
            'post_status' => 'publish',
            'post_type' => 'page',
            'page_template' => 'page-about.php'
        ]);
        
        if ($about_id && !is_wp_error($about_id)) {
            error_log('BSG: Created About page with ID: ' . $about_id);
        }
    } else {
        error_log('BSG: Found existing About page with ID: ' . $about_page->ID);
    }
    
    // Create Contact page if it doesn't exist
    $contact_page = get_page_by_path('contact') ?: get_page_by_path('contact-us');
    if (!$contact_page) {
        $contact_content = '<h2>Contact ' . ($settings['business_name'] ?? 'Us') . '</h2>
            <p>Get in touch for professional ' . ($settings['business_type'] ?? 'service') . ' services.</p>
            <p><strong>Phone:</strong> ' . ($settings['phone'] ?? '') . '</p>
            <p><strong>Email:</strong> ' . ($settings['email'] ?? '') . '</p>
            <p><strong>Service Area:</strong> ' . ($settings['location'] ?? '') . ' and surrounding areas</p>';
        
        $contact_id = wp_insert_post([
            'post_title' => 'Contact Us',
            'post_name' => 'contact-us',
            'post_content' => $contact_content,
            'post_status' => 'publish',
            'post_type' => 'page',
            'page_template' => 'page-contact-us.php'
        ]);
        
        if ($contact_id && !is_wp_error($contact_id)) {
            error_log('BSG: Created Contact page with ID: ' . $contact_id);
        }
    } else {
        error_log('BSG: Found existing Contact page with ID: ' . $contact_page->ID);
    }
    
    // Intentionally not creating a standalone FAQ page per requirement

    // Create Services parent page and Service child pages ONLY if services data exists
    $services = $settings['services'] ?? [];
    if (is_array($services) && !empty($services)) {
        $services_parent = get_page_by_path('services');
        if (!$services_parent) {
            $services_parent_id = wp_insert_post([
                'post_title' => 'Services',
                'post_name' => 'services',
                'post_content' => '<h2>Our Services</h2><p>Professional services tailored to your needs.</p>',
                'post_status' => 'publish',
                'post_type' => 'page'
            ]);
            if ($services_parent_id && !is_wp_error($services_parent_id)) {
                error_log('BSG: Created Services parent page with ID: ' . $services_parent_id);
            }
        } else {
            $services_parent_id = $services_parent->ID;
            error_log('BSG: Found existing Services parent page with ID: ' . $services_parent_id);
        }
        
        // Service pages are now handled by bsg_sync_service_pages() function
    } else {
        error_log('BSG: No services data found, skipping service pages creation');
    }

    // Create Locations parent page and Location child pages ONLY if locations data exists
    $locations = $settings['locations'] ?? [];
    if (is_array($locations) && !empty($locations)) {
        $locations_parent = get_page_by_path('service-locations');
        if (!$locations_parent) {
            $parent_id = wp_insert_post([
                'post_title' => 'Service Locations',
                'post_name' => 'service-locations',
                'post_content' => '<h2>Service Locations</h2><p>We serve multiple locations with professional services.</p>',
                'post_status' => 'publish',
                'post_type' => 'page'
            ]);
            if ($parent_id && !is_wp_error($parent_id)) {
                error_log('BSG: Created Locations parent page with ID: ' . $parent_id);
            }
        } else { 
            $parent_id = $locations_parent->ID;
            error_log('BSG: Found existing Locations parent page with ID: ' . $parent_id);
        }

        foreach ($locations as $location) {
            if (empty($location['name'])) { continue; }
            $loc_name = $location['name'];
            $zip = $location['zip'] ?? $location['zip_code'] ?? '';
            $loc_slug = sanitize_title($loc_name) . (!empty($zip) ? '-' . $zip : '');
            
            // Check for existing page with this slug as a child of locations
            $existing = get_posts([
                'name' => $loc_slug,
                'post_type' => 'page',
                'post_parent' => $parent_id,
                'post_status' => 'publish',
                'numberposts' => 1
            ]);
            
            if (empty($existing)) {
                // Also check if there's a page with this slug anywhere (to avoid duplicates)
                $any_existing = get_page_by_path($loc_slug);
                if (!$any_existing) {
                    wp_insert_post([
                        'post_title' => $loc_name,
                        'post_name' => $loc_slug,
                        'post_parent' => $parent_id,
                        'post_content' => !empty($location['description']) ? $location['description'] : '',
                        'post_status' => 'publish',
                        'post_type' => 'page'
                    ]);
                    error_log('BSG: Created location page: ' . $loc_name . ' with slug: ' . $loc_slug);
                } else {
                    // Update existing page to be child of locations
                    wp_update_post([
                        'ID' => $any_existing->ID,
                        'post_parent' => $parent_id,
                    ]);
                    error_log('BSG: Updated existing page to be child of locations: ' . $loc_name);
                }
            }
        }
    } else {
        error_log('BSG: No locations data found, skipping location pages creation');
    }
    
    // Pages created successfully
    error_log('BSG: All pages created successfully');
    
    } catch (Exception $e) {
        error_log('BSG Page Creation Error: ' . $e->getMessage());
        // Don't let page creation errors break the site
    }
}
// Temporarily disabled to prevent critical errors
// add_action('after_switch_theme', 'bsg_create_default_pages');

// Save settings to database on theme activation
function bsg_save_settings_to_db() {
    global $settings;
    if (isset($settings) && is_array($settings) && !empty($settings)) {
        update_option('bsg_settings', $settings);
        error_log('BSG: Settings saved to database on theme activation');
    }
}
add_action('after_switch_theme', 'bsg_save_settings_to_db');

// Ensure pages are created at least once even if theme was not re-activated
function bsg_maybe_create_pages() {
    $required = ['home', 'services', 'locations'];
    $needs = false;
    foreach ($required as $slug) {
        if (!get_page_by_path($slug)) { $needs = true; break; }
    }
    
    // Debug logging
    if (current_user_can('manage_options')) {
        error_log('BSG: maybe_create_pages - needs creation: ' . ($needs ? 'YES' : 'NO'));
    }
    
    if ($needs) {
        bsg_create_default_pages();
    }

    // Always attempt to build the primary menu so new pages appear
    bsg_create_primary_menu();
}
// Temporarily disabled to prevent critical errors
// add_action('init', 'bsg_maybe_create_pages');

// Also run on init to ensure pages are created (but only once per day)
function bsg_force_create_pages() {
    // Only run if we're not in admin and WordPress is fully loaded
    if (is_admin() || !did_action('wp_loaded')) {
        return;
    }
    
    // Only run page creation once per day to avoid performance issues
    $last_run = get_transient('bsg_pages_creation_last_run');
    if ($last_run === false) {
        bsg_create_default_pages();
        set_transient('bsg_pages_creation_last_run', time(), DAY_IN_SECONDS);
    }
}
// Temporarily disabled to prevent critical errors
// add_action('wp_loaded', 'bsg_force_create_pages', 20);

// Manual page creation function for admin use
function bsg_manual_create_pages() {
    if (current_user_can('manage_options') && isset($_GET['bsg_create_pages'])) {
        bsg_create_default_pages();
        bsg_create_primary_menu();
        wp_redirect(admin_url('themes.php?page=bsg-settings&pages_created=1'));
        exit;
    }
}
// add_action('admin_init', 'bsg_manual_create_pages');

// Clean up duplicate pages function
function bsg_cleanup_duplicate_pages() {
    if (current_user_can('manage_options') && isset($_GET['bsg_cleanup_duplicates'])) {
        // Find and remove duplicate service pages
        $services_parent = get_page_by_path('services');
        if ($services_parent) {
            $duplicate_services = get_posts([
                'post_type' => 'page',
                'post_parent' => $services_parent->ID,
                'post_status' => 'publish',
                'numberposts' => -1
            ]);
            
            $seen_slugs = [];
            foreach ($duplicate_services as $service) {
                if (in_array($service->post_name, $seen_slugs)) {
                    // This is a duplicate, delete it
                    wp_delete_post($service->ID, true);
                    error_log('BSG: Deleted duplicate service page: ' . $service->post_title);
                } else {
                    $seen_slugs[] = $service->post_name;
                }
            }
        }
        
        // Find and remove duplicate location pages
        $locations_parent = get_page_by_path('service-locations');
        if ($locations_parent) {
            $duplicate_locations = get_posts([
                'post_type' => 'page',
                'post_parent' => $locations_parent->ID,
                'post_status' => 'publish',
                'numberposts' => -1
            ]);
            
            $seen_slugs = [];
            foreach ($duplicate_locations as $location) {
                if (in_array($location->post_name, $seen_slugs)) {
                    // This is a duplicate, delete it
                    wp_delete_post($location->ID, true);
                    error_log('BSG: Deleted duplicate location page: ' . $location->post_title);
                } else {
                    $seen_slugs[] = $location->post_name;
                }
            }
        }
        
        wp_redirect(admin_url('themes.php?page=bsg-settings&duplicates_cleaned=1'));
        exit;
    }
}
add_action('admin_init', 'bsg_cleanup_duplicate_pages');

// Reset page creation flag function
function bsg_reset_page_creation_flag() {
    if (current_user_can('manage_options') && isset($_GET['bsg_reset_pages'])) {
        delete_option('bsg_pages_created');
        error_log('BSG: Reset page creation flag');
        wp_redirect(admin_url('themes.php?page=bsg-settings&pages_reset=1'));
        exit;
    }
}
add_action('admin_init', 'bsg_reset_page_creation_flag');

/**
 * Register theme menus and ensure a Primary menu exists and is populated
 */
function bsg_setup_theme() {
    add_theme_support('menus');
    register_nav_menus([
        'primary' => 'Primary Menu',
        'footer' => 'Footer Menu',
    ]);
}
add_action('after_setup_theme', 'bsg_setup_theme');

/**
 * Create and populate the Primary Menu with pages and dynamic items
 */
function bsg_create_primary_menu() {
    try {
        // Ensure menus are registered
        bsg_setup_theme();

    $menu_name = 'Primary Menu';
    $menu = wp_get_nav_menu_object($menu_name);
    if (!$menu) {
        $menu_id = wp_create_nav_menu($menu_name);
    } else {
        $menu_id = $menu->term_id;
    }

    // Helper: add or find a menu item
    $add_item = function(array $args) use ($menu_id) {
        return wp_update_nav_menu_item($menu_id, 0, array_merge([
            'menu-item-status' => 'publish',
        ], $args));
    };

    // Home
    $add_item([
        'menu-item-title' => 'Home',
        'menu-item-url' => home_url('/'),
        'menu-item-type' => 'custom',
    ]);

    // Services (parent) linking to homepage section
    $services_parent_id = $add_item([
        'menu-item-title' => 'Services',
        'menu-item-url' => home_url('/#services'),
        'menu-item-type' => 'custom',
    ]);

    // Add each Service page under Services parent
    $services_parent_page = get_page_by_path('services');
    if ($services_parent_page) {
        $service_pages = get_pages(['parent' => $services_parent_page->ID, 'sort_column' => 'menu_order']);
        foreach ($service_pages as $svc_page) {
            $add_item([
                'menu-item-title' => $svc_page->post_title,
                'menu-item-object-id' => $svc_page->ID,
                'menu-item-object' => 'page',
                'menu-item-type' => 'post_type',
                'menu-item-parent-id' => $services_parent_id,
            ]);
        }
    }

    // Service Locations (parent)
    $locations_parent_id = $add_item([
        'menu-item-title' => 'Service Locations',
        'menu-item-url' => home_url('/#locations'),
        'menu-item-type' => 'custom',
    ]);

    // Add children for each Location page under Service Locations parent if exists
    $locations_parent_page = get_page_by_path('service-locations');
    if ($locations_parent_page) {
        $child_pages = get_pages([
            'child_of' => $locations_parent_page->ID,
            'parent' => $locations_parent_page->ID,
            'number' => 100,
        ]);
        foreach ($child_pages as $loc_page) {
            $add_item([
                'menu-item-title' => $loc_page->post_title,
                'menu-item-object-id' => $loc_page->ID,
                'menu-item-object' => 'page',
                'menu-item-type' => 'post_type',
                'menu-item-parent-id' => $locations_parent_id,
            ]);
        }
    }

    // About
    $about = get_page_by_path('about') ?: get_page_by_path('about-us');
    if ($about) {
        $add_item([
            'menu-item-title' => 'About',
            'menu-item-object-id' => $about->ID,
            'menu-item-object' => 'page',
            'menu-item-type' => 'post_type',
        ]);
    }

    // Contact
    $contact = get_page_by_path('contact') ?: get_page_by_path('contact-us');
    if ($contact) {
        $add_item([
            'menu-item-title' => 'Contact',
            'menu-item-object-id' => $contact->ID,
            'menu-item-object' => 'page',
            'menu-item-type' => 'post_type',
        ]);
    }

    // Assign to theme location
    $locations = get_theme_mod('nav_menu_locations');
    if (!is_array($locations)) { $locations = []; }
    $locations['primary'] = $menu_id;
    set_theme_mod('nav_menu_locations', $locations);
    
    } catch (Exception $e) {
        error_log('BSG Menu Creation Error: ' . $e->getMessage());
        // Don't let menu creation errors break the site
    }
}

// Safe auto page creation - only runs once when theme is activated
function bsg_safe_auto_create_pages() {
    // Reset the flag to allow re-creation with new logic
    // if (get_option('bsg_pages_auto_created')) {
    //     return;
    // }
    
    error_log('BSG: Auto page creation function called');
    
    try {
        $settings = bsg_get_settings();
        $created = [];
        
        error_log('BSG: Settings loaded, locations count: ' . (isset($settings['locations']) ? count($settings['locations']) : 0));
        
        // Create Home page
        $home_page = get_page_by_path('home');
        if (!$home_page) {
            $home_id = wp_insert_post([
                'post_title' => 'Home',
                'post_name' => 'home',
                'post_content' => '',
                'post_status' => 'publish',
                'post_type' => 'page',
            ]);
            if ($home_id && !is_wp_error($home_id)) {
                update_option('show_on_front', 'page');
                update_option('page_on_front', $home_id);
                $created[] = 'Home';
            }
        }
        
        // Create About Us page
        $about_page = get_page_by_path('about-us');
        if (!$about_page) {
            $about_id = wp_insert_post([
                'post_title' => 'About Us',
                'post_name' => 'about-us',
                'post_content' => '<h2>About ' . ($settings['business_name'] ?? 'Our Company') . '</h2><p>Professional services in your area.</p>',
                'post_status' => 'publish',
                'post_type' => 'page',
                'page_template' => 'page-about.php'
            ]);
            if ($about_id && !is_wp_error($about_id)) {
                $created[] = 'About Us';
            }
        }
        
        // Create Contact Us page
        $contact_page = get_page_by_path('contact-us');
        if (!$contact_page) {
            $contact_id = wp_insert_post([
                'post_title' => 'Contact Us',
                'post_name' => 'contact-us',
                'post_content' => '<h2>Contact ' . ($settings['business_name'] ?? 'Us') . '</h2><p>Get in touch for professional services.</p>',
                'post_status' => 'publish',
                'post_type' => 'page',
                'page_template' => 'page-contact-us.php'
            ]);
            if ($contact_id && !is_wp_error($contact_id)) {
                $created[] = 'Contact Us';
            }
        }
        
        // Always create Services parent page first
        $services_parent = get_page_by_path('services');
        if (!$services_parent) {
            $services_parent_id = wp_insert_post([
                'post_title' => 'Services',
                'post_name' => 'services',
                'post_content' => '<h2>Our Services</h2><p>Professional services tailored to your needs.</p>',
                'post_status' => 'publish',
                'post_type' => 'page'
            ]);
            if ($services_parent_id && !is_wp_error($services_parent_id)) {
                $created[] = 'Services parent';
            }
        } else {
            $services_parent_id = $services_parent->ID;
        }
        
        // Only create individual service pages if services data exists in wizard
        $services = $settings['services'] ?? [];
        if (is_array($services) && !empty($services)) {
            // Create individual service pages
            foreach ($services as $service) {
                if (empty($service['name'])) { continue; }
                $service_slug = sanitize_title($service['name']);
                
                // Check if service page already exists as child of services
                $existing = get_posts([
                    'name' => $service_slug,
                    'post_type' => 'page',
                    'post_parent' => $services_parent_id,
                    'post_status' => 'publish',
                    'numberposts' => 1
                ]);
                
                if (empty($existing)) {
                    $service_id = wp_insert_post([
                        'post_title' => $service['name'],
                        'post_name' => $service_slug,
                        'post_content' => !empty($service['content']) ? $service['content'] : '',
                        'post_status' => 'publish',
                        'post_type' => 'page',
                        'post_parent' => $services_parent_id,
                    ]);
                    if ($service_id && !is_wp_error($service_id)) {
                        $created[] = 'Service: ' . $service['name'];
                    }
                }
            }
        } else {
            // If no services data, create default service pages based on what we know exists
            $default_services = ['Roof Installation', 'Roof Repair'];
            foreach ($default_services as $service_name) {
                $service_slug = sanitize_title($service_name);
                
                // Check if service page already exists as child of services
                $existing = get_posts([
                    'name' => $service_slug,
                    'post_type' => 'page',
                    'post_parent' => $services_parent_id,
                    'post_status' => 'publish',
                    'numberposts' => 1
                ]);
                
                if (empty($existing)) {
                    $service_id = wp_insert_post([
                        'post_title' => $service_name,
                        'post_name' => $service_slug,
                        'post_content' => '<h2>' . $service_name . '</h2><p>Professional ' . strtolower($service_name) . ' services.</p>',
                        'post_status' => 'publish',
                        'post_type' => 'page',
                        'post_parent' => $services_parent_id,
                    ]);
                    if ($service_id && !is_wp_error($service_id)) {
                        $created[] = 'Service: ' . $service_name;
                    }
                }
            }
        }
        
        // Only create location pages if locations data exists in wizard
        $locations = $settings['locations'] ?? [];
        if (is_array($locations) && !empty($locations)) {
            // Create Locations parent page
            $locations_parent = get_page_by_path('locations');
            if (!$locations_parent) {
                $locations_parent_id = wp_insert_post([
                    'post_title' => 'Service Locations',
                    'post_name' => 'locations',
                    'post_content' => '<h2>Service Locations</h2><p>We serve multiple locations with professional services.</p>',
                    'post_status' => 'publish',
                    'post_type' => 'page'
                ]);
                if ($locations_parent_id && !is_wp_error($locations_parent_id)) {
                    $created[] = 'Service Locations parent';
                }
            } else {
                $locations_parent_id = $locations_parent->ID;
            }
            
            // Create individual location pages
            foreach ($locations as $location) {
                if (empty($location['name'])) { continue; }
                $loc_name = $location['name'];
                $zip = $location['zip'] ?? $location['zip_code'] ?? '';
                $loc_slug = sanitize_title($loc_name) . (!empty($zip) ? '-' . $zip : '');
                
                error_log('BSG: Processing location: ' . $loc_name . ' with slug: ' . $loc_slug);
                
                // Check if location page already exists
                $existing = get_posts([
                    'name' => $loc_slug,
                    'post_type' => 'page',
                    'post_parent' => $locations_parent_id,
                    'post_status' => 'publish',
                    'numberposts' => 1
                ]);
                
                if (empty($existing)) {
                    error_log('BSG: Creating location page: ' . $loc_name);
                    $location_id = wp_insert_post([
                        'post_title' => $loc_name,
                        'post_name' => $loc_slug,
                        'post_parent' => $locations_parent_id,
                        'post_content' => !empty($location['description']) ? $location['description'] : '',
                        'post_status' => 'publish',
                        'post_type' => 'page'
                    ]);
                    if ($location_id && !is_wp_error($location_id)) {
                        // Assign location template
                        update_post_meta($location_id, '_wp_page_template', 'location.php');
                        $created[] = 'Location: ' . $loc_name;
                        error_log('BSG: Successfully created location page: ' . $loc_name . ' with ID: ' . $location_id);
                    } else {
                        error_log('BSG: Failed to create location page: ' . $loc_name);
                    }
                } else {
                    error_log('BSG: Location page already exists: ' . $loc_name);
                }
            }
        }
        
        // Mark as completed
        update_option('bsg_pages_auto_created', true);
        error_log('BSG: Auto-created pages: ' . implode(', ', $created));
        
    } catch (Exception $e) {
        error_log('BSG Auto Page Creation Error: ' . $e->getMessage());
    }
}
// Removed duplicate page creation functions to prevent duplicates

// Removed admin notice for page creation - pages are created automatically

// Reset auto-creation flag - accessible via URL parameter
function bsg_reset_auto_creation_flag() {
    if (!current_user_can('manage_options')) {
        return;
    }
    
    if (isset($_GET['bsg_reset_pages']) && $_GET['bsg_reset_pages'] === '1') {
        delete_option('bsg_pages_auto_created');
        wp_redirect(admin_url('edit.php?post_type=page&bsg_pages_reset=1'));
        exit;
    }
}
add_action('admin_init', 'bsg_reset_auto_creation_flag');

// SIMPLE DIRECT PAGE CREATION - This will definitely work
function bsg_simple_create_pages() {
    if (!current_user_can('manage_options')) {
        return;
    }
    
    // Check if this is a manual trigger
    if (isset($_GET['bsg_simple_create']) && $_GET['bsg_simple_create'] === '1') {
        error_log('BSG: Simple page creation triggered');
        
        try {
            $settings = bsg_get_settings();
            $locations = $settings['locations'] ?? [];
            
            error_log('BSG: Found ' . count($locations) . ' locations to create');
            
            if (empty($locations)) {
                wp_redirect(admin_url('edit.php?post_type=page&bsg_error=no_locations'));
                exit;
            }
            
            $created = [];
            
            // Create Service Areas parent page
            $locations_parent = get_page_by_path('service-locations');
            if (!$locations_parent) {
                $locations_parent_id = wp_insert_post([
                    'post_title' => 'Service Locations',
                    'post_name' => 'service-locations',
                    'post_content' => '<h2>Service Locations</h2><p>We serve multiple locations with professional services.</p>',
                    'post_status' => 'publish',
                    'post_type' => 'page'
                ]);
                if ($locations_parent_id && !is_wp_error($locations_parent_id)) {
                    $created[] = 'Service Locations parent page';
                    error_log('BSG: Created Service Areas parent page');
                }
            } else {
                $locations_parent_id = $locations_parent->ID;
                error_log('BSG: Service Locations parent page already exists');
            }
            
            // Create individual location pages
            foreach ($locations as $location) {
                if (empty($location['name']) || empty($location['slug'])) {
                    error_log('BSG: Skipping location - missing name or slug: ' . json_encode($location));
                    continue;
                }
                
                $loc_name = $location['name'];
                $loc_slug = $location['slug'];
                
                // Check if page already exists
                $existing = get_posts([
                    'name' => $loc_slug,
                    'post_type' => 'page',
                    'post_parent' => $locations_parent_id,
                    'post_status' => 'publish',
                    'numberposts' => 1
                ]);
                
                if (empty($existing)) {
                    $location_id = wp_insert_post([
                        'post_title' => $loc_name,
                        'post_name' => $loc_slug,
                        'post_parent' => $locations_parent_id,
                        'post_content' => !empty($location['description']) ? $location['description'] : '',
                        'post_status' => 'publish',
                        'post_type' => 'page'
                    ]);
                    
                    if ($location_id && !is_wp_error($location_id)) {
                        // Assign location template
                        update_post_meta($location_id, '_wp_page_template', 'location.php');
                        $created[] = $loc_name . ' (' . $loc_slug . ')';
                        error_log('BSG: Created location page: ' . $loc_name . ' with slug: ' . $loc_slug);
                    } else {
                        error_log('BSG: Failed to create location page: ' . $loc_name);
                    }
                } else {
                    error_log('BSG: Location page already exists: ' . $loc_name);
                }
            }
            
            // Flush rewrite rules
            flush_rewrite_rules();
            
            $message = 'Created ' . count($created) . ' pages: ' . implode(', ', $created);
            error_log('BSG: ' . $message);
            
            wp_redirect(admin_url('edit.php?post_type=page&bsg_success=' . urlencode($message)));
            exit;
            
        } catch (Exception $e) {
            error_log('BSG Simple Page Creation Error: ' . $e->getMessage());
            wp_redirect(admin_url('edit.php?post_type=page&bsg_error=' . urlencode($e->getMessage())));
            exit;
        }
    }
}
add_action('admin_init', 'bsg_simple_create_pages');

// Removed simple admin notice - pages are created automatically

// IMMEDIATE PAGE CREATION - Runs on every page load until pages are created
function bsg_immediate_page_creation() {
    if (!current_user_can('manage_options')) {
        return;
    }
    
    // Check if location pages already exist
    $existing_locations = get_posts([
        'post_type' => 'page',
        'post_parent' => get_page_by_path('service-locations')->ID ?? 0,
        'numberposts' => 1
    ]);
    
    if (!empty($existing_locations)) {
        return; // Pages already exist
    }
    
    $settings = bsg_get_settings();
    $locations = $settings['locations'] ?? [];
    
    if (empty($locations)) {
        return; // No location data
    }
    
    error_log('BSG: Immediate page creation triggered');
    
    try {
        $created = [];
        
        // Create Service Areas parent page
        $locations_parent = get_page_by_path('service-locations');
        if (!$locations_parent) {
            $locations_parent_id = wp_insert_post([
                    'post_title' => 'Service Locations',
                    'post_name' => 'service-locations',
                    'post_content' => '<h2>Service Locations</h2><p>We serve multiple locations with professional services.</p>',
                'post_status' => 'publish',
                'post_type' => 'page'
            ]);
            if ($locations_parent_id && !is_wp_error($locations_parent_id)) {
                $created[] = 'Service Locations parent page';
                error_log('BSG: Created Service Areas parent page');
            }
        } else {
            $locations_parent_id = $locations_parent->ID;
        }
        
        // Create individual location pages
        foreach ($locations as $location) {
            if (empty($location['name']) || empty($location['slug'])) {
                continue;
            }
            
            $loc_name = $location['name'];
            $loc_slug = $location['slug'];
            
            // Check if page already exists
            $existing = get_posts([
                'name' => $loc_slug,
                'post_type' => 'page',
                'post_parent' => $locations_parent_id,
                'post_status' => 'publish',
                'numberposts' => 1
            ]);
            
            if (empty($existing)) {
                $location_id = wp_insert_post([
                    'post_title' => $loc_name,
                    'post_name' => $loc_slug,
                    'post_parent' => $locations_parent_id,
                    'post_content' => !empty($location['description']) ? $location['description'] : '',
                    'post_status' => 'publish',
                    'post_type' => 'page'
                ]);
                
                if ($location_id && !is_wp_error($location_id)) {
                    update_post_meta($location_id, '_wp_page_template', 'location.php');
                    $created[] = $loc_name . ' (' . $loc_slug . ')';
                    error_log('BSG: Created location page: ' . $loc_name . ' with slug: ' . $loc_slug);
                }
            }
        }
        
        if (!empty($created)) {
            flush_rewrite_rules();
            error_log('BSG: Immediate creation completed. Created: ' . implode(', ', $created));
        }
        
    } catch (Exception $e) {
        error_log('BSG Immediate Page Creation Error: ' . $e->getMessage());
    }
}
// Removed immediate page creation to prevent critical errors

// COMPREHENSIVE PAGE SYNC SYSTEM - Syncs WordPress pages with wizard data
function bsg_sync_pages_with_wizard_data() {
    if (!current_user_can('manage_options')) {
        return;
    }
    
    $settings = bsg_get_settings();
    $wizard_services = $settings['services'] ?? [];
    $wizard_locations = $settings['locations'] ?? [];
    
    error_log('BSG: Starting comprehensive page sync');
    
    try {
        // CREATE BASIC PAGES FIRST
        bsg_create_basic_pages();
        
        // SYNC SERVICES
        if (!empty($wizard_services)) {
            bsg_sync_service_pages($wizard_services);
        }
        
        // SYNC LOCATIONS
        if (!empty($wizard_locations)) {
            bsg_sync_location_pages($wizard_locations);
        }
        
        // Clean up orphaned pages (pages that exist in WordPress but not in wizard)
        bsg_cleanup_orphaned_pages($wizard_services, $wizard_locations);
        
        error_log('BSG: Page sync completed successfully');
        
    } catch (Exception $e) {
        error_log('BSG Page Sync Error: ' . $e->getMessage());
    }
}

// Function to manually trigger service page creation
function bsg_ensure_service_pages() {
    $settings = get_option('bsg_settings', []);
    $services = $settings['services'] ?? [];
    
    if (!empty($services)) {
        bsg_sync_service_pages($services);
        flush_rewrite_rules();
        error_log('BSG: Service pages created/updated');
    }
}

// Trigger service page creation on theme load
add_action('init', function() {
    if (current_user_can('manage_options') && isset($_GET['bsg_create_services'])) {
        bsg_ensure_service_pages();
        wp_redirect(remove_query_arg('bsg_create_services'));
        exit;
    }
});

// Sync service pages with wizard data
function bsg_sync_service_pages($wizard_services) {
    // Get or create Services parent page
    $services_parent = get_page_by_path('services');
    
    // Track created service names to prevent duplicates
    $created_services = [];
    if (!$services_parent) {
        $services_parent_id = wp_insert_post([
            'post_title' => 'Services',
            'post_name' => 'services',
            'post_content' => '<h2>Our Services</h2><p>Professional services tailored to your needs.</p>',
            'post_status' => 'publish',
            'post_type' => 'page'
        ]);
        if ($services_parent_id && !is_wp_error($services_parent_id)) {
            error_log('BSG: Created Services parent page');
        }
    } else {
        $services_parent_id = $services_parent->ID;
    }
    
    // Get existing service pages
    $existing_services = get_posts([
        'post_type' => 'page',
        'post_parent' => $services_parent_id,
        'post_status' => 'publish',
        'numberposts' => -1
    ]);
    
    $wizard_service_slugs = [];
    foreach ($wizard_services as $service) {
        if (!empty($service['name'])) {
            $wizard_service_slugs[] = !empty($service['slug']) ? $service['slug'] : sanitize_title($service['name']);
        }
    }
    $existing_service_slugs = array_column($existing_services, 'post_name');
    
    // Create missing service pages
    foreach ($wizard_services as $service) {
        if (empty($service['name'])) {
            continue;
        }
        
        // Generate slug from name if not provided
        $service_slug = !empty($service['slug']) ? $service['slug'] : sanitize_title($service['name']);
        
        // Check if we've already created this service in this run
        if (in_array($service['name'], $created_services)) {
            error_log('BSG: Skipping duplicate service: ' . $service['name']);
            continue;
        }
        
        if (!in_array($service_slug, $existing_service_slugs)) {
            $service_id = wp_insert_post([
                'post_title' => $service['name'],
                'post_name' => $service_slug,
                'post_parent' => $services_parent_id,
                'post_content' => !empty($service['content']) ? $service['content'] : '',
                'post_status' => 'publish',
                'post_type' => 'page'
            ]);
            
            if ($service_id && !is_wp_error($service_id)) {
                update_post_meta($service_id, '_wp_page_template', 'page-service.php');
                update_post_meta($service_id, '_bsg_service', true);
                
                // Store service data in page meta for easy access
                if (!empty($service['metaTitle'])) {
                    update_post_meta($service_id, 'meta_title', $service['metaTitle']);
                }
                if (!empty($service['metaDescription'])) {
                    update_post_meta($service_id, 'meta_description', $service['metaDescription']);
                }
                if (!empty($service['content'])) {
                    update_post_meta($service_id, 'service_content', $service['content']);
                }
                if (!empty($service['featuresText'])) {
                    update_post_meta($service_id, 'service_features', $service['featuresText']);
                }
                
                error_log('BSG: Created service page: ' . $service['name'] . ' (' . $service['slug'] . ') with meta data');
                $created_services[] = $service['name'];
            }
        } else {
            // Update existing service page with meta data
            $existing_page = get_page_by_path($service['slug']);
            if ($existing_page) {
                // Store service data in page meta for easy access
                if (!empty($service['metaTitle'])) {
                    update_post_meta($existing_page->ID, 'meta_title', $service['metaTitle']);
                }
                if (!empty($service['metaDescription'])) {
                    update_post_meta($existing_page->ID, 'meta_description', $service['metaDescription']);
                }
                if (!empty($service['content'])) {
                    update_post_meta($existing_page->ID, 'service_content', $service['content']);
                }
                if (!empty($service['featuresText'])) {
                    update_post_meta($existing_page->ID, 'service_features', $service['featuresText']);
                }
                
                error_log('BSG: Updated existing service page: ' . $service['name'] . ' (' . $service['slug'] . ') with meta data');
            }
        }
    }
    
    // Delete service pages that are no longer in wizard
    foreach ($existing_services as $existing_service) {
        if (!in_array($existing_service->post_name, $wizard_service_slugs)) {
            wp_delete_post($existing_service->ID, true);
            error_log('BSG: Deleted orphaned service page: ' . $existing_service->post_title);
        }
    }
}

// Sync location pages with wizard data
function bsg_sync_location_pages($wizard_locations) {
    // Get or create Service Locations parent page
    $locations_parent = get_page_by_path('service-locations');
    if (!$locations_parent) {
        $locations_parent_id = wp_insert_post([
            'post_title' => 'Service Locations',
            'post_name' => 'service-locations',
            'post_content' => '<h2>Service Locations</h2><p>We serve multiple locations with professional services.</p>',
            'post_status' => 'publish',
            'post_type' => 'page'
        ]);
        if ($locations_parent_id && !is_wp_error($locations_parent_id)) {
            error_log('BSG: Created Service Locations parent page');
        }
    } else {
        $locations_parent_id = $locations_parent->ID;
    }
    
    // Get existing location pages
    $existing_locations = get_posts([
        'post_type' => 'page',
        'post_parent' => $locations_parent_id,
        'post_status' => 'publish',
        'numberposts' => -1
    ]);
    
    $wizard_location_slugs = array_column($wizard_locations, 'slug');
    $existing_location_slugs = array_column($existing_locations, 'post_name');
    
    // Create missing location pages
    foreach ($wizard_locations as $location) {
        if (empty($location['name']) || empty($location['slug'])) {
            continue;
        }
        
        if (!in_array($location['slug'], $existing_location_slugs)) {
            $location_id = wp_insert_post([
                'post_title' => $location['name'],
                'post_name' => $location['slug'],
                'post_parent' => $locations_parent_id,
                'post_content' => !empty($location['description']) ? $location['description'] : '',
                'post_status' => 'publish',
                'post_type' => 'page'
            ]);
            
            if ($location_id && !is_wp_error($location_id)) {
                update_post_meta($location_id, '_wp_page_template', 'location.php');
                
                // Store location data in page meta for easy access
                if (!empty($location['metaTitle'])) {
                    update_post_meta($location_id, 'meta_title', $location['metaTitle']);
                }
                if (!empty($location['metaDescription'])) {
                    update_post_meta($location_id, 'meta_description', $location['metaDescription']);
                }
                if (!empty($location['description'])) {
                    update_post_meta($location_id, 'location_description', $location['description']);
                }
                
                error_log('BSG: Created location page: ' . $location['name'] . ' (' . $location['slug'] . ') with meta data');
            }
        } else {
            // Update existing location page with meta data
            $existing_page = get_page_by_path($location['slug']);
            if ($existing_page) {
                // Store location data in page meta for easy access
                if (!empty($location['metaTitle'])) {
                    update_post_meta($existing_page->ID, 'meta_title', $location['metaTitle']);
                }
                if (!empty($location['metaDescription'])) {
                    update_post_meta($existing_page->ID, 'meta_description', $location['metaDescription']);
                }
                if (!empty($location['description'])) {
                    update_post_meta($existing_page->ID, 'location_description', $location['description']);
                }
                
                error_log('BSG: Updated existing location page: ' . $location['name'] . ' (' . $location['slug'] . ') with meta data');
            }
        }
    }
    
    // Delete location pages that are no longer in wizard
    foreach ($existing_locations as $existing_location) {
        if (!in_array($existing_location->post_name, $wizard_location_slugs)) {
            wp_delete_post($existing_location->ID, true);
            error_log('BSG: Deleted orphaned location page: ' . $existing_location->post_title);
        }
    }
}

// Clean up orphaned pages
function bsg_cleanup_orphaned_pages($wizard_services, $wizard_locations) {
    // This function can be expanded to clean up other orphaned pages
    // For now, the individual sync functions handle their own cleanup
    error_log('BSG: Orphaned pages cleanup completed');
}

// Create basic pages (Home, About, Contact) if they don't exist
function bsg_create_basic_pages() {
    if (!current_user_can('manage_options')) {
        return;
    }
    
    // Create Home page
    $home_page = get_page_by_path('home');
    if (!$home_page) {
        $home_id = wp_insert_post([
            'post_title' => 'Home',
            'post_name' => 'home',
            'post_content' => '',
            'post_status' => 'publish',
            'post_type' => 'page'
        ]);
        if ($home_id && !is_wp_error($home_id)) {
            update_option('show_on_front', 'page');
            update_option('page_on_front', $home_id);
            error_log('BSG: Created Home page');
        }
    }
    
    // Create About Us page
    $about_page = get_page_by_path('about-us');
    if (!$about_page) {
        $about_id = wp_insert_post([
            'post_title' => 'About Us',
            'post_name' => 'about-us',
            'post_content' => '<h2>About Us</h2><p>Learn more about our company and services.</p>',
            'post_status' => 'publish',
            'post_type' => 'page'
        ]);
        if ($about_id && !is_wp_error($about_id)) {
            error_log('BSG: Created About Us page');
        }
    }
    
    // Create Contact Us page
    $contact_page = get_page_by_path('contact-us');
    if (!$contact_page) {
        $contact_id = wp_insert_post([
            'post_title' => 'Contact Us',
            'post_name' => 'contact-us',
            'post_content' => '<h2>Contact Us</h2><p>Get in touch with us for your service needs.</p>',
            'post_status' => 'publish',
            'post_type' => 'page'
        ]);
        if ($contact_id && !is_wp_error($contact_id)) {
            error_log('BSG: Created Contact Us page');
        }
    }
}

// Hook the sync function to run on theme activation only
add_action('after_switch_theme', 'bsg_sync_pages_with_wizard_data');

// Theme activation hook - create all pages automatically
function bsg_theme_activation() {
    error_log('BSG: Theme activated - creating all pages');
    bsg_sync_pages_with_wizard_data();
}
add_action('after_switch_theme', 'bsg_theme_activation');

// Theme deactivation hook - delete all BSG pages
function bsg_theme_deactivation() {
    if (!current_user_can('manage_options')) {
        return;
    }
    
    error_log('BSG: Theme deactivated - deleting all BSG pages');
    
    // Get all pages created by BSG theme
    $bsg_pages = get_posts([
        'post_type' => 'page',
        'post_status' => 'publish',
        'numberposts' => -1,
        'meta_query' => [
            'relation' => 'OR',
            [
                'key' => '_bsg_service',
                'value' => true
            ],
            [
                'key' => '_bsg_location',
                'value' => true
            ]
        ]
    ]);
    
    // Also get pages by slug patterns
    $slug_patterns = ['home', 'about-us', 'contact-us', 'services', 'service-locations'];
    foreach ($slug_patterns as $slug) {
        $page = get_page_by_path($slug);
        if ($page) {
            $bsg_pages[] = $page;
        }
    }
    
    // Delete all BSG pages
    foreach ($bsg_pages as $page) {
        wp_delete_post($page->ID, true);
        error_log('BSG: Deleted page: ' . $page->post_title);
    }
    
    // Reset WordPress to use default homepage
    update_option('show_on_front', 'posts');
    delete_option('page_on_front');
    
    error_log('BSG: Theme deactivation completed - all pages deleted');
}
add_action('switch_theme', 'bsg_theme_deactivation');

// Create and update navigation menu with location pages
function bsg_create_navigation_menu() {
    if (!current_user_can('manage_options')) {
        return;
    }
    
    $settings = bsg_get_settings();
    $wizard_locations = $settings['locations'] ?? [];
    
    if (empty($wizard_locations)) {
        return;
    }
    
    // Get or create main menu
    $menu_name = 'Main Menu';
    $menu = wp_get_nav_menu_object($menu_name);
    
    if (!$menu) {
        $menu_id = wp_create_nav_menu($menu_name);
        if (is_wp_error($menu_id)) {
            error_log('BSG: Failed to create menu: ' . $menu_id->get_error_message());
            return;
        }
        error_log('BSG: Created main menu');
    } else {
        $menu_id = $menu->term_id;
    }
    
    // Clear existing menu items
    $existing_items = wp_get_nav_menu_items($menu_id);
    if ($existing_items) {
        foreach ($existing_items as $item) {
            wp_delete_post($item->ID, true);
        }
    }
    
    // Add Home page
    $home_page = get_page_by_path('home');
    if ($home_page) {
        wp_update_nav_menu_item($menu_id, 0, [
            'menu-item-title' => 'Home',
            'menu-item-object' => 'page',
            'menu-item-object-id' => $home_page->ID,
            'menu-item-type' => 'post_type',
            'menu-item-status' => 'publish'
        ]);
    }
    
    // Add About Us page
    $about_page = get_page_by_path('about-us');
    if ($about_page) {
        wp_update_nav_menu_item($menu_id, 0, [
            'menu-item-title' => 'About Us',
            'menu-item-object' => 'page',
            'menu-item-object-id' => $about_page->ID,
            'menu-item-type' => 'post_type',
            'menu-item-status' => 'publish'
        ]);
    }
    
    // Add Services page with dropdown
    $services_page = get_page_by_path('services');
    if ($services_page) {
        $services_menu_id = wp_update_nav_menu_item($menu_id, 0, [
            'menu-item-title' => 'Services',
            'menu-item-object' => 'page',
            'menu-item-object-id' => $services_page->ID,
            'menu-item-type' => 'post_type',
            'menu-item-status' => 'publish'
        ]);
        
        // Add service pages as children
        $service_pages = get_posts([
            'post_type' => 'page',
            'post_parent' => $services_page->ID,
            'post_status' => 'publish',
            'numberposts' => -1
        ]);
        
        foreach ($service_pages as $service_page) {
            wp_update_nav_menu_item($menu_id, 0, [
                'menu-item-title' => $service_page->post_title,
                'menu-item-object' => 'page',
                'menu-item-object-id' => $service_page->ID,
                'menu-item-type' => 'post_type',
                'menu-item-parent-id' => $services_menu_id,
                'menu-item-status' => 'publish'
            ]);
        }
    }
    
    // Add Service Locations page with dropdown
    $locations_page = get_page_by_path('service-locations');
    if ($locations_page) {
        $locations_menu_id = wp_update_nav_menu_item($menu_id, 0, [
            'menu-item-title' => 'Service Locations',
            'menu-item-object' => 'page',
            'menu-item-object-id' => $locations_page->ID,
            'menu-item-type' => 'post_type',
            'menu-item-status' => 'publish'
        ]);
        
        // Add location pages as children
        $location_pages = get_posts([
            'post_type' => 'page',
            'post_parent' => $locations_page->ID,
            'post_status' => 'publish',
            'numberposts' => -1
        ]);
        
        foreach ($location_pages as $location_page) {
            wp_update_nav_menu_item($menu_id, 0, [
                'menu-item-title' => $location_page->post_title,
                'menu-item-object' => 'page',
                'menu-item-object-id' => $location_page->ID,
                'menu-item-type' => 'post_type',
                'menu-item-parent-id' => $locations_menu_id,
                'menu-item-status' => 'publish'
            ]);
        }
    }
    
    // Add Contact Us page
    $contact_page = get_page_by_path('contact-us');
    if ($contact_page) {
        wp_update_nav_menu_item($menu_id, 0, [
            'menu-item-title' => 'Contact Us',
            'menu-item-object' => 'page',
            'menu-item-object-id' => $contact_page->ID,
            'menu-item-type' => 'post_type',
            'menu-item-status' => 'publish'
        ]);
    }
    
    // Set menu location
    $locations = get_theme_mod('nav_menu_locations');
    if (!$locations) {
        $locations = [];
    }
    $locations['primary'] = $menu_id;
    set_theme_mod('nav_menu_locations', $locations);
    
    error_log('BSG: Navigation menu created/updated with ' . count($wizard_locations) . ' location pages');
}

// Hook menu creation
add_action('after_switch_theme', 'bsg_create_navigation_menu');
add_action('init', 'bsg_create_navigation_menu');

// Ensure location pages are created and accessible
function bsg_ensure_location_pages() {
    $settings = bsg_get_settings();
    $locations = $settings['locations'] ?? [];
    
    if (empty($locations)) {
        return;
    }
    
    // Get or create service-locations parent page
    $locations_parent = get_page_by_path('service-locations');
    if (!$locations_parent) {
        $locations_parent_id = wp_insert_post([
            'post_title' => 'Service Locations',
            'post_name' => 'service-locations',
            'post_content' => 'Our service locations across different areas.',
            'post_status' => 'publish',
            'post_type' => 'page'
        ]);
        if (is_wp_error($locations_parent_id)) {
            error_log('BSG: Failed to create service-locations parent page');
            return;
        }
    } else {
        $locations_parent_id = $locations_parent->ID;
    }
    
        // Create individual location pages
        foreach ($locations as $location) {
            if (empty($location['name']) || empty($location['slug'])) {
                continue;
            }
            
            $loc_name = $location['name'];
            $loc_slug = $location['slug'];
            
            // Check if location page already exists as child of service-locations
            $existing = get_posts([
                'name' => $loc_slug,
                'post_type' => 'page',
                'post_parent' => $locations_parent_id,
                'post_status' => 'publish',
                'numberposts' => 1
            ]);
            
            if (empty($existing)) {
                $location_id = wp_insert_post([
                    'post_title' => $loc_name,
                    'post_name' => $loc_slug,
                    'post_parent' => $locations_parent_id,
                    'post_content' => !empty($location['description']) ? $location['description'] : '',
                    'post_status' => 'publish',
                    'post_type' => 'page'
                ]);
                
                if ($location_id && !is_wp_error($location_id)) {
                    // Assign location template
                    update_post_meta($location_id, '_wp_page_template', 'location.php');
                    error_log('BSG: Created location page: ' . $loc_name . ' with slug: ' . $loc_slug . ' under service-locations');
                }
            } else {
                // Update existing page to use location template
                $existing_page = $existing[0];
                update_post_meta($existing_page->ID, '_wp_page_template', 'location.php');
                if ($existing_page->post_parent != $locations_parent_id) {
                    wp_update_post([
                        'ID' => $existing_page->ID,
                        'post_parent' => $locations_parent_id
                    ]);
                }
            }
        }
    
    // Flush rewrite rules
    flush_rewrite_rules();
}

// Hook to ensure location pages are created
add_action('init', 'bsg_ensure_location_pages');

// Manual trigger for location page creation (for testing)
function bsg_trigger_location_creation() {
    if (isset($_GET['bsg_create_locations']) && current_user_can('manage_options')) {
        bsg_ensure_location_pages();
        echo '<div class="notice notice-success"><p><strong>Location pages created/updated successfully!</strong></p></div>';
    }
}
add_action('admin_notices', 'bsg_trigger_location_creation');

// Manual sync trigger - accessible via URL parameter
function bsg_manual_sync_trigger() {
    if (!current_user_can('manage_options')) {
        return;
    }
    
    if (isset($_GET['bsg_sync_pages']) && $_GET['bsg_sync_pages'] === '1') {
        error_log('BSG: Manual sync triggered');
        bsg_sync_pages_with_wizard_data();
        wp_redirect(admin_url('edit.php?post_type=page&bsg_sync_completed=1'));
        exit;
    }
}
add_action('admin_init', 'bsg_manual_sync_trigger');

// Cleanup function to remove incorrect pages
function bsg_cleanup_incorrect_pages() {
    if (!current_user_can('manage_options')) {
        return;
    }
    
    try {
        // Find and delete incorrect pages
        $all_pages = get_posts([
            'post_type' => 'page',
            'post_status' => 'publish',
            'numberposts' => -1
        ]);
        
        $deleted = [];
        $location_names = ['Boston', 'Boulder', 'Lompoc', 'Miami', 'Newyork', 'orlando', 'Portland', 'saint Maria', 'Tampa'];
        $service_names = ['Roof Installation', 'Roof Repair'];
        
        foreach ($all_pages as $page) {
            $title = $page->post_title;
            $slug = $page->post_name;
            $parent = wp_get_post_parent_id($page->ID);
            
            // Delete pages that are just location names (not under locations parent)
            if (in_array($title, $location_names)) {
                if (!$parent) { // Only delete if not a child page
                    wp_delete_post($page->ID, true);
                    $deleted[] = $title . ' (standalone)';
                }
            }
            
            // Delete standalone service pages (not under services parent)
            if (in_array($title, $service_names)) {
                if (!$parent) { // Only delete if not a child page
                    wp_delete_post($page->ID, true);
                    $deleted[] = $title . ' (standalone)';
                }
            }
            
            // Delete pages that end with "Services" and are not the main Services page
            if (strpos($title, 'Services') !== false && $title !== 'Services' && $title !== 'Service Areas') {
                foreach ($location_names as $location) {
                    if ($title === $location . ' Services') {
                        wp_delete_post($page->ID, true);
                        $deleted[] = $title;
                        break;
                    }
                }
            }
        }
        
        if (!empty($deleted)) {
            error_log('BSG: Cleaned up incorrect pages: ' . implode(', ', $deleted));
        }
        
    } catch (Exception $e) {
        error_log('BSG Cleanup Error: ' . $e->getMessage());
    }
}
add_action('init', 'bsg_cleanup_incorrect_pages');

// Manual page creation trigger - accessible via URL parameter
function bsg_manual_create_location_pages() {
    if (!current_user_can('manage_options')) {
        return;
    }

    // Check if manual creation is requested
    if (!isset($_GET['bsg_create_location_pages']) || $_GET['bsg_create_location_pages'] !== '1') {
        return;
    }

    try {
        $settings = bsg_get_settings();
        $locations = $settings['locations'] ?? [];
        $created = [];
        $updated = [];

        if (!empty($locations) && is_array($locations)) {
            // Create or get Service Locations parent page
            $locations_parent = get_page_by_path('service-locations');
            if (!$locations_parent) {
                $locations_parent_id = wp_insert_post([
                    'post_title' => 'Service Locations',
                    'post_name' => 'service-locations',
                    'post_content' => '<h2>Service Locations</h2><p>We serve multiple locations with professional services.</p>',
                    'post_status' => 'publish',
                    'post_type' => 'page'
                ]);
            } else {
                $locations_parent_id = $locations_parent->ID;
            }

            // First, clean up existing location pages without ZIP codes
            $existing_location_pages = get_pages([
                'post_parent' => $locations_parent_id,
                'post_status' => 'publish',
                'number' => 100
            ]);

            foreach ($existing_location_pages as $existing_page) {
                // Check if this page name matches any location in our data
                $page_name = $existing_page->post_title;
                $found_match = false;
                
                foreach ($locations as $location) {
                    if ($location['name'] === $page_name) {
                        $found_match = true;
                        break;
                    }
                }
                
                // If no match found or if the slug doesn't have ZIP code, delete it
                if (!$found_match || strpos($existing_page->post_name, '-') === false) {
                    wp_delete_post($existing_page->ID, true);
                    error_log('BSG: Deleted old location page: ' . $page_name);
                }
            }

            // Create individual location pages with proper slugs
            foreach ($locations as $location) {
                // Skip if no name or slug
                if (empty($location['name']) || empty($location['slug'])) { 
                    error_log('BSG: Skipping location - missing name or slug: ' . json_encode($location));
                    continue; 
                }
                
                $loc_name = $location['name'];
                $loc_slug = $location['slug']; // Use the slug from wizard data
                
                // Check if location page already exists with correct slug
                $existing = get_posts([
                    'name' => $loc_slug,
                    'post_type' => 'page',
                    'post_parent' => $locations_parent_id,
                    'post_status' => 'publish',
                    'numberposts' => 1
                ]);
                
                if (empty($existing)) {
                    $location_id = wp_insert_post([
                        'post_title' => $loc_name,
                        'post_name' => $loc_slug,
                        'post_parent' => $locations_parent_id,
                        'post_content' => !empty($location['description']) ? $location['description'] : '',
                        'post_status' => 'publish',
                        'post_type' => 'page'
                    ]);
                    if ($location_id && !is_wp_error($location_id)) {
                        // Assign location template
                        update_post_meta($location_id, '_wp_page_template', 'location.php');
                        $created[] = $loc_name . ' (' . $loc_slug . ')';
                        error_log('BSG: Created location page: ' . $loc_name . ' with slug: ' . $loc_slug);
                    }
                } else {
                    $updated[] = $loc_name . ' (' . $loc_slug . ') - already exists';
                }
            }
        }

        // Flush rewrite rules to ensure new URLs work
        flush_rewrite_rules();

        // Redirect with success message
        $redirect_url = admin_url('edit.php?post_type=page');
        $messages = [];
        if (!empty($created)) $messages[] = 'Created: ' . implode(', ', $created);
        if (!empty($updated)) $messages[] = 'Updated: ' . implode(', ', $updated);
        $message = !empty($messages) ? implode(' | ', $messages) : 'No location pages processed';
        wp_redirect(add_query_arg(['bsg_location_created' => urlencode($message)], $redirect_url));
        exit;

    } catch (Exception $e) {
        error_log('BSG Manual Location Page Creation Error: ' . $e->getMessage());
        wp_redirect(add_query_arg(['bsg_location_error' => urlencode($e->getMessage())], admin_url('edit.php?post_type=page')));
        exit;
    }
}
add_action('admin_init', 'bsg_manual_create_location_pages');

// Immediate cleanup function to remove specific problematic pages
function bsg_immediate_cleanup() {
    if (!current_user_can('manage_options')) {
        return;
    }

    try {
        // Find and delete specific problematic pages
        $problematic_titles = ['Roof repair', 'Service Areas'];

        foreach ($problematic_titles as $title) {
            $pages = get_posts([
                'post_type' => 'page',
                'post_status' => 'publish',
                'title' => $title,
                'numberposts' => -1
            ]);

            foreach ($pages as $page) {
                $parent = wp_get_post_parent_id($page->ID);
                // Only delete if it's not a child page (standalone)
                if (!$parent) {
                    wp_delete_post($page->ID, true);
                    error_log('BSG: Deleted standalone page: ' . $title);
                }
            }
        }

    } catch (Exception $e) {
        error_log('BSG Immediate Cleanup Error: ' . $e->getMessage());
    }
}
add_action('wp_loaded', 'bsg_immediate_cleanup');

// Create menu after pages are created
// Temporarily disabled to prevent critical errors
// add_action('after_switch_theme', 'bsg_create_primary_menu', 20);
// add_action('init', 'bsg_create_primary_menu', 20);

// Add admin menu for page creation - temporarily disabled
// function bsg_add_admin_menu() {
//     add_theme_page(
//         'BSG Page Creator',
//         'Create Pages',
//         'manage_options',
//         'bsg-page-creator',
//         'bsg_page_creator_page'
//     );
// }
// add_action('admin_menu', 'bsg_add_admin_menu');

// Add admin menu for contact messages
function bsg_add_contact_messages_menu() {
    add_theme_page(
        'Contact Messages',
        'Contact Messages',
        'manage_options',
        'bsg-contact-messages',
        'bsg_contact_messages_page'
    );
}
add_action('admin_menu', 'bsg_add_contact_messages_menu');

// Admin page for contact messages
function bsg_contact_messages_page() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'bsg_contact_messages';
    
    // Handle status updates
    if (isset($_POST['update_status']) && wp_verify_nonce($_POST['nonce'], 'bsg_update_message_status')) {
        $message_id = intval($_POST['message_id']);
        $new_status = sanitize_text_field($_POST['status']);
        $admin_notes = sanitize_textarea_field($_POST['admin_notes']);
        
        $wpdb->update(
            $table_name,
            array('status' => $new_status, 'admin_notes' => $admin_notes),
            array('id' => $message_id),
            array('%s', '%s'),
            array('%d')
        );
        
        echo '<div class="notice notice-success"><p>Message status updated successfully!</p></div>';
    }
    
    // Get messages
    $messages = $wpdb->get_results("SELECT * FROM $table_name ORDER BY submitted_at DESC");
    
    ?>
    <div class="wrap">
        <h1>Contact Messages</h1>
        
        <?php if (empty($messages)): ?>
            <p>No contact messages found.</p>
        <?php else: ?>
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($messages as $message): ?>
                        <tr>
                            <td><?php echo $message->id; ?></td>
                            <td><?php echo esc_html($message->name); ?></td>
                            <td><a href="mailto:<?php echo esc_attr($message->email); ?>"><?php echo esc_html($message->email); ?></a></td>
                            <td><?php echo esc_html($message->subject); ?></td>
                            <td><?php echo esc_html(wp_trim_words($message->message, 20)); ?></td>
                            <td>
                                <span class="status-<?php echo esc_attr($message->status); ?>">
                                    <?php echo esc_html(ucfirst($message->status)); ?>
                                </span>
                            </td>
                            <td><?php echo esc_html(date('M j, Y g:i A', strtotime($message->submitted_at))); ?></td>
                            <td>
                                <button type="button" class="button" onclick="toggleMessageDetails(<?php echo $message->id; ?>)">
                                    View Details
                                </button>
                            </td>
                        </tr>
                        <tr id="details-<?php echo $message->id; ?>" style="display: none;">
                            <td colspan="8">
                                <div style="background: #f9f9f9; padding: 20px; margin: 10px 0;">
                                    <h3>Full Message</h3>
                                    <p><strong>Name:</strong> <?php echo esc_html($message->name); ?></p>
                                    <p><strong>Email:</strong> <a href="mailto:<?php echo esc_attr($message->email); ?>"><?php echo esc_html($message->email); ?></a></p>
                                    <p><strong>Subject:</strong> <?php echo esc_html($message->subject); ?></p>
                                    <p><strong>Message:</strong></p>
                                    <div style="background: white; padding: 15px; border: 1px solid #ddd; margin: 10px 0;">
                                        <?php echo nl2br(esc_html($message->message)); ?>
                                    </div>
                                    <p><strong>IP Address:</strong> <?php echo esc_html($message->ip_address); ?></p>
                                    <p><strong>Submitted:</strong> <?php echo esc_html(date('F j, Y \a\t g:i A', strtotime($message->submitted_at))); ?></p>
                                    
                                    <form method="post" style="margin-top: 20px;">
                                        <?php wp_nonce_field('bsg_update_message_status', 'nonce'); ?>
                                        <input type="hidden" name="message_id" value="<?php echo $message->id; ?>">
                                        
                                        <p>
                                            <label><strong>Status:</strong></label><br>
                                            <select name="status">
                                                <option value="new" <?php selected($message->status, 'new'); ?>>New</option>
                                                <option value="read" <?php selected($message->status, 'read'); ?>>Read</option>
                                                <option value="replied" <?php selected($message->status, 'replied'); ?>>Replied</option>
                                                <option value="closed" <?php selected($message->status, 'closed'); ?>>Closed</option>
                                            </select>
                                        </p>
                                        
                                        <p>
                                            <label><strong>Admin Notes:</strong></label><br>
                                            <textarea name="admin_notes" rows="3" cols="50" placeholder="Add notes about this message..."><?php echo esc_textarea($message->admin_notes); ?></textarea>
                                        </p>
                                        
                                        <p>
                                            <input type="submit" name="update_status" class="button button-primary" value="Update Status">
                                        </p>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            
            <script>
            function toggleMessageDetails(messageId) {
                const detailsRow = document.getElementById('details-' + messageId);
                if (detailsRow.style.display === 'none') {
                    detailsRow.style.display = 'table-row';
                } else {
                    detailsRow.style.display = 'none';
                }
            }
            </script>
            
            <style>
            .status-new { color: #d63638; font-weight: bold; }
            .status-read { color: #dba617; font-weight: bold; }
            .status-replied { color: #00a32a; font-weight: bold; }
            .status-closed { color: #50575e; font-weight: bold; }
            </style>
        <?php endif; ?>
    </div>
    <?php
}

// Admin page for page creation - temporarily disabled
// function bsg_page_creator_page() {
//     if (isset($_POST['create_pages'])) {
//         bsg_safe_create_pages();
//         return;
//     }
//     
//     $settings = bsg_get_settings();
//     $services = $settings['services'] ?? [];
//     $locations = $settings['locations'] ?? [];
//     
//     echo '<div class="wrap">';
//     echo '<h1>BSG Page Creator</h1>';
//     echo '<p>This will create WordPress pages based on your wizard data.</p>';
//     
//     echo '<h2>Pages to be created:</h2>';
//     echo '<ul>';
//     echo '<li>✅ Home page (static front page)</li>';
//     echo '<li>✅ About Us page (/about-us/)</li>';
//     echo '<li>✅ Contact Us page (/contact-us/)</li>';
//     
//     if (!empty($services)) {
//         echo '<li>✅ Services parent page (/services/)</li>';
//         foreach ($services as $service) {
//             if (!empty($service['name'])) {
//                 echo '<li>✅ Service page: ' . esc_html($service['name']) . ' (/services/' . sanitize_title($service['name']) . '/)</li>';
//             }
//         }
//     } else {
//         echo '<li>❌ No services found in wizard data</li>';
//     }
//     
//     if (!empty($locations)) {
//         echo '<li>✅ Service Areas parent page (/locations/)</li>';
//         foreach ($locations as $location) {
//             if (!empty($location['name'])) {
//                 $zip = $location['zip'] ?? $location['zip_code'] ?? '';
//                 $slug = sanitize_title($location['name']) . (!empty($zip) ? '-' . $zip : '');
//                 echo '<li>✅ Location page: ' . esc_html($location['name']) . ' (/locations/' . $slug . '/)</li>';
//             }
//         }
//     } else {
//         echo '<li>❌ No locations found in wizard data</li>';
//     }
//     
//     echo '</ul>';
//     
//     echo '<form method="post">';
//     echo '<p class="submit">';
//     echo '<input type="submit" name="create_pages" class="button-primary" value="Create All Pages" onclick="return confirm(\'This will create WordPress pages. Continue?\');">';
//     echo '</p>';
//     echo '</form>';
//     
//     echo '</div>';
// }

// Safe manual page creation - only runs when explicitly called
function bsg_safe_create_pages() {
    if (!current_user_can('manage_options')) {
        return;
    }
    
    try {
        $settings = bsg_get_settings();
        $created_pages = [];
        $errors = [];
        
        // Create Home page if it doesn't exist
        $home_page = get_page_by_path('home');
        if (!$home_page) {
            $home_id = wp_insert_post([
                'post_title' => 'Home',
                'post_name' => 'home',
                'post_content' => '',
                'post_status' => 'publish',
                'post_type' => 'page',
            ]);
            if ($home_id && !is_wp_error($home_id)) {
                $created_pages[] = 'Home page';
                // Set as static front page
                update_option('show_on_front', 'page');
                update_option('page_on_front', $home_id);
            }
        }
        
        // Create About Us page
        $about_page = get_page_by_path('about-us');
        if (!$about_page) {
            $about_content = !empty($settings['about_description']) ? $settings['about_description'] : 
                '<h2>About ' . ($settings['business_name'] ?? 'Our Company') . '</h2>
                <p>We are a professional ' . ($settings['business_type'] ?? 'service') . ' company serving ' . ($settings['location'] ?? 'your area') . ' and surrounding areas.</p>
                <p>With ' . ($settings['about_years'] ?? 15) . '+ years of experience, we are committed to delivering high-quality services that exceed our customers\' expectations.</p>';
            
            $about_id = wp_insert_post([
                'post_title' => 'About Us',
                'post_name' => 'about-us',
                'post_content' => $about_content,
                'post_status' => 'publish',
                'post_type' => 'page',
                'page_template' => 'page-about.php'
            ]);
            if ($about_id && !is_wp_error($about_id)) {
                $created_pages[] = 'About Us page';
            }
        }

        // Create Contact Us page
        $contact_page = get_page_by_path('contact-us');
        if (!$contact_page) {
            $contact_content = '<h2>Contact ' . ($settings['business_name'] ?? 'Us') . '</h2>
                <p>Get in touch for professional ' . ($settings['business_type'] ?? 'service') . ' services.</p>
                <p><strong>Phone:</strong> ' . ($settings['phone'] ?? '') . '</p>
                <p><strong>Email:</strong> ' . ($settings['email'] ?? '') . '</p>
                <p><strong>Service Area:</strong> ' . ($settings['location'] ?? '') . ' and surrounding areas</p>';
            
            $contact_id = wp_insert_post([
                'post_title' => 'Contact Us',
                'post_name' => 'contact-us',
                'post_content' => $contact_content,
                'post_status' => 'publish',
                'post_type' => 'page',
                'page_template' => 'page-contact-us.php'
            ]);
            if ($contact_id && !is_wp_error($contact_id)) {
                $created_pages[] = 'Contact Us page';
            }
        }
        
        // Create Services parent page and service pages ONLY if services data exists
        $services = $settings['services'] ?? [];
        if (is_array($services) && !empty($services)) {
            $services_parent = get_page_by_path('services');
            if (!$services_parent) {
                $services_parent_id = wp_insert_post([
                    'post_title' => 'Services',
                    'post_name' => 'services',
                    'post_content' => '<h2>Our Services</h2><p>Professional services tailored to your needs.</p>',
                    'post_status' => 'publish',
                    'post_type' => 'page'
                ]);
                if ($services_parent_id && !is_wp_error($services_parent_id)) {
                    $created_pages[] = 'Services parent page';
                }
            } else {
                $services_parent_id = $services_parent->ID;
            }
            
            // Service pages are now handled by bsg_sync_service_pages() function
        }
        
        // Create Locations parent page and location pages ONLY if locations data exists
        $locations = $settings['locations'] ?? [];
        error_log('BSG: Processing locations for page creation: ' . count($locations));
        if (is_array($locations) && !empty($locations)) {
            $locations_parent = get_page_by_path('locations');
            if (!$locations_parent) {
                $locations_parent_id = wp_insert_post([
                    'post_title' => 'Service Locations',
                    'post_name' => 'locations',
                    'post_content' => '<h2>Service Locations</h2><p>We serve multiple locations with professional services.</p>',
                    'post_status' => 'publish',
                    'post_type' => 'page'
                ]);
                if ($locations_parent_id && !is_wp_error($locations_parent_id)) {
                    $created_pages[] = 'Service Areas parent page';
                }
            } else {
                $locations_parent_id = $locations_parent->ID;
            }
            
            // Create individual location pages
            foreach ($locations as $location) {
                if (empty($location['name'])) { continue; }
                $loc_name = $location['name'];
                $zip = $location['zip'] ?? $location['zip_code'] ?? '';
                $loc_slug = sanitize_title($loc_name) . (!empty($zip) ? '-' . $zip : '');
                
                // Check if location page already exists as child of locations
                $existing = get_posts([
                    'name' => $loc_slug,
                    'post_type' => 'page',
                    'post_parent' => $locations_parent_id,
                    'post_status' => 'publish',
                    'numberposts' => 1
                ]);
                
                if (empty($existing)) {
                    $location_id = wp_insert_post([
                        'post_title' => $loc_name,
                        'post_name' => $loc_slug,
                        'post_parent' => $locations_parent_id,
                        'post_content' => !empty($location['description']) ? $location['description'] : '',
                        'post_status' => 'publish',
                        'post_type' => 'page'
                    ]);
                    if ($location_id && !is_wp_error($location_id)) {
                        // Assign location template
                        update_post_meta($location_id, '_wp_page_template', 'location.php');
                        $created_pages[] = 'Location page: ' . $loc_name;
                    }
                }
            }
        }
        
        // Create primary menu
        bsg_create_primary_menu();
        
        // Show success message
        echo '<div class="notice notice-success"><p><strong>Success!</strong> Pages created: ' . implode(', ', $created_pages) . '</p></div>';
        return;
        
    } catch (Exception $e) {
        error_log('BSG Safe Page Creation Error: ' . $e->getMessage());
        echo '<div class="notice notice-error"><p><strong>Error!</strong> ' . esc_html($e->getMessage()) . '</p></div>';
        return;
    }
}

/**
 * Get hero section settings
 */
function bsg_get_hero_settings() {
    $settings = bsg_get_settings();
    $business = bsg_get_business_info();
    $colors = bsg_get_color_scheme();
    
    return [
        'visible' => $settings['hero_visible'] ?? true,
        'headline' => $settings['hero_headline'] ?? 'Find Roofers Near You',
        'description' => $settings['hero_description'] ?? '',
        'cta' => $settings['hero_cta'] ?? 'Rated 5 Stars On Google',
        'cta_link' => $settings['hero_cta_link'] ?? '#contact',
        'rating' => $settings['hero_rating'] ?? 'Rated 5 Stars On Google',
        'bg_image' => $settings['hero_bg_image'] ?? '',
        'bg_color' => $colors['hero_bg'],
        'padding' => $settings['hero_padding'] ?? 90,
        'book_btn_link' => $settings['hero_book_btn_link'] ?? '#',
        'call_btn_link' => $settings['hero_call_btn_link'] ?? 'tel:' . $business['phone'],
        'colors' => $colors,
    ];
}

/**
 * Get services section settings
 */
function bsg_get_services_settings() {
    $settings = bsg_get_settings();
    return [
        'visible' => $settings['services_visible'] ?? true,
        'label' => $settings['services_label'] ?? 'TOP RATED ROOFING SERVICES',
        'title' => $settings['services_title'] ?? 'Our Services',
        'subtitle' => $settings['services_subtitle'] ?? 'Professional solutions for all your needs',
        'cta_text' => $settings['services_cta_text'] ?? 'Get A Free Estimate',
        'cta_link' => $settings['services_cta_link'] ?? '#',
        'cta_bg' => $settings['services_cta_bg'] ?? '#2ee6c5',
        'cta_text_color' => $settings['services_cta_text_color'] ?? '#232834',
        'bg_color' => $settings['services_bg_color'] ?? '#313746',
        'card_color' => $settings['services_card_color'] ?? '#232834',
        'text_color' => $settings['services_text_color'] ?? '#ffffff',
        'icon_color' => $settings['services_icon_color'] ?? '#2ee6c5',
        'card_radius' => $settings['services_card_radius'] ?? 12,
        'button_text' => $settings['services_button_text'] ?? '#2ee6c5',
        'progress_color' => $settings['services_progress_color'] ?? '#2ee6c5',
        'padding' => $settings['services_padding'] ?? 80,
        'services' => $settings['services'] ?? [],
    ];
}

/**
 * Get about section settings
 */
function bsg_get_about_settings() {
    $settings = bsg_get_settings();
    $business = bsg_get_business_info();
    
    return [
        'visible' => $settings['about_visible'] ?? true,
        'label' => $settings['about_label'] ?? 'ABOUT US',
        'title' => $settings['about_title'] ?? 'Your Trusted Roofing Partner',
        'description' => $settings['about_description'] ?? '',
        'image' => $settings['about_image'] ?? '',
        'bg_color' => $settings['about_bg_color'] ?? '#f8f9fa',
        'text_color' => $settings['about_text_color'] ?? '#23282d',
        'padding' => $settings['about_padding'] ?? 80,
        'projects' => $settings['about_projects'] ?? '500+',
        'customers' => $settings['about_customers'] ?? '1000+',
        'team' => $settings['about_team'] ?? '25+',
        'tagline' => $settings['about_tagline'] ?? 'WHO WE ARE',
        'tagline_color' => $settings['about_tagline_color'] ?? '#0ea5e9',
        'heading' => $settings['about_heading'] ?? 'About Our Company',
        'heading_color' => $settings['about_heading_color'] ?? '#000000',
        'description_color' => $settings['about_description_color'] ?? '#6b7280',
        'experience_text' => $settings['about_experience_text'] ?? 'Years of Experience',
        'experience_bg' => $settings['about_experience_bg'] ?? '#374151',
        'experience_text_color' => $settings['about_experience_text_color'] ?? '#0ea5e9',
        'button_text' => $settings['about_button_text'] ?? 'About Us',
        'button_color' => $settings['about_button_color'] ?? '#0ea5e9',
        'button_text_color' => $settings['about_button_text_color'] ?? '#374151',
        'button_link' => $settings['about_button_link'] ?? 'about-us',
        'years' => $settings['about_years'] ?? '15+',
    ];
}

/**
 * Get reviews section settings
 */
function bsg_get_reviews_settings() {
    $settings = bsg_get_settings();
    return [
        'visible' => $settings['reviews_visible'] ?? true,
        'label' => $settings['reviews_label'] ?? 'CUSTOMER REVIEWS',
        'title' => $settings['reviews_title'] ?? 'What Our Customers Say',
        'bg_color' => $settings['reviews_bg_color'] ?? '#f8f9fa',
        'card_bg' => $settings['reviews_card_bg'] ?? '#ffffff',
        'star_color' => $settings['reviews_star_color'] ?? '#fbbf24',
        'padding' => $settings['reviews_padding'] ?? 80,
        'reviews' => $settings['reviews'] ?? [],
        'write_link' => $settings['reviews_write_link'] ?? '',
        'tagline_text' => $settings['reviews_tagline_text'] ?? 'WHAT PEOPLE SAY',
        'tagline_color' => $settings['reviews_tagline_color'] ?? '#0f172a',
        'title_color' => $settings['reviews_title_color'] ?? '#232834',
        'card_bg_color' => $settings['reviews_card_bg_color'] ?? '#fff',
        'max_width' => $settings['reviews_max_width'] ?? '1200',
    ];
}

/**
 * Get locations section settings
 */
function bsg_get_locations_settings() {
    $settings = bsg_get_settings();
    return [
        'visible' => $settings['locations_visible'] ?? true,
        'label' => $settings['locations_label'] ?? 'SERVICE AREAS',
        'title' => $settings['locations_title'] ?? 'Proudly Serving Boulder And The Surrounding Areas',
        'description' => $settings['locations_description'] ?? 'short description',
        'bg_color' => $settings['locations_bg_color'] ?? '#ffffff',
        'card_bg' => $settings['locations_card_bg'] ?? '#f8f9fa',
        'text_color' => $settings['locations_text_color'] ?? '#232834',
        'padding' => $settings['locations_padding'] ?? 80,
        'locations' => $settings['locations'] ?? [],
        'show_map' => $settings['locations_show_map'] ?? true,
        'map_embed' => $settings['locations_map_embed'] ?? '',
    ];
}

/**
 * Get commitment section settings
 */
function bsg_get_commitment_settings() {
    $settings = bsg_get_settings();
    return [
        'visible' => $settings['commitment_visible'] ?? true,
        'label' => $settings['commitment_label'] ?? 'OUR COMMITMENT',
        'title' => $settings['commitment_title'] ?? 'Our Promise to You',
        'subtitle' => $settings['commitment_subtitle'] ?? 'We promise to deliver exceptional service',
        'text' => $settings['commitment_text'] ?? '',
        'image' => $settings['commitment_image'] ?? '',
        'bg_color' => $settings['commitment_bg_color'] ?? '#232834',
        'text_color' => $settings['commitment_text_color'] ?? '#ffffff',
        'padding' => $settings['commitment_padding'] ?? 80,
    ];
}

/**
 * Get service settings
 */
function bsg_get_service_settings() {
    $settings = bsg_get_settings();
    return [
        'visible' => $settings['services_visible'] ?? true,
        'label' => $settings['services_label'] ?? 'TOP RATED SERVICES',
        'title' => $settings['services_title'] ?? 'Our Services',
        'heading' => $settings['services_heading'] ?? 'Our Services',
        'description' => $settings['services_desc'] ?? 'Professional services you can trust',
        'bg_color' => $settings['services_bg_color'] ?? '#232834',
        'text_color' => $settings['services_text_color'] ?? '#ffffff',
        'padding' => $settings['services_padding'] ?? 80,
        'card_color' => $settings['services_card_color'] ?? '#232834',
        'icon_color' => $settings['services_icon_color'] ?? '#2ee6c5',
        'button_text' => $settings['services_button_text'] ?? 'Learn More',
        'button_color' => $settings['services_button_color'] ?? '#2ee6c5',
        'cta_text' => $settings['services_cta_text'] ?? 'View All Services',
        'cta_link' => $settings['services_cta_link'] ?? '#',
        'cta_bg' => $settings['services_cta_bg'] ?? '#2ee6c5',
        'cta_text_color' => $settings['services_cta_text_color'] ?? '#232834',
    ];
}

/**
 * Get service areas settings
 */
function bsg_get_service_areas_settings() {
    $settings = bsg_get_settings();
    return [
        'visible' => $settings['locations_visible'] ?? true,
        'label' => $settings['locations_label'] ?? 'OUR SERVICE AREA',
        'title' => $settings['locations_title'] ?? 'Service Areas',
        'heading' => $settings['locations_heading'] ?? 'Proudly Serving Your Area',
        'description' => $settings['locations_desc'] ?? 'We provide professional services in your local area',
        'bg_color' => $settings['locations_bg_color'] ?? '#232834',
        'text_color' => $settings['locations_text_color'] ?? '#ffffff',
        'padding' => $settings['locations_padding'] ?? 80,
        'icon_color' => $settings['locations_icon_color'] ?? '#2ee6c5',
        'button_text' => $settings['locations_button_text'] ?? 'View All Areas',
        'button_link' => $settings['locations_button_link'] ?? '#',
        'button_color' => $settings['locations_button_color'] ?? '#f97316',
    ];
}

/**
 * Get FAQ section settings
 */
function bsg_get_faq_settings() {
    $settings = bsg_get_settings();
    return [
        'visible' => $settings['faq_visible'] ?? true,
        'label' => $settings['faq_label'] ?? 'FREQUENTLY ASKED QUESTIONS',
        'title' => $settings['faq_title'] ?? 'Frequently Asked Questions',
        'heading' => $settings['faq_heading'] ?? 'Frequently Asked Questions',
        'description' => $settings['faq_desc'] ?? 'Find answers to common questions about our services, pricing, scheduling, and project timelines.',
        'bg_color' => $settings['faq_bg_color'] ?? '#232834',
        'text_color' => $settings['faq_text_color'] ?? '#ffffff',
        'padding' => $settings['faq_padding'] ?? 80,
        'image' => $settings['faq_image'] ?? '',
        'image_alt' => $settings['faq_image_alt'] ?? 'FAQ Section Image',
        'box_color' => $settings['faq_box_color'] ?? '#374151',
        'toggle_color' => $settings['faq_toggle_color'] ?? '#2ee6c5',
        'question_color' => $settings['faq_question_color'] ?? '#ffffff',
        'answer_color' => $settings['faq_answer_color'] ?? '#b0b0b0',
        'image_width' => $settings['faq_image_width'] ?? '350',
        'image_height' => $settings['faq_image_height'] ?? '350',
        'image_border_radius' => $settings['faq_image_border_radius'] ?? '24',
        'image_bg_color' => $settings['faq_image_bg_color'] ?? '#22242c',
        'faqs' => $settings['faqs'] ?? [],
    ];
}

/**
 * Get contact section settings
 */
function bsg_get_contact_settings() {
    $settings = bsg_get_settings();
    $business = bsg_get_business_info();
    
    return [
        'visible' => $settings['contact_visible'] ?? true,
        'label' => $settings['contact_label'] ?? 'GET IN TOUCH',
        'title' => $settings['contact_title'] ?? 'Contact Us Today',
        'description' => $settings['contact_description'] ?? '',
        'bg_color' => $settings['contact_bg_color'] ?? '#f8f9fa',
        'form_bg' => $settings['contact_form_bg'] ?? '#ffffff',
        'button_color' => $settings['contact_button_color'] ?? '#2563eb',
        'padding' => $settings['contact_padding'] ?? 80,
        'phone' => $business['phone'],
        'email' => $business['email'],
        'address' => $business['address'],
    ];
}

/**
 * Get footer settings
 */
function bsg_get_footer_settings() {
    $settings = bsg_get_settings();
    $business = bsg_get_business_info();
    
    return [
        'bg_color' => $settings['footer_bg_color'] ?? '#232834',
        'text_color' => $settings['footer_text_color'] ?? '#ffffff',
        'link_color' => $settings['footer_link_color'] ?? '#2ee6c5',
        'copyright' => $settings['footer_copyright'] ?? '© 2025 ' . $business['name'] . '. All rights reserved.',
        'heading_color' => $settings['footer_heading_color'] ?? '#ffffff',
        'subheading_color' => $settings['footer_subheading_color'] ?? '#b0b0b0',
        'social_icon_color' => $settings['footer_social_icon_color'] ?? '#2ee6c5',
        'social_hover_color' => $settings['footer_social_hover_color'] ?? '#ffffff',
        'logo' => $settings['footer_logo'] ?? '',
        'business_name' => $settings['footer_business_name'] ?? $business['name'],
        'email' => $settings['footer_email'] ?? $business['email'],
        'phone' => $settings['footer_phone'] ?? $business['phone'],
        'hours' => $settings['footer_hours'] ?? '',
        'address' => $settings['footer_address'] ?? $business['address'],
        'nav' => $settings['footer_nav'] ?? [],
        'services' => $settings['footer_services'] ?? [],
        'social' => $settings['footer_social'] ?? [],
    ];
}

/**
 * Create contact messages table on theme activation
 */
function bsg_create_contact_messages_table() {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'bsg_contact_messages';
    
    $charset_collate = $wpdb->get_charset_collate();
    
    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        name varchar(100) NOT NULL,
        email varchar(100) NOT NULL,
        subject varchar(200) DEFAULT '',
        message text NOT NULL,
        ip_address varchar(45) DEFAULT '',
        user_agent text DEFAULT '',
        submitted_at datetime DEFAULT CURRENT_TIMESTAMP,
        status varchar(20) DEFAULT 'new',
        admin_notes text DEFAULT '',
        PRIMARY KEY (id)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

/**
 * Handle contact form submission
 */
function bsg_handle_contact_form_submission() {
    // Check if form was submitted
    if (!isset($_POST['bsg_contact_form']) || !wp_verify_nonce($_POST['bsg_contact_nonce'], 'bsg_contact_form_action')) {
        return;
    }
    
    // Sanitize form data
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $subject = sanitize_text_field($_POST['subject']);
    $message = sanitize_textarea_field($_POST['message']);
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        wp_die('Please fill in all required fields.');
    }
    
    // Validate email
    if (!is_email($email)) {
        wp_die('Please enter a valid email address.');
    }
    
    // Get user IP and user agent
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? '';
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    
    // Save to database
    global $wpdb;
    $table_name = $wpdb->prefix . 'bsg_contact_messages';
    
    $result = $wpdb->insert(
        $table_name,
        array(
            'name' => $name,
            'email' => $email,
            'subject' => $subject,
            'message' => $message,
            'ip_address' => $ip_address,
            'user_agent' => $user_agent,
            'submitted_at' => current_time('mysql'),
            'status' => 'new'
        ),
        array(
            '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s'
        )
    );
    
    if ($result === false) {
        wp_die('Error saving message. Please try again.');
    }
    
    // Send email notification to admin
    $settings = bsg_get_settings();
    $business = bsg_get_business_info();
    
    $admin_email = $business['email'] ?? get_option('admin_email');
    $business_name = $business['name'] ?? get_bloginfo('name');
    
    $email_subject = 'New Contact Form Submission - ' . $business_name;
    $email_message = "You have received a new message from your website contact form.\n\n";
    $email_message .= "Name: $name\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Subject: $subject\n";
    $email_message .= "Message:\n$message\n\n";
    $email_message .= "Submitted on: " . current_time('F j, Y \a\t g:i A') . "\n";
    $email_message .= "IP Address: $ip_address\n";
    
    $headers = array(
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . $business_name . ' <noreply@' . $_SERVER['HTTP_HOST'] . '>',
        'Reply-To: ' . $name . ' <' . $email . '>'
    );
    
    wp_mail($admin_email, $email_subject, $email_message, $headers);
    
    // Send auto-reply to user
    $user_subject = 'Thank you for contacting ' . $business_name;
    $user_message = "Dear $name,\n\n";
    $user_message .= "Thank you for contacting $business_name. We have received your message and will get back to you as soon as possible.\n\n";
    $user_message .= "Your message:\n$message\n\n";
    $user_message .= "Best regards,\n";
    $user_message .= $business_name . " Team";
    
    $user_headers = array(
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . $business_name . ' <' . $admin_email . '>'
    );
    
    wp_mail($email, $user_subject, $user_message, $user_headers);
    
    // Redirect with success message
    $redirect_url = add_query_arg('contact_success', '1', wp_get_referer() ?: home_url());
    wp_redirect($redirect_url);
    exit;
}

/**
 * Handle AJAX contact form submission
 */
function bsg_ajax_contact_form_submission() {
    // Check nonce
    if (!wp_verify_nonce($_POST['nonce'], 'bsg_contact_form_action')) {
        wp_send_json_error('Security check failed');
    }
    
    // Sanitize form data
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $subject = sanitize_text_field($_POST['subject']);
    $message = sanitize_textarea_field($_POST['message']);
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        wp_send_json_error('Please fill in all required fields.');
    }
    
    // Validate email
    if (!is_email($email)) {
        wp_send_json_error('Please enter a valid email address.');
    }
    
    // Get user IP and user agent
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? '';
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    
    // Save to database
    global $wpdb;
    $table_name = $wpdb->prefix . 'bsg_contact_messages';
    
    $result = $wpdb->insert(
        $table_name,
        array(
            'name' => $name,
            'email' => $email,
            'subject' => $subject,
            'message' => $message,
            'ip_address' => $ip_address,
            'user_agent' => $user_agent,
            'submitted_at' => current_time('mysql'),
            'status' => 'new'
        ),
        array(
            '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s'
        )
    );
    
    if ($result === false) {
        wp_send_json_error('Error saving message. Please try again.');
    }
    
    // Send email notification to admin
    $settings = bsg_get_settings();
    $business = bsg_get_business_info();
    
    $admin_email = $business['email'] ?? get_option('admin_email');
    $business_name = $business['name'] ?? get_bloginfo('name');
    
    $email_subject = 'New Contact Form Submission - ' . $business_name;
    $email_message = "You have received a new message from your website contact form.\n\n";
    $email_message .= "Name: $name\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Subject: $subject\n";
    $email_message .= "Message:\n$message\n\n";
    $email_message .= "Submitted on: " . current_time('F j, Y \a\t g:i A') . "\n";
    $email_message .= "IP Address: $ip_address\n";
    
    $headers = array(
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . $business_name . ' <noreply@' . $_SERVER['HTTP_HOST'] . '>',
        'Reply-To: ' . $name . ' <' . $email . '>'
    );
    
    wp_mail($admin_email, $email_subject, $email_message, $headers);
    
    // Send auto-reply to user
    $user_subject = 'Thank you for contacting ' . $business_name;
    $user_message = "Dear $name,\n\n";
    $user_message .= "Thank you for contacting $business_name. We have received your message and will get back to you as soon as possible.\n\n";
    $user_message .= "Your message:\n$message\n\n";
    $user_message .= "Best regards,\n";
    $user_message .= $business_name . " Team";
    
    $user_headers = array(
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . $business_name . ' <' . $admin_email . '>'
    );
    
    wp_mail($email, $user_subject, $user_message, $user_headers);
    
    wp_send_json_success('Message sent successfully! We will get back to you soon.');
}

/**
 * Render a standardized contact form used across the theme
 */
function bsg_render_contact_form(): string {
    $settings = bsg_get_settings();
    $business = bsg_get_business_info();

    // Use wizard contact customization colors
    $primaryColor = $settings['button_primary_color'] ?? '#2ee6c5';
    $textColor = '#9ca3af'; // Light gray for input text
    $labelColor = $settings['contact_text_color'] ?? '#374151';
    $borderColor = $settings['contact_form_border_color'] ?? '#e5e7eb';
    $buttonTextColor = $settings['button_text_color'] ?? '#ffffff';
    $formBgColor = $settings['contact_form_bg_color'] ?? 'transparent';

    ob_start();
    ?>
    <div style="max-width: 100%; width: 100%;">
        <?php if (isset($_GET['contact_success'])): ?>
            <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #c3e6cb;">
                <strong>Success!</strong> Your message has been sent successfully. We will get back to you soon.
            </div>
        <?php endif; ?>
        
        <form id="bsg-contact-form" method="post" action="" style="display:flex;flex-direction:column;gap:20px;background:<?php echo esc_attr($formBgColor); ?>;padding:0;">
            <?php wp_nonce_field('bsg_contact_form_action', 'bsg_contact_nonce'); ?>
            <input type="hidden" name="bsg_contact_form" value="1">
            
            <div>
                <label style="color:<?php echo esc_attr($labelColor); ?>;font-weight:700;font-size:0.9rem;margin-bottom:8px;display:block;text-transform:uppercase;letter-spacing:0.5px;">Your Name</label>
                <input type="text" name="name" required style="width:100%;padding:12px 0;border:none;border-bottom:2px solid <?php echo esc_attr($borderColor); ?>;background:transparent;color:<?php echo esc_attr($textColor); ?>;font-size:1rem;font-weight:500;transition:all 0.3s ease;box-sizing:border-box;outline:none;" onfocus="this.style.borderBottomColor='<?php echo esc_attr($primaryColor); ?>';this.style.borderBottomWidth='3px';this.style.color='#6b7280';" onblur="this.style.borderBottomColor='<?php echo esc_attr($borderColor); ?>';this.style.borderBottomWidth='2px';this.style.color='<?php echo esc_attr($textColor); ?>';" placeholder="Enter your full name">
            </div>

            <div>
                <label style="color:<?php echo esc_attr($labelColor); ?>;font-weight:700;font-size:0.9rem;margin-bottom:8px;display:block;text-transform:uppercase;letter-spacing:0.5px;">Your Email</label>
                <input type="email" name="email" required style="width:100%;padding:12px 0;border:none;border-bottom:2px solid <?php echo esc_attr($borderColor); ?>;background:transparent;color:<?php echo esc_attr($textColor); ?>;font-size:1rem;font-weight:500;transition:all 0.3s ease;box-sizing:border-box;outline:none;" onfocus="this.style.borderBottomColor='<?php echo esc_attr($primaryColor); ?>';this.style.borderBottomWidth='3px';this.style.color='#6b7280';" onblur="this.style.borderBottomColor='<?php echo esc_attr($borderColor); ?>';this.style.borderBottomWidth='2px';this.style.color='<?php echo esc_attr($textColor); ?>';" placeholder="Enter your email address">
            </div>

            <div>
                <label style="color:<?php echo esc_attr($labelColor); ?>;font-weight:700;font-size:0.9rem;margin-bottom:8px;display:block;text-transform:uppercase;letter-spacing:0.5px;">Your Subject</label>
                <input type="text" name="subject" style="width:100%;padding:12px 0;border:none;border-bottom:2px solid <?php echo esc_attr($borderColor); ?>;background:transparent;color:<?php echo esc_attr($textColor); ?>;font-size:1rem;font-weight:500;transition:all 0.3s ease;box-sizing:border-box;outline:none;" onfocus="this.style.borderBottomColor='<?php echo esc_attr($primaryColor); ?>';this.style.borderBottomWidth='3px';this.style.color='#6b7280';" onblur="this.style.borderBottomColor='<?php echo esc_attr($borderColor); ?>';this.style.borderBottomWidth='2px';this.style.color='<?php echo esc_attr($textColor); ?>';" placeholder="What's this about?">
            </div>

            <div>
                <label style="color:<?php echo esc_attr($labelColor); ?>;font-weight:700;font-size:0.9rem;margin-bottom:8px;display:block;text-transform:uppercase;letter-spacing:0.5px;">Message</label>
                <textarea name="message" required style="width:100%;padding:12px 0;border:none;border-bottom:2px solid <?php echo esc_attr($borderColor); ?>;background:transparent;color:<?php echo esc_attr($textColor); ?>;font-size:1rem;font-weight:500;min-height:80px;resize:vertical;transition:all 0.3s ease;box-sizing:border-box;font-family:inherit;outline:none;" onfocus="this.style.borderBottomColor='<?php echo esc_attr($primaryColor); ?>';this.style.borderBottomWidth='3px';this.style.color='#6b7280';" onblur="this.style.borderBottomColor='<?php echo esc_attr($borderColor); ?>';this.style.borderBottomWidth='2px';this.style.color='<?php echo esc_attr($textColor); ?>';" placeholder="Write here your message"></textarea>
            </div>

            <button type="submit" style="margin-top:20px;background:<?php echo esc_attr($primaryColor); ?>;color:<?php echo esc_attr($buttonTextColor); ?>;font-weight:800;font-size:1rem;padding:14px 28px;border-radius:10px;border:none;cursor:pointer;display:block;width:100%;text-align:center;transition:all 0.3s ease;box-shadow:0 4px 15px rgba(0,0,0,0.15);text-transform:uppercase;letter-spacing:1px;" onmouseover="this.style.background='<?php echo esc_attr($settings['button_hover_color'] ?? '#22d3aa'); ?>';this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 25px rgba(0,0,0,0.2)';" onmouseout="this.style.background='<?php echo esc_attr($primaryColor); ?>';this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(0,0,0,0.15)';">
                Send Message
            </button>
        </form>
        
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('bsg-contact-form');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const formData = new FormData(form);
                    formData.append('action', 'bsg_ajax_contact_form_submission');
                    formData.append('nonce', '<?php echo wp_create_nonce('bsg_contact_form_action'); ?>');
                    
                    const submitButton = form.querySelector('button[type="submit"]');
                    const originalText = submitButton.textContent;
                    submitButton.textContent = 'Sending...';
                    submitButton.disabled = true;
                    
                    fetch('<?php echo admin_url('admin-ajax.php'); ?>', {
                        method: 'POST',
                        body: formData
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            form.innerHTML = '<div style="background: #d4edda; color: #155724; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #c3e6cb;"><strong>Success!</strong><br>' + data.data + '</div>';
                        } else {
                            alert('Error: ' + data.data);
                            submitButton.textContent = originalText;
                            submitButton.disabled = false;
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('An error occurred. Please try again.');
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                    });
                });
            }
        });
        </script>
    </div>
    <?php
    return (string) ob_get_clean();
}

/**
 * Generate common CSS variables for all pages
 */
function bsg_generate_css_variables() {
    $colors = bsg_get_color_scheme();
    $settings = bsg_get_settings();
    
    $css_vars = [
        '--primary-color' => $colors['primary'],
        '--secondary-color' => $colors['secondary'],
        '--accent-color' => $colors['accent'],
        '--surface-color' => $colors['surface'],
        '--text-color' => $colors['text'],
        '--nav-bg' => $colors['surface'],
        '--footer-bg' => $colors['surface'],
        '--heading-color' => $colors['text'],
    ];
    
    $css = ':root {';
    foreach ($css_vars as $var => $value) {
        $css .= $var . ': ' . esc_attr($value) . ';';
    }
    $css .= '}';
    
    return $css;
}

/**
 * Generate common CSS for all pages
 */
function bsg_generate_common_css() {
    $css = bsg_generate_css_variables();
    
    $css .= '
    /* Animation keyframes */
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    /* Scroll-triggered animation classes */
    .animate-on-scroll-section { 
        opacity: 0; 
        transform: translateY(50px); 
        transition: opacity 1.2s ease-out, transform 1.2s ease-out; 
    }
    .animate-on-scroll-section.animated { 
        opacity: 1; 
        transform: translateY(0); 
    }
    
    /* Common header styles */
    .main-header { 
        background: var(--nav-bg); 
        color: var(--text-color); 
    }
    .main-header .nav-menu a { 
        color: var(--text-color); 
    }
    .main-header .logo, .main-header .logo span { 
        color: var(--text-color) !important; 
    }
    .main-header a.logo { 
        color: var(--text-color) !important; 
        text-decoration: none; 
    }
    .main-header .container { 
        display:flex; 
        align-items:center; 
        justify-content:space-between; 
        gap:1rem; 
        padding: 0 1.5rem; 
        margin:0; 
    }
    .main-header .logo { 
        display:flex; 
        align-items:center; 
        margin:0; 
        padding:0; 
    }
    .main-header .logo img, .main-header .logo svg { 
        display:block; 
    }
    
    /* Common footer styles */
    .main-footer {
        background: var(--footer-bg);
        color: var(--text-color);
        padding: 3rem 0 1rem 0;
    }
    .footer-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-bottom: 2rem;
    }
    .footer-col h4 {
        color: var(--text-color);
        margin-bottom: 1rem;
        font-size: 1rem;
        font-weight: 700;
        letter-spacing: 1px;
    }
    .footer-col ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .footer-col ul li {
        margin-bottom: 0.5rem;
    }
    .footer-col ul li a {
        color: var(--text-color);
        text-decoration: none;
        opacity: 0.8;
        transition: opacity 0.2s;
    }
    .footer-col ul li a:hover {
        opacity: 1;
    }
    .footer-logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
        color: var(--text-color);
        text-decoration: none;
        font-weight: 700;
    }
    .footer-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 2rem;
        border-top: 1px solid rgba(255,255,255,0.1);
    }
    .social-icons {
        display: flex;
        gap: 1rem;
    }
    .social-icons a {
        color: var(--text-color);
        opacity: 0.8;
        transition: opacity 0.2s;
    }
    .social-icons a:hover {
        opacity: 1;
    }
    
    /* Hamburger menu - hidden on desktop */
    .hamburger {
        display: none;
    }
    
    /* Mobile Responsive Styles */
    @media (max-width: 768px) {
        .main-header .logo img,
        .main-header .logo svg {
            width: 30px;
            height: 22px;
        }
        
        .header-actions {
            display: none;
        }
        
        .main-nav {
            position: fixed;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100vh;
            background: var(--mobile-menu-bg, rgba(35, 40, 52, 0.98));
            backdrop-filter: blur(10px);
            transition: left 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .main-nav.open {
            left: 0;
        }
        
        .nav-menu {
            flex-direction: column;
            gap: 2rem;
            text-align: center;
        }
        
        .nav-menu li {
            margin: 0;
        }
        
        .nav-menu a {
            font-size: 1.5rem;
            padding: 1rem;
            display: block;
            color: var(--mobile-menu-link-color, var(--text-color));
        }
        
        .dropdown {
            position: static;
            background: none;
            box-shadow: none;
            padding: 0;
            margin-top: 1rem;
        }
        
        .dropdown li {
            margin: 0.5rem 0;
        }
        
        .dropdown a {
            font-size: 1.2rem;
            padding: 0.5rem;
        }
        
        .hamburger {
            display: block !important;
            cursor: pointer;
            z-index: 1001;
            color: var(--text-color);
            position: relative;
            width: 30px;
            height: 30px;
            background: none;
            border: none;
            padding: 0;
        }
        
        .hamburger span {
            display: block;
            width: 25px;
            height: 3px;
            background: var(--mobile-menu-icon, var(--text-color));
            margin: 5px 0;
            transition: 0.3s;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
        }
        
        .footer-bottom {
            flex-direction: column !important;
            gap: 1rem !important;
            text-align: center !important;
        }
    }
    ';
    
    return $css;
}

/**
 * Generate common JavaScript for all pages
 */
function bsg_generate_common_js() {
    return '
    // Hamburger menu toggle for mobile
    document.addEventListener("DOMContentLoaded", function() {
        const hamburger = document.getElementById("hamburger-menu");
        const nav = document.getElementById("main-nav");
        
        if (hamburger && nav) {
        hamburger.addEventListener("click", function() {
            nav.classList.toggle("open");
            hamburger.classList.toggle("active");
            document.body.style.overflow = nav.classList.contains("open") ? "hidden" : "";
        });
        
        // Close menu on nav link click (mobile UX)
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 768) {
                    nav.classList.remove("open");
                    hamburger.classList.remove("active");
                    document.body.style.overflow = "";
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener("click", function(e) {
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove("open");
                hamburger.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
        
        // Handle window resize
        window.addEventListener("resize", function() {
            if (window.innerWidth > 768) {
                nav.classList.remove("open");
                hamburger.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Scroll-triggered animations
    function animateOnScroll() {
        const sections = document.querySelectorAll(".animate-on-scroll-section");
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionVisible = 150;
            
            if (sectionTop < window.innerHeight - sectionVisible) {
                section.classList.add("animated");
            }
        });
    }

    // Run on scroll and on page load
    window.addEventListener("scroll", animateOnScroll);
    window.addEventListener("load", animateOnScroll);
    
    // Make function globally available
    window.animateOnScroll = animateOnScroll;
    ';
}

/**
 * Output common CSS and JS to head
 */
function bsg_output_common_assets() {
    echo '<style>' . bsg_generate_common_css() . '</style>' . "\n";
    echo '<script>' . bsg_generate_common_js() . '</script>' . "\n";
}

// Create the settings page
function bsg_settings_page() {
    if (isset($_POST['save_bsg_settings']) || isset($_POST['action']) && $_POST['action'] === 'save_bsg_settings') {
        // Verify nonce
        if (!wp_verify_nonce($_POST['bsg_settings_nonce'], 'bsg_settings_nonce')) {
            echo '<div class="notice notice-error"><p>Security check failed. Please try again.</p></div>';
            return;
        }
        
        // Get current settings
        $current_settings = get_option('bsg_settings', []);
        
        // Debug: Log that form was submitted
        error_log('BSG Settings Form Submitted');
        error_log('POST data keys: ' . implode(', ', array_keys($_POST)));
        error_log('Form submission method: ' . (isset($_POST['save_bsg_settings']) ? 'save_bsg_settings' : 'action'));
        
        // Update settings from form fields
        $form_fields = [
            'business_name', 'business_logo', 'phone', 'email', 'address', 'state', 'zip',
            // Meta tags
            'homepage_meta_title', 'homepage_meta_description', 'homepage_meta_keywords',
            'about_meta_title', 'about_meta_description', 'about_meta_keywords',
            'about_page_meta_title', 'about_page_meta_description', 'about_page_meta_keywords',
            'contact_meta_title', 'contact_meta_description', 'contact_meta_keywords',
            'services_meta_title', 'services_meta_description', 'services_meta_keywords',
            'locations_meta_title', 'locations_meta_description', 'locations_meta_keywords',
            // Hero settings
            'hero_visible', 'hero_headline', 'hero_description', 'hero_cta', 'hero_cta_link',
            'hero_rating', 'hero_bg_image', 'hero_bg_color', 'hero_company_color', 'hero_heading_color',
            'hero_subheading_color', 'hero_description_color', 'hero_reviews_text_color', 'hero_reviews_star_color',
            'hero_book_btn_bg', 'hero_book_btn_text', 'hero_call_btn_bg', 'hero_call_btn_text',
            'hero_book_btn_link', 'hero_call_btn_link', 'hero_padding',
            // Service section settings
            'services_visible', 'services_label', 'services_title', 'services_subtitle',
            'services_cta_text', 'services_cta_link', 'services_bg_color', 'services_text_color',
            'services_card_color', 'services_icon_color', 'services_cta_bg', 'services_cta_text_color',
            'services_card_radius', 'services_padding',
            // Individual service page settings
            'service_hero_heading_color', 'service_hero_description_color', 'services_contact_title',
            'services_contact_description', 'service_contact_box_bg', 'service_contact_box_text',
            'service_contact_icons_color', 'service_content_bg_color', 'service_content_padding',
            // About settings
            'about_visible', 'about_label', 'about_title', 'about_description', 'about_image', 'about_bg_color',
            'about_text_color', 'about_tagline', 'about_tagline_color', 'about_heading', 'about_heading_color',
            'about_description_color', 'about_years', 'about_experience_text', 'about_experience_bg',
            'about_experience_text_color', 'about_button_text', 'about_button_color', 'about_button_text_color',
            'about_button_link', 'about_padding', 'about_hero_tagline', 'about_hero_title', 'about_hero_text_color',
            'about_hero_bg_color', 'about_hero_tagline_color', 'about_hero_title_color',
            // Location settings
            'locations_visible', 'locations_label', 'locations_title', 'locations_description', 'locations_bg_color',
            'locations_text_color', 'locations_card_bg', 'locations_show_map', 'locations_map_embed', 'locations_padding',
            'location_hero_heading_color', 'location_hero_description_color', 'location_contact_title',
            'location_contact_description', 'location_contact_box_bg', 'location_contact_box_text',
            'location_contact_icons_color', 'location_content_bg_color', 'location_content_padding',
            // Contact settings
            'contact_visible', 'contact_heading', 'contact_description', 'contact_section_bg_color',
            'contact_left_side_color', 'contact_right_side_color', 'contact_text_color',
            'contact_headline_color', 'contact_description_color', 'contact_padding',
            // Footer settings
            'footer_visible', 'footer_bg_color', 'footer_heading_color', 'footer_links_color', 'footer_copyright_text', 'footer_disclaimer_text', 'footer_padding',
            // Features settings
            'features_visible', 'features_label', 'features_title', 'features_description', 'features_bg_color',
            'features_text_color', 'features_card_bg', 'features_icon_color', 'features_padding',
            // Reviews settings
            'reviews_visible', 'reviews_label', 'reviews_title', 'reviews_bg_color', 'reviews_text_color',
            'reviews_card_bg', 'reviews_star_color', 'reviews_padding',
            // Commitment settings
            'commitment_visible', 'commitment_label', 'commitment_title', 'commitment_subtitle', 'commitment_text',
            'commitment_image', 'commitment_bg_color', 'commitment_text_color', 'commitment_padding',
            // FAQ settings
            'faq_visible', 'faq_label', 'faq_title', 'faq_heading', 'faq_desc', 'faq_bg_color', 'faq_text_color',
            'faq_image', 'faq_box_color', 'faq_toggle_color', 'faq_question_color', 'faq_answer_color', 'faq_padding',
            // Footer settings
            'footer_bg_color', 'footer_text_color', 'footer_link_color', 'footer_heading_color', 'footer_subheading_color',
            'footer_social_icon_color', 'footer_social_hover_color', 'footer_logo', 'footer_business_name',
            'footer_email', 'footer_phone', 'footer_hours', 'footer_address', 'footer_copyright',
            // Header settings
            'header_bg_color', 'header_text_color', 'header_link_color', 'header_link_hover_color', 'header_logo',
            'header_logo_width', 'header_logo_height', 'header_padding_top', 'header_padding_bottom', 'header_sticky', 'header_shadow'
        ];
        
        // Update individual form fields
        $checkbox_fields = [
            'hero_visible', 'services_visible', 'about_visible', 'locations_visible', 'contact_visible', 
            'locations_show_map', 'features_visible', 'reviews_visible', 'commitment_visible', 'faq_visible',
            'header_sticky', 'header_shadow'
        ];
        
        $processed_fields = 0;
        foreach ($form_fields as $field) {
            if (isset($_POST[$field])) {
                if (in_array($field, $checkbox_fields)) {
                    // Handle checkbox (explicitly true when present)
                    $current_settings[$field] = !empty($_POST[$field]);
                } else {
                    // Special handling for fields that should allow HTML
                    if (in_array($field, ['locations_description', 'about_content', 'contact_description', 'hero_description'])) {
                        $current_settings[$field] = wp_kses_post($_POST[$field]);
                    } else {
                        $current_settings[$field] = sanitize_text_field($_POST[$field]);
                    }
                }
                $processed_fields++;
            }
        }
        // Ensure unchecked checkboxes are saved as false
        foreach ($checkbox_fields as $checkbox_field) {
            if (!isset($_POST[$checkbox_field])) {
                $current_settings[$checkbox_field] = false;
            }
        }
        
        // Debug: Log processed fields
        error_log('BSG Settings Processed Fields: ' . $processed_fields);
        error_log('Sample field values: business_name=' . ($_POST['business_name'] ?? 'NOT SET') . ', hero_visible=' . ($_POST['hero_visible'] ?? 'NOT SET'));
        
        // Handle services JSON
        if (isset($_POST['services_json']) && !empty($_POST['services_json'])) {
            $services_json = json_decode(stripslashes($_POST['services_json']), true);
            if ($services_json) {
                $current_settings['services'] = $services_json;
            }
        }
        
        // Handle locations JSON
        if (isset($_POST['locations_json']) && !empty($_POST['locations_json'])) {
            $locations_json = json_decode(stripslashes($_POST['locations_json']), true);
            if ($locations_json) {
                $current_settings['locations'] = $locations_json;
            }
        }
        
        // Handle features JSON
        if (isset($_POST['features_json']) && !empty($_POST['features_json'])) {
            $features_json = json_decode(stripslashes($_POST['features_json']), true);
            if ($features_json) {
                $current_settings['features'] = $features_json;
            }
        }
        
        // Handle reviews JSON
        if (isset($_POST['reviews_json']) && !empty($_POST['reviews_json'])) {
            $reviews_json = json_decode(stripslashes($_POST['reviews_json']), true);
            if ($reviews_json) {
                $current_settings['reviews'] = $reviews_json;
            }
        }
        
        // Handle commitments JSON
        if (isset($_POST['commitments_json']) && !empty($_POST['commitments_json'])) {
            $commitments_json = json_decode(stripslashes($_POST['commitments_json']), true);
            if ($commitments_json) {
                $current_settings['commitments'] = $commitments_json;
            }
        }
        
        // Handle FAQs JSON
        if (isset($_POST['faqs_json']) && !empty($_POST['faqs_json'])) {
            $faqs_json = json_decode(stripslashes($_POST['faqs_json']), true);
            if ($faqs_json) {
                $current_settings['faqs'] = $faqs_json;
            }
        }
        
        // Also check for JSON settings (for advanced users)
        if (isset($_POST['bsg_settings']) && !empty($_POST['bsg_settings'])) {
            $json_settings = json_decode(stripslashes($_POST['bsg_settings']), true);
            if (is_array($json_settings)) {
                // Merge JSON FIRST, so explicit form inputs (already applied above)
                // take precedence and are not overwritten by JSON.
                $current_settings = array_merge($json_settings, $current_settings);
            }
        }
        
        // Save updated settings
        $saved = update_option('bsg_settings', $current_settings);
        
        // Debug: Log save result
        error_log('BSG Settings Save Result: ' . ($saved ? 'SUCCESS' : 'FAILED'));
        error_log('BSG Settings Count: ' . count($current_settings));
        error_log('Sample saved values: business_name=' . ($current_settings['business_name'] ?? 'NOT SET') . ', hero_visible=' . ($current_settings['hero_visible'] ?? 'NOT SET'));
        
        if ($saved) {
            echo '<div class="notice notice-success"><p>Settings saved successfully! (' . count($current_settings) . ' settings saved)</p></div>';
        } else {
            echo '<div class="notice notice-error"><p>Failed to save settings!</p></div>';
        }
        
        // Force refresh the page to show updated values
        echo '<script>setTimeout(function(){ window.location.reload(); }, 2000);</script>';
        
        // Don't continue processing after save
        return;
    }
    
    $current_settings = get_option('bsg_settings', []);
    
    // Debug: Log current settings
    error_log('BSG Settings Loaded: ' . count($current_settings) . ' settings');
    error_log('Sample loaded values: business_name=' . ($current_settings['business_name'] ?? 'NOT SET') . ', hero_visible=' . ($current_settings['hero_visible'] ?? 'NOT SET'));
    ?>
    <div class="wrap">
        <h1>BSG Theme Settings</h1>
        <p>View and edit your theme settings below:</p>
        
        <!-- Debug Info -->
        <div style="background: #f0f0f0; padding: 10px; margin: 10px 0; border: 1px solid #ccc;">
            <strong>Debug Info:</strong> 
            Total Settings: <?php echo count($current_settings); ?> | 
            Business Name: <?php echo esc_html($current_settings['business_name'] ?? 'NOT SET'); ?> | 
            Hero Visible: <?php echo esc_html($current_settings['hero_visible'] ?? 'NOT SET'); ?>
        </div>
        
        <div style="display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;">
            <a href="#business-info" class="button">Business Info</a>
            <a href="#hero-settings" class="button">Hero</a>
            <a href="#service-settings" class="button">Services</a>
            <a href="#about-settings" class="button">About</a>
            <a href="#location-settings" class="button">Locations</a>
            <a href="#contact-settings" class="button">Contact</a>
            <a href="#features-settings" class="button">Features</a>
            <a href="#reviews-settings" class="button">Reviews</a>
            <a href="#commitment-settings" class="button">Commitment</a>
            <a href="#faq-settings" class="button">FAQ</a>
            <a href="#footer-settings" class="button">Footer</a>
            <a href="#header-settings" class="button">Header</a>
            <a href="#advanced" class="button">Advanced JSON</a>
        </div>
        
        <form method="post" action="">
            <?php wp_nonce_field('bsg_settings_nonce', 'bsg_settings_nonce'); ?>
            <input type="hidden" name="action" value="save_bsg_settings">
            <div id="business-info" style="margin-bottom: 30px;">
                <h2>Business Information</h2>
                <table class="form-table">
                    <tr>
                        <th scope="row">Business Name</th>
                        <td><input type="text" name="business_name" value="<?php echo esc_attr($current_settings['business_name'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Business Logo URL</th>
                        <td><input type="url" name="business_logo" value="<?php echo esc_attr($current_settings['business_logo'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Phone</th>
                        <td><input type="text" name="phone" value="<?php echo esc_attr($current_settings['phone'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Email</th>
                        <td><input type="email" name="email" value="<?php echo esc_attr($current_settings['email'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Address</th>
                        <td><textarea name="address" rows="3" class="large-text"><?php echo esc_textarea($current_settings['address'] ?? ''); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">State</th>
                        <td><input type="text" name="state" value="<?php echo esc_attr($current_settings['state'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">ZIP Code</th>
                        <td><input type="text" name="zip" value="<?php echo esc_attr($current_settings['zip'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                </table>
                
                <h3>SEO Meta Tags</h3>
                <table class="form-table">
                    <tr>
                        <th scope="row">Homepage Meta Title</th>
                        <td><input type="text" name="homepage_meta_title" value="<?php echo esc_attr($current_settings['homepage_meta_title'] ?? ''); ?>" class="large-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Homepage Meta Description</th>
                        <td><textarea name="homepage_meta_description" rows="3" class="large-text"><?php echo esc_textarea($current_settings['homepage_meta_description'] ?? ''); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">Homepage Meta Keywords</th>
                        <td><input type="text" name="homepage_meta_keywords" value="<?php echo esc_attr($current_settings['homepage_meta_keywords'] ?? ''); ?>" class="large-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">About Page Meta Title</th>
                        <td><input type="text" name="about_meta_title" value="<?php echo esc_attr($current_settings['about_meta_title'] ?? ''); ?>" class="large-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">About Page Meta Description</th>
                        <td><textarea name="about_meta_description" rows="3" class="large-text"><?php echo esc_textarea($current_settings['about_meta_description'] ?? ''); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">About Page Meta Keywords</th>
                        <td><input type="text" name="about_meta_keywords" value="<?php echo esc_attr($current_settings['about_meta_keywords'] ?? ''); ?>" class="large-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Contact Page Meta Title</th>
                        <td><input type="text" name="contact_meta_title" value="<?php echo esc_attr($current_settings['contact_meta_title'] ?? ''); ?>" class="large-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Contact Page Meta Description</th>
                        <td><textarea name="contact_meta_description" rows="3" class="large-text"><?php echo esc_textarea($current_settings['contact_meta_description'] ?? ''); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">Contact Page Meta Keywords</th>
                        <td><input type="text" name="contact_meta_keywords" value="<?php echo esc_attr($current_settings['contact_meta_keywords'] ?? ''); ?>" class="large-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Services Page Meta Title</th>
                        <td><input type="text" name="services_meta_title" value="<?php echo esc_attr($current_settings['services_meta_title'] ?? ''); ?>" class="large-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Services Page Meta Description</th>
                        <td><textarea name="services_meta_description" rows="3" class="large-text"><?php echo esc_textarea($current_settings['services_meta_description'] ?? ''); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">Services Page Meta Keywords</th>
                        <td><input type="text" name="services_meta_keywords" value="<?php echo esc_attr($current_settings['services_meta_keywords'] ?? ''); ?>" class="large-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Locations Page Meta Title</th>
                        <td><input type="text" name="locations_meta_title" value="<?php echo esc_attr($current_settings['locations_meta_title'] ?? ''); ?>" class="large-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Locations Page Meta Description</th>
                        <td><textarea name="locations_meta_description" rows="3" class="large-text"><?php echo esc_textarea($current_settings['locations_meta_description'] ?? ''); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">Locations Page Meta Keywords</th>
                        <td><input type="text" name="locations_meta_keywords" value="<?php echo esc_attr($current_settings['locations_meta_keywords'] ?? ''); ?>" class="large-text" /></td>
                    </tr>
                </table>
            </div>
            
            <div id="hero-settings" style="margin-bottom: 30px;">
                <h2>Hero - Complete Settings</h2>
                <p>Configure all hero section settings for the homepage.</p>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">Hero Section Visible</th>
                        <td>
                            <label>
                                <input type="checkbox" name="hero_visible" value="1" <?php checked($current_settings['hero_visible'] ?? true, true); ?> />
                                Show hero section on homepage
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Hero Headline</th>
                        <td><input type="text" name="hero_headline" value="<?php echo esc_attr($current_settings['hero_headline'] ?? 'Find Roofers Near You'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero Description</th>
                        <td><textarea name="hero_description" rows="3" class="large-text"><?php echo esc_textarea($current_settings['hero_description'] ?? ''); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero CTA Text</th>
                        <td><input type="text" name="hero_cta" value="<?php echo esc_attr($current_settings['hero_cta'] ?? 'Rated 5 Stars On Google'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero CTA Link</th>
                        <td><input type="url" name="hero_cta_link" value="<?php echo esc_attr($current_settings['hero_cta_link'] ?? '#contact'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero Rating Text</th>
                        <td><input type="text" name="hero_rating" value="<?php echo esc_attr($current_settings['hero_rating'] ?? 'Rated 5 Stars On Google'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero Background Image URL</th>
                        <td><input type="url" name="hero_bg_image" value="<?php echo esc_attr($current_settings['hero_bg_image'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero Background Color</th>
                        <td><input type="color" name="hero_bg_color" value="<?php echo esc_attr($current_settings['hero_bg_color'] ?? '#2563eb'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero Company Color</th>
                        <td><input type="color" name="hero_company_color" value="<?php echo esc_attr($current_settings['hero_company_color'] ?? '#b0b0b0'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero Heading Color</th>
                        <td><input type="color" name="hero_heading_color" value="<?php echo esc_attr($current_settings['hero_heading_color'] ?? '#232834'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero Subheading Color</th>
                        <td><input type="color" name="hero_subheading_color" value="<?php echo esc_attr($current_settings['hero_subheading_color'] ?? '#b0b0b0'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero Description Color</th>
                        <td><input type="color" name="hero_description_color" value="<?php echo esc_attr($current_settings['hero_description_color'] ?? '#b0b0b0'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero Reviews Text Color</th>
                        <td><input type="color" name="hero_reviews_text_color" value="<?php echo esc_attr($current_settings['hero_reviews_text_color'] ?? '#232834'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero Reviews Star Color</th>
                        <td><input type="color" name="hero_reviews_star_color" value="<?php echo esc_attr($current_settings['hero_reviews_star_color'] ?? '#fbbf24'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero Book Button Background</th>
                        <td><input type="color" name="hero_book_btn_bg" value="<?php echo esc_attr($current_settings['hero_book_btn_bg'] ?? '#2ee6c5'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero Book Button Text Color</th>
                        <td><input type="color" name="hero_book_btn_text" value="<?php echo esc_attr($current_settings['hero_book_btn_text'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero Call Button Background</th>
                        <td><input type="color" name="hero_call_btn_bg" value="<?php echo esc_attr($current_settings['hero_call_btn_bg'] ?? '#232834'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero Call Button Text Color</th>
                        <td><input type="color" name="hero_call_btn_text" value="<?php echo esc_attr($current_settings['hero_call_btn_text'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero Book Button Link</th>
                        <td><input type="url" name="hero_book_btn_link" value="<?php echo esc_attr($current_settings['hero_book_btn_link'] ?? '#'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero Call Button Link</th>
                        <td><input type="url" name="hero_call_btn_link" value="<?php echo esc_attr($current_settings['hero_call_btn_link'] ?? 'tel:'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Hero Section Padding</th>
                        <td><input type="number" name="hero_padding" value="<?php echo esc_attr($current_settings['hero_padding'] ?? 90); ?>" class="small-text" /> px</td>
                    </tr>
                </table>
            </div>
            
            <div id="service-settings" style="margin-bottom: 30px;">
                <h2>Services - Complete Settings</h2>
                <p>Configure all service-related settings including homepage service section and individual service pages.</p>
                
                <h3>Service Section (Homepage)</h3>
                <table class="form-table">
                    <tr>
                        <th scope="row">Services Section Visible</th>
                        <td>
                            <label>
                                <input type="checkbox" name="services_visible" value="1" <?php checked($current_settings['services_visible'] ?? true, true); ?> />
                                Show services section on homepage
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Services Label</th>
                        <td><input type="text" name="services_label" value="<?php echo esc_attr($current_settings['services_label'] ?? 'TOP RATED ROOFING SERVICES'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Services Title</th>
                        <td><input type="text" name="services_title" value="<?php echo esc_attr($current_settings['services_title'] ?? 'Our Services'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Services Subtitle</th>
                        <td><input type="text" name="services_subtitle" value="<?php echo esc_attr($current_settings['services_subtitle'] ?? 'Professional solutions for all your needs'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Services CTA Text</th>
                        <td><input type="text" name="services_cta_text" value="<?php echo esc_attr($current_settings['services_cta_text'] ?? 'Get A Free Estimate'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Services CTA Link</th>
                        <td><input type="url" name="services_cta_link" value="<?php echo esc_attr($current_settings['services_cta_link'] ?? '#'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Services Background Color</th>
                        <td><input type="color" name="services_bg_color" value="<?php echo esc_attr($current_settings['services_bg_color'] ?? '#313746'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Services Text Color</th>
                        <td><input type="color" name="services_text_color" value="<?php echo esc_attr($current_settings['services_text_color'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Services Card Background</th>
                        <td><input type="color" name="services_card_color" value="<?php echo esc_attr($current_settings['services_card_color'] ?? '#232834'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Services Icon Color</th>
                        <td><input type="color" name="services_icon_color" value="<?php echo esc_attr($current_settings['services_icon_color'] ?? '#2ee6c5'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Services CTA Background</th>
                        <td><input type="color" name="services_cta_bg" value="<?php echo esc_attr($current_settings['services_cta_bg'] ?? '#2ee6c5'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Services CTA Text Color</th>
                        <td><input type="color" name="services_cta_text_color" value="<?php echo esc_attr($current_settings['services_cta_text_color'] ?? '#232834'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Services Card Border Radius</th>
                        <td><input type="number" name="services_card_radius" value="<?php echo esc_attr($current_settings['services_card_radius'] ?? 12); ?>" class="small-text" /> px</td>
                    </tr>
                    <tr>
                        <th scope="row">Services Section Padding</th>
                        <td><input type="number" name="services_padding" value="<?php echo esc_attr($current_settings['services_padding'] ?? 80); ?>" class="small-text" /> px</td>
                    </tr>
                </table>
                
                <h3>Individual Service Pages</h3>
                <table class="form-table">
                    <tr>
                        <th scope="row">Service Hero Heading Color</th>
                        <td><input type="color" name="service_hero_heading_color" value="<?php echo esc_attr($current_settings['service_hero_heading_color'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Service Hero Description Color</th>
                        <td><input type="color" name="service_hero_description_color" value="<?php echo esc_attr($current_settings['service_hero_description_color'] ?? '#cfd8dc'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Service Contact Title</th>
                        <td><input type="text" name="services_contact_title" value="<?php echo esc_attr($current_settings['services_contact_title'] ?? 'GET A QUOTE'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Service Contact Description</th>
                        <td><textarea name="services_contact_description" rows="3" class="large-text"><?php echo esc_textarea($current_settings['services_contact_description'] ?? ''); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">Service Contact Box Background</th>
                        <td><input type="color" name="service_contact_box_bg" value="<?php echo esc_attr($current_settings['service_contact_box_bg'] ?? '#2a3440'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Service Contact Box Text Color</th>
                        <td><input type="color" name="service_contact_box_text" value="<?php echo esc_attr($current_settings['service_contact_box_text'] ?? '#cfd8dc'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Service Contact Icons Color</th>
                        <td><input type="color" name="service_contact_icons_color" value="<?php echo esc_attr($current_settings['service_contact_icons_color'] ?? '#2ee6c5'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Service Content Background Color</th>
                        <td><input type="color" name="service_content_bg_color" value="<?php echo esc_attr($current_settings['service_content_bg_color'] ?? '#232834'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Service Content Padding</th>
                        <td><input type="number" name="service_content_padding" value="<?php echo esc_attr($current_settings['service_content_padding'] ?? 80); ?>" class="small-text" /> px</td>
                    </tr>
                </table>
                
                <h3>Service Items Management</h3>
                <table class="form-table">
                    <tr>
                        <th scope="row">Services JSON</th>
                        <td>
                            <textarea name="services_json" rows="10" class="large-text" style="font-family: monospace; font-size: 12px;"><?php echo esc_textarea(json_encode($current_settings['services'] ?? [], JSON_PRETTY_PRINT)); ?></textarea>
                            <p class="description">Edit your services array. Each service should have: id, name, description, icon, image, content, slug</p>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div id="location-settings" style="margin-bottom: 30px;">
                <h2>Locations - Complete Settings</h2>
                <p>Configure all location-related settings including homepage locations section and individual location pages.</p>
                
                <h3>Locations Section (Homepage)</h3>
                <table class="form-table">
                    <tr>
                        <th scope="row">Locations Section Visible</th>
                        <td>
                            <label>
                                <input type="checkbox" name="locations_visible" value="1" <?php checked($current_settings['locations_visible'] ?? true, true); ?> />
                                Show locations section on homepage
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Locations Label</th>
                        <td><input type="text" name="locations_label" value="<?php echo esc_attr($current_settings['locations_label'] ?? 'SERVICE AREAS'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Locations Title</th>
                        <td><input type="text" name="locations_title" value="<?php echo esc_attr($current_settings['locations_title'] ?? 'Proudly Serving Orlando And The Surrounding Areas'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Locations Description</th>
                        <td><textarea name="locations_description" rows="3" class="large-text"><?php echo esc_textarea($current_settings['locations_description'] ?? 'Proudly serving Orlando and surrounding areas in Florida'); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">Locations Background Color</th>
                        <td><input type="color" name="locations_bg_color" value="<?php echo esc_attr($current_settings['locations_bg_color'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Locations Text Color</th>
                        <td><input type="color" name="locations_text_color" value="<?php echo esc_attr($current_settings['locations_text_color'] ?? '#232834'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Locations Card Background</th>
                        <td><input type="color" name="locations_card_bg" value="<?php echo esc_attr($current_settings['locations_card_bg'] ?? '#f8f9fa'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Show Map</th>
                        <td>
                            <label>
                                <input type="checkbox" name="locations_show_map" value="1" <?php checked($current_settings['locations_show_map'] ?? true, true); ?> />
                                Show map in locations section
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Map Embed Code</th>
                        <td><textarea name="locations_map_embed" rows="3" class="large-text"><?php echo esc_textarea($current_settings['locations_map_embed'] ?? ''); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">Locations Section Padding</th>
                        <td><input type="number" name="locations_padding" value="<?php echo esc_attr($current_settings['locations_padding'] ?? 80); ?>" class="small-text" /> px</td>
                    </tr>
                </table>
                
                <h3>Individual Location Pages</h3>
                <table class="form-table">
                    <tr>
                        <th scope="row">Location Hero Heading Color</th>
                        <td><input type="color" name="location_hero_heading_color" value="<?php echo esc_attr($current_settings['location_hero_heading_color'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Location Hero Description Color</th>
                        <td><input type="color" name="location_hero_description_color" value="<?php echo esc_attr($current_settings['location_hero_description_color'] ?? '#cfd8dc'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Location Contact Title</th>
                        <td><input type="text" name="location_contact_title" value="<?php echo esc_attr($current_settings['location_contact_title'] ?? 'GET A QUOTE'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Location Contact Description</th>
                        <td><textarea name="location_contact_description" rows="3" class="large-text"><?php echo esc_textarea($current_settings['location_contact_description'] ?? ''); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">Location Contact Box Background</th>
                        <td><input type="color" name="location_contact_box_bg" value="<?php echo esc_attr($current_settings['location_contact_box_bg'] ?? '#2a3440'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Location Contact Box Text Color</th>
                        <td><input type="color" name="location_contact_box_text" value="<?php echo esc_attr($current_settings['location_contact_box_text'] ?? '#cfd8dc'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Location Contact Icons Color</th>
                        <td><input type="color" name="location_contact_icons_color" value="<?php echo esc_attr($current_settings['location_contact_icons_color'] ?? '#2ee6c5'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Location Content Background Color</th>
                        <td><input type="color" name="location_content_bg_color" value="<?php echo esc_attr($current_settings['location_content_bg_color'] ?? '#232834'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Location Content Padding</th>
                        <td><input type="number" name="location_content_padding" value="<?php echo esc_attr($current_settings['location_content_padding'] ?? 80); ?>" class="small-text" /> px</td>
                    </tr>
                </table>
                
                <h3>Location Items Management</h3>
                <table class="form-table">
                    <tr>
                        <th scope="row">Locations JSON</th>
                        <td>
                            <textarea name="locations_json" rows="10" class="large-text" style="font-family: monospace; font-size: 12px;"><?php echo esc_textarea(json_encode($current_settings['locations'] ?? [], JSON_PRETTY_PRINT)); ?></textarea>
                            <p class="description">Edit your locations array. Each location should have: id, name, state, zip, description, slug</p>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div id="about-settings" style="margin-bottom: 30px;">
                <h2>About - Complete Settings</h2>
                <p>Configure all about-related settings including homepage about section and about page.</p>
                
                <h3>About Section (Homepage)</h3>
                <table class="form-table">
                    <tr>
                        <th scope="row">About Section Visible</th>
                        <td>
                            <label>
                                <input type="checkbox" name="about_visible" value="1" <?php checked($current_settings['about_visible'] ?? true, true); ?> />
                                Show about section on homepage
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">About Description</th>
                        <td><textarea name="about_description" rows="3" class="large-text"><?php echo esc_textarea($current_settings['about_description'] ?? ''); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">About Home Image URL</th>
                        <td><input type="url" name="about_home_image" value="<?php echo esc_attr($current_settings['about_home_image'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">About Image URL</th>
                        <td><input type="url" name="about_image" value="<?php echo esc_attr($current_settings['about_image'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">About Background Color</th>
                        <td><input type="color" name="about_bg_color" value="<?php echo esc_attr($current_settings['about_bg_color'] ?? '#f8f9fa'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">About Text Color</th>
                        <td><input type="color" name="about_text_color" value="<?php echo esc_attr($current_settings['about_text_color'] ?? '#23282d'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">About Tagline</th>
                        <td><input type="text" name="about_tagline" value="<?php echo esc_attr($current_settings['about_tagline'] ?? 'WHO WE ARE'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">About Tagline Color</th>
                        <td><input type="color" name="about_tagline_color" value="<?php echo esc_attr($current_settings['about_tagline_color'] ?? '#0ea5e9'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">About Heading</th>
                        <td><input type="text" name="about_heading" value="<?php echo esc_attr($current_settings['about_heading'] ?? 'About Our Company'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">About Heading Color</th>
                        <td><input type="color" name="about_heading_color" value="<?php echo esc_attr($current_settings['about_heading_color'] ?? '#000000'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">About Description Color</th>
                        <td><input type="color" name="about_description_color" value="<?php echo esc_attr($current_settings['about_description_color'] ?? '#6b7280'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">About Description Font Size</th>
                        <td><input type="text" name="about_description_font_size" value="<?php echo esc_attr($current_settings['about_description_font_size'] ?? '0.90rem'); ?>" class="regular-text" /></td>
                    </tr>
                </table>
                
                <h3>About Page</h3>
                <table class="form-table">
                    <tr>
                        <th scope="row">About Hero Tagline</th>
                        <td><input type="text" name="about_page_hero_tagline" value="<?php echo esc_attr($current_settings['about_page_hero_tagline'] ?? 'ABOUT'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">About Hero Title</th>
                        <td><input type="text" name="about_page_hero_title" value="<?php echo esc_attr($current_settings['about_page_hero_title'] ?? 'Professional Services You Can Count On'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">About Description</th>
                        <td><textarea name="about_page_who_description" rows="4" class="large-text"><?php echo esc_textarea($current_settings['about_page_who_description'] ?? ''); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">About Team Image URL</th>
                        <td><input type="url" name="about_page_team_image" value="<?php echo esc_attr($current_settings['about_page_team_image'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Who We Are Tagline</th>
                        <td><input type="text" name="about_page_who_we_are_tagline" value="<?php echo esc_attr($current_settings['about_page_who_we_are_tagline'] ?? 'WHO WE ARE'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Who We Are Headline</th>
                        <td><input type="text" name="about_page_who_we_are_headline" value="<?php echo esc_attr($current_settings['about_page_who_we_are_headline'] ?? 'About Our Company'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Who We Are Text Color</th>
                        <td><input type="color" name="about_page_who_we_are_text_color" value="<?php echo esc_attr($current_settings['about_page_who_we_are_text_color'] ?? '#000000'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Who We Are Description Color</th>
                        <td><input type="color" name="about_page_who_we_are_description_color" value="<?php echo esc_attr($current_settings['about_page_who_we_are_description_color'] ?? '#4b5563'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Why Work With Us Heading Color</th>
                        <td><input type="color" name="about_page_why_work_with_us_heading_color" value="<?php echo esc_attr($current_settings['about_page_why_work_with_us_heading_color'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Why Work With Us Subtitle Color</th>
                        <td><input type="color" name="about_page_why_work_with_us_subtitle_color" value="<?php echo esc_attr($current_settings['about_page_why_work_with_us_subtitle_color'] ?? 'rgba(255,255,255,0.9)'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Why Work With Us Item Title Color</th>
                        <td><input type="color" name="about_page_why_work_with_us_item_title_color" value="<?php echo esc_attr($current_settings['about_page_why_work_with_us_item_title_color'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Why Work With Us Item Description Color</th>
                        <td><input type="color" name="about_page_why_work_with_us_item_description_color" value="<?php echo esc_attr($current_settings['about_page_why_work_with_us_item_description_color'] ?? 'rgba(255,255,255,0.9)'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Reviews Text Color</th>
                        <td><input type="color" name="about_page_reviews_text_color" value="<?php echo esc_attr($current_settings['about_page_reviews_text_color'] ?? '#000000'); ?>" /></td>
                    </tr>
                </table>
            </div>
            
            <div id="contact-settings" style="margin-bottom: 30px;">
                <h2>Contact - Complete Settings</h2>
                <p>Configure all contact-related settings including homepage contact section and contact page.</p>
                
                <h3>Contact Section</h3>
                <table class="form-table">
                    <tr>
                        <th scope="row">Contact Section Visible</th>
                        <td>
                            <label>
                                <input type="checkbox" name="contact_visible" value="1" <?php checked($current_settings['contact_visible'] ?? true, true); ?> />
                                Show contact section on homepage
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Heading</th>
                        <td><input type="text" name="contact_heading" value="<?php echo esc_attr($current_settings['contact_heading'] ?? 'Get In Touch'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Description</th>
                        <td><textarea name="contact_description" rows="3" class="large-text"><?php echo esc_textarea($current_settings['contact_description'] ?? 'Ready to get started? Contact us for a free consultation and estimate.'); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">Section Background Color</th>
                        <td><input type="color" name="contact_section_bg_color" value="<?php echo esc_attr($current_settings['contact_section_bg_color'] ?? '#232a36'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Left Side Color (Contact Info)</th>
                        <td><input type="color" name="contact_left_side_color" value="<?php echo esc_attr($current_settings['contact_left_side_color'] ?? '#2ee6c5'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Right Side Color (Form)</th>
                        <td><input type="color" name="contact_right_side_color" value="<?php echo esc_attr($current_settings['contact_right_side_color'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Text Color (Contact Info)</th>
                        <td><input type="color" name="contact_text_color" value="<?php echo esc_attr($current_settings['contact_text_color'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Headline Color</th>
                        <td><input type="color" name="contact_headline_color" value="<?php echo esc_attr($current_settings['contact_headline_color'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Description Color</th>
                        <td><input type="color" name="contact_description_color" value="<?php echo esc_attr($current_settings['contact_description_color'] ?? 'rgba(255,255,255,0.9)'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Contact Section Padding</th>
                        <td><input type="number" name="contact_padding" value="<?php echo esc_attr($current_settings['contact_padding'] ?? 80); ?>" class="small-text" /> px</td>
                    </tr>
                </table>
            </div>
            
            <div id="footer-settings" style="margin-bottom: 30px;">
                <h2>Footer - Complete Settings</h2>
                <p>Configure footer appearance and content.</p>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">Show Footer Section</th>
                        <td>
                            <label>
                                <input type="checkbox" name="footer_visible" value="1" <?php checked($current_settings['footer_visible'] ?? true, true); ?> />
                                Show this section
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Section Background Color</th>
                        <td><input type="color" name="footer_bg_color" value="<?php echo esc_attr($current_settings['footer_bg_color'] ?? '#1a1a1a'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Text Color</th>
                        <td><input type="color" name="footer_links_color" value="<?php echo esc_attr($current_settings['footer_links_color'] ?? '#cccccc'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Section Padding (px)</th>
                        <td><input type="number" name="footer_padding" value="<?php echo esc_attr($current_settings['footer_padding'] ?? 60); ?>" class="small-text" min="20" max="200" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Footer Address</th>
                        <td><textarea name="footer_address" rows="3" class="large-text" placeholder="Footer address..."><?php echo esc_textarea($current_settings['footer_address'] ?? ''); ?></textarea></td>
                    </tr>
                </table>
            </div>
            
            <div id="features-settings" style="margin-bottom: 30px;">
                <h2>Features - Complete Settings</h2>
                <p>Configure all features section settings for the homepage.</p>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">Features Section Visible</th>
                        <td>
                            <label>
                                <input type="checkbox" name="features_visible" value="1" <?php checked($current_settings['features_visible'] ?? true, true); ?> />
                                Show features section on homepage
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Features Label</th>
                        <td><input type="text" name="features_label" value="<?php echo esc_attr($current_settings['features_label'] ?? 'WHY CHOOSE US'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Features Title</th>
                        <td><input type="text" name="features_title" value="<?php echo esc_attr($current_settings['features_title'] ?? 'What Makes Us Different'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Features Description</th>
                        <td><textarea name="features_description" rows="3" class="large-text"><?php echo esc_textarea($current_settings['features_description'] ?? 'test'); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">Features Background Color</th>
                        <td><input type="color" name="features_bg_color" value="<?php echo esc_attr($current_settings['features_bg_color'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Features Text Color</th>
                        <td><input type="color" name="features_text_color" value="<?php echo esc_attr($current_settings['features_text_color'] ?? '#232834'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Features Card Background</th>
                        <td><input type="color" name="features_card_bg" value="<?php echo esc_attr($current_settings['features_card_bg'] ?? '#f8f9fa'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Features Icon Color</th>
                        <td><input type="color" name="features_icon_color" value="<?php echo esc_attr($current_settings['features_icon_color'] ?? '#2563eb'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Features Section Padding</th>
                        <td><input type="number" name="features_padding" value="<?php echo esc_attr($current_settings['features_padding'] ?? 80); ?>" class="small-text" /> px</td>
                    </tr>
                </table>
                
                <h3>Features Items Management</h3>
                <table class="form-table">
                    <tr>
                        <th scope="row">Features JSON</th>
                        <td>
                            <textarea name="features_json" rows="10" class="large-text" style="font-family: monospace; font-size: 12px;"><?php echo esc_textarea(json_encode($current_settings['features'] ?? [], JSON_PRETTY_PRINT)); ?></textarea>
                            <p class="description">Edit your features array. Each feature should have: id, title, description, icon</p>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div id="reviews-settings" style="margin-bottom: 30px;">
                <h2>Reviews - Complete Settings</h2>
                <p>Configure all reviews section settings for the homepage.</p>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">Reviews Section Visible</th>
                        <td>
                            <label>
                                <input type="checkbox" name="reviews_visible" value="1" <?php checked($current_settings['reviews_visible'] ?? true, true); ?> />
                                Show reviews section on homepage
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Reviews Label</th>
                        <td><input type="text" name="reviews_label" value="<?php echo esc_attr($current_settings['reviews_label'] ?? 'CUSTOMER REVIEWS'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Reviews Title</th>
                        <td><input type="text" name="reviews_title" value="<?php echo esc_attr($current_settings['reviews_title'] ?? 'What Our Customers Say'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Reviews Background Color</th>
                        <td><input type="color" name="reviews_bg_color" value="<?php echo esc_attr($current_settings['reviews_bg_color'] ?? '#f8f9fa'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Reviews Text Color</th>
                        <td><input type="color" name="reviews_text_color" value="<?php echo esc_attr($current_settings['reviews_text_color'] ?? '#232834'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Reviews Card Background</th>
                        <td><input type="color" name="reviews_card_bg" value="<?php echo esc_attr($current_settings['reviews_card_bg'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Reviews Star Color</th>
                        <td><input type="color" name="reviews_star_color" value="<?php echo esc_attr($current_settings['reviews_star_color'] ?? '#fbbf24'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Reviews Section Padding</th>
                        <td><input type="number" name="reviews_padding" value="<?php echo esc_attr($current_settings['reviews_padding'] ?? 80); ?>" class="small-text" /> px</td>
                    </tr>
                </table>
                
                <h3>Reviews Items Management</h3>
                <table class="form-table">
                    <tr>
                        <th scope="row">Reviews JSON</th>
                        <td>
                            <textarea name="reviews_json" rows="10" class="large-text" style="font-family: monospace; font-size: 12px;"><?php echo esc_textarea(json_encode($current_settings['reviews'] ?? [], JSON_PRETTY_PRINT)); ?></textarea>
                            <p class="description">Edit your reviews array. Each review should have: id, name, rating, comment, date</p>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div id="commitment-settings" style="margin-bottom: 30px;">
                <h2>Commitment - Complete Settings</h2>
                <p>Configure all commitment section settings for the homepage.</p>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">Commitment Section Visible</th>
                        <td>
                            <label>
                                <input type="checkbox" name="commitment_visible" value="1" <?php checked($current_settings['commitment_visible'] ?? true, true); ?> />
                                Show commitment section on homepage
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Commitment Label</th>
                        <td><input type="text" name="commitment_label" value="<?php echo esc_attr($current_settings['commitment_label'] ?? 'OUR COMMITMENT'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Commitment Title</th>
                        <td><input type="text" name="commitment_title" value="<?php echo esc_attr($current_settings['commitment_title'] ?? 'Our Promise to You'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Commitment Subtitle</th>
                        <td><input type="text" name="commitment_subtitle" value="<?php echo esc_attr($current_settings['commitment_subtitle'] ?? 'We promise to deliver exceptional service'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Commitment Text</th>
                        <td><textarea name="commitment_text" rows="3" class="large-text"><?php echo esc_textarea($current_settings['commitment_text'] ?? ''); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">Commitment Image URL</th>
                        <td><input type="url" name="commitment_image" value="<?php echo esc_attr($current_settings['commitment_image'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Commitment Background Color</th>
                        <td><input type="color" name="commitment_bg_color" value="<?php echo esc_attr($current_settings['commitment_bg_color'] ?? '#232834'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Commitment Text Color</th>
                        <td><input type="color" name="commitment_text_color" value="<?php echo esc_attr($current_settings['commitment_text_color'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Commitment Section Padding</th>
                        <td><input type="number" name="commitment_padding" value="<?php echo esc_attr($current_settings['commitment_padding'] ?? 80); ?>" class="small-text" /> px</td>
                    </tr>
                </table>
                
                <h3>Commitment Items Management</h3>
                <table class="form-table">
                    <tr>
                        <th scope="row">Commitments JSON</th>
                        <td>
                            <textarea name="commitments_json" rows="10" class="large-text" style="font-family: monospace; font-size: 12px;"><?php echo esc_textarea(json_encode($current_settings['commitments'] ?? [], JSON_PRETTY_PRINT)); ?></textarea>
                            <p class="description">Edit your commitments array. Each commitment should have: id, title, description, icon</p>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div id="faq-settings" style="margin-bottom: 30px;">
                <h2>FAQ - Complete Settings</h2>
                <p>Configure all FAQ section settings for the homepage.</p>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">FAQ Section Visible</th>
                        <td>
                            <label>
                                <input type="checkbox" name="faq_visible" value="1" <?php checked($current_settings['faq_visible'] ?? true, true); ?> />
                                Show FAQ section on homepage
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">FAQ Label</th>
                        <td><input type="text" name="faq_label" value="<?php echo esc_attr($current_settings['faq_label'] ?? 'FREQUENTLY ASKED QUESTIONS'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">FAQ Title</th>
                        <td><input type="text" name="faq_title" value="<?php echo esc_attr($current_settings['faq_title'] ?? 'Frequently Asked Questions'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">FAQ Heading</th>
                        <td><input type="text" name="faq_heading" value="<?php echo esc_attr($current_settings['faq_heading'] ?? 'Frequently Asked Questions'); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">FAQ Description</th>
                        <td><textarea name="faq_desc" rows="3" class="large-text"><?php echo esc_textarea($current_settings['faq_desc'] ?? 'Find answers to common questions about our services, pricing, scheduling, and project timelines.'); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">FAQ Background Color</th>
                        <td><input type="color" name="faq_bg_color" value="<?php echo esc_attr($current_settings['faq_bg_color'] ?? '#232834'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">FAQ Text Color</th>
                        <td><input type="color" name="faq_text_color" value="<?php echo esc_attr($current_settings['faq_text_color'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">FAQ Image URL</th>
                        <td><input type="url" name="faq_image" value="<?php echo esc_attr($current_settings['faq_image'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">FAQ Box Color</th>
                        <td><input type="color" name="faq_box_color" value="<?php echo esc_attr($current_settings['faq_box_color'] ?? '#374151'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">FAQ Toggle Color</th>
                        <td><input type="color" name="faq_toggle_color" value="<?php echo esc_attr($current_settings['faq_toggle_color'] ?? '#2ee6c5'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">FAQ Question Color</th>
                        <td><input type="color" name="faq_question_color" value="<?php echo esc_attr($current_settings['faq_question_color'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">FAQ Answer Color</th>
                        <td><input type="color" name="faq_answer_color" value="<?php echo esc_attr($current_settings['faq_answer_color'] ?? '#b0b0b0'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">FAQ Section Padding</th>
                        <td><input type="number" name="faq_padding" value="<?php echo esc_attr($current_settings['faq_padding'] ?? 80); ?>" class="small-text" /> px</td>
                    </tr>
                </table>
                
                <h3>FAQ Items Management</h3>
                <table class="form-table">
                    <tr>
                        <th scope="row">FAQs JSON</th>
                        <td>
                            <textarea name="faqs_json" rows="10" class="large-text" style="font-family: monospace; font-size: 12px;"><?php echo esc_textarea(json_encode($current_settings['faqs'] ?? [], JSON_PRETTY_PRINT)); ?></textarea>
                            <p class="description">Edit your FAQs array. Each FAQ should have: id, question, answer</p>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div id="footer-settings" style="margin-bottom: 30px;">
                <h2>Footer - Complete Settings</h2>
                <p>Configure all footer settings for the entire website.</p>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">Footer Background Color</th>
                        <td><input type="color" name="footer_bg_color" value="<?php echo esc_attr($current_settings['footer_bg_color'] ?? '#232834'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Footer Text Color</th>
                        <td><input type="color" name="footer_text_color" value="<?php echo esc_attr($current_settings['footer_text_color'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Footer Link Color</th>
                        <td><input type="color" name="footer_link_color" value="<?php echo esc_attr($current_settings['footer_link_color'] ?? '#2ee6c5'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Footer Heading Color</th>
                        <td><input type="color" name="footer_heading_color" value="<?php echo esc_attr($current_settings['footer_heading_color'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Footer Subheading Color</th>
                        <td><input type="color" name="footer_subheading_color" value="<?php echo esc_attr($current_settings['footer_subheading_color'] ?? '#b0b0b0'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Footer Social Icon Color</th>
                        <td><input type="color" name="footer_social_icon_color" value="<?php echo esc_attr($current_settings['footer_social_icon_color'] ?? '#2ee6c5'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Footer Social Hover Color</th>
                        <td><input type="color" name="footer_social_hover_color" value="<?php echo esc_attr($current_settings['footer_social_hover_color'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Footer Logo URL</th>
                        <td><input type="url" name="footer_logo" value="<?php echo esc_attr($current_settings['footer_logo'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Footer Business Name</th>
                        <td><input type="text" name="footer_business_name" value="<?php echo esc_attr($current_settings['footer_business_name'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Footer Email</th>
                        <td><input type="email" name="footer_email" value="<?php echo esc_attr($current_settings['footer_email'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Footer Phone</th>
                        <td><input type="text" name="footer_phone" value="<?php echo esc_attr($current_settings['footer_phone'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Footer Hours</th>
                        <td><input type="text" name="footer_hours" value="<?php echo esc_attr($current_settings['footer_hours'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Footer Address</th>
                        <td><textarea name="footer_address" rows="3" class="large-text"><?php echo esc_textarea($current_settings['footer_address'] ?? ''); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row">Footer Copyright</th>
                        <td><input type="text" name="footer_copyright" value="<?php echo esc_attr($current_settings['footer_copyright'] ?? '© 2025 Your Business. All rights reserved.'); ?>" class="large-text" /></td>
                    </tr>
                </table>
            </div>
            
            <div id="header-settings" style="margin-bottom: 30px;">
                <h2>Header - Complete Settings</h2>
                <p>Configure all header/navigation settings for the entire website.</p>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">Header Background Color</th>
                        <td><input type="color" name="header_bg_color" value="<?php echo esc_attr($current_settings['header_bg_color'] ?? '#232834'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Header Text Color</th>
                        <td><input type="color" name="header_text_color" value="<?php echo esc_attr($current_settings['header_text_color'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Header Link Color</th>
                        <td><input type="color" name="header_link_color" value="<?php echo esc_attr($current_settings['header_link_color'] ?? '#ffffff'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Header Link Hover Color</th>
                        <td><input type="color" name="header_link_hover_color" value="<?php echo esc_attr($current_settings['header_link_hover_color'] ?? '#2ee6c5'); ?>" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Header Logo URL</th>
                        <td><input type="url" name="header_logo" value="<?php echo esc_attr($current_settings['header_logo'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                    <tr>
                        <th scope="row">Header Logo Width</th>
                        <td><input type="number" name="header_logo_width" value="<?php echo esc_attr($current_settings['header_logo_width'] ?? 150); ?>" class="small-text" /> px</td>
                    </tr>
                    <tr>
                        <th scope="row">Header Logo Height</th>
                        <td><input type="number" name="header_logo_height" value="<?php echo esc_attr($current_settings['header_logo_height'] ?? 50); ?>" class="small-text" /> px</td>
                    </tr>
                    <tr>
                        <th scope="row">Header Padding Top</th>
                        <td><input type="number" name="header_padding_top" value="<?php echo esc_attr($current_settings['header_padding_top'] ?? 20); ?>" class="small-text" /> px</td>
                    </tr>
                    <tr>
                        <th scope="row">Header Padding Bottom</th>
                        <td><input type="number" name="header_padding_bottom" value="<?php echo esc_attr($current_settings['header_padding_bottom'] ?? 20); ?>" class="small-text" /> px</td>
                    </tr>
                    <tr>
                        <th scope="row">Header Sticky</th>
                        <td>
                            <label>
                                <input type="checkbox" name="header_sticky" value="1" <?php checked($current_settings['header_sticky'] ?? true, true); ?> />
                                Make header sticky on scroll
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Header Shadow</th>
                        <td>
                            <label>
                                <input type="checkbox" name="header_shadow" value="1" <?php checked($current_settings['header_shadow'] ?? true, true); ?> />
                                Add shadow to header
                            </label>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div id="advanced" style="margin-bottom: 30px;">
                <h2>Advanced Settings (JSON Editor)</h2>
                <p>For advanced users: Edit the complete settings JSON below:</p>
            <textarea name="bsg_settings" rows="30" cols="100" style="font-family: monospace; font-size: 12px;"><?php echo esc_textarea(json_encode($current_settings, JSON_PRETTY_PRINT)); ?></textarea>
            </div>
            
            <p class="submit">
                <input type="submit" name="save_bsg_settings" class="button button-primary" value="Save All Settings">
            </p>
        </form>
        
        <h2>Quick View</h2>
        <table class="widefat">
            <tr>
                <th>Business Name</th>
                <td><?php echo esc_html($current_settings['business_name'] ?? 'Not set'); ?></td>
            </tr>
            <tr>
                <th>Phone</th>
                <td><?php echo esc_html($current_settings['phone'] ?? 'Not set'); ?></td>
            </tr>
            <tr>
                <th>Email</th>
                <td><?php echo esc_html($current_settings['email'] ?? 'Not set'); ?></td>
            </tr>
            <tr>
                <th>Address</th>
                <td><?php echo esc_html($current_settings['address'] ?? 'Not set'); ?></td>
            </tr>
            <tr>
                <th>State</th>
                <td><?php echo esc_html($current_settings['state'] ?? 'Not set'); ?></td>
            </tr>
            <tr>
                <th>Services Count</th>
                <td><?php echo count($current_settings['services'] ?? []); ?> services configured</td>
            </tr>
            <tr>
                <th>Locations Count</th>
                <td><?php echo count($current_settings['locations'] ?? []); ?> locations configured</td>
            </tr>
        </table>
    </div>
    
    <style>
    .form-table th { width: 200px; }
    .form-table input[type="color"] { width: 60px; height: 30px; }
    .form-table input[type="number"] { width: 80px; }
    </style>
    <?php
}

// Clear cache when settings are updated for better performance
function bsg_clear_cache_on_settings_update() {
    delete_transient('bsg_settings_cache');
    delete_transient('bsg_dynamic_css_cache');
}
add_action('update_option_bsg_settings', 'bsg_clear_cache_on_settings_update');

// Clear cache when theme is activated to ensure fresh start
function bsg_clear_all_cache() {
    delete_transient('bsg_settings_cache');
    delete_transient('bsg_dynamic_css_cache');
    delete_transient('bsg_pages_creation_last_run');
}
add_action('after_switch_theme', 'bsg_clear_all_cache');

// Add error handling for missing functions
if (!function_exists('bsg_get_business_info')) {
}

// Add fallback functions for missing theme functions
if (!function_exists('bsg_get_about_settings')) {
    function bsg_get_about_settings() {
        return [];
    }
}

if (!function_exists('bsg_get_commitment_settings')) {
    function bsg_get_commitment_settings() {
        return [];
    }
}

if (!function_exists('bsg_get_reviews_settings')) {
    function bsg_get_reviews_settings() {
        return [];
    }
}

if (!function_exists('bsg_get_contact_settings')) {
    function bsg_get_contact_settings() {
        return [];
    }
}

if (!function_exists('bsg_get_section_visibility')) {
    function bsg_get_section_visibility() {
        return [];
    }
}

// ========================================
// IMAGE OPTIMIZATION FUNCTIONS
// ========================================

// Enable WebP and AVIF image formats
function bsg_add_image_support() {
    add_theme_support('webp');
    add_theme_support('avif');
}
add_action('after_setup_theme', 'bsg_add_image_support');

// Add responsive image sizes
function bsg_add_image_sizes() {
    add_image_size('hero-large', 1920, 1080, true);
    add_image_size('hero-medium', 1200, 675, true);
    add_image_size('hero-small', 800, 450, true);
    add_image_size('team-large', 600, 600, true);
    add_image_size('team-medium', 400, 400, true);
    add_image_size('team-small', 300, 300, true);
    add_image_size('content-large', 800, 600, true);
    add_image_size('content-medium', 600, 450, true);
    add_image_size('content-small', 400, 300, true);
}
add_action('after_setup_theme', 'bsg_add_image_sizes');

// Generate WebP versions of uploaded images
function bsg_generate_webp_images($attachment_id) {
    $file_path = get_attached_file($attachment_id);
    if (!$file_path || !file_exists($file_path)) {
        return;
    }
    
    $file_info = pathinfo($file_path);
    $webp_path = $file_info['dirname'] . '/' . $file_info['filename'] . '.webp';
    
    // Only convert if WebP doesn't exist
    if (!file_exists($webp_path)) {
        $image = wp_get_image_editor($file_path);
        if (!is_wp_error($image)) {
            $image->set_quality(85);
            $image->save($webp_path, 'image/webp');
        }
    }
}
add_action('wp_generate_attachment_metadata', 'bsg_generate_webp_images');

// Serve WebP images when supported
function bsg_serve_webp_images($html, $attachment_id) {
    if (strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'image/webp') !== false) {
        $file_path = get_attached_file($attachment_id);
        if ($file_path) {
            $file_info = pathinfo($file_path);
            $webp_path = $file_info['dirname'] . '/' . $file_info['filename'] . '.webp';
            
            if (file_exists($webp_path)) {
                $webp_url = str_replace($file_info['dirname'], dirname(wp_get_attachment_url($attachment_id)), $webp_path);
                $html = str_replace(wp_get_attachment_url($attachment_id), $webp_url, $html);
            }
        }
    }
    return $html;
}
add_filter('wp_get_attachment_image', 'bsg_serve_webp_images', 10, 2);

// Optimize image compression
function bsg_optimize_image_quality($quality, $mime_type) {
    switch ($mime_type) {
        case 'image/jpeg':
            return 85; // Reduce from default 90 to 85
        case 'image/png':
            return 9; // PNG compression level (0-9)
        case 'image/webp':
            return 85; // WebP quality
        default:
            return $quality;
    }
}
add_filter('wp_editor_set_quality', 'bsg_optimize_image_quality', 10, 2);

// Add lazy loading to images
function bsg_add_lazy_loading($attr, $attachment, $size) {
    if (!isset($attr['loading'])) {
        $attr['loading'] = 'lazy';
    }
    if (!isset($attr['decoding'])) {
        $attr['decoding'] = 'async';
    }
    return $attr;
}
add_filter('wp_get_attachment_image_attributes', 'bsg_add_lazy_loading', 10, 3);

// Add responsive image srcset
function bsg_add_responsive_images($html, $attachment_id, $size, $icon, $attr) {
    $image_sizes = array(
        'hero-large' => '(min-width: 1200px)',
        'hero-medium' => '(min-width: 768px)',
        'hero-small' => '(max-width: 767px)',
        'team-large' => '(min-width: 600px)',
        'team-medium' => '(min-width: 400px)',
        'team-small' => '(max-width: 399px)',
        'content-large' => '(min-width: 800px)',
        'content-medium' => '(min-width: 600px)',
        'content-small' => '(max-width: 599px)'
    );
    
    $srcset = array();
    foreach ($image_sizes as $size_name => $media_query) {
        $image_url = wp_get_attachment_image_url($attachment_id, $size_name);
        if ($image_url) {
            $image_meta = wp_get_attachment_metadata($attachment_id);
            if (isset($image_meta['sizes'][$size_name])) {
                $width = $image_meta['sizes'][$size_name]['width'];
                $srcset[] = $image_url . ' ' . $width . 'w';
            }
        }
    }
    
    if (!empty($srcset)) {
        $html = str_replace('<img', '<img srcset="' . implode(', ', $srcset) . '"', $html);
    }
    
    return $html;
}
add_filter('wp_get_attachment_image', 'bsg_add_responsive_images', 10, 5);

// Compress existing images on upload
function bsg_compress_uploaded_images($metadata, $attachment_id) {
    if (isset($metadata['file'])) {
        $file_path = get_attached_file($attachment_id);
        if ($file_path && file_exists($file_path)) {
            $image = wp_get_image_editor($file_path);
            if (!is_wp_error($image)) {
                $image->set_quality(85);
                $image->save($file_path);
            }
        }
    }
    return $metadata;
}
add_filter('wp_generate_attachment_metadata', 'bsg_compress_uploaded_images', 10, 2);
