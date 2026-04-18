// app/about/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us – Custom Software Development Team in Pakistan",
  description:
    "Meet the MA Softs team led by Ayaz. 5+ years building high-performance web applications, ERP systems & SaaS platforms for startups and businesses worldwide.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About MA Softs – Software Development Experts",
    description:
      "5+ years delivering custom web apps, ERP systems & SaaS solutions. Learn about our mission, values, and the team behind MA Softs.",
    url: "https://masofts.com/about",
    type: "website",
  },
  twitter: {
    title: "About MA Softs – Software Development Experts",
    description:
      "Custom software development team in Pakistan. 40+ projects delivered for clients worldwide.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
