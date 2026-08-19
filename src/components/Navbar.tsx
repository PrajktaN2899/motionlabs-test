'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/about', text: 'About Us' },
    { href: '/services', text: 'Services' },
    { href: '/solutions', text: 'Solutions' },
    { href: '/portfolio', text: 'Portfolio' },
    { href: '/resources', text: 'Resources' },
    { href: '/careers', text: 'Careers' },
  ];

  const menuVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-gray-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-bold">
            {/* ADJUSTED GRADIENT TO SHOW ALL THREE COLORS CLEARLY */}
            <span 
              className="bg-gradient-to-r from-[#00E5FF] via-[#7B61FF] to-[#ff00a0] bg-clip-text text-transparent"
              style={{
                // We'll keep the background-size smaller to ensure all stops are visible
                // and then animate background-position if desired, or let it be static.
                // For a truly static 3-color gradient across the text, we omit the animation classes
                // that rely on large background-size and background-position.
                // To reintroduce animation that subtly shifts the gradient,
                // you would define a custom keyframe animation for background-position-x
                // and apply it here. For now, this ensures all colors are seen.
              }}
            >
              MotionLabs
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors duration-300 relative group">
                {link.text}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"/>
              </Link>
            ))}
            <Link href="/contact" className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold py-2 px-5 rounded-full shadow-lg hover:shadow-cyan-500/30 transform hover:scale-105 transition-all duration-300">
              Contact Us
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={28}/> : <Menu size={28}/>}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden bg-gray-900/95 backdrop-blur-xl absolute top-20 left-0 w-full"
          >
            <ul className="flex flex-col items-center p-8 gap-6">
              {navLinks.map(link => (
                <motion.li key={link.href} variants={itemVariants}>
                  <Link href={link.href} className="text-gray-300 hover:text-white text-lg" onClick={() => setIsOpen(false)}>
                    {link.text}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={itemVariants}>
                <Link href="/contact" className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg text-lg" onClick={() => setIsOpen(false)}>
                  Contact Us
                </Link>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}