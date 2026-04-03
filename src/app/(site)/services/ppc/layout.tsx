import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PPC & Paid Advertising Services – Google & Facebook Ads from $499/mo",
  description:
    "Maximize ROI with targeted PPC campaigns from $499/month. Google Ads, Facebook & Instagram advertising, conversion optimization & detailed reporting.",
  alternates: {
    canonical: "/services/ppc",
  },
  openGraph: {
    title: "PPC & Paid Advertising – MA Softs",
    description:
      "Google Ads, Facebook & Instagram paid advertising with expert management. PPC plans from $499/month.",
    url: "https://www.masofts.com/services/ppc",
    type: "website",
  },
};

export default function PPCLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
