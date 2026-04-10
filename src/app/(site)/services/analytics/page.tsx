// app/services/analytics/page.tsx
import { Metadata } from "next";
import AnalyticsClient from "./AnalyticsClient";

export const metadata: Metadata = {
  title: "Analytics & Business Intelligence Reporting Services",
  description: "Transform your raw data into actionable insights. MA Softs provides advanced analytics setup, GA4 migrations, and custom BI reporting for businesses.",
  alternates: {
    canonical: "https://www.masofts.com/services/analytics",
  },
};

export default function AnalyticsPage() {
  return <AnalyticsClient />;
}
