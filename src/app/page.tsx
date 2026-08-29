'use client';
import Link from 'next/link';
import React, { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion'; 
import Image from 'next/image'; // Import Next.js Image component
import { 
  Code, Bot, Wrench, DatabaseZap, Signal, Clapperboard,
  Lightbulb, Rocket, Layers, Blend, ShieldCheck, 
  ArrowRight, 
  Quote, PlayCircle, MonitorDot
} from 'lucide-react';



// --- HERO SECTION THREE.JS ANIMATION ---
// (HeroAnimation component code remains unchanged)
const HeroAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);
    camera.position.z = 100;

    // --- Create Star-like Texture for Particles ---
    const createStarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.2, 'rgba(255,255,255,0.7)');
      gradient.addColorStop(0.4, 'rgba(255,255,255,0.2)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };
    const starTexture = createStarTexture();


    // --- Create Particle System ---
    const particleCount = 4000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color('#00E5FF'); // Aqua
    const color2 = new THREE.Color('#7B61FF'); // Purple
    const color3 = new THREE.Color('#ff00a0'); // Pink

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const radius = Math.random() * 150 + 50;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;

        const lerpAmount = (x / 300) + 0.5;
        const finalColor = new THREE.Color();
        if (lerpAmount < 0.5) {
            finalColor.lerpColors(color1, color2, lerpAmount * 2);
        } else {
            finalColor.lerpColors(color2, color3, (lerpAmount - 0.5) * 2);
        }
        
        colors[i3] = finalColor.r;
        colors[i3 + 1] = finalColor.g;
        colors[i3 + 2] = finalColor.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 1.2,
        map: starTexture,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        requestAnimationFrame(animate);
        
        particles.rotation.y = elapsedTime * 0.03;
        particles.rotation.x = elapsedTime * 0.01;

        camera.position.x += (mouse.x * 15 - camera.position.x) * 0.03;
        camera.position.y += (-mouse.y * 15 - camera.position.y) * 0.03;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (currentMount) {
            currentMount.removeChild(renderer.domElement);
        }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

// --- ANIMATED HERO TITLE COMPONENT ---

// FIXED exhaustive-deps: Moved constants outside the component render cycle
const toRotate = ["Websites & Web-Apps", "Digital Solutions", "Creative Media"];
const period = 2000;

const AnimatedHeroTitle = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(150);
  
  const tick = useCallback(() => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(150);
    } else if (isDeleting) {
      setDelta(75);
    }
  }, [isDeleting, loopNum, text.length]); // FIXED: 'toRotate' and 'period' are no longer dependencies


  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text, delta, tick]);


  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight md:leading-normal tracking-tighter pb-2">
      Startup Tech Partner For<br/>
      <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#00E5FF] via-[#7B61FF] to-[#ff00a0]">
        {text}
      </span>
      <span className="animate-pulse">|</span>
    </h1>
  );
};


// --- REUSABLE COMPONENTS ---
// (ServiceCard, SolutionCard, BenefitCard, BlogCard components remain unchanged)
const ServiceCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-xl text-center shadow-md border border-gray-200/80 hover:shadow-purple-500/20 hover:shadow-xl hover:border-purple-300 hover:-translate-y-2 transition-all duration-300">
    <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4 text-[#7B61FF]">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-[#1C1F26]">{title}</h3>
    <p className="text-[#555B66] leading-relaxed">{children}</p>
  </div>
);

const SolutionCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="group relative overflow-hidden rounded-xl bg-[#1C1F26] p-6 md:p-8 text-left border border-purple-500/20 transition-all duration-300 hover:border-[#00E5FF]/50 hover:bg-[#252932] hover:scale-105 hover:shadow-2xl hover:shadow-[#00E5FF]/10">
        <div className="mb-4 text-[#00E5FF] transition-transform duration-300 group-hover:scale-110">
            {icon}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

const BenefitCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl text-center border border-purple-500/20 h-full transition-all duration-300 hover:bg-gray-800/50 hover:border-purple-500/40">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 text-[#7B61FF]">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300 leading-relaxed">{children}</p>
  </div>
);

const BlogCard = ({ title, href }: { title: string, href: string }) => (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:shadow-purple-500/10 transition-shadow duration-300 group border border-gray-200/80 h-full">
      <h3 className="text-xl font-bold mb-3 text-[#1C1F26]">{title}</h3>
      <Link href={href} className="font-semibold text-[#7B61FF] flex items-center group-hover:underline">
        Read More <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
);

// --- [UPDATED] CLIENT LOGO MARQUEE COMPONENT ---

