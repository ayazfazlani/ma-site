// app/page.tsx
import { Suspense } from "react";
import Hero from "@/components/Hero";
import HorizontalScroll from "@/components/HorizontalScroll";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Industries from "@/components/Industries";
import WhoThisIsFor from "@/components/WhoThisIsFor";
import ProjectCTA from "@/components/ProjectCTA";
import Testimonials from "@/components/Testimonials";
import TechStack from "@/components/TechStack";
import JsonLd from "@/components/JsonLd";
import ErpSection from "@/components/ErpSection";
import FaqSection from "@/components/FaqSection";
import HeroAvatarsServer from "@/components/HeroAvatarsServer";
import { HeroAvatarPlaceholders } from "@/components/HeroAvatars";
import {
  homePageSchema,
  personSchema,
  serviceSchemas,
  getBreadcrumbSchema,
} from "@/lib/schemas";
import { servicesHubFaqs, toFaqPageSchema } from "@/lib/faq-data";
import { HOMEPAGE_SERVICES, uniqueBySlugOrTitle } from "@/lib/seo";
import { Metadata } from "next";
import dbConnect from "@/lib/mongodb";
import PartnerModel from "@/models/Partner";
import TestimonialModel from "@/models/Testimonial";
import ProjectModel from "@/models/Project";

const TITLE = "Custom Software Development Services | MA Softs";
const DESCRIPTION =
  "MA Softs builds custom ERP systems, manufacturing software, web applications and SaaS platforms for businesses worldwide. Build software around your workflow—not an off-the-shelf package.";

export const metadata: Metadata = {
  title: {
    absolute: TITLE,
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "https://masofts.com",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://masofts.com",
    type: "website",
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const dynamic = "force-dynamic";

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

  const uniqueProjects = uniqueBySlugOrTitle(projects).filter(
    (p: { slug?: string }) => p.slug !== "plastic-factory-erp"
  );

  const serializedData = JSON.parse(
    JSON.stringify({
      partners: allPartners,
      services: HOMEPAGE_SERVICES,
      projects: uniqueProjects,
      testimonials,
    })
  );

  return (
    <div className="content-deferred">
      <HorizontalScroll initialPartners={serializedData.partners} />
      <Services initialServices={serializedData.services} />
      <ErpSection />
      <Portfolio initialProjects={serializedData.projects} />
      <WhoThisIsFor />
      <Industries />
      <TechStack />
      <Process />
      <JsonLd data={toFaqPageSchema(servicesHubFaqs)} />
      <FaqSection
        className="bg-gray-50 dark:bg-dark-950"
        title="Frequently asked questions"
        subtitle="Straight answers about custom software, ERP, and how we work."
        items={servicesHubFaqs}
      />
      <Testimonials initialTestimonials={serializedData.testimonials} />
      <ProjectCTA />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd data={homePageSchema} />
      <JsonLd data={personSchema} />
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
