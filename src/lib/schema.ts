// Schema.org JSON-LD builders. Every page links its nodes to the sitewide Organization and
// WebSite nodes by @id, so search and answer engines read the site as one connected graph.

export const SITE_URL = 'https://www.motionlabs.in';
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const FOUNDER_ID = `${SITE_URL}/Rushi_Kolhe/#person`;

export type Crumb = { name: string; path: string };
export type Faq = { q: string; a: string };

type PageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'ProfilePage';

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });

export const siteGraph = graph(
  {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'MotionLabs',
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: `${SITE_URL}/ml-logo-icon1.png`,
      width: 1080,
      height: 1080,
      caption: 'MotionLabs',
    },
    image: { '@id': `${SITE_URL}/#logo` },
    slogan: 'Startup Tech Partner for Websites & Web-Apps',
    description:
      'Startup Tech Partner for Websites & Web-Apps. Custom software, AI automation, cloud & DevOps, cybersecurity, CRM & RevOps, growth marketing, and creative media.',
    email: 'info@motionlabs.in',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'info@motionlabs.in',
      availableLanguage: ['en'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '19:00',
      },
    },
    founder: { '@id': FOUNDER_ID },
    knowsAbout: [
      'Custom software development',
      'Technology strategy',
      'Cloud & DevOps',
      'Cybersecurity & VAPT',
      'CRM & RevOps',
      'Data integration',
      'AI & automation',
      'Growth marketing, SEO, AEO & GEO',
      'Brand & creative',
      'Hiring & contract staffing',
    ],
    sameAs: [
      'https://www.linkedin.com/company/motion-labs-tech/',
      'https://www.instagram.com/motionlaabs/',
      'https://www.youtube.com/channel/UCpvb5ZI2nZNCLIKeK32B3fg',
    ],
  },
  {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: 'MotionLabs',
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  },
);

export function breadcrumb(path: string, crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

// A page's own node. Passing FAQs turns it into an FAQPage; passing crumbs also emits a BreadcrumbList.
export function webPage(opts: {
  path: string;
  name: string;
  description: string;
  type?: PageType;
  about?: string;
  mainEntity?: object;
  faqs?: Faq[];
  crumbs?: Crumb[];
}) {
  const url = absoluteUrl(opts.path);
  const page = {
    '@type': opts.faqs?.length ? 'FAQPage' : opts.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en',
    ...(opts.about && { about: { '@id': opts.about } }),
    ...(opts.crumbs && { breadcrumb: { '@id': `${url}#breadcrumb` } }),
    ...(opts.mainEntity && { mainEntity: opts.mainEntity }),
    ...(opts.faqs?.length && {
      mainEntity: opts.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    }),
  };
  return opts.crumbs ? [page, breadcrumb(opts.path, opts.crumbs)] : [page];
}

export function service(path: string, name: string, description: string) {
  const url = absoluteUrl(path);
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    serviceType: name,
    description,
    url,
    provider: { '@id': ORG_ID },
  };
}

export function blogPosting(
  path: string,
  blog: {
    title: string;
    metaDescription?: string;
    subtitle?: string;
    featuredImage?: string;
    createdAt?: string;
    updatedAt?: string;
    tags?: string[];
  },
) {
  const url = absoluteUrl(path);
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: blog.title,
    description: blog.metaDescription || blog.subtitle || undefined,
    ...(blog.featuredImage && { image: [blog.featuredImage] }),
    ...(blog.createdAt && {
      datePublished: blog.createdAt,
      dateModified: blog.updatedAt || blog.createdAt,
    }),
    ...(blog.tags?.length && { keywords: blog.tags.join(', ') }),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@id': `${url}#webpage` },
    isPartOf: { '@id': WEBSITE_ID },
  };
}
