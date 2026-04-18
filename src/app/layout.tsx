// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../../components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://masofts.com"),
  title: {
    default: "MA Softs – Custom Software & Web Development Company in Pakistan",
    template: "%s | MA Softs",
  },
  description:
    "MA Softs delivers custom web applications, ERP systems, SaaS platforms & e-commerce solutions for startups and businesses worldwide. Get a free consultation today.",
  alternates: {
    canonical: "https://masofts.com",
  },
  openGraph: {
    siteName: "MA Softs",
    type: "website",
    locale: "en_US",
    url: "https://masofts.com",
    title: "MA Softs – Custom Software & Web Development Company",
    description:
      "Custom web applications, ERP systems, SaaS & e-commerce solutions built for scale. Free consultation available.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MA Softs – Custom Software & Web Development",
    description:
      "Custom web apps, ERP systems & SaaS platforms for startups and businesses. Free consultation.",
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
