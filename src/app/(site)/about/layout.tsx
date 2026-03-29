// app/about/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - MA Softs by Ayaz",
  description:
    "Learn about MA Softs - Leading custom software development company led by Ayaz. Specializing in high-performance web applications and enterprise systems.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About MA Softs - Leading Software Development by Ayaz",
    description:
      "Expert software solutions, personalized service, and commitment to excellence. Discover the story of MA Softs and Ayaz.",
    url: "https://ma-softs.com/about",
    type: "website",
  },
  twitter: {
    title: "About MA Softs",
    description:
      "Leading software development by Ayaz. Custom solutions for the modern web.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
