import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service – MA Softs",
  description:
    "Terms and conditions governing use of the MA Softs website and engagement of our custom software, ERP, and SaaS development services.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service – MA Softs",
    description:
      "The rules and terms that apply when you use masofts.com or work with MA Softs.",
    url: "https://masofts.com/terms",
    type: "website",
  },
  twitter: {
    title: "Terms of Service – MA Softs",
    description:
      "Terms and conditions for using MA Softs website and services.",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
