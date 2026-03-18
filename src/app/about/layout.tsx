// app/about/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Media Linkers Digital Marketing Agency",
  description:
    "Learn about Media Linkers - Pakistan's leading digital marketing agency with 17+ years of experience, 500+ clients served, and a team of 50+ digital marketing experts.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Media Linkers - Pakistan's Leading Digital Marketing Agency",
    description:
      "17+ years of experience, 500+ clients, 50+ team members. Discover our story, values, and commitment to digital marketing excellence.",
    url: "https://medialinkers.pk/about",
    type: "website",
  },
  twitter: {
    title: "About Media Linkers",
    description:
      "17+ years of experience, 500+ clients, 50+ team members. Pakistan's leading digital marketing agency.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
