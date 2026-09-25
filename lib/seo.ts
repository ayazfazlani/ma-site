/** Display-only SEO overlays. Never writes to the database. */

export const HOMEPAGE_SERVICE_SLUGS = [
  "custom-erp",
  "manufacturing",
  "web-development",
] as const;

export const HOMEPAGE_SERVICES = [
  {
    slug: "custom-erp",
    icon: "Database",
    title: "ERP & Business Management Systems",
    description:
      "Connect departments, approvals, inventory, sales, purchasing and reporting in one database-backed business system.",
    gradient: "from-blue-600 to-indigo-500",
    glow: "group-hover:shadow-indigo-500/20",
    number: "01",
  },
  {
    slug: "manufacturing",
    icon: "Factory",
    title: "Manufacturing Software",
    description:
      "Connect the shop floor to management with production, inventory, quality control, roles and live reporting.",
    gradient: "from-slate-600 to-blue-500",
    glow: "group-hover:shadow-slate-500/20",
    number: "02",
  },
  {
    slug: "web-development",
    icon: "Globe",
    title: "Websites & Full-Stack Web Applications",
    description:
      "Build fast, SEO-ready websites, customer portals, dashboards and full-stack web applications with secure databases and integrations.",
    gradient: "from-primary-500 to-primary-400",
    glow: "group-hover:shadow-primary-500/20",
    number: "03",
  },
  {
    slug: "web-development",
    icon: "Layout",
    title: "Business Automation & SaaS",
    description:
      "Automate manual work, connect existing tools and turn a product idea into a production-ready SaaS platform.",
    gradient: "from-cyan-500 to-accent-400",
    glow: "group-hover:shadow-accent-400/20",
    number: "04",
  },
] as const;

export function uniqueBySlugOrTitle<T extends { slug?: string; title?: string; id?: string }>(
  items: T[]
): T[] {
  const seenSlugs = new Set<string>();
  const seenTitles = new Set<string>();
  return items.filter((item) => {
    const slug = (item.slug || "").toLowerCase().trim();
    const title = (item.title || "").toLowerCase().trim();
    if (slug && seenSlugs.has(slug)) return false;
    if (title && seenTitles.has(title)) return false;
    if (slug) seenSlugs.add(slug);
    if (title) seenTitles.add(title);
    return true;
  });
}

export const PORTFOLIO_SEO: Record<string, { title: string; description: string }> = {
  "plastic-factory-erp": {
    title: "ERP for Plastic Industry",
    description:
      "Case study: ERP for the plastic industry — custom production tracking, inventory, quality control, and supply chain software built for a manufacturing plant.",
  },
};

export function applyPortfolioSeo<T extends { slug?: string; title: string; description?: string }>(
  project: T
): T {
  if (!project.slug) return project;
  const seo = PORTFOLIO_SEO[project.slug];
  if (!seo) return project;
  return {
    ...project,
    title: seo.title,
    description: seo.description,
  };
}
