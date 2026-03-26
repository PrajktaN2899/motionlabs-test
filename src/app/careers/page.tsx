'use client';

import React, { useRef, useEffect, Suspense, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
    Users, Code, Briefcase, TrendingUp, Upload, CheckCircle, AlertTriangle, ChevronDown, FileText
} from 'lucide-react';

// --- Hero Animation for Careers Page: Constellation ---
const ConstellationAnimation = () => {
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

        const stars: THREE.Mesh[] = [];
        const starGeo = new THREE.SphereGeometry(0.5, 8, 8);

        const colors = [new THREE.Color(0x00E5FF), new THREE.Color(0x7B61FF), new THREE.Color(0xff00a0)];

        for (let i = 0; i < 300; i++) {
            const starMaterial = new THREE.MeshBasicMaterial({
                color: colors[i % colors.length],
                transparent: true,
                opacity: 0.8
            });
            const star = new THREE.Mesh(starGeo, starMaterial);
            star.position.set(
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 200
            );
            stars.push(star);
            scene.add(star);
        }

        const linesGroup = new THREE.Group();
        scene.add(linesGroup);
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending,
        });

        const mouse = new THREE.Vector2();
        const onMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', onMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);
            linesGroup.children.forEach(c => (c as THREE.Line).geometry.dispose());
            linesGroup.clear();

            const mousePos = new THREE.Vector3(mouse.x * 100, mouse.y * 100, 0);

            for (let i = 0; i < stars.length; i++) {
                for (let j = i + 1; j < stars.length; j++) {
                    const dist = stars[i].position.distanceTo(stars[j].position);
                    const mouseDist = stars[i].position.distanceTo(mousePos);
                    if (dist < 20 && mouseDist < 50) {
                        const geometry = new THREE.BufferGeometry().setFromPoints([stars[i].position, stars[j].position]);
                        linesGroup.add(new THREE.Line(geometry, lineMaterial));
                    }
                }
            }

            camera.position.x += (mouse.x * 10 - camera.position.x) * 0.02;
            camera.position.y += (-mouse.y * 10 - camera.position.y) * 0.02;
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


