// src/app/services/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { type ServiceData, servicesData } from "../../../lib/services";
import {
  servicesItemListSchema,
  servicesFaqSchema,
  getBreadcrumbSchema,
  serviceSchemas,
} from "../../../../lib/schemas";
import ServiceDetailClient from "./ServiceDetailClient";

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
    title: `${service.title} | Media Linkers`,
    description: service.description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} - Media Linkers`,
      description: service.description,
      url: `https://medialinkers.pk/services/${service.slug}`,
      type: "website",
    },
    twitter: {
      title: `${service.title} - Media Linkers`,
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

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "https://medialinkers.pk" },
    { name: "Services", url: "https://medialinkers.pk/services" },
    { name: service.title, url: `https://medialinkers.pk/services/${service.slug}` },
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
    />
  );
}
