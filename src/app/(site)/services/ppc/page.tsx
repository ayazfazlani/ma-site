// app/services/ppc/page.tsx
import { Metadata } from "next";
import PPCClient from "./PPCClient";

export const metadata: Metadata = {
  title: "PPC Advertising & Google Ads Management – Grow Fast",
  description: "Drive immediate traffic and high-quality leads with expertly managed PPC campaigns. We optimize your Google Ads, Bing Ads, and Social Ads for maximum ROI.",
  alternates: {
    canonical: "https://www.masofts.com/services/ppc",
  },
};

export default function PPCPage() {
  return <PPCClient />;
}
