'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Network, Database, Layers, Server, Workflow, Users, BarChart, 
  PieChart, Clock, ShieldCheck, ArrowRight, ChevronDown, 
  ChevronUp, CheckCircle, Briefcase, Terminal, ArrowUpRight, 
  SplitSquareHorizontal, Merge
} from 'lucide-react';

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
  { title: "API & System Integration", desc: "Connecting two or more platforms — CRM, ERP, payments, internal tools — through documented, maintainable API connections.", icon: <Network className="w-6 h-6 text-[#7B61FF]" /> },
  { title: "Data Integration", desc: "Merging data from multiple sources into a single, consistent view, resolving format and structure mismatches along the way.", icon: <Merge className="w-6 h-6 text-[#00E5FF]" /> },
  { title: "Data Pipelines", desc: "Automated processes that move and transform data from source systems into a usable, queryable format.", icon: <SplitSquareHorizontal className="w-6 h-6 text-[#7B61FF]" /> },
  { title: "Data Architecture", desc: "The underlying design of how your data is structured, stored, and modeled — the foundation everything else is built on.", icon: <Layers className="w-6 h-6 text-[#00E5FF]" /> },
  { title: "Data Warehousing", desc: "A centralized, structured store for your business data, built for analytics and reporting rather than day-to-day transactions.", icon: <Server className="w-6 h-6 text-[#7B61FF]" /> },
  { title: "Business Systems Integration", desc: "Connecting core operational platforms — ERP, accounting, inventory, HR — so they operate from shared, consistent data.", icon: <Workflow className="w-6 h-6 text-[#00E5FF]" /> },
  { title: "CRM Integration", desc: "Syncing your CRM with marketing, support, billing, and product tools so customer data isn't siloed in one system.", icon: <Users className="w-6 h-6 text-[#7B61FF]" /> },
  { title: "Analytics Engineering", desc: "Modeling raw data into clean, reusable tables and metrics that reporting tools and dashboards can build on reliably.", icon: <BarChart className="w-6 h-6 text-[#00E5FF]" /> },
  { title: "BI Dashboards", desc: "Business intelligence dashboards that give leadership and teams a real-time, visual view of the metrics that matter.", icon: <PieChart className="w-6 h-6 text-[#7B61FF]" /> },
  { title: "Reporting Automation", desc: "Scheduled, automated reports that replace manual spreadsheet exports and end-of-week data pulls.", icon: <Clock className="w-6 h-6 text-[#00E5FF]" /> },
  { title: "Data Quality & Governance", desc: "Processes and rules that catch duplicates, inconsistencies, and gaps before they distort reports and decisions.", icon: <ShieldCheck className="w-6 h-6 text-[#7B61FF]" /> }
];

const howWeWorkSteps = [
  { title: "Map the Systems", desc: "We audit which tools you use, how data currently moves (or doesn't) between them, and where the trust gaps are." },
  { title: "Design the Architecture", desc: "We design the data model, pipeline structure, and integration points before writing any code, so the foundation holds as you scale." },
  { title: "Build & Integrate", desc: "We connect the systems, build the pipelines, and stand up the data warehouse or reporting layer." },
  { title: "Deliver Trustworthy Dashboards", desc: "We hand off BI dashboards and automated reports your team can actually rely on — with governance in place so they stay accurate." }
];

const faqs = [
  { q: "What is business systems integration?", a: "Business systems integration is the practice of connecting separate software platforms — such as a CRM, ERP, and accounting system — so data syncs automatically instead of being entered manually in multiple places." },
  { q: "What's the difference between a data pipeline and a dashboard?", a: "A data pipeline moves and transforms raw data from its source systems into a usable format; a dashboard is the visual layer on top that presents that data for reporting and decision-making." },
  { q: "What is a data warehouse, and does a small company need one?", a: "A data warehouse is a centralized, structured store for business data built for analytics rather than daily transactions; even small companies benefit once they're pulling reports from more than two or three source systems." },
  { q: "Why does data quality matter for reporting?", a: "Reports and dashboards are only as reliable as the data feeding them — data quality and governance work catches duplicates, inconsistencies, and gaps before they distort business decisions." },
  { q: "What is analytics engineering?", a: "Analytics engineering is the process of modeling raw, messy data into clean, well-structured tables and metrics that reporting tools and dashboards can build on consistently." },
  { q: "Can you integrate our CRM with our other business tools?", a: "Yes — CRM integration is a core part of this service, connecting your CRM with marketing, billing, support, and product tools so customer data isn't siloed." },
  { q: "How long does a typical integration or data project take?", a: "Smaller integrations between two systems can take 2–4 weeks; full data architecture, warehousing, and dashboard builds typically take 6–12 weeks depending on the number of source systems involved." }
];

