// app/blog/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog – Software Development Tips, Guides & Insights",
  description:
    "Read expert articles on web development, React, Next.js, SEO strategies, and enterprise software architecture from the MA Softs team.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "MA Softs Blog – Development Tips & Industry Insights",
    description:
      "Expert articles on web development, React, Next.js, SEO, and software architecture. Practical guides for startups and businesses.",
    url: "https://masofts.com/blog",
    type: "website",
  },
  twitter: {
    title: "MA Softs Blog – Dev Tips & Insights",
    description:
      "Software development insights, coding tips, and tech trends from MA Softs.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
