'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Target, Search, Megaphone, BarChart, Users, MousePointerClick, Globe, MessageSquare, Bot, Zap, ArrowRight, ChevronDown, ChevronUp, CheckCircle, ArrowUpRight, Lightbulb, Terminal } from 'lucide-react';

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
  { title: "Growth Strategy", desc: "The overall plan for how a business acquires and retains customers, sequenced by channel and priority.", icon: <TrendingUp className="w-6 h-6 text-[#7B61FF]" /> },
  { title: "Go-to-Market Strategy", desc: "The specific plan for launching a product, entering a market, or reaching a new customer segment.", icon: <Target className="w-6 h-6 text-[#06B6D4]" /> },
  { title: "B2B Marketing", desc: "Marketing built around longer sales cycles, multiple decision-makers, and account-based approaches.", icon: <Users className="w-6 h-6 text-[#FF00A0]" /> },
  { title: "Performance Marketing", desc: "Paid acquisition — search, social, and display — measured and optimized against real business outcomes.", icon: <MousePointerClick className="w-6 h-6 text-[#4F46E5]" /> },
  { title: "Demand Generation", desc: "Building awareness and interest that feeds the top of the funnel before a lead is ever captured.", icon: <Megaphone className="w-6 h-6 text-[#7B61FF]" /> },
  { title: "Lead Generation", desc: "Campaigns and systems designed specifically to capture qualified leads for sales to work.", icon: <Zap className="w-6 h-6 text-[#06B6D4]" /> },
  { title: "SEO", desc: "Optimizing website content and structure to rank in traditional search engines like Google.", icon: <Search className="w-6 h-6 text-[#FF00A0]" /> },
  { title: "Answer Engine Optimization (AEO)", desc: "Structuring content so AI-driven answer engines like ChatGPT and Perplexity can accurately surface and cite it.", icon: <MessageSquare className="w-6 h-6 text-[#4F46E5]" /> },
  { title: "Generative Engine Optimization (GEO)", desc: "Optimizing content so it's more likely to be referenced or summarized by generative AI search tools, like Google AI Overviews.", icon: <Bot className="w-6 h-6 text-[#7B61FF]" /> },
  { title: "Conversion Rate Optimization (CRO)", desc: "Improving the percentage of visitors who take a desired action — sign up, request a demo, buy.", icon: <BarChart className="w-6 h-6 text-[#06B6D4]" /> },
  { title: "Marketing Automation", desc: "Automated campaigns, nurture sequences, and lead scoring that run without manual effort per lead.", icon: <Globe className="w-6 h-6 text-[#FF00A0]" /> },
  { title: "Brand Positioning", desc: "Defining how a business is differentiated and described in the market, which everything else builds on.", icon: <Lightbulb className="w-6 h-6 text-[#4F46E5]" /> }
];

const howWeWorkSteps = [
  { title: "Define the GTM Strategy", desc: "We clarify who you're targeting, how you're positioned against alternatives, and which channels actually make sense for your business." },
  { title: "Build the Content & Search Foundation", desc: "We optimize your site and content for traditional SEO, AEO, and GEO simultaneously, so you're structured to be found across search engines and AI answer engines alike." },
  { title: "Run Demand & Lead Generation", desc: "We launch performance marketing and demand generation campaigns designed to fill the pipeline, not just generate impressions." },
  { title: "Optimize for Conversion", desc: "We test and improve the site and funnel through CRO, so more of the traffic you're already earning turns into pipeline." }
];

const faqs = [
  { q: "What is AEO (Answer Engine Optimization)?", a: "AEO is the practice of structuring website content — clear definitions, direct answers, FAQ formatting — so AI-driven answer engines like ChatGPT and Perplexity can accurately surface and cite it in response to user questions." },
  { q: "What is GEO (Generative Engine Optimization)?", a: "GEO is the practice of optimizing content so it's more likely to be referenced or summarized by generative AI search tools, such as Google AI Overviews, rather than optimizing purely for traditional ranked search results." },
  { q: "Is GEO replacing SEO?", a: "No — GEO and AEO extend traditional SEO rather than replace it; well-structured, authoritative content tends to perform well across ranked search, answer engines, and generative search simultaneously." },
  { q: "What is a go-to-market strategy?", a: "A go-to-market strategy is the specific plan a business uses to launch a product or enter a market, defining the target audience, positioning, channels, and messaging needed to reach and convert customers." },
  { q: "What's the difference between demand generation and lead generation?", a: "Demand generation builds awareness and interest at the top of the funnel before a lead is captured; lead generation focuses specifically on capturing contact information from qualified prospects for sales to follow up with." },
  { q: "How is B2B marketing different from consumer marketing?", a: "B2B marketing is built around longer sales cycles and multiple decision-makers, often using account-based strategies, while consumer marketing typically targets faster, individual purchase decisions." },
  { q: "How long does it take to see results from SEO and GTM work?", a: "Performance marketing and lead generation can show measurable results within weeks; SEO, AEO, and GEO are longer-term investments that typically show meaningful traction within 3–6 months." }
];

