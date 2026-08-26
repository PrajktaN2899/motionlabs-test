'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Code, Layers, Terminal, ArrowRight, ChevronDown, ChevronUp, CheckCircle, Smartphone, Globe, Database, Lock, Zap, Users, Settings, GitBranch, ArrowUpRight } from 'lucide-react';

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
  { title: "Custom Web Development", desc: "Websites and web applications built around your specific business logic, not a page-builder template.", icon: <Globe className="w-6 h-6 text-[#06B6D4]" /> },
  { title: "SaaS Development", desc: "Multi-tenant software products designed to be sold and scaled — subscription billing, user management, and role-based access included.", icon: <Layers className="w-6 h-6 text-[#4F46E5]" /> },
  { title: "Web & Mobile Applications", desc: "Cross-platform or native apps for iOS, Android, and web, sharing a consistent product experience.", icon: <Smartphone className="w-6 h-6 text-[#06B6D4]" /> },
  { title: "E-commerce Development", desc: "Custom or headless commerce builds — product catalogs, checkout, payments, and inventory logic tailored to how you actually sell.", icon: <Zap className="w-6 h-6 text-[#4F46E5]" /> },
  { title: "Custom Business Applications", desc: "Purpose-built software for a specific internal process — quoting tools, scheduling systems, approval workflows.", icon: <Settings className="w-6 h-6 text-[#06B6D4]" /> },
  { title: "Internal Tools", desc: "Admin dashboards, ops consoles, and back-office systems your team uses every day but customers never see.", icon: <Database className="w-6 h-6 text-[#4F46E5]" /> },
  { title: "Customer Portals", desc: "Secure, logged-in experiences where your customers manage accounts, view data, or self-serve support.", icon: <Users className="w-6 h-6 text-[#06B6D4]" /> },
  { title: "API Development", desc: "RESTful or GraphQL APIs designed for reliability, versioning, and third-party integration.", icon: <GitBranch className="w-6 h-6 text-[#4F46E5]" /> },
  { title: "Platform Development", desc: "Larger, multi-module systems — marketplaces, platforms with multiple user types, or products meant to support an ecosystem.", icon: <Terminal className="w-6 h-6 text-[#06B6D4]" /> },
  { title: "Legacy App Modernization", desc: "Rebuilding or incrementally migrating outdated systems onto modern, maintainable, and secure foundations.", icon: <Lock className="w-6 h-6 text-[#4F46E5]" /> }
];

const howWeWorkSteps = [
  { title: "Scope & Architecture", desc: "We translate the roadmap into a technical plan: system architecture, data model, and a build sequence that ships value early instead of everything at once." },
  { title: "Build in Increments", desc: "Development happens in short, reviewable cycles with working software delivered continuously, not a single reveal at the end." },
  { title: "Test & Harden", desc: "Automated testing, code review, and QA are built into every cycle, not bolted on before launch." },
  { title: "Launch & Hand Off", desc: "You get a working product, clean documentation, and a codebase your team (or ours, on an ongoing basis) can actually maintain." }
];

const faqs = [
  { q: "What is custom software development?", a: "Custom software development is the design and build of applications tailored to a specific business's workflows and requirements, as opposed to configuring off-the-shelf or template-based software." },
  { q: "How long does it take to build a custom web or mobile application?", a: "Timelines vary by scope, but most MVPs and first-version products take 8–16 weeks from finalized scope to launch, with larger platforms taking longer and typically shipped in phases." },
  { q: "What's the difference between a web app and a SaaS product?", a: "A web app is software accessed through a browser for a single business's use; a SaaS (Software-as-a-Service) product is built to be sold to multiple customers, with multi-tenancy, subscription billing, and account management built in." },
  { q: "What is legacy application modernization?", a: "Legacy application modernization is the process of updating outdated software systems — old codebases, unsupported frameworks, or fragile infrastructure — so they're secure, maintainable, and able to integrate with modern tools and APIs." },
  { q: "Do you build internal tools as well as customer-facing products?", a: "Yes — this service covers both: customer-facing apps, portals, and e-commerce experiences, as well as the internal dashboards and business applications your team uses to run day-to-day operations." },
  { q: "Can your team work inside our existing codebase, or do you only build from scratch?", a: "Both — we regularly work inside existing codebases alongside in-house engineering teams, following established architecture and coding standards, as well as building new products from the ground up." },
  { q: "What happens after launch — do you offer ongoing support?", a: "Yes, ongoing maintenance, feature development, and support are available after launch; every build also comes with documentation so an in-house team can take over independently if preferred." }
];

