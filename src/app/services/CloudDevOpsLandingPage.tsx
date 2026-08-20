'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Cloud, Server, GitMerge, Search, Activity, TrendingDown, ShieldCheck, Zap, Target, LifeBuoy, AlertTriangle, CheckCircle, Lock, Package, Maximize, ClipboardCheck, Terminal, X, ArrowRight } from 'lucide-react';

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

const capabilitiesData = [
  {
    id: "01",
    cat: "cloud",
    title: "Cloud Architecture",
    searchTerms: "cloud architecture designing systems growth reliability aws gcp azure",
    desc: "Designing how your systems are structured in the cloud for growth and reliability.",
    tags: ["AWS / GCP / Azure", "Multi-Region", "Microservices"],
    metric: "SLA: 99.99% Architecture",
    colorTheme: "text-[#4F46E5] bg-indigo-50 border-indigo-100",
    btnTheme: "bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]",
    icon: <Cloud className="w-5 h-5 text-white" />
  },
  {
    id: "02",
    cat: "cloud",
    title: "Cloud Infrastructure",
    searchTerms: "cloud infrastructure terraform iac servers storage networking",
    desc: "Setting up and managing the actual servers, storage, and networking your product runs on.",
    tags: ["Terraform", "Kubernetes", "VPC / SDN"],
    metric: "Provisioning: 100% IaC",
    colorTheme: "text-[#4F46E5] bg-indigo-50 border-indigo-100",
    btnTheme: "bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]",
    icon: <Server className="w-5 h-5 text-white" />
  },
  {
    id: "03",
    cat: "cicd",
    title: "DevOps & CI/CD",
    searchTerms: "devops ci/cd automation github actions argocd build test release",
    desc: "Automating how code gets built, tested, and released — safely and quickly.",
    tags: ["GitHub Actions", "ArgoCD", "Automated Testing"],
    metric: "Velocity: 10x Faster Releases",
    colorTheme: "text-[#FF00A0] bg-pink-50 border-pink-100",
    btnTheme: "bg-gradient-to-r from-[#7B61FF] to-[#FF00A0]",
    icon: <GitMerge className="w-5 h-5 text-white" />
  },
  {
    id: "04",
    cat: "cloud",
    title: "Infrastructure Assessment",
    searchTerms: "infrastructure assessment audit fragile outdated review legacy",
    desc: "Reviewing your current setup to find what's fragile, bottlenecked, or outdated.",
    tags: ["Pillar Audit", "Risk Matrix", "Remediation Roadmap"],
    metric: "Turnaround: 5-Day Diagnostic",
    colorTheme: "text-[#4F46E5] bg-indigo-50 border-indigo-100",
    btnTheme: "bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]",
    icon: <Search className="w-5 h-5 text-white" />
  },
  {
    id: "05",
    cat: "obs",
    title: "Observability & Monitoring",
    searchTerms: "observability monitoring datadog prometheus grafana real time telemetry",
    desc: "Keeping continuous visibility into how your systems are performing, in real time.",
    tags: ["Datadog", "Prometheus / Grafana", "OpenTelemetry"],
    metric: "Detection: Real-time Telemetry",
    colorTheme: "text-[#06B6D4] bg-cyan-50 border-cyan-100",
    btnTheme: "bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]",
    icon: <Activity className="w-5 h-5 text-white" />
  },
  {
    id: "06",
    cat: "finops",
    title: "FinOps & Cost Optimization",
    searchTerms: "finops cloud cost optimization savings waste kubecost aws cost explorer",
    desc: "Making sure you're not overpaying for cloud resources you don't need or use.",
    tags: ["Kubecost", "Autoscaling", "Spot Instances"],
    metric: "Avg Savings: 20% to 35%",
    colorTheme: "text-[#7B61FF] bg-purple-50 border-purple-100",
    btnTheme: "bg-gradient-to-r from-[#7B61FF] to-[#FF00A0]",
    icon: <TrendingDown className="w-5 h-5 text-white" />
  },
  {
    id: "07",
    cat: "resilience",
    title: "Reliability & Resilience",
    searchTerms: "reliability resilience chaos engineering fault tolerance failover",
    desc: "Building systems that keep working smoothly even when individual parts of them fail.",
    tags: ["Chaos Mesh", "Circuit Breakers", "Self-Healing"],
    metric: "Uptime Target: 99.99%",
    colorTheme: "text-rose-600 bg-rose-50 border-rose-100",
    btnTheme: "bg-rose-600",
    icon: <ShieldCheck className="w-5 h-5 text-white" />
  },
  {
    id: "08",
    cat: "finops",
    title: "Performance & Scalability",
    searchTerms: "performance scalability load testing k6 latency caching redis cdn",
    desc: "Making sure your product stays fast as usage grows exponentially, not just at launch.",
    tags: ["k6 Load Tests", "Redis Caching", "CDN & Edge"],
    metric: "Latency Target: < 50ms p95",
    colorTheme: "text-[#7B61FF] bg-purple-50 border-purple-100",
    btnTheme: "bg-gradient-to-r from-[#7B61FF] to-[#FF00A0]",
    icon: <Zap className="w-5 h-5 text-white" />
  },
  {
    id: "09",
    cat: "obs",
    title: "Availability & SLO Management",
    searchTerms: "availability slo management sli error budgets uptime targets",
    desc: "Setting and tracking clear operational targets for how reliably your product stays online.",
    tags: ["SLO / SLI Matrix", "Error Budgets", "Burn-rate Alerts"],
    metric: "Governance: Automated Error Budget",
    colorTheme: "text-[#06B6D4] bg-cyan-50 border-cyan-100",
    btnTheme: "bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]",
    icon: <Target className="w-5 h-5 text-white" />
  },
  {
    id: "10",
    cat: "resilience",
    title: "Disaster Recovery & Continuity",
    searchTerms: "disaster recovery business continuity dr failover backup rpo rto",
    desc: "A tested plan to get your systems back up and running fast if something major breaks.",
    tags: ["RPO < 1 Min", "RTO < 15 Mins", "Geo-Redundancy"],
    metric: "RTO Guarantee: < 15 Mins",
    colorTheme: "text-rose-600 bg-rose-50 border-rose-100",
    btnTheme: "bg-rose-600",
    icon: <LifeBuoy className="w-5 h-5 text-white" />
  },
  {
    id: "11",
    cat: "obs",
    title: "Incident Management",
    searchTerms: "incident management pagerduty postmortem mttr oncall process outages",
    desc: "A clear, automated process for handling outages or production issues when they happen.",
    tags: ["PagerDuty / Opsgenie", "Blameless RCA", "Runbooks"],
    metric: "MTTR: < 15 Mins Response",
    colorTheme: "text-[#06B6D4] bg-cyan-50 border-cyan-100",
    btnTheme: "bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]",
    icon: <AlertTriangle className="w-5 h-5 text-white" />
  },
  {
    id: "12",
    cat: "cicd",
    title: "Deployment Safety",
    searchTerms: "deployment release safety canary blue green progressive rollout zero downtime",
    desc: "Making sure new software releases never accidentally break production features.",
    tags: ["Canary Deployments", "Blue/Green", "Auto-Rollbacks"],
    metric: "Downtime: 0 Seconds",
    colorTheme: "text-[#FF00A0] bg-pink-50 border-pink-100",
    btnTheme: "bg-gradient-to-r from-[#7B61FF] to-[#FF00A0]",
    icon: <CheckCircle className="w-5 h-5 text-white" />
  },
  {
    id: "13",
    cat: "resilience",
    title: "Data Protection & Recovery",
    searchTerms: "data protection recovery backup restore encryption snapshots automated",
    desc: "Backing up and safeguarding your critical data so it can be restored quickly if lost.",
    tags: ["AES-256 Encryption", "Automated Backups", "Point-in-Time Restore"],
    metric: "Integrity: 100% Validated Restores",
    colorTheme: "text-rose-600 bg-rose-50 border-rose-100",
    btnTheme: "bg-rose-600",
    icon: <Lock className="w-5 h-5 text-white" />
  },
  {
    id: "14",
    cat: "cicd",
    title: "Dependency Management",
    searchTerms: "dependency management renovate dependabot cve vulnerability updates",
    desc: "Keeping track of and updating the external tools/libraries your systems rely on.",
    tags: ["Renovate Bot", "Snyk / Dependabot", "Automated PRs"],
    metric: "CVE Patching: Automated",
    colorTheme: "text-[#FF00A0] bg-pink-50 border-pink-100",
    btnTheme: "bg-gradient-to-r from-[#7B61FF] to-[#FF00A0]",
    icon: <Package className="w-5 h-5 text-white" />
  },
  {
    id: "15",
    cat: "cloud",
    title: "Capacity Planning",
    searchTerms: "capacity planning load forecasting infrastructure growth scaling load spike",
    desc: "Forecasting future user load so infrastructure is ready well before you actually need it.",
    tags: ["Traffic Modeling", "Autoscaling Limits", "Quota Headroom"],
    metric: "Buffer: 3x Peak Load Ready",
    colorTheme: "text-[#4F46E5] bg-indigo-50 border-indigo-100",
    btnTheme: "bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]",
    icon: <Maximize className="w-5 h-5 text-white" />
  },
  {
    id: "16",
    cat: "cicd",
    title: "Operational Readiness",
    searchTerms: "operational readiness production review team preparation runbooks game days",
    desc: "Making sure your team and systems are actually prepared to run reliably in production.",
    tags: ["Production Readiness Review", "Game Days", "Runbook Audits"],
    metric: "Readiness Score: 100% Checklist",
    colorTheme: "text-[#FF00A0] bg-pink-50 border-pink-100",
    btnTheme: "bg-gradient-to-r from-[#7B61FF] to-[#FF00A0]",
    icon: <ClipboardCheck className="w-5 h-5 text-white" />
  },
  {
    id: "17",
    cat: "cloud",
    title: "Platform Engineering",
    searchTerms: "platform engineering internal developer platform idp backstage developer experience velocity",
    desc: "Building the internal tools and platforms that make your engineering team ship faster.",
    tags: ["Backstage IDP", "Self-Service Portals", "Golden Paths"],
    metric: "Dev Speed: 50% Onboarding Cut",
    colorTheme: "text-[#4F46E5] bg-indigo-50 border-indigo-100",
    btnTheme: "bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]",
    icon: <Terminal className="w-5 h-5 text-white" />
  }
];

