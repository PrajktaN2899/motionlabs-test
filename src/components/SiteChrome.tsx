'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Standalone pages (e.g. digital cards) that render without the site navbar, footer and quote button
const BARE_ROUTES = ['/Rushi_Kolhe'];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const isBare = BARE_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  if (isBare) return <main>{children}</main>;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />

      {/* Sticky "Get a Quote" Button - Global */}
      <Link
        href="/contact"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-[#7B61FF] to-[#ff00a0] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 z-50"
      >
          Get a Quote
      </Link>
    </>
  );
}
