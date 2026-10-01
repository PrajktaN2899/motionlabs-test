import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
    title: 'Services | MotionLabs Tech & Creative Solutions',
    description: 'Product engineering, technology strategy, cloud & DevOps, cybersecurity, CRM & RevOps, data integration, AI automation, growth marketing, brand & creative, and hiring solutions for startups.',
    alternates: { canonical: '/services/' },
    openGraph: {
        title: 'Services | MotionLabs Tech & Creative Solutions',
        description: 'Product engineering, technology strategy, cloud & DevOps, cybersecurity, CRM & RevOps, data integration, AI automation, growth marketing, brand & creative, and hiring solutions for startups.',
        url: '/services/',
        siteName: 'MotionLabs',
        type: 'website',
    },
};

export default function ServicesPage() {
    return <ServicesPageClient />;
}
