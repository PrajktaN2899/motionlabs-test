import type { Metadata } from 'next';
import CareersPageClient from './CareersPageClient';
import JsonLd from '@/components/JsonLd';
import { graph, webPage } from '@/lib/schema';

const TITLE = 'Careers at MotionLabs | Join Our Tech Team';
const DESCRIPTION = 'Explore open roles at MotionLabs and join a team building custom web apps, AI automation, and creative media for ambitious startups.';

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: '/careers/' },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: '/careers/',
        siteName: 'MotionLabs',
        type: 'website',
    },
};

export default function CareersPage() {
    return (
        <>
            <JsonLd
                data={graph(
                    ...webPage({
                        path: '/careers/',
                        name: TITLE,
                        description: DESCRIPTION,
                        crumbs: [{ name: 'Home', path: '/' }, { name: 'Careers', path: '/careers/' }],
                    }),
                )}
            />
            <CareersPageClient />
        </>
    );
}
