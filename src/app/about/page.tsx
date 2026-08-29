'use client';
import Link from 'next/link';
import React, { useRef, useEffect, Suspense, useState } from 'react';
import * as THREE from 'three';
import { motion, Variants, AnimatePresence, MotionProps } from 'framer-motion';
import { 
  Code, Bot, DatabaseZap, Signal, Clapperboard,
  Rocket, Layers, Blend, BrainCircuit, RocketIcon
} from 'lucide-react';

// --- Hero Animation: Neural Network with Logo Colors ---
const NeuralNetworkAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);
    camera.position.z = 250;

    const particleCount = 200;
    const particles = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color('#00E5FF'); // Aqua/Blue
    const color2 = new THREE.Color('#7B61FF'); // Purple
    const color3 = new THREE.Color('#ff00a0'); // Pink

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArray[i3] = (Math.random() - 0.5) * 500;
        posArray[i3 + 1] = (Math.random() - 0.5) * 500;
        posArray[i3 + 2] = (Math.random() - 0.5) * 500;

        velocities[i3] = (Math.random() - 0.5) * 0.2;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.2;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.2;

        const percent = i / particleCount;
        const color = new THREE.Color();
        if (percent < 0.5) {
            color.lerpColors(color1, color2, percent * 2);
        } else {
            color.lerpColors(color2, color3, (percent - 0.5) * 2);
        }
        color.toArray(colorArray, i3);
    }
    particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 1.8,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    const particleMesh = new THREE.Points(particles, particleMaterial);
    scene.add(particleMesh);

    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 6);
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0.05,
        blending: THREE.AdditiveBlending,
    });
    const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(linesMesh);

    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
        requestAnimationFrame(animate);

        const positionsAttribute = linesMesh.geometry.getAttribute('position') as THREE.BufferAttribute;
        const particlePositions = particleMesh.geometry.getAttribute('position') as THREE.BufferAttribute;
        let vertexpos = 0;

        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const dx = particlePositions.getX(i) - particlePositions.getX(j);
                const dy = particlePositions.getY(i) - particlePositions.getY(j);
                const dz = particlePositions.getZ(i) - particlePositions.getZ(j);
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < 60) {
                    positionsAttribute.setXYZ(vertexpos, particlePositions.getX(i), particlePositions.getY(i), particlePositions.getZ(i));
                    vertexpos++;
                    positionsAttribute.setXYZ(vertexpos, particlePositions.getX(j), particlePositions.getY(j), particlePositions.getZ(j));
                    vertexpos++;
                }
            }
        }
        positionsAttribute.needsUpdate = true;
        linesMesh.geometry.setDrawRange(0, vertexpos);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            particlePositions.setX(i, particlePositions.getX(i) + velocities[i3]);
            particlePositions.setY(i, particlePositions.getY(i) + velocities[i3 + 1]);
            particlePositions.setZ(i, particlePositions.getZ(i) + velocities[i3 + 2]);

            if (particlePositions.getX(i) > 250 || particlePositions.getX(i) < -250) velocities[i3] *= -1;
            if (particlePositions.getY(i) > 250 || particlePositions.getY(i) < -250) velocities[i3 + 1] *= -1;
            if (particlePositions.getZ(i) > 250 || particlePositions.getZ(i) < -250) velocities[i3 + 2] *= -1;
        }
        particlePositions.needsUpdate = true;
        
        camera.position.x += (mouse.x * 50 - camera.position.x) * 0.03;
        camera.position.y += (-mouse.y * 50 - camera.position.y) * 0.03;
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
        if (currentMount) currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

// --- Helper Component for Dynamic Text ---
const AnimatedTextHighlight = ({ text, keywords, textClassName }: { text: string, keywords: string[], textClassName: string }) => {
  const words = text.split(' ');
  const keywordSet = new Set(keywords.map(k => k.toLowerCase().replace(/[.,]/g, '')));

  const containerVariants: Variants = { 
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.02, delayChildren: 0.1 },
    },
  };

  const wordVariants: Variants = { 
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 12 } 
    },
  };
  
  const isKeyword = (word: string) => {
     const cleanWord = word.toLowerCase().replace(/[.,]/g, '');
     return keywordSet.has(cleanWord);
  };

  return (
    <motion.p
      className={textClassName}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} 
    >
      {words.map((word, index) => (
        <motion.span 
          variants={wordVariants} 
          key={index} 
          style={{ display: 'inline-block', marginRight: '0.25em' }} 
        >
          {isKeyword(word) ? (
            <span className="font-bold bg-gradient-to-r from-[#00E5FF] via-[#7B61FF] to-[#ff00a0] bg-clip-text text-transparent">
              {word}
            </span>
          ) : (
            <span>{word}</span>
          )}
        </motion.span>
      ))}
    </motion.p>
  );
};


