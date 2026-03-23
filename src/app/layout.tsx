// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ThemeProvider from "../../components/ThemeProvider";
import JsonLd from "../../components/JsonLd";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "../../lib/schemas";
import WhatsAppButton from "../../components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "MA Softs - Custom Software & Web Development by Ayaz",
    template: "%s | MA Softs",
  },
  description:
    "Expert custom software solutions, web applications, and ERP systems tailored for startups and businesses. Built with Passion by Ayaz.",
  keywords: [
    "custom software development",
    "web application development",
    "ERP systems",
    "software developer Ayaz",
    "MA Softs",
    "startup software solutions",
    "business automation",
    "Next.js developer",
    "React developer",
    "Karachi software services",
  ],
  authors: [{ name: "Ayaz", url: "https://ma-softs.com" }],
  creator: "Ayaz",
  publisher: "MA Softs",
  metadataBase: new URL("https://ma-softs.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ma-softs.com",
    siteName: "MA Softs",
    title: "MA Softs - Custom Software & Web Development by Ayaz",
    description:
      "Transforming businesses with custom software solutions, web applications, and ERP systems. Built with Passion by Ayaz.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MA Softs - Software & Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MA Softs - Custom Software & Web Development by Ayaz",
    description:
      "Transforming businesses with custom software solutions, web applications, and ERP systems. Built with Passion by Ayaz.",
    images: ["/og-image.png"],
    creator: "@ayaz_masofts",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Global SEO Schemas */}
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={localBusinessSchema} />

        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}