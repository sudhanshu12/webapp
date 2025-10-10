import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
import fs from 'fs';
import path from 'path';

// Function to generate dynamic pages based on wizard content
async function generateDynamicPages(zip: JSZip, themeSlug: string, bsgSettings: any, data: any) {
  console.log('=== GENERATING DYNAMIC PAGES ===');
  
  // Generate service pages
  if (data.services && Array.isArray(data.services)) {
    console.log(`Generating ${data.services.length} service pages`);
    for (const service of data.services) {
      if (service.name && service.slug) {
        const servicePageContent = generateServicePage(service, bsgSettings);
        zip.file(`${themeSlug}/page-${service.slug}.php`, servicePageContent);
        console.log(`Generated service page: page-${service.slug}.php`);
      }
    }
  }

  // Generate location pages
  if (data.locations && Array.isArray(data.locations)) {
    console.log(`Generating ${data.locations.length} location pages`);
    for (const location of data.locations) {
      if (location.name && location.slug) {
        const locationPageContent = generateLocationPage(location, bsgSettings);
        zip.file(`${themeSlug}/page-${location.slug}.php`, locationPageContent);
        console.log(`Generated location page: page-${location.slug}.php`);
      }
    }
  }

  // Generate about page if content exists
  if (data.about_visible && data.about_description) {
    console.log('Generating about page');
    const aboutPageContent = generateAboutPage(bsgSettings);
    zip.file(`${themeSlug}/page-about.php`, aboutPageContent);
    zip.file(`${themeSlug}/page-about-us.php`, aboutPageContent); // Alternative slug
    console.log('Generated about page: page-about.php and page-about-us.php');
  }

  // Generate contact page if contact info exists
  if (data.contact_visible && (data.phone || data.email)) {
    console.log('Generating contact page');
    const contactPageContent = generateContactPage(bsgSettings);
    zip.file(`${themeSlug}/page-contact.php`, contactPageContent);
    zip.file(`${themeSlug}/page-contact-us.php`, contactPageContent); // Alternative slug
    console.log('Generated contact page: page-contact.php and page-contact-us.php');
  }

  // Generate FAQ page if FAQ content exists
  if (data.faq_visible && data.faqs && data.faqs.length > 0) {
    console.log('Generating FAQ page');
    const faqPageContent = generateFaqPage(bsgSettings);
    zip.file(`${themeSlug}/page-faq.php`, faqPageContent);
    console.log('Generated FAQ page: page-faq.php');
  }

  // Generate sitemap.xml
  const sitemapContent = generateSitemap(bsgSettings, data);
  zip.file(`${themeSlug}/sitemap.xml`, sitemapContent);
  console.log('Generated sitemap.xml');
}

// Generate service page content
function generateServicePage(service: any, bsgSettings: any): string {
  return `<?php
/**
 * Template Name: BSG Service Page - ${service.name}
 * Service: ${service.name}
 * Slug: ${service.slug}
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
    <?php bsg_output_meta_tags('service', '${service.metaTitle || service.name}', '${service.metaDescription || service.description}'); ?>
    <?php bsg_output_structured_data('service', ${JSON.stringify(service)}); ?>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php include dirname(__FILE__) . '/section-header.php'; ?>

    <main>
        <section class="service-hero" style="background-color: var(--surface-color); padding: 80px 0; color: #ffffff;">
            <div class="container">
                <div class="service-hero-content" style="text-align: center; max-width: 800px; margin: 0 auto;">
                    <h1 style="font-size: 3rem; font-weight: 800; margin: 0 0 1rem 0; color: var(--heading-color);">
                        ${service.name}
                    </h1>
                    <p style="font-size: 1.2rem; color: #8f8f8f; margin: 0 0 2rem 0;">
                        ${service.description || 'Professional service in your area'}
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="tel:${bsgSettings.phone}" class="btn btn-primary" style="background: var(--button-color); color: #ffffff; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                            Call Now: ${bsgSettings.phone}
                        </a>
                        <a href="#contact" class="btn btn-secondary" style="background: transparent; color: var(--button-color); border: 2px solid var(--button-color); padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                            Get Free Quote
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section class="service-content" style="padding: 80px 0; background-color: #ffffff;">
            <div class="container">
                <div class="service-details" style="max-width: 1000px; margin: 0 auto;">
                    ${service.content ? service.content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') : `
                    <div class="service-description">
                        <h2>About ${service.name}</h2>
                        <p>${service.description || 'Professional service provided by ' + bsgSettings.business_name + ' in ' + bsgSettings.location + '.'}</p>
                        
                        <h3>Why Choose Us for ${service.name}?</h3>
                        <ul>
                            <li>Expert team with years of experience</li>
                            <li>High-quality materials and workmanship</li>
                            <li>Competitive pricing and transparent quotes</li>
                            <li>Local expertise in ${bsgSettings.location}</li>
                            <li>Customer satisfaction guarantee</li>
                        </ul>
                        
                        <h3>Our Process</h3>
                        <ol>
                            <li>Free consultation and assessment</li>
                            <li>Detailed proposal and timeline</li>
                            <li>Professional service delivery</li>
                            <li>Quality inspection and follow-up</li>
                        </ol>
                    </div>
                    `}
                </div>
            </div>
        </section>

        <section id="contact" class="contact-section" style="padding: 80px 0; background-color: var(--surface-color); color: #ffffff;">
            <div class="container">
                <div class="contact-content" style="text-align: center; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0;">Ready to Get Started?</h2>
                    <p style="font-size: 1.1rem; margin: 0 0 2rem 0; color: #8f8f8f;">
                        Contact ${bsgSettings.business_name} today for your ${service.name} needs in ${bsgSettings.location}.
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="tel:${bsgSettings.phone}" class="btn btn-primary" style="background: var(--button-color); color: #ffffff; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                            Call: ${bsgSettings.phone}
                        </a>
                        <a href="mailto:${bsgSettings.email}" class="btn btn-secondary" style="background: transparent; color: var(--button-color); border: 2px solid var(--button-color); padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
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
<?php get_footer(); ?>`;
}

