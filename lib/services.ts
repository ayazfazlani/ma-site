// src/lib/services.ts

const Figma = "Layout";
const Code2 = "Code2";
const Database = "Database";
const Globe = "Globe";
const Settings = "Settings";
const Cpu = "Cpu";

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
  icon?: any;
  title: string;
  description: string;
  features: string[];
  gradient?: string; 
  glow?: string; 
  number?: string; 
  color?: string; 
  price: string;
  longDescription?: string;
  plans?: PricingPlan[];
}

export const servicesData: ServiceData[] = [
  {
    slug: "web-apps",
    icon: "Code2",
    title: "Custom Web Applications",
    description: "High-performance, scalable web apps built with Next.js, TypeScript, and modern stacks. Perfectly tailored for startups and modern businesses.",
    features: ["Full-stack Next.js Development", "Real-time Dashboards", "API Integration & Development", "Authentication & Security", "Performance Optimization", "Scalable Architecture"],
    gradient: "from-primary-500 to-primary-400",
    glow: "group-hover:shadow-primary-500/20",
    number: "01",
    color: "from-blue-500 to-blue-600",
    price: "Starting from $2,500/project",
    longDescription: "I build custom web applications that are fast, secure, and ready to scale. From complex SaaS platforms to interactive internal tools, I ensure your vision is transformed into a high-performance digital product.",
    plans: [
      { name: "MVP Starter", price: "$2,500", billingCycle: "starting from", description: "Perfect for startups needing to launch their first version quickly.", features: ["Core Feature Development", "Next.js & Tailwind CSS", "Database Setup (Supabase/Postgres)", "Authentication Integration", "Mobile Responsive Design"], cta: "Launch My MVP" },
      { name: "Full Product", price: "$5,000", billingCycle: "starting from", description: "Comprehensive development for feature-rich applications.", features: ["Everything in MVP +", "Advanced User Roles", "Third-party APIs", "Testing", "Payments"], cta: "Build My Product", highlighted: true }
    ],
  },
  {
    slug: "erp-systems",
    icon: "Database",
    title: "Business Software & ERP",
    description: "Custom ERP, CRM, and management systems designed to streamline your business operations and automate manual workflows.",
    features: ["Inventory Management", "Financial Tracking", "HR Portals", "CRM & Sales", "Custom Workflows"],
    gradient: "from-purple-500 to-pink-400",
    glow: "group-hover:shadow-purple-500/20",
    number: "02",
    color: "from-pink-500 to-rose-600",
    price: "Starting from $4,000/system",
    longDescription: "Generic software often doesn't fit unique business processes. I develop bespoke systems that adapt to your workflow.",
  },
  {
    slug: "startup-consulting",
    icon: "Cpu",
    title: "Startup Tech Strategy",
    description: "Expert technical leadership and consulting for startups. From choosing the right stack to building a scalable roadmap.",
    features: ["Tech Stack Consulting", "MVP Roadmap Planning", "Code Reviews", "Architecture Design"],
    gradient: "from-amber-500 to-orange-400",
    glow: "group-hover:shadow-amber-500/20",
    number: "03",
    color: "from-amber-500 to-orange-600",
    price: "Starting from $1,500/consultation",
  },
  {
    slug: "ecommerce",
    icon: "Globe",
    title: "Advanced E-commerce",
    description: "Beyond basic stores. I build conversion-optimized e-commerce platforms with custom features and seamless user journeys.",
    features: ["Headless E-commerce", "Custom Shopify Themes", "Complex Configurations", "Fast Checkouts"],
    gradient: "from-emerald-500 to-teal-400",
    glow: "group-hover:shadow-emerald-500/20",
    number: "04",
    color: "from-purple-500 to-indigo-600",
    price: "Starting from $3,000/store",
  },
  {
    slug: "technical-seo",
    icon: "Settings",
    title: "Technical SEO & Speed",
    description: "Maximizing search rankings through technical excellence. I optimize Core Web Vitals, page speed, and site structure.",
    features: ["Core Web Vitals", "Speed Enhancement", "Schema Markup", "Site Audits"],
    gradient: "from-rose-500 to-pink-400",
    glow: "group-hover:shadow-rose-500/20",
    number: "05",
    color: "from-green-500 to-emerald-600",
    price: "Starting from $1,000/audit",
  },
  {
    slug: "ui-ux",
    icon: "Figma",
    title: "UI/UX Design for SaaS",
    description: "Developer-led design systems that are both beautiful and easy to implement. Focused on user retention.",
    features: ["Design Systems", "Prototypes", "Dashboard Design", "Journey Mapping"],
    gradient: "from-accent-500 to-primary-400",
    glow: "group-hover:shadow-accent-500/20",
    number: "06",
    color: "from-cyan-500 to-blue-600",
    price: "Starting from $1,500/design",
  },
];
