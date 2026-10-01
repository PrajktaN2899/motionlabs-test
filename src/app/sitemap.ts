import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.motionlabs.in';

const SERVICE_SLUGS = [
  'product-engineering',
  'technology-strategy',
  'cloud-devops',
  'cybersecurity-vapt',
  'crm-revops',
  'data-integration',
  'ai-automation',
  'growth-gtm',
  'brand-creative',
  'hiring-recruitment',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    'about',
    'services',
    'solutions',
    'portfolio',
    'resources',
    'careers',
    'contact',
  ].map((route) => ({
    url: `${BASE_URL}/${route}${route ? '/' : ''}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = SERVICE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/services/${slug}/`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes];
}
