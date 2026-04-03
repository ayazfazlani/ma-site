import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design & Development Services – Custom Websites from $499",
  description:
    "Professional website design and development starting from $499. Responsive design, e-commerce, CMS integration & performance optimization. Free consultation.",
  alternates: {
    canonical: "/services/web-development",
  },
  openGraph: {
    title: "Web Design & Development – MA Softs",
    description:
      "Custom, responsive websites and web applications. Starter from $499, Business Pro from $1,499, Enterprise from $3,999.",
    url: "https://www.masofts.com/services/web-development",
    type: "website",
  },
};

export default function WebDevLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
