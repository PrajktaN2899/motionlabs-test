'use client';
import Link from 'next/link';
import React, { useRef, useEffect, Suspense, useState, useCallback } from 'react';
import * as THREE from 'three';
import { motion, Variants } from 'framer-motion';
import { 
  Code, Bot, Layers, Blend, HeartHandshake, Sparkles, Network, 
  Cloud, ShieldCheck, Users, UserPlus, TrendingUp, PenTool, X, CheckCircle, 
  Info, ArrowUpRight 
} from 'lucide-react';

// --- Import all your separate landing page components ---
import VaptLandingPage from './services/VaptLandingPage';
import AILandingPage from './services/AILandingPage';
import TechStrategyLandingPage from './services/TechStrategyLandingPage';
import ProductEngineeringLandingPage from './services/ProductEngineeringLandingPage';
import DataIntegrationLandingPage from './services/DataIntegrationLandingPage';
import CrmRevopsLandingPage from './services/CrmRevopsLandingPage';
import CloudDevOpsLandingPage from './services/CloudDevOpsLandingPage';
import GrowthGtmLandingPage from './services/GrowthGtmLandingPage';
import BrandCreativeLandingPage from './services/BrandCreativeLandingPage';
import HiringLandingPage from './services/HiringLandingPage';

// --- Domain Data for Interactive Modal ---
const domainData: Record<string, any> = {
    '01': {
        badge: 'STRATEGY', badgeClass: 'bg-cyan-50 text-cyan-600 border-cyan-100',
        title: 'Technology Strategy & Advisory', subtitle: 'Know what to build, before you build it.',
        deliverables: ['Enterprise Architecture & Tech Stack Audits', 'Product Roadmapping & MVP Definition', 'Cost Optimization & Cloud Governance', 'Technical Due Diligence & Security Assessments'],
        tags: ['Enterprise Architecture', 'Tech Stack Optimization', 'CTO-as-a-Service', 'Roadmapping', 'Security Audits'],
        approach: 'Our senior principal strategists align your business objectives with modern tech stacks, eliminating guesswork before a single line of code is written.',
        benefits: ['Zero Tech Debt Foundation', 'Predictable Engineering Timelines', 'Optimized Cloud Infrastructure Expenses', 'Scalable Architectural Standards']
    },
    '02': {
        badge: 'BUILD', badgeClass: 'bg-pink-50 text-pink-600 border-pink-100',
        title: 'Product & Software Engineering', subtitle: 'Turn the roadmap into working software.',
        deliverables: ['Full-Stack Web & Native Mobile App Development', 'Scalable Microservices & API Architecture', 'Legacy Code Modernization & Refactoring', 'Automated CI/CD Deployment Pipelines'],
        tags: ['React / Next.js', 'TypeScript', 'Node.js', 'Python', 'Flutter', 'GraphQL', 'Kubernetes'],
        approach: 'Agile development teams engineer resilient, high-performance software with rigorous automated testing and zero-downtime releases.',
        benefits: ['Rapid Time to Market', '99.99% Uptime SLA Guarantee', 'Clean Modular Codebases', 'Seamless Mobile Cross-Platform']
    },
    '03': {
        badge: 'CONNECT', badgeClass: 'bg-blue-50 text-blue-600 border-blue-100',
        title: 'Data, Integration & Business Systems', subtitle: 'Make your tools talk to each other.',
        deliverables: ['Unified Enterprise Data Warehousing', 'Custom API Gateway & Event Bus Integration', 'Real-Time ETL & BI Dashboard Creation', 'System Synchronization across ERP, CRM & Billing'],
        tags: ['Snowflake', 'Apache Kafka', 'Segment', 'dbt', 'PostgreSQL', 'Zapier Enterprise'],
        approach: 'Break down data silos so every team has immediate access to real-time, single-source-of-truth analytics.',
        benefits: ['Elimination of Data Silos', 'Real-Time Executive Dashboards', 'Automated Multi-System Sync', 'Clean Data Governance']
    },
    '04': {
        badge: 'AUTOMATE', badgeClass: 'bg-pink-50 text-pink-600 border-pink-100',
        title: 'AI & Intelligent Automation', subtitle: 'Let AI handle the repetitive work.',
        deliverables: ['Custom LLM Fine-Tuning & RAG Implementation', 'Automated Document & Invoice Processing', 'Customer Support Conversational AI Bots', 'Predictive Workflow & Lead Scoring Automation'],
        tags: ['OpenAI / GPT-4', 'LangChain', 'Vector DBs (Pinecone)', 'Python AI', 'RPA'],
        approach: 'Deploy autonomous AI agents that save thousands of manual hours while maintaining absolute human oversight and compliance.',
        benefits: ['70%+ Operational Time Savings', '24/7 Intelligent Customer Support', 'Reduced Manual Human Errors', 'High-Precision Automated Extraction']
    },
    '05': {
        badge: 'SCALE', badgeClass: 'bg-blue-50 text-blue-600 border-blue-100',
        title: 'Cloud, DevOps & Reliability Engineering', subtitle: 'Stay online and affordable as you grow.',
        deliverables: ['Multi-Cloud AWS / GCP / Azure Infrastructure', 'Infrastructure as Code (Terraform / Pulumi)', '24/7 Site Reliability & Incident Response', 'Kubernetes Clustering & FinOps Cost Reduction'],
        tags: ['AWS', 'GCP', 'Terraform', 'Kubernetes', 'Docker', 'Datadog', 'FinOps'],
        approach: 'Achieve 99.99% uptime with cloud infrastructure designed to scale automatically under peak global traffic.',
        benefits: ['Automatic High Load Autoscaling', '30%+ Cloud Cost FinOps Reduction', 'Zero Downtime CI/CD Deployments', '24/7 Automated Health Monitoring']
    },
    '06': {
        badge: 'SECURE', badgeClass: 'bg-pink-50 text-pink-600 border-pink-100',
        title: 'Cybersecurity (VAPT)', subtitle: 'Find the weak spots before someone else does.',
        deliverables: ['Vulnerability Assessment & Penetration Testing', 'SOC2 Type II & HIPAA Compliance Readiness', 'Zero Trust Network Access & IAM Configuration', 'Code Vulnerability Scanning (SAST/DAST)'],
        tags: ['VAPT', 'SOC2 Compliance', 'Zero Trust', 'CrowdStrike', 'Penetration Testing'],
        approach: 'Proactive defense and continuous security monitoring to protect customer data and pass enterprise security checks.',
        benefits: ['Fast SOC2 Readiness', 'Full Threat Vulnerability Mitigation', 'Enterprise Audit Compliance', 'Zero Trust Access Governance']
    },
    '07': {
        badge: 'OPERATE', badgeClass: 'bg-blue-50 text-blue-600 border-blue-100',
        title: 'CRM, RevOps & Business Operations', subtitle: 'Give your teams a system that runs itself.',
        deliverables: ['HubSpot & Salesforce End-to-End Setup', 'Sales Pipeline & Attribution Modeling', 'Customer Success Automation & Onboarding', 'RevOps Dashboard & KPI Analytics'],
        tags: ['Salesforce', 'HubSpot', 'Gainsight', 'Zapier', 'Stripe Billing'],
        approach: 'Synchronize sales, marketing, and customer success teams under one automated revenue engine.',
        benefits: ['Unifying Sales & Ops Data', 'Accelerated Deal Velocity', 'Automated Billing & Renewal Workflows', '360° Customer View']
    },
    '08': {
        badge: 'GROW', badgeClass: 'bg-pink-50 text-pink-600 border-pink-100',
        title: 'Growth, Marketing & GTM', subtitle: 'Get in front of the right people, and convert them.',
        deliverables: ['Go-To-Market (GTM) Strategy & Execution', 'Performance Marketing & Search Optimization', 'Conversion Rate Optimization (CRO)', 'Customer Acquisition Funnel Architecture'],
        tags: ['SEO / SEM', 'Product-Led Growth', 'Pipelining', 'ABM', 'Analytics'],
        approach: 'Combine data-driven marketing with high-converting creative assets to systematically acquire high-value customers.',
        benefits: ['Lower Customer Acquisition Cost (CAC)', 'Higher Funnel Conversion Rates', 'Predictable Pipeline Generation', 'Scalable Omnichannel Reach']
    },
    '09': {
        badge: 'EXPERIENCE', badgeClass: 'bg-blue-50 text-blue-600 border-blue-100',
        title: 'Brand, Creative & Digital Experience', subtitle: 'Make people remember you, and trust you.',
        deliverables: ['Brand Identity & Visual System Design', 'UI/UX Design Systems & High-Fidelity Prototypes', '3D Graphics, Motion & Interactive Design', 'Web Performance Optimization'],
        tags: ['Figma', 'Design Systems', 'Motion Design', 'Brand Identity', 'UX Research'],
        approach: 'Build digital experiences that delight users, communicate value instantly, and foster long-term brand loyalty.',
        benefits: ['Elevated Brand Trust & Positioning', 'Consistent Cross-Platform Design System', 'Higher User Retention', 'Sub-Second Page Load Speeds']
    },
    '10': {
        badge: 'HIRE', badgeClass: 'bg-pink-50 text-pink-600 border-pink-100',
        title: 'Hiring Solutions & Recruitment', subtitle: 'Contract Staffing & Deployment.',
        deliverables: ['Pre-vetted Candidate Sourcing', 'Technical & Role-based Assessments', 'Complete Background Verification', 'Payroll & Statutory Compliance Management'],
        tags: ['Contract Staffing', 'Recruitment', 'Payroll', 'Compliance', 'HR Support'],
        approach: 'We recruit, background-verify, and deploy full-time employees who work exclusively for you — while staying on our payroll.',
        benefits: ['Zero Legal Entity Setup Needed', 'Pre-assessed Top Talent', 'No Payroll or Compliance Overhead', 'Seamless Replacements']
    }
};

