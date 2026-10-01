'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Phone,
  Mail,
  Linkedin,
  Globe,
  MessageSquare,
  UserPlus,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Code2,
  Sparkles,
  Database,
  TrendingUp,
  Server,
  Tv,
  Send,
  QrCode,
  X,
  Layers,
  Calculator,
  Volume2,
  VolumeX,
  Compass,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';

const PROFILE = {
  name: "Rushikesh Kolhe",
  role: "Founder & Tech Partner",
  company: "MotionLabs",
  tagline: "Startup Tech Partner for Websites & Web-Apps",
  phone: "+91 7020421594",
  phoneRaw: "+917020421594",
  email: "rushi@motionlabs.in",
  linkedin: "https://www.linkedin.com/in/rushikeshkolhe/",
  linkedinHandle: "rushikeshkolhe",
  website: "https://www.motionlabs.in",
  servicesUrl: "https://www.motionlabs.in/services",
  cardUrl: "https://www.motionlabs.in/Rushi_Kolhe/",
  bio: "Helping startups and ambitious companies build custom digital tools—from interactive web applications and AI bots to DevOps cloud pipelines, Salesforce CRM, GTM performance marketing, and creative media.",
  trustedClients: ["Amazon Prime", "Schneider Electric", "Yotta", "Yeepeey", "Champhunt", "Onro"],
  services: [
    {
      id: "web-apps",
      title: "Custom Websites & Web Apps",
      desc: "Interactive budget calculators, quoting systems, and full-scale SaaS platforms built to scale.",
      icon: Code2,
      tag: "Web & SaaS",
      badge: "Core Strength",
      stack: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind"],
      accent: "from-[#4F46E5] to-[#06B6D4]",
      lightBg: "bg-blue-50/70 border-blue-200/80 text-blue-700",
      pillColor: "bg-indigo-50 text-indigo-700 border-indigo-200"
    },
    {
      id: "ai-bots",
      title: "Intelligent Chatbots & Automation",
      desc: "24/7 lead capture, smart support agents, and custom workflow automations using modern LLMs.",
      icon: Sparkles,
      tag: "AI & Agents",
      badge: "High Demand",
      stack: ["LangChain", "OpenAI / Claude", "Python", "Vector DBs", "Webhooks"],
      accent: "from-[#7B61FF] to-[#FF00A0]",
      lightBg: "bg-fuchsia-50/70 border-fuchsia-200/80 text-fuchsia-700",
      pillColor: "bg-pink-50 text-pink-700 border-pink-200"
    },
    {
      id: "salesforce",
      title: "Salesforce Development",
      desc: "Tailored CRM architecture, Lightning workflows, and enterprise automation to maximize pipeline conversion.",
      icon: Database,
      tag: "Salesforce CRM",
      badge: "Enterprise",
      stack: ["Apex", "LWC", "Flow Builder", "REST APIs", "Sales Cloud"],
      accent: "from-[#0284C7] to-[#06B6D4]",
      lightBg: "bg-sky-50/70 border-sky-200/80 text-sky-700",
      pillColor: "bg-sky-50 text-sky-700 border-sky-200"
    },
    {
      id: "gtm-marketing",
      title: "GTM & Performance Marketing",
      desc: "Data-backed Go-To-Market roadmaps, paid multi-channel acquisition campaigns, and scalable user growth loops.",
      icon: TrendingUp,
      tag: "Growth & GTM",
      badge: "Scale Factor",
      stack: ["Meta Ads", "Google Ads", "LinkedIn Ads", "CRO", "Attribution"],
      accent: "from-[#FF00A0] to-[#F59E0B]",
      lightBg: "bg-amber-50/70 border-amber-200/80 text-amber-700",
      pillColor: "bg-amber-50 text-amber-700 border-amber-200"
    },
    {
      id: "devops-cloud",
      title: "DevOps & Cloud Services",
      desc: "Robust CI/CD automation pipelines, containerized deployments, cloud architecture, and 99.9% uptime monitoring.",
      icon: Server,
      tag: "DevOps & Cloud",
      badge: "Infrastructure",
      stack: ["AWS / GCP", "Docker", "Kubernetes", "GitHub Actions", "Terraform"],
      accent: "from-[#10B981] to-[#06B6D4]",
      lightBg: "bg-emerald-50/70 border-emerald-200/80 text-emerald-700",
      pillColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      id: "creative-media",
      title: "Creative Media & Branding Videos",
      desc: "Product explainer videos, investor pitch demos, and visual storytelling tailored to convert users.",
      icon: Tv,
      tag: "Video & Media",
      badge: "Storytelling",
      stack: ["After Effects", "Premiere Pro", "3D Motion", "Scriptwriting", "Voiceover"],
      accent: "from-[#7B61FF] to-[#4F46E5]",
      lightBg: "bg-purple-50/70 border-purple-200/80 text-purple-700",
      pillColor: "bg-purple-50 text-purple-700 border-purple-200"
    }
  ]
};

