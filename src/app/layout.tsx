// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../../components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://masofts.com"),
  title: {
    default: "Custom Software Development Services — ERP, Web & Business Apps | MA Softs",
    template: "%s | MA Softs",
  },
  description:
    "MA Softs builds custom software for businesses worldwide — ERP systems for manufacturers, web applications, and business automation. Real solutions, no off-the-shelf compromises.",
  alternates: {
    canonical: "https://masofts.com",
  },
  openGraph: {
    siteName: "MA Softs",
    type: "website",
    locale: "en_US",
    url: "https://masofts.com",
    title: "Custom Software Development Services — ERP, Web & Business Apps | MA Softs",
    description:
      "MA Softs builds custom software for businesses worldwide — ERP systems for manufacturers, web applications, and business automation. Real solutions, no off-the-shelf compromises.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development Services | MA Softs",
    description:
      "MA Softs builds custom software for businesses worldwide — ERP systems, web applications, and business automation.",
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
