// app/about/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About MA Softs",
  description:
    "Meet Ayaz and MA Softs. Custom software development services for manufacturers and growing businesses — ERP, web apps, and automation.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About MA Softs",
    description:
      "Custom software development services for manufacturers and growing businesses — ERP, web apps, and automation.",
    url: "https://masofts.com/about",
    type: "website",
  },
  twitter: {
    title: "About MA Softs",
    description:
      "Custom software, ERP systems, and web applications built by Ayaz at MA Softs.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
