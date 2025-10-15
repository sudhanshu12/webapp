"use client";

import ConditionalLayout from '../components/conditional-layout';

export default function AboutPage() {
  return (
    <ConditionalLayout>
      <div className="bg-background text-text-primary overflow-x-hidden">
        {/* Hero Section */}
        <section className="py-16 px-8 bg-surface text-text-primary">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-gradient">Create A Website Click</span>
            </h1>
            <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto mb-12">
              Empowering businesses to build professional websites in 8 minutes, not months. 
              Our AI-powered platform makes web design accessible to everyone.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  5,000+
                </div>
                <div className="text-base text-text-secondary font-medium">
                  Websites Created
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  4.9/5
                </div>
                <div className="text-base text-text-secondary font-medium">
                  Customer Rating
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  8 Min
                </div>
                <div className="text-base text-text-secondary font-medium">
                  Average Build Time
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  99.9%
                </div>
                <div className="text-base text-text-secondary font-medium">
                  Uptime Guarantee
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 px-8 bg-background text-text-primary">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Our <span className="text-gradient">Story</span>
              </h2>
              <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto">
                Founded in 2024, Create A Website Click was born from a simple observation: 
                too many great businesses struggle with outdated, expensive, or overly complex 
                website solutions. We set out to change that.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 text-center hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-background font-bold text-xl mb-5 mx-auto">
                  🎯
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Our Mission
                </h3>
                <p className="text-text-secondary">
                  To democratize web design by making professional websites accessible to 
                  everyone, regardless of their technical background or budget.
                </p>
              </div>

              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 text-center hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-background font-bold text-xl mb-5 mx-auto">
                  👁️
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Our Vision
                </h3>
                <p className="text-text-secondary">
                  To become the go-to platform for business website creation, where anyone 
                  can build, launch, and manage a professional website in 8 minutes, not months.
                </p>
              </div>

              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 text-center hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-background font-bold text-xl mb-5 mx-auto">
                  💎
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Our Values
                </h3>
                <p className="text-text-secondary">
                  We value simplicity, accessibility, and empowerment. Every feature we build 
                  is designed to make web design more accessible and enjoyable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-8 bg-surface text-text-primary">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                How It <span className="text-gradient">Works</span>
              </h2>
              <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto">
                Building a professional website has never been easier. Our AI-powered platform 
                handles the complex technical work so you can focus on your business.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background border border-text-muted/20 rounded-lg p-8 text-center relative">
                <div className="absolute -top-2 -right-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-background font-bold text-sm">
                  1
                </div>
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-background font-bold text-xl mb-5 mx-auto">
                  📝
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Answer Questions
                </h3>
                <p className="text-text-secondary">
                  Tell us about your business, services, and preferences through our simple wizard
                </p>
              </div>

              <div className="bg-background border border-text-muted/20 rounded-lg p-8 text-center relative">
                <div className="absolute -top-2 -right-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-background font-bold text-sm">
                  2
                </div>
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-background font-bold text-xl mb-5 mx-auto">
                  🤖
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  AI Creates Content
                </h3>
                <p className="text-text-secondary">
                  Our AI generates professional content, images, and layouts tailored to your business
                </p>
              </div>

              <div className="bg-background border border-text-muted/20 rounded-lg p-8 text-center relative">
                <div className="absolute -top-2 -right-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-background font-bold text-sm">
                  3
                </div>
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-background font-bold text-xl mb-5 mx-auto">
                  🚀
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Launch Instantly
                </h3>
                <p className="text-text-secondary">
                  Your professional website is ready to go live in just 8 minutes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-8 bg-background text-text-primary">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Why Choose <span className="text-gradient">Us?</span>
              </h2>
              <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto">
                We're not just another website builder. We're a complete solution designed 
                specifically for businesses that want professional results without the complexity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 text-center hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-background font-bold text-xl mb-5 mx-auto">
                  ⚡
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Lightning Fast
                </h3>
                <p className="text-text-secondary">
                  Build and deploy your website in 8 minutes, not weeks
                </p>
              </div>

              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 text-center hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-background font-bold text-xl mb-5 mx-auto">
                  🎨
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Professional Design
                </h3>
                <p className="text-text-secondary">
                  AI-generated content that looks like it was created by professional designers
                </p>
              </div>

              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 text-center hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-background font-bold text-xl mb-5 mx-auto">
                  💰
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Cost Effective
                </h3>
                <p className="text-text-secondary">
                  Professional results at a fraction of traditional web development costs
                </p>
              </div>

              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 text-center hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-background font-bold text-xl mb-5 mx-auto">
                  🔧
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  No Technical Skills
                </h3>
                <p className="text-text-secondary">
                  Zero coding knowledge required. Our AI handles all the technical complexity
                </p>
              </div>

              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 text-center hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-background font-bold text-xl mb-5 mx-auto">
                  📱
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Mobile Optimized
                </h3>
                <p className="text-text-secondary">
                  Every website is automatically optimized for all devices and screen sizes
                </p>
              </div>

              <div className="bg-surface border border-text-muted/20 rounded-lg p-8 text-center hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-background font-bold text-xl mb-5 mx-auto">
                  🔒
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Secure & Reliable
                </h3>
                <p className="text-text-secondary">
                  Enterprise-grade security with 99.9% uptime guarantee and free SSL certificates
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-8 bg-surface text-text-primary">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Get <span className="text-gradient">Started?</span>
            </h2>
            <p className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto mb-12">
              Join thousands of businesses who have already transformed their online presence. 
              Start building your professional website today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="/register" 
                className="bg-accent text-background font-bold text-lg px-8 py-4 rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-glow"
              >
                Start Building Free
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </a>
              <a 
                href="/billing" 
                className="bg-transparent text-accent border-2 border-accent text-lg px-8 py-4 rounded-lg font-bold flex items-center gap-2 transition-all duration-300 hover:bg-accent/10"
              >
                View Pricing Plans
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </ConditionalLayout>
  );
}