export default function GrowthGtmLandingPage({ onBack }: { onBack: () => void }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 scroll-smooth selection:bg-[#7B61FF]/20">
      
      {/* Hero Section */}
      <section id="hero" className="relative pt-32 lg:pt-40 pb-24 lg:pb-32 bg-[#0F172A] overflow-hidden">
        
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#7B61FF] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        
        <div className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center flex flex-col items-center z-10">
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FFFFFF] leading-[1.1] mb-8">
            Get in front of the right people, and <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#FF00A0]">
                  convert them.
                </span>
          </h1>

          <p className="text-[#E2E8F0] text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto font-light mb-12">
            We build the go-to-market plan, run performance marketing and lead generation, and optimize your website and content so you show up in search engines and the AI answer engines people now use to find businesses.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#FFFFFF] bg-gradient-to-r from-[#7B61FF] to-[#FF00A0] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(123,97,255,0.4)] flex items-center justify-center space-x-2">
                  <span>Build Your GTM Plan</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
            <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#FFFFFF] bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center space-x-2">
                  <Terminal className="w-5 h-5" />
                  <span>See Our Work</span>
                </button>
          </div>
        </div>
      </section>

      {/* What It Is Section */}
      <section className="py-24 px-6 md:px-12 relative" style={{background: 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)'}}>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Reveal>
            <h2 className="text-sm font-bold tracking-widest text-white/90 uppercase mb-4">What It Is</h2>
            <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-xl">
              <p className="text-2xl md:text-3xl font-bold text-[#0F172A] leading-tight mb-6">
                Growth and go-to-market (GTM) is the combination of strategy, performance marketing, and search optimization — including SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization) — used to get a business in front of the right audience and convert more of the visitors it already earns.
              </p>
              <p className="text-lg text-[#475569] leading-relaxed">
                It covers both sides of growth: getting found, across traditional search and the newer AI-driven ways people now discover businesses, and getting the resulting traffic to actually convert.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why It Matters / The Impact Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-16 text-center">The Impact</h2>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <Reveal delay={100} direction="right">
              <div className="bg-[#0F172A] p-10 rounded-3xl shadow-xl border border-slate-800 h-full flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#7B61FF]/20 to-transparent rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-125"></div>
                <div className="inline-flex items-center gap-2 mb-6 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-[#FF00A0]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">For Founders</h3>
                </div>
                <p className="text-lg text-[#E2E8F0] leading-relaxed flex-grow relative z-10">
                  Building a great product doesn't guarantee anyone finds it. You need a clear plan for reaching the right customers, not just a marketing budget spent on whatever channel seemed popular last quarter. That means a real go-to-market strategy, lead generation that fills the pipeline, and a website that turns visitors into customers instead of just traffic.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200} direction="left">
              <div className="bg-[#0F172A] p-10 rounded-3xl shadow-xl border border-slate-800 h-full flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#06B6D4]/20 to-transparent rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-125"></div>
                <div className="inline-flex items-center gap-2 mb-6 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Search className="w-5 h-5 text-[#06B6D4]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">For Technical & Marketing Leads</h3>
                </div>
                <p className="text-lg text-[#E2E8F0] leading-relaxed flex-grow relative z-10">
                  Discovery itself has changed. SEO still matters for traditional ranked search, but AEO determines whether tools like ChatGPT and Perplexity cite your business, and GEO determines if you show up in Google AI Overviews. All three require content structured for machines to read accurately — clear definitions, proper schema markup — not just content written to rank. That technical work pairs with CRO so visibility turns into pipeline.
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
                Everything required to grow.
              </h3>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedServices.map((service, index) => (
              <Reveal key={index} delay={index * 50}>
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

      {/* Who This Is For - UPDATED TO MATCH PRODUCT/CRM STYLE */}
      <section className="py-24 px-6 md:px-12 relative border-b border-slate-800" style={{background: 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)'}}>
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-12 tracking-tight">Who This Is For</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {[
              "Founders with a built product and no clear plan for reaching customers.",
              "Companies whose marketing spend isn't tied to measurable pipeline results.",
              "Marketing leads who know search has changed but haven't restructured content for AI answer engines yet.",
              "Businesses launching in a new market or segment that need a real go-to-market plan.",
              "Teams getting traffic that isn't converting into leads or customers."
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100} className={i === 4 ? "sm:col-span-2 flex justify-center" : ""}>
                <div className={`bg-[#0F172A] p-8 rounded-3xl shadow-xl border border-slate-800 flex gap-4 h-full ${i === 4 ? "w-full sm:w-[calc(50%-12px)]" : "w-full"}`}>
                  <CheckCircle className="w-6 h-6 text-[#06B6D4] flex-shrink-0 mt-1" />
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
              <p className="text-[#475569] text-lg">Direct answers to help you structure your strategy.</p>
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
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] tracking-tight mb-10">Related Services</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { category: "EXPERIENCE", title: "Brand, Creative & Digital Experience", desc: "For the brand and content that growth marketing runs on." },
              { category: "OPERATE", title: "CRM, RevOps & Business Operations", desc: "For the pipeline systems that manage the leads this service generates." },
              { category: "CONNECT", title: "Data, Integration & Business Systems", desc: "For the dashboards that show whether marketing spend is actually working." }
            ].map((srv, i) => (
              <Reveal key={i} delay={i * 100}>
                <a href="#" className="block p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#7B61FF]/40 hover:shadow-md transition-all group h-full">
                  <div className="text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">{srv.category}</div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#7B61FF] transition-colors flex items-center justify-between">
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

      {/* Closing CTA - Dark Slate */}
      <section className="bg-[#0F172A] pt-16 pb-32 px-6 md:px-12 text-center relative overflow-hidden border-t border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#7B61FF]/20 to-[#FF00A0]/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <Reveal className="max-w-4xl mx-auto space-y-10 relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-[#FFFFFF]">
            Built something great and no one's finding it?
          </h2>
          <p className="text-xl md:text-2xl text-[#E2E8F0] font-medium max-w-3xl mx-auto leading-relaxed">
            Tell us where your traffic is coming from and where it's falling off. We'll show you what a real go-to-market plan looks like.
          </p>
          <div className="pt-16">
            <button className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-[#FFFFFF] px-12 py-5 rounded-xl font-bold text-xl shadow-lg hover:scale-[1.05] transition-all duration-300">
              Start a Conversation
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}