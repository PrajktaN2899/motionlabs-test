import type { MetadataRoute } from 'next';
import { SERVICE_META } from './services/serviceMeta';

const BASE_URL = 'https://www.motionlabs.in';

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

  const serviceRoutes = Object.keys(SERVICE_META).map((slug) => ({
    url: `${BASE_URL}/services/${slug}/`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes];
}
