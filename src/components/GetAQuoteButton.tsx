'use client';
import Link from 'next/link';
import React from 'react';



const GetAQuoteButton = () => {
  return (
    <Link 
      href="/contact"
      className="fixed bottom-6 right-6 bg-gradient-to-r from-[#7B61FF] to-[#ff00a0] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 z-50"
    >
      Get a Quote
    </Link>
  );
};

export default GetAQuoteButton;

