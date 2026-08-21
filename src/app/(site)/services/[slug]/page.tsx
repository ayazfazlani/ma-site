// src/app/services/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { serviceFromStoredRecord, type ServiceData, servicesData } from "@/lib/services";
import {
  servicesItemListSchema,
  servicesFaqSchema,
  getBreadcrumbSchema,
  serviceSchemas
} from "@/lib/schemas";
import ServiceDetailClient from "./ServiceDetailClient";
import dbConnect from "@/lib/mongodb";
import TestimonialModel from "@/models/Testimonial";
import ServiceModel from "@/models/Service";

interface Params {
  slug: string;
}

async function getStoredService(slug: string) {
  try {
    await dbConnect();
    return await ServiceModel.findOne({ slug, active: true }).lean();
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  return servicesData.map((s: ServiceData) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const stored = await getStoredService(slug);
  const service = stored
    ? serviceFromStoredRecord(stored as unknown as Record<string, unknown>)
    : servicesData.find((item) => item.slug === slug);
  if (!service) {
    return {};
  }
  return {
    title: service.metaTitle || service.title,
    description: service.metaDescription || service.description,
    alternates: {
      canonical: `https://masofts.com/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.metaTitle || service.title} | MA Softs`,
      description: service.metaDescription || service.description,
      url: `https://masofts.com/services/${service.slug}`,
      type: "website",
    },
    twitter: {
      title: `${service.metaTitle || service.title} | MA Softs`,
      description: service.metaDescription || service.description,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const stored = await getStoredService(slug);
  const service = stored
    ? serviceFromStoredRecord(stored as unknown as Record<string, unknown>)
    : servicesData.find((item) => item.slug === slug);
  if (!service) {
    notFound();
  }

  // Fetch Testimonials
  let dbTestimonials: Awaited<ReturnType<typeof TestimonialModel.find>> = [];
  try {
    await dbConnect();
    dbTestimonials = await TestimonialModel.find({}).sort({ createdAt: -1 }).lean();
  } catch {
    dbTestimonials = [];
  }
  const fallbackTestimonials = [
    {
      name: "Ahmed Khan",
      role: "CEO, TechSolutions PK",
      content: "MA Softs transformed our business processes with a custom ERP. The efficiency gains have been incredible. Ayaz is a brilliant developer!",
      rating: 5,
    },
    {
      name: "Sarah Ali",
      role: "Marketing Director, StyleMart",
      content: "The team is professional, responsive, and delivers results. Exceptional service and very transparent reporting.",
      rating: 5,
    }
  ];
  const raw = dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;
  const testimonials = JSON.parse(JSON.stringify(raw.map((testimonial) => ({ ...testimonial, _id: undefined, id: "id" in testimonial ? testimonial.id : undefined }))));

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "https://masofts.com" },
    { name: "Services", url: "https://masofts.com/services" },
    { name: service.title, url: `https://masofts.com/services/${service.slug}` },
  ]);

  const serviceSchema = serviceSchemas.find((schema) => (schema as { name?: string }).name === service.title) || serviceSchemas[0];

  // Strip the non-serializable icon component from the service object
  const serializableService = { ...service };

  return (
    <ServiceDetailClient
      service={serializableService}
      breadcrumb={breadcrumb}
      serviceItemListSchema={servicesItemListSchema}
      servicesFaqSchema={servicesFaqSchema}
      serviceSchema={serviceSchema}
      testimonials={testimonials}
    />
  );
}
