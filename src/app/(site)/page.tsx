// app/page.tsx
import { Suspense } from "react";
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
import HeroAvatarsServer from "@/components/HeroAvatarsServer";
import { HeroAvatarPlaceholders } from "@/components/HeroAvatars";
import {
  homePageSchema,
  reviewsSchema,
  personSchema,
  serviceSchemas,
  getBreadcrumbSchema,
} from "@/lib/schemas";
import { servicesHubFaqs, toFaqPageSchema } from "@/lib/faq-data";
import { servicesData } from "@/lib/services";
import { HOMEPAGE_SERVICE_SLUGS } from "@/lib/seo";
import { Metadata } from "next";
import dbConnect from "@/lib/mongodb";
import PartnerModel from "@/models/Partner";
import TestimonialModel from "@/models/Testimonial";
import ProjectModel from "@/models/Project";

export const metadata: Metadata = {
  title: {
    absolute: "Custom Software Development Services — ERP, Web & Business Apps | MA Softs",
  },
  description:
    "MA Softs builds custom software for businesses worldwide — ERP systems for manufacturers, web applications, and business automation. Real solutions, no off-the-shelf compromises.",
  alternates: {
    canonical: "https://masofts.com",
  },
  openGraph: {
    title: "Custom Software Development Services — ERP, Web & Business Apps | MA Softs",
    description:
      "MA Softs builds custom software for businesses worldwide — ERP systems for manufacturers, web applications, and business automation. Real solutions, no off-the-shelf compromises.",
    url: "https://masofts.com",
    type: "website",
  },
  twitter: {
    title: "Custom Software Development Services | MA Softs",
    description:
      "MA Softs builds custom software for businesses worldwide — ERP systems, web applications, and business automation.",
  },
};

export const revalidate = 3600;

const homeBreadcrumb = getBreadcrumbSchema([
  { name: "Home", url: "https://masofts.com" },
]);

async function HomePageSections() {
  await dbConnect();

  const [allPartners, projects, testimonials] = await Promise.all([
    PartnerModel.find({ active: true }).sort({ order: 1 }).lean(),
    ProjectModel.find({ active: true }).sort({ order: 1 }).lean(),
    TestimonialModel.find({ active: true }).sort({ createdAt: -1 }).lean(),
  ]);

  const serializedData = JSON.parse(
    JSON.stringify({
      partners: allPartners,
      services: servicesData.filter((s) =>
        (HOMEPAGE_SERVICE_SLUGS as readonly string[]).includes(s.slug)
      ),
      projects,
      testimonials,
    })
  );

  return (
    <>
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
          subtitle="Custom software, ERP, and web development — straight answers."
          items={servicesHubFaqs}
        />
        <Testimonials initialTestimonials={serializedData.testimonials} />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd data={homePageSchema} />
      <JsonLd data={personSchema} />
      <JsonLd data={reviewsSchema} />
      <JsonLd data={homeBreadcrumb} />
      {serviceSchemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}

      <Hero
        avatarSlot={
          <Suspense fallback={<HeroAvatarPlaceholders />}>
            <HeroAvatarsServer />
          </Suspense>
        }
      />

      <Suspense fallback={null}>
        <HomePageSections />
      </Suspense>
    </>
  );
}
