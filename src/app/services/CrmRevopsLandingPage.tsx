'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, BarChart3, Target, Users, Zap, Megaphone, GitMerge, Database, PieChart, Settings, AppWindow, ArrowRight, ChevronDown, ChevronUp, CheckCircle, ArrowUpRight, Filter, Terminal } from 'lucide-react';

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
  { title: "Salesforce Development", desc: "Custom configuration, workflows, and integrations built inside Salesforce to match your specific sales process.", icon: <AppWindow className="w-6 h-6 text-[#4F46E5]" /> },
  { title: "CRM Implementation & Optimization", desc: "Setting up a new CRM or reworking an existing one so it fits how your team actually sells — not a generic default.", icon: <Settings className="w-6 h-6 text-[#06B6D4]" /> },
  { title: "Revenue Operations (RevOps)", desc: "Aligning sales, marketing, and customer success operations around one shared, consistent view of pipeline and revenue.", icon: <Briefcase className="w-6 h-6 text-[#4F46E5]" /> },
  { title: "Sales Automation", desc: "Automating repetitive sales tasks — follow-ups, lead routing, task creation — inside the sales process itself.", icon: <Zap className="w-6 h-6 text-[#06B6D4]" /> },
  { title: "Marketing Automation", desc: "Automated campaigns, nurture sequences, and lead scoring that run before a prospect ever reaches sales.", icon: <Megaphone className="w-6 h-6 text-[#4F46E5]" /> },
  { title: "Lead Management", desc: "Systems and rules for capturing, qualifying, routing, and tracking leads consistently across the funnel.", icon: <Users className="w-6 h-6 text-[#06B6D4]" /> },
  { title: "Pipeline Automation", desc: "Automating the movement of deals between pipeline stages based on real triggers, not manual updates.", icon: <Filter className="w-6 h-6 text-[#4F46E5]" /> },
  { title: "Data Cleansing & Enrichment", desc: "Removing duplicates and inconsistencies, and enriching contact and account records with accurate, complete data.", icon: <Database className="w-6 h-6 text-[#06B6D4]" /> },
  { title: "Revenue Dashboards", desc: "Real-time dashboards that show leadership exactly where pipeline, revenue, and forecasts stand.", icon: <BarChart3 className="w-6 h-6 text-[#4F46E5]" /> },
  { title: "Workflow Systems", desc: "Automated internal workflows that replace manual handoffs between sales, ops, and support.", icon: <GitMerge className="w-6 h-6 text-[#06B6D4]" /> },
  { title: "Internal Operations Platforms", desc: "Purpose-built internal tools for operations teams whose needs go beyond what off-the-shelf CRM tools cover.", icon: <PieChart className="w-6 h-6 text-[#4F46E5]" /> }
];

const howWeWorkSteps = [
  { title: "Audit the Funnel", desc: "We map how leads actually move through your business today — where they stall, where data breaks, and where your team is doing manual work that software should handle." },
  { title: "Configure the CRM", desc: "We implement or reconfigure your CRM (including Salesforce) around your real sales process, not a generic template." },
  { title: "Automate the Handoffs", desc: "We build the sales, marketing, and pipeline automation that closes the gaps between lead capture and closed deal." },
  { title: "Clean the Data & Deliver Dashboards", desc: "We cleanse and enrich the underlying data, then hand off revenue dashboards leadership can actually trust." }
];

const faqs = [
  { q: "What is RevOps?", a: "RevOps (Revenue Operations) is the alignment of sales, marketing, and customer success operations — and the systems behind them — around a single, shared view of revenue and pipeline." },
  { q: "What is CRM implementation?", a: "CRM implementation is the process of setting up, configuring, and customizing a customer relationship management platform, such as Salesforce, so it matches a company's actual sales process rather than a generic default setup." },
  { q: "How is sales automation different from marketing automation?", a: "Sales automation streamlines tasks within the sales process itself — like lead routing and follow-ups — while marketing automation manages campaigns, nurture sequences, and lead scoring before a prospect reaches sales." },
  { q: "Why isn't my sales team using our CRM?", a: "Low CRM adoption is usually a sign the system doesn't match the team's actual workflow — CRM optimization work realigns the setup to how deals really move, which is typically what drives adoption back up." },
  { q: "What is data enrichment?", a: "Data enrichment is the process of filling in missing information on contact and account records — such as company size, role, or industry — using external data sources, so sales and marketing have more complete information to work with." },
  { q: "Do you work with CRMs other than Salesforce?", a: "Yes — while Salesforce development is a core offering, CRM implementation and optimization covers other platforms as well, depending on what a business already uses." },
  { q: "How long does it take to fix a broken CRM setup?", a: "A focused CRM cleanup and reconfiguration typically takes 3–6 weeks; larger RevOps engagements involving automation, data cleansing, and dashboarding across sales and marketing usually run 6–10 weeks." }
];

