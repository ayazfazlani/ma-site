import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – MA Softs",
  description:
    "How MA Softs collects, uses, and protects your personal information when you visit masofts.com or engage our software development services.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy – MA Softs",
    description:
      "Learn how MA Softs handles your personal data, cookies, and contact information.",
    url: "https://masofts.com/privacy",
    type: "website",
  },
  twitter: {
    title: "Privacy Policy – MA Softs",
    description:
      "How MA Softs collects, uses, and protects your personal information.",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