export default function CloudDevOpsLandingPage({ onBack }: { onBack: () => void }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCap, setSelectedCap] = useState<any>(null);

  const filteredCapabilities = capabilitiesData.filter(cap => {
    const matchesCat = activeCategory === 'all' || cap.cat === activeCategory;
    const matchesSearch = cap.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cap.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cap.searchTerms.includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 scroll-smooth selection:bg-[#FF00A0] selection:text-white">
      
      {/* Hero Section - Increased top padding (pt-24 sm:pt-28 lg:pt-36) to push content nicely down from the header */}
      <section id="hero" className="relative pt-24 sm:pt-28 lg:pt-36 pb-24 lg:pb-32 bg-[#0F172A] overflow-hidden">
        
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#7B61FF] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
        
        <div className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center flex flex-col items-center z-10">
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FFFFFF] leading-[1.1] mb-8">
            Stay online and stay affordable <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#FF00A0]">as you grow.</span>
          </h1>

          <p className="text-[#E2E8F0] text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto font-light mb-12">
            Cloud, DevOps & Reliability Engineering — the <strong className="text-white font-bold">"Scale"</strong> step in the MotionLabs system, sitting between <strong className="text-[#06B6D4] font-semibold">Automate</strong> and <strong className="text-[#FF00A0] font-semibold">Secure</strong>. Scaling makes sure growth doesn't break the product or the budget.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#FFFFFF] bg-gradient-to-r from-[#7B61FF] to-[#FF00A0] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(123,97,255,0.4)] flex items-center justify-center space-x-2">
              <span>Get a Quote</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#FFFFFF] bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center space-x-2">
              <Terminal className="w-5 h-5" />
              <span>Talk to an Engineer</span>
            </button>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section id="why-it-matters" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-widest block mb-2">Why It Matters</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Keep performance high & costs low as traffic scales
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              As your product gets more users, the systems behind it need to handle the load without breaking or draining your budget. We set up the cloud infrastructure, automate deployments so releases are safe and fast, keep an eye on performance around the clock, and make sure there's a recovery plan if something ever goes wrong.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { num: "01", color: "text-[#06B6D4]", bg: "bg-cyan-50", title: "Who's Affected", desc: "Products rapidly gaining users, traffic, or data volume." },
            { num: "02", color: "text-[#FF00A0]", bg: "bg-fuchsia-50", title: "What We Set Up", desc: "Cloud infrastructure configured for real growth, not guesswork." },
            { num: "03", color: "text-[#7B61FF]", bg: "bg-purple-50", title: "What We Automate", desc: "CI/CD releases so shipping updates never risks downtime." },
            { num: "04", color: "text-[#4F46E5]", bg: "bg-indigo-50", title: "What We Watch", desc: "24/7 observability to fix issues before customers notice." },
            { num: "05", color: "text-rose-600", bg: "bg-rose-50", title: "What You Get", desc: "A bulletproof disaster recovery plan for when issues occur." }
          ].map((item, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg transition-all text-center flex flex-col justify-between h-full">
                <div>
                  <div className={`w-10 h-10 mx-auto mb-3 rounded-xl ${item.bg} ${item.color} flex items-center justify-center font-black text-xs`}>{item.num}</div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-[#FF00A0] text-xs font-mono font-bold mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FF00A0] animate-ping"></span>
              <span>17 CORE ENGINEERING CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Modular Cloud & Reliability Engineering
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Production-grade capabilities engineered for seamless scaling, resilient operations, and continuous cost optimization.
            </p>
          </div>
        </Reveal>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 bg-slate-100/90 p-3 rounded-2xl border border-slate-200">
          <div className="flex flex-wrap items-center justify-center gap-1.5 w-full lg:w-auto text-xs font-medium">
            {[
              { id: 'all', label: 'All Domains (17)' },
              { id: 'cloud', label: '☁️ Cloud & Infra' },
              { id: 'cicd', label: '⚡ CI/CD & Deploy' },
              { id: 'obs', label: '📈 Observability' },
              { id: 'finops', label: '💸 FinOps' },
              { id: 'resilience', label: '🛡️ Resilience' }
            ].map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl transition-all font-semibold ${activeCategory === cat.id ? 'bg-[#0F172A] text-[#FFFFFF] shadow-md' : 'text-[#475569] hover:text-[#0F172A] hover:bg-white/80'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <input 
              type="text" 
              placeholder="Search by name, tool, or spec..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 pl-9 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF00A0]/30 focus:border-[#FF00A0] shadow-sm transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCapabilities.map((cap) => (
            <Reveal key={cap.id}>
              <div 
                onClick={() => setSelectedCap(cap)}
                className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase ${cap.colorTheme}`}>
                      {cap.id} · {cap.title}
                    </span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm ${cap.btnTheme}`}>
                      {cap.icon}
                    </div>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-2">{cap.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{cap.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cap.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
                  <span>{cap.metric}</span>
                  <span className="text-slate-400 group-hover:text-[#FF00A0] transition-colors">Inspect →</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-white bg-gradient-to-r from-[#7B61FF] to-[#FF00A0] relative shadow-2xl overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#FFFFFF] drop-shadow-md">
            Let’s Scale Your Next Big Idea
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="px-8 py-4 rounded-full text-sm font-extrabold text-slate-900 bg-white hover:bg-slate-100 shadow-xl transition-all transform hover:-translate-y-0.5">
              Get a Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Page Step Navigation */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <button onClick={onBack} className="w-full sm:w-auto p-4 rounded-xl border border-slate-200 hover:border-[#FF00A0] bg-white shadow-sm transition-all flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-[#FF00A0] group-hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">← Previous Step</span>
              <span className="text-xs font-bold text-slate-800 group-hover:text-[#FF00A0]">AUTOMATE — AI & Intelligent Automation</span>
            </div>
          </button>
        </div>
      </section>


      {/* Spec Modal */}
      {selectedCap && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button onClick={() => setSelectedCap(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1">
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center justify-between mb-4 mt-2">
              <span className="text-xs font-mono font-bold text-[#FF00A0] bg-pink-50 border border-pink-200 px-2.5 py-1 rounded-full">{selectedCap.id}</span>
              <span className="text-xs font-mono text-slate-400">MotionLabs Spec Sheet</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">{selectedCap.title}</h3>
            <p className="text-slate-600 text-xs leading-relaxed mb-5">{selectedCap.desc}</p>
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-xs space-y-2.5 mb-6">
              <div className="flex justify-between items-center"><span className="text-slate-500">Core SLA Guarantee:</span> <span className="text-emerald-600 font-bold font-mono">{selectedCap.metric}</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-500">Delivery Model:</span> <span className="text-[#FF00A0] font-semibold font-mono">100% Infrastructure-as-Code (IaC)</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-500">Telemetry Integration:</span> <span className="text-[#06B6D4] font-semibold font-mono">24/7 Automated Observability</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-500">Governance Tier:</span> <span className="text-slate-800 font-semibold font-mono">Enterprise SOC2 / ISO Compliant</span></div>
            </div>

            <button onClick={() => setSelectedCap(null)} className="w-full py-3 bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white font-bold text-xs rounded-full shadow-lg hover:brightness-110 transition-all">
              Close Technical Specs
            </button>
          </div>
        </div>
      )}

    </div>
  );
}