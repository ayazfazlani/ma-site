// components/Services.tsx
import dbConnect from "@/lib/mongodb";
import ServiceModel from "@/models/Service";
import { servicesData as fallbackServices } from "@/lib/services";
import ServicesWrapper from "./ServicesWrapper";
import ServicesList from "./ServicesList";

export default async function Services() {
  let dbServices: any[] = [];
  try {
    await dbConnect();
    dbServices = await ServiceModel.find({ active: true }).sort({ order: 1 }).lean();
    dbServices = dbServices.map((s: any) => ({ ...s, _id: undefined, id: s._id?.toString() }));
  } catch {
    dbServices = [];
  }

  const servicesRaw = dbServices.length > 0 ? dbServices : fallbackServices;
  const services = JSON.parse(JSON.stringify(servicesRaw));

  return (
    <ServicesWrapper>
        <ServicesList services={services} />
    </ServicesWrapper>
  );
}
