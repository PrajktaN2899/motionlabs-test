import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
    title: 'Contact MotionLabs | Start Your Project',
    description: 'Get in touch with MotionLabs to discuss your website, web app, AI automation, or creative media project. We reply fast and build startup-ready solutions.',
    alternates: { canonical: '/contact/' },
    openGraph: {
        title: 'Contact MotionLabs | Start Your Project',
        description: 'Get in touch with MotionLabs to discuss your website, web app, AI automation, or creative media project. We reply fast and build startup-ready solutions.',
        url: '/contact/',
        siteName: 'MotionLabs',
        type: 'website',
    },
};

export default function ContactPage() {
    return <ContactPageClient />;
}