// Generate location page content
function generateLocationPage(location: any, bsgSettings: any): string {
  return `<?php
/**
 * Template Name: BSG Location Page - ${location.name}
 * Location: ${location.name}
 * Slug: ${location.slug}
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
    <?php bsg_output_meta_tags('location', '${location.metaTitle || bsgSettings.business_name + ' in ' + location.name}', '${location.metaDescription || 'Professional services in ' + location.name + ' by ' + bsgSettings.business_name}'); ?>
    <?php bsg_output_structured_data('location', ${JSON.stringify(location)}); ?>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php include dirname(__FILE__) . '/section-header.php'; ?>

    <main>
        <section class="location-hero" style="background-color: var(--surface-color); padding: 80px 0; color: #ffffff;">
            <div class="container">
                <div class="location-hero-content" style="text-align: center; max-width: 800px; margin: 0 auto;">
                    <h1 style="font-size: 3rem; font-weight: 800; margin: 0 0 1rem 0; color: var(--heading-color);">
                        ${bsgSettings.business_name} in ${location.name}
                    </h1>
                    <p style="font-size: 1.2rem; color: #8f8f8f; margin: 0 0 2rem 0;">
                        Professional ${bsgSettings.business_type.toLowerCase()} services in ${location.name}${location.state ? ', ' + location.state : ''}
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="tel:${bsgSettings.phone}" class="btn btn-primary" style="background: var(--button-color); color: #ffffff; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                            Call Now: ${bsgSettings.phone}
                        </a>
                        <a href="#contact" class="btn btn-secondary" style="background: transparent; color: var(--button-color); border: 2px solid var(--button-color); padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                            Get Free Quote
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section class="location-content" style="padding: 80px 0; background-color: #ffffff;">
            <div class="container">
                <div class="location-details" style="max-width: 1000px; margin: 0 auto;">
                    ${location.description ? location.description.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') : `
                    <div class="location-description">
                        <h2>${bsgSettings.business_name} Serving ${location.name}</h2>
                        <p>We are proud to serve ${location.name}${location.state ? ', ' + location.state : ''} with professional ${bsgSettings.business_type.toLowerCase()} services. Our experienced team understands the local area and provides customized solutions for residents and businesses.</p>
                        
                        <h3>Why Choose Us in ${location.name}?</h3>
                        <ul>
                            <li>Local expertise and knowledge of ${location.name}</li>
                            <li>Quick response times for emergency services</li>
                            <li>Familiarity with local building codes and regulations</li>
                            <li>Established relationships with local suppliers</li>
                            <li>Community-focused service approach</li>
                        </ul>
                        
                        <h3>Areas We Serve in ${location.name}</h3>
                        <p>We provide comprehensive ${bsgSettings.business_type.toLowerCase()} services throughout ${location.name}${location.state ? ', ' + location.state : ''} and surrounding areas. Our service area includes residential neighborhoods, commercial districts, and industrial zones.</p>
                    </div>
                    `}
                </div>
            </div>
        </section>

        <section id="contact" class="contact-section" style="padding: 80px 0; background-color: var(--surface-color); color: #ffffff;">
            <div class="container">
                <div class="contact-content" style="text-align: center; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0;">Contact Us in ${location.name}</h2>
                    <p style="font-size: 1.1rem; margin: 0 0 2rem 0; color: #8f8f8f;">
                        Ready to get started? Contact ${bsgSettings.business_name} today for professional services in ${location.name}.
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="tel:${bsgSettings.phone}" class="btn btn-primary" style="background: var(--button-color); color: #ffffff; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                            Call: ${bsgSettings.phone}
                        </a>
                        <a href="mailto:${bsgSettings.email}" class="btn btn-secondary" style="background: transparent; color: var(--button-color); border: 2px solid var(--button-color); padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
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
<?php get_footer(); ?>`;
}

