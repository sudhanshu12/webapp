'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Service {
  id: string;
  name: string; // Service Title
  description: string; // Short description
  icon: string;
  image: string;
  content: string; // Service Description (HTML allowed)
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  featuresText?: string; // multiline, one feature per line
  useDefaultPrompt?: boolean;
  customPrompt?: string;
}

interface Location {
  id: string;
  name: string;
  state: string;
  zip: string;
  description: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  useDefaultPrompt?: boolean;
  customPrompt?: string;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}


interface Commitment {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FooterLink {
  id: string;
  title: string;
  url: string;
}

interface FormData {
  business_name: string;
  business_logo: string;
  business_type: string;
  domain_name: string;
  phone: string;
  email: string;
  address: string;
  location: string;
  state: string;
  zip: string;
  about_years: number;
  openai_api_key: string;
  openrouter_api_key: string;
  color_theme: string;
  admin_theme: string;
  use_dynamic_template: boolean;
  homepage_meta_title: string;
  homepage_meta_description: string;
  homepage_meta_keywords: string;
  // Use default color scheme toggle
  use_default_color_scheme?: boolean;
  about_page_meta_title: string;
  about_page_meta_description: string;
  about_page_hero_title: string;
  about_page_hero_subtitle: string;
  about_page_hero_description: string;
  about_page_hero_bg_image: string;
  about_page_content: string;
  about_page_team_title: string;
  about_page_team_description: string;
  about_page_values_title: string;
  about_page_values_description: string;
  hero_visible: boolean;
  hero_headline: string;
  hero_description: string;
  hero_cta: string;
  hero_cta_link: string;
  hero_rating: string;
  hero_bg_image: string;
  hero_bg_color: string;
  hero_padding: number;
  use_global_hero_image: boolean;
  service_page_hero_bg_image: string;
  location_page_hero_bg_image: string;
  hero_company_color: string;
  hero_heading_color: string;
  hero_subheading_color: string;
  hero_description_color: string;
  hero_reviews_text_color: string;
  hero_reviews_star_color: string;
  hero_book_btn_bg: string;
  hero_book_btn_text: string;
  hero_call_btn_bg: string;
  hero_call_btn_text: string;
  hero_book_btn_link: string;
  hero_call_btn_link: string;
  hero_side_image?: string;
  services_visible: boolean;
  services_label: string;
  services_title: string;
  services_cta_text: string;
  services_cta_link: string;
  services_cta_bg: string;
  services_cta_text_color: string;
  services_bg_color: string;
  services_card_color: string;
  services_text_color: string;
  services_icon_color: string;
  services_card_radius: number;
  services_button_text: string;
  services_progress_color: string;
  services_padding: number;
  service_hero_heading_color: string;
  service_hero_description_color: string;
  service_content_bg_color: string;
  service_content_padding: number;
  features_visible: boolean;
  features_label: string;
  features_title: string;
  features_description: string;
  features_bg_color: string;
  features_card_bg: string;
  features_text_color: string;
  features_icon_color: string;
  features_padding: number;
  about_visible: boolean;
  about_label: string;
  about_title: string;
  about_description: string;
  about_image: string;
  about_home_image?: string;
  about_bg_color: string;
  about_text_color: string;
  about_padding: number;
  about_margin_left: number;
  about_margin_right: number;
  about_projects: string;
  about_customers: string;
  about_team: string;
  // New About section fields
  about_tagline: string;
  about_tagline_color: string;
  about_heading: string;
  about_heading_color: string;
  about_description_color: string;
  about_description_font_size: string;
  about_experience_text: string;
  about_experience_bg: string;
  about_experience_text_color: string;
  about_button_text: string;
  about_button_color: string;
  about_button_text_color: string;
  about_button_link: string;
  about_use_default_prompts: boolean;
  // About page fields
  about_page_hero_tagline: string;
  about_page_hero_tagline_color: string;
  about_page_hero_heading_color: string;
  about_page_hero_bg_color: string;
  about_page_who_tagline: string;
  about_page_who_tagline_color: string;
  about_page_who_headline: string;
  about_page_who_description: string;
  about_page_team_image: string;
  about_page_who_bg: string;
  about_page_who_text: string;
  about_page_who_desc_color: string;
  about_page_years: string;
  about_page_experience_label: string;
  about_page_experience_bg: string;
  about_page_experience_text: string;
  about_page_cta_text: string;
  about_page_cta_link: string;
  about_page_cta_bg: string;
  about_page_cta_text_color: string;
  about_page_button_bg: string;
  about_page_button_text: string;
  about_page_why_heading: string;
  about_page_why_subheading: string;
  about_page_why_bg: string;
  about_page_why_heading_color: string;
  about_page_why_subtitle_color: string;
  about_page_why_item_title: string;
  about_page_why_item_desc: string;
  about_page_why_icon_bg: string;
  about_page_why_icon: string;
  about_page_why_section_bg: string;
  about_page_why_section_text: string;
  about_page_use_default_prompts: boolean;
  about_page_meta_keywords: string;
  locations_visible: boolean;
  locations_label: string;
  locations_title: string;
  locations_description: string;
  locations_map_embed: string;
  locations_padding: number;
  locations_show_map: boolean;
  location_hero_heading_color: string;
  location_hero_description_color: string;
  location_contact_title: string;
  location_contact_description: string;
  location_content_padding: number;
  // Service Areas Section (Home) Customization
  service_areas_bg_color: string;
  service_areas_text_color: string;
  service_areas_heading_color: string;
  service_areas_card_bg: string;
  // Location Page Description Customization
  location_description_bg: string;
  location_description_heading_color: string;
  location_description_text_color: string;
  // Location Page Quote Box Customization
  location_quote_box_bg: string;
  location_quote_box_text: string;
  location_quote_box_heading_color: string;
  location_quote_box_button_bg: string;
  location_quote_box_button_text: string;
  reviews_visible: boolean;
  reviews_label: string;
  reviews_title: string;
  reviews_heading_color: string;
  reviews_subtitle_color: string;
  reviews_bg_color: string;
  reviews_card_bg: string;
  reviews_star_color: string;
  reviews_padding: number;
  commitment_visible: boolean;
  commitment_label: string;
  commitment_title: string;
  commitment_text: string;
  commitment_button_label: string;
  commitment_button_link: string;
  commitment_bg_image: string;
  commitment_bg_color: string;
  commitment_text_color: string;
  commitment_heading_color: string;
  commitment_subtitle_color: string;
  commitment_padding: number;
  // Global theme palette derived from color_theme
  global_primary_color?: string;
  global_secondary_color?: string;
  global_accent_color?: string;
  nav_bg_color?: string;
  nav_text_color?: string;
  heading_color?: string;
  button_primary_color?: string;
  footer_text_color: string;
  footer_link_color: string;
  footer_copyright: string;
  faq_visible: boolean;
  faq_label: string;
  faq_title: string;
  faq_bg_color: string;
  faq_padding: number;
  faq_text_color?: string;
  faq_heading_color?: string;
  faq_description_color?: string;
  faq_box_color?: string;
  faq_question_color?: string;
  faq_answer_color?: string;
  faq_toggle_color?: string;
  faq_image?: string;
  faq_heading?: string;
  faq_desc?: string;
  contact_visible: boolean;
  contact_heading: string;
  contact_description: string;
  contact_section_bg_color: string;
  contact_left_side_color: string;
  contact_right_side_color: string;
  contact_text_color: string;
  contact_headline_color: string;
  contact_description_color: string;
  contact_padding: number;
  contact_meta_title: string;
  contact_meta_description: string;
  contact_meta_keywords: string;
  footer_visible: boolean;
  footer_bg_color: string;
  footer_heading_color: string;
  footer_links_color: string;
  footer_copyright_text: string;
  footer_disclaimer_text: string;
  footer_padding: number;
}

export default function WizardClient() {
  const { data: session, status } = useSession();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Helper function to get theme colors - Updated to match professional landscaping theme
  const getThemeColors = (theme: string) => {
    const themes = {
      ocean: { primary: '#2563eb', secondary: '#0ea5e9', light: '#f1f5f9', dark: '#0f172a', text: '#23282d' },
      emerald: { primary: '#059669', secondary: '#10b981', light: '#d1fae5', dark: '#064e3b', text: '#23282d' },
      amber: { primary: '#f59e0b', secondary: '#d97706', light: '#fef9e7', dark: '#fffbeb', text: '#78350f' },
      rose: { primary: '#e11d48', secondary: '#fb7185', light: '#fce7f3', dark: '#4c0519', text: '#23282d' },
      slate: { primary: '#475569', secondary: '#64748b', light: '#f1f5f9', dark: '#0f172a', text: '#23282d' },
      violet: { primary: '#7c3aed', secondary: '#a855f7', light: '#f3e8ff', dark: '#2e1065', text: '#23282d' },
      indigo: { primary: '#3730a3', secondary: '#6366f1', light: '#e0e7ff', dark: '#1e1b4b', text: '#23282d' },
      sky: { primary: '#0ea5e9', secondary: '#38bdf8', light: '#e0f2fe', dark: '#0c4a6e', text: '#23282d' },
      lime: { primary: '#65a30d', secondary: '#84cc16', light: '#f7fee7', dark: '#365314', text: '#23282d' },
      orange: { primary: '#ea580c', secondary: '#fb923c', light: '#fed7aa', dark: '#7c2d12', text: '#23282d' },
      pink: { primary: '#be185d', secondary: '#ec4899', light: '#fce7f3', dark: '#831843', text: '#23282d' },
      neutral: { primary: '#52525b', secondary: '#71717a', light: '#fafafa', dark: '#18181b', text: '#23282d' },
      // Professional landscaping theme (default)
      landscaping: { primary: '#059669', secondary: '#10b981', light: '#f0fdf4', dark: '#14532d', text: '#1f2937' },
      // Professional blue theme
      professional: { primary: '#1e40af', secondary: '#3b82f6', light: '#eff6ff', dark: '#1e3a8a', text: '#1f2937' },
      // Modern green theme
      modern: { primary: '#16a34a', secondary: '#22c55e', light: '#f0fdf4', dark: '#166534', text: '#1f2937' }
    };
    return themes[theme as keyof typeof themes] || themes.landscaping;
  };

  const getContrastText = (hex: string) => {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return '#111827';
    const r = parseInt(m[1], 16) / 255;
    const g = parseInt(m[2], 16) / 255;
    const b = parseInt(m[3], 16) / 255;
    const toLin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    const L = 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
    return L > 0.6 ? '#111827' : '#ffffff';
  };

  // Note: localStorage removed - using Supabase only for cloud deployment

  // Generate random names for Google-like reviews
  const generateRandomName = () => {
    const firstNames = [
      'Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery', 'Quinn', 'Sage', 'River',
      'Drew', 'Blake', 'Cameron', 'Dakota', 'Emery', 'Finley', 'Hayden', 'Jamie', 'Kendall', 'Logan',
      'Parker', 'Reese', 'Sawyer', 'Skyler', 'Tatum', 'Aiden', 'Blake', 'Carson', 'Dylan', 'Ethan',
      'Gabriel', 'Hunter', 'Isaac', 'Jackson', 'Kai', 'Liam', 'Mason', 'Noah', 'Owen', 'Parker',
      'Quinn', 'Ryan', 'Sebastian', 'Tyler', 'Wyatt', 'Zachary', 'Amelia', 'Ava', 'Charlotte', 'Emma',
      'Grace', 'Harper', 'Isabella', 'Lily', 'Mia', 'Nora', 'Olivia', 'Penelope', 'Riley', 'Sophia'
    ];
    const lastNames = [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
      'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
      'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
      'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
      'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
    ];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  };

  // Generate random date from current year only
  const generateRandomDate = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // 1-12
    
    // Random month from current year (1 to current month)
    const randomMonth = Math.floor(Math.random() * currentMonth) + 1;
    
    // Random day (1-28 to avoid month/day issues)
    const randomDay = Math.floor(Math.random() * 28) + 1;
    
    // Create date string
    const year = currentYear.toString();
    const month = randomMonth.toString().padStart(2, '0');
    const day = randomDay.toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  // Debounced Supabase save to prevent too many API calls
  const debouncedSupabaseSave = (() => {
    let timeoutId: NodeJS.Timeout;
    return (formData: FormData) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        if (isLoaded && session?.user?.email) {
          console.log('💾 Auto-saving to Supabase...');
          // Create a complete data object with current state
          const completeData = {
            ...formData,
            services,
            locations,
            reviews,
            features,
            commitments,
            faqs
          };
          console.log('📊 Complete data being saved:', {
            servicesCount: services.length,
            locationsCount: locations.length,
            reviewsCount: reviews.length,
            featuresCount: features.length,
            commitmentsCount: commitments.length,
            faqsCount: faqs.length
          });
          await saveToSupabase(completeData);
        }
      }, 2000); // Save to Supabase 2 seconds after last change
    };
  })();

  // Load data from Supabase when component mounts
  const loadFromSupabase = async () => {
    if (!session?.user?.email) return;
    
    try {
      console.log('📥 Loading data from Supabase...');
      const response = await fetch(`/api/save-wizard-data?user_email=${encodeURIComponent(session.user.email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          console.log('✅ Data loaded from Supabase:', data.data);
          // Update form with loaded data
          setForm(data.data);
          // Update dynamic content if available
          if (data.data.services) setServices(data.data.services);
          if (data.data.locations) setLocations(data.data.locations);
          if (data.data.reviews) setReviews(data.data.reviews);
          if (data.data.features) setFeatures(data.data.features);
          if (data.data.commitments) setCommitments(data.data.commitments);
          if (data.data.faqs) setFaqs(data.data.faqs);
        }
      }
    } catch (error) {
      console.error('❌ Error loading from Supabase:', error);
    }
  };

  const [form, setForm] = useState<FormData>({
    business_name: '',
    business_logo: '',
    business_type: 'landscaping',
    domain_name: '',
    phone: '',
    email: '',
    address: '',
    location: '',
    state: '',
    zip: '',
    about_years: 15,
    openai_api_key: '',
    openrouter_api_key: '',
    color_theme: 'amber',
    admin_theme: 'dark',
    use_dynamic_template: true,
    use_default_color_scheme: true,
    homepage_meta_title: '',
    homepage_meta_description: '',
    homepage_meta_keywords: '',
    about_page_meta_title: '',
    about_page_meta_description: '',
    about_page_hero_title: '',
    about_page_hero_subtitle: '',
    about_page_hero_description: '',
    about_page_hero_bg_image: '',
    about_page_content: '',
    about_page_team_title: '',
    about_page_team_description: '',
    about_page_values_title: '',
    about_page_values_description: '',
    hero_visible: true,
    hero_headline: 'Find Best Roofers Near You',
    hero_description: 'Check here for the description',
    hero_cta: 'Rated 5 Stars On Google',
    hero_cta_link: '#contact',
    hero_rating: 'Rated 5 Stars On Google',
    hero_bg_image: '',
    hero_bg_color: '#f5f5f5',
        hero_padding: 90,
    use_global_hero_image: true,
    service_page_hero_bg_image: '',
    location_page_hero_bg_image: '',
    hero_company_color: '#f59e0b',
    hero_heading_color: '#000000',
    hero_subheading_color: '#6b7280',
    hero_description_color: '#6b7280',
    hero_reviews_text_color: '#000000',
    hero_reviews_star_color: '#fbbf24',
    hero_book_btn_bg: '#14b8a6',
    hero_book_btn_text: '#ffffff',
    hero_call_btn_bg: '#1f2937',
    hero_call_btn_text: '#ffffff',
    hero_book_btn_link: '#',
    hero_call_btn_link: 'tel:',
    hero_side_image: '',
    services_visible: true,
    services_label: 'TOP RATED SERVICES',
    services_title: 'Our Services',
    services_cta_text: 'Get A Free Estimate',
    services_cta_link: '#',
    services_cta_bg: '#2ee6c5',
    services_cta_text_color: '#232834',
    services_bg_color: '#313746',
    services_card_color: '#232834',
    services_text_color: '#ffffff',
    services_icon_color: '#2ee6c5',
    services_card_radius: 12,
    services_button_text: '#2ee6c5',
    services_progress_color: '#2ee6c5',
    services_padding: 60,
    service_hero_heading_color: '#ffffff',
    service_hero_description_color: '#cfd8dc',
    service_content_bg_color: '#232834',
    service_content_padding: 80,
    features_visible: true,
    features_label: 'Benefits of Working with an Expert Team',
    features_title: 'Why Work With Us?',
    features_description: '',
    features_bg_color: '#1e2834',
    features_card_bg: '#1e2834',
    features_text_color: '#ffffff',
    features_icon_color: '#14b8a6',
    features_padding: 58,
    about_visible: true,
    about_label: 'ABOUT US',
    about_title: 'Your Trusted Roofing Partner',
    about_description: '',
    about_image: '',
    about_home_image: '',
    about_bg_color: '#1f2937',
    about_text_color: '#ffffff',
    about_padding: 80,
    about_margin_left: 60,
    about_margin_right: 60,
    about_projects: '500+',
    about_customers: '1000+',
    about_team: '25+',
    // New About section fields
    about_tagline: 'WHO WE ARE',
    about_tagline_color: '#14b8a6',
    about_heading: 'About Our Company',
    about_heading_color: '#ffffff',
    about_description_color: '#d1d5db',
    about_description_font_size: '0.90rem',
    about_experience_text: 'Years of Experience',
    about_experience_bg: '#374151',
    about_experience_text_color: '#14b8a6',
    about_button_text: 'About Us',
    about_button_color: '#14b8a6',
    about_button_text_color: '#ffffff',
    about_button_link: 'about-us',
    about_use_default_prompts: true,
    // About page fields
    about_page_hero_tagline: 'ABOUT',
    about_page_hero_tagline_color: '#9ca3af',
    about_page_hero_heading_color: '#ffffff',
    about_page_hero_bg_color: '#1f2937',
    about_page_who_tagline: 'WHO WE ARE',
    about_page_who_tagline_color: '#14b8a6',
    about_page_who_headline: 'About',
    about_page_who_description: '',
    about_page_team_image: '',
    about_page_who_bg: '#ffffff',
    about_page_who_text: '#374151',
    about_page_who_desc_color: '#374151',
    about_page_years: '15+',
    about_page_experience_label: 'Years of Experience',
    about_page_experience_bg: '#14b8a6',
    about_page_experience_text: '#000000',
    about_page_cta_text: 'Learn More',
    about_page_cta_link: '#',
    about_page_cta_bg: '#14b8a6',
    about_page_cta_text_color: '#000000',
    about_page_button_bg: '#0d9488',
    about_page_button_text: '#374151',
    about_page_why_heading: 'Why Work With Us?',
    about_page_why_subheading: 'Benefits of Working with an Expert Team',
    about_page_why_bg: '#1e3a8a',
    about_page_why_heading_color: '#ffffff',
    about_page_why_subtitle_color: '#ffffff',
    about_page_why_item_title: '#ffffff',
    about_page_why_item_desc: '#ffffff',
    about_page_why_icon_bg: '#1e3a8a',
    about_page_why_icon: '#ffffff',
    about_page_why_section_bg: '#374151',
    about_page_why_section_text: '#000000',
    about_page_use_default_prompts: true,
    about_page_meta_keywords: 'about, contractor, professional services, quality, 15 years experience',
    locations_visible: true,
    locations_label: 'SERVICE AREAS',
    locations_title: 'Areas We Serve',
    locations_description: 'Proudly serving Boulder and the Front Range, including Longmont, Louisville, Lafayette, Erie, Superior, Broomfield, Westminster and nearby areas',
    locations_map_embed: '',
    locations_padding: 80,
    locations_show_map: true,
    location_hero_heading_color: '#ffffff',
    location_hero_description_color: '#cfd8dc',
    location_contact_title: 'GET A QUOTE',
    location_contact_description: '',
    location_content_padding: 80,
    // Service Areas Section (Home) Customization
    service_areas_bg_color: '#1f2937',
    service_areas_text_color: '#ffffff',
    service_areas_heading_color: '#ffffff',
    service_areas_card_bg: 'rgba(255,255,255,0.08)',
    // Location Page Description Customization
    location_description_bg: '#ffffff',
    location_description_heading_color: '#232834',
    location_description_text_color: '#374151',
    // Location Page Quote Box Customization
    location_quote_box_bg: '#1a1f28',
    location_quote_box_text: '#ffffff',
    location_quote_box_heading_color: '#ffffff',
    location_quote_box_button_bg: '#2ee6c5',
    location_quote_box_button_text: '#ffffff',
    reviews_visible: true,
    reviews_label: 'CUSTOMER REVIEWS',
    reviews_title: 'What Our Customers Say',
    reviews_heading_color: '#111827',
    reviews_subtitle_color: '#6b7280',
    reviews_bg_color: '#ffffff',
    reviews_card_bg: '#f9fafb',
    reviews_star_color: '#fbbf24',
    reviews_padding: 80,
    commitment_visible: true,
    commitment_label: 'COMMITTED TO QUALITY',
    commitment_title: 'Our Promise Of Reliability',
    commitment_text: '',
    commitment_button_label: 'Request An Estimate',
    commitment_button_link: '#',
    commitment_bg_image: '',
    commitment_bg_color: '#232834',
    commitment_text_color: '#ffffff',
    commitment_heading_color: '#ffffff',
    commitment_subtitle_color: '#cfd8dc',
    commitment_padding: 60,
    footer_text_color: '#ffffff',
    footer_link_color: '#2ee6c5',
    footer_copyright: `© ${new Date().getFullYear()} Mattslandscapingca.com. All Rights Reserved.`,
    footer_visible: true,
    footer_padding: 40,
    faq_visible: true,
    faq_label: 'FREQUENTLY ASKED QUESTIONS',
    faq_title: 'Common Questions',
    faq_bg_color: '#1f2732',
    faq_padding: 80,
    faq_text_color: '#ffffff',
    faq_heading_color: '#ffffff',
    faq_description_color: '#d1d5db',
    faq_box_color: '#374151',
    faq_question_color: '#ffffff',
    faq_answer_color: '#d1d5db',
    faq_toggle_color: '#2ee6c5',
    faq_image: '',
    faq_heading: 'Frequently Asked Questions',
    faq_desc: 'Find answers to common questions about our landscaping services, pricing, scheduling, and project timelines. Our FAQ section helps you understand our process, what to expect, and how we deliver quality results for every project.',
    contact_visible: true,
    contact_heading: 'Get In Touch',
    contact_description: 'Ready to get started? Contact us for a free consultation and estimate.',
    contact_section_bg_color: '#232a36',
    contact_left_side_color: '#2ee6c5',
    contact_right_side_color: '#ffffff',
    contact_text_color: '#ffffff',
    contact_headline_color: '#ffffff',
    contact_description_color: 'rgba(255,255,255,0.9)',
    contact_padding: 80,
    contact_meta_title: 'Matt Landscaping - Contact US | We Are Just 1 Call Av',
    contact_meta_description: 'Contact Matt\'s Landscaping in Lompoc, CA for professional landscaping services. Call (877) 398-8746 for lawn care, sod installation, plant design, and outdoor transformations.',
    contact_meta_keywords: 'Contact, landscaping, lawn care, sod installation, plant',
    footer_bg_color: '#0f172a',
    footer_heading_color: '#ffffff',
    footer_links_color: '#d1d5db',
    footer_copyright_text: '©2025, Your Business Name. All Rights Reserved.',
    footer_disclaimer_text: 'This website and its content are for informational purposes only. Results may vary based on individual circumstances.',
    nav_bg_color: '#fffbeb',
    nav_text_color: '#78350f',
    heading_color: '#78350f',
    button_primary_color: '#f59e0b',
    global_primary_color: '#f59e0b',
    global_secondary_color: '#d97706',
  });

  // Add loading state to prevent hydration mismatches
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from Supabase after component mounts
  useEffect(() => {
    // Wait for session to be available before loading data
    if (status === 'loading') return;
    
    const loadDataFromSupabase = async () => {
      const userEmail = session?.user?.email;
      if (!userEmail) {
        setIsLoaded(true);
        return;
      }
      
      try {
        const response = await fetch('/api/load-wizard-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_email: userEmail }),
        });
        
        const result = await response.json();
        
        if (result.success && result.data) {
          let savedForm = result.data;
          
          // If form has default color scheme enabled, apply the default colors
          if (savedForm && (savedForm.use_default_color_scheme ?? true)) {
            savedForm = {
              ...savedForm,
              // Apply all default colors
              hero_headline: savedForm.hero_headline || 'Find Best Roofers Near You',
              hero_description: savedForm.hero_description || 'Check here for the description',
              hero_bg_color: '#f5f5f5',
              hero_company_color: '#f59e0b',
              hero_heading_color: '#000000',
              hero_subheading_color: '#6b7280',
              hero_description_color: '#6b7280',
              hero_reviews_text_color: '#000000',
              hero_reviews_star_color: '#fbbf24',
              hero_book_btn_bg: '#14b8a6',
              hero_book_btn_text: '#ffffff',
              hero_call_btn_bg: '#1f2937',
              hero_call_btn_text: '#ffffff',
              services_bg_color: '#313746',
              services_card_color: '#232834',
              services_text_color: '#ffffff',
              services_icon_color: '#2ee6c5',
              features_bg_color: '#1e2834',
              features_card_bg: '#1e2834',
              features_text_color: '#ffffff',
              about_bg_color: '#1f2937',
              about_text_color: '#ffffff',
              about_heading_color: '#ffffff',
              reviews_bg_color: '#ffffff',
              reviews_card_bg: '#f9fafb',
              faq_bg_color: '#1f2732',
              faq_text_color: '#ffffff',
              faq_heading_color: '#ffffff',
              footer_bg_color: '#0f172a',
              footer_heading_color: '#ffffff',
              footer_links_color: '#d1d5db',
              nav_bg_color: '#fffbeb',
              nav_text_color: '#78350f',
              heading_color: '#78350f',
              // Global color scheme palette (for Customize Colors section)
              global_primary_color: '#f59e0b',
              global_secondary_color: '#d97706',
              button_primary_color: '#f59e0b',
            };
          }
          
          setForm(savedForm);
          console.log('✅ Loaded form data from Supabase');
        } else {
          console.log('ℹ️ No saved data found in Supabase, using defaults');
        }
      } catch (error) {
        console.error('❌ Error loading data from Supabase:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    
    loadDataFromSupabase();
  }, [status, session]);

  // Note: Form data is now saved directly to Supabase via updateForm function

  // Dynamic content state
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Lawn Care',
      description: 'Professional lawn care and maintenance services',
      icon: '🌱',
      image: '',
      content: '',
      slug: 'lawn-care',
      metaTitle: '',
      metaDescription: '',
      featuresText: '',
      useDefaultPrompt: true,
      customPrompt: ''
    }
  ]);
  
  // Note: Services are now saved directly to Supabase via addService/updateService/removeService functions

  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      name: 'Boulder',
      state: 'Colorado',
      zip: '80301',
      description: 'Serving Boulder and surrounding areas',
      slug: 'boulder',
      metaTitle: '',
      metaDescription: '',
      useDefaultPrompt: true,
      customPrompt: ''
    }
  ]);
  
  // Note: Locations are now saved directly to Supabase via addLocation/updateLocation/removeLocation functions

  const [reviews, setReviews] = useState<Review[]>([]);
  
  // Note: Reviews are now saved directly to Supabase via addReview/updateReview/removeReview functions

  const [features, setFeatures] = useState<Feature[]>([
    {
      id: '1',
      title: 'Expert Team',
      description: 'Our dedicated team of experts combines creativity and knowledge to transform your space.',
      icon: '👥'
    }
  ]);
  
  // Note: Features are now saved directly to Supabase via addFeature/updateFeature/removeFeature functions

  

  const [commitments, setCommitments] = useState<Commitment[]>([
    {
      id: '1',
      title: 'Quality Guarantee',
      description: 'We guarantee the quality of our work',
      icon: '✅'
    }
  ]);
  
  // Note: Commitments are now saved directly to Supabase via addCommitment/updateCommitment/removeCommitment functions

  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: '1',
      question: 'How long does a roof installation take?',
      answer: 'Typically 1-3 days depending on the size and complexity.'
    }
  ]);
  
  // Note: FAQs are now saved directly to Supabase via addFAQ/updateFAQ/removeFAQ functions

  // Handle NextAuth session
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      setUserEmail(session.user.email);
      setUserId((session.user as any).id);
      fetchCredits(session.user.email);
    } else if (status === 'unauthenticated') {
      window.location.href = '/login';
    }
  }, [session, status]);

  // Listen for credit updates from other pages
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'creditsUpdated' && userEmail) {
        fetchCredits(userEmail);
      }
    };

    const handleFocus = () => {
      if (userEmail) {
        fetchCredits(userEmail);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [userEmail]);

  const [activeTab, setActiveTab] = useState('general');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [serviceLoading, setServiceLoading] = useState<{ [key: string]: boolean }>({});
  const [locationLoading, setLocationLoading] = useState<{ [key: string]: boolean }>({});
  const [showDownloadSection, setShowDownloadSection] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [credits, setCredits] = useState({
    totalCredits: 1,
    usedCredits: 0,
    remainingCredits: 1,
    planType: 'free'
  });

  const fetchCredits = async (userEmail: string) => {
    try {
      if (!userEmail) {
        console.log('❌ No user email provided for credit fetch');
        return;
      }
      
      console.log('🔍 Fetching credits for email:', userEmail);
      
      const response = await fetch('/api/credits/check', {
        headers: {
          'x-user-email': userEmail
        }
      });
      
      console.log('📡 Credits API response status:', response.status);
      
      if (response.ok) {
        const creditData = await response.json();
        console.log('✅ Credits fetched:', creditData);
        setCredits(creditData);
      } else {
        const errorData = await response.json();
        console.error('❌ Failed to fetch credits:', response.status, errorData);
        
        // Set default credits immediately
        console.log('🔧 Setting default credits due to API failure');
        setCredits({
          totalCredits: 1,
          usedCredits: 0,
          remainingCredits: 1,
          planType: 'free'
        });
        
        // Try to create missing credits in background
        console.log('🔧 Attempting to create missing credits...');
        const createResponse = await fetch('/api/credits/create-missing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail })
        });
        
        if (createResponse.ok) {
          const createData = await createResponse.json();
          console.log('✅ Missing credits created:', createData);
          // Retry fetching credits
          const retryResponse = await fetch('/api/credits/check', {
            headers: {
              'x-user-email': userEmail
            }
          });
          
          if (retryResponse.ok) {
            const retryData = await retryResponse.json();
            console.log('✅ Credits fetched after creation:', retryData);
            setCredits(retryData);
          }
        }
      }
    } catch (error) {
      console.error('❌ Error fetching credits:', error);
      // Set default credits on any error
      setCredits({
        totalCredits: 1,
        usedCredits: 0,
        remainingCredits: 1,
        planType: 'free'
      });
    }
  };

  const updateForm = (field: keyof FormData, value: any) => {
    setForm(prev => {
      const next = { ...prev, [field]: value } as FormData;
      
      // Apply default professional dark theme colors when checkbox is checked
      if (field === 'use_default_color_scheme' && value === true) {
        // Hero section defaults (matching reference design)
        next.hero_headline = 'Find Best Roofers Near You';
        next.hero_description = 'Check here for the description';
        next.hero_bg_color = '#f5f5f5';
        next.hero_company_color = '#f59e0b';
        next.hero_heading_color = '#000000';
        next.hero_subheading_color = '#6b7280';
        next.hero_description_color = '#6b7280';
        next.hero_reviews_text_color = '#000000';
        next.hero_reviews_star_color = '#fbbf24';
        next.hero_book_btn_bg = '#14b8a6';
        next.hero_book_btn_text = '#ffffff';
        next.hero_call_btn_bg = '#1f2937';
        next.hero_call_btn_text = '#ffffff';
        
        // Services section defaults
        next.services_bg_color = '#313746';
        next.services_card_color = '#232834';
        next.services_text_color = '#ffffff';
        next.services_icon_color = '#2ee6c5';
        next.services_cta_bg = '#2ee6c5';
        next.services_cta_text_color = '#232834';
        next.services_button_text = '#2ee6c5';
        next.services_progress_color = '#2ee6c5';
        next.service_hero_heading_color = '#ffffff';
        next.service_hero_description_color = '#cfd8dc';
        next.service_content_bg_color = '#232834';
        
        // Features section defaults
        next.features_bg_color = '#1e2834';
        next.features_card_bg = '#1e2834';
        next.features_text_color = '#ffffff';
        next.features_icon_color = '#14b8a6';
        
        // About section defaults
        next.about_bg_color = '#1f2937';
        next.about_text_color = '#ffffff';
        next.about_tagline_color = '#14b8a6';
        next.about_heading_color = '#ffffff';
        next.about_description_color = '#d1d5db';
        next.about_experience_bg = '#374151';
        next.about_experience_text_color = '#14b8a6';
        next.about_button_color = '#14b8a6';
        next.about_button_text_color = '#ffffff';
        
        // Service areas defaults
        next.service_areas_bg_color = '#1f2937';
        next.service_areas_text_color = '#ffffff';
        next.service_areas_heading_color = '#ffffff';
        next.service_areas_card_bg = 'rgba(255,255,255,0.08)';
        
        // Location page defaults
        next.location_hero_heading_color = '#ffffff';
        next.location_hero_description_color = '#cfd8dc';
        next.location_description_bg = '#ffffff';
        next.location_description_heading_color = '#232834';
        next.location_description_text_color = '#374151';
        next.location_quote_box_bg = '#1a1f28';
        next.location_quote_box_text = '#ffffff';
        next.location_quote_box_heading_color = '#ffffff';
        next.location_quote_box_button_bg = '#2ee6c5';
        next.location_quote_box_button_text = '#ffffff';
        
        // Reviews section defaults (light section for contrast)
        next.reviews_bg_color = '#ffffff';
        next.reviews_card_bg = '#f9fafb';
        next.reviews_heading_color = '#111827';
        next.reviews_subtitle_color = '#6b7280';
        next.reviews_star_color = '#fbbf24';
        
        // Commitment section defaults
        next.commitment_bg_color = '#232834';
        next.commitment_text_color = '#ffffff';
        next.commitment_heading_color = '#ffffff';
        next.commitment_subtitle_color = '#cfd8dc';
        
        // FAQ section defaults
        next.faq_bg_color = '#1f2732';
        next.faq_text_color = '#ffffff';
        next.faq_heading_color = '#ffffff';
        next.faq_description_color = '#d1d5db';
        next.faq_box_color = '#374151';
        next.faq_question_color = '#ffffff';
        next.faq_answer_color = '#d1d5db';
        next.faq_toggle_color = '#2ee6c5';
        
        // Contact section defaults
        next.contact_section_bg_color = '#232a36';
        next.contact_left_side_color = '#2ee6c5';
        next.contact_right_side_color = '#ffffff';
        next.contact_text_color = '#ffffff';
        next.contact_headline_color = '#ffffff';
        next.contact_description_color = 'rgba(255,255,255,0.9)';
        
        // Footer defaults
        next.footer_bg_color = '#0f172a';
        next.footer_heading_color = '#ffffff';
        next.footer_links_color = '#d1d5db';
        next.footer_text_color = '#ffffff';
        next.footer_link_color = '#2ee6c5';
        
        // Navigation defaults
        next.nav_bg_color = '#fffbeb';
        next.nav_text_color = '#78350f';
        next.heading_color = '#78350f';
        
        // Global color scheme palette (for Customize Colors section)
        next.global_primary_color = '#f59e0b';
        next.global_secondary_color = '#d97706';
        next.button_primary_color = '#f59e0b';
        
        // About page defaults
        next.about_page_hero_bg_color = '#1f2937';
        next.about_page_hero_heading_color = '#ffffff';
        next.about_page_hero_tagline_color = '#9ca3af';
        next.about_page_who_tagline_color = '#14b8a6';
        next.about_page_who_bg = '#ffffff';
        next.about_page_who_text = '#374151';
        next.about_page_who_desc_color = '#374151';
        next.about_page_experience_bg = '#14b8a6';
        next.about_page_experience_text = '#000000';
        next.about_page_cta_bg = '#14b8a6';
        next.about_page_cta_text_color = '#000000';
        next.about_page_why_bg = '#1e3a8a';
        next.about_page_why_heading_color = '#ffffff';
        next.about_page_why_subtitle_color = '#ffffff';
        next.about_page_why_item_title = '#ffffff';
        next.about_page_why_item_desc = '#ffffff';
        next.about_page_why_icon_bg = '#1e3a8a';
        next.about_page_why_icon = '#ffffff';
        next.about_page_why_section_bg = '#374151';
        next.about_page_why_section_text = '#000000';
      }
      
      if (field === 'color_theme') {
        const palette = getThemeColors(value as string);
        next.global_primary_color = palette.primary;
        next.global_secondary_color = palette.secondary;
        next.global_accent_color = palette.dark;
        next.nav_bg_color = palette.dark;
        if ((value as string).toLowerCase() === 'amber') {
          next.nav_text_color = '#78350f';
        } else {
          next.nav_text_color = getContrastText(palette.dark);
        }
        next.heading_color = palette.text;
        next.button_primary_color = palette.primary;
        
        // Update hero button colors to match theme button color for non-homepage pages
        // Only update if not using default color scheme (which has custom hero colors)
        if (!next.use_default_color_scheme) {
          next.hero_book_btn_bg = palette.primary;
          next.hero_call_btn_bg = palette.primary;
          next.hero_book_btn_text = '#ffffff';
          next.hero_call_btn_text = '#ffffff';
        }
      }
      
      return next;
    });
    
    // Auto-save to Supabase when form changes
    if (isLoaded && session?.user?.email) {
      const userEmail = session.user.email;
      // Use setTimeout to ensure the state has been updated
      setTimeout(() => {
        const currentForm = { ...form, [field]: value };
        console.log(`💾 Auto-saving ${field} to Supabase for user: ${userEmail}`);
        
        // Save to Supabase with debouncing
        debouncedSupabaseSave(currentForm);
      }, 0);
    }
  };

  const saveToSupabase = async (completeData: any) => {
    try {
      const response = await fetch('/api/save-wizard-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...completeData,
          user_email: session?.user?.email || 'anonymous',
          email: session?.user?.email || completeData.email || 'anonymous'
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Data saved to Supabase successfully:', result);
        
        // Also save to WordPress if WordPress site URL is provided
        if (completeData.domain_name && completeData.domain_name.trim() !== '') {
          await saveToWordPress(completeData);
        }
        
        setLastSaved(new Date().toLocaleTimeString());
        return true;
      } else {
        console.error('❌ Failed to save data to Supabase');
        return false;
      }
    } catch (error) {
      console.error('❌ Error saving to Supabase:', error);
      return false;
    }
  };

  const saveToWordPress = async (formData: any) => {
    try {
      const wordpressUrl = formData.domain_name?.trim();
      if (!wordpressUrl) {
        console.log('⚠️ No WordPress URL provided, skipping WordPress save');
        return false;
      }

      // Ensure the URL has the correct format
      const wpUrl = wordpressUrl.startsWith('http') ? wordpressUrl : `https://${wordpressUrl}`;
      const wpApiUrl = `${wpUrl}/wp-json/bsg/v1/save-wizard-data`;

      const response = await fetch(wpApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          services,
          locations,
          reviews,
          features,
          commitments,
          faqs,
          user_email: session?.user?.email || 'anonymous',
          email: session?.user?.email || formData.email || 'anonymous'
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Data saved to WordPress successfully:', result);
        return true;
      } else {
        console.error('❌ Failed to save data to WordPress:', response.status, response.statusText);
        return false;
      }
    } catch (error) {
      console.error('❌ Error saving to WordPress:', error);
      return false;
    }
  };

  const saveSectionChanges = async (section: string) => {
    setSuccess(`✅ ${section} section saved successfully!`);
    
    // Also save to Supabase immediately when user manually saves
    if (isLoaded && session?.user?.email) {
      console.log(`💾 Manual save to Supabase for ${section} section...`);
      const success = await saveToSupabase(form);
      if (success) {
        setSuccess(`✅ ${section} section saved to database successfully!`);
      } else {
        setSuccess(`⚠️ ${section} section saved locally, but database save failed.`);
      }
    }
    
    // Show download section when contact section is saved and essential fields are filled
    if (section === 'Contact' && form.business_name && form.business_type && form.location) {
      setShowDownloadSection(true);
    }
    
    setTimeout(() => setSuccess(''), 3000);
  };

  // Function to save contact section specifically
  const saveContactSection = () => {
    // Check if essential fields are filled
    if (!form.business_name || !form.business_type || !form.location) {
      setSuccess('❌ Please fill in Business Name, Business Type, and Location in the General tab first');
      return;
    }
    
    // Check if contact fields are filled
    if (!form.phone || !form.email) {
      setSuccess('❌ Please fill in Phone and Email in the Contact tab');
      return;
    }
    
    setSuccess('✅ Contact section saved successfully!');
    setShowDownloadSection(true);
    setTimeout(() => setSuccess(''), 3000);
  };

  // Service functions
  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      name: '',
      description: '',
      icon: '🏠',
      image: '',
      content: '',
      slug: '', // Will be generated when name is entered
      metaTitle: '',
      metaDescription: '',
      featuresText: '',
      useDefaultPrompt: true,
      customPrompt: ''
    };
    const updatedServices = [...services, newService];
    setServices(updatedServices);
    console.log('📝 Added new service, current services count:', updatedServices.length);
    
    // Auto-save to Supabase when service is added
    if (isLoaded && session?.user?.email) {
      const userEmail = session.user.email;
      setTimeout(() => {
        console.log(`💾 Auto-saving new service to Supabase for user: ${userEmail}`);
        console.log('📝 Services being saved:', updatedServices);
        
        // Save to Supabase with debouncing
        debouncedSupabaseSave(form);
      }, 0);
    }
  };

  const updateService = (id: string, field: keyof Service, value: string) => {
    setServices(prevServices => {
      const updatedServices = prevServices.map(service => {
        if (service.id === id) {
          const updatedService = { ...service, [field]: value };
          // Auto-generate slug when name changes
          if (field === 'name' && value.trim()) {
            updatedService.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
          }
          return updatedService;
        }
        return service;
      });
      
      // Auto-save to Supabase when service is updated
      if (isLoaded && session?.user?.email) {
        const userEmail = session.user.email;
        setTimeout(() => {
          console.log(`💾 Auto-saving service ${id} update to Supabase for user: ${userEmail}`);
          
          // Save to Supabase with debouncing
          debouncedSupabaseSave(form);
        }, 0);
      }
      
      return updatedServices;
    });
  };

  const removeService = (id: string) => {
    setServices(prevServices => {
      const updatedServices = prevServices.filter(service => service.id !== id);
      
      // Auto-save to Supabase when service is removed
      if (isLoaded && session?.user?.email) {
        const userEmail = session.user.email;
        setTimeout(() => {
          console.log(`💾 Auto-saving service removal to Supabase for user: ${userEmail}`);
          
          // Save to Supabase with debouncing
          debouncedSupabaseSave(form);
        }, 0);
      }
      
      return updatedServices;
    });
  };

  const generateServiceAI = async (id: string) => {
    if (!form.openai_api_key && !form.openrouter_api_key) {
      setSuccess('❌ Please add your OpenAI API key or OpenRouter API key in the General tab');
      return;
    }
    
    setServiceLoading(prev => ({ ...prev, [id]: true }));
    
    try {
      const service = services.find(s => s.id === id);
      if (!service) {
        setServiceLoading(prev => ({ ...prev, [id]: false }));
        return;
      }

      const response = await fetch('/api/generate-ai-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: form.openai_api_key,
          openrouterApiKey: form.openrouter_api_key,
          type: 'service',
          content: { name: service.name },
          businessData: {
            business_name: form.business_name,
            business_type: form.business_type,
            location: form.location,
            phone: form.phone
          },
          requestId: `service_${id}_${Date.now()}`
        })
      });

      if (response.ok) {
        const data = await response.json();
        updateService(id, 'content', data.content);
        // Show success message briefly, then clear it
        setSuccess(`✅ ${service.name} content generated successfully!`);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setSuccess(`❌ Failed to generate content for ${service.name}: ${errorData.error || 'Unknown error'}`);
        setTimeout(() => setSuccess(''), 5000);
      }
    } catch (error) {
      console.error(`Error generating content for service ${id}:`, error);
      setSuccess(`❌ Error generating content for ${services.find(s => s.id === id)?.name || 'service'}: ${error.message}`);
      setTimeout(() => setSuccess(''), 5000);
    } finally {
      setServiceLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  // Location functions
  const addLocation = () => {
    const newLocation: Location = {
      id: Date.now().toString(),
      name: '',
      state: '',
      zip: '',
      description: '',
      slug: '', // Will be generated when name and zip are entered
      metaTitle: '',
      metaDescription: '',
      useDefaultPrompt: true,
      customPrompt: ''
    };
    const updatedLocations = [...locations, newLocation];
    setLocations(updatedLocations);
    
    // Auto-save to Supabase when location is added
    if (isLoaded && session?.user?.email) {
      const userEmail = session.user.email;
      setTimeout(() => {
        console.log(`💾 Auto-saving new location to Supabase for user: ${userEmail}`);
        
        // Save to Supabase with debouncing
        debouncedSupabaseSave(form);
      }, 0);
    }
  };

  const updateLocation = (id: string, field: keyof Location, value: string) => {
    setLocations(prevLocations => {
      const updatedLocations = prevLocations.map(location => {
        if (location.id === id) {
          const updatedLocation = { ...location, [field]: value };
          
          // Auto-generate slug when name or zip changes
          if ((field === 'name' || field === 'zip') && (updatedLocation.name.trim() || updatedLocation.zip.trim())) {
            const nameSlug = updatedLocation.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            const zipSlug = updatedLocation.zip.trim();
            updatedLocation.slug = nameSlug + (zipSlug ? '-' + zipSlug : '');
          }
          
          return updatedLocation;
        }
        return location;
      });
      
      // Auto-save to Supabase when location is updated
      if (isLoaded && session?.user?.email) {
        const userEmail = session.user.email;
        setTimeout(() => {
          console.log(`💾 Auto-saving location update to Supabase for user: ${userEmail}`);
          
          // Save to Supabase with debouncing
          debouncedSupabaseSave(form);
        }, 0);
      }
      
      return updatedLocations;
    });
    
    // Auto-fetch state and ZIP when city name changes (with delay to avoid too many API calls)
    if (field === 'name' && value.trim()) {
      setTimeout(() => {
        fetchLocationData(value.trim()).then(data => {
          if (data) {
            setLocations(prevLocations => 
              prevLocations.map(loc => {
                if (loc.id === id) {
                  const updatedLoc = { ...loc, state: data.state || loc.state, zip: data.zip || loc.zip };
                  // Regenerate slug with new zip
                  if (updatedLoc.name.trim() || updatedLoc.zip.trim()) {
                    const nameSlug = updatedLoc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                    const zipSlug = updatedLoc.zip.trim();
                    updatedLoc.slug = nameSlug + (zipSlug ? '-' + zipSlug : '');
                  }
                  return updatedLoc;
                }
                return loc;
              })
            );
          }
        });
      }, 1000); // 1 second delay
    }
  };

  const fetchLocationData = async (cityName: string) => {
    try {
      // Using Nominatim (OpenStreetMap) geocoding service
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}, USA&limit=1&addressdetails=1`
      );
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          const result = data[0];
          const address = result.address;
          return {
            state: address.state || address.state_district,
            zip: address.postcode
          };
        }
      }
    } catch (error) {
      console.log('Could not auto-fetch location data:', error);
    }
    return null;
  };

  const removeLocation = (id: string) => {
    setLocations(prevLocations => {
      const updatedLocations = prevLocations.filter(location => location.id !== id);
      
      // Auto-save to Supabase when location is removed
      if (isLoaded && session?.user?.email) {
        const userEmail = session.user.email;
        setTimeout(() => {
          console.log(`💾 Auto-saving location removal to Supabase for user: ${userEmail}`);
          
          // Save to Supabase with debouncing
          debouncedSupabaseSave(form);
        }, 0);
      }
      
      return updatedLocations;
    });
  };

  const generateLocationAI = async (id: string) => {
    if (!form.openai_api_key && !form.openrouter_api_key) {
      setSuccess('❌ Please add your OpenAI API key or OpenRouter API key in the General tab');
      return;
    }
    
    setLocationLoading(prev => ({ ...prev, [id]: true }));
    
    try {
      const location = locations.find(l => l.id === id);
      if (!location) {
        setLocationLoading(prev => ({ ...prev, [id]: false }));
        return;
      }

      const response = await fetch('/api/generate-ai-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: form.openai_api_key,
          openrouterApiKey: form.openrouter_api_key,
          type: 'location',
          content: { name: location.name },
          businessData: {
            business_name: form.business_name,
            business_type: form.business_type,
            location: form.location,
            phone: form.phone
          },
          requestId: `location_${id}_${Date.now()}`
        })
      });

      if (response.ok) {
        const data = await response.json();
        updateLocation(id, 'description', data.content);
        // Show success message briefly, then clear it
        setSuccess(`✅ ${location.name} content generated successfully!`);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setSuccess(`❌ Failed to generate content for ${location.name}: ${errorData.error || 'Unknown error'}`);
        setTimeout(() => setSuccess(''), 5000);
      }
    } catch (error) {
      console.error(`Error generating content for location ${id}:`, error);
      setSuccess(`❌ Error generating content for ${locations.find(l => l.id === id)?.name || 'location'}: ${error.message}`);
      setTimeout(() => setSuccess(''), 5000);
    } finally {
      setLocationLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  // Review functions
  const addReview = () => {
    const randomTemplate = reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)];
    const businessName = form.business_name || 'this company';
    
    // Replace [COMPANY_NAME] with actual business name
    const personalizedComment = randomTemplate.replace(/\[COMPANY_NAME\]/g, businessName);
    
    const newReview: Review = {
      id: Date.now().toString(),
      name: generateRandomName(),
      rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
      comment: personalizedComment,
      date: generateRandomDate()
    };
    setReviews([...reviews, newReview]);
  };

  const updateReview = (id: string, field: keyof Review, value: any) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, [field]: value } : review
    ));
  };

  const removeReview = (id: string) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  // Review templates for random generation
  const reviewTemplates = [
      // Short reviews (1 line) - Personalized
      '[COMPANY_NAME] provided excellent service!',
      'Great work from [COMPANY_NAME]!',
      'Highly recommend [COMPANY_NAME]!',
      '[COMPANY_NAME] is professional and reliable!',
      'Outstanding quality from [COMPANY_NAME]!',
      'Very satisfied with [COMPANY_NAME]!',
      'Great experience with [COMPANY_NAME]!',
      '[COMPANY_NAME] delivers top notch service!',
      '[COMPANY_NAME] exceeded my expectations!',
      'Fantastic work by [COMPANY_NAME]!',
      
      // Medium reviews (2 lines) - Generic
      'Outstanding service! The team was professional and delivered exactly what they promised. Highly recommend!',
      'Exceptional work quality and customer service. They went above and beyond to ensure everything was perfect.',
      'Amazing experience from start to finish. Professional, reliable, and the results exceeded my expectations.',
      'Fantastic service! Quick response time, fair pricing, and excellent results. Couldn\'t be happier.',
      'Top-notch work! The team was knowledgeable, courteous, and completed the job efficiently.',
      'Excellent service and attention to detail. They were on time, clean, and professional throughout.',
      'Great experience! Professional team, fair pricing, and excellent results. Would definitely recommend.',
      'Fantastic work! The team was professional, efficient, and the results exceeded my expectations.',
      
      // Medium reviews (2 lines) - Company specific
      'Outstanding service from [COMPANY_NAME]! The team was professional and delivered exactly what they promised. Highly recommend!',
      'Exceptional work quality from [COMPANY_NAME]. They went above and beyond to ensure everything was perfect.',
      'Amazing experience with [COMPANY_NAME] from start to finish. Professional, reliable, and the results exceeded my expectations.',
      'Fantastic service from [COMPANY_NAME]! Quick response time, fair pricing, and excellent results. Couldn\'t be happier.',
      'Top-notch work from [COMPANY_NAME]! The team was knowledgeable, courteous, and completed the job efficiently.',
      'Excellent service and attention to detail from [COMPANY_NAME]. They were on time, clean, and professional throughout.',
      'Great experience with [COMPANY_NAME]! Professional team, fair pricing, and excellent results. Would definitely recommend.',
      'Fantastic work from [COMPANY_NAME]! The team was professional, efficient, and the results exceeded my expectations.',
      
      // Long reviews (3+ lines) - Generic
      'Outstanding service from start to finish! The team was professional, punctual, and delivered exactly what they promised. The quality of work exceeded my expectations and I couldn\'t be happier with the results. Highly recommend to anyone looking for reliable service!',
      'Exceptional work quality and customer service throughout the entire process. They went above and beyond to ensure everything was perfect, addressing all my concerns promptly. The team was knowledgeable, friendly, and professional. Will definitely use again and recommend to others!',
      'Amazing experience from start to finish! Professional, reliable, and the results exceeded my expectations. The team was on time, clean, and courteous throughout the entire process. They explained everything clearly and kept me informed at every step. Thank you for the excellent service!',
      'Fantastic service with outstanding results! Quick response time, fair pricing, and excellent quality work. The team was professional, efficient, and went above and beyond to ensure my complete satisfaction. I couldn\'t be happier with the outcome and would definitely recommend to others!',
      'Excellent service from start to finish! Professional, reliable, and the quality of work was outstanding. The team was knowledgeable, courteous, and completed the job efficiently. They addressed all my concerns and kept me informed throughout the process. Highly recommend!',
      'Outstanding quality and customer service that exceeded my expectations! The team was friendly, professional, and delivered exactly what was promised. They were on time, clean, and professional throughout the entire process. I couldn\'t be happier with the results and will definitely use again!',
      
      // Long reviews (3+ lines) - Company specific
      'Outstanding service from [COMPANY_NAME] from start to finish! The team was professional, punctual, and delivered exactly what they promised. The quality of work exceeded my expectations and I couldn\'t be happier with the results. Highly recommend [COMPANY_NAME] to anyone looking for reliable service!',
      'Exceptional work quality and customer service from [COMPANY_NAME] throughout the entire process. They went above and beyond to ensure everything was perfect, addressing all my concerns promptly. The team at [COMPANY_NAME] was knowledgeable, friendly, and professional. Will definitely use [COMPANY_NAME] again and recommend to others!',
      'Amazing experience with [COMPANY_NAME] from start to finish! Professional, reliable, and the results exceeded my expectations. The team at [COMPANY_NAME] was on time, clean, and courteous throughout the entire process. They explained everything clearly and kept me informed at every step. Thank you [COMPANY_NAME] for the excellent service!',
      'Fantastic service with outstanding results from [COMPANY_NAME]! Quick response time, fair pricing, and excellent quality work. The team at [COMPANY_NAME] was professional, efficient, and went above and beyond to ensure my complete satisfaction. I couldn\'t be happier with the outcome and would definitely recommend [COMPANY_NAME] to others!',
      'Excellent service from [COMPANY_NAME] from start to finish! Professional, reliable, and the quality of work was outstanding. The team at [COMPANY_NAME] was knowledgeable, courteous, and completed the job efficiently. They addressed all my concerns and kept me informed throughout the process. Highly recommend [COMPANY_NAME]!',
      'Outstanding quality and customer service from [COMPANY_NAME] that exceeded my expectations! The team was friendly, professional, and delivered exactly what was promised. They were on time, clean, and professional throughout the entire process. I couldn\'t be happier with the results and will definitely use [COMPANY_NAME] again!',
      
      // Personal/Detailed reviews with company names
      'I\'ve been using [COMPANY_NAME] for over 2 years now and they never disappoint. Their attention to detail and customer service is unmatched. The team always goes above and beyond to ensure everything is perfect. Highly recommend [COMPANY_NAME] to anyone looking for quality work!',
      'After trying several other companies, I finally found [COMPANY_NAME] and I\'m so glad I did! Their professionalism and quality of work is outstanding. The team was punctual, clean, and kept me informed throughout the entire process. Will definitely use [COMPANY_NAME] again!',
      'I was referred to [COMPANY_NAME] by a friend and I\'m so grateful for the recommendation! The team was professional, efficient, and delivered exactly what they promised. The quality of work exceeded my expectations and I couldn\'t be happier with the results. Thank you [COMPANY_NAME]!',
      'I\'ve used [COMPANY_NAME] multiple times now and they consistently deliver excellent results. Their team is knowledgeable, friendly, and always goes the extra mile. The pricing is fair and the quality is outstanding. I highly recommend [COMPANY_NAME] to anyone looking for reliable service!',
      'My experience with [COMPANY_NAME] has been nothing short of exceptional. From the initial consultation to the final cleanup, everything was handled professionally. The team was on time, clean, and kept me informed throughout the process. I couldn\'t be happier with the results and will definitely use [COMPANY_NAME] again!'
    ];

  // Generate unique dynamic Google-like reviews in sets of 4
  const generateRandomReviews = () => {
    const businessName = form.business_name || 'this company';
    
    // Dynamic review components for unique generation
    const positiveAdjectives = [
      'excellent', 'outstanding', 'fantastic', 'amazing', 'exceptional', 'superb', 'brilliant', 
      'remarkable', 'impressive', 'wonderful', 'incredible', 'phenomenal', 'stellar', 'top-notch',
      'first-rate', 'premium', 'superior', 'exemplary', 'outstanding', 'magnificent'
    ];
    
    const serviceWords = [
      'service', 'work', 'job', 'project', 'experience', 'results', 'quality', 'performance',
      'delivery', 'execution', 'outcome', 'final product', 'completion', 'finish'
    ];
    
    const teamDescriptions = [
      'professional team', 'skilled professionals', 'expert staff', 'knowledgeable crew',
      'experienced team', 'dedicated workers', 'competent staff', 'reliable team',
      'friendly staff', 'courteous team', 'helpful professionals', 'accommodating crew'
    ];
    
    const timeReferences = [
      'on time', 'ahead of schedule', 'within the deadline', 'as promised', 'exactly when they said',
      'punctually', 'promptly', 'quickly', 'efficiently', 'swiftly'
    ];
    
    const qualityPhrases = [
      'exceeded my expectations', 'went above and beyond', 'delivered exceptional results',
      'provided outstanding quality', 'showed great attention to detail', 'demonstrated expertise',
      'produced excellent work', 'achieved perfect results', 'delivered beyond what was promised'
    ];
    
    const recommendationPhrases = [
      'highly recommend', 'definitely recommend', 'strongly recommend', 'would recommend',
      'absolutely recommend', 'surely recommend', 'certainly recommend', 'definitely suggest'
    ];
    
    const newReviews = Array.from({ length: 4 }, (_, index) => {
      // Generate unique review by combining different components
      const adjective = positiveAdjectives[Math.floor(Math.random() * positiveAdjectives.length)];
      const service = serviceWords[Math.floor(Math.random() * serviceWords.length)];
      const team = teamDescriptions[Math.floor(Math.random() * teamDescriptions.length)];
      const time = timeReferences[Math.floor(Math.random() * timeReferences.length)];
      const quality = qualityPhrases[Math.floor(Math.random() * qualityPhrases.length)];
      const recommend = recommendationPhrases[Math.floor(Math.random() * recommendationPhrases.length)];
      
      // Create different review structures for variety
      const reviewStructures = [
        // Short structure
        `${businessName} provided ${adjective} ${service}! The ${team} was ${time}. ${recommend.charAt(0).toUpperCase() + recommend.slice(1)} ${businessName}!`,
        
        // Medium structure
        `I was very impressed with ${businessName}. The ${team} delivered ${adjective} ${service} and ${quality}. ${recommend.charAt(0).toUpperCase() + recommend.slice(1)} ${businessName} to anyone looking for reliable service!`,
        
        // Long structure
        `My experience with ${businessName} was absolutely ${adjective}. The ${team} was ${time} and ${quality}. The attention to detail and professionalism from ${businessName} was remarkable. I couldn't be happier with the results and ${recommend} ${businessName} to others!`,
        
        // Detailed structure
        `${businessName} delivered exceptional ${service} from start to finish. The ${team} was knowledgeable, professional, and ${time}. The quality of work ${quality} and I was very pleased with the outcome. ${recommend.charAt(0).toUpperCase() + recommend.slice(1)} ${businessName} for any future projects!`
      ];
      
      const selectedStructure = reviewStructures[Math.floor(Math.random() * reviewStructures.length)];
      
      return {
        id: (Date.now() + index + Math.random() * 1000).toString(),
        name: generateRandomName(),
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
        comment: selectedStructure,
        date: generateRandomDate()
      };
    });

    // Add new reviews to existing ones instead of replacing
    setReviews(prevReviews => [...prevReviews, ...newReviews]);
    setSuccess('✅ 4 new unique personalized Google reviews added successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  // About AI generation functions
  const generateAboutAI = async () => {
    if (!form.openai_api_key && !form.openrouter_api_key) {
      setSuccess('❌ Please add your OpenAI API key or OpenRouter API key in the General tab');
      return;
    }
    
    setLoading(true);
    try {
      console.log('Generating about content with:', {
        apiKey: form.openai_api_key ? '***' : 'missing',
        type: 'about_home',
        business_name: form.business_name,
        business_type: form.business_type,
        location: form.location
      });

      const response = await fetch('/api/generate-ai-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: form.openai_api_key,
          openrouterApiKey: form.openrouter_api_key,
          type: 'about_home',
          content: { 
            business_name: form.business_name,
            business_type: form.business_type,
            location: form.location,
            years: form.about_years
          },
          businessData: {
            business_name: form.business_name,
            business_type: form.business_type,
            location: form.location,
            phone: form.phone
          }
        })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        updateForm('about_description', data.content);
        setSuccess('✅ Homepage about content generated successfully!');
      } else {
        setSuccess(`❌ Failed to generate content: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('AI generation error:', error);
      setSuccess('❌ Error generating content');
    } finally {
      setLoading(false);
    }
  };

  const generateAboutPageAI = async () => {
    if (!form.openai_api_key && !form.openrouter_api_key) {
      setSuccess('❌ Please add your OpenAI API key or OpenRouter API key in the General tab');
      return;
    }
    
    setLoading(true);
    try {
      console.log('Generating about page content with:', {
        apiKey: form.openai_api_key ? '***' : 'missing',
        type: 'about_page',
        business_name: form.business_name,
        business_type: form.business_type,
        location: form.location
      });

      const response = await fetch('/api/generate-ai-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: form.openai_api_key,
          openrouterApiKey: form.openrouter_api_key,
          type: 'about_page',
          content: { 
            business_name: form.business_name,
            business_type: form.business_type,
            location: form.location,
            years: form.about_years
          },
          businessData: {
            business_name: form.business_name,
            business_type: form.business_type,
            location: form.location,
            phone: form.phone
          }
        })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        updateForm('about_page_who_description', data.content);
        setSuccess('✅ About page content generated successfully!');
      } else {
        setSuccess(`❌ Failed to generate content: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('AI generation error:', error);
      setSuccess('❌ Error generating content');
    } finally {
      setLoading(false);
    }
  };

  // Features AI generation function
  const generateFeaturesAI = async () => {
    if (!form.openai_api_key && !form.openrouter_api_key) {
      setSuccess('❌ Please add your OpenAI API key or OpenRouter API key in the General tab');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('/api/generate-ai-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: form.openai_api_key,
          openrouterApiKey: form.openrouter_api_key,
          type: 'features',
          content: {},
          businessData: {
            business_name: form.business_name,
            business_type: form.business_type,
            location: form.location,
            phone: form.phone
          }
        })
      });

      const data = await response.json();

      if (response.ok && data.content && Array.isArray(data.content)) {
        // Replace all features with generated ones
        setFeatures(data.content.map((feature: any, index: number) => ({
          id: (index + 1).toString(),
          title: feature.title || '',
          icon: feature.icon || '✨',
          description: feature.description || ''
        })));
        setSuccess('✅ Features generated successfully!');
      } else {
        setSuccess(`❌ Failed to generate features: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('AI generation error:', error);
      setSuccess('❌ Error generating features');
    } finally {
      setLoading(false);
    }
  };

  // Reviews AI generation function
  const generateReviewsAI = async () => {
    if (!form.openai_api_key && !form.openrouter_api_key) {
      setSuccess('❌ Please add your OpenAI API key or OpenRouter API key in the General tab');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('/api/generate-ai-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: form.openai_api_key,
          openrouterApiKey: form.openrouter_api_key,
          type: 'reviews',
          content: {},
          businessData: {
            business_name: form.business_name,
            business_type: form.business_type,
            location: form.location,
            phone: form.phone
          }
        })
      });

      const data = await response.json();

      if (response.ok && data.content && Array.isArray(data.content)) {
        // Replace all reviews with generated ones
        setReviews(data.content.map((review: any, index: number) => ({
          id: (index + 1).toString(),
          name: review.name || generateRandomName(),
          rating: review.rating || 5,
          comment: review.comment || '',
          date: generateRandomDate()
        })));
        setSuccess('✅ Reviews generated successfully!');
      } else {
        setSuccess(`❌ Failed to generate reviews: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('AI generation error:', error);
      setSuccess('❌ Error generating reviews');
    } finally {
      setLoading(false);
    }
  };

  // FAQ AI generation function
  const generateFAQAI = async () => {
    if (!form.openai_api_key && !form.openrouter_api_key) {
      setSuccess('❌ Please add your OpenAI API key or OpenRouter API key in the General tab');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('/api/generate-ai-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: form.openai_api_key,
          openrouterApiKey: form.openrouter_api_key,
          type: 'faq',
          content: {},
          businessData: {
            business_name: form.business_name,
            business_type: form.business_type,
            location: form.location,
            phone: form.phone
          }
        })
      });

      const data = await response.json();

      if (response.ok && data.content && Array.isArray(data.content)) {
        // Replace all FAQs with generated ones
        setFaqs(data.content.map((faq: any, index: number) => ({
          id: (index + 1).toString(),
          question: faq.question || '',
          answer: faq.answer || ''
        })));
        setSuccess('✅ FAQs generated successfully!');
      } else {
        setSuccess(`❌ Failed to generate FAQs: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('AI generation error:', error);
      setSuccess('❌ Error generating FAQs');
    } finally {
      setLoading(false);
    }
  };

  // Feature functions
  const addFeature = () => {
    const newFeature: Feature = {
      id: Date.now().toString(),
      title: '',
      description: '',
      icon: '✨'
    };
    setFeatures([...features, newFeature]);
  };

  const updateFeature = (id: string, field: keyof Feature, value: string) => {
    setFeatures(features.map(feature => 
      feature.id === id ? { ...feature, [field]: value } : feature
    ));
  };

  const removeFeature = (id: string) => {
    setFeatures(features.filter(feature => feature.id !== id));
  };

  // Commitment functions
  const addCommitment = () => {
    const newCommitment: Commitment = {
      id: Date.now().toString(),
      title: '',
      description: '',
      icon: '✅'
    };
    setCommitments([...commitments, newCommitment]);
  };

  const updateCommitment = (id: string, field: keyof Commitment, value: string) => {
    setCommitments(commitments.map(commitment => 
      commitment.id === id ? { ...commitment, [field]: value } : commitment
    ));
  };

  const removeCommitment = (id: string) => {
    setCommitments(commitments.filter(commitment => commitment.id !== id));
  };

  // FAQ functions
  const addFAQ = () => {
    const newFAQ: FAQ = {
      id: Date.now().toString(),
      question: '',
      answer: ''
    };
    setFaqs([...faqs, newFAQ]);
  };

  const updateFAQ = (id: string, field: keyof FAQ, value: string) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, [field]: value } : faq
    ));
  };

  const removeFAQ = (id: string) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  // Footer link functions

  // Add sample data for testing
  const addSampleData = () => {
    if (services.length === 0) {
      const sampleServices: Service[] = [
        { id: '1', name: 'Roof Installation', description: 'Professional roof installation services', slug: 'roof-installation', icon: '🏠', image: '', content: '' },
        { id: '2', name: 'Roof Repair', description: 'Expert roof repair and maintenance', slug: 'roof-repair', icon: '🛠️', image: '', content: '' }
      ];
      setServices(sampleServices);
      // Note: Sample data is now saved directly to Supabase via debouncedSupabaseSave
    }
    
    if (locations.length === 0) {
      const sampleLocations = [
        { id: '1', name: 'Boulder', state: 'Colorado', zip: '80301', description: 'Serving Boulder, Colorado', slug: 'boulder-80301' },
        { id: '2', name: 'Orlando', state: 'Florida', zip: '32801', description: 'Serving Orlando, Florida', slug: 'orlando-32801' }
      ];
      setLocations(sampleLocations);
    // Note: Sample data is now saved directly to Supabase via debouncedSupabaseSave
    }
  };

  const downloadTheme = async () => {
    console.log('Create site function called');
    console.log('Current services state:', services);
    console.log('Current locations state:', locations);
    console.log('Current form state:', form);
    
    // Note: Data synchronization with localStorage removed - using Supabase only
    
    // Validate essential fields first
    if (!form.business_name || !form.business_type || !form.location) {
      setSuccess('❌ Please fill in Business Name, Business Type, and Location in the General tab first');
      return;
    }
    
    // Validate general fields (contact info comes from general section)
    if (!form.phone || !form.email || !form.address) {
      setSuccess('❌ Please fill in all required general fields: Phone, Email, and Address in the General tab');
      return;
    }
    
    // Note: Using current state data directly from Supabase
    const finalServices = services;
    const finalLocations = locations;
    
    // Ensure all services and locations have proper slugs before sending
    const servicesWithSlugs = finalServices.map(service => {
      if (!service.slug && service.name.trim()) {
        service.slug = service.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      }
      return service;
    });
    
    const locationsWithSlugs = finalLocations.map(location => {
      if (!location.slug && location.name.trim()) {
        const nameSlug = location.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        const zipSlug = location.zip.trim();
        location.slug = nameSlug + (zipSlug ? '-' + zipSlug : '');
      }
      return location;
    });
    
    // Update state with slugs
    setServices(servicesWithSlugs);
    setLocations(locationsWithSlugs);
    
    setLoading(true);
    
    try {
      // Get user from NextAuth session state
      if (!userEmail || !userId) {
        setError('❌ Please log in to create a site.');
        setLoading(false);
        return;
      }
      
      // First, check and deduct credits
      console.log('Checking and deducting credits...');
      const creditResponse = await fetch('/api/credits/deduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
          'x-user-email': userEmail
        },
        body: JSON.stringify({
          siteName: form.business_name || 'My Business Site',
          creditsToDeduct: 1
        }),
      });

      if (!creditResponse.ok) {
        const creditError = await creditResponse.json();
        if (creditResponse.status === 400 && creditError.error === 'Insufficient credits') {
          setError(`❌ Insufficient credits! You have ${creditError.remainingCredits} credits remaining but need ${creditError.requiredCredits} to create a site. Please upgrade your plan.`);
          setLoading(false);
          return;
        }
        throw new Error(`Credit deduction failed: ${creditError.error}`);
      }

      const creditResult = await creditResponse.json();
      console.log('Credits deducted successfully:', creditResult);
      
      // Refresh credits display
      if (userEmail) {
        await fetchCredits(userEmail);
      }
      
      // Notify other pages that credits have been updated
      // Note: Credits tracking removed - using Supabase only

      console.log('Sending data to build-theme API:', {
        business_name: form.business_name,
        business_type: form.business_type,
        location: form.location,
        phone: form.phone,
        email: form.email,
        services_count: servicesWithSlugs.length,
        locations_count: locationsWithSlugs.length,
        reviews_count: reviews.length,
        features_count: features.length,
        services_data: servicesWithSlugs,
        locations_data: locationsWithSlugs,
        full_payload: { ...form, services: servicesWithSlugs, locations: locationsWithSlugs, reviews, features, commitments, faqs }
      });

      const response = await fetch('/api/build-theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify((() => {
          const payload: any = { 
            ...form, 
            services: servicesWithSlugs, 
            locations: locationsWithSlugs, 
            reviews, 
            features, 
            commitments, 
            faqs,
            user_email: session?.user?.email || 'anonymous',
            email: session?.user?.email || form.email || 'anonymous'
          };
          return payload;
        })())
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to build theme: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/zip') || contentType.includes('octet-stream')) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'business-theme.zip';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        setSuccess('✅ Your site has been created! All wizard settings have been applied to the theme and the ZIP file is ready for download.');
      } else {
        // Legacy JSON response fallback (base64 ZIP)
      const result = await response.json();
      console.log('API Response:', result);
      if (result.themeZip) {
        try {
          const binaryString = atob(result.themeZip);
          const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
          const blob = new Blob([bytes], { type: 'application/zip' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${result.themeName || 'business-theme'}.zip`;
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          setSuccess('✅ Your site has been created! All wizard settings have been applied to the theme and the ZIP file is ready for download.');
        } catch (blobError) {
          console.error('Blob creation error:', blobError);
            setSuccess('❌ Error creating download file: ' + (blobError as Error).message);
        }
      } else {
        console.error('No themeZip in response:', result);
        setSuccess('❌ No theme data received from server');
        }
      }
    } catch (err: any) {
      console.error('Download theme error:', err);
      setSuccess('❌ Failed to build theme: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 
    'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 
    'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  // Map state full name to abbreviation for ZIP API
  const stateAbbr: Record<string, string> = {
    Alabama:'AL', Alaska:'AK', Arizona:'AZ', Arkansas:'AR', California:'CA', Colorado:'CO', Connecticut:'CT', Delaware:'DE', 'District of Columbia':'DC', Florida:'FL', Georgia:'GA', Hawaii:'HI', Idaho:'ID', Illinois:'IL', Indiana:'IN', Iowa:'IA', Kansas:'KS', Kentucky:'KY', Louisiana:'LA', Maine:'ME', Maryland:'MD', Massachusetts:'MA', Michigan:'MI', Minnesota:'MN', Mississippi:'MS', Missouri:'MO', Montana:'MT', Nebraska:'NE', Nevada:'NV', 'New Hampshire':'NH', 'New Jersey':'NJ', 'New Mexico':'NM', 'New York':'NY', 'North Carolina':'NC', 'North Dakota':'ND', Ohio:'OH', Oklahoma:'OK', Oregon:'OR', Pennsylvania:'PA', 'Rhode Island':'RI', 'South Carolina':'SC', 'South Dakota':'SD', Tennessee:'TN', Texas:'TX', Utah:'UT', 
    Vermont:'VT', Virginia:'VA', Washington:'WA', 'West Virginia':'WV', Wisconsin:'WI', Wyoming:'WY'
  };

  // Show loading screen while data is being loaded
  if (!isLoaded) {
    return (
      <div className="bsg-admin">
        <div className="wrap">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            fontSize: '18px',
            color: '#666'
          }}>
            Loading your data...
          </div>
        </div>
      </div>
    );
  }

	return (
    <div className="bsg-admin">
        <div className="wrap">
          <div className="bsg-header">
          <div className="bsg-header-content">
            <h2 style={{color: form.heading_color || undefined}}>Create A Website Click</h2>
            <p>Create and manage your professional business website with ease</p>
          </div>
        </div>
        
        <div className="bsg-content">
          {success && (
            <div className="notice notice-success is-dismissible" style={{marginTop: '8px'}}>
              <p>{success}</p>
            </div>
          )}

          <form id="bsg-settings-form" method="post">
            <div className="bsg-tabs">
              <nav className="nav-tab-wrapper" style={{background: form.nav_bg_color || undefined, borderRadius: 8, padding: 6}}>
                <a 
                  href="#" 
                  className={`nav-tab ${activeTab === 'general' ? 'nav-tab-active' : ''}`}
                  style={{color: form.nav_text_color || undefined}}
                  onClick={(e) => { e.preventDefault(); setActiveTab('general'); }}
                >
                  General
                </a>
                <a 
                  href="#" 
                  className={`nav-tab ${activeTab === 'hero' ? 'nav-tab-active' : ''}`}
                  style={{color: form.nav_text_color || undefined}}
                  onClick={(e) => { e.preventDefault(); setActiveTab('hero'); }}
                >
                  Hero
                </a>
                <a 
                  href="#" 
                  className={`nav-tab ${activeTab === 'features' ? 'nav-tab-active' : ''}`}
                  style={{color: form.nav_text_color || undefined}}
                  onClick={(e) => { e.preventDefault(); setActiveTab('features'); }}
                >
                  Features
                </a>
                <a 
                  href="#" 
                  className={`nav-tab ${activeTab === 'about' ? 'nav-tab-active' : ''}`}
                  style={{color: form.nav_text_color || undefined}}
                  onClick={(e) => { e.preventDefault(); setActiveTab('about'); }}
                >
                  About
                </a>
                <a 
                  href="#" 
                  className={`nav-tab ${activeTab === 'services' ? 'nav-tab-active' : ''}`}
                  style={{color: form.nav_text_color || undefined}}
                  onClick={(e) => { e.preventDefault(); setActiveTab('services'); }}
                >
                  Services
                </a>
                <a 
                  href="#" 
                  className={`nav-tab ${activeTab === 'locations' ? 'nav-tab-active' : ''}`}
                  style={{color: form.nav_text_color || undefined}}
                  onClick={(e) => { e.preventDefault(); setActiveTab('locations'); }}
                >
                  Locations
                </a>
                <a 
                  href="#" 
                  className={`nav-tab ${activeTab === 'reviews' ? 'nav-tab-active' : ''}`}
                  style={{color: form.nav_text_color || undefined}}
                  onClick={(e) => { e.preventDefault(); setActiveTab('reviews'); }}
                >
                  Reviews
                </a>
                <a 
                  href="#" 
                  className={`nav-tab ${activeTab === 'commitment' ? 'nav-tab-active' : ''}`}
                  style={{color: form.nav_text_color || undefined}}
                  onClick={(e) => { e.preventDefault(); setActiveTab('commitment'); }}
                >
                  Commitment
                </a>
                <a 
                  href="#" 
                  className={`nav-tab ${activeTab === 'footer' ? 'nav-tab-active' : ''}`}
                  style={{color: form.nav_text_color || undefined}}
                  onClick={(e) => { e.preventDefault(); setActiveTab('footer'); }}
                >
                  Footer
                </a>
                <a 
                  href="#" 
                  className={`nav-tab ${activeTab === 'faq' ? 'nav-tab-active' : ''}`}
                  style={{color: form.nav_text_color || undefined}}
                  onClick={(e) => { e.preventDefault(); setActiveTab('faq'); }}
                >
                  FAQ
                </a>
                <a 
                  href="#" 
                  className={`nav-tab ${activeTab === 'contact' ? 'nav-tab-active' : ''}`}
                  style={{color: form.nav_text_color || undefined}}
                  onClick={(e) => { e.preventDefault(); setActiveTab('contact'); }}
                >
                  Contact
                </a>
              </nav>

              <div className="bsg-tab-content">
                {/* General Tab */}
                {activeTab === 'general' && (
					<div>
                    <div className="bsg-section">
                      <h3 style={{color: '#1f2937'}}>Business Information</h3>
                      <table className="form-table">
                        <tbody>
                          <tr>
                            <th scope="row">Business Name</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.business_name}
                                onChange={(e) => updateForm('business_name', e.target.value)}
                                className="regular-text" 
                                placeholder="Your Business Name"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Domain Name</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.domain_name}
                                onChange={(e) => updateForm('domain_name', e.target.value)}
                                className="regular-text" 
                                placeholder="yourdomain.com"
                              />
                              <p className="description">Enter your website domain (e.g., yourdomain.com) for About Us button links</p>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Business Logo</th>
                            <td>
                              <div style={{display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px'}}>
                              <input 
                                type="text" 
                                value={form.business_logo}
                                onChange={(e) => updateForm('business_logo', e.target.value)}
                                className="regular-text" 
                                placeholder="Logo Image URL"
                                  style={{flex: 1}}
                                />
                                <input
                                  type="file"
                                  id="logo-upload"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = () => {
                                        const dataUrl = reader.result as string;
                                        updateForm('business_logo', dataUrl);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  style={{display: 'none'}}
                                />
                                <label 
                                  htmlFor="logo-upload" 
                                  style={{
                                    background: '#0073aa',
                                    color: 'white',
                                    padding: '6px 12px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    fontWeight: '600'
                                  }}
                                >
                                  Upload Image
                                </label>
                              </div>
                              {form.business_logo && (
                                <div style={{marginTop: '8px'}}>
                                  <img 
                                    src={form.business_logo} 
                                    alt="Logo Preview" 
                                    style={{
                                      maxWidth: '120px',
                                      maxHeight: '60px',
                                      objectFit: 'contain',
                                      border: '1px solid #ddd',
                                      borderRadius: '4px',
                                      padding: '4px',
                                      backgroundColor: '#f9f9f9'
                                    }}
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Business Type</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.business_type}
                                onChange={(e) => updateForm('business_type', e.target.value)}
                                className="regular-text"
                                placeholder="e.g., roofing, plumbing, landscaping"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Phone Number</th>
                            <td>
                              <input 
                                type="tel" 
                                value={form.phone}
                                onChange={(e) => updateForm('phone', e.target.value)}
                                className="regular-text" 
                                placeholder="(555) 123-4567"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Email Address</th>
                            <td>
                              <input 
                                type="email" 
                                value={form.email}
                                onChange={(e) => updateForm('email', e.target.value)}
                                className="regular-text" 
                                placeholder="info@yourbusiness.com"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Business Address</th>
                            <td>
                              <textarea 
                                value={form.address}
                                onChange={(e) => updateForm('address', e.target.value)}
                                rows={2} 
                                className="large-text" 
                                placeholder="123 Main Street, City, State 12345"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Location/City</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.location}
                                onChange={(e) => updateForm('location', e.target.value)}
                                className="regular-text" 
                                placeholder="e.g., Boulder, Denver"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">State</th>
                            <td>
                              <select 
                                value={form.state}
                                onChange={(e) => updateForm('state', e.target.value)}
                                className="regular-text"
                              >
                                <option value="">Select State</option>
                                {states.map(state => (
                                  <option key={state} value={state}>{state}</option>
                                ))}
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">ZIP Code</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.zip}
                                onChange={(e) => updateForm('zip', e.target.value)}
                                className="regular-text" 
                                pattern="[0-9]{5}(-[0-9]{4})?" 
                                title="Enter a valid ZIP code (e.g., 12345 or 12345-6789)"
                                placeholder="12345"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Years of Experience</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_years}
                                onChange={(e) => updateForm('about_years', e.target.value)}
                                className="regular-text" 
                                placeholder="15+"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Use Dynamic Template</th>
                            <td>
                              <input 
                                type="checkbox" 
                                checked={form.use_dynamic_template}
                                onChange={(e) => updateForm('use_dynamic_template', e.target.checked)}
                              />
                              <span style={{marginLeft: '8px'}}>Enable dynamic content (recommended)</span>
                              <p className="description">When enabled, all content from the admin panel will be displayed on the homepage. When disabled, static content will be used.</p>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">OpenAI API Key</th>
                            <td>
                              <input 
                                type="password" 
                                value={form.openai_api_key}
                                onChange={(e) => updateForm('openai_api_key', e.target.value)}
                                className="regular-text" 
                                placeholder="sk-..."
                              />
                              <p className="description">Required for AI content generation. Get your API key from <a href="https://platform.openai.com/account/api-keys" target="_blank">OpenAI</a>.</p>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">OpenRouter API Key</th>
                            <td>
                              <input 
                                type="password" 
                                value={form.openrouter_api_key}
                                onChange={(e) => updateForm('openrouter_api_key', e.target.value)}
                                className="regular-text" 
                                placeholder="sk-or-..."
                              />
                              <p className="description">Alternative to OpenAI for AI content generation. Get your API key from <a href="https://openrouter.ai/keys" target="_blank">OpenRouter</a>.</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
					</div>

                    <div className="bsg-section">
                      <h3 style={{color: '#1f2937'}}>Color Theme</h3>
                      <p className="description">Choose a color scheme for your website</p>
                      <div style={{
                        margin: '8px 0 16px 0',
                        padding: '12px',
                        background: form.use_default_color_scheme ? '#d1fae5' : '#f9fafb',
                        border: form.use_default_color_scheme ? '2px solid #10b981' : '2px solid #e5e7eb',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease'
                      }}>
                        <label style={{display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer'}}>
                          <input
                            type="checkbox"
                            checked={form.use_default_color_scheme ?? true}
                            onChange={(e) => {
                              updateForm('use_default_color_scheme', e.target.checked);
                              if (e.target.checked) {
                                setSuccess('✅ Professional dark theme applied to all sections!');
                                setTimeout(() => setSuccess(''), 3000);
                              }
                            }}
                            style={{width: '18px', height: '18px', cursor: 'pointer'}}
                          />
                          <span style={{fontWeight: 500, color: form.use_default_color_scheme ? '#065f46' : '#374151'}}>
                            Use default color scheme (recommended)
                          </span>
                        </label>
                        {form.use_default_color_scheme && (
                          <p style={{
                            margin: '8px 0 0 26px',
                            fontSize: '13px',
                            color: '#059669',
                            lineHeight: '1.5'
                          }}>
                            ✓ Professional dark theme with white text is now applied to all sections. Uncheck to customize colors manually.
                          </p>
                        )}
                      </div>
                      
                      <div style={{
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                        gap: '12px', 
                        marginBottom: '20px',
                        maxWidth: '100%',
                        opacity: (form.use_default_color_scheme ?? true) ? 0.5 : 1,
                        pointerEvents: (form.use_default_color_scheme ?? true) ? 'none' : 'auto'
                      }}>
                        {[
                          { name: 'Landscaping', primary: '#059669', secondary: '#10b981', accent: '#16a34a' },
                          { name: 'Professional', primary: '#1e40af', secondary: '#3b82f6', accent: '#2563eb' },
                          { name: 'Modern', primary: '#16a34a', secondary: '#22c55e', accent: '#15803d' },
                          { name: 'Ocean', primary: '#0ea5e9', secondary: '#0284c7', accent: '#0369a1' },
                          { name: 'Emerald', primary: '#10b981', secondary: '#059669', accent: '#047857' },
                          { name: 'Amber', primary: '#f59e0b', secondary: '#d97706', accent: '#b45309' },
                          { name: 'Rose', primary: '#f43f5e', secondary: '#e11d48', accent: '#be123c' },
                          { name: 'Slate', primary: '#64748b', secondary: '#475569', accent: '#334155' },
                          { name: 'Violet', primary: '#8b5cf6', secondary: '#7c3aed', accent: '#6d28d9' },
                          { name: 'Indigo', primary: '#6366f1', secondary: '#4f46e5', accent: '#4338ca' },
                          { name: 'Sky', primary: '#0ea5e9', secondary: '#0284c7', accent: '#0369a1' },
                          { name: 'Lime', primary: '#84cc16', secondary: '#65a30d', accent: '#4d7c0f' },
                          { name: 'Orange', primary: '#f97316', secondary: '#ea580c', accent: '#c2410c' },
                          { name: 'Pink', primary: '#ec4899', secondary: '#db2777', accent: '#be185d' },
                          { name: 'Neutral', primary: '#6b7280', secondary: '#4b5563', accent: '#374151' }
                        ].map((theme) => (
                          <div
                            key={theme.name}
                            style={{
                              border: form.color_theme === theme.name.toLowerCase() ? '2px solid #0073aa' : '1px solid #ddd',
                              borderRadius: '8px',
                              padding: '12px',
                              textAlign: 'center',
                              cursor: 'pointer',
                              backgroundColor: form.color_theme === theme.name.toLowerCase() ? '#f0f8ff' : '#fff',
                              transition: 'all 0.2s ease'
                            }}
                            onClick={() => { updateForm('color_theme', theme.name.toLowerCase()); }}
                          >
                            
                            {/* Color swatch - horizontal strip with 3 colors */}
                            <div style={{
                              display: 'flex',
                              width: '100%',
                              height: '20px',
                              borderRadius: '4px',
                              overflow: 'hidden',
                              margin: '0 auto 8px',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                            }}>
                              <div style={{
                                flex: 1,
                                backgroundColor: theme.primary
                              }} />
                              <div style={{
                                flex: 1,
                                backgroundColor: theme.secondary
                              }} />
                              <div style={{
                                flex: 1,
                                backgroundColor: theme.accent
                              }} />
						</div>
                            
                            {/* Theme name */}
                            <div style={{
                              fontSize: '13px',
                              fontWeight: 600,
                              color: form.color_theme === theme.name.toLowerCase() ? '#0073aa' : '#374151',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}>
                              {theme.name}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Custom Color Options */}
                      <div style={{
                        marginTop: '20px',
                        padding: '20px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <h4 style={{margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600'}}>Customize Colors</h4>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', opacity: (form.use_default_color_scheme ?? true) ? 0.5 : 1, pointerEvents: (form.use_default_color_scheme ?? true) ? 'none' : 'auto'}}>
                          <div>
                            <label style={{display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500'}}>Primary Color</label>
                            <input
                              type="color"
                              value={form.global_primary_color || getThemeColors(form.color_theme).primary}
                              onChange={(e) => updateForm('global_primary_color', e.target.value)}
                              style={{width: '100%', height: '40px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer'}}
                            />
                          </div>
                          <div>
                            <label style={{display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500'}}>Secondary Color</label>
                            <input
                              type="color"
                              value={form.global_secondary_color || getThemeColors(form.color_theme).secondary}
                              onChange={(e) => updateForm('global_secondary_color', e.target.value)}
                              style={{width: '100%', height: '40px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer'}}
                            />
                          </div>
                          <div>
                            <label style={{display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500'}}>Heading Color</label>
                            <input
                              type="color"
                              value={form.heading_color || getThemeColors(form.color_theme).text}
                              onChange={(e) => updateForm('heading_color', e.target.value)}
                              style={{width: '100%', height: '40px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer'}}
                            />
                          </div>
                          <div>
                            <label style={{display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500'}}>Button Color</label>
                            <input
                              type="color"
                              value={form.button_primary_color || getThemeColors(form.color_theme).primary}
                              onChange={(e) => updateForm('button_primary_color', e.target.value)}
                              style={{width: '100%', height: '40px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer'}}
                            />
                          </div>
                          <div>
                            <label style={{display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500'}}>Navigation Background</label>
                            <input
                              type="color"
                              value={form.nav_bg_color || getThemeColors(form.color_theme).dark}
                              onChange={(e) => updateForm('nav_bg_color', e.target.value)}
                              style={{width: '100%', height: '40px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer'}}
                            />
                          </div>
                          <div>
                            <label style={{display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500'}}>Navigation Text</label>
                            <input
                              type="color"
                              value={form.nav_text_color || getThemeColors(form.color_theme).text}
                              onChange={(e) => updateForm('nav_text_color', e.target.value)}
                              style={{width: '100%', height: '40px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer'}}
                            />
                          </div>
                        </div>
                        <p style={{fontSize: '13px', color: '#6b7280', marginTop: '12px', marginBottom: 0}}>
                          Customize individual colors or select a theme above for coordinated colors.
                        </p>
                      </div>

                      {/* Preview Box */}
                      <div style={{
                        border: `2px solid ${form.global_primary_color || '#2563eb'}`,
                        borderRadius: '12px',
                        padding: '28px',
                        backgroundColor: form.use_default_color_scheme ? '#fef9e7' : (getThemeColors(form.color_theme || 'ocean').light),
                        marginTop: '20px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                      }}>
                        <div style={{
                          fontWeight: 700,
                          marginBottom: '20px',
                          color: form.use_default_color_scheme ? '#78350f' : (getThemeColors(form.color_theme || 'ocean').text),
                          fontSize: '14px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          PREVIEW
                        </div>
                        
                        {/* Preview content */}
                        <div style={{
                          padding: '0',
                          color: form.use_default_color_scheme ? '#78350f' : (getThemeColors(form.color_theme || 'ocean').text),
                          marginBottom: '16px',
                          fontSize: '22px',
                          fontWeight: 700,
                          textAlign: 'left'
                        }}>
                          Section Heading
                        </div>
                        
                        <p style={{
                          fontSize: '15px',
                          color: form.use_default_color_scheme ? '#1a1a1a' : (getThemeColors(form.color_theme || 'ocean').text),
                          marginBottom: '24px',
                          lineHeight: '1.6',
                          fontWeight: 400
                        }}>
                          Body text preview showing how your content will look.
                        </p>
                        
                        <button style={{
                          backgroundColor: form.use_default_color_scheme ? '#f59e0b' : (form.global_primary_color || getThemeColors(form.color_theme || 'ocean').primary),
                          color: '#ffffff',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '6px',
                          fontSize: '15px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: 'none',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '0.9';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '1';
                        }}>
                          Primary Button
                        </button>
                        
                        <p style={{
                          fontSize: '13px',
                          color: '#6b7280',
                          marginTop: '12px',
                          marginBottom: 0,
                          lineHeight: '1.5',
                          fontStyle: 'italic'
                        }}>
                          Selecting a theme applies coordinated colors across sections, buttons, headings and text. You can still fine-tune colors in each tab.
                        </p>
                      </div>
                    </div>

                    <div className="bsg-section">
                      <h3 style={{color: '#1f2937'}}>SEO Settings</h3>
                      <p className="description">Optimize your homepage for search engines</p>
                      <table className="form-table">
                        <tbody>
                          <tr>
                            <th scope="row">Homepage Meta Title</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.homepage_meta_title}
                                onChange={(e) => updateForm('homepage_meta_title', e.target.value)}
                                className="large-text" 
                                placeholder={`${form.business_name || 'Your Business'} - Professional Roofing Services in ${form.location || 'Your Area'}`}
                              />
                              <p className="description">The title that appears in search engine results. Recommended length: 50-60 characters. Leave empty to use default format.</p>
                              <div style={{marginTop: '8px', fontSize: '12px', color: '#666'}}>
                                Character count: {form.homepage_meta_title.length}/60
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Homepage Meta Description</th>
                            <td>
                              <textarea 
                                value={form.homepage_meta_description}
                                onChange={(e) => updateForm('homepage_meta_description', e.target.value)}
                                className="large-text" 
                                rows={3} 
                                placeholder={`${form.business_name || 'Your Business'} provides professional roofing services in ${form.location || 'your area'}. Get free estimates, expert installation, and reliable repairs. Call ${form.phone || '(555) 123-4567'} today!`}
                              />
                              <p className="description">The description that appears in search engine results. Recommended length: 150-160 characters. Leave empty to use default format.</p>
                              <div style={{marginTop: '8px', fontSize: '12px', color: '#666'}}>
                                Character count: {form.homepage_meta_description.length}/160
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Homepage Meta Keywords</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.homepage_meta_keywords}
                                onChange={(e) => updateForm('homepage_meta_keywords', e.target.value)}
                                className="large-text" 
                                placeholder="roofing services, roof repair, roof installation, roofing contractor"
                              />
                              <p className="description">Keywords for search engines (optional). Separate with commas. Note: Modern search engines rely less on meta keywords.</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      
                      {/* Live SEO Preview */}
                      <div style={{
                        marginTop: '20px',
                        padding: '16px',
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px'
                      }}>
                        <h4 style={{margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#495057'}}>Search Engine Preview</h4>
                        <div style={{
                          backgroundColor: 'white',
                          border: '1px solid #e9ecef',
                          borderRadius: '4px',
                          padding: '12px'
                        }}>
                          <div style={{
                            color: '#1a0dab',
                            fontSize: '16px',
                            fontWeight: '400',
                            lineHeight: '1.3',
                            marginBottom: '4px',
                            cursor: 'pointer'
                          }}>
                            {form.homepage_meta_title || `${form.business_name || 'Your Business'} - Professional Roofing Services in ${form.location || 'Your Area'}`}
                          </div>
                          <div style={{
                            color: '#006621',
                            fontSize: '14px',
                            lineHeight: '1.3',
                            marginBottom: '4px'
                          }}>
                            {form.business_name || 'Your Business'} • {form.location || 'Your Area'} • {form.phone || '(555) 123-4567'}
                          </div>
                          <div style={{
                            color: '#545454',
                            fontSize: '14px',
                            lineHeight: '1.4'
                          }}>
                            {form.homepage_meta_description || `${form.business_name || 'Your Business'} provides professional roofing services in ${form.location || 'your area'}. Get free estimates, expert installation, and reliable repairs. Call ${form.phone || '(555) 123-4567'} today!`}
                          </div>
                        </div>
                      </div>
                    </div>
                    

					</div>
				)}

                {/* Hero Tab */}
                {activeTab === 'hero' && (
                  <div className="bsg-section">
                    <h3 style={{color: '#1f2937'}}>Hero Section</h3>
                    <table className="form-table">
                      <tbody>
                        <tr>
                          <th scope="row">Show Hero Section</th>
                          <td>
                            <input 
                              type="checkbox" 
                              checked={form.hero_visible || true}
                              onChange={(e) => updateForm('hero_visible', e.target.checked)}
                            />
                            <span style={{marginLeft: '8px'}}>Show this section</span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Headline</th>
                          <td>
                            <input 
                              type="text" 
                              value={form.hero_headline || 'Find Roofers Near You'}
                              onChange={(e) => updateForm('hero_headline', e.target.value)}
                              className="regular-text" 
                              placeholder="e.g., Find Roofers Near You"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Description</th>
                          <td>
                            <textarea 
                              value={form.hero_description}
                              onChange={(e) => updateForm('hero_description', e.target.value)}
                              className="large-text" 
                              rows={3} 
                              placeholder="Hero section description..."
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">CTA Button Text</th>
                          <td>
                            <input 
                              type="text" 
                              value={form.hero_cta || 'Rated 5 Stars On Google'}
                              onChange={(e) => updateForm('hero_cta', e.target.value)}
                              className="regular-text" 
                              placeholder="e.g., Rated 5 Stars On Google"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">CTA Button Link</th>
                          <td>
                            <input 
                              type="text" 
                              value={form.hero_cta_link || '#contact'}
                              onChange={(e) => updateForm('hero_cta_link', e.target.value)}
                              className="regular-text" 
                              placeholder="e.g., #contact or /estimate"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Rating Text</th>
                          <td>
                            <input 
                              type="text" 
                              value={form.hero_rating || 'Rated 5 Stars On Google'}
                              onChange={(e) => updateForm('hero_rating', e.target.value)}
                              className="regular-text" 
                              placeholder="e.g., Rated 5 Stars On Google"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Background Image URL</th>
                          <td>
                            <input 
                              type="text" 
                              value={form.hero_bg_image}
                              onChange={(e) => updateForm('hero_bg_image', e.target.value)}
                              className="regular-text" 
                              placeholder="https://example.com/hero-bg.jpg"
                            />
                          </td>
                        </tr>
                        {form.hero_bg_image && form.hero_bg_image.trim() !== '' && (
                          <tr>
                            <th scope="row">Background Image Preview</th>
                            <td>
                              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px'}}>
                                <div style={{position: 'relative'}}>
                                  <img 
                                    src={form.hero_bg_image} 
                                    alt="Hero background preview" 
                                    style={{
                                      width: '150px',
                                      height: '80px',
                                      objectFit: 'cover',
                                      borderRadius: '4px',
                                      border: '1px solid #334155'
                                    }}
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                      if (nextElement) nextElement.style.display = 'flex';
                                    }}
                                  />
                                  <div 
                                    style={{
                                      width: '150px',
                                      height: '80px',
                                      background: '#374151',
                                      borderRadius: '4px',
                                      border: '1px solid #334155',
                                      display: 'none',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      color: '#9ca3af',
                                      fontSize: '12px',
                                      textAlign: 'center',
                                      position: 'absolute',
                                      top: 0,
                                      left: 0
                                    }}
                                  >
                                    Failed to load
                                  </div>
                                </div>
                                <div>
                                  <p style={{color: '#d1d5db', fontSize: '12px', margin: '0 0 4px 0'}}>
                                    <strong>URL:</strong><br />
                                    <span style={{wordBreak: 'break-all', fontSize: '11px'}}>{form.hero_bg_image}</span>
                                  </p>
                                  <p style={{color: '#9ca3af', fontSize: '11px', margin: '0'}}>
                                    This will be the hero section background
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                        <tr>
                          <th scope="row">Use Same Image on All Pages</th>
                          <td>
                            <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                              <input
                                type="checkbox"
                                checked={form.use_global_hero_image ?? true}
                                onChange={(e) => updateForm('use_global_hero_image', e.target.checked)}
                                style={{margin: 0}}
                              />
                              <span style={{color: '#d1d5db', fontSize: '14px'}}>
                                Apply this background image to About, Services, and Location pages
                              </span>
                            </label>
                          </td>
                        </tr>
                        {!form.use_global_hero_image && (
                          <>
                            <tr>
                              <th scope="row">About Page Hero Image</th>
                              <td>
                                <input 
                                  type="text" 
                                  value={form.about_page_hero_bg_image}
                                  onChange={(e) => updateForm('about_page_hero_bg_image', e.target.value)}
                                  className="regular-text" 
                                  placeholder="https://example.com/about-hero-bg.jpg"
                                />
                                {form.about_page_hero_bg_image && form.about_page_hero_bg_image.trim() !== '' && (
                                  <div style={{marginTop: '8px'}}>
                                    <img 
                                      src={form.about_page_hero_bg_image} 
                                      alt="About page hero preview" 
                                      style={{
                                        width: '120px',
                                        height: '60px',
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                        border: '1px solid #374151'
                                      }}
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                  </div>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Services Page Hero Image</th>
                              <td>
                                <input 
                                  type="text" 
                                  value={form.service_page_hero_bg_image}
                                  onChange={(e) => updateForm('service_page_hero_bg_image', e.target.value)}
                                  className="regular-text" 
                                  placeholder="https://example.com/services-hero-bg.jpg"
                                />
                                {form.service_page_hero_bg_image && form.service_page_hero_bg_image.trim() !== '' && (
                                  <div style={{marginTop: '8px'}}>
                                    <img 
                                      src={form.service_page_hero_bg_image} 
                                      alt="Services page hero preview" 
                                      style={{
                                        width: '120px',
                                        height: '60px',
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                        border: '1px solid #374151'
                                      }}
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                  </div>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Location Page Hero Image</th>
                              <td>
                                <input 
                                  type="text" 
                                  value={form.location_page_hero_bg_image}
                                  onChange={(e) => updateForm('location_page_hero_bg_image', e.target.value)}
                                  className="regular-text" 
                                  placeholder="https://example.com/location-hero-bg.jpg"
                                />
                                {form.location_page_hero_bg_image && form.location_page_hero_bg_image.trim() !== '' && (
                                  <div style={{marginTop: '8px'}}>
                                    <img 
                                      src={form.location_page_hero_bg_image} 
                                      alt="Location page hero preview" 
                                      style={{
                                        width: '120px',
                                        height: '60px',
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                        border: '1px solid #374151'
                                      }}
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                  </div>
                                )}
                              </td>
                            </tr>
                          </>
                        )}
                        <tr>
                          <th scope="row">Background Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.hero_bg_color || '#2563eb'}
                              onChange={(e) => updateForm('hero_bg_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Section Padding (px)</th>
                          <td>
                            <input 
                              type="number" 
                              value={form.hero_padding || 80}
                              onChange={(e) => updateForm('hero_padding', parseInt(e.target.value))}
                              min="0" 
                              max="300"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Company Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.hero_company_color || '#b0b0b0'}
                              onChange={(e) => updateForm('hero_company_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Heading Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.hero_heading_color || '#232834'}
                              onChange={(e) => updateForm('hero_heading_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Subheading Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.hero_subheading_color || '#b0b0b0'}
                              onChange={(e) => updateForm('hero_subheading_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Description Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.hero_description_color || '#b0b0b0'}
                              onChange={(e) => updateForm('hero_description_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Reviews Text Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.hero_reviews_text_color || '#232834'}
                              onChange={(e) => updateForm('hero_reviews_text_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Reviews Star Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.hero_reviews_star_color || '#fbbf24'}
                              onChange={(e) => updateForm('hero_reviews_star_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Book Button Background</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.hero_book_btn_bg || '#2ee6c5'}
                              onChange={(e) => updateForm('hero_book_btn_bg', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Book Button Text Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.hero_book_btn_text || '#ffffff'}
                              onChange={(e) => updateForm('hero_book_btn_text', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Call Button Background</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.hero_call_btn_bg || '#232834'}
                              onChange={(e) => updateForm('hero_call_btn_bg', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Call Button Text Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.hero_call_btn_text || '#ffffff'}
                              onChange={(e) => updateForm('hero_call_btn_text', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Book Button Link</th>
                          <td>
                            <input 
                              type="text" 
                              value={form.hero_book_btn_link || '#'}
                              onChange={(e) => updateForm('hero_book_btn_link', e.target.value)}
                              className="regular-text" 
                              placeholder="e.g., # or /estimate"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Call Button Link</th>
                          <td>
                            <input 
                              type="text" 
                              value={form.hero_call_btn_link || 'tel:'}
                              onChange={(e) => updateForm('hero_call_btn_link', e.target.value)}
                              className="regular-text" 
                              placeholder="e.g., tel:555-123-4567"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Hero Side Image URL</th>
                          <td>
                            <input 
                              type="text" 
                              value={form.hero_side_image || ''}
                              onChange={(e) => updateForm('hero_side_image', e.target.value)}
                              className="regular-text" 
                              placeholder="https://..."
                            />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const url = URL.createObjectURL(file);
                                updateForm('hero_side_image', url);
                              }}
                              style={{marginLeft: 8}}
                            />
                            <p className="description">This image replaces the form on the right side of the hero.</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    {/* Hero Side Image Preview */}
                    {form.hero_side_image && form.hero_side_image.trim() !== '' && (
                      <div style={{marginTop: '20px', padding: '20px', background: '#0f172a', borderRadius: '8px', border: '1px solid #334155'}}>
                        <h4 style={{color: '#f1f5f9', marginBottom: '12px', fontSize: '16px'}}>Hero Side Image Preview</h4>
                        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                          <div style={{position: 'relative'}}>
                            <img 
                              src={form.hero_side_image} 
                              alt="Hero side image preview" 
                              style={{
                                width: '200px',
                                height: '120px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: '2px solid #334155'
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                if (nextElement) nextElement.style.display = 'flex';
                              }}
                            />
                            <div 
                              style={{
                                width: '200px',
                                height: '120px',
                                background: '#374151',
                                borderRadius: '8px',
                                border: '2px solid #334155',
                                display: 'none',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#9ca3af',
                                fontSize: '14px',
                                textAlign: 'center',
                                position: 'absolute',
                                top: 0,
                                left: 0
                              }}
                            >
                              Image failed to load
                            </div>
                          </div>
                          <div style={{flex: 1}}>
                            <p style={{color: '#d1d5db', fontSize: '14px', margin: '0 0 8px 0'}}>
                              <strong>Image URL:</strong><br />
                              <span style={{wordBreak: 'break-all', fontSize: '12px'}}>{form.hero_side_image}</span>
                            </p>
                            <p style={{color: '#9ca3af', fontSize: '12px', margin: '0'}}>
                              This image will be displayed on the right side of the hero section.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Features Tab */}
                {activeTab === 'features' && (
                  <div className="bsg-section" style={{background: '#1e293b', color: '#f1f5f9', padding: '20px', borderRadius: '8px', border: '1px solid #334155'}}>
                    <h3 style={{color: '#f1f5f9', marginBottom: '20px'}}>| Features Row</h3>
                    <table style={{width: '100%', borderCollapse: 'collapse'}}>
                      <tbody>
                        <tr>
                          <th scope="row">Show Features Section</th>
                          <td>
                            <input 
                              type="checkbox" 
                              checked={form.features_visible || true}
                              onChange={(e) => updateForm('features_visible', e.target.checked)}
                            />
                            <span style={{marginLeft: '8px'}}>Show this section</span>
                          </td>
                        </tr>
                        
                        <tr>
                          <th scope="row">Section Background Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.features_bg_color || '#ffffff'}
                              onChange={(e) => updateForm('features_bg_color', e.target.value)}
                              style={{width: 40, height: 40, border: 'none', borderRadius: 4, cursor: 'pointer'}}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Card Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.features_card_bg || '#f8f9fa'}
                              onChange={(e) => updateForm('features_card_bg', e.target.value)}
                              style={{width: 40, height: 40, border: 'none', borderRadius: 4, cursor: 'pointer'}}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Text Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.features_text_color || '#23282d'}
                              onChange={(e) => updateForm('features_text_color', e.target.value)}
                              style={{width: 40, height: 40, border: 'none', borderRadius: 4, cursor: 'pointer'}}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Icon Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.features_icon_color || '#14b8a6'}
                              onChange={(e) => updateForm('features_icon_color', e.target.value)}
                              style={{width: 40, height: 40, border: 'none', borderRadius: 4, cursor: 'pointer'}}
                            />
                            <span className="description" style={{marginLeft: 8, color: '#94a3b8'}}>Color for feature icons</span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Section Padding (px)</th>
                          <td>
                            <input 
                              type="number" 
                              value={form.features_padding || 80}
                              onChange={(e) => updateForm('features_padding', parseInt(e.target.value))}
                              min="0" 
                              max="300"
                              style={{background: '#0f172a', border: '1px solid #334155', borderRadius: 4, padding: '8px 12px', color: '#f1f5f9', width: '100%'}}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <div style={{marginTop: 20, padding: '16px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px'}}>
                      <h4 style={{color: '#f1f5f9', margin: 0, marginBottom: 8}}>| Features List</h4>
                      <p className="description" style={{color: '#94a3b8'}}>Add your business features here.</p>
                      
                      {features.map((feature, index) => (
                        <div key={feature.id} style={{background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '16px', marginBottom: '12px'}}>
                          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 8}}>
                            <div style={{color:'#94a3b8', fontSize:12}}>Feature {index + 1}</div>
                            <button type="button" className="button" onClick={() => removeFeature(feature.id)} disabled={features.length === 1}>Remove</button>
                          </div>
                          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'end'}}>
                            <div>
                              <label style={{fontWeight: 600, display: 'block', marginBottom: 6}}>Icon (Dashicon class or SVG URL)</label>
                              <input
                                type="text"
                                className="regular-text"
                                value={feature.icon}
                                onChange={(e) => updateFeature(feature.id, 'icon', e.target.value)}
                                placeholder="e.g., dashicons-awards or https://.../icon.svg"
                                style={{background: '#0f172a', border: '1px solid #334155', borderRadius: 4, padding: '8px 12px', color: '#f1f5f9'}}
                              />
                            </div>
                            <div>
                              <label style={{fontWeight: 600, display: 'block', marginBottom: 6}}>Title</label>
                              <input
                                type="text"
                                className="regular-text"
                                value={feature.title}
                                onChange={(e) => updateFeature(feature.id, 'title', e.target.value)}
                                placeholder="e.g., Thorough Site Inspection"
                                style={{background: '#0f172a', border: '1px solid #334155', borderRadius: 4, padding: '8px 12px', color: '#f1f5f9'}}
                              />
                            </div>
                          </div>
                          <div style={{marginTop: '0.75rem'}}>
                            <label style={{fontWeight: 600, display: 'block', marginBottom: 6}}>Description</label>
                            <textarea
                              className="regular-text"
                              style={{width: '100%', minHeight: 80, background: '#0f172a', border: '1px solid #334155', borderRadius: 4, padding: '8px 12px', color: '#f1f5f9'}}
                              value={feature.description}
                              onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                              placeholder="e.g., Detailed assessment to ensure precise planning and care"
                            />
                          </div>
                        </div>
                      ))}
                      
                      <button type="button" className="button button-primary" onClick={addFeature} style={{marginTop: '1rem', marginRight: 10}}>
                        + Add Feature
                      </button>
                      
                      <button 
                        type="button" 
                        className="button button-secondary"
                        onClick={generateFeaturesAI}
                        disabled={loading}
                        style={{marginTop: '1rem'}}
                      >
                        {loading ? '🔄 Generating...' : '🔧 Generate Features with AI'}
                      </button>
						</div>
					</div>
				)}

                {/* About Tab */}
                {activeTab === 'about' && (
                  <div>
                    {/* Homepage About Section */}
                    <div className="bsg-section">
                      <h3 style={{color: '#1f2937'}}>Homepage About Section</h3>
                      <table className="form-table">
                        <tbody>
                          <tr>
                            <th scope="row">Tagline</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_tagline || 'WHO WE ARE'}
                                onChange={(e) => updateForm('about_tagline', e.target.value)}
                                className="regular-text" 
                                placeholder="e.g., WHO WE ARE"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Tagline Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_tagline_color || '#0ea5e9'}
                                onChange={(e) => updateForm('about_tagline_color', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Heading</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_heading || 'About Our Company'}
                                onChange={(e) => updateForm('about_heading', e.target.value)}
                                className="regular-text" 
                                placeholder="e.g., About Our Company"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Heading Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_heading_color || '#000000'}
                                onChange={(e) => updateForm('about_heading_color', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Description [HTML allowed]</th>
                            <td>
                              <textarea 
                                value={form.about_description}
                                onChange={(e) => updateForm('about_description', e.target.value)}
                                className="large-text" 
                                rows={4} 
                                placeholder="You can paste HTML here, it will be rendered directly into the description."
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Description Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_description_color || '#6b7280'}
                                onChange={(e) => updateForm('about_description_color', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Description Font Size</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_description_font_size || '0.90rem'}
                                onChange={(e) => updateForm('about_description_font_size', e.target.value)}
                                className="regular-text" 
                                placeholder="e.g., 0.90rem, 14px, 1.2em"
                              />
                              <p className="description">Font size for the description text (supports rem, px, em)</p>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Experience Button Text</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_experience_text || 'Years of Experience'}
                                onChange={(e) => updateForm('about_experience_text', e.target.value)}
                                className="regular-text" 
                                placeholder="e.g., Years of Experience"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Years of Experience</th>
                            <td>
                              <input 
                                type="number" 
                                value={form.about_years || 15}
                                onChange={(e) => updateForm('about_years', parseInt(e.target.value))}
                                min="0" 
                                max="100"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Experience Button Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_experience_bg || '#374151'}
                                onChange={(e) => updateForm('about_experience_bg', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Experience Button Text Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_experience_text_color || '#0ea5e9'}
                                onChange={(e) => updateForm('about_experience_text_color', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">CTA Button Text</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_button_text || 'About Us'}
                                onChange={(e) => updateForm('about_button_text', e.target.value)}
                                className="regular-text" 
                                placeholder="e.g., About Us"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">CTA Button Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_button_color || '#14b8a6'}
                                onChange={(e) => updateForm('about_button_color', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">CTA Text Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_button_text_color || '#374151'}
                                onChange={(e) => updateForm('about_button_text_color', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">CTA Button Link</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_button_link || 'about-us'}
                                onChange={(e) => updateForm('about_button_link', e.target.value)}
                                className="regular-text" 
                                placeholder="e.g., about-us"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Image URL (Left Side)</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_image || ''}
                                onChange={(e) => updateForm('about_image', e.target.value)}
                                className="regular-text" 
                                placeholder="Image URL..."
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Background Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_bg_color || '#374151'}
                                onChange={(e) => updateForm('about_bg_color', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Left Margin (px)</th>
                            <td>
                              <input 
                                type="number" 
                                value={form.about_margin_left || 60}
                                onChange={(e) => updateForm('about_margin_left', parseInt(e.target.value))}
                                min="0" 
                                max="200"
                                style={{background: '#0f172a', border: '1px solid #334155', borderRadius: 4, padding: '8px 12px', color: '#f1f5f9', width: '100%'}}
                              />
                              <p className="description">Left margin for the about section</p>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Right Margin (px)</th>
                            <td>
                              <input 
                                type="number" 
                                value={form.about_margin_right || 60}
                                onChange={(e) => updateForm('about_margin_right', parseInt(e.target.value))}
                                min="0" 
                                max="200"
                                style={{background: '#0f172a', border: '1px solid #334155', borderRadius: 4, padding: '8px 12px', color: '#f1f5f9', width: '100%'}}
                              />
                              <p className="description">Right margin for the about section</p>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Text Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_text_color || '#000000'}
                                onChange={(e) => updateForm('about_text_color', e.target.value)}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      
                      {/* AI Generation Box */}
                      <div style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '20px',
                        marginTop: '20px'
                      }}>
                        <div style={{marginBottom: '15px'}}>
                          <input 
                            type="checkbox" 
                            checked={form.about_use_default_prompts || true}
                            onChange={(e) => updateForm('about_use_default_prompts', e.target.checked)}
                            style={{marginRight: '8px'}}
                          />
                          <span>Use Default AI Prompts</span>
                        </div>
                        <p style={{color: '#6b7280', marginBottom: '15px'}}>
                          Generate AI-powered content for your homepage about section.
                        </p>
                        <div style={{textAlign: 'left'}}>
                          <button 
                            type="button" 
                            className="button button-primary"
                            onClick={() => generateAboutAI()}
                            disabled={loading}
                          >
                            {loading ? '🔄 Generating...' : '🔧 Generate Homepage About Content'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* About Us Page Section */}
                    <div className="bsg-section">
                      <h3 style={{color: '#1f2937'}}>About Us Page Section</h3>
                      
                      {/* Hero Section */}
                      <h4 style={{marginTop: '20px', marginBottom: '15px', color: '#374151'}}>Hero Section</h4>
                      <table className="form-table">
                        <tbody>
                          <tr>
                            <th scope="row">Hero Tagline</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_page_hero_tagline || 'ABOUT'}
                                onChange={(e) => updateForm('about_page_hero_tagline', e.target.value)}
                                className="regular-text" 
                                placeholder="e.g., ABOUT"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Hero Title</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_page_hero_title || 'Roofing Services You Can Count On'}
                                onChange={(e) => updateForm('about_page_hero_title', e.target.value)}
                                className="regular-text" 
                                placeholder="e.g., Roofing Services You Can Count On"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Hero Tagline Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_hero_tagline_color || '#6b7280'}
                                onChange={(e) => updateForm('about_page_hero_tagline_color', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Hero Heading Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_hero_heading_color || '#ffffff'}
                                onChange={(e) => updateForm('about_page_hero_heading_color', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Hero Background Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_hero_bg_color || '#374151'}
                                onChange={(e) => updateForm('about_page_hero_bg_color', e.target.value)}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Who We Are Section */}
                      <h4 style={{marginTop: '30px', marginBottom: '15px', color: '#374151'}}>Who We Are Section</h4>
                      <table className="form-table">
                        <tbody>
                          <tr>
                            <th scope="row">Tagline</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_page_who_tagline || 'WHO WE ARE'}
                                onChange={(e) => updateForm('about_page_who_tagline', e.target.value)}
                                className="regular-text" 
                                placeholder="e.g., WHO WE ARE"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Tagline Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_who_tagline_color || '#14b8a6'}
                                onChange={(e) => updateForm('about_page_who_tagline_color', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Headline</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_page_who_headline || 'About'}
                                onChange={(e) => updateForm('about_page_who_headline', e.target.value)}
                                className="regular-text" 
                                placeholder="e.g., About"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Description</th>
                            <td>
                              <textarea 
                                value={form.about_page_who_description}
                                onChange={(e) => updateForm('about_page_who_description', e.target.value)}
                                className="large-text" 
                                rows={4} 
                                placeholder="Description for Who We Are section..."
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Team Image URL</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_page_team_image || ''}
                                onChange={(e) => updateForm('about_page_team_image', e.target.value)}
                                className="regular-text" 
                                placeholder="Team image URL..."
                              />
                              <div style={{marginTop: 10, padding: 10, background: '#0f172a', border: '1px solid #334155', borderRadius: 6}}>
                                {form.about_page_team_image?.trim() ? (
                                  <div style={{display:'flex', alignItems:'center', gap:12}}>
                                    <img 
                                      src={form.about_page_team_image} 
                                      alt="Team preview" 
                                      style={{width: 200, height: 120, objectFit: 'cover', borderRadius: 6, border: '1px solid #334155'}}
                                      onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}}
                                    />
                                    <div style={{color:'#cbd5e1', fontSize:12, wordBreak:'break-all'}}>{form.about_page_team_image}</div>
                                  </div>
                                ) : (
                                  <p style={{margin:0, color:'#9ca3af'}}>No image selected</p>
                                )}
                                <div style={{marginTop:10}}>
                                  <button 
                                    type="button" 
                                    className="button button-secondary"
                                    onClick={()=>{ const url = prompt('Enter image URL'); if (url) updateForm('about_page_team_image', url); }}
                                  >📁 Upload Image</button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Homepage About Image</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_home_image || ''}
                                onChange={(e) => updateForm('about_home_image', e.target.value)}
                                className="regular-text" 
                                placeholder="Homepage About image URL..."
                              />
                              <div style={{marginTop: 10, padding: 10, background: '#0f172a', border: '1px solid #334155', borderRadius: 6}}>
                                {form.about_home_image?.trim() ? (
                                  <div style={{display:'flex', alignItems:'center', gap:12}}>
                                    <img 
                                      src={form.about_home_image} 
                                      alt="Homepage About preview" 
                                      style={{width: 200, height: 120, objectFit: 'cover', borderRadius: 6, border: '1px solid #334155'}}
                                      onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}}
                                    />
                                    <div style={{color:'#cbd5e1', fontSize:12, wordBreak:'break-all'}}>{form.about_home_image}</div>
                                  </div>
                                ) : (
                                  <p style={{margin:0, color:'#9ca3af'}}>No image selected</p>
                                )}
                                <div style={{marginTop:10}}>
                                  <button 
                                    type="button" 
                                    className="button button-secondary"
                                    onClick={()=>{ const url = prompt('Enter image URL'); if (url) updateForm('about_home_image', url); }}
                                  >📁 Upload Image</button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Who We Are Background Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_who_bg || '#ffffff'}
                                onChange={(e) => updateForm('about_page_who_bg', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Who We Are Text Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_who_text || '#374151'}
                                onChange={(e) => updateForm('about_page_who_text', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Who We Are Description Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_who_desc_color || '#374151'}
                                onChange={(e) => updateForm('about_page_who_desc_color', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Years of Experience</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_page_years || '15+'}
                                onChange={(e) => updateForm('about_page_years', e.target.value)}
                                className="regular-text" 
                                placeholder="e.g., 15+"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Experience Label</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_page_experience_label || 'Years of Experience'}
                                onChange={(e) => updateForm('about_page_experience_label', e.target.value)}
                                className="regular-text" 
                                placeholder="e.g., Years of Experience"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Experience Box BG Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_experience_bg || '#14b8a6'}
                                onChange={(e) => updateForm('about_page_experience_bg', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Experience Box Text Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_experience_text || '#000000'}
                                onChange={(e) => updateForm('about_page_experience_text', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">CTA Text</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_page_cta_text || 'Learn More'}
                                onChange={(e) => updateForm('about_page_cta_text', e.target.value)}
                                className="regular-text" 
                                placeholder="e.g., Learn More"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">CTA Link</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_page_cta_link || '#'}
                                onChange={(e) => updateForm('about_page_cta_link', e.target.value)}
                                className="regular-text" 
                                placeholder="e.g., #"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">CTA BG Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_cta_bg || '#14b8a6'}
                                onChange={(e) => updateForm('about_page_cta_bg', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">CTA Text Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_cta_text_color || '#000000'}
                                onChange={(e) => updateForm('about_page_cta_text_color', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Button Background Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_button_bg || '#0d9488'}
                                onChange={(e) => updateForm('about_page_button_bg', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Button Text Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_button_text || '#374151'}
                                onChange={(e) => updateForm('about_page_button_text', e.target.value)}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Why Work With Us? Section */}
                      <h4 style={{marginTop: '30px', marginBottom: '15px', color: '#374151'}}>Why Work With Us? Section</h4>
                      <table className="form-table">
                        <tbody>
                          <tr>
                            <th scope="row">Section Heading</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_page_why_heading || 'Why Work With Us?'}
                                onChange={(e) => updateForm('about_page_why_heading', e.target.value)}
                                className="regular-text" 
                                placeholder="e.g., Why Work With Us?"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Section Subheading</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_page_why_subheading || 'Benefits of Working with an Expert Team'}
                                onChange={(e) => updateForm('about_page_why_subheading', e.target.value)}
                                className="regular-text" 
                                placeholder="e.g., Benefits of Working with an Expert Team"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Background Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_why_bg || '#1e3a8a'}
                                onChange={(e) => updateForm('about_page_why_bg', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Section Heading Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_why_heading_color || '#ffffff'}
                                onChange={(e) => updateForm('about_page_why_heading_color', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Section Subtitle Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_why_subtitle_color || '#ffffff'}
                                onChange={(e) => updateForm('about_page_why_subtitle_color', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Item Title Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_why_item_title || '#ffffff'}
                                onChange={(e) => updateForm('about_page_why_item_title', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Item Description Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_why_item_desc || '#ffffff'}
                                onChange={(e) => updateForm('about_page_why_item_desc', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Icon Background Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_why_icon_bg || '#1e3a8a'}
                                onChange={(e) => updateForm('about_page_why_icon_bg', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Icon Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_why_icon || '#ffffff'}
                                onChange={(e) => updateForm('about_page_why_icon', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Section Colors</th>
                            <td></td>
                          </tr>
                          <tr>
                            <th scope="row">Section Background Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_why_section_bg || '#374151'}
                                onChange={(e) => updateForm('about_page_why_section_bg', e.target.value)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Section Text Color</th>
                            <td>
                              <input 
                                type="color" 
                                value={form.about_page_why_section_text || '#000000'}
                                onChange={(e) => updateForm('about_page_why_section_text', e.target.value)}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      
                      {/* AI Generation Box for About Page */}
                      <div style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '20px',
                        marginTop: '20px'
                      }}>
                        <div style={{marginBottom: '15px'}}>
                          <input 
                            type="checkbox" 
                            checked={form.about_page_use_default_prompts || true}
                            onChange={(e) => updateForm('about_page_use_default_prompts', e.target.checked)}
                            style={{marginRight: '8px'}}
                          />
                          <span>Use Default AI Prompts</span>
                        </div>
                        <p style={{color: '#6b7280', marginBottom: '15px'}}>
                          Generate AI-powered content for your about us page.
                        </p>
                        <div style={{textAlign: 'left'}}>
                          <button 
                            type="button" 
                            className="button button-primary"
                            onClick={() => generateAboutPageAI()}
                            disabled={loading}
                          >
                            {loading ? '🔄 Generating...' : '🔧 Generate About Us Page Content'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* About Page SEO Settings */}
                    <div className="bsg-section">
                      <h3 style={{color: '#1f2937'}}>About Page SEO Settings</h3>
                      <table className="form-table">
                        <tbody>
                          <tr>
                            <th scope="row">About Page Meta Title</th>
                            <td>
                              <input 
                                type="text" 
                                value={form.about_page_meta_title || `${form.business_name || 'Roofing Pros'} - About Us | Expert Roofing Services in ${form.location || 'Orlando'}`}
                                onChange={(e) => updateForm('about_page_meta_title', e.target.value)}
                                className="regular-text" 
                                placeholder="e.g., Your Business - About Us | Professional Roofing Services"
                              />
                              <p style={{marginTop: '5px', fontSize: '12px', color: '#6b7280'}}>
                                The title that appears in search engine results for this page.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">About Page Meta Description</th>
                            <td>
                              <textarea 
                                value={form.about_page_meta_description || `Learn about ${form.business_name || 'Roofing Pros'}, a trusted roofing contractor with ${form.about_years || '15+'} years of experience in ${form.location || 'Orlando'}. Professional roofing services, quality workmanship, and customer satisfaction.`}
                                onChange={(e) => updateForm('about_page_meta_description', e.target.value)}
                                className="large-text" 
                                rows={3} 
                                placeholder="Meta description for about page..."
                              />
                              <p style={{marginTop: '5px', fontSize: '12px', color: '#6b7280'}}>
                                The description that appears below your meta title in search results.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">About Page Meta Keywords</th>
                            <td>
                              <textarea 
                                value={form.about_page_meta_keywords || 'about, contractor, professional services, quality, 15 years experience'}
                                onChange={(e) => updateForm('about_page_meta_keywords', e.target.value)}
                                className="large-text" 
                                rows={2} 
                                placeholder="Keywords for search engine optimization. Separate with commas."
                              />
                              <p style={{marginTop: '5px', fontSize: '12px', color: '#6b7280'}}>
                                Keywords for search engine optimization. Separate with commas.
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
						</div>
					</div>
				)}

                {/* Services Tab with Dynamic Functionality */}
                {activeTab === 'services' && (
                  <div className="bsg-section">
                    <h3 style={{color: '#1f2937'}}>Services</h3>
                    
                    {/* General Service Section Settings */}
                    <h4>General Service Section Settings</h4>
                    <table className="form-table">
                      <tbody>
                        <tr>
                          <th scope="row">Show Services Section</th>
                          <td>
                            <input 
                              type="checkbox" 
                              checked={form.services_visible || true}
                              onChange={(e) => updateForm('services_visible', e.target.checked)}
                            />
                            <span style={{marginLeft: '8px'}}>Show this section</span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Section Tagline</th>
                          <td>
                            <input 
                              type="text" 
                              value={form.services_label || 'TOP RATED SERVICES'}
                              onChange={(e) => updateForm('services_label', e.target.value)}
                              className="regular-text" 
                              placeholder="e.g., TOP RATED SERVICES"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Section Heading</th>
                          <td>
                            <input 
                              type="text" 
                              value={form.services_title || 'Our Services'}
                              onChange={(e) => updateForm('services_title', e.target.value)}
                              className="regular-text" 
                              placeholder="e.g., Our Services"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">CTA Button Text</th>
                          <td>
                            <input 
                              type="text" 
                              value={form.services_cta_text || 'Get A Free Estimate'}
                              onChange={(e) => updateForm('services_cta_text', e.target.value)}
                              className="regular-text" 
                              placeholder="e.g., Get A Free Estimate"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">CTA Button Link</th>
                          <td>
                            <input 
                              type="text" 
                              value={form.services_cta_link || '#'}
                              onChange={(e) => updateForm('services_cta_link', e.target.value)}
                              className="regular-text" 
                              placeholder="e.g., #contact or tel:1234567890"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">CTA Button Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.services_cta_bg || '#2ee6c5'}
                              onChange={(e) => updateForm('services_cta_bg', e.target.value)}
                            />
                            <p className="description">Controlled by Color Theme</p>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">CTA Button Text Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.services_cta_text_color || '#232834'}
                              onChange={(e) => updateForm('services_cta_text_color', e.target.value)}
                            />
                            <p className="description">Controlled by Color Theme</p>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Section Background Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.services_bg_color || '#313746'}
                              onChange={(e) => updateForm('services_bg_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Card Background Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.services_card_color || '#232834'}
                              onChange={(e) => updateForm('services_card_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Card Text Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.services_text_color || '#ffffff'}
                              onChange={(e) => updateForm('services_text_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Icon Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.services_icon_color || '#2ee6c5'}
                              onChange={(e) => updateForm('services_icon_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Card Border Radius (px)</th>
                          <td>
                            <input 
                              type="number" 
                              value={form.services_card_radius || 12}
                              onChange={(e) => updateForm('services_card_radius', parseInt(e.target.value))}
                              min="0" 
                              max="50"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">'See More' Link Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.services_button_text || '#2ee6c5'}
                              onChange={(e) => updateForm('services_button_text', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Progress Bar Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.services_progress_color || '#2ee6c5'}
                              onChange={(e) => updateForm('services_progress_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Section Padding (px)</th>
                          <td>
                            <input 
                              type="number" 
                              value={form.services_padding || 60}
                              onChange={(e) => updateForm('services_padding', parseInt(e.target.value))}
                              min="0" 
                              max="300"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Service Hero Section Settings */}
                    <h4>Service Hero Section Settings</h4>
                    <table className="form-table">
                      <tbody>
                        <tr>
                          <th scope="row">Service Hero Heading Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.service_hero_heading_color || '#ffffff'}
                              onChange={(e) => updateForm('service_hero_heading_color', e.target.value)}
                            />
                            <p className="description">Color for the service page hero section heading (H1)</p>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Service Hero Description Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.service_hero_description_color || '#cfd8dc'}
                              onChange={(e) => updateForm('service_hero_description_color', e.target.value)}
                            />
                            <p className="description">Color for the service page hero section description text</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>


                    {/* Service Page Content Section Settings */}
                    <h4>Service Page Content Section Settings</h4>
                    <table className="form-table">
                      <tbody>
                        <tr>
                          <th scope="row">Service Page Content Background Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.service_content_bg_color || '#232834'}
                              onChange={(e) => updateForm('service_content_bg_color', e.target.value)}
                            />
                            <p className="description">Background color for the services content section</p>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Service Page Content Padding (px)</th>
                          <td>
                            <input 
                              type="number" 
                              value={form.service_content_padding || 80}
                              onChange={(e) => updateForm('service_content_padding', parseInt(e.target.value))}
                              min="0" 
                              max="300"
                            />
                            <p className="description">Padding for the services content section</p>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Service Page Heading Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.services_text_color || '#ffffff'}
                              onChange={(e) => updateForm('services_text_color', e.target.value)}
                            />
                            <p className="description">Color for the main service section heading</p>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Service Page Text Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.service_hero_description_color || '#cfd8dc'}
                              onChange={(e) => updateForm('service_hero_description_color', e.target.value)}
                            />
                            <p className="description">Color for the service section description text</p>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Service Page Subtitle Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.services_text_color || '#ffffff'}
                              onChange={(e) => updateForm('services_text_color', e.target.value)}
                            />
                            <p className="description">Color for the service section subtitle</p>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Service Page Features Icon Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.services_icon_color || '#2ee6c5'}
                              onChange={(e) => updateForm('services_icon_color', e.target.value)}
                            />
                            <p className="description">Color for the feature list icons</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <div style={{marginTop: '2rem', padding: '1rem', background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '8px'}}>
                      <h4>Services List</h4>
                      <p className="description">Add your services here. Each service will have its own page with detailed information.</p>
                      
                      {services.map((service, index) => (
                        <div key={service.id} style={{
                          background: '#1e293b', 
                          border: '1px solid #334155', 
                          borderRadius: '8px', 
                          padding: '20px', 
                          marginBottom: '20px',
                          color: '#f1f5f9'
                        }}>
                          <h4 style={{margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600', color: '#f1f5f9'}}>Service {index + 1}</h4>
                          
                          {/* Service Title */}
                          <div style={{marginBottom: '16px'}}>
                            <label style={{fontWeight: '600', display: 'block', marginBottom: '6px', color: '#f1f5f9'}}>Service Title</label>
                              <input
                                type="text"
                                value={service.name}
                                onChange={(e) => updateService(service.id, 'name', e.target.value)}
                              placeholder="Lawn Care"
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '4px',
                                color: '#f1f5f9',
                                fontSize: '14px'
                              }}
                              />
                            </div>

                          {/* AI Prompt Section */}
                          <div style={{marginBottom: '16px'}}>
                            <label style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                              <input
                                type="checkbox"
                                checked={!!service.useDefaultPrompt}
                                onChange={(e) => updateService(service.id, 'useDefaultPrompt', (e.target.checked as unknown as string))}
                                style={{margin: 0}}
                              />
                              <span style={{color: '#f1f5f9'}}>Use Default AI Prompt</span>
                            </label>
                            
                            {!service.useDefaultPrompt && (
                              <div style={{marginBottom: '8px'}}>
                                <label style={{fontWeight: '600', display: 'block', marginBottom: '6px', color: '#f1f5f9'}}>Custom Prompt</label>
                                <textarea
                                  value={service.customPrompt || ''}
                                  onChange={(e) => updateService(service.id, 'customPrompt', (e.target.value as unknown as string))}
                                  placeholder="Enter your custom AI prompt for this service..."
                                  style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    background: '#0f172a',
                                    border: '1px solid #334155',
                                    borderRadius: '4px',
                                    color: '#f1f5f9',
                                    fontSize: '14px',
                                    minHeight: '80px',
                                    resize: 'vertical'
                                  }}
                              />
                            </div>
                            )}
                            
                            <button 
                              type="button" 
                              onClick={() => generateServiceAI(service.id)} 
                              disabled={serviceLoading[service.id]}
                              style={{
                                background: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: serviceLoading[service.id] ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                fontWeight: '500'
                              }}
                            >
                              {serviceLoading[service.id] ? 'Generating...' : 'Generate Description'}
                            </button>
                            </div>

                          {/* Service Description */}
                          <div style={{marginBottom: '16px'}}>
                            <label style={{fontWeight: '600', display: 'block', marginBottom: '6px', color: '#f1f5f9'}}>Service Description</label>
                            <textarea
                              value={service.content}
                              onChange={(e) => updateService(service.id, 'content', e.target.value)}
                              placeholder="<div>...HTML allowed...</div>"
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '4px',
                                color: '#f1f5f9',
                                fontSize: '14px',
                                minHeight: '140px',
                                resize: 'vertical'
                              }}
                            />
                            <p style={{margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8'}}>
                              This description will be displayed on the service page. Use this to describe what this specific service includes.
                            </p>
                          </div>

                          {/* Meta Title */}
                          <div style={{marginBottom: '16px'}}>
                            <label style={{fontWeight: '600', display: 'block', marginBottom: '6px', color: '#f1f5f9'}}>Meta Title</label>
                            <input
                              type="text"
                              value={service.metaTitle || ''}
                              onChange={(e) => updateService(service.id, 'metaTitle', (e.target.value as unknown as string))}
                              placeholder={`Professional ${service.name || 'Service'} Near me in ${form.location || 'Your City'}`}
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '4px',
                                color: '#f1f5f9',
                                fontSize: '14px'
                              }}
                            />
                          </div>

                          {/* Meta Description */}
                          <div style={{marginBottom: '16px'}}>
                            <label style={{fontWeight: '600', display: 'block', marginBottom: '6px', color: '#f1f5f9'}}>Meta Description</label>
                            <textarea
                              value={service.metaDescription || ''}
                              onChange={(e) => updateService(service.id, 'metaDescription', (e.target.value as unknown as string))}
                              placeholder={`Professional ${service.name || 'service'} in ${form.location || 'your area'} – ...`}
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '4px',
                                color: '#f1f5f9',
                                fontSize: '14px',
                                minHeight: '100px',
                                resize: 'vertical'
                              }}
                            />
                          </div>

                          {/* Service Features */}
                          <div style={{marginBottom: '16px'}}>
                            <label style={{fontWeight: '600', display: 'block', marginBottom: '6px', color: '#f1f5f9'}}>Service Features (One per line)</label>
                            <textarea
                              value={service.featuresText || ''}
                              onChange={(e) => updateService(service.id, 'featuresText', (e.target.value as unknown as string))}
                              placeholder="Enter service features, one per line"
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '4px',
                                color: '#f1f5f9',
                                fontSize: '14px',
                                minHeight: '120px',
                                resize: 'vertical'
                              }}
                            />
                            <p style={{margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8'}}>
                              List the features included in this service. One feature per line.
                            </p>
                          </div>

                          {/* Remove Button */}
                          <div style={{marginTop: '16px', display: 'flex', justifyContent: 'flex-end'}}>
                            <button 
                              type="button" 
                              onClick={() => removeService(service.id)} 
                              style={{
                                background: '#dc2626',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#b91c1c';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#dc2626';
                              }}
                            >
                              🗑️ Remove Service
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <button type="button" className="button button-primary" onClick={addService} style={{marginTop: '1rem'}}>
                        + Add Service
                      </button>
								</div>
							</div>
                )}

                {/* Locations Tab */}
                {activeTab === 'locations' && (
                  <div className="bsg-section">
                    <h3 style={{color: '#1f2937'}}>Locations</h3>
                    
                    {/* General Location Section Settings */}
                    <h4>General Location Section Settings</h4>
                    <table className="form-table">
                      <tbody>
                        <tr>
                          <th scope="row">Section Label/Tagline</th>
                          <td>
                            <input 
                              type="text" 
                              value={form.locations_label || 'OUR SERVICE AREA'}
                              onChange={(e) => updateForm('locations_label', e.target.value)}
                              className="regular-text" 
                              placeholder="e.g., OUR SERVICE AREA"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Section Headline</th>
                          <td>
                            <input 
                              type="text" 
                              value={form.locations_title || 'Proudly Serving Lompoc And The Surrounding Areas'}
                              onChange={(e) => updateForm('locations_title', e.target.value)}
                              className="regular-text" 
                              placeholder="e.g., Proudly Serving Lompoc And The Surrounding Areas"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Section Description</th>
                          <td>
                            <textarea 
                              value={form.locations_description || ''}
                              onChange={(e) => updateForm('locations_description', e.target.value)}
                              className="large-text" 
                              rows={3} 
                              placeholder="Proudly serving Boulder and the Front Range, including Longmont, Louisville, Lafayette, Erie, Superior, Broomfield, Westminster and nearby areas"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Show Locations Section</th>
                          <td>
                            <input 
                              type="checkbox" 
                              checked={form.locations_visible || true}
                              onChange={(e) => updateForm('locations_visible', e.target.checked)}
                            />
                            <span style={{marginLeft: '8px'}}>Show this section</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Location Colors Settings */}
                    <h4>Location Colors Settings</h4>
                    <table className="form-table">
                      <tbody>
                      </tbody>
                    </table>

                    {/* Service Areas Section (Home) Customization */}
                    <h4>Service Areas Section (Home Page) Colors</h4>
                    <table className="form-table">
                      <tbody>
                        <tr>
                          <th scope="row">Section Background Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.service_areas_bg_color || '#232834'}
                              onChange={(e) => updateForm('service_areas_bg_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Section Text Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.service_areas_text_color || '#ffffff'}
                              onChange={(e) => updateForm('service_areas_text_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Heading Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.service_areas_heading_color || '#ffffff'}
                              onChange={(e) => updateForm('service_areas_heading_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">City Card Background</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.service_areas_card_bg || 'rgba(255,255,255,0.1)'}
                              onChange={(e) => updateForm('service_areas_card_bg', e.target.value)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Map Settings */}
                    <h4>Map Settings</h4>
                    <table className="form-table">
                      <tbody>
                        <tr>
                          <th scope="row">Show Map</th>
                          <td>
                            <input 
                              type="checkbox" 
                              checked={form.locations_show_map || true}
                              onChange={(e) => updateForm('locations_show_map', e.target.checked)}
                            />
                            <span style={{marginLeft: '8px'}}>Show map in locations section</span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Map Embed Code</th>
                          <td>
                            <textarea 
                              value={form.locations_map_embed || ''}
                              onChange={(e) => updateForm('locations_map_embed', e.target.value)}
                              className="large-text" 
                              rows={4} 
                              placeholder="Paste Google Maps embed code or iframe here."
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Individual Location Pages Settings */}
                    <h4>Individual Location Pages</h4>
                    <table className="form-table">
                      <tbody>
                        <tr>
                          <th scope="row">Location Hero Heading Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.location_hero_heading_color || '#ffffff'}
                              onChange={(e) => updateForm('location_hero_heading_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Location Hero Description Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.location_hero_description_color || '#cfd8dc'}
                              onChange={(e) => updateForm('location_hero_description_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Location Contact Title</th>
                          <td>
                            <input 
                              type="text" 
                              value={form.location_contact_title || 'GET A QUOTE'}
                              onChange={(e) => updateForm('location_contact_title', e.target.value)}
                              className="regular-text" 
                              placeholder="e.g., GET A QUOTE"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Location Contact Description</th>
                          <td>
                            <textarea 
                              value={form.location_contact_description || ''}
                              onChange={(e) => updateForm('location_contact_description', e.target.value)}
                              className="large-text" 
                              rows={3} 
                              placeholder="Enter contact description for location pages..."
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Location Content Padding</th>
                          <td>
                            <input 
                              type="number" 
                              value={form.location_content_padding || 80}
                              onChange={(e) => updateForm('location_content_padding', parseInt(e.target.value))}
                              className="small-text" 
                              min="0"
                              max="200"
                            />
                            <span style={{marginLeft: '8px'}}>px</span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Location Description Background</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.location_description_bg || '#ffffff'}
                              onChange={(e) => updateForm('location_description_bg', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Location Description Heading Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.location_description_heading_color || '#232834'}
                              onChange={(e) => updateForm('location_description_heading_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Location Description Text Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.location_description_text_color || '#374151'}
                              onChange={(e) => updateForm('location_description_text_color', e.target.value)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Location Quote Box Customization */}
                    <h4>Location Quote Box Colors</h4>
                    <table className="form-table">
                      <tbody>
                        <tr>
                          <th scope="row">Quote Box Background Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.location_quote_box_bg || '#1a1f28'}
                              onChange={(e) => updateForm('location_quote_box_bg', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Quote Box Text Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.location_quote_box_text || '#ffffff'}
                              onChange={(e) => updateForm('location_quote_box_text', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Quote Box Heading Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.location_quote_box_heading_color || '#ffffff'}
                              onChange={(e) => updateForm('location_quote_box_heading_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Quote Box Button Background</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.location_quote_box_button_bg || '#2ee6c5'}
                              onChange={(e) => updateForm('location_quote_box_button_bg', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Quote Box Button Text Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.location_quote_box_button_text || '#ffffff'}
                              onChange={(e) => updateForm('location_quote_box_button_text', e.target.value)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <div style={{marginTop: '2rem', padding: '1rem', background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '8px'}}>
                      <h4>Locations List</h4>
                      <p className="description">Add your service areas here.</p>
                      
                      {locations.map((location, index) => (
                        <div key={location.id} style={{
                          background: '#1e293b', 
                          border: '1px solid #334155', 
                          borderRadius: '8px', 
                          padding: '20px', 
                          marginBottom: '20px',
                          color: '#f1f5f9'
                        }}>
                          <h4 style={{margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600', color: '#f1f5f9'}}>Location {index + 1}</h4>
                          
                          {/* Location Details Section */}
                          <div style={{marginBottom: '16px'}}>
                            <h5 style={{margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#f1f5f9'}}>Location Details</h5>
                            
                            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px'}}>
							<div>
                                <label style={{fontWeight: '600', display: 'block', marginBottom: '6px', color: '#f1f5f9'}}>City Name</label>
                              <input
                                type="text"
                                value={location.name}
                                onChange={(e) => updateLocation(location.id, 'name', e.target.value)}
                                  placeholder="Mission Hills"
                                  style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    background: '#0f172a',
                                    border: '1px solid #334155',
                                    borderRadius: '4px',
                                    color: '#f1f5f9',
                                    fontSize: '14px'
                                  }}
                              />
                            </div>
                            <div>
                                <label style={{fontWeight: '600', display: 'block', marginBottom: '6px', color: '#f1f5f9'}}>State</label>
                              <select
                                value={location.state}
                                onChange={(e) => updateLocation(location.id, 'state', e.target.value)}
                                  style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    background: '#0f172a',
                                    border: '1px solid #334155',
                                    borderRadius: '4px',
                                    color: '#f1f5f9',
                                    fontSize: '14px'
                                  }}
                              >
                                <option value="">Select State</option>
                                {states.map(state => (
                                  <option key={state} value={state}>{state}</option>
                                ))}
                              </select>
								</div>
                            <div>
                                <label style={{fontWeight: '600', display: 'block', marginBottom: '6px', color: '#f1f5f9'}}>ZIP (auto / override)</label>
                              <input
                                type="text"
                                value={location.zip}
                                onChange={(e) => updateLocation(location.id, 'zip', e.target.value)}
                                  placeholder="91345"
                                  style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    background: '#0f172a',
                                    border: '1px solid #334155',
                                    borderRadius: '4px',
                                    color: '#f1f5f9',
                                    fontSize: '14px'
                                  }}
                                />
                                <p style={{margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8'}}>
                                  Left blank to auto-detect from City + State. Enter to override.
                                </p>
							</div>
						</div>
                            
                            <div>
                              <label style={{fontWeight: '600', display: 'block', marginBottom: '6px', color: '#f1f5f9'}}>Slug preview</label>
                              <input
                                type="text"
                                value={`/service-locations/${location.name ? location.name.toLowerCase().replace(/\s+/g, '-') : 'city'}-zip`}
                                readOnly
                                style={{
                                  width: '100%',
                                  padding: '8px 12px',
                                  background: '#374151',
                                  border: '1px solid #4b5563',
                                  borderRadius: '4px',
                                  color: '#9ca3af',
                                  fontSize: '14px'
                                }}
                              />
							</div>
                          </div>

                          {/* Description Generation Section */}
                          <div style={{marginBottom: '16px'}}>
                            <h5 style={{margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#f1f5f9'}}>Description Generation</h5>
                            
                            <label style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                              <input
                                type="checkbox"
                                checked={!!location.useDefaultPrompt}
                                onChange={(e) => updateLocation(location.id, 'useDefaultPrompt', (e.target.checked as unknown as string))}
                                style={{margin: 0}}
                              />
                              <span style={{color: '#f1f5f9'}}>Use Default AI Prompt</span>
                            </label>
                            
                            {!location.useDefaultPrompt && (
                              <div style={{marginBottom: '8px'}}>
                                <label style={{fontWeight: '600', display: 'block', marginBottom: '6px', color: '#f1f5f9'}}>Custom Prompt</label>
                            <textarea
                                  value={location.customPrompt || ''}
                                  onChange={(e) => updateLocation(location.id, 'customPrompt', (e.target.value as unknown as string))}
                                  placeholder="Enter your custom AI prompt for this location..."
                                  style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    background: '#0f172a',
                                    border: '1px solid #334155',
                                    borderRadius: '4px',
                                    color: '#f1f5f9',
                                    fontSize: '14px',
                                    minHeight: '80px',
                                    resize: 'vertical'
                                  }}
                                />
                              </div>
                            )}
                            
                            <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                              <button 
                                type="button" 
                                onClick={() => generateLocationAI(location.id)} 
                                disabled={locationLoading[location.id]}
                                style={{
                                  background: '#3b82f6',
                                  color: 'white',
                                  border: 'none',
                                  padding: '8px 16px',
                                  borderRadius: '4px',
                                  cursor: locationLoading[location.id] ? 'not-allowed' : 'pointer',
                                  fontSize: '14px',
                                  fontWeight: '500'
                                }}
                              >
                                {locationLoading[location.id] ? 'Generating...' : 'Generate Description'}
                              </button>
                            </div>
                          </div>

                          {/* SEO Content Section */}
                          <div style={{marginBottom: '16px'}}>
                            <h5 style={{margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#f1f5f9'}}>SEO Content</h5>
                            
                            <div style={{marginBottom: '12px'}}>
                              <label style={{fontWeight: '600', display: 'block', marginBottom: '6px', color: '#f1f5f9'}}>Meta Title</label>
                              <textarea
                                value={location.metaTitle || ''}
                                onChange={(e) => updateLocation(location.id, 'metaTitle', (e.target.value as unknown as string))}
                                placeholder={`${form.business_type || 'Service'} Near Me in ${location.name || 'City'}, ${location.state || 'State'} ${location.zip || 'ZIP'}`}
                                style={{
                                  width: '100%',
                                  padding: '8px 12px',
                                  background: '#0f172a',
                                  border: '1px solid #334155',
                                  borderRadius: '4px',
                                  color: '#f1f5f9',
                                  fontSize: '14px',
                                  minHeight: '60px',
                                  resize: 'vertical'
                                }}
                              />
                            </div>
                            
                            <div style={{marginBottom: '12px'}}>
                              <label style={{fontWeight: '600', display: 'block', marginBottom: '6px', color: '#f1f5f9'}}>Meta Description</label>
                              <textarea
                                value={location.metaDescription || ''}
                                onChange={(e) => updateLocation(location.id, 'metaDescription', (e.target.value as unknown as string))}
                                placeholder={`Professional ${form.business_type || 'service'} in ${location.name || 'city'}, ${location.state || 'state'} ${location.zip || 'zip'}. Keep your property beautiful. Call today ${form.phone || '(555) 123-4567'}.`}
                                style={{
                                  width: '100%',
                                  padding: '8px 12px',
                                  background: '#0f172a',
                                  border: '1px solid #334155',
                                  borderRadius: '4px',
                                  color: '#f1f5f9',
                                  fontSize: '14px',
                                  minHeight: '80px',
                                  resize: 'vertical'
                                }}
                              />
                            </div>
                            
                            <div>
                              <label style={{fontWeight: '600', display: 'block', marginBottom: '6px', color: '#f1f5f9'}}>Description (HTML)</label>
                              <textarea
                              value={location.description}
                              onChange={(e) => updateLocation(location.id, 'description', e.target.value)}
                                placeholder="<p>HTML content for this location...</p>"
                                style={{
                                  width: '100%',
                                  padding: '8px 12px',
                                  background: '#0f172a',
                                  border: '1px solid #334155',
                                  borderRadius: '4px',
                                  color: '#f1f5f9',
                                  fontSize: '14px',
                                  minHeight: '120px',
                                  resize: 'vertical'
                                }}
                            />
                          </div>
                          </div>

                          {/* Remove Button */}
                          <div style={{marginTop: '16px', display: 'flex', justifyContent: 'flex-end'}}>
                            <button 
                              type="button" 
                              onClick={() => removeLocation(location.id)} 
                              style={{
                                background: '#dc2626',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#b91c1c';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#dc2626';
                              }}
                            >
                              🗑️ Remove Location
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <button type="button" className="button button-primary" onClick={addLocation} style={{marginTop: '1rem'}}>
                        + Add Location
                      </button>
						</div>
					</div>
				)}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="bsg-section">
                    <h3 style={{color: '#1f2937'}}>Reviews</h3>
                    <table className="form-table">
                      <tbody>
                        <tr>
                          <th scope="row">Show Reviews Section</th>
                          <td>
                            <input 
                              type="checkbox" 
                              checked={form.reviews_visible || true}
                              onChange={(e) => updateForm('reviews_visible', e.target.checked)}
                            />
                            <span style={{marginLeft: '8px'}}>Show this section</span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Section Tagline</th>
                          <td>
                            <input 
                              type="text" 
                              value={form.reviews_label || 'CUSTOMER REVIEWS'}
                              onChange={(e) => updateForm('reviews_label', e.target.value)}
                              className="regular-text" 
                              placeholder="e.g., CUSTOMER REVIEWS"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Section Heading</th>
                          <td>
                            <input 
                              type="text" 
                              value={form.reviews_title || 'What Our Customers Say'}
                              onChange={(e) => updateForm('reviews_title', e.target.value)}
                              className="regular-text" 
                              placeholder="e.g., What Our Customers Say"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Heading Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.reviews_heading_color || '#1f2937'}
                              onChange={(e) => updateForm('reviews_heading_color', e.target.value)}
                              style={{width: 40, height: 40, border: 'none', borderRadius: 4, cursor: 'pointer'}}
                            />
                            <span className="description" style={{marginLeft: 8, color: '#94a3b8'}}>Color for the main heading</span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Subtitle Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.reviews_subtitle_color || '#6b7280'}
                              onChange={(e) => updateForm('reviews_subtitle_color', e.target.value)}
                              style={{width: 40, height: 40, border: 'none', borderRadius: 4, cursor: 'pointer'}}
                            />
                            <span className="description" style={{marginLeft: 8, color: '#94a3b8'}}>Color for the tagline/subtitle</span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Section Background Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.reviews_bg_color || '#f8f9fa'}
                              onChange={(e) => updateForm('reviews_bg_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Card Background Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.reviews_card_bg || '#ffffff'}
                              onChange={(e) => updateForm('reviews_card_bg', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Star Color</th>
                          <td>
                            <input 
                              type="color" 
                              value={form.reviews_star_color || '#fbbf24'}
                              onChange={(e) => updateForm('reviews_star_color', e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Section Padding (px)</th>
                          <td>
                            <input 
                              type="number" 
                              value={form.reviews_padding || 80}
                              onChange={(e) => updateForm('reviews_padding', parseInt(e.target.value))}
                              min="0" 
                              max="300"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <div style={{marginTop: '2rem', padding: '1rem', background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '8px'}}>
                      <h4>Reviews List</h4>
                      <p className="description">Add customer reviews here.</p>
                      
                      {reviews.map((review, index) => (
                        <div key={review.id} style={{background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '1rem', marginBottom: '1rem'}}>
                          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end'}}>
                            <div>
                              <label style={{fontWeight: 600, display: 'block', marginBottom: 6}}>Customer Name</label>
                              <input
                                type="text"
                                className="regular-text"
                                value={review.name}
                                onChange={(e) => updateReview(review.id, 'name', e.target.value)}
                                placeholder="e.g., John Smith"
                              />
						</div>
                            <div>
                              <label style={{fontWeight: 600, display: 'block', marginBottom: 6}}>Rating</label>
                              <select
                                className="regular-text"
                                value={review.rating}
                                onChange={(e) => updateReview(review.id, 'rating', parseInt(e.target.value))}
                              >
                                <option value={1}>1 Star</option>
                                <option value={2}>2 Stars</option>
                                <option value={3}>3 Stars</option>
                                <option value={4}>4 Stars</option>
                                <option value={5}>5 Stars</option>
                              </select>
						</div>
                            <div>
                              <label style={{fontWeight: 600, display: 'block', marginBottom: 6}}>Date</label>
                              <input
                                type="date"
                                className="regular-text"
                                value={review.date}
                                onChange={(e) => updateReview(review.id, 'date', e.target.value)}
                              />
                            </div>
                            <div style={{alignSelf: 'center'}}>
                              <button 
                                type="button" 
                                className="button" 
                                onClick={() => removeReview(review.id)}
                                style={{
                                  background: '#dc2626',
                                  color: 'white',
                                  border: 'none',
                                  padding: '6px 12px',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                  fontWeight: '500'
                                }}
                              >
                                🗑️ Remove
                              </button>
                            </div>
                          </div>
                          <div style={{marginTop: '0.75rem'}}>
                            <label style={{fontWeight: 600, display: 'block', marginBottom: 6}}>Review Comment</label>
                            <textarea
                              className="regular-text"
                              style={{width: '100%', minHeight: 80}}
                              value={review.comment}
                              onChange={(e) => updateReview(review.id, 'comment', e.target.value)}
                              placeholder="Customer review comment..."
                            />
                          </div>
                        </div>
                      ))}
                      
                      <button type="button" className="button button-primary" onClick={addReview} style={{marginTop: '1rem', marginRight: '10px'}}>
                        + Add Review
                      </button>
                      
                      <button 
                        type="button" 
                        className="button button-secondary"
                        onClick={generateRandomReviews}
                        style={{marginTop: '1rem'}}
                      >
                        🎲 Generate 4 Unique Reviews
                      </button>
                    </div>
					</div>
				)}

                {/* Commitment Tab */}
                {activeTab === 'commitment' && (
                  <div className="bsg-section" style={{
                    background: '#1e293b',
                    color: '#f1f5f9',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid #334155'
                  }}>
                    <h3 style={{color: '#f1f5f9', marginBottom: '20px'}}>| Customer Commitment Section</h3>
                    
                    <table style={{width: '100%', borderCollapse: 'collapse'}}>
                      <tbody>
                        <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                          <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500', width: '40%'}}>Show Commitment Section</td>
                          <td style={{padding: '12px 0', textAlign: 'left'}}>
                            <input 
                              type="checkbox" 
                              checked={form.commitment_visible || true}
                              onChange={(e) => updateForm('commitment_visible', e.target.checked)}
                              style={{marginRight: '8px'}}
                            />
                            <span style={{color: '#f1f5f9'}}>Show this section</span>
                          </td>
                        </tr>
                        
                        <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                          <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500'}}>Tagline</td>
                          <td style={{padding: '12px 0', textAlign: 'left'}}>
                            <input 
                              type="text" 
                              value={form.commitment_label || 'COMMITTED TO QUALITY'}
                              onChange={(e) => updateForm('commitment_label', e.target.value)}
                              style={{
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '4px',
                                padding: '8px 12px',
                                color: '#f1f5f9',
                                width: '300px'
                              }}
                            />
                          </td>
                        </tr>
                        
                        <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                          <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500'}}>Section Title</td>
                          <td style={{padding: '12px 0', textAlign: 'left'}}>
                            <input 
                              type="text" 
                              value={form.commitment_title || 'Our Promise Of Reliability'}
                              onChange={(e) => updateForm('commitment_title', e.target.value)}
                              style={{
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '4px',
                                padding: '8px 12px',
                                color: '#f1f5f9',
                                width: '300px'
                              }}
                            />
                          </td>
                        </tr>
                        
                        <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                          <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500', verticalAlign: 'top'}}>Commitment Text</td>
                          <td style={{padding: '12px 0', textAlign: 'left'}}>
                            <textarea 
                              value={form.commitment_text ?? ''}
                              onChange={(e) => updateForm('commitment_text', e.target.value)}
                              rows={4}
                              style={{
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '4px',
                                padding: '8px 12px',
                                color: '#f1f5f9',
                                width: '300px',
                                resize: 'vertical'
                              }}
                            />
                          </td>
                        </tr>
                        
                        <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                          <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500'}}>Button Label</td>
                          <td style={{padding: '12px 0', textAlign: 'left'}}>
                            <input 
                              type="text" 
                              value={form.commitment_button_label || 'Request An Estimate'}
                              onChange={(e) => updateForm('commitment_button_label', e.target.value)}
                              style={{
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '4px',
                                padding: '8px 12px',
                                color: '#f1f5f9',
                                width: '300px'
                              }}
                            />
                          </td>
                        </tr>
                        
                        <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                          <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500'}}>Button Link</td>
                          <td style={{padding: '12px 0', textAlign: 'left'}}>
                            <input 
                              type="text" 
                              value={form.commitment_button_link || '#'}
                              onChange={(e) => updateForm('commitment_button_link', e.target.value)}
                              style={{
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '4px',
                                padding: '8px 12px',
                                color: '#f1f5f9',
                                width: '300px'
                              }}
                            />
                          </td>
                        </tr>
                        
                        <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                          <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500'}}>Background Image</td>
                          <td style={{padding: '12px 0', textAlign: 'left'}}>
                            <input 
                              type="text" 
                              value={form.commitment_bg_image || ''}
                              onChange={(e) => updateForm('commitment_bg_image', e.target.value)}
                              placeholder="https://example.com/image.jpg"
                              style={{
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '4px',
                                padding: '8px 12px',
                                color: '#f1f5f9',
                                width: '250px',
                                marginRight: '8px'
                              }}
                            />
                            <button 
                              type="button" 
                              onClick={() => {
                                const url = prompt('Enter image URL:');
                                if (url) {
                                  updateForm('commitment_bg_image', url);
                                }
                              }}
                              style={{
                                background: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                padding: '8px 12px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              Upload Image
                            </button>
                          </td>
                        </tr>
                        
                        <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                          <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500'}}>Section Background Color</td>
                          <td style={{padding: '12px 0', textAlign: 'left'}}>
                            <input 
                              type="color" 
                              value={form.commitment_bg_color || '#232834'}
                              onChange={(e) => updateForm('commitment_bg_color', e.target.value)}
                              style={{width: '40px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '8px'}}
                            />
                            <input 
                              type="text" 
                              value=""
                              placeholder=""
                              style={{
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '4px',
                                padding: '8px 12px',
                                color: '#f1f5f9',
                                width: '100px'
                              }}
                            />
                          </td>
                        </tr>
                        
                        <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                          <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500'}}>Text Color</td>
                          <td style={{padding: '12px 0', textAlign: 'left'}}>
                            <input 
                              type="color" 
                              value={form.commitment_text_color || '#ffffff'}
                              onChange={(e) => updateForm('commitment_text_color', e.target.value)}
                              style={{width: '40px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '8px'}}
                            />
                            <input 
                              type="text" 
                              value=""
                              placeholder=""
                              style={{
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '4px',
                                padding: '8px 12px',
                                color: '#f1f5f9',
                                width: '100px'
                              }}
                            />
                          </td>
                        </tr>
                        
                        <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                          <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500'}}>Heading Color</td>
                          <td style={{padding: '12px 0', textAlign: 'left'}}>
                            <input 
                              type="color" 
                              value={form.commitment_heading_color || '#ffffff'}
                              onChange={(e) => updateForm('commitment_heading_color', e.target.value)}
                              style={{width: '40px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '8px'}}
                            />
                            <input 
                              type="text" 
                              value=""
                              placeholder=""
                              style={{
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '4px',
                                padding: '8px 12px',
                                color: '#f1f5f9',
                                width: '100px'
                              }}
                            />
                          </td>
                        </tr>
                        
                        <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                          <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500'}}>Subtitle Color</td>
                          <td style={{padding: '12px 0', textAlign: 'left'}}>
                            <input 
                              type="color" 
                              value={form.commitment_subtitle_color || '#cfd8dc'}
                              onChange={(e) => updateForm('commitment_subtitle_color', e.target.value)}
                              style={{width: '40px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '8px'}}
                            />
                            <input 
                              type="text" 
                              value=""
                              placeholder=""
                              style={{
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '4px',
                                padding: '8px 12px',
                                color: '#f1f5f9',
                                width: '100px'
                              }}
                            />
                          </td>
                        </tr>
                        
                        <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                          <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500'}}>Section Padding (px)</td>
                          <td style={{padding: '12px 0', textAlign: 'left'}}>
                            <input 
                              type="number" 
                              value={form.commitment_padding || 60}
                              onChange={(e) => updateForm('commitment_padding', parseInt(e.target.value))}
                              min="0" 
                              max="300"
                              style={{
                                background: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '4px',
                                padding: '8px 12px',
                                color: '#f1f5f9',
                                width: '100px'
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    {/* Image Preview */}
                    {form.commitment_bg_image && form.commitment_bg_image.trim() !== '' && (
                      <div style={{marginTop: '20px', padding: '20px', background: '#0f172a', borderRadius: '8px', border: '1px solid #334155'}}>
                        <h4 style={{color: '#f1f5f9', marginBottom: '12px', fontSize: '16px'}}>Commitment Background Image Preview</h4>
                        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                          <div style={{position: 'relative'}}>
                            <img 
                              src={form.commitment_bg_image} 
                              alt="Commitment section preview" 
                              style={{
                                width: '200px',
                                height: '120px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: '2px solid #334155'
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                if (nextElement) nextElement.style.display = 'flex';
                              }}
                            />
                            <div 
                              style={{
                                width: '200px',
                                height: '120px',
                                background: '#374151',
                                borderRadius: '8px',
                                border: '2px solid #334155',
                                display: 'none',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#9ca3af',
                                fontSize: '14px',
                                textAlign: 'center',
                                position: 'absolute',
                                top: 0,
                                left: 0
                              }}
                            >
                              Image failed to load
                            </div>
                          </div>
                          <div style={{flex: 1}}>
                            <p style={{color: '#d1d5db', fontSize: '14px', margin: '0 0 8px 0'}}>
                              <strong>Image URL:</strong><br />
                              <span style={{wordBreak: 'break-all', fontSize: '12px'}}>{form.commitment_bg_image}</span>
                            </p>
                            <p style={{color: '#9ca3af', fontSize: '12px', margin: '0'}}>
                              This image will be displayed as the background in the commitment section of your website.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Bottom Action Buttons */}
                    <div style={{display: 'none'}}>
                       <button 
                         type="button" 
                         style={{
                           background: '#3b82f6',
                           color: 'white',
                           border: 'none',
                           padding: '10px 16px',
                           borderRadius: '4px',
                           cursor: 'pointer',
                           fontSize: '14px',
                           fontWeight: '500',
                           display: 'flex',
                           alignItems: 'center',
                           gap: '8px'
                         }}
                       >
                         💾 Save Changes
                       </button>
                       <button 
                         type="button" 
                         style={{
                           background: '#6b7280',
                           color: 'white',
                           border: 'none',
                           padding: '10px 16px',
                           borderRadius: '4px',
                           cursor: 'pointer',
                           fontSize: '14px',
                           fontWeight: '500'
                         }}
                       >
                         Test Form Submission
                      </button>
						</div>
					</div>
				)}

                {/* Footer Tab */}
                {activeTab === 'footer' && (
                  <div className="bsg-section" style={{background: '#1e293b', color: '#f1f5f9', padding: '20px', borderRadius: '8px', border: '1px solid #334155'}}>
                    <h3 style={{color: '#f1f5f9', marginBottom: '20px'}}>| Footer Section</h3>
                    <p style={{color: '#94a3b8', marginBottom: '20px'}}>Customize your website footer appearance and content.</p>
                    
                    <table style={{width: '100%', borderCollapse: 'collapse'}}>
                      <tbody>
                        <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                          <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: 500, width: '40%'}}>Show Footer Section</td>
                          <td style={{padding: '12px 0'}}>
                            <input type="checkbox" checked={form.footer_visible ?? true} onChange={(e) => updateForm('footer_visible', e.target.checked)} style={{marginRight: 8}} />
                            <span>Show this section</span>
                          </td>
                        </tr>
                        <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                          <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: 500}}>Section Background Color</td>
                          <td style={{padding: '12px 0'}}>
                            <input type="color" value={form.footer_bg_color || '#1a1a1a'} onChange={(e) => updateForm('footer_bg_color', e.target.value)} style={{width: 40, height: 40, border: 'none', borderRadius: 4, cursor: 'pointer'}} />
                          </td>
                        </tr>
                        <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                          <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: 500}}>Text Color</td>
                          <td style={{padding: '12px 0'}}>
                            <input type="color" value={form.footer_links_color || '#cccccc'} onChange={(e) => updateForm('footer_links_color', e.target.value)} style={{width: 40, height: 40, border: 'none', borderRadius: 4, cursor: 'pointer'}} />
                          </td>
                        </tr>
                        <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                          <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: 500}}>Section Padding (px)</td>
                          <td style={{padding: '12px 0'}}>
                            <input type="number" value={form.footer_padding ?? 60} onChange={(e)=> updateForm('footer_padding', parseInt(e.target.value))} min={20} max={200} className="regular-text" style={{background: '#0f172a', border: '1px solid #334155', borderRadius: 4, padding: '8px 12px', color: '#f1f5f9', width: 120}} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    {/* Copyright and Disclaimer Section */}
                    <div style={{marginTop: '30px', borderTop: '1px solid #334155', paddingTop: '20px'}}>
                      <h4 style={{color: '#f1f5f9', marginBottom: '15px', fontSize: '16px'}}>Copyright & Disclaimer</h4>
                      <p style={{color: '#94a3b8', marginBottom: '15px', fontSize: '14px'}}>Configure the copyright text and disclaimer that will appear at the bottom of the footer.</p>
                      
                      <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                        <div>
                          <label style={{color: '#f1f5f9', fontSize: '14px', fontWeight: '500', marginBottom: '8px', display: 'block'}}>
                            Copyright Text
                          </label>
                          <input
                            type="text"
                            placeholder="©2025, Your Business Name. All Rights Reserved."
                            value={form.footer_copyright_text || ''}
                            onChange={(e) => updateForm('footer_copyright_text', e.target.value)}
                            style={{
                              background: '#0f172a',
                              border: '1px solid #334155',
                              borderRadius: '4px',
                              padding: '12px',
                              color: '#f1f5f9',
                              width: '100%',
                              fontSize: '14px'
                            }}
                          />
                        </div>
                        
                        <div>
                          <label style={{color: '#f1f5f9', fontSize: '14px', fontWeight: '500', marginBottom: '8px', display: 'block'}}>
                            Disclaimer Text
                          </label>
                          <textarea
                            placeholder="This website and its content are for informational purposes only. Results may vary based on individual circumstances."
                            value={form.footer_disclaimer_text || ''}
                            onChange={(e) => updateForm('footer_disclaimer_text', e.target.value)}
                            rows={3}
                            style={{
                              background: '#0f172a',
                              border: '1px solid #334155',
                              borderRadius: '4px',
                              padding: '12px',
                              color: '#f1f5f9',
                              width: '100%',
                              resize: 'vertical',
                              fontSize: '14px'
                            }}
                          />
                        </div>
                      </div>
                    </div>


                  </div>
                )}

                {/* FAQ Tab */}
                {activeTab === 'faq' && (
                  <div className="bsg-section">
                    <h3 style={{color: '#1f2937'}}>FAQ</h3>
                    <table className="form-table">
                      <tbody>
                        <tr>
                          <th scope="row">Show FAQ Section</th>
                          <td>
                            <input 
                              type="checkbox" 
                              checked={form.faq_visible || true}
                              onChange={(e) => updateForm('faq_visible', e.target.checked)}
                            />
                            <span style={{marginLeft: '8px'}}>Show this section</span>
                          </td>
                        </tr>
                        {/* Simplified: only one heading and one description for FAQ */}
                        <tr>
                          <th scope="row">Section Background Color</th>
                          <td>
                            <input type="color" value={form.faq_bg_color || '#1f2732'} onChange={(e) => updateForm('faq_bg_color', e.target.value)} />
                            <span className="description" style={{marginLeft:8}}>Dark slate like the preview</span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Heading</th>
                          <td>
                            <input type="text" className="regular-text" value={form.faq_heading || ''} onChange={(e)=>updateForm('faq_heading', e.target.value)} placeholder="Frequently Asked Questions" />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Description</th>
                          <td>
                            <textarea className="regular-text" rows={3} value={form.faq_desc || ''} onChange={(e)=>updateForm('faq_desc', e.target.value)} placeholder="Find answers to common questions..." />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Heading Color</th>
                          <td>
                            <input type="color" value={form.faq_heading_color || '#232834'} onChange={(e)=>updateForm('faq_heading_color', e.target.value)} />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Description Color</th>
                          <td>
                            <input type="color" value={form.faq_description_color || '#6b7280'} onChange={(e)=>updateForm('faq_description_color', e.target.value)} />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Side Image URL</th>
                          <td>
                            <input 
                              type="text" 
                              className="regular-text" 
                              value={form.faq_image || ''} 
                              onChange={(e)=>updateForm('faq_image', e.target.value)} 
                              placeholder="https://example.com/image.jpg"
                              style={{width: '250px', marginRight: '8px'}}
                            />
                            <button 
                              type="button" 
                              onClick={() => {
                                const url = prompt('Enter image URL:');
                                if (url) {
                                  updateForm('faq_image', url);
                                }
                              }}
                              style={{
                                background: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                padding: '8px 12px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              Upload Image
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Box Background</th>
                          <td>
                            <input type="color" value={form.faq_box_color || '#374151'} onChange={(e)=>updateForm('faq_box_color', e.target.value)} />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Question Color</th>
                          <td>
                            <input type="color" value={form.faq_question_color || '#ffffff'} onChange={(e)=>updateForm('faq_question_color', e.target.value)} />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Answer Color</th>
                          <td>
                            <input type="color" value={form.faq_answer_color || '#b0b0b0'} onChange={(e)=>updateForm('faq_answer_color', e.target.value)} />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Toggle Accent</th>
                          <td>
                            <input type="color" value={form.faq_toggle_color || '#2ee6c5'} onChange={(e)=>updateForm('faq_toggle_color', e.target.value)} />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Section Padding (px)</th>
                          <td>
                            <input 
                              type="number" 
                              value={form.faq_padding || 80}
                              onChange={(e) => updateForm('faq_padding', parseInt(e.target.value))}
                              min="0" 
                              max="300"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <div style={{marginTop: '2rem', padding: '1rem', background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '8px'}}>
                      <h4>FAQ List</h4>
                      <p className="description">Add frequently asked questions here.</p>
                      
                      {faqs.map((faq, index) => (
                        <div key={faq.id} style={{background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '1rem', marginBottom: '1rem'}}>
                          <div style={{display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'end'}}>
                            <div>
                              <label style={{fontWeight: 600, display: 'block', marginBottom: 6}}>Question</label>
                              <input
                                type="text"
                                className="regular-text"
                                style={{width: '100%'}}
                                value={faq.question}
                                onChange={(e) => updateFAQ(faq.id, 'question', e.target.value)}
                                placeholder="e.g., How long does a roof installation take?"
                              />
                            </div>
                            <div style={{alignSelf: 'center'}}>
                              <button type="button" className="button" onClick={() => removeFAQ(faq.id)} disabled={faqs.length === 1}>Remove</button>
                            </div>
                          </div>
                          <div style={{marginTop: '0.75rem'}}>
                            <label style={{fontWeight: 600, display: 'block', marginBottom: 6}}>Answer</label>
                            <textarea
                              className="regular-text"
                              style={{width: '100%', minHeight: 80}}
                              value={faq.answer}
                              onChange={(e) => updateFAQ(faq.id, 'answer', e.target.value)}
                              placeholder="Answer to the question..."
                            />
                          </div>
                        </div>
                      ))}
                      
                      <button type="button" className="button button-primary" onClick={addFAQ} style={{marginTop: '1rem', marginRight: '10px'}}>
                        + Add FAQ
                      </button>
                      
                      <button 
                        type="button" 
                        className="button button-secondary"
                        onClick={generateFAQAI}
                        disabled={loading}
                        style={{marginTop: '1rem'}}
                      >
                        {loading ? '🔄 Generating...' : '🔧 Generate FAQs with AI'}
                      </button>
                    </div>
                    
                    {/* FAQ Image Preview */}
                    {form.faq_image && form.faq_image.trim() !== '' && (
                      <div style={{marginTop: '20px', padding: '20px', background: '#0f172a', borderRadius: '8px', border: '1px solid #334155'}}>
                        <h4 style={{color: '#f1f5f9', marginBottom: '12px', fontSize: '16px'}}>FAQ Side Image Preview</h4>
                        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                          <div style={{position: 'relative'}}>
                            <img 
                              src={form.faq_image} 
                              alt="FAQ section preview" 
                              style={{
                                width: '200px',
                                height: '120px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: '1px solid #334155'
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                if (nextElement) nextElement.style.display = 'flex';
                              }}
                            />
                            <div style={{
                              display: 'none', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              width: '200px', 
                              height: '120px', 
                              background: '#374151', 
                              borderRadius: '8px', 
                              border: '1px solid #334155', 
                              color: '#9ca3af',
                              position: 'absolute',
                              top: 0,
                              left: 0
                            }}>
                              Image failed to load
                            </div>
                          </div>
                          <div style={{flex: 1}}>
                            <p style={{color: '#94a3b8', fontSize: '14px', margin: 0}}>
                              <strong>Image URL:</strong><br />
                              <span style={{wordBreak: 'break-all', fontSize: '12px'}}>{form.faq_image}</span>
                            </p>
                            <p style={{color: '#9ca3af', fontSize: '12px', margin: '8px 0 0 0'}}>
                              This image will be displayed alongside the FAQ section on your website.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Contact Tab */}
                {activeTab === 'contact' && (
                  <div>
                    <div className="bsg-section" style={{
                      background: '#1e293b',
                      color: '#f1f5f9',
                      padding: '20px',
                      borderRadius: '8px',
                      border: '1px solid #334155'
                    }}>
                      <h3 style={{color: '#f1f5f9', marginBottom: '20px'}}>| Contact Section</h3>
                      
                      <table style={{width: '100%', borderCollapse: 'collapse'}}>
                        <tbody>
                          <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                            <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500', width: '40%'}}>Heading</td>
                            <td style={{padding: '12px 0', textAlign: 'left'}}>
                              <input 
                                type="text" 
                                value={form.contact_heading || 'Get In Touch'}
                                onChange={(e) => updateForm('contact_heading', e.target.value)}
                                style={{
                                  background: '#0f172a',
                                  border: '1px solid #334155',
                                  borderRadius: '4px',
                                  padding: '8px 12px',
                                  color: '#f1f5f9',
                                  width: '300px'
                                }}
                                placeholder="Enter contact section heading"
                              />
                            </td>
                          </tr>
                          
                          <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                            <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500', verticalAlign: 'top'}}>Description</td>
                            <td style={{padding: '12px 0', textAlign: 'left'}}>
                              <textarea 
                                value={form.contact_description ?? ''}
                                onChange={(e) => updateForm('contact_description', e.target.value)}
                                rows={3}
                                placeholder="Ready to get started? Contact us for a free consultation and estimate."
                                style={{
                                  background: '#0f172a',
                                  border: '1px solid #334155',
                                  borderRadius: '4px',
                                  padding: '8px 12px',
                                  color: '#f1f5f9',
                                  width: '300px',
                                  resize: 'vertical'
                                }}
                              />
                            </td>
                          </tr>
                          
                          <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                            <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500'}}>Section Background Color</td>
                            <td style={{padding: '12px 0', textAlign: 'left'}}>
                              <input 
                                type="color" 
                                value={form.contact_section_bg_color || '#232a36'}
                                onChange={(e) => updateForm('contact_section_bg_color', e.target.value)}
                                style={{width: '40px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                              />
                            </td>
                          </tr>
                          
                          <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                            <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500'}}>Left Side Color (Contact Info)</td>
                            <td style={{padding: '12px 0', textAlign: 'left'}}>
                              <input 
                                type="color" 
                                value={form.contact_left_side_color || '#2ee6c5'}
                                onChange={(e) => updateForm('contact_left_side_color', e.target.value)}
                                style={{width: '40px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                              />
                            </td>
                          </tr>
                          
                          <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                            <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500'}}>Right Side Color (Form)</td>
                            <td style={{padding: '12px 0', textAlign: 'left'}}>
                              <input 
                                type="color" 
                                value={form.contact_right_side_color || '#ffffff'}
                                onChange={(e) => updateForm('contact_right_side_color', e.target.value)}
                                style={{width: '40px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                              />
                            </td>
                          </tr>
                          
                          <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                            <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500'}}>Text Color (Contact Info)</td>
                            <td style={{padding: '12px 0', textAlign: 'left'}}>
                              <input 
                                type="color" 
                                value={form.contact_text_color || '#ffffff'}
                                onChange={(e) => updateForm('contact_text_color', e.target.value)}
                                style={{width: '40px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                              />
                            </td>
                          </tr>
                          
                          <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                            <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500'}}>Headline Color</td>
                            <td style={{padding: '12px 0', textAlign: 'left'}}>
                              <input 
                                type="color" 
                                value={form.contact_headline_color || '#ffffff'}
                                onChange={(e) => updateForm('contact_headline_color', e.target.value)}
                                style={{width: '40px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                              />
                            </td>
                          </tr>
                          
                          <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                            <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500'}}>Description Color</td>
                            <td style={{padding: '12px 0', textAlign: 'left'}}>
                              <input 
                                type="color" 
                                value={form.contact_description_color || 'rgba(255,255,255,0.9)'}
                                onChange={(e) => updateForm('contact_description_color', e.target.value)}
                                style={{width: '40px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>

                    </div>
                    
                    {/* Contact Page SEO Settings */}
                    <div className="bsg-section" style={{
                      background: '#1e293b',
                      color: '#f1f5f9',
                      padding: '20px',
                      borderRadius: '8px',
                      border: '1px solid #334155',
                      marginTop: '20px'
                    }}>
                      <h3 style={{color: '#f1f5f9', marginBottom: '20px'}}>| Contact Page SEO Settings</h3>
                      <p style={{color: '#94a3b8', marginBottom: '20px'}}>Optimize your contact page for search engines.</p>
                      
                      <table style={{width: '100%', borderCollapse: 'collapse'}}>
                        <tbody>
                          <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                            <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500', width: '40%'}}>Contact Page Meta Title</td>
                            <td style={{padding: '12px 0', textAlign: 'left'}}>
                              <input 
                                type="text" 
                                value={form.contact_meta_title || `${form.business_name || 'Roofing Pros'} - Contact Us | Get Free Estimate | Professional Roofing Services in ${form.location || 'Orlando'}`}
                                onChange={(e) => updateForm('contact_meta_title', e.target.value)}
                                style={{
                                  background: '#0f172a',
                                  border: '1px solid #334155',
                                  borderRadius: '4px',
                                  padding: '8px 12px',
                                  color: '#f1f5f9',
                                  width: '300px'
                                }}
                              />
                              <p style={{margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8'}}>Recommended length: 50-60 characters</p>
                            </td>
                          </tr>
                          
                          <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                            <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500', verticalAlign: 'top'}}>Contact Page Meta Description</td>
                            <td style={{padding: '12px 0', textAlign: 'left'}}>
                              <textarea 
                                value={form.contact_meta_description || `Contact ${form.business_name || 'Roofing Pros'} for professional roofing services in ${form.location || 'Orlando'}. Get free estimates, expert consultation, and reliable service. Call ${form.phone || '(555) 123-4567'} or fill out our contact form today!`}
                                onChange={(e) => updateForm('contact_meta_description', e.target.value)}
                                rows={3}
                                style={{
                                  background: '#0f172a',
                                  border: '1px solid #334155',
                                  borderRadius: '4px',
                                  padding: '8px 12px',
                                  color: '#f1f5f9',
                                  width: '300px',
                                  resize: 'vertical'
                                }}
                              />
                              <p style={{margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8'}}>Recommended length: 150-160 characters</p>
                            </td>
                          </tr>
                          
                          <tr style={{borderBottom: '1px solid #f1f5f9'}}>
                            <td style={{padding: '12px 0', color: '#f1f5f9', fontWeight: '500'}}>Contact Page Meta Keywords</td>
                            <td style={{padding: '12px 0', textAlign: 'left'}}>
                              <input 
                                type="text" 
                                value={form.contact_meta_keywords || 'Contact, landscaping, lawn care, sod installation, plant'}
                                onChange={(e) => updateForm('contact_meta_keywords', e.target.value)}
                                style={{
                                  background: '#0f172a',
                                  border: '1px solid #334155',
                                  borderRadius: '4px',
                                  padding: '8px 12px',
                                  color: '#f1f5f9',
                                  width: '300px'
                                }}
                              />
                              <p style={{margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8'}}>Separate with commas. Note: Modern search engines rely less on meta keywords.</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                  </div>
                )}
                
                
                {/* Create Site Button - Contact tab only */}
                {activeTab === 'contact' && (
                    <div style={{marginTop: '2rem', textAlign: 'center'}}>
                      {/* Credits Display */}
                      <div style={{
                        marginBottom: '20px',
                        padding: '15px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        border: '1px solid #e9ecef'
                      }}>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                          💳 Your Credits: {credits.usedCredits} / {credits.totalCredits}
                        </div>
                        <div style={{ fontSize: '14px', color: '#6c757d' }}>
                          Plan: {credits.planType.charAt(0).toUpperCase() + credits.planType.slice(1)}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button 
                          type="button" 
                          className="button button-secondary"
                          onClick={async () => {
                            setLoading(true);
                            try {
                              const success = await saveToSupabase(form);
                              if (success) {
                                setSuccess('✅ All data saved to database successfully!');
                              } else {
                                setSuccess('❌ Failed to save data to database. Please try again.');
                              }
                            } catch (error) {
                              setSuccess('❌ Error saving data. Please try again.');
                              console.error('Save error:', error);
                            } finally {
                              setLoading(false);
                              setTimeout(() => setSuccess(''), 3000);
                            }
                          }}
                          disabled={loading}
                          style={{
                            fontSize: '16px',
                            padding: '15px 30px',
                            backgroundColor: '#28a745',
                            borderColor: '#28a745',
                            color: '#ffffff',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            transition: 'all 0.3s ease',
                            fontWeight: '600',
                            boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)',
                            minWidth: '180px'
                          }}
                        >
                          {loading ? '🔄 Saving...' : '💾 Save All Data'}
                        </button>
                        
                        <button 
                          type="button" 
                          className="button button-primary button-hero"
                          onClick={downloadTheme}
                          disabled={loading || !(form.business_name && form.business_type && form.phone && form.email && form.address) || credits.remainingCredits < 1}
                          style={{
                            fontSize: '18px',
                            padding: '18px 36px',
                            backgroundColor: (form.business_name && form.business_type && form.phone && form.email && form.address && credits.remainingCredits >= 1) ? '#0073aa' : '#6c757d',
                            borderColor: (form.business_name && form.business_type && form.phone && form.email && form.address && credits.remainingCredits >= 1) ? '#0073aa' : '#6c757d',
                            color: '#ffffff',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: (loading || !(form.business_name && form.business_type && form.phone && form.email && form.address) || credits.remainingCredits < 1) ? 'not-allowed' : 'pointer',
                            opacity: (loading || !(form.business_name && form.business_type && form.phone && form.email && form.address) || credits.remainingCredits < 1) ? 0.7 : 1,
                            transition: 'all 0.3s ease',
                            fontWeight: '600',
                            boxShadow: (form.business_name && form.business_type && form.phone && form.email && form.address && credits.remainingCredits >= 1) ? '0 4px 12px rgba(0, 115, 170, 0.3)' : 'none',
                            minWidth: '200px'
                          }}
                        >
                          {loading ? '🔄 Creating...' : credits.remainingCredits < 1 ? '❌ No Credits' : '📦 WordPress Theme (1 Credit)'}
                        </button>
                        
                      </div>
                      
                      <p style={{
                        marginTop: '15px',
                        color: '#6c757d',
                        fontSize: '14px',
                        fontStyle: 'italic'
                      }}>
                        {!(form.business_name && form.business_type && form.phone && form.email && form.address) 
                          ? 'Fill in all required general fields to activate the Create Site button'
                          : credits.remainingCredits < 1
                          ? 'You need to purchase more credits to create a site'
                          : 'This will generate a complete WordPress theme with all your content embedded'
                        }
                      </p>

                      {/* Upgrade to Pro Button - Show for free users */}
                      {credits.planType === 'free' && (
                        <div style={{
                          marginTop: '30px',
                          padding: '20px',
                          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                          borderRadius: '12px',
                          border: '2px solid #a855f7',
                          textAlign: 'center'
                        }}>
                          <h3 style={{
                            color: '#ffffff',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            marginBottom: '10px',
                            margin: '0 0 10px 0'
                          }}>
                            🚀 Upgrade to Pro
                          </h3>
                          <p style={{
                            color: '#e0e7ff',
                            fontSize: '14px',
                            marginBottom: '20px',
                            margin: '0 0 20px 0'
                          }}>
                            Get unlimited site creation, premium templates, and priority support
                          </p>
                          <Link 
                            href="/billing"
                            style={{
                              display: 'inline-block',
                              background: '#ffffff',
                              color: '#8b5cf6',
                              padding: '15px 30px',
                              borderRadius: '8px',
                              textDecoration: 'none',
                              fontSize: '16px',
                              fontWeight: 'bold',
                              transition: 'all 0.3s ease',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#f8fafc';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#ffffff';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                            }}
                          >
                            ⭐ Upgrade Now - Starting at $49/month
                          </Link>
                        </div>
                      )}
                      
                      {/* Debug Info */}
                      <div style={{
                        marginTop: '20px',
                        padding: '15px',
                        background: '#f8f9fa',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        fontSize: '12px',
                        textAlign: 'left'
                      }}>
                        <strong>Debug Info:</strong><br/>
                        Business Name: {form.business_name || 'Not set'}<br/>
                        Business Type: {form.business_type || 'Not set'}<br/>
                        Location: {form.location || 'Not set'}<br/>
                        Phone: {form.phone || 'Not set'}<br/>
                        Email: {form.email || 'Not set'}<br/>
                        Services: {services.length}<br/>
                        Features: {features.length}<br/>
                        Reviews: {reviews.length}
                      </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {/* Floating Save Button */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px'
      }}>
        {/* Last Saved Indicator */}
        {lastSaved && (
          <div style={{
            backgroundColor: 'rgba(40, 167, 69, 0.9)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '500',
            boxShadow: '0 2px 10px rgba(40, 167, 69, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            ✅ Saved at {lastSaved}
          </div>
        )}
        <button
          onClick={async () => {
            setLoading(true);
            try {
              const success = await saveToSupabase(form);
              if (success) {
                setSuccess('✅ All data saved to database successfully!');
              } else {
                setSuccess('❌ Failed to save data to database. Please try again.');
              }
            } catch (error) {
              setSuccess('❌ Error saving data. Please try again.');
              console.error('Save error:', error);
            } finally {
              setLoading(false);
              setTimeout(() => setSuccess(''), 3000);
            }
          }}
          disabled={loading}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '15px 20px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            boxShadow: '0 4px 20px rgba(40, 167, 69, 0.4)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            minWidth: '140px',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(40, 167, 69, 0.6)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(40, 167, 69, 0.4)';
          }}
        >
          {loading ? '🔄' : '💾'} {loading ? 'Saving...' : 'Save All'}
        </button>
      </div>
		</div>
	);
} 
