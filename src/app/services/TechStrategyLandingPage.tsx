'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Compass, Map, Search, Target, Layers, ShieldAlert, Cpu, CloudRain, Zap, ArrowRight, CheckCircle, Lightbulb, Terminal } from 'lucide-react';

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
  {
    icon: <Search className="w-8 h-8 text-[#7B61FF]" />,
    title: "Technology Audit & Assessment",
    description: "A clear-eyed look at what you have today — what's working, what's fragile, and what's quietly costing you time or money."
  },
  {
    icon: <Compass className="w-8 h-8 text-[#06B6D4]" />,
    title: "Digital Transformation Strategy",
    description: "A plan for how your business adopts new technology and ways of working, sequenced so nothing breaks along the way."
  },
  {
    icon: <Map className="w-8 h-8 text-[#FF00A0]" />,
    title: "Technology Roadmaps",
    description: "A prioritized plan of what to build or fix next, and in what order, so decisions aren't made one fire at a time."
  },
  {
    icon: <Layers className="w-8 h-8 text-[#4F46E5]" />,
    title: "Solution Architecture",
    description: "The technical blueprint for how a system should be built — the plan an engineering team builds from."
  },
  {
    icon: <ShieldAlert className="w-8 h-8 text-[#7B61FF]" />,
    title: "Technical Due Diligence",
    description: "An independent review of your systems and codebase, typically ahead of funding, acquisition, or a major vendor decision."
  },
  {
    icon: <Cpu className="w-8 h-8 text-[#06B6D4]" />,
    title: "AI Readiness Assessment",
    description: "An honest evaluation of whether your data, systems, and team are actually ready for AI — and what needs to happen first if not."
  },
  {
    icon: <CloudRain className="w-8 h-8 text-[#FF00A0]" />,
    title: "Cloud Readiness Assessment",
    description: "A review of whether and how your systems should move to the cloud, and what that migration would actually involve."
  },
  {
    icon: <Zap className="w-8 h-8 text-[#4F46E5]" />,
    title: "Automation Opportunity Assessment",
    description: "Identifying which of your team's manual, repetitive tasks are genuinely worth automating first."
  },
  {
    icon: <Target className="w-8 h-8 text-[#7B61FF]" />,
    title: "Technology / Vendor Evaluation",
    description: "Independent guidance on choosing between platforms, tools, or vendors — based on your actual needs, not a sales pitch."
  }
];

const whyItMattersPoints = [
  {
    label: "Who it's for",
    text: "Founders and leadership teams about to commit budget to a major technology decision — a rebuild, an AI initiative, a cloud migration, or a new platform"
  },
  {
    label: "What we assess",
    text: "Your current systems, technical debt, team capacity, and how ready you actually are for what you're considering"
  },
  {
    label: "What we produce",
    text: "A roadmap and set of recommendations sequenced by impact and cost — not a generic best-practices checklist"
  },
  {
    label: "What we're honest about",
    text: "Whether AI or cloud adoption is the right move right now, or a distraction from a more pressing gap"
  },
  {
    label: "What you get",
    text: "Clarity before commitment — a direction your team, vendors, and future hires can all build against"
  }
];

export default function TechStrategyLandingPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 scroll-smooth selection:bg-[#7B61FF]/20">
      
      {/* Hero Section - Matching VAPT Padding */}
      <section id="hero" className="relative pt-32 lg:pt-40 pb-24 lg:pb-32 bg-[#0F172A] overflow-hidden">
        
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#7B61FF] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        
        <div className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center flex flex-col items-center z-10">
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FFFFFF] leading-[1.1] mb-8">
            Know what to build, <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#06B6D4]">
                before you build it.
              </span>
          </h1>

          <p className="text-[#E2E8F0] text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto font-light mb-12">
            Technology Strategy & Advisory is the <strong className="text-white">"Strategy"</strong> step in the MotionLabs system — the starting point before Build (turning the roadmap into working software). It's where we figure out what your technology actually needs, so every dollar you spend afterward goes toward the right thing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#FFFFFF] bg-gradient-to-r from-[#7B61FF] to-[#FF00A0] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(123,97,255,0.4)] flex items-center justify-center space-x-2">
                <span>Get a Quote</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#FFFFFF] bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center space-x-2">
                <Terminal className="w-5 h-5" />
                <span>Contact Us</span>
              </button>
          </div>
        </div>
      </section>

      {/* Why It Matters Section - CHANGED TO WHITE BACKGROUND */}
      <section id="why-it-matters" className="py-24 px-6 md:px-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-6">
            <Reveal>
              <h2 className="text-sm font-bold tracking-widest text-[#7B61FF] uppercase mb-3">Why It Matters</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight">
                What is a technology strategy engagement, and why does it come first?
              </h3>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-5">
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                  A technology strategy engagement is an audit and planning phase that tells you where your systems stand today and what they need to become — before any code is written or any vendor contract is signed. Most technology spend goes to waste not because the work was done badly, but because it was the wrong work for where the business actually stood. We audit your current systems, map out a realistic roadmap, and tell you honestly whether you're ready to adopt AI or move to the cloud.
                </p>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                  For a CTO or technical lead, that means a structured technical due diligence process — architecture review, vendor and tooling evaluation, a documented roadmap with sequencing and dependencies — the kind of artifact you can hand to a board, an investor, or an engineering team and have them actually build against. For a founder or non-technical operator, it means an honest answer, in plain English, on what's worth investing in now versus later, before you commit budget to a direction that doesn't fit.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="flex-1 w-full">
            <Reveal delay={200} direction="left">
              <div className="bg-[#0F172A] rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#7B61FF]/20 to-transparent rounded-bl-full pointer-events-none"></div>
                <div className="space-y-6 relative z-10">
                  {whyItMattersPoints.map((point, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-[#00E5FF]" />
                      </div>
                      <div>
                        <span className="text-[#FFFFFF] font-bold block mb-1">{point.label}</span>
                        <span className="text-[#E2E8F0] block leading-relaxed">{point.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What's Included Section - MATCHING THE DARK THEME */}
      <section id="whats-included" className="py-24 px-6 md:px-12 bg-[#2D3545]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-widest text-[#06B6D4] uppercase mb-3">What's Included</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Clarity before commitment.
              </h3>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedServices.map((service, index) => (
              <Reveal key={index} delay={index * 100}>
                <div className="bg-[#0F172A] p-8 rounded-2xl border border-slate-800 hover:border-slate-600 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-2xl inline-block w-fit group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold text-[#FFFFFF] mb-3">{service.title}</h4>
                  <p className="text-[#E2E8F0] leading-relaxed text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}