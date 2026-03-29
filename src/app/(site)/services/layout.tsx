// app/services/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services - Custom Software & Web Development Solutions",
  description:
    "Expert software solutions including Web Application Development, ERP Systems, E-commerce, SaaS, and Business Process Automation. Custom-built by Ayaz.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Software Development Services - MA Softs",
    description:
      "Web Applications, ERP Systems, SaaS, E-commerce, and Business Automation. Custom solutions built with passion by Ayaz.",
    url: "https://ma-softs.com/services",
    type: "website",
  },
  twitter: {
    title: "Software Development Services - MA Softs",
    description:
      "Web Applications, ERP Systems, SaaS, E-commerce, and Business Automation. Custom solutions built by Ayaz.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
