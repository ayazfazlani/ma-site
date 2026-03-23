// app/contact/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Custom Software Consultation with Ayaz",
  description:
    "Get in touch with Ayaz at MA Softs for a free consultation about your custom software needs. Call +92 318 2885445 or email ayaz@ma-softs.com.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact MA Softs - Free Software Development Consultation",
    description:
      "Ready to build your next big idea? Contact Ayaz for a free software consultation. Phone: +92 318 2885445, Email: ayaz@ma-softs.com",
    url: "https://ma-softs.com/contact",
    type: "website",
  },
  twitter: {
    title: "Contact MA Softs",
    description:
      "Get a free custom software consultation from Ayaz. Start your project today.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
