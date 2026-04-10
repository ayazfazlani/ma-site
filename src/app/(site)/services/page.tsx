// app/services/page.tsx
import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Professional Software & Web Development Services",
  description: "Comprehensive software development solutions including custom ERPs, SaaS platforms, high-performance web applications, and UI/UX design transformations.",
  alternates: {
    canonical: "https://www.masofts.com/services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
