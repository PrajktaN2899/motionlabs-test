'use client';
import Link from 'next/link';
import React, { useRef, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { motion, Variants } from 'framer-motion';
import { 
  Users, Bot, Calculator, Image, MonitorDot, DatabaseZap, Clapperboard
} from 'lucide-react';


// Custom type for Three.js Line with an added property
interface CustomLine extends THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial> {
    createdAt: number;
}


// --- Hero Animation for Solutions Page: Abstract Blueprint ---
const BlueprintAnimation = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        const currentMount = mountRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 100;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

        const points: THREE.Vector3[] = [];
        for (let i = 0; i < 100; i++) {
            const x = (Math.random() - 0.5) * 200;
            const y = (Math.random() - 0.5) * 200;
            const z = (Math.random() - 0.5) * 200;
            points.push(new THREE.Vector3(x, y, z));
        }

        const linesGroup = new THREE.Group();
        scene.add(linesGroup);

        const color1 = new THREE.Color(0x00E5FF); // Aqua
        const color2 = new THREE.Color(0x7B61FF); // Purple
        const color3 = new THREE.Color(0xff00a0); // Pink

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

            // Create and remove lines dynamically
            if (Math.random() > 0.95 && linesGroup.children.length < 150) {
                const p1 = points[Math.floor(Math.random() * points.length)];
                const p2 = points[Math.floor(Math.random() * points.length)];
                
                const geometry = new THREE.BufferGeometry().setFromPoints([p1, p2]);
                
                const color = new THREE.Color();
                const rand = Math.random();
                if (rand < 0.33) color.copy(color1);
                else if (rand < 0.66) color.copy(color2);
                else color.copy(color3);
                
                const material = new THREE.LineBasicMaterial({ 
                    color,
                    transparent: true, 
                    opacity: 0.8,
                    blending: THREE.AdditiveBlending,
                });

                const line = new THREE.Line(geometry, material) as CustomLine;
                line.createdAt = elapsedTime;
                linesGroup.add(line);
            }

            linesGroup.children.forEach(child => {
                const line = child as CustomLine;
                const age = elapsedTime - line.createdAt;
                if (age > 2) {
                    line.material.opacity -= 0.02;
                    if(line.material.opacity <= 0){
                        linesGroup.remove(line);
                        line.geometry.dispose();
                        line.material.dispose();
                    }
                }
            });
            
            linesGroup.rotation.y = elapsedTime * 0.1;
            linesGroup.rotation.x = elapsedTime * 0.05;

            camera.position.x += (mouse.x * 20 - camera.position.x) * 0.05;
            camera.position.y += (-mouse.y * 20 - camera.position.y) * 0.05;
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

    return <div ref={mountRef} className="absolute inset-0 z-0 opacity-80" />;
};


// --- Main Solutions Page Component ---
export default function SolutionsPage() {
    const solutions = [
        { icon: Users, title: "Startup Productivity & Team Management", description: "Remote monitoring and analytics to keep distributed teams accountable and efficient." },
        { icon: Bot, title: "Intelligent HR & Recruitment", description: "HR Agent Chatbots to streamline candidate sourcing and communication by integrating with job portals." },
        { icon: Calculator, title: "Custom Business Calculators", description: "Interactive budget and quote tools that capture lead details in real time." },
        { icon: Image, title: "AI-Powered Image Editing", description: "High-quality background removal and editing platforms, API-ready for e-commerce." },
        { icon: MonitorDot, title: "CRM for Startups", description: "Lightweight CRM platforms to track leads and manage contacts without enterprise complexity." },
        { icon: DatabaseZap, title: "Salesforce Enhancements", description: "Custom Lightning components, LWC, and Apex automation for rapidly scaling startups." },
        { icon: Clapperboard, title: "Creative Media & Branding", description: "Corporate explainers, product demos, and training videos that tell your story with impact." },
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
                <Suspense fallback={null}><BlueprintAnimation /></Suspense>
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tighter">Tailored Tech Solutions</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-gray-300">
                        From productivity tracking to AI-driven automation, we create custom tools that fit your exact business needs.
                    </p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Link href="/contact" className="mt-8 inline-block bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 text-lg">
                            Discuss Your Challenge
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* Solutions Grid Section */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="py-16 md:py-24 bg-gray-50"
            >
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {solutions.map((solution, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200/80 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-300 hover:-translate-y-2"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="mb-4 inline-block p-3 rounded-full bg-gradient-to-r from-purple-100 to-cyan-100">
                                    <solution.icon className="text-purple-600" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{solution.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{solution.description}</p>
                            </motion.div>
                        ))}
                         <motion.div
                            className="bg-gray-900 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 flex flex-col items-center justify-center text-center text-white md:col-span-2 lg:col-span-1"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: solutions.length * 0.1 }}
                        >
                            <h3 className="text-2xl font-bold mb-2">Have a Different Idea?</h3>
                            <p className="text-gray-400 mb-4">We don&apos;t just deliver templates, we create exactly what you need.</p>
                             <Link href="/contact" className="mt-4 inline-block bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 text-md">
                                Let&apos;s Talk
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <section className="py-20" style={{background: 'linear-gradient(90deg, #7B61FF 0%, #ff00a0 100%)'}}>
                <div className="container mx-auto px-4 sm:px-6 text-center text-white">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                    >
                        Let’s Solve Your Challenge
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Link href="/contact" className="mt-6 bg-white text-[#1C1F26] font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full shadow-lg hover:bg-gray-200 transform hover:-translate-y-1 transition-all duration-300 text-base sm:text-lg inline-block">
                            Request a Free Consultation
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

