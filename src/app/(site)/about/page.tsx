// app/about/page.tsx
import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About MA Softs – Global Software Solutions from Pakistan",
  description: "Discover our mission as a leading freelance ERP developer in Pakistan serving clients worldwide. We specialize in custom ERP, SaaS MVP development, and Next.js solutions.",
  alternates: {
    canonical: "https://masofts.com/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
