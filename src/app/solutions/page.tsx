import type { Metadata } from 'next';
import SolutionsPageClient from './SolutionsPageClient';

export const metadata: Metadata = {
    title: 'Solutions | Custom Digital Tools by MotionLabs',
    description: 'From quote calculators to AI chatbots and remote monitoring dashboards, MotionLabs builds custom digital solutions tailored to your business.',
    alternates: { canonical: '/solutions/' },
    openGraph: {
        title: 'Solutions | Custom Digital Tools by MotionLabs',
        description: 'From quote calculators to AI chatbots and remote monitoring dashboards, MotionLabs builds custom digital solutions tailored to your business.',
        url: '/solutions/',
        siteName: 'MotionLabs',
        type: 'website',
    },
};

export default function SolutionsPage() {
    return <SolutionsPageClient />;
}
