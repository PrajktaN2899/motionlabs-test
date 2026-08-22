'use client';
import React, { useState } from 'react';
import { 
  ShieldCheck, Terminal, Cpu, Cloud, Smartphone, Code, 
  CheckCircle, ChevronDown, ChevronUp, ArrowRight, X, Sparkles
} from 'lucide-react';

// Scroll Reveal Animation Component
function Reveal({ children, delay = 0, className = "", direction = "up" }: { children: React.ReactNode, delay?: number, className?: string, direction?: "up" | "down" | "left" | "right" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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

const VaptShieldCheckIcon = ({ className = "w-6 h-6" }) => <ShieldCheck className={className} />;
const VaptTerminalIcon = ({ className = "w-6 h-6" }) => <Terminal className={className} />;
const VaptCpuChipIcon = ({ className = "w-6 h-6" }) => <Cpu className={className} />;
const VaptCloudServerIcon = ({ className = "w-6 h-6" }) => <Cloud className={className} />;
const VaptMobileDeviceIcon = ({ className = "w-6 h-6" }) => <Smartphone className={className} />;
const VaptCodeApiIcon = ({ className = "w-6 h-6" }) => <Code className={className} />;
const VaptCheckCircleIcon = ({ className = "w-5 h-5" }) => <CheckCircle className={className} />;
const VaptChevronDownIcon = ({ className = "w-5 h-5" }) => <ChevronDown className={className} />;
const VaptArrowRightIcon = ({ className = "w-5 h-5" }) => <ArrowRight className={className} />;
const VaptCloseIcon = ({ className = "w-6 h-6" }) => <X className={className} />;

export default function VaptLandingPage({ onBack }: { onBack?: () => void }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isEngineerModalOpen, setIsEngineerModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '', email: '', company: '', role: 'Founder',
    targetScope: ['Web Application'], timeline: 'Within 2 weeks', notes: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleScopeToggle = (scopeName: string) => {
    setFormData(prev => {
      const exists = prev.targetScope.includes(scopeName);
      if (exists) {
        return { ...prev, targetScope: prev.targetScope.filter(item => item !== scopeName) };
      } else {
        return { ...prev, targetScope: [...prev.targetScope, scopeName] };
      }
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsQuoteModalOpen(false);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 scroll-smooth selection:bg-[#7B61FF] selection:text-white">

      {/* Hero Section */}
      <section id="hero" className="relative pt-24 lg:pt-32 pb-24 lg:pb-32 bg-[#0F172A] overflow-hidden">
        
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#7B61FF] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        
        <div className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center flex flex-col items-center z-10">
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FFFFFF] leading-[1.1] mb-8">
            Find the weak spots <br className="hidden sm:block" />
            before someone else does.
          </h1>

          <p className="text-[#E2E8F0] text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto font-light mb-12">
            We test your website, app, APIs, and cloud infrastructure the way an attacker would — manual and automated testing across the OWASP Top 10, mapped to real business risk, not just a scanner printout. You get a report your engineers can act on and your leadership can actually read.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setIsQuoteModalOpen(true)} className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#FFFFFF] bg-gradient-to-r from-[#7B61FF] to-[#FF00A0] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(123,97,255,0.4)] flex items-center justify-center space-x-2">
              <span>Get a VAPT Quote</span>
              <VaptArrowRightIcon className="w-5 h-5" />
            </button>
            <button onClick={() => setIsEngineerModalOpen(true)} className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#FFFFFF] bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center space-x-2">
              <VaptTerminalIcon className="w-5 h-5" />
              <span>Talk to a Security Engineer</span>
            </button>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 relative" style={{background: 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)'}}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-extrabold text-white mb-4">The Problem</h2>
              <div className="w-16 h-1.5 bg-white/40 rounded-full mx-auto"></div>
            </div>
          </Reveal>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            <Reveal delay={100} direction="right">
              <div className="bg-[#1C1F26] rounded-[2rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden border border-gray-800 flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                  <VaptCodeApiIcon className="w-6 h-6 text-[#06B6D4]" />
                </div>
                <p className="text-gray-300 text-lg leading-relaxed font-light pt-1">
                  Most breaches don't start with a genius hacker. They start with something small — a forgotten admin panel, a misconfigured storage bucket, an API endpoint that trusts input it shouldn't.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={200} direction="left">
              <div className="bg-[#1C1F26] rounded-[2rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden border border-gray-800 flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                  <VaptShieldCheckIcon className="w-6 h-6 text-[#FF00A0]" />
                </div>
                <p className="text-gray-300 text-lg leading-relaxed font-light pt-1">
                  These are the kinds of gaps that slip past automated scanners and CI pipeline checks because they only show up when someone tests the way a real attacker chains issues together. You won't know you have one until someone looks. <strong className="text-white font-bold bg-white/10 px-2 py-0.5 rounded ml-1">We look first.</strong>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What We Test Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">What We Test</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] rounded-[2rem] p-8 shadow-xl flex flex-col justify-between transform transition hover:-translate-y-2">
              <div>
                <VaptTerminalIcon className="w-10 h-10 text-[#FFFFFF] opacity-80 mb-6" />
                <h3 className="text-2xl font-bold text-[#FFFFFF] mb-4">Web Application VAPT</h3>
                <p className="text-[#FFFFFF]/90 text-sm leading-relaxed font-light">We test your website and web app the way a hacker would try to break in — checking login flows, session handling, and how the app behaves under manipulation, not just what an automated scanner flags.</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#7B61FF] to-[#FF00A0] rounded-[2rem] p-8 shadow-xl flex flex-col justify-between transform transition hover:-translate-y-2">
              <div>
                <VaptMobileDeviceIcon className="w-10 h-10 text-[#FFFFFF] opacity-80 mb-6" />
                <h3 className="text-2xl font-bold text-[#FFFFFF] mb-4">Mobile App VAPT (Android & iOS)</h3>
                <p className="text-[#FFFFFF]/90 text-sm leading-relaxed font-light">We check whether your app leaks data or can be tampered with once it's on a user's phone, through static and dynamic analysis, insecure local storage checks, API communication review, and tamper/reverse-engineering resistance testing.</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] rounded-[2rem] p-8 shadow-xl flex flex-col justify-between transform transition hover:-translate-y-2">
              <div>
                <VaptCodeApiIcon className="w-10 h-10 text-[#FFFFFF] opacity-80 mb-6" />
                <h3 className="text-2xl font-bold text-[#FFFFFF] mb-4">API Security Testing</h3>
                <p className="text-[#FFFFFF]/90 text-sm leading-relaxed font-light">APIs are the connections between your systems that most tools never look at closely. We test for broken authentication and authorization (BOLA/BFLA), missing rate limits, injection points, and data over-exposure.</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#7B61FF] to-[#FF00A0] rounded-[2rem] p-8 shadow-xl flex flex-col justify-between transform transition hover:-translate-y-2">
              <div>
                <VaptCpuChipIcon className="w-10 h-10 text-[#FFFFFF] opacity-80 mb-6" />
                <h3 className="text-2xl font-bold text-[#FFFFFF] mb-4">Thick Client & Desktop Testing</h3>
                <p className="text-[#FFFFFF]/90 text-sm leading-relaxed font-light">Desktop software gets the same scrutiny as your website — binary analysis, local credential and storage handling, and client-server communication testing.</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] rounded-[2rem] p-8 shadow-xl flex flex-col justify-between transform transition hover:-translate-y-2">
              <div>
                <VaptCloudServerIcon className="w-10 h-10 text-[#FFFFFF] opacity-80 mb-6" />
                <h3 className="text-2xl font-bold text-[#FFFFFF] mb-4">Cloud & Infrastructure Assessment</h3>
                <p className="text-[#FFFFFF]/90 text-sm leading-relaxed font-light">We check whether your cloud setup is actually locked down — configuration review, IAM and access control audits, and exposure checks against common misconfigurations.</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#7B61FF] to-[#FF00A0] rounded-[2rem] p-8 shadow-xl flex flex-col justify-between transform transition hover:-translate-y-2">
              <div>
                <Sparkles className="w-10 h-10 text-[#FFFFFF] opacity-80 mb-6" />
                <h3 className="text-2xl font-bold text-[#FFFFFF] mb-4">AI & SaaS Security Assessment</h3>
                <p className="text-[#FFFFFF]/90 text-sm leading-relaxed font-light">If you've shipped AI features, they carry new risks — prompt injection, data leakage, and model abuse — alongside multi-tenant isolation testing for SaaS platforms.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-24 bg-[#2D3545]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-widest text-[#06B6D4] uppercase mb-3">Process</h2>
            <h3 className="text-4xl font-extrabold text-white mb-4">How We Work</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Scope & Kickoff", desc: "We agree on target systems, environments, and test windows together, so there are no surprises and no unplanned downtime." },
              { title: "Recon & Threat Modeling", desc: "We map your attack surface before touching anything, the way a real adversary would before an attempt." },
              { title: "Manual + Automated Testing", desc: "Automated tools give us coverage; our engineers manually test for the business-logic flaws and chained exploits tools miss." },
              { title: "Validation", desc: "Every finding is manually confirmed before it goes in the report. No unverified scanner noise for your team to sort through." },
              { title: "Reporting", desc: "Findings are scored by severity (CVSS), backed by proof-of-concept evidence, and explained clearly enough for both an engineer and a board member to understand what's at stake." },
              { title: "Retest & Sign-off", desc: "Once you've fixed the issues, we retest and issue a closure report you can hand to auditors, clients, or your leadership." }
            ].map((step, idx) => (
              <div key={idx} className="bg-[#0F172A] rounded-3xl p-8 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl border border-slate-800">
                <span className="text-[#06B6D4] font-bold text-lg block mb-3">0{idx + 1}</span>
                <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-24 bg-[#0F172A] text-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-extrabold text-[#FFFFFF] mb-8">What You Get</h2>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4"><VaptCheckCircleIcon className="w-6 h-6 text-[#06B6D4] shrink-0 mt-1" /><span className="text-[#E2E8F0] text-lg font-light">An executive summary anyone on your leadership team can read and act on</span></li>
                <li className="flex items-start space-x-4"><VaptCheckCircleIcon className="w-6 h-6 text-[#06B6D4] shrink-0 mt-1" /><span className="text-[#E2E8F0] text-lg font-light">A full technical report your engineers can work from directly, with CVSS-scored findings and proof-of-concept evidence for each issue</span></li>
                <li className="flex items-start space-x-4"><VaptCheckCircleIcon className="w-6 h-6 text-[#06B6D4] shrink-0 mt-1" /><span className="text-[#E2E8F0] text-lg font-light">A prioritized remediation roadmap — what to fix first, and why</span></li>
                <li className="flex items-start space-x-4"><VaptCheckCircleIcon className="w-6 h-6 text-[#06B6D4] shrink-0 mt-1" /><span className="text-[#E2E8F0] text-lg font-light">A retest and closure certificate once fixes are verified</span></li>
                <li className="flex items-start space-x-4"><Sparkles className="w-6 h-6 text-[#FF00A0] shrink-0 mt-1" /><span className="text-[#E2E8F0] text-lg font-light"><strong>Optional:</strong> a compliance-mapping addendum for SOC 2, ISO 27001, PCI-DSS, or GDPR</span></li>
              </ul>
            </div>
            <div>
              <h2 className="text-4xl font-extrabold text-[#FFFFFF] mb-4">Why MotionLabs</h2>
              <p className="text-[#E2E8F0] font-light mb-8 leading-relaxed">We don't hand you a scary PDF full of jargon or an unfiltered scanner export. Every report is written to survive scrutiny from a technical reviewer and a non-technical stakeholder in the same document.</p>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10"><span className="text-[#FFFFFF] block font-bold mb-1">Proven Expertise</span><p className="text-[#E2E8F0] text-sm">We don't just test systems; we build them. Our experienced team provides insights grounded in real exploitability, focusing on actual threats rather than false positives.</p></div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10"><span className="text-[#FFFFFF] block font-bold mb-1">Manual Testing Depth</span><p className="text-[#E2E8F0] text-sm">Manual testing depth that goes beyond automated tooling.</p></div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10"><span className="text-[#FFFFFF] block font-bold mb-1">Audit & Vendor Ready</span><p className="text-[#E2E8F0] text-sm">Reports structured for SOC 2, ISO 27001, and vendor security questionnaires out of the box.</p></div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10"><span className="text-[#FFFFFF] block font-bold mb-1">Fixed-Scope & Fixed-Price</span><p className="text-[#E2E8F0] text-sm">Fixed-scope, fixed-price engagements — no surprise billing mid-project.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="py-24 relative" style={{background: 'linear-gradient(135deg, #7B61FF 0%, #00E5FF 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-12 tracking-tight">Who This Is For</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="bg-[#0F172A] border border-slate-800 p-8 rounded-3xl shadow-xl"><p className="text-[#E2E8F0] font-medium leading-relaxed">Startups closing enterprise deals that require a security assessment.</p></div>
            <div className="bg-[#0F172A] border border-slate-800 p-8 rounded-3xl shadow-xl"><p className="text-[#E2E8F0] font-medium leading-relaxed">SaaS teams preparing for a SOC 2 or ISO 27001 audit.</p></div>
            <div className="bg-[#0F172A] border border-slate-800 p-8 rounded-3xl shadow-xl"><p className="text-[#E2E8F0] font-medium leading-relaxed">Teams shipping AI features who need AI-specific risk coverage.</p></div>
            <div className="bg-[#0F172A] border border-slate-800 p-8 rounded-3xl shadow-xl"><p className="text-[#E2E8F0] font-medium leading-relaxed">Anyone who's had a scanner-only "pentest" before and got 40 pages of unverified noise.</p></div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-12 text-center">FAQ</h2>
          <div className="space-y-4">
            {[
              { q: "Will this slow down our team or affect production?", a: "No. Testing is scoped and scheduled in advance, and we default to staging environments wherever possible." },
              { q: "What's your testing methodology?", a: "We follow the OWASP Testing Guide and OWASP Top 10 for web, OWASP MASVS for mobile, and score severity using CVSS v3.1." },
              { q: "How long does an engagement take?", a: "1–2 weeks for a single web or mobile app; 3–4 weeks for larger scopes covering multiple apps, APIs, and cloud infrastructure." },
              { q: "Do you retest after we fix the issues?", a: "Yes — retesting and a closure report are included in every engagement, at no extra cost." },
              { q: "Can we give this report to our clients or auditors?", a: "Yes — every engagement includes an executive summary for non-technical stakeholders and a full technical report suitable for auditors." }
            ].map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <button onClick={() => setActiveFaq(isOpen ? null : index)} className="w-full text-left p-6 flex items-center justify-between text-[#0F172A] font-bold text-lg focus:outline-none">
                    <span>{faq.q}</span>
                    <VaptChevronDownIcon className={`w-6 h-6 text-[#06B6D4] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && <div className="px-6 pb-6 text-[#475569] font-light leading-relaxed">{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-extrabold text-[#FFFFFF] mb-6 tracking-tight">Know your risk before someone else finds it for you.</h2>
          <p className="text-[#E2E8F0] text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">Send us your target systems and we'll come back within 24 hours with a clear scope, timeline, and fixed price.</p>
          <button onClick={() => setIsQuoteModalOpen(true)} className="px-10 py-5 text-lg font-bold text-[#FFFFFF] bg-gradient-to-r from-[#7B61FF] to-[#FF00A0] rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(123,97,255,0.4)]">Request a VAPT Quote</button>
        </div>
      </section>

      {/* Quote Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0F172A]/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsQuoteModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-[#0F172A]"><VaptCloseIcon className="w-6 h-6" /></button>
            {formSubmitted ? (
              <div className="text-center py-10">
                <VaptCheckCircleIcon className="w-16 h-16 text-[#06B6D4] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Request Received!</h3>
                <p className="text-[#475569]">Our team will review your scope and respond within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-extrabold text-[#0F172A] mb-2">Get a Quote</h3>
                <p className="text-[#475569] mb-8 font-light">Select your target systems for a 24-hour turnaround.</p>
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-[#0F172A] mb-1">Your Name</label>
                    <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#0F172A] focus:outline-none focus:border-[#7B61FF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0F172A] mb-1">Work Email</label>
                    <input type="email" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#0F172A] focus:outline-none focus:border-[#7B61FF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0F172A] mb-2">Target Scope</label>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {["Web Application", "Mobile App", "APIs", "Cloud Infrastructure", "Desktop App", "AI/SaaS"].map((item) => {
                        const selected = formData.targetScope.includes(item);
                        return (
                          <button type="button" key={item} onClick={() => handleScopeToggle(item)} className={`p-3 rounded-xl border text-left font-medium transition-all ${selected ? 'bg-[#0F172A] border-[#0F172A] text-[#FFFFFF]' : 'bg-gray-50 border-gray-200 text-[#475569] hover:border-[#475569]'}`}>{item}</button>
                        );
                      })}
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#7B61FF] to-[#FF00A0] text-[#FFFFFF] font-bold text-lg rounded-xl shadow-lg mt-4 hover:opacity-90">Submit Request</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Engineer Modal */}
      {isEngineerModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0F172A]/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl">
            <button onClick={() => setIsEngineerModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-[#0F172A]"><VaptCloseIcon className="w-6 h-6" /></button>
            <div className="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] rounded-xl flex items-center justify-center mb-6 shadow-lg"><VaptTerminalIcon className="w-6 h-6 text-[#FFFFFF]" /></div>
            <h3 className="text-3xl font-extrabold text-[#0F172A] mb-2">Talk to an Engineer</h3>
            <p className="text-[#475569] mb-8 font-light leading-relaxed">Have technical questions regarding OWASP testing scope, environments, or SOC 2 mapping? Our senior penetration testers are ready to chat directly.</p>
            <div className="space-y-3">
              <a href="mailto:security@motionlabs.in" className="w-full block text-center py-4 bg-[#0F172A] text-[#FFFFFF] font-bold rounded-xl hover:bg-[#0F172A]/90 transition-colors">Email security@motionlabs.in</a>
            </div>
          </div>
        </div>
      )}
  </div> 
  );
}