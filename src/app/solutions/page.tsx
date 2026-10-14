import type { Metadata } from 'next';
import SolutionsPageClient from './SolutionsPageClient';
import JsonLd from '@/components/JsonLd';
import { graph, webPage } from '@/lib/schema';

const TITLE = 'Solutions | Custom Digital Tools by MotionLabs';
const DESCRIPTION = 'From quote calculators to AI chatbots and remote monitoring dashboards, MotionLabs builds custom digital solutions tailored to your business.';

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: '/solutions/' },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: '/solutions/',
        siteName: 'MotionLabs',
        type: 'website',
    },
};

export default function SolutionsPage() {
    return (
        <>
            <JsonLd
                data={graph(
                    ...webPage({
                        path: '/solutions/',
                        name: TITLE,
                        description: DESCRIPTION,
                        type: 'CollectionPage',
                        crumbs: [{ name: 'Home', path: '/' }, { name: 'Solutions', path: '/solutions/' }],
                    }),
                )}
            />
            <SolutionsPageClient />
        </>
    );
}
