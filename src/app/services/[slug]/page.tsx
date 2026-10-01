import type { Metadata } from 'next';
import ServicesPageClient from '../ServicesPageClient';

const SERVICE_META: Record<string, { title: string; description: string }> = {
  'product-engineering': {
    title: 'Product & Software Engineering Services | MotionLabs',
    description: 'Custom web apps, SaaS products, APIs, and internal tools built to match how your business actually operates, from scope and architecture to clean handoff.',
  },
  'technology-strategy': {
    title: 'Technology Strategy & Advisory Services | MotionLabs',
    description: 'Technical audits, roadmaps, and AI/cloud readiness assessments that tell you what to build next and why, before you commit budget.',
  },
  'cloud-devops': {
    title: 'Cloud, DevOps & Reliability Engineering | MotionLabs',
    description: 'Cloud architecture, CI/CD automation, infrastructure management, and reliability engineering that scales with your product.',
  },
  'cybersecurity-vapt': {
    title: 'Cybersecurity & VAPT Services | MotionLabs',
    description: 'Web, mobile, API, cloud, and AI security testing that finds real vulnerabilities before attackers do, with reports your team can act on.',
  },
  'crm-revops': {
    title: 'CRM & RevOps Services | MotionLabs',
    description: 'CRM implementation, sales automation, and revenue operations that align sales, marketing, and customer success around one source of truth.',
  },
  'data-integration': {
    title: 'Data Integration & Business Systems | MotionLabs',
    description: 'Connect your CRM, ERP, and business tools with reliable API integrations, clean data architecture, and dashboards you can trust.',
  },
  'ai-automation': {
    title: 'AI & Intelligent Automation Services | MotionLabs',
    description: 'AI agents, chatbots, copilots, and workflow automation that take over repetitive work so your team can focus on judgment calls.',
  },
  'growth-gtm': {
    title: 'Growth, Marketing & GTM Services | MotionLabs',
    description: 'Performance marketing, SEO, AEO, and GEO strategy that gets your business found and converts the traffic you already earn.',
  },
  'brand-creative': {
    title: 'Brand & Creative Services | MotionLabs',
    description: 'Brand strategy, visual identity, and product storytelling that makes your business memorable and credible.',
  },
  'hiring-recruitment': {
    title: 'Hiring & Contract Staffing Services | MotionLabs',
    description: 'Recruitment, assessment, and contract staffing that gets you dedicated full-time talent without the payroll and compliance burden.',
  },
};

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

  return <ServicesPageClient initialSlug={slug} />;
}
