import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const data = await req.json();
		const { type, content, businessData, apiKey } = data;

		if (!apiKey) {
			return NextResponse.json({ error: 'OpenAI API key is required' }, { status: 400 });
		}

		let prompt = '';
		
		switch (type) {
			case 'service':
				prompt = `Generate structured content for the '${content.name}' service page for '${businessData.business_name}' company. 

IMPORTANT: Return ONLY a JSON object with these exact keys and HTML content. Do NOT include any other text or formatting. Do NOT include testimonials, customer reviews, or customer quotes.

Generate content for these sections:

1. service_intro: A comprehensive introduction paragraph about ${content.name} services (100-150 words) - explain what the service is, why it's important, and how it benefits customers
2. company_trust_intro: A paragraph establishing trust and credibility (60-80 words) - mention experience, expertise, and local reputation
3. why_choose_intro: Introduction paragraph for why choose us section (40-60 words)
4. benefits_list: Generate 5-6 key benefits as HTML <li> items. Each <li> should be ONE single sentence (15-20 words) - focus on customer value
5. service_types_intro: Introduction paragraph about different types/variations of ${content.name} services (50-70 words)
6. service_types: Generate 3-4 different types/variations of ${content.name} services as HTML <li> items. Each <li> should be ONE single sentence (20-25 words)
7. additional_services_intro: Introduction paragraph about related services offered (40-60 words)
8. additional_services: Generate 4-5 related services as HTML <li> items. Each <li> should be ONE single sentence (15-20 words)
9. process_intro: Introduction paragraph for our process section (40-60 words)
10. process_steps: Generate 4-6 process steps as HTML <li> items. IMPORTANT: Each <li> should contain ONLY ONE single sentence (15-20 words). Do NOT include nested lists, bullet points, or multiple sentences per step.
11. cta_text: Call to action paragraph encouraging contact (50-70 words)

Focus on ${businessData.business_type} industry expertise and serving ${businessData.location} area. Include the company phone number in the CTA. Make content professional, detailed, and customer-focused.

Company: ${businessData.business_name}, Industry: ${businessData.business_type}, Location: ${businessData.location}, Phone: ${businessData.phone}

Return ONLY a JSON object like this:
{
  "service_intro": "<p>content here</p>",
  "company_trust_intro": "<p>content here</p>",
  "why_choose_intro": "<p>content here</p>",
  "benefits_list": "<li>benefit 1</li><li>benefit 2</li>...",
  "service_types_intro": "<p>content here</p>",
  "service_types": "<li>type 1</li><li>type 2</li>...",
  "additional_services_intro": "<p>content here</p>",
  "additional_services": "<li>service 1</li><li>service 2</li>...",
  "process_intro": "<p>content here</p>",
  "process_steps": "<li>step 1</li><li>step 2</li>...",
  "cta_text": "<p>content here</p>"
}`;
				break;
				
			case 'location':
				prompt = `Generate professional HTML content for a ${businessData.business_type} location page for '${businessData.business_name}' in ${content.name}. 

IMPORTANT: Return ONLY HTML content with h2, h3, and p tags only. Do NOT use h1, ul, li, or any other HTML tags. Do NOT return JSON. Do NOT include testimonials, customer reviews, or customer quotes.

Include these sections:
- Location overview with h2 heading
- ${businessData.business_type} services offered in ${content.name} with h3 heading and paragraph
- Why choose ${businessData.business_name} in ${content.name} with h3 heading
- Local expertise and experience in ${content.name} with h3 heading
- Call-to-action section with paragraph only (no heading)

Make it around 400-500 words, engaging and professional. Include the company phone number for contact. Focus on serving ${content.name} area with ${businessData.business_type} expertise.

Company: ${businessData.business_name}, Industry: ${businessData.business_type}, Phone: ${businessData.phone}`;
				break;
				
			case 'about_home':
				prompt = `Write a compelling about section for the homepage of ${businessData.business_name}, a ${businessData.business_type} company in ${businessData.location}. 

IMPORTANT: Return ONLY HTML content with h3 and p tags only. Do NOT use h1, h2, ul, li, or any other HTML tags. Do NOT return JSON.

Include:
- Company overview with h3 heading
- Why customers should choose them with h3 heading

Keep it EXACTLY around 100 words maximum, engaging and professional.

Company: ${businessData.business_name}, Industry: ${businessData.business_type}, Location: ${businessData.location}, Phone: ${businessData.phone}`;
				break;
				
			case 'about_page':
				prompt = `Generate comprehensive about page content for ${businessData.business_name}, a professional ${businessData.business_type} company serving ${businessData.location} and surrounding areas.

IMPORTANT: Return ONLY a JSON object with these exact keys and content. Do NOT include any other text or formatting.

Create compelling, professional content that tells the company's story and builds trust. Focus on:

1. who_we_are_tagline: Section tagline (e.g., "WHO WE ARE", "ABOUT US", "OUR STORY")
2. who_we_are_title: Main section title (e.g., "About ${businessData.business_name}", "Your Trusted ${businessData.business_type} Experts")
3. who_we_are_description: Comprehensive company description (150-200 words) covering:
   - Company background and experience
   - What makes them unique in the ${businessData.business_type} industry
   - Service area and local expertise
   - Commitment to quality and customer satisfaction
4. mission_statement: Clear mission statement (100-150 words) explaining:
   - Company's purpose and goals
   - How they serve their community
   - What drives their daily operations
5. values_list: Generate 5 core company values as HTML <li> items (each 12-18 words):
   - Focus on integrity, quality, customer service, safety, community involvement
   - Make them specific to ${businessData.business_type} industry
6. team_description: Team expertise description (100-150 words) covering:
   - Team qualifications and experience
   - Training and certifications
   - Commitment to continuous improvement
7. commitment_statement: Customer commitment statement (80-120 words) explaining:
   - What customers can expect
   - Quality guarantees
   - Service standards
8. commitment_points: Generate 4 specific commitment points as HTML <li> items (each 12-18 words):
   - Focus on reliability, quality, communication, support
9. final_cta_text: Compelling call-to-action text (80-120 words) that:
   - Encourages contact and consultation
   - Mentions free consultation or estimate
   - Creates urgency and excitement
   - Does NOT include phone number (it will be added separately)
   - Focuses on the value proposition and next steps
10. cta_link: Call to action link (e.g., "#contact", "/contact", "tel:${businessData.phone}")
11. cta_text: Call to action button text (e.g., "Get Free Estimate", "Call Now", "Contact Us")

WRITING GUIDELINES:
- Use professional, trustworthy tone
- Include specific details about ${businessData.business_type} industry
- Mention ${businessData.location} area expertise
- Focus on customer benefits and outcomes
- Use active voice and compelling language
- Avoid generic phrases - be specific to the business
- For final_cta_text: Write compelling text that encourages action without including phone numbers
- Keep the CTA text focused on benefits and next steps, not contact details

Company Details: ${businessData.business_name}, Industry: ${businessData.business_type}, Location: ${businessData.location}, Phone: ${businessData.phone}

Return ONLY a JSON object like this:
{
  "who_we_are_tagline": "WHO WE ARE",
  "who_we_are_title": "About ${businessData.business_name}",
  "who_we_are_description": "detailed company description here...",
  "mission_statement": "mission statement here...",
  "values_list": "<li>value 1</li><li>value 2</li>...",
  "team_description": "team description here...",
  "commitment_statement": "commitment statement here...",
  "commitment_points": "<li>point 1</li><li>point 2</li>...",
  "final_cta_text": "Compelling CTA text without phone number here...",
  "cta_link": "#contact",
  "cta_text": "Get Free Estimate"
}`;
				break;

			case 'features':
				prompt = `Generate business features content for ${businessData.business_name}, a ${businessData.business_type} company in ${businessData.location}. 

IMPORTANT: Return ONLY a JSON object with these exact keys and content. Do NOT include any other text or formatting.

Generate 6 business features with titles, icons, and descriptions:

Return ONLY a JSON object like this:
{
  "features": [
    {
      "title": "Expert Team",
      "icon": "👨‍🔧",
      "description": "Our experienced team of ${businessData.business_type} professionals brings years of expertise to every project."
    },
    {
      "title": "Quality Materials",
      "icon": "🏗️",
      "description": "We use only the highest quality materials and equipment to ensure lasting results."
    },
    {
      "title": "Local Expertise",
      "icon": "📍",
      "description": "Deep knowledge of ${businessData.location} area and local building codes and requirements."
    },
    {
      "title": "Warranty Coverage",
      "icon": "🛡️",
      "description": "Comprehensive warranty coverage on all our work for your peace of mind."
    },
    {
      "title": "Timely Service",
      "icon": "⏰",
      "description": "We complete projects on time and within budget, respecting your schedule."
    },
    {
      "title": "Customer Satisfaction",
      "icon": "⭐",
      "description": "Your satisfaction is our top priority with exceptional service and support."
    }
  ]
}

Focus on ${businessData.business_type} industry expertise and serving ${businessData.location} area. Make each description 20-30 words.`;
				break;

			case 'reviews':
				prompt = `Generate customer reviews content for ${businessData.business_name}, a ${businessData.business_type} company in ${businessData.location}. 

IMPORTANT: Return ONLY a JSON object with these exact keys and content. Do NOT include any other text or formatting.

Generate 5 customer reviews with names, ratings, and comments:

Return ONLY a JSON object like this:
{
  "reviews": [
    {
      "name": "John Smith",
      "rating": 5,
      "comment": "Excellent service and quality work! The team was professional and completed our ${businessData.business_type} project on time."
    },
    {
      "name": "Sarah Johnson",
      "rating": 5,
      "comment": "Highly recommend ${businessData.business_name}! They were reliable, trustworthy, and delivered exactly as promised."
    },
    {
      "name": "Mike Davis",
      "rating": 5,
      "comment": "Outstanding workmanship and attention to detail. The ${businessData.business_type} service exceeded our expectations."
    },
    {
      "name": "Lisa Wilson",
      "rating": 5,
      "comment": "Professional team with great communication throughout the entire ${businessData.business_type} project. Very satisfied!"
    },
    {
      "name": "Robert Brown",
      "rating": 5,
      "comment": "Best ${businessData.business_type} company in ${businessData.location}! Fair pricing, quality work, and excellent customer service."
    }
  ]
}

Focus on ${businessData.business_type} services and ${businessData.location} area. Make each comment 30-50 words. Use realistic names and 5-star ratings.`;
				break;

			case 'faq':
				prompt = `Generate FAQ content for ${businessData.business_name}, a ${businessData.business_type} company in ${businessData.location}. 

IMPORTANT: Return ONLY a JSON object with these exact keys and content. Do NOT include any other text or formatting.

Generate 6 frequently asked questions with questions and answers:

Return ONLY a JSON object like this:
{
  "faqs": [
    {
      "question": "How long does a typical ${businessData.business_type} project take?",
      "answer": "Most ${businessData.business_type} projects take 1-3 days depending on the scope and complexity. We'll provide a detailed timeline during your consultation."
    },
    {
      "question": "Do you offer emergency ${businessData.business_type} services?",
      "answer": "Yes, we provide 24/7 emergency ${businessData.business_type} services for urgent situations. Call us anytime for immediate assistance."
    },
    {
      "question": "What areas do you serve in ${businessData.location}?",
      "answer": "We serve ${businessData.location} and all surrounding areas. Contact us to confirm we cover your specific location."
    },
    {
      "question": "Do you provide free estimates?",
      "answer": "Yes, we offer free, no-obligation estimates for all ${businessData.business_type} projects. Schedule your consultation today."
    },
    {
      "question": "What warranty do you provide on your work?",
      "answer": "We provide comprehensive warranty coverage on all our ${businessData.business_type} work. Details are provided with your estimate."
    },
    {
      "question": "How do I schedule a consultation?",
      "answer": "You can schedule a consultation by calling us at ${businessData.phone} or filling out our contact form. We'll respond within 24 hours."
    }
  ]
}

Focus on ${businessData.business_type} services and ${businessData.location} area. Make each answer 30-50 words.`;
				break;
				break;
				
			default:
				return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
		}

		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: 'gpt-4o-mini',
				messages: [{ role: 'user', content: prompt }],
				max_tokens: 1000,
				temperature: 0.7
			})
		});

		const result = await response.json();
		const generatedContent = result?.choices?.[0]?.message?.content?.trim();

		if (!generatedContent) {
			throw new Error('Failed to generate content');
		}

		// For service content, process the JSON and insert into template
		if (type === 'service') {
			try {
				const contentParts = JSON.parse(generatedContent);
				const template = `
<div class="service-description">
    <p class="service-intro">${contentParts.service_intro || ''}</p>
    
    <div class="service-section">
        <h3>Trustworthy ${businessData.location} ${businessData.business_type} Company</h3>
        <p>${contentParts.company_trust_intro || ''}</p>
    </div>
    
    <div class="service-section">
        <h3>Why Choose Us?</h3>
        <p>${contentParts.why_choose_intro || ''}</p>
        <ul class="benefits-list">
            ${contentParts.benefits_list || ''}
        </ul>
    </div>
    
    <div class="service-section">
        <h3>Types of ${content.name} Services in ${businessData.location}</h3>
        <p>${contentParts.service_types_intro || ''}</p>
        <ul class="service-types">
            ${contentParts.service_types || ''}
        </ul>
    </div>
    
    <div class="service-section">
        <h3>Additional Services We Provide</h3>
        <p>${contentParts.additional_services_intro || ''}</p>
        <ul class="additional-services">
            ${contentParts.additional_services || ''}
        </ul>
    </div>
    
    <div class="service-section">
        <h3>Our ${content.name} Process</h3>
        <p>${contentParts.process_intro || ''}</p>
        <ol class="process-steps">
            ${contentParts.process_steps || ''}
        </ol>
    </div>
    
    <div class="call-to-action">
        <p>${contentParts.cta_text || ''}</p>
        <p class="contact-info">Call us today at <strong>${businessData.phone}</strong> for a free consultation!</p>
    </div>
</div>`;

				return NextResponse.json({ 
					success: true, 
					content: template 
				});
			} catch (parseError) {
				console.error('Failed to parse service content JSON:', parseError);
				// Fallback to raw content if JSON parsing fails
				return NextResponse.json({ 
					success: true, 
					content: generatedContent 
				});
			}
		}

		// For about page content, process the JSON and insert into template
		if (type === 'about_page') {
			try {
				const contentParts = JSON.parse(generatedContent);
				const template = `
<div class="about-content" style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
    <div class="about-who-we-are" style="margin-bottom: 3rem;">
        <p class="tagline" style="color: #4ecdc4; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">${contentParts.who_we_are_tagline || ''}</p>
        <h2 style="font-size: 2rem; font-weight: 600; color: #2c3e50; margin: 0.5rem 0 1rem 0;">${contentParts.who_we_are_title || ''}</h2>
        <div style="margin-bottom: 1.5rem;">${contentParts.who_we_are_description || ''}</div>
    </div>
    
    <div class="about-mission-section" style="margin-bottom: 2.5rem;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #2c3e50; margin: 0 0 1rem 0; border-left: 4px solid #4ecdc4; padding-left: 1rem;">Our Mission</h3>
        <p style="margin: 0; line-height: 1.6; color: #34495e;">${contentParts.mission_statement || ''}</p>
    </div>
    
    <div class="about-values-section" style="margin-bottom: 2.5rem;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #2c3e50; margin: 0 0 1rem 0; border-left: 4px solid #4ecdc4; padding-left: 1rem;">Our Values</h3>
        <ul class="values-list" style="margin: 0; padding-left: 1.5rem;">
            ${contentParts.values_list || ''}
        </ul>
    </div>
    
    <div class="about-team-section" style="margin-bottom: 2.5rem;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #2c3e50; margin: 0 0 1rem 0; border-left: 4px solid #4ecdc4; padding-left: 1rem;">Our Team</h3>
        <p style="margin: 0; line-height: 1.6; color: #34495e;">${contentParts.team_description || ''}</p>
    </div>
    
    <div class="about-commitment-section" style="margin-bottom: 2.5rem;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #2c3e50; margin: 0 0 1rem 0; border-left: 4px solid #4ecdc4; padding-left: 1rem;">Our Commitment</h3>
        <p style="margin: 0 0 1rem 0; line-height: 1.6; color: #34495e;">${contentParts.commitment_statement || ''}</p>
        <ul class="commitment-points" style="margin: 0; padding-left: 1.5rem;">
            ${contentParts.commitment_points || ''}
        </ul>
    </div>
    
    <div class="about-cta-section" style="text-align: center; background: #f8f9fa; padding: 2rem; border-radius: 12px; border: 1px solid #e9ecef;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #2c3e50; margin: 0 0 1rem 0;">Ready to Get Started?</h3>
        <p style="margin: 0 0 1.5rem 0; line-height: 1.6; color: #34495e;">${contentParts.final_cta_text || ''}</p>
        <p class="contact-info" style="margin: 0; font-size: 1.1rem; color: #7f8c8d;">Call us today at <strong style="color: #2c3e50;">${businessData.phone}</strong> for a free consultation!</p>
    </div>
</div>`;

				return NextResponse.json({ 
					success: true, 
					content: template 
				});
			} catch (parseError) {
				console.error('Failed to parse about page content JSON:', parseError);
				// Fallback to raw content if JSON parsing fails
				return NextResponse.json({ 
					success: true, 
					content: generatedContent 
				});
			}
		}

		// For features content, process the JSON and return structured data
		if (type === 'features') {
			try {
				const contentParts = JSON.parse(generatedContent);
				return NextResponse.json({ 
					success: true, 
					content: contentParts.features || []
				});
			} catch (parseError) {
				console.error('Failed to parse features content JSON:', parseError);
				return NextResponse.json({ 
					success: true, 
					content: []
				});
			}
		}

		// For reviews content, process the JSON and return structured data
		if (type === 'reviews') {
			try {
				const contentParts = JSON.parse(generatedContent);
				return NextResponse.json({ 
					success: true, 
					content: contentParts.reviews || []
				});
			} catch (parseError) {
				console.error('Failed to parse reviews content JSON:', parseError);
				return NextResponse.json({ 
					success: true, 
					content: []
				});
			}
		}

		// For FAQ content, process the JSON and return structured data
		if (type === 'faq') {
			try {
				const contentParts = JSON.parse(generatedContent);
				return NextResponse.json({ 
					success: true, 
					content: contentParts.faqs || []
				});
			} catch (parseError) {
				console.error('Failed to parse FAQ content JSON:', parseError);
				return NextResponse.json({ 
					success: true, 
					content: []
				});
			}
		}

		return NextResponse.json({ 
			success: true, 
			content: generatedContent 
		});

	} catch (error: any) {
		console.error('AI Content Generation Error:', error);
		return NextResponse.json({ 
			error: error.message || 'Failed to generate content' 
		}, { status: 500 });
	}
}
