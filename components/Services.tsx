// components/Services.tsx
import { servicesData as fallbackServices } from "@/lib/services";
import ServicesWrapper from "./ServicesWrapper";
import ServicesList from "./ServicesList";

export default function Services({ initialServices }: { initialServices?: any[] }) {
  const servicesRaw = initialServices && initialServices.length > 0 ? initialServices : fallbackServices;
  const services = JSON.parse(JSON.stringify(servicesRaw));

  return (
    <ServicesWrapper>
        <ServicesList services={services} />
    </ServicesWrapper>
  );
}
