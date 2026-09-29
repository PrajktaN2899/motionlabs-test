import type { Metadata } from 'next';
import DigitalCard from './DigitalCard';

const TITLE = 'Rushikesh Kolhe | MotionLabs Digital Card';
const DESCRIPTION = 'Founder & Tech Partner at MotionLabs. Startup Tech Partner for Websites & Web-Apps.';
const THUMBNAIL = {
    url: '/cards/rushi-kolhe-thumbnail.png',
    width: 918,
    height: 758,
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

export default function RushiKolheCardPage() {
    return <DigitalCard />;
}
