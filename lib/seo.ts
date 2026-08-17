/** Display-only SEO overlays. Never writes to the database. */

export const HOMEPAGE_SERVICE_SLUGS = [
  "custom-erp",
  "web-development",
  "manufacturing",
  "small-business",
] as const;

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
