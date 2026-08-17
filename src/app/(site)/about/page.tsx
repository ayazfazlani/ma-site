// app/about/page.tsx
import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About MA Softs",
  description:
    "MA Softs builds custom software for businesses worldwide — ERP systems, web applications, and business automation. Led by Ayaz.",
  alternates: {
    canonical: "https://masofts.com/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
