# MotionLabs Website

Marketing site for [MotionLabs](https://www.motionlabs.in): services, portfolio, careers, blog, contact, and team digital cards.

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Three.js and lucide-react.

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

| Command | What it does |
|---|---|
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint (lint is skipped during `next build`) |

### Environment variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-api-host
```

This is the external backend used for forms, jobs and blog content. Without it the site still runs, but the contact form, careers form and job list, resources/blog list, and blog posts will not load data.

## Project structure

```
src/
├── app/
│   ├── layout.tsx            Root layout: fonts, Google Analytics, SiteChrome
│   ├── page.tsx              Home page
│   ├── about/  solutions/  portfolio/  resources/  careers/  contact/
│   ├── services/
│   │   ├── page.tsx          Services grid + shows the selected landing page
│   │   ├── *LandingPage.tsx  One component per service (10 total)
│   │   └── [slug]/page.tsx   Direct links like /services/cloud-devops
│   ├── blog/
│   │   ├── [slug]/           Blog post page (SEO metadata + client fetch)
│   │   └── BlockRenderer.tsx Renders blog content blocks
│   ├── (admin)/              Admin UI mockups (not wired to data, no auth)
│   └── Rushi_Kolhe/          Digital card for Rushikesh Kolhe
└── components/
    ├── SiteChrome.tsx        Navbar + Footer + "Get a Quote" button, hidden on bare routes
    ├── Navbar.tsx
    └── Footer.tsx
public/
├── logos/clients/            Client logos
└── cards/                    Link-preview thumbnails for digital cards
```

Most pages are client components with their own Three.js hero animation, using the brand gradient `#00E5FF` → `#7B61FF` → `#ff00a0`.

## Services pages

The 10 service landing pages are not separate routes. `services/page.tsx` shows one of them based on state and updates the URL with `history.pushState`. `services/[slug]/page.tsx` pre-renders each slug and passes it in as `initialSlug`, so direct links work.

Slugs: `product-engineering`, `technology-strategy`, `cloud-devops`, `cybersecurity-vapt`, `crm-revops`, `data-integration`, `ai-automation`, `growth-gtm`, `brand-creative`, `hiring-recruitment`.

To add a service, create its `*LandingPage.tsx`, wire it into `services/page.tsx`, and add its slug to `generateStaticParams` in `services/[slug]/page.tsx`.

## Backend API

All calls go to `NEXT_PUBLIC_API_BASE_URL`:

| Page | Endpoint |
|---|---|
| Contact | `POST /contact/create` |
| Careers | `GET /jobs/list`, `POST /careers/apply` |
| Resources | `GET /blogs/list`, `GET /category/getCategories` |
| Blog post | `GET /blogs/details/slug/:slug` |

## Digital cards

Standalone contact cards for team members, served without the site navbar and footer.

Live: https://www.motionlabs.in/Rushi_Kolhe/

To add a card:

1. Create `src/app/<Name>/page.tsx` (metadata + link preview) and `src/app/<Name>/DigitalCard.tsx` (the card UI). Copy `Rushi_Kolhe/` as a starting point.
2. Add `'/<Name>'` to `BARE_ROUTES` in `src/components/SiteChrome.tsx` so the site navbar and footer are hidden.
3. Put the link-preview image in `public/cards/` and reference it in the page's `openGraph.images`. Around 1200×630 works best for WhatsApp and LinkedIn.

Card URLs are case-sensitive (`/Rushi_Kolhe` works, `/rushi_kolhe` does not). WhatsApp and LinkedIn cache link previews, so after changing a thumbnail, test with a new URL such as `?v=2`, or refresh it in [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

## Deployment

Pushes to `main` are deployed to https://www.motionlabs.in, usually within a few minutes. `next.config.ts` sets `trailingSlash: true` and unoptimized images.
