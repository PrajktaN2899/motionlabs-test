import type { Metadata } from 'next';
import PortfolioPageClient from './PortfolioPageClient';
import JsonLd from '@/components/JsonLd';
import { graph, webPage } from '@/lib/schema';

const TITLE = 'Portfolio | MotionLabs Work for Startups';
const DESCRIPTION = 'See the websites, web apps, AI tools, and creative media MotionLabs has built for startups and growing companies.';

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: '/portfolio/' },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: '/portfolio/',
        siteName: 'MotionLabs',
        type: 'website',
    },
};

export default function PortfolioPage() {
    return (
        <>
            <JsonLd
                data={graph(
                    ...webPage({
                        path: '/portfolio/',
                        name: TITLE,
                        description: DESCRIPTION,
                        type: 'CollectionPage',
                        crumbs: [{ name: 'Home', path: '/' }, { name: 'Portfolio', path: '/portfolio/' }],
                    }),
                )}
            />
            <PortfolioPageClient />
        </>
    );
}
