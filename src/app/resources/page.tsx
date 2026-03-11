'use client';
import Link from 'next/link';
import React, { useRef, useEffect, Suspense, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  FileText, Film, Wrench, ClipboardCheck, BookOpen, Mail, CheckCircle, AlertTriangle
} from 'lucide-react';


// Custom type for the animated pages to avoid @ts-ignore
interface FloatingPage extends THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> {
    speed: THREE.Vector3;
}

// --- NEW Hero Animation for Resources Page: Floating Pages ---
const FloatingPagesAnimation = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        const currentMount = mountRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 20;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

        const group = new THREE.Group();
        scene.add(group);
        
        const colors = [new THREE.Color(0x00E5FF), new THREE.Color(0x7B61FF), new THREE.Color(0xff00a0)];
        const pages: FloatingPage[] = [];

        const pageGeometry = new THREE.PlaneGeometry(4, 5.5, 5, 7);

        for(let i=0; i<20; i++) {
            const material = new THREE.MeshBasicMaterial({ 
                color: colors[i % colors.length],
                wireframe: true,
                transparent: true,
                opacity: 0.5,
                side: THREE.DoubleSide
            });
            const page = new THREE.Mesh(pageGeometry, material) as FloatingPage;
            page.position.set(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30
            );
            page.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            page.speed = new THREE.Vector3(
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01
            );
            pages.push(page);
            group.add(page);
        }
        
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

            pages.forEach(page => {
                page.rotation.x += page.speed.x;
                page.rotation.y += page.speed.y;
            });
            
            group.rotation.y = elapsedTime * 0.05;

            camera.position.x += (mouse.x * 5 - camera.position.x) * 0.05;
            camera.position.y += (-mouse.y * 5 - camera.position.y) * 0.05;
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


// --- Main Resources Page Component ---
export default function ResourcesPage() {
    const allResources = React.useMemo(() => [
        { type: 'Blog', title: 'Latest Frameworks & Performance Tips', icon: FileText },
        { type: 'Blog', title: 'How AI Chatbots Cut Costs', icon: FileText },
        { type: 'Blog', title: 'Hands-on Tips for Salesforce', icon: FileText },
        { type: 'Blog', title: 'Lean Strategies for Your MVP', icon: FileText },
        { type: 'Case Study', title: 'Instant Budget Calculator Case Study', icon: ClipboardCheck },
        { type: 'Case Study', title: 'AI Background Remover Case Study', icon: ClipboardCheck },
        { type: 'Case Study', title: 'HR Agent Chatbot Case Study', icon: ClipboardCheck },
        { type: 'Case Study', title: 'Remote Monitoring System Case Study', icon: ClipboardCheck },
        { type: 'Tool', title: 'Background Remover Demo', icon: Wrench },
        { type: 'Tool', title: 'Startup CRM Preview', icon: Wrench },
        { type: 'Tool', title: 'Quote Calculator Template', icon: Wrench },
        { type: 'Guide', title: 'Startup Website Planning Checklist', icon: BookOpen },
        { type: 'Guide', title: 'Choosing the Right Tech Stack', icon: BookOpen },
        { type: 'Guide', title: 'Intro to Salesforce Customization', icon: BookOpen },
        { type: 'Video', title: 'Building Interactive Web Apps', icon: Film },
        { type: 'Video', title: 'Salesforce Micro-Tutorials', icon: Film },
        { type: 'Video', title: 'Branding Video Highlights', icon: Film },
    ], []);
    
    const filters = ['All', 'Blog', 'Case Study', 'Tool', 'Guide', 'Video'];
    const [activeFilter, setActiveFilter] = useState('All');
    const [filteredResources, setFilteredResources] = useState(allResources);

    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [formState, setFormState] = useState({
        status: 'idle', // idle, submitting, success, error
        message: ''
    });

    useEffect(() => {
        if (activeFilter === 'All') {
            setFilteredResources(allResources);
        } else {
            setFilteredResources(allResources.filter(r => r.type === activeFilter));
        }
    }, [activeFilter, allResources]);

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newsletterEmail) return;
        setFormState({ status: 'submitting', message: '' });

        // Simulate API call
        setTimeout(() => {
            if (newsletterEmail.includes('@')) {
                 setFormState({ status: 'success', message: 'Thank you for subscribing!' });
            } else {
                 setFormState({ status: 'error', message: 'Please enter a valid email.' });
            }
        }, 1500);
    };

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
                <Suspense fallback={null}><FloatingPagesAnimation /></Suspense>
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tighter">Build Smarter</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-gray-300">
                       Insights, guides, and free tools from the MotionLabs team.
                    </p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Link href="#newsletter" className="mt-8 inline-block bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 text-lg">
                            Subscribe for Updates
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* Resources Section */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
                        {filters.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ${
                                    activeFilter === filter 
                                    ? 'bg-gray-900 text-white' 
                                    : 'bg-white text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredResources.map((resource) => (
                                <motion.div
                                    key={resource.title}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                                    className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80 flex items-start gap-4 transition-all duration-300 hover:shadow-lg hover:border-purple-300 hover:-translate-y-1"
                                >
                                   <div className="flex-shrink-0 mt-1 text-purple-600">
                                        <resource.icon size={24} />
                                   </div>
                                   <div>
                                       <h3 className="font-bold text-gray-900 mb-1">{resource.title}</h3>
                                       <p className="text-sm text-gray-500">{resource.type}</p>
                                   </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
            
            {/* Newsletter Sign-up */}
            <motion.section
                id="newsletter"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="py-16 md:py-24 bg-white"
            >
                <div className="container mx-auto px-4 sm:px-6 max-w-2xl text-center">
                    <Mail size={40} className="mx-auto text-purple-600 mb-4" />
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Stay in the loop.</h2>
                    <p className="text-gray-600 mb-6">Monthly updates on new tools, trends, and early beta invites.</p>
                    
                    {formState.status === 'success' ? (
                        <div className="flex items-center justify-center gap-2 text-lg text-green-600 font-semibold bg-green-100 p-4 rounded-md">
                           <CheckCircle size={24} />
                           <p>{formState.message}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input 
                                type="email"
                                placeholder="Enter your email"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                disabled={formState.status === 'submitting'}
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-gray-800"
                            />
                            <button 
                                type="submit"
                                disabled={formState.status === 'submitting'}
                                className="bg-gray-900 text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                            >
                                {formState.status === 'submitting' ? 'Submitting...' : 'Join Newsletter'}
                            </button>
                        </form>
                    )}
                     {formState.status === 'error' && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-red-600">
                            <AlertTriangle size={20} />
                            <p>{formState.message}</p>
                        </div>
                    )}
                </div>
            </motion.section>

        </main>
    );
}

