// src/app/services/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { type ServiceData, servicesData } from "@/lib/services";
import { 
  servicesItemListSchema, 
  servicesFaqSchema, 
  getBreadcrumbSchema, 
  serviceSchemas 
} from "@/lib/schemas";
import ServiceDetailClient from "./ServiceDetailClient";
import dbConnect from "@/lib/mongodb";
import TestimonialModel from "@/models/Testimonial";

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  return servicesData.map((s: ServiceData) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s: ServiceData) => s.slug === slug);
  if (!service) {
    return {};
  }
  return {
    title: `${service.title} | MA Softs`,
    description: service.description,
    alternates: {
      canonical: `https://www.masofts.com/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} - MA Softs`,
      description: service.description,
      url: `https://www.masofts.com/services/${service.slug}`,
      type: "website",
    },
    twitter: {
      title: `${service.title} - MA Softs`,
      description: service.description,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = servicesData.find((s: ServiceData) => s.slug === slug);
  if (!service) {
    notFound();
  }

  // Fetch Testimonials
  await dbConnect();
  const dbTestimonials = await TestimonialModel.find({}).sort({ createdAt: -1 }).lean();
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
  const testimonials = JSON.parse(JSON.stringify(raw.map((t: any) => ({ ...t, _id: undefined, id: t._id?.toString?.() || t.id }))));

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "https://www.masofts.com" },
    { name: "Services", url: "https://www.masofts.com/services" },
    { name: service.title, url: `https://www.masofts.com/services/${service.slug}` },
  ]);

  const serviceSchema = serviceSchemas.find((sch: any) => sch.name === service.title) || serviceSchemas[0];

  // Strip the non-serializable icon component from the service object
  const { icon, ...serializableService } = service;

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
