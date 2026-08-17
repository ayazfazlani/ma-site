// src/app/(site)/layout.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import DeferredWidgets from "@/components/DeferredWidgets";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/schemas";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DeferredWidgets />
      <Navbar />
      <main>{children}</main>
      <Footer />
      {/* Site Schemas */}
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={localBusinessSchema} />
    </>
  );
}