export default function ProductEngineeringLandingPage({ onBack }: { onBack: () => void }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 scroll-smooth selection:bg-[#06B6D4]/20">
      
      {/* Hero Section */}
      <section id="hero" className="relative pt-32 lg:pt-40 pb-24 lg:pb-32 bg-[#0F172A] overflow-hidden">
        
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#7B61FF] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        
        <div className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center flex flex-col items-center z-10">
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FFFFFF] leading-[1.1] mb-8">
            Turn the roadmap into <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">
                working software.
              </span>
          </h1>

          <p className="text-[#E2E8F0] text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto font-light mb-12">
            We design and build the websites, apps, and internal tools your business runs on from a first customer-facing product to the systems that hold up a company at scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#FFFFFF] bg-gradient-to-r from-[#7B61FF] to-[#FF00A0] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(123,97,255,0.4)] flex items-center justify-center space-x-2">
                <span>Start Your Build</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#FFFFFF] bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center space-x-2">
                <Terminal className="w-5 h-5" />
                <span>See Our Work</span>
              </button>
          </div>
        </div>
      </section>

      {/* What It Is (GEO/AEO Optimized) */}
      <section className="py-24 px-6 md:px-12 relative" style={{background: 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)'}}>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Reveal>
            <h2 className="text-sm font-bold tracking-widest text-white/90 uppercase mb-4">What It Is</h2>
            <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-xl">
              <p className="text-2xl md:text-3xl font-bold text-[#0F172A] leading-tight mb-6">
                Product and software engineering is the design, development, and modernization of custom web applications, mobile apps, SaaS products, APIs, and internal business tools — built to match how a specific business actually operates, rather than adapted from a generic template.
              </p>
              <p className="text-lg text-[#475569] leading-relaxed">
                It covers everything after the roadmap is set and before the product is live: architecture decisions, the actual engineering work, and the modernization of older systems that are holding a business back.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-16 text-center">Why It Matters</h2>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <Reveal delay={100} direction="right">
              <div className="bg-[#0F172A] p-10 rounded-3xl shadow-xl border border-slate-800 h-full flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#06B6D4]/20 to-transparent rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-125"></div>
                <div className="inline-flex items-center gap-2 mb-6 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#06B6D4]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">For Founders</h3>
                </div>
                <p className="text-lg text-[#E2E8F0] leading-relaxed flex-grow relative z-10">
                  This is the difference between a product that launches fast and one that has to be rebuilt in a year. You need something you can put in front of customers and investors now, without cutting corners that turn into six-figure rework later. Whether it's your first MVP, a full customer-facing app, or an e-commerce store, the goal is the same: ship something real, built to last.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200} direction="left">
              <div className="bg-[#0F172A] p-10 rounded-3xl shadow-xl border border-slate-800 h-full flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#4F46E5]/20 to-transparent rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-125"></div>
                <div className="inline-flex items-center gap-2 mb-6 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-[#4F46E5]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">For CTOs & Tech Leads</h3>
                </div>
                <p className="text-lg text-[#E2E8F0] leading-relaxed flex-grow relative z-10">
                  You need engineers who can work inside an existing codebase, respect your architecture and coding standards, and take ownership of scope — not a team that needs every decision explained from scratch. That means clean API design, sensible platform choices, and legacy modernization work that reduces technical debt instead of quietly adding to it. Code quality, documentation, and handoff are part of the deliverable, not an afterthought.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 px-6 md:px-12 bg-[#2D3545]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-widest text-[#06B6D4] uppercase mb-3">What's Included</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Everything required to ship.
              </h3>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedServices.map((service, index) => (
              <Reveal key={index} delay={index * 50} className={index === 9 ? 'lg:col-start-2' : ''}>
                <div className="bg-[#0F172A] p-8 rounded-2xl border border-slate-800 hover:border-slate-600 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div className="mb-6 p-3 bg-white/5 border border-white/10 rounded-xl inline-block w-fit group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold text-[#FFFFFF] mb-3">{service.title}</h4>
                  <p className="text-[#E2E8F0] leading-relaxed text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                    {service.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 px-6 md:px-12 bg-[#1C1F26] overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 text-white tracking-tight">How We Work</h2>
          </Reveal>
          
          <div className="space-y-12 relative">
            <div className="hidden md:block absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-[#4F46E5] to-[#06B6D4] opacity-30"></div>
            
            {howWeWorkSteps.map((step, index) => (
              <Reveal key={index} delay={index * 100} direction="left">
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start group relative z-10">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#2D3545] border border-white/10 flex items-center justify-center font-bold text-2xl text-white group-hover:bg-[#06B6D4] group-hover:border-[#06B6D4] group-hover:text-[#0F172A] transition-all duration-300 shadow-sm relative">
                    {index + 1}
                  </div>
                  <div className="mt-2 md:pt-3">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#06B6D4] transition-colors">{step.title}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-24 px-6 md:px-12 relative border-b border-slate-800" style={{background: 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)'}}>
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-16 tracking-tight">Who This Is For</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {[
              "Founders who need a first product built fast, without technical debt they'll regret in a year.",
              "Companies replacing spreadsheets and manual processes with a real internal tool.",
              "CTOs who need extra engineering capacity that can plug into an existing codebase and team.",
              "Businesses running on outdated software that's becoming a security or scaling risk.",
              "Teams that need a customer portal, API, or platform built to support real growth, not a demo."
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100} className={i === 4 ? "sm:col-span-2 flex justify-center" : ""}>
                <div className={`group relative overflow-hidden bg-[#0F172A] p-8 rounded-3xl shadow-xl border border-slate-800 hover:border-[#06B6D4]/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#06B6D4]/10 transition-all duration-300 flex gap-4 h-full ${i === 4 ? "w-full sm:w-[calc(50%-12px)]" : "w-full"}`}>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7B61FF] to-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CheckCircle className="w-6 h-6 text-[#06B6D4] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <p className="text-[#E2E8F0] text-lg font-medium leading-relaxed">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-4">Frequently Asked Questions</h2>
              <p className="text-[#475569] text-lg">Direct answers to help you plan your build.</p>
            </div>
          </Reveal>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Reveal key={index} delay={index * 50}>
                <div className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-slate-300 hover:shadow-sm bg-white">
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-8 py-6 flex justify-between items-center focus:outline-none"
                  >
                    <span className="font-bold text-[#0F172A] pr-4 text-lg">{faq.q}</span>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${activeFaq === index ? 'bg-slate-100' : 'bg-transparent'}`}>
                      {activeFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-slate-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </button>
                  <div 
                    className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${
                      activeFaq === index ? "max-h-96 py-6 border-t border-slate-100 bg-slate-50 opacity-100" : "max-h-0 py-0 opacity-0"
                    }`}
                  >
                    <p className="text-[#475569] text-lg leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-24 px-6 md:px-12" style={{ background: 'linear-gradient(90deg, #7B61FF 0%, #ff00a0 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">Related Services</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { category: "STRATEGY", title: "Technology Strategy & Advisory", desc: "For the roadmap that comes before the build." },
              { category: "CONNECT", title: "Data, Integration & Business Systems", desc: "For connecting the new product to your existing tools." },
              { category: "SCALE", title: "Cloud, DevOps & Reliability Engineering", desc: "For scaling and hosting the product once it's live." }
            ].map((srv, i) => (
              <Reveal key={i} delay={i * 100}>
                <a href="#" className="block p-8 rounded-2xl bg-white border border-gray-100 hover:border-slate-300 hover:shadow-md hover:-translate-y-2 transition-all duration-300 group h-full">
                  <div className="text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">{srv.category}</div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#4F46E5] transition-colors flex items-center justify-between">
                    {srv.title}
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-[#475569] text-sm leading-relaxed">{srv.desc}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#0F172A] pt-16 pb-32 px-6 md:px-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#4F46E5]/40 to-[#06B6D4]/40 rounded-full blur-[120px] pointer-events-none"></div>
        
        <Reveal className="max-w-4xl mx-auto space-y-10 relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-[#FFFFFF]">
            Have an idea, a roadmap, or a system that's holding you back?
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            Tell us what you're trying to build or fix. We'll tell you honestly what it takes.
          </p>
          <div className="pt-16">
            <button className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-[#FFFFFF] px-12 py-5 rounded-full font-bold text-xl shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:scale-[1.05] transition-all duration-300">
              Start a Conversation
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}