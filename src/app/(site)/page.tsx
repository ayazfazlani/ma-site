// app/page.tsx
import Hero from "@/components/Hero";
import HorizontalScroll from "@/components/HorizontalScroll";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import Industries from "@/components/Industries";
import AuditForm from "@/components/AuditForm";
import Testimonials from "@/components/Testimonials";
import TechStack from "@/components/TechStack";
import JsonLd from "@/components/JsonLd";
import {
  homePageSchema,
  reviewsSchema,
  serviceSchemas,
  getBreadcrumbSchema,
} from "@/lib/schemas";

export const dynamic = "force-dynamic"; // Skip static generation during build

const homeBreadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://ma-softs.com" },
]);

export default function Home() {
  return (
    <>
      {/* Page-specific SEO Schemas */}
      <JsonLd data={homePageSchema} />
      <JsonLd data={reviewsSchema} />
      <JsonLd data={homeBreadcrumb} />
      {serviceSchemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}

      <Hero />
      <HorizontalScroll />
      <Portfolio />
      <Services />
      <Stats />
      <TechStack />
      <Process />
      <Industries />
      <AuditForm />
      <Testimonials />
    </>
  );
}
