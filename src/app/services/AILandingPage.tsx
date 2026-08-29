'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bot, MessageSquare, UserPlus, GitMerge, Settings, Wrench, Database, Network, Lightbulb, ArrowRight, CheckCircle, Cpu, Terminal } from 'lucide-react';

function AIReveal({ children, delay = 0, className = "", direction = "up" }: { children: React.ReactNode, delay?: number, className?: string, direction?: "up" | "down" | "left" | "right" }) {
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

const aiIncludedServices = [
  {
    icon: <Lightbulb className="w-8 h-8 text-[#7B61FF]" />,
    title: "AI Strategy & Transformation",
    description: "Figuring out where AI genuinely fits into your business, and planning the shift: from opportunity mapping to a phased rollout plan a technical team can actually execute against."
  },
  {
    icon: <Bot className="w-8 h-8 text-[#06B6D4]" />,
    title: "AI Agents",
    description: "Software that can carry out multi-step tasks on its own, not just answer questions, but take actions: pulling data, making decisions within set rules, and completing a workflow end-to-end."
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-[#FF00A0]" />,
    title: "AI Chatbots",
    description: "Conversational tools that handle customer or team questions automatically, trained on your own content so responses stay accurate and on-brand."
  },
  {
    icon: <UserPlus className="w-8 h-8 text-[#4F46E5]" />,
    title: "AI Copilots",
    description: "AI assistants built into your team's existing tools (CRM, helpdesk, internal dashboards) to help them work faster, without switching context."
  },
  {
    icon: <GitMerge className="w-8 h-8 text-[#7B61FF]" />,
    title: "AI Workflow Automation",
    description: "Using AI to handle steps in a process that used to need a person (triaging, drafting, tagging, summarizing) inside your existing tool stack."
  },
  {
    icon: <Settings className="w-8 h-8 text-[#06B6D4]" />,
    title: "Business Process Automation",
    description: "Automating repetitive operational tasks, with or without AI involved, so manual steps don't become the bottleneck as you grow."
  },
  {
    icon: <Wrench className="w-8 h-8 text-[#FF00A0]" />,
    title: "AI-Powered Internal Tools",
    description: "Custom internal software with AI built in from the ground up, purpose-built for how your team actually works, not a generic off-the-shelf tool."
  },
  {
    icon: <Database className="w-8 h-8 text-[#4F46E5]" />,
    title: "RAG & Knowledge Systems",
    description: "Connecting AI to your own documents and data (retrieval-augmented generation) so its answers are accurate, current, and grounded in your actual knowledge base, not just what a model was trained on."
  },
  {
    icon: <Network className="w-8 h-8 text-[#7B61FF]" />,
    title: "AI/API Integration",
    description: "Plugging AI capabilities into your existing systems and tools via API, so automation works with the software you already run, not around it."
  }
];

const aiWhyItMattersPoints = [
  {
    label: "Who it's for",
    text: "Any team spending real hours on repetitive, rules-based work"
  },
  {
    label: "What we identify",
    text: "The specific tasks where AI actually saves time, not AI for its own sake"
  },
  {
    label: "What we build",
    text: "The assistant or agent itself, designed around a clear strategy first, with the right architecture for reliability and security"
  },
  {
    label: "What we connect it to",
    text: "Your existing tools and knowledge base, so answers and actions are based on real, current information"
  },
  {
    label: "What you get",
    text: "Automation built safely into how your team already operates: governed, maintainable, and measurable, not a one-off experiment"
  }
];

export default function AILandingPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 scroll-smooth selection:bg-[#7B61FF]/20">
      
      {/* 
        The duplicate MotionLabsHeader component has been completely removed.
        Your layout.tsx global header will now seamlessly cover this top area!
      */}

      {/* Hero Section - Matching VAPT Padding */}
      <section id="hero" className="relative pt-32 lg:pt-40 pb-24 lg:pb-32 bg-[#0F172A] overflow-hidden">
        
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#7B61FF] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        
        <div className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center flex flex-col items-center z-10">
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FFFFFF] leading-[1.1] mb-8">
            Let AI handle the repetitive work. <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#06B6D4]">
                so your team doesn't have to.
              </span>
          </h1>

          <p className="text-[#E2E8F0] text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto font-light mb-12">
            AI & Intelligent Automation is the <strong className="text-white">"Automate"</strong> step in the MotionLabs system, sitting between Connect (getting your systems talking to each other) and Scale (making sure things hold up under growth). Automation is what turns connected data into time saved, using AI agents, chatbots, copilots, and workflow automation built around how your team actually works.
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

      {/* Why It Matters */}
      <section id="why-it-matters" className="py-24 px-6 md:px-12" style={{ background: 'linear-gradient(160deg, #7B61FF 0%, #00E5FF 100%)' }}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-6">
            <AIReveal>
              <h2 className="text-sm font-bold tracking-widest text-white/90 uppercase mb-3">Why It Matters</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
                What is AI automation, and why does it matter for a business?
              </h3>
            </AIReveal>
            <AIReveal delay={100}>
              <div className="space-y-5">
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  AI automation means using AI models and agents to take over repetitive, rules-based work, so people spend time on judgment calls, not data entry. Beyond the hype, this is about identifying where AI genuinely saves your team time: answering customer questions, drafting first-pass documents, routing work, updating records, and building it safely into how you already operate, not bolting it on as an experiment.
                </p>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  For a CTO or technical lead, that means: a defined architecture (agent orchestration, API integrations, RAG pipelines where relevant), a security and access-control model appropriate to your data, and a build that's designed to be maintained, not a fragile prompt-chain demo. For a founder or ops lead, it means fewer hours lost to repetitive tasks, without having to become an AI expert to get there.
                </p>
              </div>
            </AIReveal>
          </div>

          <div className="flex-1 w-full">
            <AIReveal delay={200} direction="left">
              <div className="bg-[#0F172A] rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#06B6D4]/20 to-transparent rounded-bl-full pointer-events-none"></div>
                <div className="space-y-6 relative z-10">
                  {aiWhyItMattersPoints.map((point, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <span className="text-[#FFFFFF] font-bold block mb-1">{point.label}</span>
                        <span className="text-[#E2E8F0] block leading-relaxed">{point.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AIReveal>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section id="whats-included" className="py-24 px-6 md:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <AIReveal>
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-widest text-[#4F46E5] uppercase mb-3">What's Included</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight">
                Everything you need to automate safely.
              </h3>
            </div>
          </AIReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiIncludedServices.map((service, index) => (
              <AIReveal key={index} delay={index * 100}>
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
              </AIReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}