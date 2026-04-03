import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics & Reporting Services – Data-Driven Insights from $249/mo",
  description:
    "Professional analytics setup with GA4, custom dashboards & conversion tracking from $249/month. Make data-driven decisions that grow your business.",
  alternates: {
    canonical: "/services/analytics",
  },
  openGraph: {
    title: "Analytics & Reporting Services – MA Softs",
    description:
      "GA4 setup, custom dashboards, conversion tracking & performance reporting. Plans from $249/month.",
    url: "https://www.masofts.com/services/analytics",
    type: "website",
  },
};

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
