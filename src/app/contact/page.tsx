'use client';
import Link from 'next/link';
import React, { useRef, useEffect, Suspense, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, MapPin, Clock, Linkedin, Instagram, Youtube,
  CheckCircle, AlertTriangle, ChevronDown
} from 'lucide-react';

// --- Hero Animation for Contact Page: Globe ---
const GlobeAnimation = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        const currentMount = mountRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

        const group = new THREE.Group();
        scene.add(group);

        // Globe
        const geometry = new THREE.IcosahedronGeometry(1.5, 10);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0x7B61FF,
            transparent: true,
            opacity: 0.1,
            wireframe: true,
        });
        const globe = new THREE.Mesh(geometry, material);
        group.add(globe);

        // Arcs
        for (let i = 0; i < 20; i++) {
            const start = new THREE.Vector3(
                (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3
            ).normalize().multiplyScalar(1.5);
            const end = new THREE.Vector3(
                (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3
            ).normalize().multiplyScalar(1.5);

            const curve = new THREE.CatmullRomCurve3([start, new THREE.Vector3(0,0,0), end]);
            const points = curve.getPoints(50);
            const curveGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const curveMaterial = new THREE.LineBasicMaterial({ 
                color: new THREE.Color().lerpColors(new THREE.Color(0x00E5FF), new THREE.Color(0xff00a0), Math.random()),
                linewidth: 2,
                transparent: true,
                opacity: 0.7
            });
            const arc = new THREE.Line(curveGeometry, curveMaterial);
            group.add(arc);
        }
        
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();
            group.rotation.y = elapsedTime * 0.1;
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
            window.removeEventListener('resize', handleResize);
            if (currentMount && currentMount.contains(renderer.domElement)) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 z-0 opacity-40" />;
};

// --- Main Contact Page Component ---
export default function ContactPage() {
    const [formState, setFormState] = useState({ status: 'idle', message: '' });
    const formRef = useRef<HTMLFormElement>(null);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState({ status: 'submitting', message: '' });

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        
        try {
            // THIS IS THE FIX:
            // We now send to your live PHP script, not the non-existent /api/contact route.
            const response = await fetch('https://www.motionlabs.in/submit-contact.php', {
                method: 'POST',
                body: formData, // We send FormData, which your PHP script reads using $_POST
            });

            // Your PHP script will send back a JSON response
            const result = await response.json(); 

            if (response.ok) {
                setFormState({ status: 'success', message: result.message || 'Message Sent!' });
                formRef.current?.reset();
            } else {
                 // If the PHP script has an error, it will show here
                 setFormState({ status: 'error', message: result.message || 'Oops! There was a problem from the server.' });
            }
        } catch (error) {
            console.error('Form submission error:', error);
            // This error will now only happen if the server is completely down.
            setFormState({ status: 'error', message: 'Oops! Could not connect to the form server.' });
        }
    };

    return (
        <div className="bg-white">
            <div className="relative bg-[#1C1F26] text-white overflow-hidden">
                <Suspense fallback={null}><GlobeAnimation /></Suspense>
                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-4rem)] pt-24 pb-20 lg:pt-0 lg:pb-0">
                        {/* Left Info Panel */}
                        <div className="text-center lg:text-left">
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter">Let’s Build Something Smart Together
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="mt-4 max-w-lg mx-auto lg:mx-0 text-lg sm:text-xl text-gray-300">
                                Have a project in mind or a question about MotionLabs? Share a few details and we’ll get back to you quickly.
                            </motion.p>
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="mt-12 space-y-6">
                                <InfoItem icon={Mail} text="info@motionlabs.in" href="mailto:info@motionlabs.in"/>
                                <InfoItem icon={MapPin} text="Pune, Maharashtra, India"/>
                                <InfoItem icon={Clock} text="Mon–Fri, 10 AM – 7 PM IST"/>
                            </motion.div>
                             <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="mt-12">
                                 <h3 className="text-lg font-semibold text-white mb-4 text-center lg:text-left">Follow Our Journey</h3>
                                 <div className="flex justify-center lg:justify-start items-center gap-6">
                                     <SocialLink href="https://www.linkedin.com/company/motion-labs-tech/" icon={Linkedin} name="LinkedIn"/>
                                     <SocialLink href="https://www.instagram.com/motionlaabs/" icon={Instagram} name="Instagram"/>
                                     <SocialLink href="https://www.youtube.com/channel/UCpvb5ZI2nZNCLIKeK32B3fg" icon={Youtube} name="YouTube"/>
                                 </div>
                            </motion.div>
                        </div>

                        {/* Right Form Panel */}
                        <motion.div 
                           initial={{ opacity: 0, y: 50 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                           className="bg-white text-gray-800 rounded-2xl p-8 sm:p-12 shadow-2xl shadow-purple-500/10 lg:mt-16"
                        >
                            <AnimatePresence mode="wait">
                            {formState.status === 'success' ? (
                                <motion.div 
                                    key="success"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-12"
                                >
                                    <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                                    <h3 className="mt-4 text-2xl font-bold">Message Sent!</h3>
                                    <p className="mt-2 text-gray-600">{formState.message}</p>
                                </motion.div>
                            ) : (
                                <motion.form ref={formRef} key="form" onSubmit={handleFormSubmit} className="space-y-6">
                                    <FormField label="Name" name="name" type="text" placeholder="Your Name" required />
                                    <FormField label="Email" name="email" type="email" placeholder="your.email@example.com" required />
                                    <FormSelect label="Service Interest" name="service">
                                        <option>Web Development</option>
                                        <option>AI & Automation</option>
                                        <option>Digital Marketing</option>
                                        <option>Salesforce</option>
                                        <option>Other</option>
                                    </FormSelect>
                                    <FormTextarea label="Message" name="message" placeholder="Tell us about your project..." required />
                                    {formState.status === 'error' && (
                                        <div className="flex items-center gap-2 text-sm text-red-600">
                                            <AlertTriangle size={16} />
                                            <span>{formState.message}</span>
                                        </div>
                                    )}
                                    <div className="text-center pt-4">
                                        <button 
                                            type="submit" 
                                            disabled={formState.status === 'submitting'}
                                            className="w-full bg-gray-900 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300 disabled:bg-gray-500"
                                        >
                                            {formState.status === 'submitting' ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}


// --- Sub-components for Contact Page ---

const InfoItem = ({ icon: Icon, text, href }: { icon: React.ElementType; text: string; href?: string }) => {
    const content = (
        <div className="flex items-center justify-center lg:justify-start gap-4">
            <Icon className="h-6 w-6 text-cyan-400" />
            <span className="text-lg">{text}</span>
        </div>
    );
    return href ? <Link href={href} className="hover:text-cyan-300 transition-colors">{content}</Link> : content;
};

const FormField = ({ label, name, type, placeholder, required = false }: { label: string; name: string; type: string; placeholder: string; required?: boolean; }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}{required && '*'}</label>
        <input type={type} id={name} name={name} placeholder={placeholder} required={required} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"/>
    </div>
);

const FormSelect = ({ label, name, children }: { label: string; name: string; children: React.ReactNode }) => (
     <div className="relative">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select id={name} name={name} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white appearance-none pr-8">
            {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-2 text-gray-700">
            <ChevronDown className="h-5 w-5" />
        </div>
    </div>
);

const FormTextarea = ({ label, name, placeholder, required = false }: { label: string; name: string; placeholder: string; required?: boolean; }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}{required && '*'}</label>
        <textarea id={name} name={name} rows={4} placeholder={placeholder} required={required} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"/>
    </div>
);

const SocialLink = ({ href, icon: Icon, name }: { href: string; icon: React.ElementType; name: string; }) => (
    <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="text-gray-400 hover:text-cyan-300 transition-colors duration-300">
        <Icon size={28} />
    </Link>
);

