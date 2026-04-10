// app/services/web-development/page.tsx
import { Metadata } from "next";
import WebDevelopmentClient from "./WebDevelopmentClient";

export const metadata: Metadata = {
  title: "Custom Web Design & Development Services – MA Softs",
  description: "High-performance websites and web applications built with modern technologies like React, Next.js, and Node.js. Tailored solutions for startups and enterprises.",
  alternates: {
    canonical: "https://www.masofts.com/services/web-development",
  },
};

export default function WebDevelopmentPage() {
  return <WebDevelopmentClient />;
}
