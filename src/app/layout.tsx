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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Media Linkers - Best Digital Marketing Agency Pakistan",
    template: "%s | Media Linkers",
  },
  description:
    "17+ years of experience in SEO, Content Marketing, Social Media Marketing, PPC Advertising, Website Design & Development. Trusted by 500+ businesses worldwide.",
  keywords: [
    "digital marketing agency Pakistan",
    "SEO services Pakistan",
    "social media marketing",
    "content marketing",
    "PPC advertising",
    "web development Pakistan",
    "Media Linkers",
    "best digital marketing agency",
    "SEO company Karachi",
    "online marketing Pakistan",
  ],
  authors: [{ name: "Media Linkers", url: "https://medialinkers.pk" }],
  creator: "Media Linkers",
  publisher: "Media Linkers",
  metadataBase: new URL("https://medialinkers.pk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://medialinkers.pk",
    siteName: "Media Linkers",
    title: "Media Linkers - Best Digital Marketing Agency Pakistan",
    description:
      "17+ years of experience in SEO, Content Marketing, Social Media Marketing, PPC Advertising, Website Design & Development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Media Linkers - Digital Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Media Linkers - Best Digital Marketing Agency Pakistan",
    description:
      "17+ years of experience in SEO, Content Marketing, Social Media Marketing, PPC Advertising, Website Design & Development.",
    images: ["/og-image.png"],
    creator: "@medialinkers",
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
        </ThemeProvider>
      </body>
    </html>
  );
}