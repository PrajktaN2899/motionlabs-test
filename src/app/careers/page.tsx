import type { Metadata } from 'next';
import CareersPageClient from './CareersPageClient';

export const metadata: Metadata = {
    title: 'Careers at MotionLabs | Join Our Tech Team',
    description: 'Explore open roles at MotionLabs and join a team building custom web apps, AI automation, and creative media for ambitious startups.',
    alternates: { canonical: '/careers/' },
    openGraph: {
        title: 'Careers at MotionLabs | Join Our Tech Team',
        description: 'Explore open roles at MotionLabs and join a team building custom web apps, AI automation, and creative media for ambitious startups.',
        url: '/careers/',
        siteName: 'MotionLabs',
        type: 'website',
    },
};

export default function CareersPage() {
    return <CareersPageClient />;
}
