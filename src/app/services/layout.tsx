// app/services/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services - Digital Marketing Solutions",
  description:
    "Comprehensive digital marketing services including SEO Optimization, Social Media Marketing, Content Marketing, Web Development, PPC Advertising, and Analytics & Reporting. Starting from $499/month.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Digital Marketing Services - Media Linkers",
    description:
      "SEO, Social Media, Content Marketing, Web Development, PPC, Analytics. Comprehensive solutions starting from $499/month.",
    url: "https://medialinkers.pk/services",
    type: "website",
  },
  twitter: {
    title: "Digital Marketing Services - Media Linkers",
    description:
      "SEO, Social Media, Content Marketing, Web Development, PPC, Analytics. Starting from $499/month.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
