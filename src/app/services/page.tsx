import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';
import { SERVICE_META } from './serviceMeta';
import JsonLd from '@/components/JsonLd';
import { absoluteUrl, graph, webPage } from '@/lib/schema';

const TITLE = 'Services | MotionLabs Tech & Creative Solutions';
const DESCRIPTION = 'Product engineering, technology strategy, cloud & DevOps, cybersecurity, CRM & RevOps, data integration, AI automation, growth marketing, brand & creative, and hiring solutions for startups.';

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: '/services/' },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: '/services/',
        siteName: 'MotionLabs',
        type: 'website',
    },
};

export default function ServicesPage() {
    return (
        <>
            <JsonLd
                data={graph(
                    ...webPage({
                        path: '/services/',
                        name: TITLE,
                        description: DESCRIPTION,
                        type: 'CollectionPage',
                        mainEntity: {
                            '@type': 'ItemList',
                            itemListElement: Object.entries(SERVICE_META).map(([slug, meta], i) => ({
                                '@type': 'ListItem',
                                position: i + 1,
                                name: meta.name,
                                url: absoluteUrl(`/services/${slug}/`),
                            })),
                        },
                        crumbs: [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }],
                    }),
                )}
            />
            <ServicesPageClient />
        </>
    );
}
