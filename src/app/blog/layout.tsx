// app/blog/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Software Development Insights by Ayaz",
  description:
    "Read the latest software development insights, React & Next.js tips, and enterprise software architecture guides from Ayaz at MA Softs.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "MA Softs Blog - Software Development Insights",
    description:
      "Expert articles on Web Application Development, ERP Systems, React, Next.js, and Software Architecture by Ayaz.",
    url: "https://ma-softs.com/blog",
    type: "website",
  },
  twitter: {
    title: "MA Softs Blog",
    description:
      "Software development insights, coding tips, and tech trends by Ayaz.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
