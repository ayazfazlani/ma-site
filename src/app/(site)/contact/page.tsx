// app/contact/page.tsx
import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact US – Free Consultation",
  description: "Get in touch with MA Softs for custom software development projects. We offer free technical consultations for ERPs, SaaS dashboards, and high-end web applications.",
  alternates: {
    canonical: "https://masofts.com/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