// Generate about page content
function generateAboutPage(bsgSettings: any): string {
  return `<?php
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
    <?php bsg_output_meta_tags('about'); ?>
    <?php bsg_output_structured_data('about'); ?>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php include dirname(__FILE__) . '/section-header.php'; ?>

    <main>
        <section class="about-hero" style="background-color: var(--surface-color); padding: 80px 0; color: #ffffff;">
            <div class="container">
                <div class="about-hero-content" style="text-align: center; max-width: 800px; margin: 0 auto;">
                    <h1 style="font-size: 3rem; font-weight: 800; margin: 0 0 1rem 0; color: var(--heading-color);">
                        About ${bsgSettings.business_name}
                    </h1>
                    <p style="font-size: 1.2rem; color: #8f8f8f; margin: 0 0 2rem 0;">
                        Your trusted partner for professional ${bsgSettings.business_type.toLowerCase()} services
                    </p>
                </div>
            </div>
        </section>

        <section class="about-content" style="padding: 80px 0; background-color: #ffffff;">
            <div class="container">
                <div class="about-details" style="max-width: 1000px; margin: 0 auto;">
                    ${bsgSettings.about_description ? bsgSettings.about_description.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') : `
                    <div class="about-description">
                        <h2>Who We Are</h2>
                        <p>${bsgSettings.business_name} is a professional ${bsgSettings.business_type.toLowerCase()} company serving ${bsgSettings.location} and surrounding areas. With ${bsgSettings.about_years || 15}+ years of experience, we are committed to delivering high-quality services that exceed our customers' expectations.</p>
                        
                        <h3>Our Mission</h3>
                        <p>To provide exceptional ${bsgSettings.business_type.toLowerCase()} services while maintaining the highest standards of quality, integrity, and customer satisfaction.</p>
                        
                        <h3>Why Choose Us?</h3>
                        <ul>
                            <li>${bsgSettings.about_years || 15}+ years of industry experience</li>
                            <li>Licensed and insured professionals</li>
                            <li>Quality materials and workmanship</li>
                            <li>Competitive pricing and transparent quotes</li>
                            <li>Customer satisfaction guarantee</li>
                        </ul>
                    </div>
                    `}
                </div>
            </div>
        </section>

        <section class="contact-section" style="padding: 80px 0; background-color: var(--surface-color); color: #ffffff;">
            <div class="container">
                <div class="contact-content" style="text-align: center; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0;">Get In Touch</h2>
                    <p style="font-size: 1.1rem; margin: 0 0 2rem 0; color: #8f8f8f;">
                        Ready to work with us? Contact ${bsgSettings.business_name} today.
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="tel:${bsgSettings.phone}" class="btn btn-primary" style="background: var(--button-color); color: #ffffff; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                            Call: ${bsgSettings.phone}
                        </a>
                        <a href="mailto:${bsgSettings.email}" class="btn btn-secondary" style="background: transparent; color: var(--button-color); border: 2px solid var(--button-color); padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
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
<?php get_footer(); ?>`;
}

// Generate contact page content
function generateContactPage(bsgSettings: any): string {
  return `<?php
/**
 * Template Name: BSG Contact Page
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
    <?php bsg_output_meta_tags('contact'); ?>
    <?php bsg_output_structured_data('contact'); ?>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php include dirname(__FILE__) . '/section-header.php'; ?>

    <main>
        <section class="contact-hero" style="background-color: var(--surface-color); padding: 80px 0; color: #ffffff;">
  <div class="container">
                <div class="contact-hero-content" style="text-align: center; max-width: 800px; margin: 0 auto;">
                    <h1 style="font-size: 3rem; font-weight: 800; margin: 0 0 1rem 0; color: var(--heading-color);">
                        Contact ${bsgSettings.business_name}
                    </h1>
                    <p style="font-size: 1.2rem; color: #8f8f8f; margin: 0 0 2rem 0;">
                        Get in touch for professional ${bsgSettings.business_type.toLowerCase()} services
                    </p>
    </div>
  </div>
</section>

        <section class="contact-content" style="padding: 80px 0; background-color: #ffffff;">
  <div class="container">
                <div class="contact-details" style="max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start;">
                    <div class="contact-info">
                        <h2>Get In Touch</h2>
                        <div class="contact-item" style="margin-bottom: 2rem;">
                            <h3>Phone</h3>
                            <p><a href="tel:${bsgSettings.phone}" style="color: var(--button-color); text-decoration: none;">${bsgSettings.phone}</a></p>
      </div>
                        <div class="contact-item" style="margin-bottom: 2rem;">
                            <h3>Email</h3>
                            <p><a href="mailto:${bsgSettings.email}" style="color: var(--button-color); text-decoration: none;">${bsgSettings.email}</a></p>
      </div>
                        ${bsgSettings.address ? `
                        <div class="contact-item" style="margin-bottom: 2rem;">
                            <h3>Address</h3>
                            <p>${bsgSettings.address}<br>${bsgSettings.location}${bsgSettings.state ? ', ' + bsgSettings.state : ''} ${bsgSettings.zip}</p>
      </div>
                        ` : ''}
                        <div class="contact-item">
                            <h3>Service Area</h3>
                            <p>${bsgSettings.location} and surrounding areas</p>
    </div>
  </div>
                    
                    <div class="contact-form">
                        <h2>Send Us a Message</h2>
                        <form style="display: flex; flex-direction: column; gap: 1rem;">
                            <input type="text" name="name" placeholder="Your Name" required style="padding: 1rem; border: 1px solid #ddd; border-radius: 6px;">
                            <input type="email" name="email" placeholder="Your Email" required style="padding: 1rem; border: 1px solid #ddd; border-radius: 6px;">
                            <input type="tel" name="phone" placeholder="Your Phone" style="padding: 1rem; border: 1px solid #ddd; border-radius: 6px;">
                            <select name="service" style="padding: 1rem; border: 1px solid #ddd; border-radius: 6px;">
                                <option value="">Select Service</option>
                                <option value="general">General Inquiry</option>
                                <option value="quote">Free Quote</option>
                                <option value="emergency">Emergency Service</option>
                            </select>
                            <textarea name="message" placeholder="Your Message" rows="5" required style="padding: 1rem; border: 1px solid #ddd; border-radius: 6px; resize: vertical;"></textarea>
                            <button type="submit" class="btn btn-primary" style="background: var(--button-color); color: #ffffff; padding: 1rem 2rem; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
                                Send Message
                            </button>
                        </form>
      </div>
    </div>
  </div>
</section>
    </main>

    <?php include dirname(__FILE__) . '/section-footer.php'; ?>
    <?php wp_footer(); ?>
</body>
</html>
<?php get_footer(); ?>`;
}

