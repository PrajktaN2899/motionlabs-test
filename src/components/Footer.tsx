import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  // All links are now in a single structure for easier management
  const footerLinks = [
    { href: '/', text: 'Home' },
    { href: '/portfolio', text: 'Portfolio' },
    { href: '/about', text: 'About Us' },
    { href: '/resources', text: 'Resources' },
    { href: '/services', text: 'Services' },
    { href: '/careers', text: 'Careers' },
    { href: '/solutions', text: 'Solutions' },
    { href: '/contact', text: 'Contact' },
  ];

  return (
    <footer className="text-gray-400 bg-[#1C1F26] relative">
      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Column 1: Brand Information (Takes up more space) */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="inline-flex flex-col items-center lg:items-start">
              <Image 
                src="/ml-logo-icon.png" 
                alt="MotionLabs Logo"
                width={96}
                height={96}
              />
              <h3 className="text-4xl font-bold text-white mt-4">
                MotionLabs
              </h3>
              <p className="text-base max-w-xs mt-3">
                Startup Tech Partner for Websites & Web-Apps.
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Links (Grouped together) */}
          <div className="lg:col-span-4 text-center lg:text-left">
            <h4 className="font-bold text-lg text-white mb-6">Explore</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-base hover:text-white transition-colors duration-300">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Get in Touch (Clear call-to-action area) */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <h4 className="font-bold text-lg text-white mb-6">Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <Link href="mailto:info@motionlabs.in" className="text-base hover:text-white transition-colors duration-300">
                  info@motionlabs.in
                </Link>
              </li>
            </ul>
            <div className="flex space-x-5 mt-6 justify-center lg:justify-start">
              <Link href="https://www.linkedin.com/company/motion-labs-tech/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors duration-300"><Linkedin size={20} /></Link>
              <Link href="https://www.instagram.com/motionlaabs/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors duration-300"><Instagram size={20} /></Link>
              <Link href="https://www.youtube.com/channel/UCpvb5ZI2nZNCLIKeK32B3fg" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400 hover:text-white transition-colors duration-300"><Youtube size={20} /></Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-20 pt-8 border-t border-gray-800 text-center text-base">
          <p>&copy; {new Date().getFullYear()} MotionLabs. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;