import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Create comprehensive bsg_settings object with all wizard data
    const bsgSettings = {
      // Basic business info
      business_name: data.business_name || data.company || 'Your Business',
      business_logo: data.business_logo || '',
      business_type: data.business_type || data.industry || 'service',
      phone: data.phone || '',
      email: data.email || '',
      address: data.address || '',
      location: data.location || data.city || '',
      state: data.state || '',
      zip: data.zip || '',
      about_years: data.about_years || 15,
      
      // API and theme settings
      openai_api_key: data.openai_api_key || '',
      openrouter_api_key: data.openrouter_api_key || '',
      color_theme: data.color_theme || 'amber',
      admin_theme: data.admin_theme || 'dark',
      use_dynamic_template: data.use_dynamic_template !== undefined ? data.use_dynamic_template : true,
      
      // Global theme colors derived from color_theme selection
      global_primary_color: data.global_primary_color || '',
      global_secondary_color: data.global_secondary_color || '',
      global_accent_color: data.global_accent_color || '',
      nav_bg_color: data.nav_bg_color || '',
      nav_text_color: data.nav_text_color || '',
      heading_color: data.heading_color || '',
      button_primary_color: data.button_primary_color || '',
      button_secondary_color: data.button_secondary_color || '',
      text_color: data.text_color || '',
      surface_color: data.surface_color || '',
      
      // Hero section settings
      hero_visible: data.hero_visible !== undefined ? data.hero_visible : true,
      hero_headline: data.hero_headline || 'Find Best Roofers Near You',
      hero_subheadline: data.hero_subheadline || 'Contact Us Now to Get Going!',
      hero_cta: data.hero_cta || 'Rated 5 Stars On Google',
      hero_bg_color: data.hero_bg_color || '',
      hero_bg_image: data.hero_bg_image || '',
      hero_heading_color: data.hero_heading_color || '',
      hero_subheading_color: data.hero_subheading_color || '',
      hero_company_color: data.hero_company_color || '',
      hero_book_btn_text: data.hero_book_btn_text || '',
      hero_book_btn_bg: data.hero_book_btn_bg || '',
      hero_call_btn_text: data.hero_call_btn_text || '',
      hero_call_btn_bg: data.hero_call_btn_bg || '',
      hero_reviews_star_color: data.hero_reviews_star_color || '',
      hero_reviews_text_color: data.hero_reviews_text_color || '',
      hero_padding: data.hero_padding || 80,
      
      // Features section settings
      features_visible: data.features_visible !== undefined ? data.features_visible : true,
      features_label: data.features_label || 'WHY CHOOSE US',
      features_title: data.features_title || 'What Makes Us Different',
      features_description: data.features_description || '',
      features_bg_color: data.features_bg_color || '#ffffff',
      features_card_bg: data.features_card_bg || '#f8f9fa',
      features_text_color: data.features_text_color || '#23282d',
      features_icon_color: data.features_icon_color || '#14b8a6',
      features_padding: data.features_padding || 58,
      features: data.features || [],
      
      // About section settings
      about_visible: data.about_visible !== undefined ? data.about_visible : true,
      about_label: data.about_label || 'ABOUT US',
      about_title: data.about_title || 'Your Trusted Roofing Partner',
      about_description: data.about_description || '',
      about_image: data.about_image || '',
      about_home_image: data.about_image || '',
      about_bg_color: data.about_bg_color || '#f8f9fa',
      about_text_color: data.about_text_color || '#23282d',
      about_heading_color: data.about_heading_color || '#000000',
      about_description_color: data.about_description_color || '#6b7280',
      about_description_font_size: data.about_description_font_size || '0.90rem',
      about_margin_left: data.about_margin_left || 60,
      about_margin_right: data.about_margin_right || 60,
      about_experience_text: data.about_experience_text || 'Years of Experience',
      about_experience_bg: data.about_experience_bg || '#374151',
      about_experience_text_color: data.about_experience_text_color || '#4ecdc4',
      about_button_text: data.about_button_text || 'About Us',
      about_button_link: data.about_button_link || '/about-us',
      about_button_color: data.about_button_color || '#2563eb',
      about_button_text_color: data.about_button_text_color || '#ffffff',
      
      // Services section settings
      services_visible: data.services_visible !== undefined ? data.services_visible : true,
      services_label: data.services_label || 'TOP RATED SERVICES',
      services_title: data.services_title || 'Our Services',
      services_description: data.services_description || '',
      services_bg_color: data.services_bg_color || '#313746',
      services_text_color: data.services_text_color || '#ffffff',
      services_card_color: data.services_card_color || '#ffffff',
      services_icon_color: data.services_icon_color || '#2ee6c5',
      services_button_text: data.services_button_text || '#2ee6c5',
      services_padding: data.services_padding || 40,
      services_cta_text: data.services_cta_text || '',
      services_cta_link: data.services_cta_link || '',
      services_cta_bg: data.services_cta_bg || '',
      services_cta_text_color: data.services_cta_text_color || '',
      services: data.services || [],
      
      // Service areas section settings
      locations_visible: data.locations_visible !== undefined ? data.locations_visible : true,
      locations_label: data.locations_label || 'OUR SERVICE AREA',
      locations_title: data.locations_title || 'Proudly Serving Boulder And The Surrounding Areas',
      locations_description: data.locations_description || 'Proudly serving Boulder and the Front Range, including Longmont, Louisville, Lafayette, Erie, Superior, Broomfield, Westminster and nearby areas',
      locations_bg_color: data.locations_bg_color || '#232834',
      locations_card_bg: data.locations_card_bg || '#ffffff',
      locations_text_color: data.locations_text_color || '#ffffff',
      locations_card_text_color: data.locations_card_text_color || '#232834',
      locations_icon_color: data.locations_icon_color || '#2ee6c5',
      locations_button_color: data.locations_button_color || '#f97316',
      locations_button_text_color: data.locations_button_text_color || '#ffffff',
      locations: (data.locations || []).map((location: any) => ({
        ...location,
        slug: location.name ? 
          location.name.toLowerCase().replace(/\s+/g, '-') + (location.zip ? '-' + location.zip : '') : 
          'location'
      })),
      
      // Reviews section settings
      reviews_visible: data.reviews_visible !== undefined ? data.reviews_visible : true,
      reviews_label: data.reviews_label || 'CUSTOMER REVIEWS',
      reviews_title: data.reviews_title || 'What Our Customers Say',
      reviews_heading_color: data.reviews_heading_color || '#1f2937',
      reviews_subtitle_color: data.reviews_subtitle_color || '#6b7280',
      reviews_bg_color: data.reviews_bg_color || '#f8f9fa',
      reviews_card_bg: data.reviews_card_bg || '#ffffff',
      reviews_star_color: data.reviews_star_color || '#fbbf24',
      reviews_padding: data.reviews_padding || 80,
      reviews: data.reviews || [],
      
      // Commitment section settings
      commitment_visible: data.commitment_visible !== undefined ? data.commitment_visible : true,
      commitment_label: data.commitment_label || 'COMMITTED TO QUALITY',
      commitment_title: data.commitment_title || 'Our Promise Of Reliability',
      commitment_text: data.commitment_text || '',
      commitment_button_label: data.commitment_button_label || 'Request An Estimate',
      commitment_button_link: data.commitment_button_link || '#',
      commitment_bg_color: data.commitment_bg_color || '#f8f9fa',
      commitment_text_color: data.commitment_text_color || '#232834',
      commitment_heading_color: data.commitment_heading_color || '#ffffff',
      commitment_subtitle_color: data.commitment_subtitle_color || '#cfd8dc',
      commitment_padding: data.commitment_padding || 40,
      
      // FAQ section settings
      faq_visible: data.faq_visible !== undefined ? data.faq_visible : true,
      faq_title: data.faq_title || 'Frequently Asked Questions',
      faq_subtitle: data.faq_subtitle || 'Get answers to common questions',
      faq_bg_color: data.faq_bg_color || '#f8f9fa',
      faq_text_color: data.faq_text_color || '#232834',
      faq_heading_color: data.faq_heading_color || '#1f2937',
      faq_subtitle_color: data.faq_subtitle_color || '#6b7280',
      faq_padding: data.faq_padding || 80,
      faqs: data.faqs || [],
      
      // Footer settings
      footer_business_name: data.footer_business_name || data.business_name || 'Your Business',
      footer_logo: data.footer_logo || data.business_logo || '',
      footer_email: data.footer_email || data.email || '',
      footer_phone: data.footer_phone || data.phone || '',
      footer_address: data.footer_address || data.address || '',
      footer_hours: data.footer_hours || '',
      footer_copyright: data.footer_copyright || '',
      footer_nav: data.footer_nav || [],
      footer_services: data.footer_services || [],
      footer_social: data.footer_social || [],
      
      // Meta settings
      homepage_meta_title: data.homepage_meta_title || '',
      homepage_meta_description: data.homepage_meta_description || '',
      homepage_meta_keywords: data.homepage_meta_keywords || '',
      
      // Contact section settings
      contact_visible: data.contact_visible !== undefined ? data.contact_visible : true,
      contact_heading: data.contact_heading || 'Get In Touch',
      contact_description: data.contact_description || 'Ready to get started? Contact us for a free consultation and estimate.',
      contact_section_bg_color: data.contact_section_bg_color || '#232a36',
      contact_left_side_color: data.contact_left_side_color || '#2ee6c5',
      contact_right_side_color: data.contact_right_side_color || '#ffffff',
      contact_text_color: data.contact_text_color || '#ffffff',
      contact_headline_color: data.contact_headline_color || '#ffffff',
      contact_description_color: data.contact_description_color || 'rgba(255,255,255,0.9)',
      contact_padding: data.contact_padding || 80,
      contact_meta_title: data.contact_meta_title || '',
      contact_meta_description: data.contact_meta_description || '',
      contact_meta_keywords: data.contact_meta_keywords || '',
      
      // Footer settings
      footer_visible: data.footer_visible !== undefined ? data.footer_visible : true,
      footer_bg_color: data.footer_bg_color || '#1e3a8a',
      footer_heading_color: data.footer_heading_color || '#ffffff',
      footer_links_color: data.footer_links_color || '#cccccc',
      footer_copyright_text: data.footer_copyright_text || '©2025, Your Business Name. All Rights Reserved.',
      footer_disclaimer_text: data.footer_disclaimer_text || 'This website and its content are for informational purposes only. Results may vary based on individual circumstances.',
      footer_padding: data.footer_padding || 60,
      
      // Additional settings
      latitude: data.latitude || '',
      longitude: data.longitude || '',
      business_hours: data.business_hours || 'Mo-Fr 08:00-17:00',
    };

    // Save to Supabase database
    let supabaseSuccess = false;
    if (supabase) {
      try {
        console.log('💾 Saving wizard data to Supabase...');
        
        // Get user email from the request data
        const userEmail = data.user_email || data.email || 'anonymous';
        
        // Save to Supabase - upsert (insert or update) based on user email
        const { data: supabaseData, error: supabaseError } = await supabase
          .from('wizard_data')
          .upsert({
            user_email: userEmail,
            data: bsgSettings,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_email'
          });

        if (supabaseError) {
          console.error('❌ Supabase error:', supabaseError);
        } else {
          console.log('✅ Data saved to Supabase successfully');
          supabaseSuccess = true;
        }
      } catch (error) {
        console.error('❌ Error saving to Supabase:', error);
      }
    } else {
      console.log('⚠️ Supabase not configured, skipping database save');
    }

    // Also save to WordPress if configured
    let wordpressSuccess = false;
    try {
      // Prefer URL coming from the wizard payload, fallback to env
      const incomingWpUrl = (data.wordpress_url || data.wordpressUrl || '').toString().trim();
      const wordpressUrl = incomingWpUrl || process.env.WORDPRESS_URL || 'http://localhost/wordpress';
      
      if (wordpressUrl && wordpressUrl !== 'http://localhost/wordpress') {
        const response = await fetch(`${wordpressUrl.replace(/\/$/, '')}/wp-json/bsg/v1/save-wizard-data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bsgSettings),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('✅ Data saved to WordPress:', result);
          wordpressSuccess = true;
        } else {
          console.error('❌ Failed to save to WordPress:', response.status, response.statusText);
        }
      }
    } catch (error) {
      console.error('❌ Error saving to WordPress:', error);
    }

    // Return success if either Supabase or WordPress save succeeded
    if (supabaseSuccess || wordpressSuccess) {
      return NextResponse.json({ 
        success: true, 
        message: `Wizard data saved successfully${supabaseSuccess ? ' to database' : ''}${wordpressSuccess ? ' to WordPress' : ''}`,
        settings: bsgSettings,
        saved_to: {
          supabase: supabaseSuccess,
          wordpress: wordpressSuccess
        }
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to save data to any storage system',
        settings: bsgSettings 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Error processing wizard data:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process wizard data' 
    }, { status: 500 });
  }
}