// --- Safe WebGL Probe & Hero Animation ---
const WaveAnimation = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [webGLAvailable, setWebGLAvailable] = useState(true);

    useEffect(() => {
        if (!mountRef.current) return;
        const currentMount = mountRef.current;

        const checkWebGLSupport = (): boolean => {
            try {
                const testCanvas = document.createElement('canvas');
                return !!(
                    window.WebGLRenderingContext &&
                    (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
                );
            } catch {
                return false;
            }
        };

        if (!checkWebGLSupport()) {
            setWebGLAvailable(false);
            return;
        }

        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false });
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            currentMount.appendChild(renderer.domElement);
        } catch {
            setWebGLAvailable(false);
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;

        const uniforms = {
            u_time: { value: 0.0 },
            u_mouse: { value: new THREE.Vector2() },
            u_resolution: { value: new THREE.Vector2() }
        };

        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: `
                void main() {
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec2 u_resolution;
                uniform float u_time;
                uniform vec2 u_mouse;

                float random (in vec2 _st) {
                    return fract(sin(dot(_st.xy, vec2(12.9898,78.233))) * 43758.5453123);
                }

                float noise (in vec2 _st) {
                    vec2 i = floor(_st);
                    vec2 f = fract(_st);
                    float a = random(i);
                    float b = random(i + vec2(1.0, 0.0));
                    float c = random(i + vec2(0.0, 1.0));
                    float d = random(i + vec2(1.0, 1.0));
                    vec2 u = f * f * (3.0 - 2.0 * f);
                    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
                }

                mat2 rotate(float angle) {
                    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
                }

                void main() {
                    vec2 st = gl_FragCoord.xy/u_resolution.xy;
                    st.x *= u_resolution.x/u_resolution.y;

                    vec3 color = vec3(0.0);
                    st += noise(st*2.0)*0.1;
                    st *= rotate(sin(u_time*0.1)*0.5 + u_mouse.x*0.5);

                    float d = 0.0;
                    st.y += 0.5;
                    st.x -= 1.0;
                    
                    st = st * 3.0;

                    for(int i = 0; i < 6; i++){
                        st.x += 0.2 * cos(st.y + u_time * 0.4 + float(i) * 1.5) + u_mouse.x * 0.3;
                        st.y += 0.2 * sin(st.x + u_time * 0.4 + float(i) * 1.5) + u_mouse.y * 0.3;
                        d += 0.4 / length(st);
                    }
                    
                    color.r = d * 0.3; // Purple/Pink tones
                    color.g = d * 0.1;
                    color.b = d * 0.8; // Blue tones
                    
                    color = pow(color, vec3(0.6));

                    gl_FragColor = vec4(color, 1.0);
                }
            `
        });

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        const onMouseMove = (event: MouseEvent) => {
            uniforms.u_mouse.value.x = (event.clientX / window.innerWidth) - 0.5;
            uniforms.u_mouse.value.y = (event.clientY / window.innerHeight) - 0.5;
        };
        window.addEventListener('mousemove', onMouseMove);

        const clock = new THREE.Clock();
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            uniforms.u_time.value = clock.getElapsedTime();
            if (renderer) renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (currentMount && renderer) {
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
                uniforms.u_resolution.value.x = renderer.domElement.width;
                uniforms.u_resolution.value.y = renderer.domElement.height;
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', handleResize);
            if (renderer) {
                renderer.dispose();
                if (currentMount && renderer.domElement.parentNode === currentMount) {
                    currentMount.removeChild(renderer.domElement);
                }
            }
        };
    }, []);

    if (!webGLAvailable) {
        return <div className="absolute inset-0 z-0 bg-[#111115]" />;
    }

    return <div ref={mountRef} className="absolute inset-0 z-0" />;
};


