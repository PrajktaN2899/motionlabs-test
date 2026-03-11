import Link from 'next/link';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MotionLabs",
  description: "Web & Web-App Solutions for Startups",
  icons: { // <-- ADDED THIS BLOCK FOR FAVICONS
    icon: '/favicon-32x32.png',        // Points to public/favicon-32x32.png
    apple: '/apple-touch-icon.png',  // Points to public/apple-touch-icon.png
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true} // <-- ADDED THIS TO FIX HYDRATION ERROR
      >
        <Navbar />
        <main>{children}</main> {/* <-- Wrap children in <main> */}
        <Footer />           {/* <-- Move Footer to after main content */}
        
        {/* Sticky "Get a Quote" Button - Global */}
        <Link 
          href="/contact" 
          className="fixed bottom-6 right-6 bg-gradient-to-r from-[#7B61FF] to-[#ff00a0] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 z-50"
        >
            Get a Quote
        </Link>
      </body>
    </html>
  );
}