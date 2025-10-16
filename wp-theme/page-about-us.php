<?php
/**
 * Template Name: BSG About Us Template
 */

get_header();
?>

<main>
    <section style="background-color: #1f2937; padding: 80px 20px; color: #ffffff;">
        <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
            <h1 style="font-size: 3rem; font-weight: 800; margin: 0 0 1rem 0; color: #ffffff;">
                About Roofing Heros
            </h1>
            <p style="font-size: 1.2rem; color: #d1d5db; margin: 0;">
                Your trusted partner for professional services
            </p>
        </div>
    </section>

    <section style="background: #ffffff; padding: 80px 20px;">
        <div style="max-width: 1200px; margin: 0 auto;">
            <div style="display: flex; gap: 4rem; align-items: flex-start; flex-wrap: wrap;">
                <div style="flex: 0 0 420px; min-width: 300px;">
                    <img src="https://mattslandscapingca.com/wp-content/uploads/2025/08/ChatGPT-Image-Aug-17-2025-11_07_32-PM.png" alt="About Team" style="width: 100%; height: 550px; object-fit: cover; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
                </div>
                
                <div style="flex: 1; min-width: 300px;">
                    <div style="color: #14b8a6; font-weight: 700; font-size: 0.95rem; margin-bottom: 1rem; letter-spacing: 1px; text-transform: uppercase;">
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style="display: inline-block; vertical-align: middle; margin-right: 0.5rem;">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        WHO WE ARE
                    </div>
                    
                    <h2 style="font-size: 2.75rem; font-weight: 800; margin: 0 0 1.5rem 0; color: #1f2937; line-height: 1.2;">
                        About Roofing Heros
                    </h2>
                    
                    <div style="font-size: 1.05rem; margin-bottom: 2.5rem; color: #4b5563; line-height: 1.8;">
                        <p>Welcome to Landscaping Lompoc, your premier landscaping company in Orlando. We specialize in transforming outdoor spaces into beautiful, functional landscapes that enhance the beauty of your home. With years of experience and a passion for nature, our dedicated team is committed to providing exceptional service and stunning results tailored to your unique vision.</p>
                        
                        <p><strong>Why Choose Us?</strong> At Landscaping Lompoc, we prioritize quality, creativity, and customer satisfaction. Our skilled professionals use eco-friendly practices and top-notch materials to ensure your landscape thrives. Trust us to bring your dream garden to life, making your property the envy of the neighborhood.</p>
                    </div>
                    
                    <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap; margin-top: 2rem;">
                        <div style="background: #14b8a6; color: #ffffff; padding: 1.5rem 2rem; border-radius: 8px; text-align: center; min-width: 140px;">
                            <div style="font-size: 2.25rem; font-weight: 800; margin: 0; line-height: 1;">15+</div>
                            <div style="font-size: 0.85rem; margin: 0.5rem 0 0 0; font-weight: 500;">Years of Experience</div>
                        </div>
                        
                        <a href="#contact" style="background: #14b8a6; color: #ffffff; padding: 1rem 2.5rem; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 1rem; display: inline-block;">
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
                Ready to work with us? Contact Roofing Heros today.
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

<style>
@media (max-width: 968px) {
    main section > div > div {
        flex-direction: column !important;
    }
    main section > div > div > div:first-child {
        flex: 1 !important;
        max-width: 500px !important;
        margin: 0 auto !important;
    }
}
</style>

<?php get_footer(); ?>