// ==========================================
// MAIN SERVICES PAGE COMPONENT
// ==========================================
export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [modalTab, setModalTab] = useState<'overview' | 'deliverables' | 'playground'>('overview');
  const [scopeSlider, setScopeSlider] = useState("2");

  const [showVaptPage, setShowVaptPage] = useState(false);
  const [showAIPage, setShowAIPage] = useState(false);
  const [showTechStrategyPage, setShowTechStrategyPage] = useState(false);
  const [showProductEngineeringPage, setShowProductEngineeringPage] = useState(false);
  const [showDataIntegrationPage, setShowDataIntegrationPage] = useState(false);
  const [showCrmPage, setShowCrmPage] = useState(false);
  const [showCloudDevOpsPage, setShowCloudDevOpsPage] = useState(false);
  const [showGrowthPage, setShowGrowthPage] = useState(false);
  const [showExperiencePage, setShowExperiencePage] = useState(false);
  const [showHiringPage, setShowHiringPage] = useState(false);

  const [toasts, setToasts] = useState<{id: number, title: string, message: string, type: string}[]>([]);


  useEffect(() => {
    const resetPages = () => {
        setShowVaptPage(false); setShowAIPage(false); setShowTechStrategyPage(false);
        setShowProductEngineeringPage(false); setShowDataIntegrationPage(false);
        setShowCrmPage(false); setShowCloudDevOpsPage(false); setShowGrowthPage(false);
        setShowExperiencePage(false); setShowHiringPage(false);
    };

    const handlePopState = () => {
        resetPages();
    };

    const handleNavClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a');
        
        if (anchor) {
            const path = anchor.pathname.replace(/\/$/, '');
            if (path === '/services') {
                resetPages();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleNavClick, true);

    return () => {
        window.removeEventListener('popstate', handlePopState);
        document.removeEventListener('click', handleNavClick, true);
    };
  }, []);

  const openLandingPage = (setter: React.Dispatch<React.SetStateAction<boolean>>, slug: string) => {
    setter(true);
    window.history.pushState(null, '', `/services/${slug}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const closeLandingPage = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(false);
    window.history.pushState(null, '', '/services');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const whyChooseUs = [
      { icon: <HeartHandshake size={24}/>, title: 'Startup-friendly', description: 'Agile processes and transparent pricing.'},
      { icon: <Layers size={24}/>, title: 'End-to-end delivery', description: 'From concept to post-launch maintenance.'},
      { icon: <Code size={24}/>, title: 'Future-ready stack', description: 'Modern frameworks and scalable architecture.'},
      { icon: <Blend size={24}/>, title: 'Creative + Technical', description: 'We merge storytelling and engineering for impact.'},
  ];

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  useEffect(() => {
    if (showVaptPage || showAIPage || showTechStrategyPage || showProductEngineeringPage || showDataIntegrationPage || showCrmPage || showCloudDevOpsPage || showGrowthPage || showExperiencePage || showHiringPage) return; 
    const handleMouseMove = (e: MouseEvent) => {
        const cards = document.querySelectorAll('.bento-card') as NodeListOf<HTMLElement>;
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [showVaptPage, showAIPage, showTechStrategyPage, showProductEngineeringPage, showDataIntegrationPage, showCrmPage, showCloudDevOpsPage, showGrowthPage, showExperiencePage, showHiringPage]);

  const showToast = (title: string, message: string, type = 'info') => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, title, message, type }]);
      setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id));
      }, 4500);
  };
  
  const getScopeEstimateText = () => {
      if (scopeSlider === "1") return "2 - 3 Weeks (Sprint Fast-Track)";
      if (scopeSlider === "2") return "3 - 5 Weeks (Standard Full Domain)";
      return "6 - 10 Weeks (Enterprise Multi-System)";
  };

  if (showVaptPage) return <VaptLandingPage onBack={() => closeLandingPage(setShowVaptPage)} />;
  if (showAIPage) return <AILandingPage onBack={() => closeLandingPage(setShowAIPage)} />;
  if (showTechStrategyPage) return <TechStrategyLandingPage onBack={() => closeLandingPage(setShowTechStrategyPage)} />;
  if (showProductEngineeringPage) return <ProductEngineeringLandingPage onBack={() => closeLandingPage(setShowProductEngineeringPage)} />;
  if (showDataIntegrationPage) return <DataIntegrationLandingPage onBack={() => closeLandingPage(setShowDataIntegrationPage)} />;
  if (showCrmPage) return <CrmRevopsLandingPage onBack={() => closeLandingPage(setShowCrmPage)} />;
  if (showCloudDevOpsPage) return <CloudDevOpsLandingPage onBack={() => closeLandingPage(setShowCloudDevOpsPage)} />;
  if (showGrowthPage) return <GrowthGtmLandingPage onBack={() => closeLandingPage(setShowGrowthPage)} />;
  if (showExperiencePage) return <BrandCreativeLandingPage onBack={() => closeLandingPage(setShowExperiencePage)} />;
  if (showHiringPage) return <HiringLandingPage onBack={() => closeLandingPage(setShowHiringPage)} />; 

  return (
    <main className="bg-[#F8FAFC]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          
          .hero-wrapper {
              font-family: 'Plus Jakarta Sans', sans-serif !important;
          }

          .bento-hero-banner {
              background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.95) 100%);
              border: 1px solid rgba(226, 232, 240, 0.8);
              box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.8);
          }
          .bento-card {
              position: relative;
              background: #FFFFFF;
              transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .bento-card::before {
              content: "";
              position: absolute;
              top: 0; left: 0; right: 0; bottom: 0;
              border-radius: inherit;
              padding: 1.5px;
              background: radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.35), transparent 40%);
              -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
              -webkit-mask-composite: xor;
              mask-composite: exclude;
              pointer-events: none;
              opacity: 0;
              transition: opacity 0.4s ease;
          }
          .bento-card:hover::before {
              opacity: 1;
          }
          .bento-card::after {
              content: "";
              position: absolute;
              top: 0; left: 0; right: 0; bottom: 0;
              background: radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.04), transparent 50%);
              pointer-events: none;
              opacity: 0;
              transition: opacity 0.4s ease;
          }
          .bento-card:hover::after {
              opacity: 1;
          }
          .bento-card:hover {
              transform: translateY(-4px) scale(1.008);
              box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 0 20px -5px rgba(139, 92, 246, 0.1);
              border-color: #CBD5E1;
          }
          .bento-card-dark-1 {
              background: linear-gradient(135deg, #7B61FF 0%, #B930D0 100%);
              border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .bento-card-dark-2 {
              background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%);
              border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .bento-card-dark-1::before { background: radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.6), transparent 45%); }
          .bento-card-dark-2::before { background: radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.6), transparent 45%); }
          
          .bento-cta-dashed { border: 1.5px dashed #CBD5E1; background: linear-gradient(135deg, #FFFFFF 0%, #FAF5FF 100%); }
          .bento-cta-dashed:hover { border-color: #8B5CF6; box-shadow: 0 15px 30px -10px rgba(139, 92, 246, 0.18); }
          .gradient-btn { background: linear-gradient(135deg, #EC4899 0%, #7C3AED 50%, #3B82F6 100%); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
          .gradient-btn:hover { opacity: 0.95; transform: translateY(-1px) scale(1.02); box-shadow: 0 10px 25px -5px rgba(236, 72, 153, 0.4); }

          @keyframes floatDiamond {
              0%, 100% { transform: translateY(0px) rotateX(15deg) rotateY(-15deg); }
              50% { transform: translateY(-8px) rotateX(15deg) rotateY(-15deg); }
          }
          .anim-diamond-1 { animation: floatDiamond 3.5s ease-in-out infinite; }
          .anim-diamond-2 { animation: floatDiamond 3.5s ease-in-out infinite 0.5s; }
          .anim-diamond-3 { animation: floatDiamond 3.5s ease-in-out infinite 1s; }
          @keyframes pulseGlow {
              0%, 100% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.08); opacity: 1; }
          }
          .anim-pulse-glow { animation: pulseGlow 2.5s ease-in-out infinite; }
      `}} />

      {/* Hero Section */}
      <div className="relative w-full flex flex-col items-center justify-center overflow-hidden pt-20 pb-4 md:pt-24 md:pb-6" style={{ background: '#111115' }}>
          
          {/* Background Animation Canvas */}
          <Suspense fallback={null}><WaveAnimation /></Suspense>
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          
          {/* Foreground Content */}
          <div className="hero-wrapper relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <section className="p-5 sm:p-8 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                      <div className="lg:col-span-12 space-y-4 text-left">
                          <h1 className="text-[2rem] sm:text-[2.75rem] lg:text-[3.35rem] font-extrabold text-white tracking-tight leading-[1.15]" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                              One partner for the whole system <br />
                              not just one piece of it.
                          </h1>
                          <p className="text-base sm:text-[17px] lg:text-[1.15rem] text-gray-200 font-normal max-w-2xl leading-relaxed" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>
                              Ten connected domains, from first strategy call to the brand people remember.<br className="hidden sm:inline" />
                              Open any card to explore system deliverables.
                          </p>
                      </div>
                  </div>
              </section>
          </div>
      </div>

      {/* NEW Explore Our Solutions (Bento Grid) Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full flex-1 hero-wrapper">
          
          {/* Interactive Category Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pt-8 pb-4 border-b border-slate-200/80">
              <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
                  {['all', 'strategy', 'data', 'growth'].map((filter) => (
                      <button 
                          key={filter}
                          onClick={() => setActiveFilter(filter)} 
                          className={`text-xs px-4 py-2 rounded-full border shadow-sm transition-all duration-250 ease-in-out whitespace-nowrap
                              ${activeFilter === filter 
                                  ? 'bg-slate-900 text-white font-bold border-slate-900 shadow-md' 
                                  : 'bg-white border-slate-200 text-slate-600 font-semibold hover:text-slate-900'}`
                          }
                      >
                          {filter === 'all' && 'All Domains'}
                          {filter === 'strategy' && 'Strategy & Engineering'}
                          {filter === 'data' && 'Data & AI Systems'}
                          {filter === 'growth' && 'Operations & Growth'}
                      </button>
                  ))}
              </div>
          </div>

          {/* Domains Bento Grid Container */}
          <div className="space-y-6 bento-container">
              
              {/* ROW 1: Large Featured Dark Bento Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* STRATEGY TRIGGER BOX */}
                  <div onClick={() => openLandingPage(setShowTechStrategyPage, 'technology-strategy')} className={`bento-card bento-card-dark-1 rounded-2xl p-6 sm:p-8 flex flex-col justify-between group cursor-pointer transition-all duration-300 ${(activeFilter === 'all' || activeFilter === 'strategy') ? 'opacity-100 scale-100' : 'opacity-15 scale-95 hidden'}`}>
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                          <div className="sm:col-span-7 space-y-4 z-10">
                              <span className="text-xs font-bold tracking-widest text-white uppercase flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span> STRATEGY
                              </span>
                              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">Technology Strategy & Advisory</h3>
                              <p className="text-white/80 text-sm sm:text-base leading-relaxed">Know what to build, before you build it.</p>
                              <div className="pt-2 flex items-center gap-2 text-xs font-medium text-white/90">
                                  <span className="px-2 py-0.5 rounded bg-white/20 border border-white/30">Phase 1: Audit</span><span>→</span><span className="px-2 py-0.5 rounded bg-white/20 border border-white/30">Phase 2: Roadmap</span>
                              </div>
                          </div>
                          <div className="sm:col-span-5 flex items-center justify-center z-10 py-4 sm:py-0">
                              <div className="relative w-44 h-44 flex items-center justify-center">
                                  <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 200 200" fill="none">
                                      <path d="M20 100 L100 150 L180 100 L100 50 Z" stroke="#06B6D4" strokeWidth="1.5"/>
                                      <path d="M40 90 L100 128 L160 90 L100 52 Z" stroke="#06B6D4" strokeWidth="1" strokeDasharray="3 3"/>
                                  </svg>
                                  <div className="relative w-32 h-32 flex flex-col items-center justify-center -space-y-8">
                                      <div className="w-24 h-12 bg-gradient-to-r from-blue-500/80 to-cyan-400/90 rounded-lg shadow-lg shadow-cyan-500/30 border border-cyan-300/40 backdrop-blur-sm anim-diamond-1"></div>
                                      <div className="w-24 h-12 bg-gradient-to-r from-indigo-600/70 to-blue-500/80 rounded-lg shadow-md border border-blue-400/30 backdrop-blur-sm anim-diamond-2"></div>
                                      <div className="w-24 h-12 bg-gradient-to-r from-slate-800 to-indigo-900/90 rounded-lg shadow-inner border border-indigo-500/30 anim-diamond-3"></div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* BUILD TRIGGER BOX */}
                  <div onClick={() => openLandingPage(setShowProductEngineeringPage, 'product-engineering')} className={`bento-card bento-card-dark-2 rounded-2xl p-6 sm:p-8 flex flex-col justify-between group cursor-pointer transition-all duration-300 ${(activeFilter === 'all' || activeFilter === 'strategy') ? 'opacity-100 scale-100' : 'opacity-15 scale-95 hidden'}`}>
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                          <div className="sm:col-span-7 space-y-4 z-10">
                              <span className="text-xs font-bold tracking-widest text-white uppercase flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span> BUILD
                              </span>
                              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">Product & Software Engineering</h3>
                              <p className="text-white/80 text-sm sm:text-base leading-relaxed">Turn the roadmap into working software.</p>
                              <div className="pt-2 flex items-center gap-2 text-[11px] font-medium text-white/90">
                                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                  <span>Build Status: Passing (99.9%)</span>
                              </div>
                          </div>
                          <div className="sm:col-span-5 flex items-center justify-center z-10 py-4 sm:py-0">
                              <div className="w-full max-w-[210px] bg-slate-900/90 border border-slate-700/60 rounded-xl p-3 shadow-2xl space-y-2.5 relative group-hover:scale-105 transition-transform duration-300">
                                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                      <div className="flex items-center space-x-1.5">
                                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                                      </div>
                                      <span className="text-[10px] text-slate-400 font-medium">SystemApp.tsx</span>
                                  </div>
                                  <div className="flex items-center gap-3 pt-1">
                                      <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30 text-xs font-bold anim-pulse-glow">&lt;/&gt;</div>
                                      <div className="space-y-1.5 flex-1">
                                          <div className="h-2 bg-slate-700 rounded w-full"></div>
                                          <div className="h-2 bg-pink-500/60 rounded w-2/3"></div>
                                      </div>
                                  </div>
                                  <div className="space-y-1.5 pt-1">
                                      <div className="h-1.5 bg-slate-800 rounded w-3/4"></div>
                                      <div className="h-1.5 bg-blue-500/50 rounded w-1/2"></div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* ROW 2: 4-Column Bento Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* DATA INTEGRATION TRIGGER BOX */}
                  <div onClick={() => openLandingPage(setShowDataIntegrationPage, 'data-integration')} className={`bento-card border border-gray-200/80 hover:!border-blue-400 hover:!shadow-xl hover:!shadow-blue-500/20 rounded-2xl p-6 flex flex-col justify-between h-full group cursor-pointer transition-all duration-300 ${(activeFilter === 'all' || activeFilter === 'data') ? 'opacity-100 scale-100' : 'opacity-15 scale-95 hidden'}`}>
                      <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-8 sm:col-span-9 space-y-2">
                              <span className="text-xs font-bold tracking-wider text-blue-600 uppercase block">CONNECT</span>
                              <h4 className="text-lg sm:text-xl font-bold text-[#1C1F26] tracking-tight leading-snug">Data, Integration & Business Systems</h4>
                              <p className="text-[#555B66] text-sm sm:text-base leading-relaxed">Make your tools talk to each other.</p>
                          </div>
                          <div className="col-span-4 sm:col-span-3 flex justify-end items-start">
                              <div className="w-13 h-13 p-3 rounded-2xl bg-blue-50 border border-blue-100/80 shadow-sm flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                  <Network className="w-6 h-6 transition-transform duration-300 group-hover:rotate-45" />
                              </div>
                          </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
                          <span>Real-time ETL</span><span className="text-blue-600 font-bold">● Syncing</span>
                      </div>
                  </div>

                  {/* AI PAGE TRIGGER BUTTON */}
                  <div onClick={() => openLandingPage(setShowAIPage, 'ai-automation')} className={`bento-card border border-gray-200/80 hover:!border-pink-400 hover:!shadow-xl hover:!shadow-pink-500/20 rounded-2xl p-6 flex flex-col justify-between h-full group cursor-pointer transition-all duration-300 ${(activeFilter === 'all' || activeFilter === 'data') ? 'opacity-100 scale-100' : 'opacity-15 scale-95 hidden'}`}>
                      <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-8 sm:col-span-9 space-y-2">
                              <span className="text-xs font-bold tracking-wider text-pink-600 uppercase block">AUTOMATE</span>
                              <h4 className="text-lg sm:text-xl font-bold text-[#1C1F26] tracking-tight leading-snug">AI & Intelligent Automation</h4>
                              <p className="text-[#555B66] text-sm sm:text-base leading-relaxed">Let AI handle the repetitive work.</p>
                          </div>
                          <div className="col-span-4 sm:col-span-3 flex justify-end items-start">
                              <div className="w-13 h-13 p-3 rounded-2xl bg-pink-50 border border-pink-100/80 shadow-sm flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
                                  <Bot className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                              </div>
                          </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
                          <span>Autonomous Agents</span><span className="text-pink-600 font-bold">GPT-4 / RAG</span>
                      </div>
                  </div>

                  {/* CLOUD & DEVOPS TRIGGER BUTTON */}
                  <div onClick={() => openLandingPage(setShowCloudDevOpsPage, 'cloud-devops')} className={`bento-card border border-gray-200/80 hover:!border-blue-400 hover:!shadow-xl hover:!shadow-blue-500/20 rounded-2xl p-6 flex flex-col justify-between h-full group cursor-pointer transition-all duration-300 ${(activeFilter === 'all' || activeFilter === 'strategy') ? 'opacity-100 scale-100' : 'opacity-15 scale-95 hidden'}`}>
                      <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-8 sm:col-span-9 space-y-2">
                              <span className="text-xs font-bold tracking-wider text-blue-600 uppercase block">SCALE</span>
                              <h4 className="text-lg sm:text-xl font-bold text-[#1C1F26] tracking-tight leading-snug">Cloud, DevOps & Reliability</h4>
                              <p className="text-[#555B66] text-sm sm:text-base leading-relaxed">Stay online and affordable as you grow.</p>
                          </div>
                          <div className="col-span-4 sm:col-span-3 flex justify-end items-start">
                              <div className="w-13 h-13 p-3 rounded-2xl bg-blue-50 border border-blue-100/80 shadow-sm flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                  <Cloud className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" />
                              </div>
                          </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
                          <span>Uptime SLA</span><span className="text-emerald-600 font-bold">99.99%</span>
                      </div>
                  </div>

                  {/* VAPT TRIGGER BOX */}
                  <div onClick={() => openLandingPage(setShowVaptPage, 'cybersecurity-vapt')} className={`bento-card border border-gray-200/80 hover:!border-pink-400 hover:!shadow-xl hover:!shadow-pink-500/20 rounded-2xl p-6 flex flex-col justify-between h-full group cursor-pointer transition-all duration-300 ${(activeFilter === 'all' || activeFilter === 'strategy') ? 'opacity-100 scale-100' : 'opacity-15 scale-95 hidden'}`}>
                      <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-8 sm:col-span-9 space-y-2">
                              <span className="text-xs font-bold tracking-wider text-pink-600 uppercase block">SECURE</span>
                              <h4 className="text-lg sm:text-xl font-bold text-[#1C1F26] tracking-tight leading-snug">Cybersecurity (VAPT)</h4>
                              <p className="text-[#555B66] text-sm sm:text-base leading-relaxed">Find weak spots before someone else does.</p>
                          </div>
                          <div className="col-span-4 sm:col-span-3 flex justify-end items-start">
                              <div className="w-13 h-13 p-3 rounded-2xl bg-pink-50 border border-pink-100/80 shadow-sm flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
                                  <ShieldCheck className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                              </div>
                          </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
                          <span>Compliance Readiness</span><span className="text-pink-600 font-bold">SOC2 / VAPT</span>
                      </div>
                  </div>
              </div>

              {/* ROW 3: 4-Column Bento Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* CRM & REVOPS TRIGGER BOX */}
                  <div onClick={() => openLandingPage(setShowCrmPage, 'crm-revops')} className={`bento-card border border-gray-200/80 hover:!border-blue-400 hover:!shadow-xl hover:!shadow-blue-500/20 rounded-2xl p-6 flex flex-col justify-between h-full group cursor-pointer transition-all duration-300 ${(activeFilter === 'all' || activeFilter === 'growth') ? 'opacity-100 scale-100' : 'opacity-15 scale-95 hidden'}`}>
                      <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-8 sm:col-span-9 space-y-2">
                              <span className="text-xs font-bold tracking-wider text-blue-600 uppercase block">OPERATE</span>
                              <h4 className="text-lg sm:text-xl font-bold text-[#1C1F26] tracking-tight leading-snug">CRM, RevOps & Business Ops</h4>
                              <p className="text-[#555B66] text-sm sm:text-base leading-relaxed">Give your teams a system that runs itself.</p>
                          </div>
                          <div className="col-span-4 sm:col-span-3 flex justify-end items-start">
                              <div className="w-13 h-13 p-3 rounded-2xl bg-blue-50 border border-blue-100/80 shadow-sm flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                  <Users className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
                              </div>
                          </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
                          <span>HubSpot / Salesforce</span><span className="text-blue-600 font-bold">Automated</span>
                      </div>
                  </div>

                  {/* GROWTH GTM TRIGGER BOX */}
                  <div onClick={() => openLandingPage(setShowGrowthPage, 'growth-gtm')} className={`bento-card border border-gray-200/80 hover:!border-pink-400 hover:!shadow-xl hover:!shadow-pink-500/20 rounded-2xl p-6 flex flex-col justify-between h-full group cursor-pointer transition-all duration-300 ${(activeFilter === 'all' || activeFilter === 'growth') ? 'opacity-100 scale-100' : 'opacity-15 scale-95 hidden'}`}>
                      <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-8 sm:col-span-9 space-y-2">
                              <span className="text-xs font-bold tracking-wider text-pink-600 uppercase block">GROW</span>
                              <h4 className="text-lg sm:text-xl font-bold text-[#1C1F26] tracking-tight leading-snug">Growth, Marketing & GTM</h4>
                              <p className="text-[#555B66] text-sm sm:text-base leading-relaxed">Get in front of the right people, and convert.</p>
                          </div>
                          <div className="col-span-4 sm:col-span-3 flex justify-end items-start">
                              <div className="w-13 h-13 p-3 rounded-2xl bg-pink-50 border border-pink-100/80 shadow-sm flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
                                  <TrendingUp className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                              </div>
                          </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
                          <span>Funnel Conversion</span><span className="text-pink-600 font-bold">High Growth</span>
                      </div>
                  </div>

                  {/* EXPERIENCE TRIGGER BOX */}
                  <div onClick={() => openLandingPage(setShowExperiencePage, 'brand-creative')} className={`bento-card border border-gray-200/80 hover:!border-blue-400 hover:!shadow-xl hover:!shadow-blue-500/20 rounded-2xl p-6 flex flex-col justify-between h-full group cursor-pointer transition-all duration-300 ${(activeFilter === 'all' || activeFilter === 'growth') ? 'opacity-100 scale-100' : 'opacity-15 scale-95 hidden'}`}>
                      <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-8 sm:col-span-9 space-y-2">
                              <span className="text-xs font-bold tracking-wider text-blue-600 uppercase block">EXPERIENCE</span>
                              <h4 className="text-lg sm:text-xl font-bold text-[#1C1F26] tracking-tight leading-snug">Brand, Creative & Digital UI/UX</h4>
                              <p className="text-[#555B66] text-sm sm:text-base leading-relaxed">Make people remember you, and trust you.</p>
                          </div>
                          <div className="col-span-4 sm:col-span-3 flex justify-end items-start">
                              <div className="w-13 h-13 p-3 rounded-2xl bg-blue-50 border border-blue-100/80 shadow-sm flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                  <PenTool className="w-6 h-6 transition-transform duration-300 group-hover:rotate-45" />
                              </div>
                          </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
                          <span>Design System</span><span className="text-blue-600 font-bold">Figma / WebGL</span>
                      </div>
                  </div>

                  {/* HIRING TRIGGER BOX */}
                  <div onClick={() => openLandingPage(setShowHiringPage, 'hiring-recruitment')} className={`bento-card border border-gray-200/80 hover:!border-pink-400 hover:!shadow-xl hover:!shadow-pink-500/20 rounded-2xl p-6 flex flex-col justify-between h-full group cursor-pointer transition-all duration-300 ${(activeFilter === 'all' || activeFilter === 'growth') ? 'opacity-100 scale-100' : 'opacity-15 scale-95 hidden'}`}>
                      <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-8 sm:col-span-9 space-y-2">
                              <span className="text-xs font-bold tracking-wider text-pink-600 uppercase block">HIRE</span>
                              <h4 className="text-lg sm:text-xl font-bold text-[#1C1F26] tracking-tight leading-snug">Hiring Solutions & Recruitment</h4>
                              <p className="text-[#555B66] text-sm sm:text-base leading-relaxed">Contract Staffing & Deployment.</p>
                          </div>
                          <div className="col-span-4 sm:col-span-3 flex justify-end items-start">
                              <div className="w-13 h-13 p-3 rounded-2xl bg-pink-50 border border-pink-100/80 shadow-sm flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
                                  <UserPlus className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                              </div>
                          </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
                          <span>Pre-vetted</span><span className="text-pink-600 font-bold">Dedicated Talent</span>
                      </div>
                  </div>
              </div>

          </div>
      </div>

      {/* Why Choose Us Section */}
      <motion.section 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="pt-12 pb-16 md:pt-16 md:pb-24 bg-[#F7F8FA] hero-wrapper"
      >
          <div className="container mx-auto px-4 sm:px-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-[#1C1F26]">Why Startups Choose Us</h2>
              <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {whyChooseUs.map((item, index) => (
                      <motion.div 
                          key={index} 
                          className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80 text-center transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-400 hover:-translate-y-2"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{ delay: index * 0.1 }}
                      >
                          <div className="inline-block text-white bg-gradient-to-r from-[#7B61FF] to-[#00E5FF] p-3 rounded-full mb-4 shadow-lg">{item.icon}</div>
                          <h3 className="text-lg sm:text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#7B61FF] to-[#ff00a0]">
                              {item.title}
                          </h3>
                          <p className="text-[#555B66] text-sm sm:text-base">{item.description}</p>
                      </motion.div>
                  ))}
              </div>
          </div>
      </motion.section>

      {/* Call to Action Section */}
      <section className="py-20 hero-wrapper" style={{background: 'linear-gradient(90deg, #7B61FF 0%, #ff00a0 100%)'}}>
        <div className="container mx-auto px-4 sm:px-6 text-center text-white">
          <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.5 }}
           transition={{ duration: 0.6 }}
           className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
           style={{textShadow: '0 0 10px rgba(255,255,255,0.3)'}}
          >
            Let’s Build Your Next Big Idea
          </motion.h2>
          <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.5 }}
           transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/contact" className="mt-6 bg-white text-[#1C1F26] font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full shadow-lg hover:bg-gray-200 transform hover:-translate-y-1 transition-all duration-300 text-base sm:text-lg inline-block">
              Get a Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Interactive Modal / Slide Drawer */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ${isServiceModalOpen ? 'visible opacity-100' : 'invisible opacity-0'}`} role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsServiceModalOpen(false)}></div>

          <div className={`fixed inset-y-0 right-0 max-w-xl w-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-in-out ${isServiceModalOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              
              {activeServiceId && domainData[activeServiceId] && (
                  <>
                      <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
                          <span className={`text-xs font-extrabold tracking-widest uppercase px-3 py-1 rounded-full border ${domainData[activeServiceId].badgeClass}`}>
                              {domainData[activeServiceId].badge}
                          </span>
                          <button onClick={() => setIsServiceModalOpen(false)} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors">
                              <X className="w-5 h-5" />
                          </button>
                      </div>

                      <div className="p-6 sm:p-8 space-y-6 flex-1">
                          <div>
                              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                                  {domainData[activeServiceId].title}
                              </h2>
                              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                  {domainData[activeServiceId].subtitle}
                              </p>
                          </div>

                          {/* Modal Tabs */}
                          <div className="flex border-b border-gray-200 text-sm font-semibold">
                              <button onClick={() => setModalTab('overview')} className={`py-2.5 px-4 transition-colors ${modalTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>Overview</button>
                              <button onClick={() => setModalTab('deliverables')} className={`py-2.5 px-4 transition-colors ${modalTab === 'deliverables' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>Deliverables & Tech Stack</button>
                              <button onClick={() => setModalTab('playground')} className={`py-2.5 px-4 flex items-center gap-1.5 transition-colors ${modalTab === 'playground' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>
                                  <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Scope Calculator
                              </button>
                          </div>

                          {/* Tab Contents */}
                          {modalTab === 'overview' && (
                              <div className="space-y-6">
                                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-5">
                                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">System Architecture Approach</h4>
                                      <p className="text-sm text-slate-700 leading-relaxed">{domainData[activeServiceId].approach}</p>
                                  </div>
                                  <div className="space-y-3">
                                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Benefits</h4>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                          {domainData[activeServiceId].benefits.map((benefit: string, idx: number) => (
                                              <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700">
                                                  <span className="w-2 h-2 rounded-full bg-pink-500"></span> {benefit}
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                              </div>
                          )}

                          {modalTab === 'deliverables' && (
                              <div className="space-y-6">
                                  <div>
                                      <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">Core System Deliverables</h3>
                                      <ul className="space-y-3 text-sm text-slate-600">
                                          {domainData[activeServiceId].deliverables.map((item: string, idx: number) => (
                                              <li key={idx} className="flex items-start gap-2.5">
                                                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                                                  <span className="text-slate-700">{item}</span>
                                              </li>
                                          ))}
                                      </ul>
                                  </div>
                                  <div className="border-t border-gray-100 pt-5">
                                      <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">Technologies & Frameworks</h3>
                                      <div className="flex flex-wrap gap-2">
                                          {domainData[activeServiceId].tags.map((tag: string, idx: number) => (
                                              <span key={idx} className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">{tag}</span>
                                          ))}
                                      </div>
                                  </div>
                              </div>
                          )}

                          {modalTab === 'playground' && (
                              <div className="space-y-5">
                                  <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-xl p-5 text-white space-y-4">
                                      <div className="flex items-center justify-between">
                                          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Interactive Estimator</span>
                                          <span className="text-xs text-slate-400">Real-time Architecture Scope</span>
                                      </div>
                                      <h4 className="text-lg font-bold">Configure Your Requirements</h4>
                                      <div className="space-y-3 pt-2">
                                          <div>
                                              <label className="text-xs text-slate-300 block mb-1">Target Complexity Level</label>
                                              <input 
                                                  type="range" min="1" max="3" 
                                                  value={scopeSlider} 
                                                  onChange={(e) => setScopeSlider(e.target.value)} 
                                                  className="w-full accent-pink-500 cursor-pointer" 
                                              />
                                              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                                  <span>Standard MVP</span>
                                                  <span>Growth Scale</span>
                                                  <span>Enterprise System</span>
                                              </div>
                                          </div>
                                          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 flex justify-between items-center text-xs">
                                              <span className="text-slate-300">Estimated Deployment Window:</span>
                                              <span className="font-bold text-pink-400">{getScopeEstimateText()}</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          )}
                      </div>

                      <div className="p-6 border-t border-gray-100 bg-slate-50 flex items-center justify-between">
                          <div>
                              <div className="text-[11px] font-semibold text-slate-400 uppercase">Architecture Onboarding</div>
                              <div className="text-xs sm:text-sm font-bold text-slate-800">Direct Partner Integration</div>
                          </div>
                          <button onClick={() => { setIsServiceModalOpen(false); showToast('Strategic Session Requested', 'Opening scheduling system...', 'info'); }} className="gradient-btn text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-md">
                              Schedule Technical Call
                          </button>
                      </div>
                  </>
              )}
          </div>
      </div>

      {/* Custom Toast Notifications Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none hero-wrapper">
          {toasts.map(toast => (
              <div key={toast.id} className={`pointer-events-auto max-w-sm w-full bg-slate-900 text-white rounded-xl p-4 shadow-2xl border-l-4 flex items-start gap-3 transition-all duration-300 ${toast.type === 'success' ? 'border-green-500' : 'border-blue-500'}`}>
                  <div className={`mt-0.5 ${toast.type === 'success' ? 'text-green-500' : 'text-blue-500'}`}>
                      {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                      <h5 className="text-xs font-bold text-white mb-0.5">{toast.title}</h5>
                      <p className="text-[11px] text-slate-300 leading-tight">{toast.message}</p>
                  </div>
              </div>
          ))}
      </div>

    </main>
  );
}