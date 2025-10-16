<?php
/**
 * Template Name: About Us Page
 */

get_header();
?>

<main>
    <section style="background-color: #1f2937; padding: 80px 20px; color: #ffffff;">
        <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
            <h1 style="font-size: 3rem; font-weight: 800; margin: 0 0 1rem 0; color: #ffffff;">
                About Us
            </h1>
            <p style="font-size: 1.2rem; color: #d1d5db; margin: 0;">
                Your trusted partner for professional services
            </p>
        </div>
    </section>

    <section style="background: #ffffff; padding: 80px 20px;">
        <div style="max-width: 1200px; margin: 0 auto;">
            <div style="display: flex; gap: 4rem; flex-wrap: wrap;">
                <div style="flex: 0 0 400px; min-width: 300px;">
                    <div style="width: 100%; height: 500px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; font-weight: 600;">
                        Team Photo
                    </div>
                </div>
                
                <div style="flex: 1; min-width: 300px;">
                    <div style="color: #14b8a6; font-weight: 700; font-size: 0.95rem; margin-bottom: 1rem; letter-spacing: 1px; text-transform: uppercase;">
                        WHO WE ARE
                    </div>
                    
                    <h2 style="font-size: 2.5rem; font-weight: 800; margin: 0 0 1.5rem 0; color: #1f2937;">
                        About Our Company
                    </h2>
                    
                    <div style="font-size: 1.05rem; margin-bottom: 2rem; color: #4b5563; line-height: 1.8;">
                        <p>We are a premier company dedicated to transforming your space with professional expertise and exceptional service. Our team brings years of experience and a commitment to quality that sets us apart.</p>
                    </div>
                    
                    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 2rem;">
                        <div style="background: #14b8a6; color: #ffffff; padding: 1.5rem 2rem; border-radius: 8px; text-align: center; min-width: 140px;">
                            <div style="font-size: 2rem; font-weight: 800; margin: 0;">15+</div>
                            <div style="font-size: 0.85rem; margin: 0.5rem 0 0 0;">Years of Experience</div>
                        </div>
                        
                        <a href="#contact" style="background: #14b8a6; color: #ffffff; padding: 1rem 2.5rem; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 1rem; display: inline-flex; align-items: center;">
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section style="padding: 80px 20px; background-color: #1f2937; color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; text-align: center;">
            <h2 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0;">Get In Touch</h2>
            <p style="font-size: 1.1rem; margin: 0 0 2rem 0; color: #d1d5db;">
                Ready to work with us? Contact us today.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <a href="tel:8755026281" style="background: #f59e0b; color: #ffffff; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                    Call: 8755026281
                </a>
                <a href="mailto:sudhanshuxmen@gmail.com" style="background: transparent; color: #f59e0b; border: 2px solid #f59e0b; padding: 1rem 2rem; text-decoration: none; border-radius: 6px; font-weight: 600;">
                    Email Us
                </a>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
