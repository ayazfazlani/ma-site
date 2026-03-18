// app/contact/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get Free Digital Marketing Consultation",
  description:
    "Get in touch with Media Linkers for a free consultation about your digital marketing needs. Call +92 300 1234567 or email info@medialinkers.pk. We respond within 24 hours.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Media Linkers - Free Digital Marketing Consultation",
    description:
      "Ready to grow your business? Contact us for a free consultation. Phone: +92 300 1234567, Email: info@medialinkers.pk",
    url: "https://medialinkers.pk/contact",
    type: "website",
  },
  twitter: {
    title: "Contact Media Linkers",
    description:
      "Get a free digital marketing consultation. Call +92 300 1234567 or visit our Karachi office.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
