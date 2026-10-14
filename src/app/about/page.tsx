import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';
import JsonLd from '@/components/JsonLd';
import { graph, webPage } from '@/lib/schema';

const TITLE = 'About MotionLabs | Creative Tech Studio for Startups';
const DESCRIPTION = 'MotionLabs is a team of developers, designers, and storytellers helping startups build custom digital tools, from web apps and AI bots to DevOps pipelines and creative media.';

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: '/about/' },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: '/about/',
        siteName: 'MotionLabs',
        type: 'website',
    },
};

export default function AboutPage() {
    return (
        <>
            <JsonLd
                data={graph(
                    ...webPage({
                        path: '/about/',
                        name: TITLE,
                        description: DESCRIPTION,
                        type: 'AboutPage',
                        crumbs: [{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about/' }],
                    }),
                )}
            />
            <AboutPageClient />
        </>
    );
}
