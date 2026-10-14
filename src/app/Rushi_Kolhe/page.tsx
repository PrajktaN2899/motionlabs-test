import type { Metadata } from 'next';
import DigitalCard from './DigitalCard';
import JsonLd from '@/components/JsonLd';
import { FOUNDER_ID, ORG_ID, absoluteUrl, graph, webPage } from '@/lib/schema';

const TITLE = 'Rushikesh Kolhe | MotionLabs Digital Card';
const DESCRIPTION = 'Founder & Tech Partner at MotionLabs. Startup Tech Partner for Websites & Web-Apps.';
const THUMBNAIL = {
    url: '/cards/rushi-kolhe-og-v2.jpg',
    width: 820,
    height: 445,
    alt: 'Rushikesh Kolhe, Founder & Tech Partner at MotionLabs',
};

export const metadata: Metadata = {
    metadataBase: new URL('https://www.motionlabs.in'),
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: '/Rushi_Kolhe/',
        siteName: 'MotionLabs',
        type: 'profile',
        images: [THUMBNAIL],
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: [THUMBNAIL.url],
    },
};

const PERSON = {
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: 'Rushikesh Kolhe',
    jobTitle: 'Founder & Tech Partner',
    worksFor: { '@id': ORG_ID },
    email: 'mailto:rushi@motionlabs.in',
    telephone: '+917020421594',
    url: absoluteUrl('/Rushi_Kolhe/'),
    image: absoluteUrl('/cards/rushi-kolhe-photo.jpg'),
    sameAs: ['https://www.linkedin.com/in/rushikeshkolhe/'],
};

export default function RushiKolheCardPage() {
    return (
        <>
            <JsonLd
                data={graph(
                    ...webPage({
                        path: '/Rushi_Kolhe/',
                        name: TITLE,
                        description: DESCRIPTION,
                        type: 'ProfilePage',
                        about: FOUNDER_ID,
                        mainEntity: PERSON,
                    }),
                )}
            />
            <DigitalCard />
        </>
    );
}
