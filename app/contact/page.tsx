"use client";

import { useState, useEffect } from 'react';
import ConditionalLayout from '../components/conditional-layout';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Set page metadata
  useEffect(() => {
    document.title = 'Contact Us - Get Support & Help | Create A Website Click';
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDesc) {
      metaDesc = document.createElement('meta') as HTMLMetaElement;
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Contact our support team for help with your website builder. Get assistance with your business website, technical support, and account questions.';
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta') as HTMLMetaElement;
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'contact us, support, help, website builder support, business website help, customer service';
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ConditionalLayout>
      <div className="bg-background text-text-primary overflow-x-hidden">
        {/* Hero Section */}
        <section className="py-16 px-8 bg-surface text-text-primary">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact <span className="text-gradient">Us</span>
            </h1>
            <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto">
              We're here to help! Get in touch with our team for support, questions, or feedback
            </p>
          </div>
        </section>

        {/* Contact Methods Section */}
        <section className="py-16 px-8 bg-background text-text-primary">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Get in <span className="text-gradient">Touch</span>
              </h2>
              <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto">
                Choose the best way to reach us
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 text-center hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-background font-bold text-xl mb-5 mx-auto">
                  📧
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Email Support
                </h3>
                <p className="text-text-secondary mb-6">
                  Get detailed help with your questions
                </p>
                <a 
                  href="mailto:support@createawebsite.click"
                  className="text-accent hover:text-accent-400 transition-colors font-semibold"
                >
                  support@createawebsite.click
                </a>
              </div>

              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 text-center hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-background font-bold text-xl mb-5 mx-auto">
                  💬
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Live Chat
                </h3>
                <p className="text-text-secondary mb-6">
                  Chat with our support team in real-time
                </p>
                <div className="bg-accent text-background px-4 py-2 rounded-lg font-semibold inline-block">
                  Available 24/7
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 px-8 bg-surface text-text-primary">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Send us a <span className="text-gradient">Message</span>
              </h2>
              <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>

            <div className="bg-background border border-text-muted/20 rounded-lg p-8 shadow-card">
              {submitStatus === 'success' && (
                <div className="bg-accent/10 border border-accent/20 text-accent px-4 py-3 rounded-lg mb-6 text-center font-semibold">
                  ✅ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-center font-semibold">
                  ❌ Something went wrong. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-text-primary mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-surface border border-text-muted/20 rounded-lg text-text-primary placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-surface border border-text-muted/20 rounded-lg text-text-primary placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-text-primary mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-surface border border-text-muted/20 rounded-lg text-text-primary focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feature">Feature Request</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-text-primary mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-surface border border-text-muted/20 rounded-lg text-text-primary placeholder-text-muted focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-accent text-background font-bold text-lg px-8 py-4 rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-glow mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-8 bg-background text-text-primary">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
              <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto">
                Find answers to common questions about our platform
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 hover:shadow-card transition-all duration-300">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  How long does it take to build a website?
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Our AI-powered platform can create a complete professional website in just 8 minutes. 
                  The entire process from answering questions to having a live website is incredibly fast.
                </p>
              </div>

              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 hover:shadow-card transition-all duration-300">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Do I need any technical skills?
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Not at all! Our platform is designed for complete beginners. You just need to answer 
                  some simple questions about your business, and our AI handles all the technical work.
                </p>
              </div>

              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 hover:shadow-card transition-all duration-300">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Can I customize my website after it's created?
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Yes! While our AI creates a complete website for you, you can always make changes, 
                  add content, or modify the design to better suit your needs.
                </p>
              </div>

              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 hover:shadow-card transition-all duration-300">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  What if I need help or support?
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  We offer comprehensive support through email and live chat. Our team is available 
                  24/7 to help you with any questions or issues you might have.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ConditionalLayout>
  );
}