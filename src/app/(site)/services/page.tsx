// app/services/page.tsx
import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "ERP, Web & Business Software Services",
  description: "Custom ERP development, custom website development services, manufacturing software, and custom software for small business — built by MA Softs.",
  alternates: {
    canonical: "https://masofts.com/services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
