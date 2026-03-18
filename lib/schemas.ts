// lib/schemas.ts
// Centralized SEO Schema definitions for Media Linkers

const SITE_URL = "https://medialinkers.pk";
const SITE_NAME = "Media Linkers";
const LOGO_URL = `${SITE_URL}/logo.png`;
const PHONE = "+923001234567";
const EMAIL = "info@medialinkers.pk";

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
    "Pakistan's leading digital marketing agency with 17+ years of experience in SEO, Content Marketing, Social Media Marketing, PPC Advertising, Website Design & Development.",
  foundingDate: "2008",
  founder: {
    "@type": "Person",
    name: "Media Linkers Team",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Business Avenue",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    postalCode: "74000",
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
    "https://www.facebook.com/medialinkers",
    "https://twitter.com/medialinkers",
    "https://www.linkedin.com/company/medialinkers",
    "https://www.instagram.com/medialinkers",
  ],
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 50,
  },
  slogan: "Best Digital Marketing Agency Pakistan",
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
    "Pakistan's best digital marketing agency offering SEO, Social Media Marketing, Content Marketing, PPC Advertising, and Web Development services.",
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
    streetAddress: "123 Business Avenue",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    postalCode: "74000",
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
    name: "Digital Marketing Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "SEO Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Technical SEO Audit" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "On-Page SEO" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Off-Page SEO" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Local SEO" },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Marketing Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Social Media Marketing" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Content Marketing" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "PPC Advertising" },
          },
        ],
      },
    ],
  },
};

// ── Service Schemas ──
import { servicesData } from "../src/lib/services";

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
  name: "About Media Linkers",
  description:
    "Learn about Media Linkers - Pakistan's leading digital marketing agency with 17+ years of experience, 500+ clients served, and a team of 50+ digital marketing experts.",
  url: `${SITE_URL}/about`,
  mainEntity: { "@id": `${SITE_URL}/#organization` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

// ── Contact Page Schema ──
export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact/#contactpage`,
  name: "Contact Media Linkers",
  description:
    "Get in touch with Media Linkers for a free consultation about your digital marketing needs. We respond within 24 hours.",
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
  name: "Media Linkers Blog",
  description:
    "Digital marketing insights, tips, and strategies from Pakistan's leading marketing experts. Learn about SEO, Social Media, Content Marketing, and more.",
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
  name: "Digital Marketing Services",
  description: "Comprehensive digital marketing solutions by Media Linkers",
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
      name: "What digital marketing services does Media Linkers offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Media Linkers offers comprehensive digital marketing services including SEO Optimization, Social Media Marketing, Content Marketing, Web Design & Development, PPC Advertising, and Analytics & Reporting. Each service is tailored to meet your specific business needs.",
      },
    },
    {
      "@type": "Question",
      name: "How much do Media Linkers' digital marketing services cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our services start from $499/month for Analytics & Reporting, $599/month for Content Marketing, $799/month for Social Media Marketing, $999/month for SEO Optimization, $1,299/month for PPC Advertising, and $2,499/project for Web Design & Development. Custom packages are also available.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to see results from SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most clients see significant improvements in organic traffic within 3-4 months, with an average traffic growth of 400%. However, SEO is a long-term strategy and results can vary depending on your industry, competition, and current website status.",
      },
    },
    {
      "@type": "Question",
      name: "Does Media Linkers work with international clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Media Linkers serves clients globally across Pakistan, UAE, Saudi Arabia, USA, UK, and other countries. With 500+ happy clients worldwide, we have extensive experience working with diverse markets and industries.",
      },
    },
    {
      "@type": "Question",
      name: "What industries does Media Linkers specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We specialize in E-commerce, Healthcare, Education, Real Estate, Food & Beverage, and Travel & Tourism industries. Our team has deep industry knowledge to deliver tailored solutions for unique business challenges.",
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
  name: "Media Linkers - Best Digital Marketing Agency Pakistan",
  description:
    "17+ years of experience in SEO, Content Marketing, Social Media Marketing, PPC Advertising, Website Design & Development. Trusted by 500+ businesses worldwide.",
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
        "Media Linkers transformed our online presence completely. Our organic traffic increased by 300% in just 4 months. Highly recommended!",
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
        "Working with Media Linkers was a game-changer for our ed-tech startup. They understood our vision and helped us reach our target audience effectively.",
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
