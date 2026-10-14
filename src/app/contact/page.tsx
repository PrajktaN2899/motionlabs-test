import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';
import JsonLd from '@/components/JsonLd';
import { graph, webPage } from '@/lib/schema';

const TITLE = 'Contact MotionLabs | Start Your Project';
const DESCRIPTION = 'Get in touch with MotionLabs to discuss your website, web app, AI automation, or creative media project. We reply fast and build startup-ready solutions.';

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: '/contact/' },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: '/contact/',
        siteName: 'MotionLabs',
        type: 'website',
    },
};

export default function ContactPage() {
    return (
        <>
            <JsonLd
                data={graph(
                    ...webPage({
                        path: '/contact/',
                        name: TITLE,
                        description: DESCRIPTION,
                        type: 'ContactPage',
                        crumbs: [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }],
                    }),
                )}
            />
            <ContactPageClient />
        </>
    );
}
