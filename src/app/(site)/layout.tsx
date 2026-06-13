// src/app/(site)/layout.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/schemas";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Toaster } from "react-hot-toast";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { borderRadius: '12px', fontWeight: '600' } }} />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      {/* Site Schemas */}
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={localBusinessSchema} />
    </>
  );
}
