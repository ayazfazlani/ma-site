// app/services/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services – Web Development, SEO, PPC & Digital Marketing",
  description:
    "Explore MA Softs services: custom web development from $499, SEO from $299/mo, PPC advertising, social media marketing, content creation & analytics. Free consultation.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Digital Services – MA Softs",
    description:
      "Web Development, SEO, PPC, Social Media Marketing, Content & Analytics. Affordable pricing for businesses of all sizes.",
    url: "https://masofts.com/services",
    type: "website",
  },
  twitter: {
    title: "MA Softs Services – Web Dev, SEO, PPC & More",
    description:
      "Custom web development from $499, SEO from $299/mo, and full digital marketing services.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
