// src/lib/services.ts
import {
  Code2,
  Database,
  Globe,
  Settings,
  Cpu,
  Figma,
} from "lucide-react";

export interface PricingPlan {
  name: string;
  price: string;
  billingCycle?: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface ServiceData {
  slug: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  features: string[];
  gradient?: string; // used by homepage grid
  glow?: string; // used by homepage grid
  number?: string; // used by homepage grid
  color?: string; // used by services page cards
  price: string;
  longDescription?: string;
  plans?: PricingPlan[];
}

export const servicesData: ServiceData[] = [
  {
    slug: "web-apps",
    icon: Code2,
    title: "Custom Web Applications",
    description:
      "High-performance, scalable web apps built with Next.js, TypeScript, and modern stacks. Perfectly tailored for startups and modern businesses.",
    features: [
      "Full-stack Next.js Development",
      "Real-time Dashboards",
      "API Integration & Development",
      "Authentication & Security",
      "Performance Optimization",
      "Scalable Architecture",
    ],
    gradient: "from-primary-500 to-primary-400",
    glow: "group-hover:shadow-primary-500/20",
    number: "01",
    color: "from-blue-500 to-blue-600",
    price: "Starting from $2,500/project",
    longDescription:
      "I build custom web applications that are fast, secure, and ready to scale. From complex SaaS platforms to interactive internal tools, I ensure your vision is transformed into a high-performance digital product.",
    plans: [
      {
        name: "MVP Starter",
        price: "$2,500",
        billingCycle: "starting from",
        description: "Perfect for startups needing to launch their first version quickly.",
        features: [
          "Core Feature Development",
          "Next.js & Tailwind CSS",
          "Database Setup (Supabase/Postgres)",
          "Authentication Integration",
          "Mobile Responsive Design",
          "2 Weeks of Support",
        ],
        cta: "Launch My MVP",
      },
      {
        name: "Full Product",
        price: "$5,000",
        billingCycle: "starting from",
        description: "Comprehensive development for feature-rich applications.",
        features: [
          "Everything in MVP +",
          "Advanced User Roles & Permissions",
          "Third-party API Integrations",
          "Comprehensive Testing",
          "Payment Gateway Integration",
          "Performance & SEO Optimization",
        ],
        cta: "Build My Product",
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        billingCycle: "",
        description: "Large scale systems with complex requirements.",
        features: [
          "Microservices Architecture",
          "High-availability Infrastructure",
          "Advanced Security Audits",
          "Custom UI Component Library",
          "Ongoing Maintenance & Scaling",
          "Dedicated Development Hours",
        ],
        cta: "Let's Consult",
      },
    ],
  },
  {
    slug: "erp-systems",
    icon: Database,
    title: "Business Software & ERP",
    description:
      "Custom ERP, CRM, and management systems designed to streamline your business operations and automate manual workflows.",
    features: [
      "Inventory Management",
      "Financial Tracking & Reporting",
      "HR & Employee Portals",
      "CRM & Sales Automation",
      "Custom Workflow Design",
      "Data Migration Services",
    ],
    gradient: "from-purple-500 to-pink-400",
    glow: "group-hover:shadow-purple-500/20",
    number: "02",
    color: "from-pink-500 to-rose-600",
    price: "Starting from $4,000/system",
    longDescription:
      "Generic software often doesn't fit unique business processes. I develop bespoke business management systems that adapt to your workflow, increasing efficiency and providing real-time data insights.",
    plans: [
      {
        name: "Business Tool",
        price: "$4,000",
        billingCycle: "starting from",
        description: "Specific tool for a single department or process.",
        features: [
          "Custom Data Management",
          "Simple Reporting Dashboard",
          "User Management",
          "Cloud Hosting Setup",
          "Data Export (CSV/PDF)",
        ],
        cta: "Modernize My Process",
      },
      {
        name: "Custom ERP",
        price: "$8,500",
        billingCycle: "starting from",
        description: "Interconnected modules for your entire business.",
        features: [
          "Integrated Modules (Sales, HR, Inventory)",
          "Advanced Analytics & Charts",
          "Email/SMS Notifications",
          "Audit Logs & History",
          "Custom User Permissions",
          "Scalable Database Design",
        ],
        cta: "Scale My Business",
        highlighted: true,
      },
      {
        name: "Global System",
        price: "Custom",
        billingCycle: "",
        description: "Multi-branch, multi-currency enterprise systems.",
        features: [
          "Everything in ERP +",
          "Multi-location Support",
          "Advanced Security & Encryption",
          "System-wide Automation",
          "Custom API for Third-party Sync",
          "24/7 Technical Support",
        ],
        cta: "Enterprise Pricing",
      },
    ],
  },
  {
    slug: "startup-consulting",
    icon: Cpu,
    title: "Startup Tech Strategy",
    description:
      "Expert technical leadership and consulting for startups. From choosing the right stack to building a scalable roadmap.",
    features: [
      "Tech Stack Consulting",
      "MVP Roadmap Planning",
      "Code Reviews & Audits",
      "Architecture Design",
      "Scaling Strategies",
      "Technical Hiring Support",
    ],
    gradient: "from-amber-500 to-orange-400",
    glow: "group-hover:shadow-amber-500/20",
    number: "03",
    color: "from-amber-500 to-orange-600",
    price: "Starting from $1,500/consultation",
    longDescription:
      "Scaling a startup requires firm technical foundations. As a consultant, I help founders make the right decisions early, avoiding technical debt and ensuring the product is ready for growth.",
  },
  {
    slug: "ecommerce",
    icon: Globe,
    title: "Advanced E-commerce",
    description:
      "Beyond basic stores. I build conversion-optimized e-commerce platforms with custom features and seamless user journeys.",
    features: [
      "Headless E-commerce (Next.js)",
      "Custom Shopify Themes",
      "Complex Product Configurations",
      "Fast Checkout Experiences",
      "Multi-currency & Multi-language",
      "Marketing Tool Integration",
    ],
    gradient: "from-emerald-500 to-teal-400",
    glow: "group-hover:shadow-emerald-500/20",
    number: "04",
    color: "from-purple-500 to-indigo-600",
    price: "Starting from $3,000/store",
    longDescription:
      "Don't settle for a generic template. I create unique e-commerce experiences that stand out in the market and turn visitors into loyal customers.",
  },
  {
    slug: "technical-seo",
    icon: Settings,
    title: "Technical SEO & Speed",
    description:
      "Maximizing search rankings through technical excellence. I optimize Core Web Vitals, page speed, and site structure for maximum visibility.",
    features: [
      "Core Web Vitals Optimization",
      "Page Speed Enhancement",
      "Schema Markup (JSON-LD)",
      "Site Structure Audit",
      "Security Audits (SSL, etc.)",
      "Performance Monitoring",
    ],
    gradient: "from-rose-500 to-pink-400",
    glow: "group-hover:shadow-rose-500/20",
    number: "05",
    color: "from-green-500 to-emerald-600",
    price: "Starting from $1,000/audit",
    longDescription:
      "Even the best content won't rank on a slow site. I specialize in the technical side of SEO, ensuring your site is perfectly indexed and loads lightning fast.",
  },
  {
    slug: "ui-ux",
    icon: Figma,
    title: "UI/UX Design for SaaS",
    description:
      "Developer-led design systems that are both beautiful and easy to implement. Focused on user retention and product-led growth.",
    features: [
      "Custom UI Design Systems",
      "Interactive Prototypes",
      "SaaS Dashboard Design",
      "User Journey Mapping",
      "Brand Identity Design",
      "Component-based Handover",
    ],
    gradient: "from-accent-500 to-primary-400",
    glow: "group-hover:shadow-accent-500/20",
    number: "06",
    color: "from-cyan-500 to-blue-600",
    price: "Starting from $1,500/design",
    longDescription:
      "I design interfaces that users love to navigate. My approach combines aesthetic excellence with functional usability, specifically optimized for software products and SaaS platforms.",
  },
];
