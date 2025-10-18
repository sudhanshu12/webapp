
"use client";

import { useState, useEffect } from 'react';
import ConditionalLayout from './components/conditional-layout';

export default function Home() {
  // Test auto-deployment from GitHub - should trigger new main deployment
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [metaData, setMetaData] = useState({
    title: 'Create A Website Click',
    description: 'Launch AI‑written, SEO‑ready business sites in minutes.'
  });
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [statsVisible, setStatsVisible] = useState(false);
  const [counters, setCounters] = useState({ websites: 0, rating: 0, time: 0, uptime: 0 });

  // Load meta data from wizard form
  useEffect(() => {
    const updateMetaData = () => {
      try {
        const wizardData = localStorage.getItem('wizardFormData');
        if (wizardData) {
          const formData = JSON.parse(wizardData);
          if (formData.homepage_meta_title || formData.homepage_meta_description) {
            const newMetaData = {
              title: formData.homepage_meta_title || 'Create A Website Click',
              description: formData.homepage_meta_description || 'Launch AI‑written, SEO‑ready business sites in minutes.'
            };
            
            setMetaData(newMetaData);
            
            // Update document title and meta description
            document.title = newMetaData.title;
            
            // Update meta description
            let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
            if (!metaDesc) {
              metaDesc = document.createElement('meta') as HTMLMetaElement;
              metaDesc.name = 'description';
              document.head.appendChild(metaDesc);
            }
            metaDesc.content = newMetaData.description;
            
            // Update meta keywords if available
            if (formData.homepage_meta_keywords) {
              let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
              if (!metaKeywords) {
                metaKeywords = document.createElement('meta') as HTMLMetaElement;
                metaKeywords.name = 'keywords';
                document.head.appendChild(metaKeywords);
              }
              metaKeywords.content = formData.homepage_meta_keywords;
            }
          }
        }
      } catch (error) {
        console.error('Error loading meta data from wizard:', error);
      }
    };

    // Initial load
    updateMetaData();

    // Listen for storage changes (when wizard data is updated)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'wizardFormData') {
        updateMetaData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Counter animation effect
  useEffect(() => {
    console.log('Counter effect triggered, statsVisible:', statsVisible);
    if (!statsVisible) return;

    console.log('Starting counter animation!');
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const targets = { websites: 5000, rating: 4.9, time: 8, uptime: 99.9 };
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setCounters({
        websites: Math.floor(targets.websites * easeOut),
        rating: parseFloat((targets.rating * easeOut).toFixed(1)),
        time: Math.floor(targets.time * easeOut),
        uptime: parseFloat((targets.uptime * easeOut).toFixed(1))
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets); // Ensure final values are exact
        console.log('Counter animation complete!');
      }
    }, interval);

    return () => clearInterval(timer);
  }, [statsVisible]);

  // Intersection Observer for stats visibility
  useEffect(() => {
    console.log('Setting up IntersectionObserver for stats counter');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Stats section intersecting:', entry.isIntersecting);
          if (entry.isIntersecting) {
            console.log('Triggering counter animation!');
            setStatsVisible(true);
            // Disconnect after triggering to avoid re-triggering
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    // Wait for DOM to be ready
    setTimeout(() => {
      const statsSection = document.getElementById('stats-section');
      console.log('Stats section found:', !!statsSection);
      if (statsSection) {
        observer.observe(statsSection);
      }
    }, 100);

    return () => observer.disconnect();
  }, []); // Empty dependency array - only run once on mount

  // Scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setVisibleSections(prev => new Set(Array.from(prev).concat(sectionId)));
          }
        }
      });
    }, observerOptions);

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('[data-section]');
      sections.forEach(section => observer.observe(section));
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <ConditionalLayout>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3); }
          50% { box-shadow: 0 0 40px rgba(6, 182, 212, 0.6), 0 0 60px rgba(147, 51, 234, 0.3); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.8s ease-out forwards;
        }
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        .scroll-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        /* Ensure sections are visible by default if no animation is applied */
        .section-content {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <div className="bg-background text-text-primary overflow-x-hidden">
        {/* Hero Section */}
        <section className="gradient-bg text-white py-20 px-4 text-center min-h-screen flex flex-col justify-center items-center relative overflow-hidden" data-section="hero">
          <div className="absolute inset-0 opacity-50" style={{
            background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
          
          <div className="max-w-4xl mx-auto w-full relative z-10">
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight mx-auto text-center scroll-animate ${visibleSections.has('hero') ? 'visible' : ''}`}>
              Build Professional<br />
              <span style={{
                background: 'linear-gradient(90deg, #06b6d4 0%, #10b981 50%, #22d3ee 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '1.15em',
                fontWeight: '900',
                display: 'inline-block',
                letterSpacing: '-0.02em',
                filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.6)) drop-shadow(0 0 60px rgba(16, 185, 129, 0.4))'
              }}>Business Websites</span><br />
              in Minutes, Not Months
            </h1>

            <p className={`text-lg md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed text-center scroll-animate ${visibleSections.has('hero') ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
              Create stunning, professional websites with AI in under 10 minutes. No coding, no design skills, no expensive developers required. Updated for deployment.
            </p>

            {/* Trust Bar */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm opacity-90">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>5000+ Websites Created</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
                <span>Avg. 8 Min Launch Time</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center items-center mb-16 relative z-20">
              <a 
                href="/register" 
                className="bg-accent text-background font-bold text-lg px-8 py-4 rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-glow relative z-10 cursor-pointer"
                onClick={(e) => {
                  console.log('Start Building Free clicked!');
                  e.preventDefault();
                  window.location.href = '/register';
                }}
              >
                Start Building Free
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </a>
              <a 
                href="#video-demo" 
                className="bg-transparent text-white border-2 border-white text-lg px-8 py-4 rounded-lg font-bold flex items-center gap-2 transition-all duration-300 hover:bg-white/10 relative z-10 cursor-pointer"
                onClick={(e) => {
                  console.log('Watch 60-Second Demo clicked!');
                  e.preventDefault();
                  document.getElementById('video-demo')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                </svg>
                Watch 60-Second Demo
              </a>
            </div>
          </div>
        </section>

        {/* Problem Statement Section */}
        <section className="py-16 px-8 bg-surface text-text-primary" data-section="problem">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-6xl font-bold mb-6 scroll-animate ${visibleSections.has('problem') ? 'visible' : ''}`}>
                Traditional Website Development is <span className="text-gradient">Outdated</span>
              </h2>
              <p className={`text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto scroll-animate ${visibleSections.has('problem') ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
                Small businesses waste months and thousands of dollars on websites that should take minutes to create.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              {/* Traditional Way */}
              <div className="bg-surface border border-error/20 rounded-lg p-8 h-full flex flex-col">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-error rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-error">The Old Way</h3>
                </div>
                <ul className="space-y-4 flex-grow">
                  {[
                    { text: '6-12 weeks development time', strong: '6-12 weeks' },
                    { text: '$5,000-$15,000 upfront costs', strong: '$5,000-$15,000' },
                    { text: 'Requires technical knowledge' },
                    { text: 'Endless revisions and delays' },
                    { text: 'Ongoing maintenance headaches' }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-error mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                      <span>
                        <strong>{item.strong}</strong> {item.text.replace(item.strong, '')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Way */}
              <div className="bg-surface border border-accent/50 rounded-lg p-8 h-full flex flex-col relative">
                <div className="absolute -top-3 -right-3 bg-accent text-background px-3 py-1 rounded-full text-sm font-semibold">
                  NEW
                </div>
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-background" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-accent">The Create A Website Click Way</h3>
                </div>
                <ul className="space-y-4 flex-grow">
                  {[
                    { text: '8 minutes average creation time', strong: '8 minutes' },
                    { text: '$49/month all-inclusive', strong: '$49/month' },
                    { text: 'Zero technical skills required' },
                    { text: 'Instant previews and publishing' },
                    { text: 'Automatic updates and maintenance' }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span>
                        <strong>{item.strong}</strong> {item.text.replace(item.strong, '')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="process" className="py-16 px-8 bg-surface text-text-primary">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                How It Works: <span className="text-gradient">3 Simple Steps</span>
              </h2>
              <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto">
                From idea to live website in minutes. No technical knowledge required.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '📝',
                  title: 'Choose Template',
                  description: 'Select template from the available templates. Or let the AI recommend the perfect design for your business type.'
                },
                {
                  icon: '🤖',
                  title: 'Add Business Details',
                  description: 'Tell us about your business and AI will generate professional content, images, and optimize everything for SEO.'
                },
                {
                  icon: '🚀',
                  title: 'Launch Instantly',
                  description: 'Preview, customize if needed, and publish your professional website with one click. Your site goes live immediately.'
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center text-3xl mx-auto mb-6 relative">
                    {step.icon}
                    <div className="absolute -top-2 -right-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-background font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Watch It In Action Section */}
        <section id="video-demo" className="py-16 px-8 bg-background text-text-primary">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                See The <span className="text-gradient">Magic</span> Happen
            </h2>
              <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto">
                Watch our AI transform your business idea into a stunning, professional website in minutes, not hours.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Side - Features */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-background" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-xl font-semibold text-text-primary">Lightning fast</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-background" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                    </svg>
              </div>
                  <span className="text-xl font-semibold text-text-primary">Zero coding required</span>
                </div>
              </div>

              {/* Right Side - Video Player Mockup */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  {/* Video Header */}
                  <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-white text-sm font-medium">Create A Website Click Demo: Generate co...</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-gray-400 text-xs">Watch Later</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3 3 0 000-2.319l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
                        </svg>
                        <span className="text-gray-400 text-xs">Share</span>
                      </div>
                    </div>
                  </div>

                  {/* Video Content */}
                  <div className="bg-white">
                    {/* Video Embed */}
                    <div className="relative w-full h-64 bg-black rounded-t-lg overflow-hidden">
                      <iframe 
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE?autoplay=0&rel=0&modestbranding=1"
                        title="Create A Website Click Demo - Watch It In Action"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    
                    {/* Video Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Launch SEO WordPress Sites in 5 Minutes
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Turn a brief intake form into a professionally designed WordPress site, complete with text, images, and SEO pages.
                      </p>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mb-3">
                        <button className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors">
                          Go to Dashboard
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                          </svg>
                        </button>
                        <a 
                          href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                          Watch on YouTube
                        </a>
                      </div>

                      {/* Footer Text */}
                      <div className="text-center">
                        <p className="text-gray-500 text-xs">
                          No credit card required • 5000+ sites generated
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Everything You Need Section */}
        <section className="py-20 px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-text-primary relative overflow-hidden" data-section="features">
          {/* Enhanced futuristic background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-transparent to-purple-500/8"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full blur-2xl animate-ping delay-500"></div>
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, cyan 1px, transparent 1px), radial-gradient(circle at 75% 75%, purple 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              animation: 'float 20s ease-in-out infinite'
            }}></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-purple-100 bg-clip-text text-transparent scroll-animate ${visibleSections.has('features') ? 'visible' : ''}`}>
                Everything You Need to <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Succeed Online</span>
              </h2>
              <p className={`text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto scroll-animate ${visibleSections.has('features') ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
                Professional features that would cost thousands with traditional development, included in every plan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ),
                  title: 'AI-Powered Templates',
                  description: '50+ industry-specific templates that adapt to your business automatically with AI-generated content and images.',
                  metric: 'Quality Score: 98%'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  ),
                  title: 'Instant Publishing',
                  description: 'One-click publishing to premium hosting with SSL, CDN, and 99.9% uptime guarantee. Your site goes live instantly.',
                  metric: '99.9% Uptime'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                  ),
                  title: 'SEO Analytics Built-in',
                  description: 'Advanced SEO optimization and analytics dashboard to track visitors, conversions, and search rankings.',
                  metric: 'Google Analytics Integration'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 010-2h4z" clipRule="evenodd"/>
                    </svg>
                  ),
                  title: 'Mobile-Responsive Design',
                  description: 'Every website automatically adapts to all devices. Perfect mobile experience without extra work.',
                  metric: '100% Mobile Optimized'
                },
              ].map((feature, index) => (
                <div key={index} className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-slate-600/30 hover:border-cyan-400/60 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/25 p-8 cursor-pointer scroll-animate flex flex-col h-full ${visibleSections.has('features') ? 'visible' : ''}`} style={{ transitionDelay: `${0.3 + (index * 0.1)}s` }}>
                  {/* Animated mesh gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-transparent to-purple-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400/40 rounded-full animate-ping"></div>
                    <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400/60 rounded-full animate-pulse delay-300"></div>
                    <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-cyan-300/50 rounded-full animate-bounce delay-700"></div>
                  </div>
                  
                  {/* Enhanced glowing border effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg"></div>
                  <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60"></div>
                  
                  {/* Premium icon with enhanced effects */}
                  <div className="relative z-20 w-20 h-20 bg-gradient-to-br from-cyan-400 via-cyan-500 to-purple-600 rounded-3xl flex items-center justify-center text-white mb-8 shadow-2xl shadow-cyan-400/30 group-hover:shadow-cyan-400/50 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3">
                    {/* Icon glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-purple-500/30 rounded-3xl blur-md group-hover:blur-lg transition-all duration-500"></div>
                    {/* Icon inner glow */}
                    <div className="absolute inset-2 bg-gradient-to-br from-cyan-300/20 to-purple-400/20 rounded-2xl blur-sm"></div>
                    <div className="relative z-10 transform group-hover:rotate-12 transition-transform duration-500 scale-110">
                      {feature.icon}
                    </div>
                    {/* Floating sparkle effect */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-200"></div>
                  </div>
                  
                  {/* Enhanced title with better typography */}
                  <h3 className="relative z-20 text-2xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-50 to-purple-50 bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:via-cyan-300 group-hover:to-purple-300 transition-all duration-500 leading-tight">
                    {feature.title}
                  </h3>
                  
                  {/* Enhanced description with better spacing */}
                  <p className="relative z-20 text-slate-300 mb-8 leading-relaxed text-base group-hover:text-slate-100 transition-colors duration-500 font-medium flex-grow">
                    {feature.description}
                  </p>
                  
                  {/* Premium metric badge with enhanced styling */}
                  <div className="relative z-20 inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500/15 via-purple-500/10 to-cyan-500/15 border border-cyan-400/40 text-cyan-200 font-bold text-sm group-hover:border-cyan-400/60 group-hover:text-cyan-100 group-hover:bg-gradient-to-r group-hover:from-cyan-500/20 group-hover:via-purple-500/15 group-hover:to-cyan-500/20 transition-all duration-500 shadow-lg shadow-cyan-400/10 group-hover:shadow-cyan-400/20 mt-auto">
                    {/* Animated status indicator */}
                    <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-full mr-3 animate-pulse shadow-sm shadow-cyan-400/50"></div>
                    <span className="tracking-wide">{feature.metric}</span>
                    {/* Success checkmark on hover */}
                    <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-4 h-4 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Enhanced hover overlay with better gradients */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/8 group-hover:via-cyan-400/5 group-hover:to-purple-500/8 transition-all duration-700 rounded-3xl"></div>
                  
                  {/* Corner accent lines */}
                  <div className="absolute top-0 left-0 w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 right-0 w-16 h-0.5 bg-gradient-to-l from-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-0.5 bg-gradient-to-l from-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Testimonials Section */}
        <section className="py-16 px-8 bg-surface text-text-primary">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                What Our Customers <span className="text-gradient">Say</span>
              </h2>
              <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto">
                Join thousands of businesses that have transformed their online presence with Create A Website Click.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Sarah Johnson',
                  title: 'CEO, TechStart Inc.',
                  quote: 'Create A Website Click saved us months of development time. Our website went from idea to launch in just 8 minutes!',
                  rating: 5
                },
                {
                  name: 'Michael Chen',
                  title: 'Restaurant Owner',
                  quote: 'The AI understood our brand perfectly. The website it created is exactly what we needed.',
                  rating: 5
                },
                {
                  name: 'Emily Rodriguez',
                  title: 'Law Firm Partner',
                  quote: 'Professional, elegant, and exactly what our clients expect. Couldn\'t be happier with the result.',
                  rating: 5
                },
                {
                  name: 'David Thompson',
                  title: 'E-commerce Entrepreneur',
                  quote: 'From concept to live store in minutes. The AI handled everything - design, content, SEO. Amazing!',
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className="card border border-secondary/20 text-left">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary mb-1">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {testimonial.title}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-accent mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-text-secondary leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section - Updated */}
        <section id="stats-section" className="py-16 px-8 bg-background text-text-primary">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {counters.websites.toLocaleString()}+
                </div>
                <div className="text-base text-text-secondary font-medium">
                  Websites Created
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {counters.rating}/5
                </div>
                <div className="text-base text-text-secondary font-medium">
                  Customer Satisfaction
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {counters.time} Min
                </div>
                <div className="text-base text-text-secondary font-medium">
                  Average Setup Time
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {counters.uptime}%
                </div>
                <div className="text-base text-text-secondary font-medium">
                  Uptime Guarantee
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 px-8 bg-surface text-text-primary">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Simple, Transparent <span className="text-gradient">Pricing</span>
              </h2>
              <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto">
                Pay only for what you use. Credits never expire and can be used anytime.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: 'Free Trial',
                  price: 'Free',
                  period: '1 Credit',
                  description: 'Try our AI website builder',
                  features: [
                    '1 Website Creation',
                    'AI Website Generation',
                    'Basic Templates',
                    'Mobile Responsive',
                    'Basic SEO'
                  ],
                  button: 'Start Free',
                  popular: false
                },
                {
                  name: 'Starter Pack',
                  price: '$49',
                  period: '5 Credits',
                  description: 'Perfect for small projects',
                  features: [
                    '5 Website Creations',
                    'Advanced AI Features',
                    'Premium Templates',
                    'Advanced SEO',
                    'Analytics Dashboard',
                    'Email Support'
                  ],
                  button: 'Buy Credits',
                  popular: true
                },
                {
                  name: 'Pro Pack',
                  price: '$129',
                  period: '30 Credits',
                  description: 'Best for agencies & businesses',
                  features: [
                    '30 Website Creations',
                    'All AI Features',
                    'Custom Templates',
                    'Advanced Analytics',
                    'Priority Support',
                    'White Label Options'
                  ],
                  button: 'Buy Credits',
                  popular: false
                }
              ].map((plan, index) => (
                <div key={index} className={`card text-center relative ${plan.popular ? 'border-2 border-accent' : 'border border-secondary/20'}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-background px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-semibold mb-2 text-text-primary">
                    {plan.name}
                  </h3>
                  
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-text-primary">
                      {plan.price}
                    </span>
                    <span className="text-lg text-text-secondary">
                      {plan.period}
                    </span>
                  </div>
                  
                  <p className="text-text-secondary mb-8">
                    {plan.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8 text-left">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <svg className="w-5 h-5 text-accent mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-text-primary">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href={plan.button === 'Contact Sales' ? '#' : '/register'} 
                     className={`${plan.popular ? 'btn-accent' : 'btn-primary'} w-full text-center block py-4 text-base font-semibold`}>
                    {plan.button}
                  </a>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
                </div>
              </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-8 bg-background text-text-primary" data-section="faq">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-6xl font-bold mb-6 scroll-animate ${visibleSections.has('faq') ? 'visible' : ''}`}>
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
              <p className={`text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto scroll-animate ${visibleSections.has('faq') ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
                Everything you need to know about Create A Website Click and our website creation process.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {[
                {
                  question: 'How long does it take to create a website?',
                  answer: 'On average, our AI creates a complete professional website in just 8 minutes. The entire process from start to finish typically takes less than 10 minutes.'
                },
                {
                  question: 'Do I need any technical skills?',
                  answer: 'Not at all! Create A Website Click is designed for complete beginners. Our AI handles all the technical aspects while you focus on your business details.'
                },
                {
                  question: 'Can I customize my website after creation?',
                  answer: 'Yes! You can easily customize colors, fonts, content, and layout using our intuitive drag-and-drop editor. No coding required.'
                },
                {
                  question: 'Is my website mobile-responsive?',
                  answer: 'Absolutely! All websites created with Create A Website Click are automatically mobile-responsive and look perfect on all devices.'
                },
                {
                  question: 'What about SEO and search engine optimization?',
                  answer: 'Every website includes built-in SEO optimization. Our AI automatically optimizes your content, meta tags, and structure for better search rankings.'
                }
              ].map((faq, index) => (
                <div key={index} className="bg-surface border border-secondary/20 rounded-lg mb-3 cursor-pointer transition-all duration-300 hover:border-accent/30" onClick={() => toggleFAQ(index)}>
                  <div className="p-4 flex items-center justify-between">
                    <h3 className="text-base font-semibold text-text-primary">
                      {faq.question}
                    </h3>
                    <svg 
                      className={`w-5 h-5 text-text-secondary transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : 'rotate-0'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div className={`px-4 pb-4 text-text-secondary leading-relaxed text-sm transition-all duration-300 overflow-hidden ${
                    openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    {faq.answer}
              </div>
              </div>
              ))}
            </div>
          </div>
        </section>

        {/* Facebook Community Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 text-center" data-section="community">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 text-gray-800 scroll-animate ${visibleSections.has('community') ? 'visible' : ''}`}>
              Join Our <span className="text-blue-600">Facebook Community</span>
            </h2>
            <p className={`text-lg md:text-xl mb-8 text-gray-600 max-w-2xl mx-auto scroll-animate ${visibleSections.has('community') ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
              Connect with fellow entrepreneurs and get exclusive tips on website automation
            </p>
            
            {/* Big Join Button */}
            <a 
              href="https://facebook.com/groups/create-a-website-click-community" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Join Facebook Community
            </a>
            
            {/* Join for free line */}
            <p className="text-sm mt-6 text-gray-500">
              Join for free for future updates on Automation
            </p>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 px-4 gradient-bg text-white text-center" data-section="cta">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl md:text-6xl font-bold mb-6 scroll-animate ${visibleSections.has('cta') ? 'visible' : ''}`}>
              Start Building Your Website in Minutes
            </h2>
            <p className={`text-lg md:text-2xl mb-8 opacity-90 scroll-animate ${visibleSections.has('cta') ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
              Join thousands of businesses that have transformed their online presence with Create A Website Click.
            </p>
            <a href="/register" className="btn-accent text-lg px-8 py-4 inline-flex items-center gap-2">
              Start Your Free Trial
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </a>
            <p className="text-sm mt-4 opacity-80">
              No credit card required. Cancel anytime.
            </p>
          </div>
        </section>
      </div>
    </ConditionalLayout>
  );
} 