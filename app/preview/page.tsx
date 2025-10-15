'use client';

import { useState } from 'react';

export default function ThemePreview() {
  const [businessData, setBusinessData] = useState({
    business_name: 'Matt\'s Landscaping',
    business_type: 'Landscaping',
    location: 'Lompoc, CA',
    phone: '(877) 358-8746',
    email: 'info@mattslandscapingca.com',
    hero_headline: 'Your Local Landscaping Serving Lompoc, CA',
    hero_subheadline: 'Contact Us Now To Get Going!',
    hero_description: 'Transform your yard with expert landscaping in Lompoc, CA—from lawn care to landscape maintenance, we make your space stunning.',
    about_desc: 'Welcome to Matt\'s Landscaping, your premier choice for professional landscaping services in Lompoc, CA. With years of experience, our skilled and passionate team is dedicated to transforming outdoor spaces with exceptional landscaping solutions.',
    experience_years: '15 Years of Experience',
    services: [
      { 
        title: 'Lawn Care', 
        description: 'Professional lawn care services in Lompoc, CA—mowing, edging, fertilization, weed control, and more.',
        link: '#lawn-care'
      },
      { 
        title: 'Yard Cleanup', 
        description: 'Seasonal & year-round yard cleanup services—remove leaves, debris, branches, and overgrowth.',
        link: '#yard-cleanup'
      },
      { 
        title: 'Sod Installation', 
        description: 'Expert sod installation for lush green lawn in no time. We prepare, install, and maintain sod.',
        link: '#sod-installation'
      }
    ],
    service_areas: [
      'Mission Hills',
      'Buellton', 
      'Orcutt',
      'Solvang',
      'Los Olivos',
      'Santa Ynez'
    ],
    features: [
      {
        icon: '📋',
        title: 'Thorough Site Inspection',
        description: 'Detailed inspection to ensure precise project execution.'
      },
      {
        icon: '🍃',
        title: 'Premium Quality Materials',
        description: 'Using pro-grade materials for lasting beauty and durability.'
      },
      {
        icon: '⚙️',
        title: 'Expert Craftsmanship',
        description: 'Skilled professionals delivering flawless landscaping results.'
      }
    ],
    reviews: [
      {
        name: 'Jessica R.',
        date: '21 May 2025',
        review: 'Matt\'s Landscaping completely transformed our backyard! The team was professional, efficient, and the results were beyond expectations.'
      },
      {
        name: 'Angela P.',
        date: '23 Feb 2025',
        review: 'Great experience overall! The lawn looks fantastic, and the crew was punctual. Just a small delay in finishing, but well worth the wait.'
      },
      {
        name: 'Sarah',
        date: '8 Jan 2025',
        review: 'Professional, friendly, and creative! They helped us choose the perfect plants for our yard and made everything look amazing.'
      }
    ],
    faqs: [
      {
        question: 'What landscaping services do you offer in Lompoc?',
        answer: 'We provide full-service landscaping including lawn care, sod installation, irrigation systems, and more.'
      },
      {
        question: 'When\'s the best time to start a landscaping project here?',
        answer: 'Spring and early fall are ideal, but we offer services year-round.'
      },
      {
        question: 'Do I really need a professional landscape design?',
        answer: 'Yes, professional designs ensure long-term sustainability, aesthetics, and functionality.'
      },
      {
        question: 'Why should I install an irrigation system in Lompoc?',
        answer: 'It saves water, keeps your lawn healthy, and reduces maintenance effort.'
      },
      {
        question: 'How do I choose the right landscaper in Lompoc?',
        answer: 'Look for experience, local knowledge, and customer reviews—like Matt\'s Landscaping!'
      }
    ]
  });

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      
      {/* Header */}
      <header className="bg-[#1e293b] border-b border-[#334155] min-h-16 flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-orange-500 rounded-sm transform rotate-45"></div>
          <span className="text-white font-bold text-lg">{businessData.business_name}</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-[#4ecdc4] uppercase text-sm font-medium">Home</a>
          <a href="#" className="text-white hover:text-[#4ecdc4] uppercase text-sm font-medium">Services</a>
          <a href="#" className="text-white hover:text-[#4ecdc4] uppercase text-sm font-medium">Service Locations</a>
          <a href="#" className="text-white hover:text-[#4ecdc4] uppercase text-sm font-medium">About</a>
          <a href="#" className="text-white hover:text-[#4ecdc4] uppercase text-sm font-medium">Contact Us</a>
        </nav>
        <a href={`tel:${businessData.phone}`} className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all text-sm">
          {businessData.phone}
        </a>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-gray-800">
              <h1 className="text-4xl font-bold mb-4">{businessData.hero_headline}</h1>
              <p className="text-lg mb-4">{businessData.hero_subheadline}</p>
              <p className="text-base mb-6 leading-relaxed">{businessData.hero_description}</p>
              <div className="flex gap-3 mb-4">
                <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all text-sm">
                  Book Online
                </button>
                <button className="border-2 border-orange-500 text-gray-800 bg-transparent px-6 py-3 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all text-sm">
                  Call {businessData.phone}
                </button>
              </div>
              <div className="flex items-center gap-2 text-orange-500 font-semibold text-sm">
                <span>⭐⭐⭐⭐⭐</span>
                <span>Rated 5 Stars On Google</span>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-[#1e293b] p-6 rounded-xl shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Get Your Free Quote</h3>
              <form className="space-y-3">
                <input type="text" placeholder="Name" className="w-full p-3 rounded-lg bg-[#334155] border border-[#475569] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm" />
                <input type="tel" placeholder="Phone Number" className="w-full p-3 rounded-lg bg-[#334155] border border-[#475569] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm" />
                <input type="email" placeholder="Email Address" className="w-full p-3 rounded-lg bg-[#334155] border border-[#475569] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm" />
                <textarea placeholder="How Can We Help You?" rows={3} className="w-full p-3 rounded-lg bg-[#334155] border border-[#475569] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"></textarea>
                <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all text-sm">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#1e293b] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {businessData.features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl text-[#4ecdc4] mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-[#1e293b] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-300 h-64 rounded-xl shadow-lg flex items-center justify-center">
              <span className="text-gray-600 text-base">Owner Photo</span>
            </div>
            <div>
              <div className="text-[#4ecdc4] font-semibold text-xs uppercase tracking-wide mb-2">WHO WE ARE</div>
              <h2 className="text-3xl font-bold text-white mb-4">About {businessData.business_name} Company</h2>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">{businessData.about_desc}</p>
              <div className="inline-block bg-gray-700 text-[#4ecdc4] px-4 py-3 rounded-lg mb-4 text-center">
                <span className="block text-xl font-bold">15</span>
                <span className="text-xs">Years of Experience</span>
              </div>
              <a href="/about-us" className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all text-sm inline-block">
                About Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-[#1e293b] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-[#4ecdc4] font-semibold text-xs uppercase tracking-wide mb-2">TOP RATED LANDSCAPING SERVICES</div>
            <h2 className="text-3xl font-bold text-white">Our Services</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {businessData.services.map((service, index) => (
              <div key={index} className="bg-[#334155] p-6 rounded-xl text-center hover:transform hover:-translate-y-1 transition-all">
                <div className="text-3xl text-[#4ecdc4] mb-4">✓</div>
                <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                <div className="font-semibold text-[#4ecdc4] mb-3 text-sm">{businessData.phone}</div>
                <a href={service.link} className="text-[#4ecdc4] font-semibold hover:text-white transition-colors text-sm">
                  See More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Locations Section */}
      <section className="bg-[#1e293b] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[#4ecdc4] font-semibold text-xs uppercase tracking-wide mb-2">OUR SERVICE AREA</div>
              <h2 className="text-3xl font-bold text-white mb-6">Proudly Serving {businessData.location} And The Surrounding Areas</h2>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {businessData.service_areas.map((area, index) => (
                  <div key={index} className="flex items-center gap-2 text-white font-medium text-sm">
                    <span className="text-[#4ecdc4] font-bold">✓</span>
                    {area}
                  </div>
                ))}
              </div>
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all text-sm">
                View All Service Locations
              </button>
            </div>
            <div className="bg-gray-300 h-64 rounded-xl shadow-lg flex items-center justify-center">
              <span className="text-gray-600 text-base">Google Maps</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-[#4ecdc4] font-semibold text-xs uppercase tracking-wide mb-2">WHAT PEOPLE SAY</div>
            <h2 className="text-3xl font-bold text-gray-800">Customer Reviews</h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-gray-600 text-sm">Google</span>
              <span className="text-gray-800 font-semibold text-sm">Excellent</span>
              <span className="text-gray-600 text-sm">5 reviews</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {businessData.reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-gray-400 text-xs">G</span>
                  <span className="font-semibold text-gray-800 text-sm">{review.name}</span>
                  <span className="text-gray-500 text-xs">{review.date}</span>
                </div>
                <div className="text-yellow-400 text-base mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-700 text-sm mb-3">"{review.review}"</p>
                <a href="#" className="text-[#4ecdc4] font-semibold hover:underline text-sm">Read more</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#1e293b] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-300 h-64 rounded-xl shadow-lg flex items-center justify-center">
              <span className="text-gray-600 text-base">Worker Photo</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-300 text-sm mb-6">Get answers to common questions about our landscaping services in Lompoc, CA.</p>
              <div className="space-y-3">
                {businessData.faqs.map((faq, index) => (
                  <details key={index} className="bg-[#334155] p-3 rounded-lg">
                    <summary className="font-semibold text-white cursor-pointer hover:text-[#4ecdc4] flex justify-between items-center text-sm">
                      {faq.question}
                      <span className="text-[#4ecdc4] text-lg">+</span>
                    </summary>
                    <p className="text-gray-300 mt-2 text-sm">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="bg-[#1e293b] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[#4ecdc4] font-semibold text-xs uppercase tracking-wide mb-2 flex items-center gap-2">
                <span>❤️</span> OUR COMMITMENT
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Promise Of Reliability</h2>
              <p className="text-gray-300 text-sm leading-relaxed">At {businessData.business_name} in {businessData.location}, we are dedicated to delivering top-quality landscaping services with precision, creativity, and care. From lawn maintenance to complete outdoor transformations, our promise is to exceed expectations while ensuring your outdoor space thrives.</p>
            </div>
            <div className="bg-gray-300 h-64 rounded-xl shadow-lg flex items-center justify-center">
              <span className="text-gray-600 text-base">Team Photo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e293b] py-12 border-t border-[#334155]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-orange-500 rounded-sm transform rotate-45"></div>
                <span className="text-white font-bold text-lg">{businessData.business_name}</span>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">NAVIGATION</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Home</a></li>
                <li><a href="/about-us" className="text-gray-300 hover:text-white text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">SERVICES</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Our Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">CONTACT</h4>
              <p className="text-gray-300 mb-1 text-sm">{businessData.email}</p>
              <p className="text-gray-300 text-sm">{businessData.phone}</p>
            </div>
          </div>
          <div className="text-center pt-6 border-t border-[#334155]">
            <p className="text-gray-400 text-sm">
              © 2024 {businessData.business_name.toLowerCase().replace(/\s+/g, '')}.com. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Generate Theme Button */}
      <div className="fixed bottom-6 right-6">
        <button 
          onClick={() => alert('Theme generation will be implemented here!')}
          className="bg-[#4ecdc4] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#3db8b0] transition-colors text-sm"
        >
          Generate This Theme
        </button>
      </div>
    </div>
  );
}