export default function DataIntegrationLandingPage({ onBack }: { onBack: () => void }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 scroll-smooth selection:bg-[#7B61FF]/20">

      {/* Hero Section - Padding Increased (pt-24 lg:pt-32) */}
      <section id="hero" className="relative pt-24 lg:pt-32 pb-24 lg:pb-32 bg-[#1C1F26] overflow-hidden">
        
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#7B61FF] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00E5FF] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        
        <div className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center flex flex-col items-center z-10">
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FFFFFF] leading-[1.1] mb-8">
            Make your tools <br className="hidden sm:block" />
            talk to each other.
          </h1>

          <p className="text-[#D1D5DB] text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto font-light mb-12">
            We connect your CRM, payments, spreadsheets, and business systems so data flows automatically — and turn scattered numbers into dashboards and reports you can actually trust.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#FFFFFF] bg-gradient-to-r from-[#7B61FF] to-[#00E5FF] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(123,97,255,0.4)] flex items-center justify-center space-x-2">
              <span>Connect Your Systems</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#FFFFFF] bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center justify-center backdrop-blur-sm space-x-2">
              <Terminal className="w-5 h-5" />
              <span>See Our Work</span>
            </button>
          </div>
        </div>
      </section>

      {/* What It Is - Pull Quote Style */}
      <section className="py-24 px-6 md:px-12 relative z-20 -mt-10 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]" style={{ background: 'linear-gradient(160deg, #7B61FF 0%, #00E5FF 100%)' }}>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Reveal>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-6 shadow-sm border border-white/50">
              <Merge className="w-8 h-8 text-[#7B61FF]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-snug mb-8">
              Data and business systems integration is the practice of connecting separate software platforms so information syncs automatically, combined with the data pipelines that turn it into something actionable.
            </h2>
            <div className="w-24 h-1 bg-white/70 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              It covers both directions of the problem: getting systems to share data without manual work, and making the resulting data trustworthy enough to build decisions on.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why It Matters - Overlapping Layout */}
      <section className="py-24 px-6 md:px-12 bg-[#1C1F26]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-16">
              <h2 className="text-sm font-bold tracking-widest text-[#00E5FF] uppercase mb-3">The Impact</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Why It Matters</h3>
            </div>
          </Reveal>

          <div className="space-y-12">
            {/* Founders Card */}
            <Reveal delay={100} direction="up">
              <div className="bg-gray-800/30 backdrop-blur-md rounded-3xl border border-purple-500/20 hover:bg-gray-800/50 hover:border-purple-500/40 transition-all duration-300 overflow-hidden flex flex-col md:flex-row group">
                <div className="md:w-1/3 bg-black/20 p-10 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7B61FF] to-[#00E5FF]"></div>
                  <Briefcase className="w-12 h-12 text-[#7B61FF] mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-3xl font-bold text-white mb-2">For Founders</h3>
                  <p className="text-gray-400 font-medium">One reliable number for revenue.</p>
                </div>
                <div className="md:w-2/3 p-10 md:p-12 flex items-center">
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    Most businesses run on a patchwork of tools that don't share information — a CRM here, a payments system there, three different spreadsheets someone updates by hand. That patchwork means nobody fully trusts the numbers. Fixing this means one source of truth for customer data, and dashboards leadership can actually act on instead of double-checking.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* CTOs Card */}
            <Reveal delay={200} direction="up">
              <div className="bg-gray-800/30 backdrop-blur-md rounded-3xl border border-purple-500/20 hover:bg-gray-800/50 hover:border-purple-500/40 transition-all duration-300 overflow-hidden flex flex-col md:flex-row-reverse group">
                <div className="md:w-1/3 bg-black/20 p-10 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-[#00E5FF] to-[#7B61FF]"></div>
                  <Database className="w-12 h-12 text-[#00E5FF] mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-3xl font-bold text-white mb-2">For CTOs & Data Leads</h3>
                  <p className="text-gray-400 font-medium">Proper data architecture, not duct tape.</p>
                </div>
                <div className="md:w-2/3 p-10 md:p-12 flex items-center">
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    This isn't a Zapier chain held together with duct tape — it's proper data architecture. That means data pipelines built to handle scale and failure gracefully, a data warehouse designed for how your analytics team actually queries it, and API-level system integration that's documented and maintainable. Data quality and governance run alongside the integration itself.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What's Included - Glass/Light Cards */}
      <section className="py-32 px-6 md:px-12 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:30px_30px] opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-sm font-bold tracking-widest text-[#7B61FF] uppercase mb-3">Capabilities</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-[#1C1F26] tracking-tight">
                Everything required to connect your business.
              </h3>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {includedServices.map((service, index) => (
              <Reveal key={index} delay={index * 50}>
                <div className="bg-[#2D3545] p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white/10 hover:border-[#7B61FF]/30 hover:shadow-[0_8px_30px_rgb(123,97,255,0.1)] hover:-translate-y-2 transition-all duration-300 h-full flex flex-col group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7B61FF] to-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="mb-6 w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#7B61FF]/10 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#7B61FF] transition-colors">{service.title}</h4>
                  <p className="text-gray-400 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work - Alternating Timeline */}
      <section className="py-32 px-6 md:px-12 bg-[#1C1F26] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
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

      {/* Who This Is For - Clean Checkmark Grid */}
      <section className="py-24 px-6 md:px-12 relative border-b border-slate-800" style={{ background: 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 tracking-tight text-center">Who This Is For</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              "Founders tired of three different spreadsheets giving three different answers for the same metric.",
              "Operations teams manually copying data between a CRM, payments system, and accounting software.",
              "CTOs and data leads who need proper data architecture instead of a fragile patchwork of automations.",
              "Companies that have the data but not the dashboards leadership actually trusts.",
              "Businesses preparing for a fundraise or acquisition that need clean, defensible reporting."
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100} className={i === 4 ? 'sm:col-span-2 sm:flex sm:justify-center' : ''}>
                <div className={`group relative overflow-hidden bg-[#0F172A] p-8 rounded-2xl shadow-xl border border-slate-800 hover:border-[#7B61FF]/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#7B61FF]/10 transition-all duration-300 flex gap-4 h-full ${i === 4 ? 'sm:max-w-[calc(50%-0.75rem)] sm:min-h-[154px]' : ''}`}>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7B61FF] to-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CheckCircle className="w-6 h-6 text-[#00E5FF] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <p className="text-[#E2E8F0] text-lg font-medium leading-relaxed">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-12 bg-[#2D3545]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-300 text-lg">Direct answers to help you plan your integrations.</p>
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
      <section className="py-24 px-6 md:px-12" style={{ background: 'linear-gradient(90deg, #7B61FF 0%, #ff00a0 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">Related Services</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { category: "BUILD", title: "Product & Software Engineering", desc: "For building the custom tools your data needs to connect to." },
              { category: "AUTOMATE", title: "AI & Intelligent Automation", desc: "For turning connected data into AI-powered workflows and agents." },
              { category: "OPERATE", title: "CRM, RevOps & Business Operations", desc: "For the sales and ops workflows that run on top of clean data." }
            ].map((srv, i) => (
              <Reveal key={i} delay={i * 100}>
                <a href="#" className="block p-8 rounded-2xl bg-white border border-gray-200 hover:border-[#7B61FF]/50 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group h-full">
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
      <section className="bg-[#1C1F26] py-32 px-6 md:px-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#7B61FF]/40 to-[#00E5FF]/40 rounded-full blur-[120px] pointer-events-none"></div>
        
        <Reveal className="max-w-4xl mx-auto space-y-10 relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-[#FFFFFF]">
            Tired of numbers that don't match across your own systems?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed">
            Tell us what tools you're running and where the data breaks down. We'll show you what a connected system actually looks like.
          </p>
          <div className="pt-8">
            <button className="bg-gradient-to-r from-[#7B61FF] to-[#00E5FF] text-[#FFFFFF] px-12 py-5 rounded-full font-bold text-xl shadow-[0_0_40px_rgba(123,97,255,0.4)] hover:scale-[1.05] transition-all duration-300">
              Start a Conversation
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}