// --- Main Careers Page Component ---
export default function CareersPage() {
    const [formState, setFormState] = useState({ status: 'idle', message: '' });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [jobs, setJobs] = useState<any[]>([]);
    const [resumeFile, setResumeFile] = useState<File | null>(null); // State to hold the file
    const formRef = useRef<HTMLFormElement>(null);

    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const jobPositions = {
        'Engineering & Development': [
            { value: 'full-stack-intern', label: 'Full-Stack Developer – Internship', active: true },
            { value: 'full-stack-0-3', label: 'Full-Stack Developer – 0-3 years', active: false },
            { value: 'full-stack-3-5', label: 'Full-Stack Developer – 3-5 years', active: false },
            { value: 'gen-ai-intern', label: 'Gen AI Engineer – Internship', active: true },
            { value: 'gen-ai-0-3', label: 'Gen AI Engineer – 0-3 years', active: false },
            { value: 'gen-ai-3-5', label: 'Gen AI Engineer – 3-5 years', active: false },
            { value: 'salesforce-0-3', label: 'Salesforce Developer – 0-3 years', active: false },
            { value: 'salesforce-3-5', label: 'Salesforce Developer – 3-5 years', active: false },
            { value: 'devops-0-3', label: 'DevOps Engineer – 0-3 years', active: true },
            { value: 'devops-3-5', label: 'DevOps Engineer – 3-5 years', active: false },
        ],
        'Design & Creative': [
            { value: 'motion-graphics-0-3', label: 'Motion Graphics Artist – 0-3 years', active: false },
            { value: 'motion-graphics-3-5', label: 'Motion Graphics Artist – 3-5 years', active: false },
            { value: 'graphic-designer-0-3', label: 'Graphic Designer – 0-3 years', active: false },
            { value: 'art-director-3-5', label: 'Art Director – 3-5 years', active: false },
        ],
        'Growth & Marketing': [
            { value: 'marketing-specialist-0-3', label: 'Marketing Specialist – 0-3 years', active: true },
            { value: 'marketing-specialist-3-5', label: 'Marketing Specialist – 3-5 years', active: false },
            { value: 'lead-gen-0-3', label: 'Lead Generation Executive – 0-3 years', active: true },
            { value: 'lead-gen-3-5', label: 'Lead Generation Executive – 3-5 years', active: false },
        ]
    };

    const groupedJobs = jobs
        .filter((job) => job.isActive) // ✅ only active jobs
        .reduce((acc: any, job) => {
            if (!acc[job.department]) {
                acc[job.department] = [];
            }

            acc[job.department].push(job);
            return acc;
        }, {});

    // --- [UPDATED] FORM SUBMISSION LOGIC ---
    // UPDATED SUBMISSION LOGIC TO USE PHP SCRIPT ON HOSTINGER
    // const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     if (!resumeFile) {
    //         setFormState({ status: 'error', message: 'Resume / CV is a required field.'});
    //         return;
    //     }

    //     setFormState({ status: 'submitting', message: '' });

    //     const form = e.target as HTMLFormElement;
    //     const formData = new FormData(form);
    //     formData.set('resume', resumeFile); // Use .set to ensure it's the state file

    //     const progressInterval = setInterval(() => {
    //         setUploadProgress(prev => Math.min(prev + 10, 95));
    //     }, 100);

    //     try {
    //         // This is the line that sends the data to your Hostinger server.
    //         // Make sure your domain is correct.
    //         const response = await fetch('https://motionlabs.in/submit-career.php', {
    //             method: 'POST',
    //             body: formData,
    //         });

    //         clearInterval(progressInterval);
    //         setUploadProgress(100);

    //         const result = await response.json();

    //         if (response.ok) {
    //             setTimeout(() => {
    //                 setFormState({ status: 'success', message: result.message });
    //                 formRef.current?.reset();
    //                 setResumeFile(null);
    //                 setUploadProgress(0);
    //             }, 500);
    //         } else {
    //              setFormState({ status: 'error', message: result.message || 'Oops! There was a problem.' });
    //              setUploadProgress(0);
    //         }
    //     } catch (error) {
    //         clearInterval(progressInterval);
    //         console.error('Form submission error:', error);
    //         setFormState({ status: 'error', message: 'Oops! Could not connect to the server.' });
    //         setUploadProgress(0);
    //     }
    // };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!resumeFile) {
            setFormState({ status: 'error', message: 'Resume / CV is required.' });
            return;
        }

        setFormState({ status: 'submitting', message: '' });

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        formData.set("resume", resumeFile);

        try {

            const response = await fetch(`${BASE_URL}/careers/apply`, {
                method: "POST",
                body: formData
            }
            );

            const result = await response.json();

            if (response.ok) {

                setFormState({
                    status: "success",
                    message: result.message || "Application submitted successfully!"
                });

                formRef.current?.reset();
                setResumeFile(null);

            } else {

                setFormState({
                    status: "error",
                    message: result.message || "Submission failed"
                });

            }

        } catch (error) {

            console.error("Submission error:", error);

            setFormState({
                status: "error",
                message: "Server connection failed"
            });

        }
    };

    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch(`${BASE_URL}/jobs/list`);
                const data = await res.json();
                setJobs(data);
            } catch (err) {
                console.error("Failed to fetch jobs", err);
            }
        };

        fetchJobs();
    }, []);

    return (
        <main className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-[#1C1F26] text-white overflow-hidden">
                <Suspense fallback={null}><ConstellationAnimation /></Suspense>
                <div className="container mx-auto px-4 sm:px-6 relative z-10 py-24 sm:py-32 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter">
                        Join the{' '}
                        <span className="bg-gradient-to-r from-[#00E5FF] via-[#7B61FF] to-[#ff00a0] bg-clip-text text-transparent">
                            MotionLabs
                        </span>
                        {' '}Team
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
                        We’re builders, problem-solvers, and innovators. If you’re passionate about modern tech and collaborative culture, we’d love to hear from you.
                    </motion.p>
                </div>
            </div>

            {/* Why Work With Us */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="py-16 md:py-24 bg-white"
            >
                <div className="container mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">Why Work With Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard icon={Code} title="Innovative Projects" description="From AI to custom CRM tools, no two projects are alike." />
                        <FeatureCard icon={Users} title="Remote-Friendly" description="Work from anywhere while staying connected to a dynamic team." />
                        <FeatureCard icon={TrendingUp} title="Growth & Learning" description="Training budgets, mentorship, and exposure to cutting-edge tech." />
                        <FeatureCard icon={Briefcase} title="Great Culture" description="Open communication, flexible schedules, and a focus on outcomes." />
                    </div>
                </div>
            </motion.section>

            {/* Application Form Section */}
            <motion.section
                id="apply"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="py-16 md:py-24 bg-[#1C1F26]"
            >
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">Apply Now</h2>
                        <div className="bg-white text-gray-800 rounded-2xl p-8 sm:p-12 shadow-2xl">
                            <AnimatePresence mode="wait">
                                {formState.status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-12"
                                    >
                                        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                                        <h3 className="mt-4 text-2xl font-bold">Application Received!</h3>
                                        <p className="mt-2 text-gray-600">{formState.message}</p>
                                    </motion.div>
                                ) : (
                                    <motion.form ref={formRef} key="form" onSubmit={handleFormSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <FormField label="Full Name" name="fullName" type="text" placeholder="Your Name" required />
                                            <FormField label="Email" name="email" type="email" placeholder="your.email@example.com" required />
                                        </div>
                                        <FormSelect label="Role Applying For" name="role" required>
                                            {Object.entries(groupedJobs).map(([dept, roles]: any) =>
                                                roles.length > 0 ? (
                                                    <optgroup label={dept} key={dept}>
                                                        {roles.map((job: any) => (
                                                            <option key={job.id} value={job.id}>
                                                                {job.role} – {job.experience}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                ) : null
                                            )}

                                            <option value="general">General Application</option>
                                        </FormSelect>
                                        <FormField label="Portfolio / GitHub URL" name="portfolio" type="url" placeholder="https://..." />
                                        <FormField label="LinkedIn Profile URL" name="linkedin" type="url" placeholder="https://linkedin.com/in/..." />
                                        <FileUploadField
                                            label="Resume / CV"
                                            name="resume"
                                            required
                                            uploadProgress={uploadProgress}
                                            isSubmitting={formState.status === 'submitting'}
                                            onFileChange={setResumeFile} // Pass the setter function
                                        />
                                        <FormTextarea label="Cover Letter / Message" name="message" placeholder="Tell us why you're a great fit..." />

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
                                                {formState.status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                                            </button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                        <p className="text-center text-gray-400 mt-8">Don’t see the perfect fit? Submit a general application—we’re always looking for talented people.</p>
                    </div>
                </div>
            </motion.section>
        </main>
    );
}

// Sub-components
const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <div className="text-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-purple-200">
        <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
            <Icon className="h-8 w-8 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const FormField = ({ label, name, type, placeholder, required = false }: { label: string, name: string, type: string, placeholder: string, required?: boolean }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}{required && '*'}</label>
        <input type={type} id={name} name={name} placeholder={placeholder} required={required} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500" />
    </div>
);

const FormSelect = ({ label, name, children, required = false }: { label: string, name: string, children: React.ReactNode, required?: boolean }) => (
    <div className="relative">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}{required && '*'}</label>
        <select id={name} name={name} required={required} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 bg-white appearance-none pr-8">
            {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-2 text-gray-700">
            <ChevronDown className="h-5 w-5" />
        </div>
    </div>
);

const FormTextarea = ({ label, name, placeholder, required = false }: { label: string, name: string, placeholder: string, required?: boolean }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}{required && '*'}</label>
        <textarea id={name} name={name} rows={4} placeholder={placeholder} required={required} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500" />
    </div>
);

const FileUploadField = ({ label, name, required = false, uploadProgress, isSubmitting, onFileChange }: { label: string, name: string, required?: boolean, uploadProgress: number, isSubmitting: boolean, onFileChange: (file: File | null) => void }) => {
    const [fileName, setFileName] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (files: FileList | null) => {
        const file = files?.[0] || null;
        setFileName(file ? file.name : '');
        onFileChange(file); // Update parent state
    };

    const onDragEnter = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
    const onDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
    const onDragOver = (e: React.DragEvent) => { e.preventDefault(); }; // Necessary to allow drop
    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileChange(e.dataTransfer.files);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && '*'}</label>
            <div
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
                className={`mt-1 flex flex-col justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors duration-300 min-h-[150px] ${isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
            >
                <div className="space-y-1 text-center w-full">
                    {isSubmitting ? (
                        <div className="w-full">
                            <p className="text-sm text-gray-600 mb-2">Uploading...</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-purple-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                            </div>
                        </div>
                    ) : fileName ? (
                        <div className="flex flex-col items-center justify-center gap-2 text-gray-700">
                            <FileText className="h-10 w-10 text-purple-500" />
                            <span className="font-medium text-sm">{fileName}</span>
                            <button type="button" onClick={() => { handleFileChange(null); if (inputRef.current) inputRef.current.value = ''; }} className="text-xs text-red-500 hover:underline mt-1">Remove file</button>
                        </div>
                    ) : (
                        <>
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600 justify-center">
                                <label htmlFor={name} className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500">
                                    <span>Upload a file</span>
                                    <input id={name} name={name} type="file" className="sr-only" required={required} accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e.target.files)} ref={inputRef} />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};