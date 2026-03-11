'use client';
import Link from 'next/link';
import React, { useRef, useEffect, Suspense, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Code, Bot, DatabaseZap, Signal, Clapperboard, MonitorPlay,
  Layers, Blend, HeartHandshake
} from 'lucide-react';


// --- NEW Hero Animation for Services Page: Aurora Wave ---
const WaveAnimation = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        const currentMount = mountRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

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
        const animate = () => {
            requestAnimationFrame(animate);
            uniforms.u_time.value = clock.getElapsedTime();
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (currentMount) {
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
                uniforms.u_resolution.value.x = renderer.domElement.width;
                uniforms.u_resolution.value.y = renderer.domElement.height;
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', handleResize);
            if (currentMount && renderer.domElement.parentNode === currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 z-0" />;
};


// --- Main Services Page Component ---
export default function ServicesPage() {
  const services = [
    {
      id: 'web-apps',
      icon: Code,
      title: 'Custom Websites & Web Apps',
      description: 'Bring any idea to life—whether it’s a dynamic budget calculator, an interactive quoting system, or a full-scale SaaS platform. We build responsive, scalable applications tailored to your unique requirements and future growth.'
    },
    {
      id: 'chatbots',
      icon: Bot,
      title: 'Intelligent Chatbots & Automation',
      description: 'AI-driven chatbots that do more than chat. From HR agents that integrate with job-portal APIs like Naukri, to smart bots that manage vendor data, we build custom automation to match your internal workflows.'
    },
    {
      id: 'salesforce',
      icon: DatabaseZap,
      title: 'Salesforce Development',
      description: 'Optimize your CRM with custom Lightning Components (LWC), Apex triggers, and tailored automation flows. Whether you need a quick enhancement or a robust enterprise build, we make Salesforce work harder for you.'
    },
    {
      id: 'monitoring',
      icon: Signal,
      title: 'Remote Monitoring System',
      description: 'Ensure productivity across remote teams with a secure system that tracks work hours, captures random screenshots, and measures idle time. All data is privacy-compliant, giving you a clear view of engagement without micromanagement.'
    },
    {
      id: 'background-remover',
      icon: MonitorPlay,
      title: 'AI Background Remover & Editing Tools',
      description: 'We develop advanced image-editing apps similar to remove.bg, with optional Canva-like editing features—fast, accurate, and designed for high user volume.'
    },
    {
      id: 'media',
      icon: Clapperboard,
      title: 'Creative Media & Branding Videos',
      description: 'Our roots are in storytelling. We craft compelling product demos, corporate explainers, and educational videos perfect for marketing campaigns or internal communications.'
    }
  ];

  const [activeService, setActiveService] = useState(services[0]);

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

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{ background: '#111115' }}
      >
        <Suspense fallback={null}><WaveAnimation /></Suspense>
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tighter" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Our Services</h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-gray-200" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>
            Building the custom digital tools your startup needs to thrive.
          </p>
        </div>
      </motion.section>

      {/* Interactive Services Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-16 md:py-24"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Panel: Service List */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Explore Our Solutions</h2>
              <div className="flex flex-col gap-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service)}
                    className={`relative w-full text-left p-4 rounded-lg transition-all duration-300 ${
                      activeService.id === service.id ? 'bg-gray-100 shadow-inner' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <service.icon size={24} className={`flex-shrink-0 ${activeService.id === service.id ? 'text-purple-600' : 'text-gray-500'}`}/>
                      <span className={`font-semibold text-sm sm:text-base ${activeService.id === service.id ? 'text-gray-900' : 'text-gray-700'}`}>{service.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Panel: Service Details */}
            <div className="lg:col-span-2 min-h-[400px] bg-gray-900 text-white rounded-2xl p-6 sm:p-8 lg:p-12 flex flex-col justify-center items-start shadow-2xl shadow-purple-500/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <div className="flex items-start sm:items-center gap-4 mb-4">
                    <div className="text-purple-400 flex-shrink-0">
                      <activeService.icon size={40} />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white text-left">{activeService.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-base sm:text-lg text-left">{activeService.description}</p>
                </motion.div>
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
          className="py-16 md:py-24 bg-[#F7F8FA]"
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
    </main>
  );
}

