// src/app/services/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { useTheme } from "../../../../components/ThemeProvider";
import Link from "next/link";
import type { ServiceData } from "../../../lib/services";
import { servicesData } from "../../../lib/services";
import JsonLd from "../../../../components/JsonLd";
import {
  servicesItemListSchema,
  servicesFaqSchema,
  getBreadcrumbSchema,
  serviceSchemas,
} from "../../../../lib/schemas";
import { ArrowRight, CheckCircle } from "lucide-react";

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  return servicesData.map((s: ServiceData) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const service = servicesData.find((s: ServiceData) => s.slug === params.slug);
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

export default function ServiceDetailPage({ params }: { params: Params }) {
  const service = servicesData.find((s: ServiceData) => s.slug === params.slug);
  if (!service) {
    notFound();
  }

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "https://medialinkers.pk" },
    { name: "Services", url: "https://medialinkers.pk/services" },
    { name: service.title, url: `https://medialinkers.pk/services/${service.slug}` },
  ]);

  return (
    <main className="pt-20">
      {/* SEO Schemas */}
      <JsonLd data={servicesItemListSchema} />
      <JsonLd data={servicesFaqSchema} />
      <JsonLd data={breadcrumb} />
      {/* individual service schema for SEO */}
      {service && (
        <JsonLd
          data={
            serviceSchemas.find((sch: any) => sch.name === service.title) || serviceSchemas[0]
          }
        />
      )}

      <section className="section-padding">
        <div className="container-custom mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <div className="flex-shrink-0">
              <div
                className={`w-20 h-20 bg-linear-to-br ${service.color} rounded-3xl flex items-center justify-center mb-4`}
              >
                <service.icon className="w-10 h-10 text-white" />
              </div>
            </div>
            <div>
              <h1 className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>{service.title}</h1>
              <p className={`mb-6 leading-relaxed ${isDark ? "text-neutral-400" : "text-gray-600"}`}>{service.description}</p>
              <ul className="space-y-3 mb-8">
                {service.features.map((f: string) => (
                  <li key={f} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className={isDark ? "text-neutral-300" : "text-gray-700"}>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mb-8">
                <span className="text-2xl font-bold text-primary-600">{service.price}</span>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-700 transition-all"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section for custom solutions */}
      <section className={`section-padding ${isDark ? "bg-dark-900" : "bg-white"}`}>
        <div className="container-custom mx-auto px-4 text-center">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>Have questions?</h2>
          <p className={`text-lg mb-8 ${isDark ? "text-neutral-400" : "text-gray-600"}`}>Reach out and we’ll craft a personalized plan to match your goals and budget.</p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-700 transition-all"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
