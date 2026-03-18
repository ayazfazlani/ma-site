// app/blog/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Digital Marketing Insights & Tips",
  description:
    "Read the latest digital marketing insights, SEO tips, social media strategies, and content marketing guides from Media Linkers' expert team.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Media Linkers Blog - Digital Marketing Insights",
    description:
      "Expert articles on SEO, Social Media Marketing, Content Marketing, PPC, Web Design, and Analytics from Pakistan's leading agency.",
    url: "https://medialinkers.pk/blog",
    type: "website",
  },
  twitter: {
    title: "Media Linkers Blog",
    description:
      "Digital marketing insights, tips, and strategies for business growth.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
