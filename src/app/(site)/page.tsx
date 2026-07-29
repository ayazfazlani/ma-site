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
import ErpSection from "@/components/ErpSection";
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


export const revalidate = 3600; // 1 hour revalidation

const homeBreadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://masofts.com" },
]);

import dbConnect from "@/lib/mongodb";
import PartnerModel from "@/models/Partner";
import TestimonialModel from "@/models/Testimonial";
import ServiceModel from "@/models/Service";
import ProjectModel from "@/models/Project";

export default async function Home() {
  await dbConnect();
  
  const [heroPartners, allPartners, avatars, services, projects, testimonials] = await Promise.all([
    PartnerModel.find({ active: true, showInHero: true }).sort({ order: 1 }).limit(8).lean(),
    PartnerModel.find({ active: true }).sort({ order: 1 }).lean(),
    TestimonialModel.find({ active: true, showInHero: true }).sort({ order: 1 }).limit(8).lean(),
    ServiceModel.find({ active: true }).sort({ order: 1 }).lean(),
    ProjectModel.find({ active: true }).sort({ order: 1 }).lean(),
    TestimonialModel.find({ active: true }).sort({ createdAt: -1 }).lean(),
  ]);

  const serializedData = JSON.parse(JSON.stringify({ 
    heroPartners,
    partners: allPartners, 
    avatars, 
    services: services.map((s: any) => ({ ...s, _id: undefined, id: s._id?.toString() })),
    projects,
    testimonials
  }));

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

      <Hero partners={serializedData.heroPartners} avatars={serializedData.avatars} />
      <HorizontalScroll initialPartners={serializedData.partners} />
      <ErpSection />
      <Portfolio initialProjects={serializedData.projects} />
      
      <div className="content-deferred">
        <Services initialServices={serializedData.services} />
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
        <Testimonials initialTestimonials={serializedData.testimonials} />
      </div>
    </>
  );
}
