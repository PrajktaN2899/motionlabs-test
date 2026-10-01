import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
    title: 'About MotionLabs | Creative Tech Studio for Startups',
    description: 'MotionLabs is a team of developers, designers, and storytellers helping startups build custom digital tools, from web apps and AI bots to DevOps pipelines and creative media.',
    alternates: { canonical: '/about/' },
    openGraph: {
        title: 'About MotionLabs | Creative Tech Studio for Startups',
        description: 'MotionLabs is a team of developers, designers, and storytellers helping startups build custom digital tools, from web apps and AI bots to DevOps pipelines and creative media.',
        url: '/about/',
        siteName: 'MotionLabs',
        type: 'website',
    },
};

export default function AboutPage() {
    return <AboutPageClient />;
}