export default function CrmRevopsLandingPage({ onBack }: { onBack: () => void }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 scroll-smooth selection:bg-[#4F46E5]/20">
      
      {/* Hero Section */}
      <section id="hero" className="relative pt-32 lg:pt-40 pb-24 lg:pb-32 bg-[#0F172A] overflow-hidden">
        
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#7B61FF] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        
        <div className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center flex flex-col items-center z-10">
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FFFFFF] leading-[1.1] mb-8">
            Give your teams a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">
                  system that runs itself.
                </span>
          </h1>

          <p className="text-[#E2E8F0] text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto font-light mb-12">
            We set up and fine-tune your CRM, automate the busywork between lead capture and closed deal, clean up your data, and build dashboards that show leadership exactly where revenue stands.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#FFFFFF] bg-gradient-to-r from-[#7B61FF] to-[#FF00A0] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(123,97,255,0.4)] flex items-center justify-center space-x-2">
                  <span>Fix Your Pipeline</span>
                  <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#FFFFFF] bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center space-x-2">
                  <Terminal className="w-5 h-5" />
                  <span>See Our Work</span>
            </button>
          </div>
        </div>
      </section>

      {/* What It Is / Founders & CTOs Section */}
      <section className="py-24 px-6 md:px-12 relative" style={{background: 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)'}}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-widest text-white uppercase mb-3">Audience</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Built for Leaders & Teams</h3>
            </div>
          </Reveal>
          
          <div className="space-y-6">
            {/* Founders Card */}
            <Reveal delay={100} direction="up">
              <div className="bg-[#0F172A] p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#06B6D4]/20 to-transparent rounded-bl-full pointer-events-none"></div>
                <h3 className="text-2xl font-bold text-white mb-2 relative z-10">For Founders</h3>
                <p className="text-[#06B6D4] font-medium mb-4 relative z-10">Dashboards you can actually trust.</p>
                <p className="text-[#E2E8F0] text-lg leading-relaxed font-light relative z-10">
                  Sales, marketing, and ops teams lose real hours every week to manual data entry, duplicate leads, and pipelines nobody fully trusts. You end up with one number from sales, a different number from marketing, and no clear picture of where revenue actually stands. Fixing this means a CRM your team actually uses, deals that don't fall through the cracks, and a dashboard you can look at once and trust — instead of chasing three people for three different spreadsheets.
                </p>
              </div>
            </Reveal>

            {/* CTOs Card */}
            <Reveal delay={200} direction="up">
              <div className="bg-[#0F172A] p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#4F46E5]/20 to-transparent rounded-bl-full pointer-events-none"></div>
                <h3 className="text-2xl font-bold text-white mb-2 relative z-10">For CTOs & RevOps Leads</h3>
                <p className="text-[#4F46E5] font-medium mb-4 relative z-10">Proper architecture, not default installs.</p>
                <p className="text-[#E2E8F0] text-lg leading-relaxed font-light relative z-10">
                  This is proper Salesforce development and CRM architecture, not a default install left mostly unconfigured. That means sales and marketing automation built around your actual funnel, pipeline automation that reflects how deals really move, and lead management logic that routes and scores leads correctly. Data cleansing and enrichment work underpins all of it, because automation built on dirty data just automates the mess faster. Revenue dashboards sit on top, pulling from a system that's actually governed.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What's Included - Updated Dark Background & Cards with Centered Row */}
      <section className="pt-16 pb-32 px-6 md:px-12 bg-[#2D3545] relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-sm font-bold tracking-widest text-[#06B6D4] uppercase mb-3">Capabilities</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Everything required to run operations.
              </h3>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {includedServices.map((service, index) => {
              // Center the last two items (index 9 and 10) in a 3-column grid
              let centeringClass = "";
              if (index === 9) centeringClass = "lg:col-start-1 lg:translate-x-1/2";
              if (index === 10) centeringClass = "lg:col-start-2 lg:translate-x-1/2";

              return (
                <Reveal key={index} delay={index * 50} className={centeringClass}>
                  <div className="bg-[#0F172A] p-8 rounded-2xl shadow-lg border border-slate-800 hover:border-slate-600 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col group relative overflow-hidden">
                    {/* Top Gradient Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="mb-6 w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                      {service.icon}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#4F46E5] transition-colors">{service.title}</h4>
                    <p className="text-gray-300 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Work - Alternating Timeline */}
      <section className="pt-16 pb-32 px-6 md:px-12 bg-[#0F172A] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-24">
              <h2 className="text-sm font-bold tracking-widest text-[#06B6D4] uppercase mb-3">The Process</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">How We Work</h3>
            </div>
          </Reveal>
          
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 transform -translate-x-1/2"></div>
            
            <div className="space-y-16 md:space-y-24 relative z-10">
              {howWeWorkSteps.map((step, index) => (
                <Reveal key={index} delay={index * 100} direction={index % 2 === 0 ? "right" : "left"}>
                  <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                    
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{step.title}</h3>
                      <p className="text-slate-400 text-lg leading-relaxed">{step.desc}</p>
                    </div>
                    
                    <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-full bg-[#0F172A] border-4 border-[#06B6D4] items-center justify-center font-bold text-xl text-white shadow-[0_0_30px_rgb(6,182,212,0.3)] z-20">
                      {index + 1}
                    </div>
                    
                    <div className="md:hidden w-12 h-12 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] flex items-center justify-center font-bold text-xl text-white self-start">
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

      {/* Who This Is For - UPDATED TO GRADIENT BG & DARK BOXES */}
      <section className="py-24 px-6 md:px-12 relative border-b border-slate-800" style={{background: 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)'}}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-12 tracking-tight text-center">Who This Is For</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              "Founders who don't trust the revenue number they're getting from sales.",
              "Sales teams manually updating a CRM nobody logs into consistently.",
              "RevOps leads who inherited a CRM that's technically installed but practically ignored.",
              "Operations teams doing manual handoffs between lead capture, sales, and fulfillment.",
              "Companies preparing for a fundraise that need clean, defensible pipeline and revenue reporting."
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100} className={i === 4 ? "sm:col-span-2 flex justify-center" : ""}>
                <div className={`group relative overflow-hidden bg-[#0F172A] p-8 rounded-3xl shadow-xl border border-slate-800 hover:border-[#4F46E5]/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#4F46E5]/10 transition-all duration-300 flex gap-4 h-full ${i === 4 ? "w-full sm:w-[calc(50%-12px)]" : "w-full"}`}>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CheckCircle className="w-6 h-6 text-[#06B6D4] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <p className="text-[#E2E8F0] text-lg font-medium leading-relaxed">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-4">Frequently Asked Questions</h2>
              <p className="text-[#475569] text-lg">Direct answers to help you plan your RevOps build.</p>
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
              { category: "CONNECT", title: "Data, Integration & Business Systems", desc: "For connecting your CRM to the rest of your business systems." },
              { category: "GROW", title: "Growth, Marketing & GTM", desc: "For the demand generation that feeds your pipeline in the first place." },
              { category: "AUTOMATE", title: "AI & Intelligent Automation", desc: "For AI-powered lead qualification and workflow automation." }
            ].map((srv, i) => (
              <Reveal key={i} delay={i * 100}>
                <a href="#" className="block p-8 rounded-2xl bg-white border border-gray-100 hover:border-[#4F46E5]/50 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group h-full">
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
            Not sure where your pipeline actually stands?
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            Tell us what CRM you're running and where the process breaks down. We'll show you what a system your team actually uses looks like.
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