import type { Metadata } from 'next';
import ResourcesPageClient from './ResourcesPageClient';

export const metadata: Metadata = {
    title: 'Resources | MotionLabs Insights & Guides',
    description: 'Guides and insights from MotionLabs on building websites, web apps, AI automation, and digital tools for startups.',
    alternates: { canonical: '/resources/' },
    openGraph: {
        title: 'Resources | MotionLabs Insights & Guides',
        description: 'Guides and insights from MotionLabs on building websites, web apps, AI automation, and digital tools for startups.',
        url: '/resources/',
        siteName: 'MotionLabs',
        type: 'website',
    },
};

export default function ResourcesPage() {
    return <ResourcesPageClient />;
}