type ChimeType = 'click' | 'pop' | 'success';

const playChime = (type: ChimeType = 'click', soundEnabled = true) => {
  if (!soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.onended = () => ctx.close();

    const now = ctx.currentTime;
    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'pop') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    }
  } catch {
    // Audio Context fallback if blocked
  }
};

export default function DigitalCard() {
  const [activeTab, setActiveTab] = useState<'card' | 'services' | 'estimator'>('card');
  const [selectedService, setSelectedService] = useState(PROFILE.services[0].id);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showQrModal, setShowQrModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Estimator interactive parameters
  const [scopeTier, setScopeTier] = useState('Growth Stage');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['ai-bot', 'devops']);
  const [customNote] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    playChime('success', soundEnabled);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const copyToClipboard = (text: string, label: string) => {
    playChime('click', soundEnabled);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedField(label);
      triggerToast(`Copied ${label} to clipboard!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      triggerToast(`Failed to copy`);
    }
  };

  const downloadVCard = () => {
    playChime('pop', soundEnabled);
    const vCardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Kolhe;Rushikesh;;;',
      'FN:Rushikesh Kolhe',
      'ORG:MotionLabs',
      'TITLE:Founder & Tech Partner',
      `TEL;TYPE=CELL,VOICE:${PROFILE.phoneRaw}`,
      `EMAIL;TYPE=PREF,INTERNET:${PROFILE.email}`,
      `URL;TYPE=WORK:${PROFILE.website}`,
      `URL;TYPE=SERVICES:${PROFILE.servicesUrl}`,
      `URL;TYPE=LINKEDIN:${PROFILE.linkedin}`,
      'NOTE:Startup Tech Partner for Websites & Web-Apps, AI Chatbots, Salesforce CRM, DevOps and GTM Marketing.',
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', 'Rushikesh_Kolhe_MotionLabs.vcf');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerToast('Contact (.vcf) downloaded!');
  };

  const toggleAddon = (addonId: string) => {
    playChime('click', soundEnabled);
    setSelectedAddons(prev =>
      prev.includes(addonId) ? prev.filter(item => item !== addonId) : [...prev, addonId]
    );
  };

  const activeServiceObj = useMemo(() => {
    return PROFILE.services.find(s => s.id === selectedService) || PROFILE.services[0];
  }, [selectedService]);

  const dynamicDeliverables = useMemo(() => {
    const list = [
      `${scopeTier} Architecture & Implementation`,
      `Full Code Ownership & Technical Specs`,
      `MotionLabs QA & Performance Testing`
    ];
    if (selectedAddons.includes('ai-bot')) list.push('AI Chatbot & Smart Automation Agent');
    if (selectedAddons.includes('devops')) list.push('DevOps CI/CD & Cloud Infrastructure Setup');
    if (selectedAddons.includes('gtm')) list.push('GTM Launch Strategy & Performance Tracking');
    if (selectedAddons.includes('media')) list.push('High-Impact Product Video / Motion Reel');
    return list;
  }, [scopeTier, selectedAddons]);

  const dispatchWhatsAppQuote = () => {
    playChime('success', soundEnabled);
    const addonsLabel = selectedAddons.map(id => {
      if (id === 'ai-bot') return 'AI Automation';
      if (id === 'devops') return 'DevOps Setup';
      if (id === 'gtm') return 'GTM Performance';
      if (id === 'media') return 'Creative Video';
      return id;
    }).join(', ') || 'None';

    const msg = encodeURIComponent(
      `Hello Rushikesh, I viewed your MotionLabs digital card and would like to discuss a project:\n\n` +
      `*Primary Service:* ${activeServiceObj.title}\n` +
      `*Scope Tier:* ${scopeTier}\n` +
      `*Add-ons:* ${addonsLabel}\n` +
      (customNote ? `*Project Brief:* ${customNote}\n` : '') +
      `\nCould we schedule an intro call?`
    );
    window.open(`https://wa.me/917020421594?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col items-center justify-center p-3 sm:p-6 antialiased selection:bg-[#7B61FF] selection:text-white relative overflow-hidden font-sans">

      {/* Dynamic Colorful Aurora Lighting over Clean White canvas */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-24 -left-20 w-[420px] h-[420px] bg-gradient-to-br from-[#4F46E5]/20 via-[#7B61FF]/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 -right-24 w-[400px] h-[400px] bg-gradient-to-bl from-[#FF00A0]/15 via-[#F59E0B]/12 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute -bottom-20 left-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-[#06B6D4]/18 via-[#10B981]/12 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(#6366F1_0.8px,transparent_0.8px)] [background-size:20px_20px] opacity-[0.07]" />
      </div>

      {/* Floating System Toast */}
      {toastMessage && (
        <div className="fixed top-6 z-50 px-4 py-2 rounded-2xl bg-white/95 text-[#0F172A] text-xs font-semibold shadow-xl backdrop-blur-xl flex items-center gap-2 border border-[#7B61FF]/30 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#7B61FF]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Utility Controls */}
      <div className="w-full max-w-md flex items-center justify-between px-2 mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 border border-slate-200 shadow-xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
            </span>
            <span className="text-[10px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#7B61FF] to-[#FF00A0] tracking-wider uppercase">
              MotionLabs Official Card
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playChime('pop', !soundEnabled);
            }}
            title={soundEnabled ? "Mute sound effects" : "Enable sound effects"}
            className="p-2 rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 text-[#475569] shadow-xs hover:text-[#0F172A] transition active:scale-95 cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#4F46E5]" /> : <VolumeX className="w-3.5 h-3.5 text-[#94A3B8]" />}
          </button>

          <button
            onClick={() => {
              playChime('pop', soundEnabled);
              setShowQrModal(true);
            }}
            title="Scan Card QR"
            className="p-2 rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 text-[#475569] shadow-xs hover:text-[#0F172A] transition active:scale-95 cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-[#FF00A0]" />
          </button>
        </div>
      </div>

      {/* Main Digital Card Shell */}
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-[0_24px_55px_rgba(15,23,42,0.09)] relative z-10 transition-all duration-300">

        {/* Dynamic Colorful Header Ribbon */}
        <div className="relative h-36 bg-gradient-to-r from-[#EEF2FF] via-[#FDF2F8] to-[#ECFEFF] p-5 overflow-hidden flex flex-col gap-3 border-b border-slate-100">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 rounded-full bg-gradient-to-bl from-[#FF00A0]/25 to-transparent blur-xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-28 h-28 rounded-full bg-gradient-to-tr from-[#06B6D4]/25 to-transparent blur-xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#4F46E5_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-emerald-200 shadow-xs backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-800 tracking-wider uppercase">
                Available for Q1/Q2 Sprints
              </span>
            </div>

            <a
              href={PROFILE.website}
              target="_blank"
              rel="noreferrer"
              onClick={() => playChime('click', soundEnabled)}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-[10.5px] font-bold text-[#4F46E5] shadow-xs transition hover:scale-105"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]">motionlabs.in</span>
              <ArrowUpRight className="w-3 h-3 text-[#06B6D4]" />
            </a>
          </div>

          {/* Real-time Client Proof Ticker */}
          <div className="relative z-10 flex items-center gap-2 overflow-hidden py-0.5">
            <span className="text-[9.5px] font-extrabold text-[#475569] uppercase tracking-wider whitespace-nowrap">
              Trusted By:
            </span>
            {/* Auto-scrolling track: list is rendered twice so the loop is seamless */}
            <div className="flex-1 min-w-0 overflow-hidden py-0.5">
              <div className="flex w-max animate-[trusted-marquee_18s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
                {[...PROFILE.trustedClients, ...PROFILE.trustedClients].map((client, idx) => (
                  <span
                    key={idx}
                    aria-hidden={idx >= PROFILE.trustedClients.length}
                    className="mr-1.5 text-[9.5px] px-2.5 py-0.5 rounded-md bg-white/95 text-[#334155] border border-slate-200/90 shadow-xs font-semibold whitespace-nowrap"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Identity & Profile Photo */}
        <div className="px-6 pt-0 relative z-10">
          <div className="flex justify-between items-end -mt-12 mb-3">

            {/* Profile Photo */}
            <div className="relative group">
              {/* Outer Vibrant Glow Ring */}
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#4F46E5] via-[#7B61FF] via-[#FF00A0] to-[#06B6D4] p-[2.5px] shadow-lg shadow-[#7B61FF]/25 transform transition group-hover:scale-105 group-hover:rotate-1 duration-300">
                <div className="w-full h-full bg-white rounded-[14px] relative overflow-hidden">
                  <Image
                    src="/cards/rushi-kolhe-photo.jpg"
                    alt={PROFILE.name}
                    width={384}
                    height={384}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Save Contact CTA Button */}
            <button
              onClick={downloadVCard}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] hover:opacity-95 text-[#FFFFFF] text-xs font-bold shadow-md shadow-[#4F46E5]/25 transition transform active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#FFFFFF]" />
              <span>Save Contact</span>
            </button>
          </div>

          {/* Identity Title */}
          <div className="space-y-0.5">
            <h1 className="text-xl font-extrabold text-[#0F172A] tracking-tight flex items-center gap-2">
              <span>{PROFILE.name}</span>
              <span className="p-0.5 rounded-full bg-blue-50 border border-blue-200">
                <ShieldCheck className="w-4 h-4 text-[#4F46E5]" />
              </span>
            </h1>
            <p className="text-xs text-[#475569] font-medium flex items-center gap-1.5 flex-wrap">
              <span>{PROFILE.role}</span>
              <span className="text-slate-300">&bull;</span>
              <a
                href={PROFILE.website}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#FF00A0] hover:underline"
              >
                {PROFILE.company}
              </a>
            </p>
          </div>

          <p className="text-xs leading-relaxed text-[#334155] mt-2.5 font-normal">
            {PROFILE.bio}
          </p>
        </div>

        {/* Colorful Modern Navigation Tabs */}
        <div className="px-6 mt-4 relative z-10">
          <div className="flex bg-[#F1F5F9] p-1 rounded-2xl border border-slate-200/80 shadow-inner">
            <button
              onClick={() => {
                playChime('click', soundEnabled);
                setActiveTab('card');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'card'
                  ? 'bg-white text-[#4F46E5] shadow-sm border border-slate-200/70'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span>Connect</span>
            </button>

            <button
              onClick={() => {
                playChime('click', soundEnabled);
                setActiveTab('services');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-white text-[#7B61FF] shadow-sm border border-slate-200/70'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#7B61FF]" />
              <span>Solutions</span>
            </button>

            <button
              onClick={() => {
                playChime('click', soundEnabled);
                setActiveTab('estimator');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'estimator'
                  ? 'bg-white text-[#FF00A0] shadow-sm border border-slate-200/70'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-[#FF00A0]" />
              <span>Estimator</span>
            </button>
          </div>
        </div>

        {/* Tab Contents Area */}
        <div className="p-6 relative z-10">

          {activeTab === 'card' && (
            <div className="space-y-4">
              {/* Vibrant Colorful 4-Way Launchpad */}
              <div className="grid grid-cols-4 gap-2">
                <a
                  href={`tel:${PROFILE.phoneRaw}`}
                  onClick={() => playChime('click', soundEnabled)}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-cyan-50/70 to-white hover:from-cyan-100/80 border border-cyan-200/80 transition group shadow-xs hover:shadow-md"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#0284C7] flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-cyan-950 mt-1.5">Call</span>
                </a>

                <a
                  href={`https://wa.me/917020421594?text=${encodeURIComponent("Hi Rushikesh, let's connect regarding a project with MotionLabs.")}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playChime('click', soundEnabled)}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-pink-50/70 to-white hover:from-pink-100/80 border border-pink-200/80 transition group shadow-xs hover:shadow-md"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF00A0] to-[#E11D48] flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-pink-950 mt-1.5">WhatsApp</span>
                </a>

                <a
                  href={`mailto:${PROFILE.email}`}
                  onClick={() => playChime('click', soundEnabled)}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-indigo-50/70 to-white hover:from-indigo-100/80 border border-indigo-200/80 transition group shadow-xs hover:shadow-md"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#4338CA] flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-indigo-950 mt-1.5">Email</span>
                </a>

                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playChime('click', soundEnabled)}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-blue-50/70 to-white hover:from-blue-100/80 border border-blue-200/80 transition group shadow-xs hover:shadow-md"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0A66C2] to-[#0284C7] flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-blue-950 mt-1.5">LinkedIn</span>
                </a>
              </div>

              {/* Direct Info Rows with 1-Click Copy and colorful icons */}
              <div className="space-y-2">
                {/* Phone row */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-cyan-300 transition shadow-xs">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-cyan-50 border border-cyan-100 text-[#0891B2]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-[9.5px] uppercase font-bold text-[#475569] tracking-wider">Direct & WhatsApp</p>
                      <a href={`tel:${PROFILE.phoneRaw}`} className="text-xs font-bold text-[#0F172A] hover:text-[#06B6D4]">
                        {PROFILE.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(PROFILE.phone, 'Phone')}
                    className="p-2 rounded-lg text-[#475569] hover:text-[#0F172A] hover:bg-slate-100 transition cursor-pointer"
                  >
                    {copiedField === 'Phone' ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Email row */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition shadow-xs">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100 text-[#4F46E5]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-[9.5px] uppercase font-bold text-[#475569] tracking-wider">Business Email</p>
                      <a href={`mailto:${PROFILE.email}`} className="text-xs font-bold text-[#0F172A] hover:text-[#4F46E5]">
                        {PROFILE.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(PROFILE.email, 'Email')}
                    className="p-2 rounded-lg text-[#475569] hover:text-[#0F172A] hover:bg-slate-100 transition cursor-pointer"
                  >
                    {copiedField === 'Email' ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* MotionLabs Services Hub row */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-purple-300 transition shadow-xs">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-purple-50 border border-purple-100 text-[#7B61FF]">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-[9.5px] uppercase font-bold text-[#475569] tracking-wider">Official Services Hub</p>
                      <a href={PROFILE.servicesUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-[#0F172A] hover:text-[#7B61FF]">
                        motionlabs.in/services
                      </a>
                    </div>
                  </div>
                  <a
                    href={PROFILE.servicesUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg text-[#475569] hover:text-[#0F172A] hover:bg-slate-100 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Call to Action Bar */}
              <button
                onClick={() => {
                  playChime('pop', soundEnabled);
                  setActiveTab('estimator');
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7B61FF] to-[#FF00A0] hover:opacity-95 text-[#FFFFFF] font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#7B61FF]/25 transition active:scale-95 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-white" />
                <span>Configure Project in Estimator</span>
              </button>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              <div className="flex items-center justify-between pb-1 px-1">
                <span className="text-[10px] uppercase font-extrabold text-[#475569] tracking-wider">
                  MotionLabs Capabilities
                </span>
                <a
                  href={PROFILE.servicesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-[#4F46E5] hover:underline flex items-center gap-1 font-bold"
                >
                  <span>All Solutions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {PROFILE.services.map((svc) => {
                const IconComp = svc.icon;
                const isSelected = selectedService === svc.id;

                return (
                  <div
                    key={svc.id}
                    onClick={() => {
                      playChime('click', soundEnabled);
                      setSelectedService(svc.id);
                    }}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'bg-white border-[#7B61FF] shadow-md ring-2 ring-[#7B61FF]/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${svc.accent}`} />
                    <div className="flex items-center justify-between pl-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${svc.lightBg}`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-[#0F172A]">{svc.title}</span>
                      </div>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full border font-mono font-medium ${svc.pillColor}`}>
                        {svc.badge}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#475569] leading-relaxed pl-8 mb-2 font-normal">
                      {svc.desc}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="pl-8 flex flex-wrap gap-1.5">
                      {svc.stack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[9.5px] px-2 py-0.5 rounded-md bg-slate-50 text-[#334155] border border-slate-200 font-mono font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'estimator' && (
            <div className="space-y-3.5">
              {/* Primary Service Selector */}
              <div>
                <label className="text-[10px] font-extrabold uppercase text-[#475569] tracking-wider block mb-1.5">
                  1. Choose Core MotionLabs Service
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {PROFILE.services.map((svc) => (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => {
                        playChime('click', soundEnabled);
                        setSelectedService(svc.id);
                      }}
                      className={`text-[11px] py-2 px-2.5 rounded-xl border text-left transition font-semibold truncate cursor-pointer ${
                        selectedService === svc.id
                          ? 'bg-[#EEF2FF] border-[#4F46E5] text-[#4F46E5] shadow-xs ring-1 ring-[#4F46E5]/30'
                          : 'bg-white border-slate-200 text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
                      }`}
                    >
                      {svc.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scope Tier Selector */}
              <div>
                <label className="text-[10px] font-extrabold uppercase text-[#475569] tracking-wider block mb-1.5">
                  2. Project Stage & Scope
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['MVP Launch', 'Growth Stage', 'Enterprise'].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => {
                        playChime('click', soundEnabled);
                        setScopeTier(tier);
                      }}
                      className={`text-[11px] py-1.5 px-2 rounded-xl border text-center transition font-semibold cursor-pointer ${
                        scopeTier === tier
                          ? 'bg-gradient-to-r from-cyan-50 to-blue-50 border-[#06B6D4] text-[#0891B2] shadow-xs'
                          : 'bg-white border-slate-200 text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-on Multi-selectors */}
              <div>
                <label className="text-[10px] font-extrabold uppercase text-[#475569] tracking-wider block mb-1.5">
                  3. Select Add-ons & Integrations
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'ai-bot', label: 'AI Chatbot Agent', color: 'border-pink-200 bg-pink-50/50 text-pink-700' },
                    { id: 'devops', label: 'DevOps & CI/CD', color: 'border-emerald-200 bg-emerald-50/50 text-emerald-700' },
                    { id: 'gtm', label: 'GTM & Growth Marketing', color: 'border-amber-200 bg-amber-50/50 text-amber-700' },
                    { id: 'media', label: 'Creative Brand Video', color: 'border-purple-200 bg-purple-50/50 text-purple-700' }
                  ].map((addon) => {
                    const active = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`text-[10.5px] py-1.5 px-2.5 rounded-xl border text-left transition flex items-center justify-between font-medium cursor-pointer ${
                          active
                            ? 'bg-[#FDF2F8] border-[#FF00A0] text-[#BE185D] shadow-xs ring-1 ring-[#FF00A0]/30'
                            : 'bg-white border-slate-200 text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate">{addon.label}</span>
                        {active && <CheckCircle2 className="w-3.5 h-3.5 text-[#FF00A0] flex-shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Deliverables Preview */}
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF]/40 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider">
                    Dynamic Scope Manifest:
                  </span>
                  <span className="text-[10px] text-[#4F46E5] font-bold">
                    Est. 2-6 Weeks
                  </span>
                </div>
                <div className="space-y-1">
                  {dynamicDeliverables.slice(0, 4).map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#334155]">
                      <ChevronRight className="w-3 h-3 text-[#7B61FF]" />
                      <span className="truncate">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct WhatsApp Quote Dispatch */}
              <button
                onClick={dispatchWhatsAppQuote}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7B61FF] to-[#FF00A0] hover:opacity-95 text-[#FFFFFF] font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#7B61FF]/25 transition transform active:scale-98 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-white" />
                <span>Send Scope to WhatsApp (+91 7020421594)</span>
              </button>
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="px-6 py-3.5 bg-[#F8FAFC] border-t border-slate-200/80 flex items-center justify-between text-[11px] text-[#475569] relative z-10">
          <a
            href={PROFILE.servicesUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[#334155] hover:text-[#4F46E5] transition font-bold"
          >
            <Image src="/ml-logo-icon.png" alt="MotionLabs logo" width={20} height={20} className="w-5 h-5 object-contain" />
            <span>MotionLabs Solutions</span>
          </a>

          <div className="flex items-center gap-3">
            <button
              onClick={() => copyToClipboard(PROFILE.servicesUrl, 'Services Hub URL')}
              className="flex items-center gap-1 text-[#475569] hover:text-[#0F172A] transition font-semibold cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* QR Modal */}
        {showQrModal && (
          <div className="absolute inset-0 z-40 bg-slate-900/40 backdrop-blur-md flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-xs bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-center relative">
              <button
                onClick={() => {
                  playChime('pop', soundEnabled);
                  setShowQrModal(false);
                }}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-[#475569] hover:text-[#0F172A] hover:bg-slate-200 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="bg-white p-3 rounded-2xl shadow-sm inline-block mb-3 border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(PROFILE.cardUrl)}`}
                  alt="MotionLabs QR"
                  className="w-36 h-36"
                />
              </div>

              <p className="text-sm font-extrabold text-[#0F172A]">Scan for Digital Card</p>
              <p className="text-xs text-[#475569] mt-1">
                Direct access to services, quotes & Rushikesh Kolhe&apos;s contact
              </p>

              <div className="flex gap-2 mt-4 w-full">
                <button
                  onClick={() => {
                    copyToClipboard(
                      `Rushikesh Kolhe | Founder & Tech Partner at MotionLabs\nServices: ${PROFILE.servicesUrl}\nPhone: ${PROFILE.phone}\nEmail: ${PROFILE.email}`,
                      'Full Contact'
                    );
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#0F172A] flex items-center justify-center gap-1.5 border border-slate-200 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-[#475569]" />
                  <span>Copy Info</span>
                </button>

                <button
                  onClick={downloadVCard}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] hover:opacity-95 text-xs font-bold text-[#FFFFFF] flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Save VCF</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
