'use client';
import Link from 'next/link';
import React, { useRef, useEffect, Suspense, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image'; // Import
import { 
  Palette, Bot, Cpu, Monitor, MonitorDot, DatabaseZap, Clapperboard,
  ShoppingCart, Home, Users, Briefcase, School, Star
} from 'lucide-react';


// --- Hero Animation for Portfolio Page: Project Grid ---
// (GridAnimation component remains unchanged)
const GridAnimation = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        const currentMount = mountRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 50;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

        const count = 10;
        const spacing = 10;
        const points = new THREE.Group();
        
        const color1 = new THREE.Color(0x00E5FF); // Aqua
        const color3 = new THREE.Color(0xff00a0); // Pink
        
        for (let x = 0; x < count; x++) {
            for (let y = 0; y < count; y++) {
                const geometry = new THREE.SphereGeometry(0.5, 8, 8);
                const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
                const point = new THREE.Mesh(geometry, material);
                point.position.set(
                    (x - count / 2) * spacing,
                    (y - count / 2) * spacing,
                    0
                );
                points.add(point);
            }
        }
        scene.add(points);

        const mouse = new THREE.Vector2();
        const onMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', onMouseMove);

        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            points.children.forEach(child => {
                const mesh = child as THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
                const dist = mesh.position.distanceTo(new THREE.Vector3(mouse.x * 50, mouse.y * 50, 0));
                
                const pulse = Math.sin(dist * 0.1 - elapsedTime) * 0.5 + 0.5;
                mesh.scale.setScalar(pulse * 2 + 0.5);
                
                const color = new THREE.Color().lerpColors(color3, color1, pulse);
                mesh.material.color = color;
                mesh.material.opacity = pulse * 0.7 + 0.3;
            });

            points.rotation.y = elapsedTime * 0.05;
            points.rotation.x = elapsedTime * 0.02;
            
            camera.position.x += (mouse.x * 10 - camera.position.x) * 0.05;
            camera.position.y += (-mouse.y * 10 - camera.position.y) * 0.05;
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
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', handleResize);
            if (currentMount) currentMount.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 z-0 opacity-70" />;
};


// --- [NEW] CLIENT LOGO MARQUEE COMPONENTS (DARK BACKGROUND VERSION) ---

// Renders a single logo, filtering it to WHITE for use on a DARK background
const PortfolioLogoImage = ({ filename }: { filename: string }) => (
  <div className="flex-shrink-0 w-48 h-20 flex items-center justify-center mx-10" title={filename.split('.')[0]}>
    <Image
      src={`/logos/clients/${filename}`} 
      alt={filename.split('.')[0]}
      height={40} // Represents max-h-10
      width={160}  // Base width, auto-scales
      className="max-h-10 w-auto grayscale brightness-0 invert opacity-80 transition-opacity duration-300 hover:opacity-100"
      // FILTER: Forces any color logo to WHITE, matching the homepage marquee
    />
  </div>
);