// --- MAIN ABOUT PAGE COMPONENT ---
export default function AboutPage() {
  const services = [
    { icon: <Code size={28}/>, title: 'Custom Websites & Web Apps', description: 'Budget calculators, quoting systems, SaaS platforms, e-commerce, or anything your workflow demands.' },
    { icon: <Bot size={28}/>, title: 'Intelligent Chatbots & Automation', description: 'AI-powered agents that source candidate data from job-portal APIs, manage vendor information, or automate repetitive tasks.' },
    { icon: <DatabaseZap size={28}/>, title: 'Salesforce Development', description: 'Lightning components, Apex triggers, and tailored CRM automation to streamline operations without heavy overhead.' },
    { icon: <Signal size={28}/>, title: 'Remote Monitoring System', description: 'A secure productivity tool that tracks employee work hours, captures random screenshots, measures idle time, and delivers average working-time analytics, perfect for distributed teams.' },
    { icon: <Clapperboard size={28}/>, title: 'Creative Media & Branding Videos', description: 'Corporate explainers, product demos, and educational content to bring your brand to life.' }
  ];

  type VisualProps = MotionProps & { key: React.Key };

  const approachSteps = [
    { 
      id: 'discover',
      title: '1. Discover & Define', 
      description: 'We start by diving deep into your goals, challenges, and the unique needs of your audience to map out a clear and effective strategy.',
      // FIX: Extract key from props and apply explicitly
      visual: ({ key, ...props }: VisualProps) => <motion.div key={key} {...props}><BrainCircuit size={80} className="text-cyan-400" /></motion.div>
    },
    { 
      id: 'develop',
      title: '2. Design & Develop', 
      description: 'Our team brings the strategy to life through rapid prototyping and agile development, ensuring the solution is both beautiful and functional.',
      // FIX: Extract key from props and apply explicitly
      visual: ({ key, ...props }: VisualProps) => <motion.div key={key} {...props}><Layers size={80} className="text-purple-400" /></motion.div>
    },
    { 
      id: 'launch',
      title: '3. Launch & Support', 
      description: 'We handle the full deployment process and provide ongoing support to ensure your product performs flawlessly and continues to evolve.',
      // FIX: Extract key from props and apply explicitly
      visual: ({ key, ...props }: VisualProps) => <motion.div key={key} {...props}><RocketIcon size={80} className="text-pink-400" /></motion.div>
    }
  ];
  
  const [activeApproachStep, setActiveApproachStep] = useState(0);

  const whyChooseUs = [
      { icon: <Rocket size={24}/>, title: 'Startup-friendly', description: 'Agile processes and transparent pricing.'},
      { icon: <Layers size={24}/>, title: 'End-to-end delivery', description: 'From concept to post-launch maintenance.'},
      { icon: <Code size={24}/>, title: 'Future-ready stack', description: 'Modern frameworks and scalable architecture.'},
      { icon: <Blend size={24}/>, title: 'Creative + Technical', description: 'We merge storytelling and engineering for impact.'},
  ];

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    }
  };
  
  const approachItemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const visualVariants: Variants = {
      initial: { opacity: 0, scale: 0.5, rotate: -30 },
      animate: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      exit: { opacity: 0, scale: 0.5, rotate: 30, transition: { duration: 0.3, ease: 'easeIn' } }
  };

  return (
    <>
      <main className="bg-[#F7F8FA]">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" 
          style={{ background: 'linear-gradient(135deg, #1C1F26 0%, #2D3545 100%)' }}
        >
          <Suspense fallback={<div className="absolute inset-0 bg-black" />}><NeuralNetworkAnimation /></Suspense>
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div className="relative z-10 text-center px-4 sm:px-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tighter">
              About{' '}
              <span className="bg-gradient-to-r from-[#00E5FF] via-[#7B61FF] to-[#ff00a0] bg-clip-text text-transparent">
                MotionLabs
              </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-gray-300">
              A creative technology studio helping startups and growing businesses turn ideas into smart digital products.
            </p>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="py-16 md:py-20 lg:py-24 bg-white"
        >
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1F26] mb-4">Our Mission</h2>
            <AnimatedTextHighlight
              text="Empower entrepreneurs and small teams with enterprise-grade technology that’s fast, flexible, and cost-effective. We believe innovation should be accessible, so we design solutions that scale with your business."
              keywords={[
                'enterprise-grade', 
                'technology', 
                'fast', 
                'flexible', 
                'innovation', 
                'accessible', 
                'scale'
              ]}
              textClassName="max-w-3xl mx-auto text-lg sm:text-xl text-[#555B66] leading-relaxed"
            />
          </div>
        </motion.section>

        {/* What We Build Section */}
        <motion.section 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-16 md:py-20 lg:py-24 bg-[#1C1F26] text-white"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">What We Build</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 hover:bg-gray-800/60 hover:scale-105">
                   <div className="flex-shrink-0 text-[#00E5FF] mt-1 pt-1">{service.icon}</div>
                   <div>
                       <h3 className="text-lg sm:text-xl font-semibold mb-1">{service.title}</h3>
                       <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{service.description}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
        
        {/* Our Approach Section - Responsive */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="py-16 md:py-20 lg:py-24 bg-white"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-[#1C1F26]">Our Approach</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">Our process transforms ideas into reality through a clear, collaborative journey.</p>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-center bg-gray-900 text-white rounded-2xl shadow-2xl shadow-purple-500/10 p-4 sm:p-8">
              {/* Left Side: Tabs */}
              <div className="flex flex-col gap-4 lg:col-span-3">
                {approachSteps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveApproachStep(index)}
                    className="relative w-full text-left p-4 sm:p-6 rounded-lg transition-all duration-300"
                  >
                    {activeApproachStep === index && (
                      <motion.div
                        layoutId="activeApproachHighlight"
                        className="absolute inset-0 bg-gray-800/80 rounded-lg border border-purple-500"
                        transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
                      />
                    )}
                    <div className="relative z-10">
                      <h3 className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">{step.title}</h3>
                      <p className={`transition-opacity duration-300 text-sm sm:text-base ${activeApproachStep === index ? 'opacity-100' : 'opacity-60'}`}>{step.description}</p>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Right Side: Visual */}
              <div className="relative min-h-[250px] lg:min-h-[300px] bg-gray-800/50 rounded-lg flex items-center justify-center p-8 overflow-hidden lg:col-span-2">
                <AnimatePresence mode="wait">
                  {approachSteps[activeApproachStep].visual({
                    key: activeApproachStep, // Passed correctly, component handles extraction
                    variants: visualVariants,
                    initial: "initial",
                    animate: "animate",
                    exit: "exit"
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Why Choose Us Section */}
        <motion.section 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-16 md:py-20 lg:py-24 bg-[#F7F8FA]"
        >
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-[#1C1F26]">Why Startups Choose Us</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {whyChooseUs.map((item, index) => (
                        <motion.div 
                            key={index} 
                            className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80 text-center transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-400 hover:-translate-y-2"
                            variants={approachItemVariants}
                            initial="hidden"
                            whileInView="visible"
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

        {/* Our Story Section */}
        <motion.section 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="py-16 md:py-20 lg:py-24 bg-white"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1F26] mb-4">Our Story</h2>
                <AnimatedTextHighlight
                  text="Founded to bridge creativity and technology, MotionLabs began with video production and grew into a full-service development studio. Today, we combine that storytelling heritage with deep technical expertise, helping brands communicate, automate, and scale in a digital-first world."
                  keywords={[
                    'creativity', 
                    'technology', 
                    'storytelling', 
                    'technical', 
                    'communicate', 
                    'automate', 
                    'scale'
                  ]}
                  textClassName="text-lg text-[#555B66] leading-relaxed"
                />
            </div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <section className="py-20" style={{background: 'linear-gradient(90deg, #7B61FF 0%, #ff00a0 100%)'}}>
          <div className="container mx-auto px-4 sm:px-6 text-center text-white">
            <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.5 }}
             transition={{ duration: 0.6 }}
             className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
             style={{textShadow: '0 0 10px rgba(255,255,255,0.3)'}}
            >
              Want to build something bold?
            </motion.h2>
            <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.5 }}
             transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/contact" className="mt-6 bg-white text-[#1C1F26] font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full shadow-lg hover:bg-gray-200 transform hover:-translate-y-1 transition-all duration-300 text-base sm:text-lg inline-block">
                Let’s Start Your Project
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}