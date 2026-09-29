import type { Metadata } from 'next';
import DigitalCard from './DigitalCard';

export const metadata: Metadata = {
    title: 'Rushikesh Kolhe | MotionLabs Digital Card',
    description: 'Founder & Tech Partner at MotionLabs. Startup Tech Partner for Websites & Web-Apps.',
};

export default function RushiKolheCardPage() {
    return <DigitalCard />;
}
