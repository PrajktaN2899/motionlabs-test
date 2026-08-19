'use client';
import React from 'react';

interface MotionLabsHeaderProps {
  onBack?: () => void;
}

export default function MotionLabsHeader({
  onBack,
}: MotionLabsHeaderProps) {

  const handleContact = () => {
    if (onBack) {
      onBack();
      return;
    }
  };

  // 1. 'sticky' keeps it in the document flow.
  // 2. 'bg-[#0F172A]' hides the global layout header underneath.
  // 3. No bottom border so it blends perfectly into the hero section.
  return (
    <header className="sticky top-0 z-[100] bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">

        {/* Logo */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center font-bold text-xl tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
          title="Back to Services"
        >
          <span className="text-[#06B6D4]">
            Motion
          </span>
          <span className="text-[#FF00A0]">
            Labs
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <button type="button" className="hover:text-white transition-colors">
            About Us
          </button>
          <button type="button" className="hover:text-white transition-colors">
            Services
          </button>
          <button type="button" className="hover:text-white transition-colors">
            Solutions
          </button>
          <button type="button" className="hover:text-white transition-colors">
            Portfolio
          </button>
          <button type="button" className="hover:text-white transition-colors">
            Resources
          </button>
          <button type="button" className="hover:text-white transition-colors">
            Careers
          </button>
        </nav>

        {/* Contact Us */}
        <button
          type="button"
          onClick={handleContact}
          className="
            px-6
            py-2.5
            text-sm
            font-bold
            text-white
            bg-gradient-to-r
            from-[#7B61FF]
            to-[#FF00A0]
            rounded-full
            hover:opacity-90
            hover:scale-[1.02]
            transition-all
            duration-200
            shadow-[0_0_20px_rgba(255,0,160,0.30)]
            whitespace-nowrap
          "
        >
          Contact Us
        </button>

      </div>
    </header>
  );
}