import type { Faq } from '@/lib/schema';

// FAQs shown on the service landing pages; also used for their FAQPage structured data
export const SERVICE_FAQS: Record<string, Faq[]> = {
  'product-engineering': [
    { q: "What is custom software development?", a: "Custom software development is the design and build of applications tailored to a specific business's workflows and requirements, as opposed to configuring off-the-shelf or template-based software." },
    { q: "How long does it take to build a custom web or mobile application?", a: "Timelines vary by scope, but most MVPs and first-version products take 8–16 weeks from finalized scope to launch, with larger platforms taking longer and typically shipped in phases." },
    { q: "What's the difference between a web app and a SaaS product?", a: "A web app is software accessed through a browser for a single business's use; a SaaS (Software-as-a-Service) product is built to be sold to multiple customers, with multi-tenancy, subscription billing, and account management built in." },
    { q: "What is legacy application modernization?", a: "Legacy application modernization is the process of updating outdated software systems, old codebases, unsupported frameworks, or fragile infrastructure, so they're secure, maintainable, and able to integrate with modern tools and APIs." },
    { q: "Do you build internal tools as well as customer-facing products?", a: "Yes, this service covers both: customer-facing apps, portals, and e-commerce experiences, as well as the internal dashboards and business applications your team uses to run day-to-day operations." },
    { q: "Can your team work inside our existing codebase, or do you only build from scratch?", a: "Both, we regularly work inside existing codebases alongside in-house engineering teams, following established architecture and coding standards, as well as building new products from the ground up." },
    { q: "What happens after launch? Do you offer ongoing support?", a: "Yes, ongoing maintenance, feature development, and support are available after launch; every build also comes with documentation so an in-house team can take over independently if preferred." }
  ],
  'data-integration': [
    { q: "What is business systems integration?", a: "Business systems integration is the practice of connecting separate software platforms, such as a CRM, ERP, and accounting system, so data syncs automatically instead of being entered manually in multiple places." },
    { q: "What's the difference between a data pipeline and a dashboard?", a: "A data pipeline moves and transforms raw data from its source systems into a usable format; a dashboard is the visual layer on top that presents that data for reporting and decision-making." },
    { q: "What is a data warehouse, and does a small company need one?", a: "A data warehouse is a centralized, structured store for business data built for analytics rather than daily transactions; even small companies benefit once they're pulling reports from more than two or three source systems." },
    { q: "Why does data quality matter for reporting?", a: "Reports and dashboards are only as reliable as the data feeding them, data quality and governance work catches duplicates, inconsistencies, and gaps before they distort business decisions." },
    { q: "What is analytics engineering?", a: "Analytics engineering is the process of modeling raw, messy data into clean, well-structured tables and metrics that reporting tools and dashboards can build on consistently." },
    { q: "Can you integrate our CRM with our other business tools?", a: "Yes, CRM integration is a core part of this service, connecting your CRM with marketing, billing, support, and product tools so customer data isn't siloed." },
    { q: "How long does a typical integration or data project take?", a: "Smaller integrations between two systems can take 2–4 weeks; full data architecture, warehousing, and dashboard builds typically take 6–12 weeks depending on the number of source systems involved." }
  ],
  'crm-revops': [
    { q: "What is RevOps?", a: "RevOps (Revenue Operations) is the alignment of sales, marketing, and customer success operations, and the systems behind them, around a single, shared view of revenue and pipeline." },
    { q: "What is CRM implementation?", a: "CRM implementation is the process of setting up, configuring, and customizing a customer relationship management platform, such as Salesforce, so it matches a company's actual sales process rather than a generic default setup." },
    { q: "How is sales automation different from marketing automation?", a: "Sales automation streamlines tasks within the sales process itself, like lead routing and follow-ups, while marketing automation manages campaigns, nurture sequences, and lead scoring before a prospect reaches sales." },
    { q: "Why isn't my sales team using our CRM?", a: "Low CRM adoption is usually a sign the system doesn't match the team's actual workflow, CRM optimization work realigns the setup to how deals really move, which is typically what drives adoption back up." },
    { q: "What is data enrichment?", a: "Data enrichment is the process of filling in missing information on contact and account records, such as company size, role, or industry, using external data sources, so sales and marketing have more complete information to work with." },
    { q: "Do you work with CRMs other than Salesforce?", a: "Yes, while Salesforce development is a core offering, CRM implementation and optimization covers other platforms as well, depending on what a business already uses." },
    { q: "How long does it take to fix a broken CRM setup?", a: "A focused CRM cleanup and reconfiguration typically takes 3–6 weeks; larger RevOps engagements involving automation, data cleansing, and dashboarding across sales and marketing usually run 6–10 weeks." }
  ],
  'growth-gtm': [
    { q: "What is AEO (Answer Engine Optimization)?", a: "AEO is the practice of structuring website content, clear definitions, direct answers, FAQ formatting, so AI-driven answer engines like ChatGPT and Perplexity can accurately surface and cite it in response to user questions." },
    { q: "What is GEO (Generative Engine Optimization)?", a: "GEO is the practice of optimizing content so it's more likely to be referenced or summarized by generative AI search tools, such as Google AI Overviews, rather than optimizing purely for traditional ranked search results." },
    { q: "Is GEO replacing SEO?", a: "No, GEO and AEO extend traditional SEO rather than replace it; well-structured, authoritative content tends to perform well across ranked search, answer engines, and generative search simultaneously." },
    { q: "What is a go-to-market strategy?", a: "A go-to-market strategy is the specific plan a business uses to launch a product or enter a market, defining the target audience, positioning, channels, and messaging needed to reach and convert customers." },
    { q: "What's the difference between demand generation and lead generation?", a: "Demand generation builds awareness and interest at the top of the funnel before a lead is captured; lead generation focuses specifically on capturing contact information from qualified prospects for sales to follow up with." },
    { q: "How is B2B marketing different from consumer marketing?", a: "B2B marketing is built around longer sales cycles and multiple decision-makers, often using account-based strategies, while consumer marketing typically targets faster, individual purchase decisions." },
    { q: "How long does it take to see results from SEO and GTM work?", a: "Performance marketing and lead generation can show measurable results within weeks; SEO, AEO, and GEO are longer-term investments that typically show meaningful traction within 3–6 months." }
  ],
  'brand-creative': [
    { q: "What's included in brand identity work?", a: "Brand identity typically includes logo, color palette, typography, tone of voice, and visual guidelines that keep a company's presence consistent across the website, product, and marketing materials." },
    { q: "What's the difference between brand strategy and brand identity?", a: "Brand strategy defines how a business is positioned and differentiated in the market; brand identity is the visual and verbal system, logo, colors, typography, tone of voice, that expresses that strategy consistently." },
    { q: "Why do B2B and SaaS companies need product demo videos?", a: "Demo videos let prospects and new users understand a product's value in minutes rather than requiring a live walkthrough, shortening the sales cycle and improving onboarding." },
    { q: "What's the difference between a demo video and an explainer video?", a: "A demo video shows a specific product in action; an explainer video breaks down a broader concept, problem, or process, often before introducing the product itself." },
    { q: "How does brand work connect to conversion rate optimization?", a: "A clear, consistent brand builds the trust that reduces hesitation at the point of conversion, visitors are more likely to sign up or buy from a company that feels credible and cohesive." },
    { q: "Do you redesign an existing brand, or only build new ones?", a: "Both, this service covers full brand builds for new companies as well as rebrands and brand refreshes for companies whose identity hasn't kept pace with how the business has grown." },
    { q: "How long does a brand identity project take?", a: "A full brand strategy and identity project typically takes 4–8 weeks; video production timelines vary by scope but usually run 2–6 weeks per video depending on complexity." }
  ],
  'hiring-recruitment': [
    { q: "What is Contract Staffing?", a: "Contract Staffing is a staffing arrangement where a staffing company employs, pays, and manages compliance for a worker, while that worker is deployed to work full-time and exclusively for a client business." },
    { q: "How is Contract Staffing different from hiring a freelancer or independent contractor?", a: "Under Contract Staffing, the person works full-time and exclusively for one client, integrated into that client's team and processes, whereas freelancers and contractors typically split time across multiple clients and projects." },
    { q: "Who pays the employee's salary under this model?", a: "MotionLabs pays the employee's salary directly; the client company pays MotionLabs, which covers payroll, statutory compliance, and employment administration." },
    { q: "Does the employee work at MotionLabs or at the client company?", a: "The employee works full-time for the client company, attending their meetings, using their tools, and reporting to their managers, while remaining formally employed by MotionLabs." },
    { q: "What does a hiring assessment involve?", a: "A hiring assessment is a structured evaluation of a candidate's skills and role-fit, which can include technical tests, case exercises, or role-specific screening, completed before a candidate is presented to the client." },
    { q: "What's included in background verification?", a: "Background verification typically includes employment history checks, education verification, identity confirmation, and reference checks completed before a candidate is onboarded." },
    { q: "Can we hire through this model if we don't have a legal entity in the employee's location?", a: "Yes, this is one of the main advantages of the Contract Staffing model, since MotionLabs is the legal employer of record and handles local compliance, allowing a client to build a team in a location without setting up an entity there first." },
    { q: "What happens if a placement isn't working out?", a: "MotionLabs manages the replacement and backfill process, sourcing and vetting a new candidate to minimize disruption to the client's ongoing work." }
  ],
};