// Renders the full scrolling marquee section
const ClientLogoMarquee = () => {
  // Using the same 12 client logos from the homepage
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

  const duration = 50; 

  return (
    <section className="py-16 sm:py-20 bg-[#2D3545]"> {/* DARK background (different from section below) */}
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-white"> {/* WHITE text */}
          Trusted By Industry Leaders
        </h2>
      </div>
      
      <div 
        className="w-full overflow-hidden relative"
        style={{ 
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
        }}
      >
        <div className="flex flex-col gap-8">
          {/* Row 1 - scrolling left */}
          <motion.div
            className="flex flex-nowrap"
            animate={{ x: ["0%", "-50%"] }} 
            transition={{ ease: 'linear', duration: duration, repeat: Infinity }}
          >
            {[...logosRow1, ...logosRow1].map((filename, index) => (
              <PortfolioLogoImage key={`r1-${index}`} filename={filename} />
            ))}
          </motion.div>

          {/* Row 2 - scrolling right */}
          <motion.div
            className="flex flex-nowrap"
            animate={{ x: ["-50%", "0%"] }} 
            transition={{ ease: 'linear', duration: duration, repeat: Infinity }}
          >
            {[...logosRow2, ...logosRow2].map((filename, index) => (
              <PortfolioLogoImage key={`r2-${index}`} filename={filename} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};


// --- Main Portfolio Page Component ---
export default function PortfolioPage() {
    const projects = [
        {
            id: 1,
            title: "Interior & Furniture Designer Platform",
            icon: Palette,
            challenge: "Client needed a way for customers to calculate interior design budgets and instantly request quotes.",
            solution: "Built a custom budget calculator where users input measurements and requirements. Integrated automated quote email and lead capture system for instant follow-up.",
            result: "Higher lead conversion and reduced manual estimate work."
        },
        {
            id: 2,
            title: "AI Background Remover & Editing Suite",
            icon: Cpu,
            challenge: "An e-commerce brand required an image-processing tool similar to remove.bg but with built-in editing.",
            solution: "Developed an AI background remover with Canva-style editing features. Enabled bulk uploads and API integration for partner platforms.",
            result: "Fast, high-quality images ready for product listings."
        },
        {
            id: 3,
            title: "HR Agent Chatbot",
            icon: Bot,
            challenge: "HR teams spent hours sourcing candidate data from multiple job portals.",
            solution: "Created an AI-powered chatbot that fetches profiles and details from portals like Naukri via API. Added smart filtering and lead management.",
            result: "Reduced manual sourcing time by over 70%."
        },
        {
            id: 4,
            title: "Remote Monitoring System",
            icon: Monitor,
            challenge: "A remote-first company needed a way to track team productivity without heavy supervision.",
            solution: "Built a secure dashboard capturing random screenshots, tracking idle time, and calculating average working hours. Delivered privacy controls and detailed analytics.",
            result: "Clear productivity insights and improved accountability."
        },
        {
            id: 5,
            title: "Startup CRM (In Development)",
            icon: MonitorDot,
            challenge: "Early-stage companies wanted a lightweight CRM instead of costly enterprise tools.",
            solution: "Designing a basic yet scalable CRM with lead tracking, contact management, and easy integration.",
            result: "Beta testing with selected startup clients, aiming for a Q4 launch."
        },
        {
            id: 6,
            title: "Branding & Product Videos",
            icon: Clapperboard,
            challenge: "Brands needed engaging visuals to explain complex products.",
            solution: "Produced corporate explainers, product demos, and educational videos for multiple industries.",
            result: "Increased brand engagement and improved customer understanding."
        },
        {
            id: 7,
            title: "Salesforce Solutions",
            icon: DatabaseZap,
            challenge: "Businesses required deeper CRM customization and process automation to manage rapid growth.",
            solution: "Built custom Lightning Web Components (LWC) and Apex triggers for automated workflows. Integrated third-party APIs for seamless data flow between Salesforce and external platforms.",
            result: "Improved operational efficiency and faster sales cycles."
        },
    ];

    const [activeProject, setActiveProject] = useState(projects[0]);

    // [MODIFIED] Added 'Tech & IoT Hardware' to the industries list
    const industries = [
        { icon: Star, name: "Startups & SaaS" },
        { icon: ShoppingCart, name: "E-commerce & Retail" },
        { icon: Home, name: "Interior & Real Estate" },
        { icon: Users, name: "HR & Recruitment" },
        { icon: Briefcase, name: "Creative Agencies" },
        { icon: School, name: "Education & Training" },
        { icon: DatabaseZap, name: "CRM-Driven Enterprises" },
        { icon: Cpu, name: "Tech & IoT Hardware" } // <-- NEWLY ADDED INDUSTRY
    ];

    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <main className="bg-white">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1C1F26 0%, #2D3545 100%)' }}
            >
                <Suspense fallback={null}><GridAnimation /></Suspense>
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tighter">Real Projects. Real Impact.</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-gray-300">
                        From AI-driven tools to creative media, our work helps startups and growing businesses launch faster and scale smarter.
                    </p>
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Link href="/services" className="mt-8 inline-block bg-white text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 text-lg">
                            View Our Services
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* Featured Projects Section */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">Featured Projects</h2>
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Left Panel: Project List */}
                        <div className="lg:w-1/3">
                            <div className="lg:sticky top-24">
                                {projects.map((project) => (
                                    <button
                                        key={project.id}
                                        onMouseOver={() => setActiveProject(project)}
                                        onClick={() => setActiveProject(project)}
                                        className={`w-full text-left p-4 my-2 rounded-lg transition-all duration-300 ${
                                            activeProject.id === project.id ? 'bg-white shadow-lg' : 'hover:bg-gray-100'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <project.icon size={24} className={activeProject.id === project.id ? 'text-purple-600' : 'text-gray-500'}/>
                                            <span className={`font-semibold text-base ${activeProject.id === project.id ? 'text-gray-900' : 'text-gray-700'}`}>{project.title}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Panel: Project Details */}
                        <div className="lg:w-2/3 min-h-[500px] bg-gray-900 text-white rounded-2xl p-8 lg:p-12 shadow-2xl shadow-purple-500/10">
                             <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeProject.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                >
                                    <div className="mb-6">
                                        <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-400 mb-2">Challenge</h3>
                                        <p className="text-gray-300 leading-relaxed">{activeProject.challenge}</p>
                                    </div>
                                    <div className="mb-6">
                                        <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 mb-2">Solution</h3>
                                        <p className="text-gray-300 leading-relaxed">{activeProject.solution}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold uppercase tracking-wider text-pink-400 mb-2">Result</h3>
                                        <p className="text-gray-300 leading-relaxed">{activeProject.result}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* [NEW] CLIENT LOGO SECTION INSERTED HERE (DARK MODE) */}
            <ClientLogoMarquee />

            {/* Industries We Serve */}
            <motion.section 
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="py-16 md:py-24 bg-[#1C1F26] text-white" // This section is the OTHER dark color
            >
                <div className="container mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Industries We Serve</h2>
                    {/* MODIFIED grid to fit 8 items perfectly */}
                    <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                        {industries.map((item, index) => (
                             <motion.div 
                                key={index} 
                                className="group relative aspect-square flex flex-col items-center justify-center p-4 text-center bg-gray-800/50 border border-gray-700 rounded-lg transition-all duration-300 hover:border-purple-500 hover:bg-gray-800"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <item.icon className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300 h-8 w-8 sm:h-10 sm:w-10" />
                                <h3 className="mt-4 font-semibold text-white text-xs sm:text-sm">{item.name}</h3>
                             </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <section className="py-20" style={{background: 'linear-gradient(90deg, #7B61FF 0%, #ff00a0 100%)'}}>
                <div className="container mx-auto px-4 sm:px-6 text-center text-white">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Ready to Build Something Extraordinary?</h2>
                    <Link href="/contact" className="mt-6 bg-white text-[#1C1F26] font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full shadow-lg hover:bg-gray-200 transform hover:-translate-y-1 transition-all duration-300 text-base sm:text-lg inline-block">
                        Start Your Project
                    </Link>
                </div>
            </section>
        </main>
    );
}