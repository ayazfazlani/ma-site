// app/services/seo/page.tsx
import { Metadata } from "next";
import SEOClient from "./SEOClient";

export const metadata: Metadata = {
  title: "Advanced SEO Optimization Services – Rank Higher",
  description: "Boost your organic traffic and visibility with MA Softs' data-driven SEO strategies, including technical audits, on-page optimization, and authority building.",
  alternates: {
    canonical: "https://www.masofts.com/services/seo",
  },
};

export default function SEOPage() {
  return <SEOClient />;
}