// This sub-component renders a single logo image with all the required styling
const LogoImage = ({ filename }: { filename: string }) => (
  <div className="flex-shrink-0 w-48 h-20 flex items-center justify-center mx-10" title={filename.split('.')[0]}>
    <Image
      src={`/logos/clients/${filename}`} // The path to the public logo folder
      alt={filename.split('.')[0]}
      height={40} // Represents max-h-10 (40px)
      width={160}  // Provide a base width; w-auto will scale it down if needed
      className="max-h-10 w-auto grayscale brightness-0 invert opacity-80 transition-opacity duration-300 hover:opacity-100"
    />
  </div>
);

const ClientMarquee = () => {
  // --- UPDATED LOGO LIST ---
  // These are the 12 logos you provided.
  // Just ensure these files exist in your /public/logos/clients/ folder
  const logosRow1 = [
    'onro.png',
    'Amazon-Prime.png',
    'yotta.png',
    'Schneider-Electric-logo-jpg.webp',
    'Agri_logo.png',
    'yeepeey 2.png',
  ];

  const logosRow2 = [
    'schneider.png',
    'ex element.png',
    'Untitled-2.png',
    'champhunt.png',
    'globldata.png',
    'meed.png',
  ];

  const duration = 50; // Scroll duration in seconds

  return (
    // This section uses a different dark background to separate it from the section above.
    <section className="py-16 sm:py-20 bg-[#2D3545]">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-white">
          Trusted by Global Brands & Startups
        </h2>
      </div>
      
      {/* This container adds the fade-out effect on the left and right edges */}
      <div 
        className="w-full overflow-hidden relative"
        style={{ 
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
        }}
      >
        {/* This content renders statically on server/client, fixing hydration errors. */}
        <div className="flex flex-col gap-8">
          {/* Row 1 - scrolling left */}
          <motion.div
            className="flex flex-nowrap"
            animate={{ x: ["0%", "-50%"] }} // We use -50% because we duplicated the list (200% width)
            transition={{ ease: 'linear', duration: duration, repeat: Infinity }}
          >
            {[...logosRow1, ...logosRow1].map((filename, index) => (
              <LogoImage key={`r1-${index}`} filename={filename} />
            ))}
          </motion.div>

          {/* Row 2 - scrolling right */}
          <motion.div
            className="flex flex-nowrap"
            animate={{ x: ["-50%", "0%"] }} // Reverse direction
            transition={{ ease: 'linear', duration: duration, repeat: Infinity }}
          >
            {[...logosRow2, ...logosRow2].map((filename, index) => (
              <LogoImage key={`r2-${index}`} filename={filename} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};


// --- MAIN HOME PAGE COMPONENT ---
export default function HomePage() {
  return (
    <>
      <main className="bg-[#F7F8FA] text-[#1C1F26]">

        {/* 1️⃣ Hero Section */}
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #1C1F26 0%, #2D3545 100%)' }}>
          <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
            <HeroAnimation />
          </Suspense>
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          
          <div className="relative z-20 text-center px-4 sm:px-6">
            <AnimatedHeroTitle />
            <p className="mt-6 max-w-xl md:max-w-3xl mx-auto text-lg lg:text-xl text-gray-300 leading-relaxed">
              From smart calculators to custom CRMs, MotionLabs builds digital solutions and creative media that help startups launch faster, scale smarter, and stay connected anywhere.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="bg-gradient-to-r from-[#7B61FF] to-[#ff00a0] text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-400/40 transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                Get a Quote
              </Link>
              <Link href="/portfolio" className="bg-transparent text-white font-bold py-3 px-8 rounded-full border-2 border-white/80 hover:bg-white/10 transition-colors duration-300 w-full sm:w-auto">
                View Our Work
              </Link>
            </div>
          </div>
        </section>

        {/* 2️⃣ What We Build */}
        <section className="py-16 sm:py-20 bg-[#F7F8FA]">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-[#1C1F26]">What We Build</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard icon={<Code size={28}/>} title="Custom Websites & Web-Apps">Secure, scalable platforms, e-commerce, SaaS dashboards, or completely bespoke ideas.</ServiceCard>
              <ServiceCard icon={<Bot size={28}/>} title="AI Chatbots & Automation">Intelligent bots for lead capture, HR tasks, or customer support 24/7.</ServiceCard>
              <ServiceCard icon={<Wrench size={28}/>} title="On-Demand Web Tools">Budget calculators, background removers, booking engines, or any custom web solution you envision.</ServiceCard>
              <ServiceCard icon={<DatabaseZap size={28}/>} title="Salesforce Development">Streamlined CRM setups, Lightning components, and automation flows tailored to your business.</ServiceCard>
              <ServiceCard icon={<Signal size={28}/>} title="Remote Monitoring Systems">Web and IoT dashboards that track real-time data for device or process monitoring.</ServiceCard>
              <ServiceCard icon={<Clapperboard size={28}/>} title="Creative Media & Videos">Explainer videos, product demos, and brand films that tell your story with impact.</ServiceCard>
            </div>
          </div>
        </section>

        {/* 3️⃣ Examples of What's Possible */}
        <section className="py-16 sm:py-20" style={{background: 'linear-gradient(160deg, #7B61FF 0%, #00E5FF 100%)'}}>
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">Examples of What’s Possible</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-200 mb-12 leading-relaxed">Illustrations, your project can be entirely different. We build for your specific needs.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                <SolutionCard icon={<PlayCircle size={40}/>} title="Dynamic Quote Calculator" description="Clients enter measurements and get instant email quotes while you capture lead details." />
                <SolutionCard icon={<PlayCircle size={40}/>} title="Background Remover + Editor" description="One-click background removal plus Canva-style editing for creatives." />
                <SolutionCard icon={<PlayCircle size={40}/>} title="HR Agent Chatbot" description="Pulls candidate data from job-portal APIs and simplifies recruitment." />
                <SolutionCard icon={<MonitorDot size={40}/>} title="Remote Monitoring Dashboard" description="Live productivity tracking with automated time analytics." />
            </div>
          </div>
        </section>

        {/* 4️⃣ Why Choose MotionLabs */}
        <section className="py-16 sm:py-20 bg-[#1C1F26] bg-cover">
          <div className="container mx-auto px-4 sm:px-6 text-center">
             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-white">Why Choose MotionLabs</h2>
          </div>
          <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <BenefitCard icon={<Lightbulb size={28}/>} title="Solutions, Not Just Code">We help discover the right technology for your specific challenge.</BenefitCard>
            <BenefitCard icon={<Rocket size={28}/>} title="Startup-Focused Strategy">Designed with early-stage speed and budgets in mind.</BenefitCard>
            <BenefitCard icon={<Layers size={28}/>} title="Scalable Tech Stack">Modern frameworks, Salesforce integrations, and cloud-ready architecture.</BenefitCard>
            <BenefitCard icon={<Blend size={28}/>} title="Creative + Technical">We bridge storytelling and engineering.</BenefitCard>
            <BenefitCard icon={<ShieldCheck size={28}/>} title="Transparent & Quick">Clear milestones and no hidden costs for a smooth, fast turnaround.</BenefitCard>
          </div>
        </section>
        
        {/* --- [UPDATED] CLIENT LOGO SECTION INSERTED HERE --- */}
        <ClientMarquee />

        {/* 5️⃣ About & 6️⃣ Testimonials */}
        <section className="py-16 sm:py-20 bg-[#F7F8FA]">
            <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                 <div className="text-center lg:text-left">
                    <h2 className="text-3xl font-bold text-[#1C1F26] mb-4">Creative Tech Studio with a Builder’s Mindset</h2>
                    <p className="text-lg text-[#555B66] mb-6 leading-relaxed">We’re a team of developers, designers, and storytellers who turn ideas into products and brands into experiences. Our mission: make technology and media enablers, not hurdles, for startups.</p>
                    <Link href="/about" className="text-[#7B61FF] font-bold py-2 px-6 rounded-full border-2 border-[#7B61FF] hover:bg-purple-50 transition-colors duration-300 inline-block">
                        Learn More
                    </Link>
                </div>
                 <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                    <Quote className="w-10 h-10 text-[#7B61FF] mb-4" />
                    <p className="text-xl italic text-gray-700 mb-6">“MotionLabs delivered a custom remote-monitoring dashboard and a launch video that wowed investors.”</p>
                    <p className="font-bold text-gray-800">— IoT Startup Founder</p>
                </div>
            </div>
        </section>

        {/* 7️⃣ Call-to-Action */}
        <section className="py-20" style={{background: 'linear-gradient(90deg, #7B61FF 0%, #ff00a0 100%)'}}>
          <div className="container mx-auto px-4 sm:px-6 text-center text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{textShadow: '0 0 10px rgba(255,255,255,0.3)'}}>Let’s Build Your Startup’s Next Big Tool</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-200 mb-8 leading-relaxed">Whether you need a feature-rich website, a real-time monitoring system, or a brand film to showcase it, MotionLabs is ready to partner with you.</p>
            <button className="bg-white text-[#1C1F26] font-bold py-4 px-10 rounded-full shadow-lg hover:bg-gray-200 transform hover:-translate-y-1 transition-all duration-300 text-lg">
              Schedule a Free Consultation
            </button>
          </div>
        </section>

        {/* 8️⃣ Blog/Insights */}
        <section className="py-16 sm:py-20 bg-[#F7F8FA]">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-[#1C1F26]">Insights & Ideas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <BlogCard title="5 Features Every Startup Website Needs" href="#" />
                <BlogCard title="Automating Recruitment with Simple Chatbots" href="#" />
                <BlogCard title="When to Build a Custom CRM" href="#" />
                <BlogCard title="Why Remote Monitoring Is a Big Advantage" href="#" />
            </div>
          </div>
        </section>
      </main>

    </>
  );
}