// Generate FAQ page content
function generateFaqPage(bsgSettings: any): string {
  return `<?php
/**
 * Template Name: BSG FAQ Page
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
    <?php bsg_output_meta_tags('faq'); ?>
    <?php bsg_output_structured_data('faq'); ?>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php include dirname(__FILE__) . '/section-header.php'; ?>

    <main>
        <section class="faq-hero" style="background-color: var(--surface-color); padding: 80px 0; color: #ffffff;">
            <div class="container">
                <div class="faq-hero-content" style="text-align: center; max-width: 800px; margin: 0 auto;">
                    <h1 style="font-size: 3rem; font-weight: 800; margin: 0 0 1rem 0; color: var(--heading-color);">
                        Frequently Asked Questions
                    </h1>
                    <p style="font-size: 1.2rem; color: #8f8f8f; margin: 0 0 2rem 0;">
                        Common questions about ${bsgSettings.business_name} services
                    </p>
    </div>
  </div>
</section>

        <section class="faq-content" style="padding: 80px 0; background-color: #ffffff;">
  <div class="container">
                <div class="faq-details" style="max-width: 800px; margin: 0 auto;">
                    <div class="faq-list">
                        ${bsgSettings.faqs && bsgSettings.faqs.length > 0 ? bsgSettings.faqs.map((faq: any) => `
                        <div class="faq-item" style="margin-bottom: 2rem; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                            <div class="faq-question" style="background: #f8f9fa; padding: 1.5rem; cursor: pointer; border-bottom: 1px solid #e0e0e0;">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">${faq.question}</h3>
    </div>
                            <div class="faq-answer" style="padding: 1.5rem; background: #ffffff;">
                                <p style="margin: 0; line-height: 1.6; color: #666;">${faq.answer}</p>
                                    </div>
                                </div>
                        `).join('') : `
                        <div class="no-faqs" style="text-align: center; padding: 3rem;">
                            <h3>No FAQs Available</h3>
                            <p>Please contact us directly for any questions about our services.</p>
                            <a href="tel:${bsgSettings.phone}" class="btn btn-primary" style="background: var(--button-color); color: #ffffff; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; margin-top: 1rem;">
                                Call: ${bsgSettings.phone}
                            </a>
          </div>
                        `}
        </div>
    </div>
  </div>
</section>

        <section class="contact-section" style="padding: 80px 0; background-color: var(--surface-color); color: #ffffff;">
            <div class="container">
                <div class="contact-content" style="text-align: center; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0;">Still Have Questions?</h2>
                    <p style="font-size: 1.1rem; margin: 0 0 2rem 0; color: #8f8f8f;">
                        Contact ${bsgSettings.business_name} for personalized answers to your questions.
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="tel:${bsgSettings.phone}" class="btn btn-primary" style="background: var(--button-color); color: #ffffff; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                            Call: ${bsgSettings.phone}
                        </a>
                        <a href="mailto:${bsgSettings.email}" class="btn btn-secondary" style="background: transparent; color: var(--button-color); border: 2px solid var(--button-color); padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
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
<?php get_footer(); ?>`;
}

