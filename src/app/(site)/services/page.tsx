// app/services/page.tsx
import { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import dbConnect from "@/lib/mongodb";
import ServiceModel from "@/models/Service";
import { serviceFromStoredRecord, servicesData } from "@/lib/services";

export const metadata: Metadata = {
  title: "ERP, Web & Business Software Services",
  description: "Custom ERP development, custom website development services, manufacturing software, and custom software for small business — built by MA Softs.",
  alternates: {
    canonical: "https://masofts.com/services",
  },
};

export const revalidate = 3600;

export default async function ServicesPage() {
  await dbConnect();
  const storedServices = await ServiceModel.find({ active: true }).sort({ order: 1 }).lean();
  const services = storedServices.length > 0
    ? storedServices.map((service) => serviceFromStoredRecord(service as unknown as Record<string, unknown>))
    : servicesData;
  return <ServicesClient services={services} />;
}
