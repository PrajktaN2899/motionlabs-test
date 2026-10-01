import type { Metadata } from 'next';
import PortfolioPageClient from './PortfolioPageClient';

export const metadata: Metadata = {
    title: 'Portfolio | MotionLabs Work for Startups',
    description: 'See the websites, web apps, AI tools, and creative media MotionLabs has built for startups and growing companies.',
    alternates: { canonical: '/portfolio/' },
    openGraph: {
        title: 'Portfolio | MotionLabs Work for Startups',
        description: 'See the websites, web apps, AI tools, and creative media MotionLabs has built for startups and growing companies.',
        url: '/portfolio/',
        siteName: 'MotionLabs',
        type: 'website',
    },
};

export default function PortfolioPage() {
    return <PortfolioPageClient />;
}
