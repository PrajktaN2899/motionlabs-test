import type { Metadata } from 'next';
import ServicesPageClient from '../ServicesPageClient';
import { SERVICE_META } from '../serviceMeta';
import { SERVICE_FAQS } from '../faqs';
import JsonLd from '@/components/JsonLd';
import { absoluteUrl, graph, service, webPage } from '@/lib/schema';

export function generateStaticParams() {
  return Object.keys(SERVICE_META).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = SERVICE_META[slug];

  if (!meta) {
    return { title: 'Services | MotionLabs' };
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/services/${slug}/` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/services/${slug}/`,
      siteName: 'MotionLabs',
      type: 'website',
    },
  };
}

export default async function DynamicServiceRoute({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const meta = SERVICE_META[slug];
  const path = `/services/${slug}/`;

  return (
    <>
      {meta && (
        <JsonLd
          data={graph(
            ...webPage({
              path,
              name: meta.title,
              description: meta.description,
              about: `${absoluteUrl(path)}#service`,
              faqs: SERVICE_FAQS[slug],
              crumbs: [
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services/' },
                { name: meta.name, path },
              ],
            }),
            service(path, meta.name, meta.description),
          )}
        />
      )}
      <ServicesPageClient initialSlug={slug} />
    </>
  );
}
