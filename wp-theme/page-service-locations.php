<?php
/**
 * Template Name: BSG Service Locations Page
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
    <?php bsg_output_meta_tags('service-locations', 'Roofing Pros  Service Locations', 'Professional roofing services in multiple locations by Roofing Pros '); ?>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php include dirname(__FILE__) . '/section-header.php'; ?>

    <main>
        <section class="service-locations-hero" style="background-color: var(--surface-color); padding: 80px 0; color: #ffffff;">
            <div class="container">
                <div class="service-locations-hero-content" style="text-align: center; max-width: 800px; margin: 0 auto;">
                    <h1 style="font-size: 3rem; font-weight: 800; margin: 0 0 1rem 0; color: var(--heading-color);">
                        Service Locations
                    </h1>
                    <p style="font-size: 1.2rem; color: #8f8f8f; margin: 0 0 2rem 0;">
                        Professional roofing services in multiple locations
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="tel:8755026291" class="btn btn-primary" style="background: var(--button-color); color: #ffffff; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                            Call Now: 8755026291
                        </a>
                        <a href="#contact" class="btn btn-secondary" style="background: transparent; color: var(--button-color); border: 2px solid var(--button-color); padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                            Get Free Quote
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section class="service-locations-content" style="padding: 80px 0; background-color: #ffffff;">
            <div class="container">
                <div class="service-locations-details" style="max-width: 1000px; margin: 0 auto;">
                    <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 2rem 0; text-align: center;">
                        Areas We Serve
                    </h2>
                    <p style="font-size: 1.1rem; color: #666; margin: 0 0 3rem 0; text-align: center; line-height: 1.6;">
                        Roofing Pros  proudly serves multiple locations with professional roofing services. 
                        Our experienced team is committed to delivering quality work and exceptional customer service to every location we serve.
                    </p>
                    
                    <div class="locations-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin: 3rem 0;">
                        
                        <div class="location-card" style="background: #f8f9fa; padding: 2rem; border-radius: 12px; text-align: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;">
                            <h3 style="font-size: 1.5rem; font-weight: 600; margin: 0 0 1rem 0; color: #333;">
                                saint Maria, Maryland
                            </h3>
                            <p style="color: #666; margin: 0 0 1.5rem 0; line-height: 1.5;">
                                Location Overview
Welcome to Roofing Pros, your premier roofing service provider in Ohio. With a commitment to excellence and a strong focus on custom...
                            </p>
                            <a href="/service-locations/saint-maria-21742/" class="btn btn-primary" style="background: var(--button-color); color: #ffffff; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
                                Learn More
                            </a>
                        </div>
                        
                        <div class="location-card" style="background: #f8f9fa; padding: 2rem; border-radius: 12px; text-align: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;">
                            <h3 style="font-size: 1.5rem; font-weight: 600; margin: 0 0 1rem 0; color: #333;">
                                Boston, Massachusetts
                            </h3>
                            <p style="color: #666; margin: 0 0 1.5rem 0; line-height: 1.5;">
                                ```html
Location Overview
Welcome to Roofing Pros, your trusted roofing partner located in the heart of Boston. We pride ourselves on delivering high-...
                            </p>
                            <a href="/service-locations/boston-02155/" class="btn btn-primary" style="background: var(--button-color); color: #ffffff; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
                                Learn More
                            </a>
                        </div>
                        
                        <div class="location-card" style="background: #f8f9fa; padding: 2rem; border-radius: 12px; text-align: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;">
                            <h3 style="font-size: 1.5rem; font-weight: 600; margin: 0 0 1rem 0; color: #333;">
                                Portland, Oregon
                            </h3>
                            <p style="color: #666; margin: 0 0 1.5rem 0; line-height: 1.5;">
                                
  
    Location Overview
    Welcome to Roofing Pros, your trusted roofing partner in Portland. We take pride in offering top-notch roofing solutions...
                            </p>
                            <a href="/service-locations/portland-85365/" class="btn btn-primary" style="background: var(--button-color); color: #ffffff; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
                                Learn More
                            </a>
                        </div>
                        
                        <div class="location-card" style="background: #f8f9fa; padding: 2rem; border-radius: 12px; text-align: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;">
                            <h3 style="font-size: 1.5rem; font-weight: 600; margin: 0 0 1rem 0; color: #333;">
                                Mission Hills, California
                            </h3>
                            <p style="color: #666; margin: 0 0 1.5rem 0; line-height: 1.5;">
                                ```html

Welcome to Roofing Pros, your premier roofing service provider in Mission Hills. We take pride in delivering high-quality roofing solutions t...
                            </p>
                            <a href="/service-locations/mission-hills/" class="btn btn-primary" style="background: var(--button-color); color: #ffffff; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
                                Learn More
                            </a>
                        </div>
                        
                    </div>
                    
                    <div class="why-choose-local" style="background: #f8f9fa; padding: 3rem; border-radius: 12px; margin: 3rem 0;">
                        <h3 style="font-size: 2rem; font-weight: 600; margin: 0 0 1.5rem 0; text-align: center;">
                            Why Choose Local Service
                        </h3>
                        <p style="font-size: 1.1rem; color: #666; margin: 0 0 2rem 0; text-align: center; line-height: 1.6;">
                            Choosing a local service provider means you get someone who understands your area, local regulations, and can provide faster response times. 
                            We're committed to building lasting relationships with our community.
                        </p>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; margin-bottom: 1rem;">🏠</div>
                                <h4 style="font-size: 1.2rem; font-weight: 600; margin: 0 0 0.5rem 0;">Local Expertise</h4>
                                <p style="color: #666; margin: 0;">Knowledge of local building codes and regulations</p>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; margin-bottom: 1rem;">⚡</div>
                                <h4 style="font-size: 1.2rem; font-weight: 600; margin: 0 0 0.5rem 0;">Fast Response</h4>
                                <p style="color: #666; margin: 0;">Quick response times for emergency services</p>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; margin-bottom: 1rem;">🤝</div>
                                <h4 style="font-size: 1.2rem; font-weight: 600; margin: 0 0 0.5rem 0;">Community Focus</h4>
                                <p style="color: #666; margin: 0;">Building lasting relationships with our neighbors</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="contact" class="contact-section" style="padding: 80px 0; background-color: var(--surface-color); color: #ffffff;">
            <div class="container">
                <div class="contact-content" style="text-align: center; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0;">Ready to Get Started?</h2>
                    <p style="font-size: 1.1rem; margin: 0 0 2rem 0; color: #8f8f8f;">
                        Contact Roofing Pros  today for professional services in your area.
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