// Generate sitemap.xml
function generateSitemap(bsgSettings: any, data: any): string {
  const baseUrl = `https://${bsgSettings.business_name.toLowerCase().replace(/\s+/g, '')}.com`;
  const currentDate = new Date().toISOString();
  
  let urls = [
    { loc: baseUrl, lastmod: currentDate, changefreq: 'weekly', priority: '1.0' },
    { loc: `${baseUrl}/about`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/contact`, lastmod: currentDate, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/faq`, lastmod: currentDate, changefreq: 'monthly', priority: '0.6' }
  ];

  // Add service pages
  if (data.services && Array.isArray(data.services)) {
    data.services.forEach((service: any) => {
      if (service.slug) {
        urls.push({
          loc: `${baseUrl}/${service.slug}`,
          lastmod: currentDate,
          changefreq: 'monthly',
          priority: '0.7'
        });
      }
    });
  }

  // Add location pages
  if (data.locations && Array.isArray(data.locations)) {
    data.locations.forEach((location: any) => {
      if (location.slug) {
        urls.push({
          loc: `${baseUrl}/${location.slug}`,
          lastmod: currentDate,
          changefreq: 'monthly',
          priority: '0.7'
        });
      }
    });
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Debug: Log the complete received data
    console.log('=== BUILD THEME API DEBUG ===');
    console.log('Received data:', JSON.stringify(data, null, 2));
    console.log('Data keys:', Object.keys(data));
    console.log('Services in data:', data.services);
    console.log('Locations in data:', data.locations);
    console.log('Services length:', data.services ? data.services.length : 'undefined');
    console.log('Locations length:', data.locations ? data.locations.length : 'undefined');
    
    const zip = new JSZip();
    
    // Create comprehensive bsg_settings object with all possible wizard data
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
      
      // SEO and meta settings
      homepage_meta_title: data.homepage_meta_title || '',
      homepage_meta_description: data.homepage_meta_description || '',
      homepage_meta_keywords: data.homepage_meta_keywords || '',
      about_page_meta_title: data.about_page_meta_title || '',
      about_page_meta_description: data.about_page_meta_description || '',
      about_page_meta_keywords: data.about_page_meta_keywords || '',
      
      // About page settings
      about_page_hero_title: data.about_page_hero_title || '',
      about_page_hero_subtitle: data.about_page_hero_subtitle || '',
      about_page_hero_description: data.about_page_hero_description || '',
      about_page_hero_bg_image: data.about_page_hero_bg_image || '',
      about_page_content: data.about_page_content || '',
      about_page_team_title: data.about_page_team_title || '',
      about_page_team_description: data.about_page_team_description || '',
      about_page_values_title: data.about_page_values_title || '',
      about_page_values_description: data.about_page_values_description || '',
      
      // Hero section settings
      hero_visible: data.hero_visible !== undefined ? data.hero_visible : true,
      hero_headline: data.hero_headline || `Find ${data.business_type || 'service'} Near You`,
      hero_subheadline: data.hero_subheadline || 'Contact Us Now Today to Get Going!',
      hero_description: data.hero_description || '',
      hero_cta: data.hero_cta || 'Rated 5 Stars On Google',
      hero_cta_link: data.hero_cta_link || '#contact',
      hero_rating: data.hero_rating || 'Rated 5 Stars On Google',
      hero_bg_image: data.hero_bg_image || '',
      hero_side_image: data.hero_side_image || '',
      hero_bg_color: data.hero_bg_color || '#ffffff',
      hero_padding: data.hero_padding || 80,
      hero_company_color: data.hero_company_color || '#b0b0b0',
      hero_heading_color: data.hero_heading_color || '#232834',
      hero_subheading_color: data.hero_subheading_color || '#b0b0b0',
      hero_description_color: data.hero_description_color || '#b0b0b0',
      hero_reviews_text_color: data.hero_reviews_text_color || '#232834',
      hero_reviews_star_color: data.hero_reviews_star_color || '#fbbf24',
      hero_book_btn_bg: data.hero_book_btn_bg || '#2ee6c5',
      hero_book_btn_text: data.hero_book_btn_text || '#ffffff',
      hero_call_btn_bg: data.hero_call_btn_bg || '#232834',
      hero_call_btn_text: data.hero_call_btn_text || '#ffffff',
      hero_book_btn_link: data.hero_book_btn_link || '#',
      hero_call_btn_link: data.hero_call_btn_link || `tel:${data.phone || ''}`,
      
      // Services section settings
      services_visible: data.services_visible !== undefined ? data.services_visible : true,
      services_label: data.services_label || 'TOP RATED SERVICES',
      services_title: data.services_title || 'Our Services',
      services_cta_text: data.services_cta_text || 'Get A Free Estimate',
      services_cta_link: data.services_cta_link || '#',
      services_cta_bg: data.services_cta_bg || '#2ee6c5',
      services_cta_text_color: data.services_cta_text_color || '#232834',
      services_bg_color: data.services_bg_color || '#313746',
      services_card_color: data.services_card_color || '#232834',
      services_text_color: data.services_text_color || '#ffffff',
      services_icon_color: data.services_icon_color || '#2ee6c5',
      services_card_radius: data.services_card_radius || 12,
      services_button_text: data.services_button_text || '#2ee6c5',
      services_progress_color: data.services_progress_color || '#2ee6c5',
      services_padding: data.services_padding || 60,
      service_hero_heading_color: data.service_hero_heading_color || '#ffffff',
      service_hero_description_color: data.service_hero_description_color || '#cfd8dc',
      services_contact_title: data.services_contact_title || 'GET A QUOTE',
      services_contact_description: data.services_contact_description || '',
      service_contact_box_bg: data.service_contact_box_bg || '#2a3440',
      service_contact_box_text: data.service_contact_box_text || '#cfd8dc',
      service_contact_icons_color: data.service_contact_icons_color || '#2ee6c5',
      service_content_bg_color: data.service_content_bg_color || '#232834',
      service_content_padding: data.service_content_padding || 80,
      
      // Features section settings
      features_visible: data.features_visible !== undefined ? data.features_visible : true,
      features_label: data.features_label || 'WHY CHOOSE US',
      features_title: data.features_title || 'What Makes Us Different',
      features_description: data.features_description || '',
      features_bg_color: data.features_bg_color || '#1e2834',
      features_card_bg: data.features_card_bg || '#1e2834',
      features_text_color: data.features_text_color || '#ffffff',
      features_icon_color: data.features_icon_color || '#11c0bd',
      features_padding: data.features_padding || 80,
      
      // About section settings
      about_visible: data.about_visible !== undefined ? data.about_visible : true,
      about_label: data.about_label || 'ABOUT US',
      about_title: data.about_title || 'Your Trusted Partner',
      about_description: data.about_description || '',
      about_image: data.about_image || '',
      about_bg_color: data.about_bg_color || '#f8f9fa',
      about_text_color: data.about_text_color || '#23282d',
      about_padding: data.about_padding || 80,
      about_projects: data.about_projects || '500+',
      about_customers: data.about_customers || '1000+',
      about_team: data.about_team || '25+',
      about_tagline: data.about_tagline || 'WHO WE ARE',
      about_tagline_color: data.about_tagline_color || '#0ea5e9',
      about_heading: data.about_heading || 'About Our Company',
      about_heading_color: data.about_heading_color || '#ffffff',
      about_description_color: data.about_description_color || '#6b7280',
      about_experience_text: data.about_experience_text || 'Years of Experience',
      about_experience_bg: data.about_experience_bg || '#374151',
      about_experience_text_color: data.about_experience_text_color || '#0ea5e9',
      about_button_text: data.about_button_text || 'About Us',
      about_button_color: data.about_button_color || '#0ea5e9',
      about_button_text_color: data.about_button_text_color || '#374151',
      about_button_link: data.about_button_link || 'about-us',
      about_use_default_prompts: data.about_use_default_prompts !== undefined ? data.about_use_default_prompts : true,

// About page specific settings
      about_page_hero_tagline: data.about_page_hero_tagline || 'ABOUT',
      about_page_hero_tagline_color: data.about_page_hero_tagline_color || '#6b7280',
      about_page_hero_heading_color: data.about_page_hero_heading_color || '#ffffff',
      about_page_hero_bg_color: data.about_page_hero_bg_color || '#374151',
      about_page_who_tagline: data.about_page_who_tagline || 'WHO WE ARE',
      about_page_who_tagline_color: data.about_page_who_tagline_color || '#0ea5e9',
      about_page_who_headline: data.about_page_who_headline || 'About',
      about_page_who_description: data.about_page_who_description || '',
      about_page_team_image: data.about_page_team_image || '',
      about_page_who_bg: data.about_page_who_bg || '#ffffff',
      about_page_who_text: data.about_page_who_text || '#374151',
      about_page_who_desc_color: data.about_page_who_desc_color || '#374151',
      about_page_years: data.about_page_years || '15+',
      about_page_experience_label: data.about_page_experience_label || 'Years of Experience',
      about_page_experience_bg: data.about_page_experience_bg || '#0ea5e9',
      about_page_experience_text: data.about_page_experience_text || '#000000',
      about_page_cta_text: data.about_page_cta_text || 'Learn More',
      about_page_cta_link: data.about_page_cta_link || '#',
      about_page_cta_bg: data.about_page_cta_bg || '#0ea5e9',
      about_page_cta_text_color: data.about_page_cta_text_color || '#000000',
      about_page_button_bg: data.about_page_button_bg || '#0d9488',
      about_page_button_text: data.about_page_button_text || '#374151',
      about_page_why_heading: data.about_page_why_heading || 'Why Work With Us?',
      about_page_why_subheading: data.about_page_why_subheading || 'Benefits of Working with an Expert Team',
      about_page_why_bg: data.about_page_why_bg || '#1e3a8a',
      about_page_why_heading_color: data.about_page_why_heading_color || '#ffffff',
      about_page_why_subtitle_color: data.about_page_why_subtitle_color || '#ffffff',
      about_page_why_item_title: data.about_page_why_item_title || '#ffffff',
      about_page_why_item_desc: data.about_page_why_item_desc || '#ffffff',
      about_page_why_icon_bg: data.about_page_why_icon_bg || '#1e3a8a',
      about_page_why_icon: data.about_page_why_icon || '#ffffff',
      about_page_why_section_bg: data.about_page_why_section_bg || '#374151',
      about_page_why_section_text: data.about_page_why_section_text || '#000000',
      about_page_use_default_prompts: data.about_page_use_default_prompts !== undefined ? data.about_page_use_default_prompts : true,
      
      // Locations section settings
      locations_visible: data.locations_visible !== undefined ? data.locations_visible : true,
      locations_label: data.locations_label || 'SERVICE AREAS',
      locations_title: data.locations_title || 'Areas We Serve',
      locations_description: data.locations_description || '',
      locations_bg_color: data.locations_bg_color || '#394656',
      locations_card_bg: data.locations_card_bg || '#1e2834',
      locations_text_color: data.locations_text_color || '#ffffff',
      locations_padding: data.locations_padding || 80,
      
      // Reviews section settings
      reviews_visible: data.reviews_visible !== undefined ? data.reviews_visible : true,
      reviews_label: data.reviews_label || 'CUSTOMER REVIEWS',
      reviews_title: data.reviews_title || 'What Our Customers Say',
      reviews_bg_color: data.reviews_bg_color || '#f8f9fa',
      reviews_card_bg: data.reviews_card_bg || '#ffffff',
      reviews_star_color: data.reviews_star_color || '#fbbf24',
      reviews_padding: data.reviews_padding || 80,

// Commitment section settings
      commitment_visible: data.commitment_visible !== undefined ? data.commitment_visible : true,
      commitment_label: data.commitment_label || 'OUR COMMITMENT',
      commitment_title: data.commitment_title || 'Our Promise Of Reliability',
      commitment_subtitle: data.commitment_subtitle || 'We promise to deliver exceptional service',
      commitment_text: data.commitment_text || '',
      commitment_image: data.commitment_image || '',
      commitment_bg_color: data.commitment_bg_color || '#232834',
      commitment_text_color: data.commitment_text_color || '#ffffff',
      commitment_padding: data.commitment_padding || 80,
      
      // Footer settings
      footer_bg_color: data.footer_bg_color || '#232834',
      footer_text_color: data.footer_text_color || '#ffffff',
      footer_link_color: data.footer_link_color || '#2ee6c5',
      footer_copyright: data.footer_copyright || '© 2025 Your Business. All rights reserved.',
      
      // FAQ section settings
      faq_visible: data.faq_visible !== undefined ? data.faq_visible : true,
      faq_label: data.faq_label || 'FREQUENTLY ASKED QUESTIONS',
      faq_title: data.faq_title || 'Common Questions',
      faq_bg_color: data.faq_bg_color || '#ffffff',
      faq_padding: data.faq_padding || 80,
      
      // Contact section settings
      contact_visible: data.contact_visible !== undefined ? data.contact_visible : true,
      contact_label: data.contact_label || 'GET IN TOUCH',
      contact_title: data.contact_title || 'Contact Us Today',
      contact_description: data.contact_description || '',
      contact_bg_color: data.contact_bg_color || '#f8f9fa',
      contact_form_bg: data.contact_form_bg || '#474747',
      contact_button_color: data.contact_button_color || '#2563eb',
      contact_padding: data.contact_padding || 80,
      
      // Content arrays
      services: data.services || [],
      locations: data.locations || [],
      reviews: data.reviews || [],
      features: data.features || [],
      commitments: data.commitments || [],
      faqs: data.faqs || [],
      footerLinks: data.footerLinks || []
    };

    // Debug: Log processed variables
    console.log('=== PROCESSED VARIABLES ===');
    console.log('businessName:', bsgSettings.business_name);
    console.log('businessType:', bsgSettings.business_type);
    console.log('location:', bsgSettings.location);
    console.log('phone:', bsgSettings.phone);
    console.log('email:', bsgSettings.email);
    console.log('heroHeadline:', bsgSettings.hero_headline);
    console.log('heroSubheadline:', bsgSettings.hero_subheadline);
    console.log('aboutDescription:', bsgSettings.about_description);
    console.log('bsgSettings:', JSON.stringify(bsgSettings, null, 2));

    // Locate wp-theme folder
    const projectRoot = path.join(process.cwd(), '..');
    const wpThemeDir = path.join(projectRoot, 'wp-theme');
    
    if (!fs.existsSync(wpThemeDir)) {
      throw new Error('wp-theme folder not found in project root');
    }
    
    const themeSlug = `${bsgSettings.business_name.toLowerCase().replace(/\s+/g, '-')}-theme`;
    
    // Read functions.php and set $settings from wizard data
    const functionsPhpPath = path.join(wpThemeDir, 'functions.php');
    let functionsPhp = fs.readFileSync(functionsPhpPath, 'utf8');
    
    // Replace $settings assignment to use wizard data as JSON (decoded to PHP array)
    const jsonSettingsEscaped = JSON.stringify(bsgSettings)
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'");
    const settingsAssignment = `$settings = json_decode('${jsonSettingsEscaped}', true);`;
    
    const replacePatterns: RegExp[] = [
      /\$settings\s*=\s*null\s*;/ // only replace `$settings = null;`
    ];
    let replaced = false;
    for (const pattern of replacePatterns) {
      if (pattern.test(functionsPhp)) {
        functionsPhp = functionsPhp.replace(pattern, settingsAssignment);
        replaced = true;
        break;
      }
    }
    
    // No fallback: if `$settings = null;` is not found, leave file unchanged

    // Helper function to recursively add directory to zip
    const addDirToZip = (dirPath: string, basePath: string) => {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      for (const entry of entries) {
        const abs = path.join(dirPath, entry.name);
        const rel = path.relative(basePath, abs);
        if (entry.isDirectory()) {
          addDirToZip(abs, basePath);
} else {
          const content = fs.readFileSync(abs);
          zip.file(`${themeSlug}/${rel}`, new Uint8Array(content));
        }
      }
    };

    // Add all files from wp-theme folder to zip
    addDirToZip(wpThemeDir, wpThemeDir);
    
    // Override functions.php with the one that has $settings set from wizard data
    zip.file(`${themeSlug}/functions.php`, functionsPhp);

    // Generate dynamic pages based on wizard content
    await generateDynamicPages(zip, themeSlug, bsgSettings, data);

    // Create README.txt
    const readmeTxt = `BSG Theme - ${bsgSettings.business_name}
Generated: ${new Date().toISOString()}

Business: ${bsgSettings.business_name}
Type: ${bsgSettings.business_type}
Location: ${bsgSettings.location}
Phone: ${bsgSettings.phone}
Email: ${bsgSettings.email}

This theme includes:
- Dynamic homepage template (home-dynamic.php)
- Auto-generated service pages (page-{service-slug}.php)
- Auto-generated location pages (page-{location-slug}.php)
- Auto-generated about page (page-about.php)
- Auto-generated contact page (page-contact.php)
- Auto-generated FAQ page (page-faq.php)
- All sections and components
- BSG Settings pre-configured
- SEO-optimized sitemap.xml

Installation:
1. Upload this ZIP to WordPress
2. Activate the theme
3. Pages will be automatically created when theme is activated
4. If pages don't appear, manually create them and assign templates
5. Settings are automatically loaded from bsg_settings

Manual Page Creation (if needed):
- Create "About Us" page with slug "about" and assign "BSG About Page" template
- Create "Contact Us" page with slug "contact" and assign "BSG Contact Page" template
- Create "FAQ" page with slug "faq" and assign "BSG FAQ Page" template
- Create service pages with slugs matching your services and assign "BSG Service Page" template
- Create location pages with slugs matching your locations and assign "BSG Location Page" template

Auto-Generated Pages:
${data.services && data.services.length > 0 ? data.services.map((s: any) => `- ${s.name} (page-${s.slug}.php)`).join('\n') : '- No service pages generated'}
${data.locations && data.locations.length > 0 ? data.locations.map((l: any) => `- ${l.name} (page-${l.slug}.php)`).join('\n') : '- No location pages generated'}
${data.about_visible ? '- About page (page-about.php)' : '- No about page generated'}
${data.contact_visible ? '- Contact page (page-contact.php)' : '- No contact page generated'}
${data.faq_visible ? '- FAQ page (page-faq.php)' : '- No FAQ page generated'}

Templates available:
- BSG Dynamic Homepage (for Home page)
- BSG Service Page (for service pages)
- BSG Location Page (for location pages)
- BSG About Page (for about page)
- BSG Contact Page (for contact page)
- BSG FAQ Page (for FAQ page)
`;

    // Create DEBUG.txt
    const debugTxt = `BSG Theme Debug Info
Generated: ${new Date().toISOString()}

Wizard Data:
${JSON.stringify(data, null, 2)}

Processed Settings:
${JSON.stringify(bsgSettings, null, 2)}

Theme Structure:
- Source: wp-theme/
- Output: ${themeSlug}/
- Functions.php: Modified with bsg_settings
`;

    // Add documentation files
    zip.file(`${themeSlug}/README.txt`, readmeTxt);
    zip.file(`${themeSlug}/DEBUG.txt`, debugTxt);

    // Generate ZIP buffer
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    // Return ZIP file
    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${themeSlug}.zip"`,
        'Content-Length': zipBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Error building theme:', error);
    return NextResponse.json(
      { error: 'Failed to build theme', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
