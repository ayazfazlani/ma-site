import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Optimization Services – Rank Higher from $299/mo",
  description:
    "Dominate Google search rankings with our data-driven SEO services from $299/month. Technical SEO, keyword research, link building & content optimization.",
  alternates: {
    canonical: "/services/seo",
  },
  openGraph: {
    title: "SEO Optimization Services – MA Softs",
    description:
      "Comprehensive SEO services: technical audits, on-page optimization, link building & local SEO. Plans from $299/month.",
    url: "https://www.masofts.com/services/seo",
    type: "website",
  },
};

export default function SeoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
