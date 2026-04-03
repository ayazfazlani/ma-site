// app/contact/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us – Free Software Consultation",
  description:
    "Get a free consultation for your custom software project. Call +92 336 7057973 or email ayaz@ma-softs.com. Web apps, ERP systems & SaaS development.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact MA Softs – Free Software Development Consultation",
    description:
      "Ready to build your next big idea? Get a free consultation. Call +92 336 7057973 or email ayaz@ma-softs.com.",
    url: "https://www.masofts.com/contact",
    type: "website",
  },
  twitter: {
    title: "Contact MA Softs – Free Consultation",
    description:
      "Get a free custom software consultation. Web apps, ERP systems & SaaS development.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
