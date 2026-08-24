import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { 
  Users, 
  UserPlus,
  Search,
  ShieldCheck,
  ClipboardCheck,
  Coins,
  Landmark,
  UserCheck,
  RefreshCcw,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Briefcase,
  Compass,
  Cpu,
  ArrowUpRight
} from 'lucide-react';

// --- TypeScript Interfaces ---
interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

function Reveal({ children, delay = 0, className = "", direction = "up" }: RevealProps) {
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
  { title: "Recruitment & Sourcing", desc: "Identifying and sourcing candidates that match your role, skill level, and team fit — technical and non-technical roles alike.", icon: <Search className="w-6 h-6 text-[#7B61FF]" /> },
  { title: "Hiring Assessment", desc: "Structured skills testing and technical or role-based assessment before a candidate is ever presented to you.", icon: <ClipboardCheck className="w-6 h-6 text-[#FF00A0]" /> },
  { title: "Background Verification", desc: "Employment history, education, identity, and reference checks completed before onboarding.", icon: <ShieldCheck className="w-6 h-6 text-[#4F46E5]" /> },
  { title: "Contract Staffing / Deployment", desc: "The candidate joins your team full-time and exclusively, while remaining employed and payrolled by MotionLabs.", icon: <UserPlus className="w-6 h-6 text-[#06B6D4]" /> },
  { title: "Payroll Management", desc: "Salary processing, payslips, and disbursement handled entirely by MotionLabs on your behalf.", icon: <Coins className="w-6 h-6 text-[#7B61FF]" /> },
  { title: "Statutory Compliance", desc: "PF, ESI, gratuity, tax deductions, and other statutory employment compliance managed on the employee's behalf.", icon: <Landmark className="w-6 h-6 text-[#FF00A0]" /> },
  { title: "Onboarding & Documentation", desc: "Offer letters, employment contracts, and onboarding paperwork handled without adding to your HR workload.", icon: <UserCheck className="w-6 h-6 text-[#4F46E5]" /> },
  { title: "Ongoing HR Support", desc: "Attendance, leave management, and day-to-day HR administration for the deployed employee.", icon: <Users className="w-6 h-6 text-[#06B6D4]" /> },
  { title: "Replacement & Backfill Support", desc: "If a placement isn't working out, we manage the replacement process without disrupting your team's ongoing work.", icon: <RefreshCcw className="w-6 h-6 text-[#7B61FF]" /> }
];

const howWeWorkSteps = [
  { title: "Define the Role", desc: "We understand exactly who you need — skill set, experience level, seniority, and how they'll fit into your team." },
  { title: "Source & Assess", desc: "We source candidates and run them through hiring assessments and technical screening before anyone reaches you." },
  { title: "Verify & Present", desc: "Shortlisted candidates go through background verification before you interview and select the final hire." },
  { title: "Deploy & Manage", desc: "The candidate joins your team full-time and exclusively. MotionLabs handles payroll, compliance, and HR; you manage their day-to-day work." }
];

const faqs = [
  { q: "What is Contract Staffing?", a: "Contract Staffing is a staffing arrangement where a staffing company employs, pays, and manages compliance for a worker, while that worker is deployed to work full-time and exclusively for a client business." },
  { q: "How is Contract Staffing different from hiring a freelancer or independent contractor?", a: "Under Contract Staffing, the person works full-time and exclusively for one client, integrated into that client's team and processes, whereas freelancers and contractors typically split time across multiple clients and projects." },
  { q: "Who pays the employee's salary under this model?", a: "MotionLabs pays the employee's salary directly; the client company pays MotionLabs, which covers payroll, statutory compliance, and employment administration." },
  { q: "Does the employee work at MotionLabs or at the client company?", a: "The employee works full-time for the client company — attending their meetings, using their tools, and reporting to their managers — while remaining formally employed by MotionLabs." },
  { q: "What does a hiring assessment involve?", a: "A hiring assessment is a structured evaluation of a candidate's skills and role-fit — which can include technical tests, case exercises, or role-specific screening — completed before a candidate is presented to the client." },
  { q: "What's included in background verification?", a: "Background verification typically includes employment history checks, education verification, identity confirmation, and reference checks completed before a candidate is onboarded." },
  { q: "Can we hire through this model if we don't have a legal entity in the employee's location?", a: "Yes — this is one of the main advantages of the Contract Staffing model, since MotionLabs is the legal employer of record and handles local compliance, allowing a client to build a team in a location without setting up an entity there first." },
  { q: "What happens if a placement isn't working out?", a: "MotionLabs manages the replacement and backfill process, sourcing and vetting a new candidate to minimize disruption to the client's ongoing work." }
];

