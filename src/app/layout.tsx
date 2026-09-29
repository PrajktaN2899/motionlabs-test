import Script from 'next/script';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// @ts-ignore
import "./globals.css";

import SiteChrome from "@/components/SiteChrome";

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
  icons: { 
    icon: '/favicon-32x32.png',        
    apple: '/apple-touch-icon.png',  
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
        suppressHydrationWarning={true}
      >
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CSN2X09Y52"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CSN2X09Y52');
          `}
        </Script>

        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}