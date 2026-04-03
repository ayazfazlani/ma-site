import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Marketing Services – Blog, Video & SEO Content from $349/mo",
  description:
    "Professional content marketing from $349/month. SEO blog writing, video production, infographics & email newsletters that attract and convert your audience.",
  alternates: {
    canonical: "/services/content",
  },
  openGraph: {
    title: "Content Marketing Services – MA Softs",
    description:
      "SEO blog writing, video content, infographics & email marketing. Content plans from $349/month.",
    url: "https://www.masofts.com/services/content",
    type: "website",
  },
};

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
