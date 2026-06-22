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
import FaqSection from "@/components/FaqSection";
import {
  homePageSchema,
  reviewsSchema,
  personSchema,
  serviceSchemas,
  getBreadcrumbSchema,
} from "@/lib/schemas";
import { servicesHubFaqs, toFaqPageSchema } from "@/lib/faq-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Web Development & ERP Solutions | MA Softs – Pakistan",
  description: "Senior Full-stack Developer Ayaz (MA Softs) specialized in custom ERP solutions, SaaS MVP development, and Next.js applications for startups worldwide.",
  alternates: {
    canonical: "https://masofts.com",
  },
};


export const dynamic = "force-dynamic"; // Skip static generation during build

const homeBreadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://masofts.com" },
]);

import dbConnect from "@/lib/mongodb";
import PartnerModel from "@/models/Partner";
import TestimonialModel from "@/models/Testimonial";

export default async function Home() {
  await dbConnect();
  const rawPartners = await PartnerModel.find({ active: true, showInHero: true }).sort({ order: 1 }).limit(5).lean();
  const partners = JSON.parse(JSON.stringify(rawPartners));

  const rawAvatars = await TestimonialModel.find({ active: true, showInHero: true }).sort({ order: 1 }).limit(5).lean();
  const avatars = JSON.parse(JSON.stringify(rawAvatars));

  return (
    <>
      {/* Page-specific SEO Schemas */}
      <JsonLd data={homePageSchema} />
      <JsonLd data={personSchema} />
      <JsonLd data={reviewsSchema} />
      <JsonLd data={homeBreadcrumb} />
      {serviceSchemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}

      <Hero partners={partners} avatars={avatars} />
      <HorizontalScroll />
      <Portfolio />
      
      <div className="content-deferred">
        <Services />
        <Stats />
        <TechStack />
        <Process />
        <Industries />
        <AuditForm />
        <JsonLd data={toFaqPageSchema(servicesHubFaqs)} />
        <FaqSection
          className="bg-gray-50 dark:bg-dark-950"
          title="Frequently asked questions"
          subtitle="Common questions about working with MA Softs."
          items={servicesHubFaqs}
        />
        <Testimonials />
      </div>
    </>
  );
}
