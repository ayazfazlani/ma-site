// app/services/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ERP, Web & Business Software Services",
  description:
    "Explore MA Softs services: custom ERP development, custom website development, manufacturing software, and custom software for small business.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "ERP, Web & Business Software Services | MA Softs",
    description:
      "Custom ERP development, website development, manufacturing software, and business apps — built around how you work.",
    url: "https://masofts.com/services",
    type: "website",
  },
  twitter: {
    title: "ERP, Web & Business Software Services | MA Softs",
    description:
      "Custom ERP, websites, manufacturing software, and business apps from MA Softs.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