export default function HiringLandingPage({ onBack }: { onBack?: () => void }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-[#475569] scroll-smooth selection:bg-[#7B61FF]/20">

      {/* Hero Section - Reduced top padding (pt-8 lg:pt-16) to account for removed header */}
      <section id="hero" className="relative bg-[#0F172A] overflow-hidden pt-8 pb-32 lg:pt-16 lg:pb-40">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-[#7B61FF]/20 to-[#FF00A0]/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-tr from-[#4F46E5]/20 to-[#06B6D4]/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative px-6 md:px-12 max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
          
          {/* Centered Content */}
          <div className="flex flex-col items-center z-10 w-full">
            <Reveal delay={100} direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-semibold tracking-wide text-[#FF00A0] shadow-sm mb-6 backdrop-blur-md">
                <Users className="w-4 h-4" />
                HIRE
              </div>
            </Reveal>
            
            <Reveal delay={200} direction="up">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#FFFFFF] leading-[1.1] tracking-tight mb-8">
                Get the right people on your team, <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#FF00A0]">
                  without the hiring overhead.
                </span>
              </h1>
            </Reveal>
            
            <Reveal delay={300} direction="up">
              <p className="text-lg md:text-xl text-[#E2E8F0] font-medium max-w-2xl leading-relaxed mb-10 mx-auto">
                We recruit, background-verify, and deploy full-time employees who work exclusively for you — while staying on MotionLabs' payroll, compliance, and HR. You get the headcount and dedication of a full-time hire, without the entity, payroll, and compliance burden of employing them directly.
              </p>
            </Reveal>

            <Reveal delay={400} direction="up">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                <button className="bg-gradient-to-r from-[#7B61FF] to-[#FF00A0] text-[#FFFFFF] px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group">
                  Hire Through MotionLabs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-[#FFFFFF] px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                  Talk to Our Hiring Team
                </button>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* What It Is - Definition Section */}
      <section className="py-24 px-6 md:px-12 bg-white relative z-20 -mt-6 rounded-t-[2.5rem] shadow-[0_-8px_30px_rgba(0,0,0,0.05)] border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Reveal>
            <h2 className="text-sm font-bold tracking-widest text-[#7B61FF] uppercase mb-4">What It Is</h2>
            <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-inner">
              <p className="text-2xl md:text-3xl font-bold text-[#0F172A] leading-tight mb-6">
                Contract Staffing is a staffing model where a company provides pre-vetted, full-time employees who work exclusively for a client business, while remaining on the staffing company's payroll, compliance, and HR records.
              </p>
              <p className="text-lg text-[#475569] leading-relaxed">
                In practice, that means MotionLabs recruits, background-verifies, and assesses a candidate, and that person then works full-time, on-site or remote, dedicated entirely to your company — attending your standups, using your tools, reporting to your managers — while MotionLabs handles their salary, statutory compliance, and employment paperwork. The client pays MotionLabs; MotionLabs pays and employs the resource.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-24 px-6 md:px-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="text-sm font-bold tracking-widest text-[#FF00A0] uppercase mb-3">The Impact</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight">Why It Matters</h3>
            </div>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <Reveal delay={100} direction="right">
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 h-full flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#7B61FF]/10 to-transparent rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-125"></div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#0F172A] flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#7B61FF]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F172A]">For Founders & Non-Technical Hiring Managers</h3>
                </div>
                <p className="text-lg text-[#475569] leading-relaxed flex-grow">
                  Hiring is slow, and hiring well is even slower. Between sourcing candidates, screening resumes, running interviews, verifying backgrounds, and setting up payroll and compliance for every new hire, most founders end up either hiring too slowly or hiring the wrong person under time pressure. Contract Staffing gives you a full-time team member — someone who works exclusively for you, every day — without you having to build an HR and payroll function to support them. You get the person; we handle the paperwork.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200} direction="left">
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 h-full flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#06B6D4]/10 to-transparent rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-125"></div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#0F172A] flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-[#06B6D4]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F172A]">For CTOs & Technical Hiring Managers</h3>
                </div>
                <p className="text-lg text-[#475569] leading-relaxed flex-grow">
                  This isn't a freelancer marketplace or a body-shop model. Candidates go through a structured hiring assessment before they're placed — technical screening, skills verification, and background checks — so the person joining your team is actually qualified for the role, not just available. Once placed, they work full-time and exclusively on your team, integrated into your sprints, your codebase, and your reporting lines like any other engineer — the employment relationship sits with MotionLabs, but the working relationship sits entirely with you.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-widest text-[#7B61FF] uppercase mb-3">What's Included</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight">
                End-to-end recruitment and deployment.
              </h3>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedServices.map((service, index) => (
              <Reveal key={service.title} delay={index * 50}>
                <div className="bg-[#0F172A] p-8 rounded-2xl border border-slate-800 hover:border-slate-600 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div className="mb-6 p-3 bg-white/5 border border-white/10 rounded-xl inline-block w-fit group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold text-[#FFFFFF] mb-3 relative z-10">{service.title}</h4>
                  <p className="text-[#E2E8F0] leading-relaxed text-sm opacity-80 group-hover:opacity-100 transition-opacity relative z-10">
                    {service.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 px-6 md:px-12 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-24">
              <h2 className="text-sm font-bold tracking-widest text-[#4F46E5] uppercase mb-3">The Process</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight">How We Work</h3>
            </div>
          </Reveal>
          
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-16 md:space-y-24 relative z-10">
              {howWeWorkSteps.map((step, index) => (
                <Reveal key={index} delay={index * 100} direction={index % 2 === 0 ? "right" : "left"}>
                  <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                    
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#0F172A]">{step.title}</h3>
                      <p className="text-[#475569] text-lg leading-relaxed">{step.desc}</p>
                    </div>
                    
                    <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-full bg-white border-4 border-[#7B61FF] items-center justify-center font-bold text-xl text-[#0F172A] shadow-lg z-20">
                      {index + 1}
                    </div>
                    
                    <div className="md:hidden w-12 h-12 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#FF00A0] flex items-center justify-center font-bold text-xl text-[#FFFFFF] self-start">
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

      {/* Who This Is For */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-16 tracking-tight">Who This Is For</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {[
              "Founders who need to grow their team fast without building an HR and payroll function first.",
              "Companies hiring across borders or regions where setting up a local entity isn't practical yet.",
              "CTOs who need vetted engineering talent without running the full recruitment process in-house.",
              "Businesses that want full-time, dedicated team members — not freelancers or shared contractors.",
              "Teams that need to scale headcount up or down without the complexity of direct employment."
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-slate-50 p-8 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 flex gap-4 h-full transition-all duration-300 group">
                  <CheckCircle className="w-6 h-6 text-[#FF00A0] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <p className="text-[#0F172A] text-lg font-semibold leading-relaxed">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-4">Frequently Asked Questions</h2>
              <p className="text-[#475569] text-lg">Direct answers to help you understand our staffing model.</p>
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
              { category: "OPERATE", title: "CRM, RevOps & Business Operations", desc: "For the systems your growing team will run on.", icon: <Briefcase className="w-5 h-5 text-[#4F46E5]" /> },
              { category: "STRATEGY", title: "Technology Strategy & Advisory", desc: "For planning the roadmap the new hires will execute against.", icon: <Compass className="w-5 h-5 text-[#7B61FF]" /> },
              { category: "BUILD", title: "Product & Software Engineering", desc: "For engineering capacity beyond staff augmentation, when you need a delivery team rather than individual hires.", icon: <Cpu className="w-5 h-5 text-[#06B6D4]" /> }
            ].map((srv, i) => (
              <Reveal key={i} delay={i * 100}>
                <a href="#" className="block p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#7B61FF]/40 hover:shadow-md transition-all group h-full">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#475569] uppercase tracking-wider mb-3">
                    {srv.icon}
                    {srv.category}
                  </div>
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

      {/* Closing CTA */}
      <section className="bg-[#0F172A] py-32 px-6 md:px-12 text-center relative overflow-hidden border-t border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#7B61FF]/20 to-[#FF00A0]/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <Reveal className="max-w-4xl mx-auto space-y-10 relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-[#FFFFFF]">
            Need to grow your team without growing your HR overhead?
          </h2>
          <p className="text-xl md:text-2xl text-[#E2E8F0] font-medium max-w-3xl mx-auto leading-relaxed">
            Tell us the roles you're hiring for. We'll handle the sourcing, vetting, and paperwork — you get the team member.
          </p>
          <div className="pt-8">
            <button className="bg-gradient-to-r from-[#7B61FF] to-[#FF00A0] text-[#FFFFFF] px-12 py-5 rounded-xl font-bold text-xl shadow-lg hover:scale-[1.05] transition-all duration-300">
              Start a Conversation
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}