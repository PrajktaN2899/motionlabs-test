import ServicesPage from '../page';

export function generateStaticParams() {
  return [
    { slug: 'product-engineering' },
    { slug: 'technology-strategy' },
    { slug: 'cloud-devops' },
    { slug: 'cybersecurity-vapt' },
    { slug: 'crm-revops' },
  ];
}

export default async function DynamicServiceRoute({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  return <ServicesPage initialSlug={slug} />;
}