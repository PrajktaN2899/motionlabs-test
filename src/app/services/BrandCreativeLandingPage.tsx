'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon, Sparkles, Palette, Video, MonitorPlay, PenTool, Layout, BookOpen, MonitorSmartphone, ArrowRight, ChevronDown, ChevronUp, CheckCircle, Lightbulb, ArrowUpRight, Target } from 'lucide-react';

// Scroll Reveal Animation Component
function Reveal({ children, delay = 0, className = "", direction = "up" }: { children: React.ReactNode, delay?: number, className?: string, direction?: "up" | "down" | "left" | "right" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  const baseClasses = `transition-all duration-1000 ease-out ${className}`;
  
  let transformHidden = "translate-y-12";
  if (direction === "left") transformHidden = "-translate-x-12";
  if (direction === "right") transformHidden = "translate-x-12";
  
  const visibilityClasses = isVisible 
    ? "opacity-100 translate-y-0 translate-x-0" 
    : `opacity-0 ${transformHidden}`;

  return (
    <div
      ref={ref}
      className={`${baseClasses} ${visibilityClasses}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const includedServices = [
  { category: "Strategy", title: "Brand Strategy", desc: "Defining how a business is positioned and differentiated in the market — the foundation everything else builds on.", icon: <Target className="w-6 h-6 text-[#7B61FF]" /> },
  { category: "Design", title: "Brand Identity", desc: "Logo, color palette, typography, tone of voice, and visual guidelines that keep a business consistent everywhere it shows up.", icon: <Palette className="w-6 h-6 text-[#FF00A0]" /> },
  { category: "Strategy", title: "Product Storytelling", desc: "Shaping how a product's value is communicated clearly and consistently across every touchpoint.", icon: <PenTool className="w-6 h-6 text-[#7B61FF]" /> },
  { category: "Video", title: "Corporate Videos", desc: "Company-level video content — culture, mission, or overview videos used for recruiting, investors, or brand awareness.", icon: <Video className="w-6 h-6 text-[#FF00A0]" /> },
  { category: "Video", title: "Product Demo Videos", desc: "Videos that show a product in action, helping prospects understand its value without a live walkthrough.", icon: <MonitorPlay className="w-6 h-6 text-[#7B61FF]" /> },
  { category: "Video", title: "Explainer Videos", desc: "Short, focused videos that break down a concept, product, or process for a first-time viewer.", icon: <Lightbulb className="w-6 h-6 text-[#FF00A0]" /> },
  { category: "Video", title: "Educational & Training Videos", desc: "Content built to onboard new users or customers, reducing support load and improving adoption.", icon: <BookOpen className="w-6 h-6 text-[#7B61FF]" /> },
  { category: "Design", title: "Creative Content", desc: "Ongoing design and content assets — social, campaign, and marketing materials — built on the brand system.", icon: <ImageIcon className="w-6 h-6 text-[#FF00A0]" /> },
  { category: "Design", title: "Digital Experiences", desc: "Interactive or experiential digital content that brings the brand to life beyond a standard webpage.", icon: <MonitorSmartphone className="w-6 h-6 text-[#7B61FF]" /> }
];

const howWeWorkSteps = [
  { title: "Define the Strategy", desc: "We clarify how you're positioned, who you're speaking to, and what should make you memorable and credible in your market." },
  { title: "Build the Identity", desc: "We design the visual system — logo, color, typography, tone of voice — and the guidelines that keep it consistent." },
  { title: "Produce the Content", desc: "We create the videos, demos, and creative assets that bring the brand to life across your website, product, and marketing." },
  { title: "Apply It Everywhere", desc: "We help translate the brand system into your actual product UI and marketing pages, not just a style guide that sits unused." }
];

const faqs = [
  { q: "What's included in brand identity work?", a: "Brand identity typically includes logo, color palette, typography, tone of voice, and visual guidelines that keep a company's presence consistent across the website, product, and marketing materials." },
  { q: "What's the difference between brand strategy and brand identity?", a: "Brand strategy defines how a business is positioned and differentiated in the market; brand identity is the visual and verbal system — logo, colors, typography, tone of voice — that expresses that strategy consistently." },
  { q: "Why do B2B and SaaS companies need product demo videos?", a: "Demo videos let prospects and new users understand a product's value in minutes rather than requiring a live walkthrough, shortening the sales cycle and improving onboarding." },
  { q: "What's the difference between a demo video and an explainer video?", a: "A demo video shows a specific product in action; an explainer video breaks down a broader concept, problem, or process, often before introducing the product itself." },
  { q: "How does brand work connect to conversion rate optimization?", a: "A clear, consistent brand builds the trust that reduces hesitation at the point of conversion — visitors are more likely to sign up or buy from a company that feels credible and cohesive." },
  { q: "Do you redesign an existing brand, or only build new ones?", a: "Both — this service covers full brand builds for new companies as well as rebrands and brand refreshes for companies whose identity hasn't kept pace with how the business has grown." },
  { q: "How long does a brand identity project take?", a: "A full brand strategy and identity project typically takes 4–8 weeks; video production timelines vary by scope but usually run 2–6 weeks per video depending on complexity." }
];

export default function BrandCreativeLandingPage({ onBack }: { onBack: () => void }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const filterOptions = ['All', 'Strategy', 'Design', 'Video'];
  const filteredServices = activeFilter === 'All'
    ? includedServices
    : includedServices.filter(s => s.category === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 scroll-smooth selection:bg-[#FF00A0]/20">

      {/* Hero Section - Padding Increased (pt-24 lg:pt-32) */}
      <section id="hero" className="relative pt-24 lg:pt-32 pb-24 lg:pb-32 bg-[#1C1F26] overflow-hidden">
        
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#7B61FF] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00E5FF] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        
        <div className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center flex flex-col items-center z-10">
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FFFFFF] leading-[1.1] mb-8">
            Make people remember you, and <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF00A0] to-[#7B61FF]">
                  trust you.
                </span>
          </h1>

          <p className="text-[#D1D5DB] text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto font-light mb-12">
            We shape how your business looks, sounds, and tells its story — from visual identity to the videos that explain your product — so every touchpoint feels intentional and builds trust.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#FFFFFF] bg-gradient-to-r from-[#7B61FF] to-[#FF00A0] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(123,97,255,0.4)] flex items-center justify-center space-x-2">
                  <span>Build Your Brand</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#FFFFFF] bg-gradient-to-r from-[#7B61FF] to-[#00E5FF] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center space-x-2">
                  <span>See Our Work</span>
                </button>
          </div>
        </div>
      </section>

      {/* What It Is - Light Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-20 -mt-6 rounded-t-[2.5rem] shadow-[0_-8px_30px_rgba(0,0,0,0.05)]" style={{ background: 'linear-gradient(160deg, #7B61FF 0%, #00E5FF 100%)' }}>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Reveal>
            <h2 className="text-sm font-bold tracking-widest text-white/90 uppercase mb-4">What It Is</h2>
            <div className="p-8 md:p-12">
              <p className="text-2xl md:text-3xl font-bold text-white leading-tight mb-6">
                Brand, creative, and digital experience is the design of a business's visual identity, story, and content — including brand strategy, product videos, and digital experiences — so that every customer touchpoint feels consistent, intentional, and credible.
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                It covers both the strategic layer, defining how a business is positioned and how it should look and sound, and the creative production layer that brings that identity to life across a website, product, and marketing materials.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1C1F26]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="text-sm font-bold tracking-widest text-[#7B61FF] uppercase mb-3">The Impact</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Why It Matters</h3>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <Reveal delay={100} direction="right">
              <div className="bg-gray-800/30 backdrop-blur-md p-10 rounded-3xl border border-purple-500/20 hover:bg-gray-800/50 hover:border-purple-500/40 transition-all duration-300 h-full flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FF00A0]/10 to-transparent rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-125"></div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#FF00A0]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">For Founders</h3>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed flex-grow">
                  Technology and growth only go so far if the brand behind them doesn't stick. A strong product with an inconsistent or generic brand still loses deals to a weaker product that feels more credible. This is what makes a company memorable the moment someone lands on the website, watches a demo, or meets your team for the first time — and it's often the deciding factor between two options that otherwise look similar on paper.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200} direction="left">
              <div className="bg-gray-800/30 backdrop-blur-md p-10 rounded-3xl border border-purple-500/20 hover:bg-gray-800/50 hover:border-purple-500/40 transition-all duration-300 h-full flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#7B61FF]/10 to-transparent rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-125"></div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                    <Layout className="w-5 h-5 text-[#7B61FF]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">For Technical & Product Leads</h3>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed flex-grow">
                  Brand work here is built to integrate cleanly with the product and marketing site, not exist as a separate design exercise disconnected from what you're actually shipping. That means brand identity and visual guidelines that translate directly into your product UI and marketing pages, and product storytelling — demo videos, explainer videos — that accurately represents what the product does instead of overselling it. The goal is a brand that holds up under technical scrutiny, not just a polished pitch deck.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-widest text-[#FF00A0] uppercase mb-3">What's Included</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-[#1C1F26] tracking-tight">
                Everything required to stand out.
              </h3>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex flex-wrap gap-3 items-center justify-center mb-16 bg-gray-50 p-2 rounded-full shadow-sm border border-gray-200 max-w-fit mx-auto">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-[#1C1F26] text-[#FFFFFF] shadow-md transform scale-105'
                      : 'text-[#555B66] hover:text-[#1C1F26] hover:bg-gray-100'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <Reveal key={service.title} delay={index * 50}>
                <div className="bg-[#2D3545] p-8 rounded-2xl border border-gray-800 hover:border-gray-600 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div className="mb-6 p-3 bg-white/5 border border-white/10 rounded-xl inline-block w-fit group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold text-[#FFFFFF] mb-3 relative z-10">{service.title}</h4>
                  <p className="text-[#D1D5DB] leading-relaxed text-sm opacity-80 group-hover:opacity-100 transition-opacity relative z-10">
                    {service.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1C1F26] overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-24">
              <h2 className="text-sm font-bold tracking-widest text-[#00E5FF] uppercase mb-3">The Process</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">How We Work</h3>
            </div>
          </Reveal>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 transform -translate-x-1/2"></div>

            <div className="space-y-16 md:space-y-24 relative z-10">
              {howWeWorkSteps.map((step, index) => (
                <Reveal key={index} delay={index * 100} direction={index % 2 === 0 ? "right" : "left"}>
                  <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>

                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{step.title}</h3>
                      <p className="text-gray-400 text-lg leading-relaxed">{step.desc}</p>
                    </div>

                    <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-full bg-[#1C1F26] border-4 border-[#00E5FF] items-center justify-center font-bold text-xl text-white shadow-[0_0_30px_rgb(6,182,212,0.3)] z-20">
                      {index + 1}
                    </div>

                    <div className="md:hidden w-12 h-12 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#00E5FF] flex items-center justify-center font-bold text-xl text-white self-start">
                      {index + 1}
                    </div>

                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative border-b border-slate-800" style={{ background: 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 tracking-tight">Who This Is For</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {[
              "Founders whose product is strong but whose brand feels generic or inconsistent.",
              "Companies preparing for a funding round or major launch that need to look credible fast.",
              "Product teams that need demo or explainer videos to shorten the sales cycle.",
              "Businesses with a brand that hasn't kept up with how the product or company has evolved.",
              "Teams that need onboarding or training content to reduce support load and improve adoption."
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100} className={i === 4 ? 'sm:col-span-2 sm:flex sm:justify-center' : ''}>
                <div className={`group relative overflow-hidden bg-[#0F172A] p-8 rounded-2xl shadow-xl border border-slate-800 hover:border-[#7B61FF]/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#7B61FF]/10 transition-all duration-300 flex gap-4 h-full ${i === 4 ? 'sm:max-w-[calc(50%-0.75rem)] sm:min-h-[154px]' : ''}`}>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7B61FF] to-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CheckCircle className="w-6 h-6 text-[#00E5FF] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <p className="text-[#E2E8F0] text-lg font-medium leading-relaxed">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#2D3545]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-300 text-lg">Direct answers to help you structure your creative needs.</p>
            </div>
          </Reveal>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Reveal key={index} delay={index * 50}>
                <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-sm bg-white">
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-8 py-6 flex justify-between items-center focus:outline-none"
                  >
                    <span className="font-bold text-[#1C1F26] pr-4 text-lg">{faq.q}</span>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${activeFaq === index ? 'bg-gray-100' : 'bg-transparent'}`}>
                      {activeFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  <div 
                    className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${
                      activeFaq === index ? "max-h-96 py-6 border-t border-gray-100 bg-gray-50 opacity-100" : "max-h-0 py-0 opacity-0"
                    }`}
                  >
                    <p className="text-[#555B66] text-lg leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(90deg, #7B61FF 0%, #ff00a0 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">Related Services</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { category: "GROW", title: "Growth, Marketing & GTM", desc: "For putting the brand and content in front of the right audience." },
              { category: "BUILD", title: "Product & Software Engineering", desc: "For applying the brand system directly into your product UI." },
              { category: "OPERATE", title: "CRM, RevOps & Business Operations", desc: "For the sales assets and content that support the pipeline." }
            ].map((srv, i) => (
              <Reveal key={i} delay={i * 100}>
                <a href="#" className="block p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#7B61FF]/40 hover:shadow-md hover:-translate-y-2 transition-all duration-300 group h-full">
                  <div className="text-xs font-bold text-[#555B66] uppercase tracking-wider mb-2">{srv.category}</div>
                  <h3 className="text-xl font-bold text-[#1C1F26] mb-3 group-hover:text-[#7B61FF] transition-colors flex items-center justify-between">
                    {srv.title}
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-[#555B66] text-sm leading-relaxed">{srv.desc}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#1C1F26] pt-16 pb-32 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden border-t border-gray-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#7B61FF]/20 to-[#FF00A0]/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <Reveal className="max-w-4xl mx-auto space-y-10 relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-[#FFFFFF]">
            Does your brand actually match how good your product is?
          </h2>
          <p className="text-xl md:text-2xl text-[#D1D5DB] font-medium max-w-3xl mx-auto leading-relaxed">
            Tell us where the brand feels inconsistent or outdated. We'll show you what a brand built to match your product looks like.
          </p>
          <div className="pt-16">
            <button className="bg-gradient-to-r from-[#7B61FF] to-[#FF00A0] text-[#FFFFFF] px-12 py-5 rounded-xl font-bold text-xl shadow-lg hover:scale-[1.05] transition-all duration-300">
              Start a Conversation
            </button>
          </div>
        </Reveal>
      </section>

    </div>
  );
}