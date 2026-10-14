import type { Metadata } from 'next';
import ResourcesPageClient from './ResourcesPageClient';
import JsonLd from '@/components/JsonLd';
import { graph, webPage } from '@/lib/schema';

const TITLE = 'Resources | MotionLabs Insights & Guides';
const DESCRIPTION = 'Guides and insights from MotionLabs on building websites, web apps, AI automation, and digital tools for startups.';

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: '/resources/' },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: '/resources/',
        siteName: 'MotionLabs',
        type: 'website',
    },
};

export default function ResourcesPage() {
    return (
        <>
            <JsonLd
                data={graph(
                    ...webPage({
                        path: '/resources/',
                        name: TITLE,
                        description: DESCRIPTION,
                        type: 'CollectionPage',
                        crumbs: [{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources/' }],
                    }),
                )}
            />
            <ResourcesPageClient />
        </>
    );
}
