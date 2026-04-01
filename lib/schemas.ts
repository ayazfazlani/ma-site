// lib/schemas.ts
// Centralized SEO Schema definitions for MA Softs

const SITE_URL = "https://www.masofts.com";
const SITE_NAME = "MA Softs";
const LOGO_URL = `${SITE_URL}/logo.png`;
const PHONE = "+923367057973";
const EMAIL = "ayaz@ma-softs.com";

// ── Organization Schema ──
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
    width: 512,
    height: 512,
  },
  image: LOGO_URL,
  description:
    "Expert custom software solutions, web applications, and ERP systems tailored for startups and businesses. Built with Passion by Ayaz.",
  foundingDate: "2023",
  founder: {
    "@type": "Person",
    name: "Ayaz",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Gulshan-e-Iqbal",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    postalCode: "75300",
    addressCountry: "PK",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: PHONE,
      contactType: "customer service",
      email: EMAIL,
      availableLanguage: ["English", "Urdu"],
      areaServed: ["PK", "AE", "US", "GB", "SA"],
    },
    {
      "@type": "ContactPoint",
      telephone: PHONE,
      contactType: "sales",
      email: EMAIL,
      availableLanguage: ["English", "Urdu"],
    },
  ],
  sameAs: [
    "https://www.facebook.com/masofts",
    "https://twitter.com/masofts",
    "https://www.linkedin.com/company/masofts",
    "https://www.instagram.com/masofts",
  ],
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 5,
  },
  slogan: "Custom Software & Web Development by Ayaz",
};

// ── WebSite Schema (with search action) ──
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  description:
    "Custom software, web development, and ERP solutions for startups and businesses. Expert development services by Ayaz.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ── LocalBusiness Schema ──
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  image: LOGO_URL,
  url: SITE_URL,
  telephone: PHONE,
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Gulshan-e-Iqbal",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    postalCode: "75300",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.8607,
    longitude: 67.0011,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
    bestRating: "5",
    worstRating: "1",
  },
  areaServed: [
    { "@type": "Country", name: "Pakistan" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software Development Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Web Development",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Custom Web Applications" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "E-commerce Solutions" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "SaaS Development" },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Enterprise Solutions",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Custom ERP Systems" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Business Process Automation" },
          },
        ],
      },
    ],
  },
};

// ── Service Schemas ──
import { servicesData } from "./services";

export const serviceSchemas = servicesData.map((s) => {
  // convert human readable title to serviceType
  const serviceType = s.title;
  let offer: any = {
    "@type": "Offer",
  };
  // attempt to extract numeric price and unit from s.price string
  const match = s.price.match(/\$(\d+[\d,]*)\/?(month|project)?/i);
  if (match) {
    offer.price = match[1].replace(/,/g, "");
    offer.priceCurrency = "USD";
    const unitText = match[2] || undefined;
    if (unitText) {
      offer.priceSpecification = {
        "@type": "UnitPriceSpecification",
        price: offer.price,
        priceCurrency: "USD",
        unitText,
      };
    }
  }
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.description,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Pakistan" },
    serviceType,
    url: `${SITE_URL}/services/${s.slug}`,
    offers: offer,
  };
});

// ── About Page Schema ──
export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about/#aboutpage`,
  name: "About MA Softs",
  description:
    "Learn about MA Softs - Custom software development led by Ayaz. Specializing in web applications, ERP systems, and business automation.",
  url: `${SITE_URL}/about`,
  mainEntity: { "@id": `${SITE_URL}/#organization` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

// ── Contact Page Schema ──
export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact/#contactpage`,
  name: "Contact MA Softs",
  description:
    "Get in touch with Ayaz at MA Softs for a free consultation about your custom software needs. Expert development services delivered with care.",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE,
      contactType: "customer service",
      email: EMAIL,
      availableLanguage: ["English", "Urdu"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    },
  },
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

// ── Blog Page Schema ──
export const blogPageSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/blog/#blog`,
  name: "MA Softs Blog",
  description:
    "Software development insights, coding tips, and tech trends from Ayaz. Learn about Next.js, React, Node.js, and enterprise software architecture.",
  url: `${SITE_URL}/blog`,
  publisher: { "@id": `${SITE_URL}/#organization` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

// ── Blog PostsItemList Schema ──
export function getBlogPostingsSchema(
  posts: Array<{
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        author: {
          "@type": "Person",
          name: post.author,
        },
        publisher: { "@id": `${SITE_URL}/#organization` },
        datePublished: post.date,
        articleSection: post.category,
        url: `${SITE_URL}/blog/${post.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")}`,
        isPartOf: { "@id": `${SITE_URL}/blog/#blog` },
      },
    })),
  };
}

// ── Services Page ItemList Schema ──
export const servicesItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Software Development Services",
  description: "Comprehensive custom software and web development solutions by MA Softs",
  url: `${SITE_URL}/services`,
  numberOfItems: 6,
  itemListElement: serviceSchemas.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.name,
      description: service.description,
      url: service.url,
    },
  })),
};

// ── FAQ Schema (for Services page) ──
export const servicesFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What software development services does MA Softs offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MA Softs offers a wide range of custom software development services including Web Application Development, ERP Systems, E-commerce Solutions, SaaS Development, and Business Process Automation. Each solution is custom-built by Ayaz to meet your specific business requirements.",
      },
    },
    {
      "@type": "Question",
      name: "How much does custom software development cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Project costs vary depending on complexity and requirements. We offer competitive pricing for high-quality, custom-built solutions. Contact Ayaz for a detailed quote based on your specific needs.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a custom web application?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simple web applications can take 4-8 weeks, while complex enterprise systems or ERPs may take 3-6 months. We follow an agile development process to deliver functional modules incrementally.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide support after the software is launched?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide comprehensive post-launch support and maintenance to ensure your software runs smoothly and stays up-to-date with the latest technologies.",
      },
    },
    {
      "@type": "Question",
      name: "Can you integrate with existing business tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! We have extensive experience integrating custom software with various third-party APIs, payment gateways, and existing legacy systems.",
      },
    },
  ],
};

// ── BreadcrumbList Schema Generator ──
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ── Home Page WebPage Schema ──
export const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  name: "MA Softs - Custom Software & Web Development by Ayaz",
  description:
    "Expert custom software solutions, web applications, and ERP systems tailored for startups and businesses. Built with Passion by Ayaz.",
  url: SITE_URL,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: LOGO_URL,
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".gradient-text"],
  },
};

// ── Review/Testimonials Schema ──
export const reviewsSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Ahmed Khan",
      },
      reviewBody:
        "MA Softs transformed our business processes with a custom ERP. The efficiency gains have been incredible. Ayaz is a brilliant developer!",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      publisher: {
        "@type": "Organization",
        name: "TechSolutions PK",
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Sarah Ali",
      },
      reviewBody:
        "The team is professional, responsive, and delivers results. Our social media engagement has never been better. Great ROI on our marketing spend.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      publisher: {
        "@type": "Organization",
        name: "StyleMart",
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Muhammad Rizwan",
      },
      reviewBody:
        "Working with MA Softs was a game-changer for our ed-tech startup. They understood our vision and helped us reach our target audience effectively.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      publisher: {
        "@type": "Organization",
        name: "EduLearn Academy",
      },
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
    bestRating: "5",
    worstRating: "1",
  },
};
