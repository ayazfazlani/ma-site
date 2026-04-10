// src/lib/services.ts

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
  icon?: string;
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
    slug: "web-development",
    icon: "Code2",
    title: "Web Design & Development",
    description:
      "Custom, responsive websites and web applications built with Next.js, React, and modern stacks. Perfectly tailored for startups and growing businesses.",
    features: [
      "Full-stack Next.js & React Development",
      "Responsive & Mobile-first Design",
      "E-commerce Storefronts",
      "CMS Integration (WordPress, Headless)",
      "Performance & Core Web Vitals Optimization",
      "SEO-ready Architecture",
    ],
    gradient: "from-primary-500 to-primary-400",
    glow: "group-hover:shadow-primary-500/20",
    number: "01",
    color: "from-blue-500 to-blue-600",
    price: "Starting from $99",
    longDescription:
      "We design and develop fast, conversion-focused websites and web apps that help startups launch quickly and scale efficiently.",
    plans: [
      {
        name: "Starter Website",
        price: "$99",
        billingCycle: "one-time",
        description:
          "Perfect for new startups needing a professional online presence on a tight budget.",
        features: [
          "Up to 5 Pages",
          "Mobile Responsive Design",
          "Basic SEO Setup",
          "Contact Form Integration",
          "1 Month Free Support",
        ],
        cta: "Get Started",
      },
      {
        name: "Business Pro",
        price: "$199",
        billingCycle: "one-time",
        description:
          "Feature-rich website ideal for startups ready to grow and convert visitors.",
        features: [
          "Up to 12 Pages",
          "CMS Integration",
          "Advanced SEO & Analytics",
          "Payment Gateway Setup",
          "Custom Animations",
          "3 Months Free Support",
        ],
        cta: "Build My Site",
        highlighted: true,
      },
      {
        name: "Enterprise Web App",
        price: "$499",
        billingCycle: "starting from",
        description:
          "Full-stack custom web application with advanced features for scaling startups.",
        features: [
          "Custom Full-stack Development",
          "User Authentication & Roles",
          "Third-party API Integrations",
          "Real-time Dashboards",
          "Database Design",
          "6 Months Support & Maintenance",
        ],
        cta: "Let's Discuss",
      },
    ],
  },
  {
    slug: "seo",
    icon: "Settings",
    title: "Affordable SEO Services for Startups",
    description:
      "Boost your startup’s visibility with affordable SEO services designed for early-stage businesses. Get more organic traffic, higher rankings, and sustainable growth.",
    features: [
      "Technical SEO Audit & Fixes",
      "In-depth Keyword Research & Strategy",
      "On-page SEO Optimization",
      "Content SEO Optimization",
      "Link Building & Outreach",
      "Local SEO & Google My Business",
      "Monthly Reporting & Analytics",
    ],
    gradient: "from-rose-500 to-pink-400",
    glow: "group-hover:shadow-rose-500/20",
    number: "02",
    color: "from-green-500 to-emerald-600",
    price: "Starting from $249/mo",
    longDescription:
      "Our affordable SEO services for startups focus on high-ROI strategies including technical fixes, keyword targeting, and content optimization to help you rank faster and grow organically without high costs.",
    plans: [
      {
        name: "SEO Starter",
        price: "$249",
        billingCycle: "/month",
        description: "Budget-friendly SEO perfect for early-stage startups.",
        features: [
          "Up to 8 Target Keywords",
          "Complete Technical SEO Audit",
          "On-page SEO Optimization",
          "Keyword Research & Strategy",
          "Monthly SEO Report",
          "Google Search Console & Analytics Setup",
        ],
        cta: "Start Ranking",
      },
      {
        name: "Startup Growth SEO",
        price: "$449",
        billingCycle: "/month",
        description: "Comprehensive SEO for startups looking to scale traffic quickly.",
        features: [
          "Up to 20 Target Keywords",
          "Advanced On-page & Technical SEO",
          "Monthly Content Recommendations",
          "Link Building (8 links/mo)",
          "Competitor Analysis",
          "Bi-weekly Reports + Strategy Calls",
        ],
        cta: "Scale My Startup",
        highlighted: true,
      },
      {
        name: "Enterprise SEO",
        price: "$899",
        billingCycle: "/month",
        description: "Full-scale SEO for aggressive growth or competitive niches.",
        features: [
          "Unlimited Target Keywords",
          "Complete SEO Strategy",
          "Premium Link Building (15+/mo)",
          "Content Creation (5 articles/mo)",
          "Local SEO & Citations",
          "Weekly Reporting & Strategy Calls",
        ],
        cta: "Dominate Search",
      },
    ],
  },
  {
    slug: "social-media",
    icon: "Globe",
    title: "Social Media Marketing",
    description:
      "Build brand awareness, engage your audience, and drive sales across social platforms with affordable, data-driven strategies tailored for startups.",
    features: [
      "Content Creation & Scheduling",
      "Community Management",
      "Paid Social Advertising",
      "Influencer Partnerships",
      "Analytics & Performance Reports",
      "Brand Voice Development",
    ],
    gradient: "from-emerald-500 to-teal-400",
    glow: "group-hover:shadow-emerald-500/20",
    number: "03",
    color: "from-purple-500 to-indigo-600",
    price: "Starting from $299/mo",
    longDescription:
      "We help startups grow their social presence with engaging content, consistent posting, and smart paid campaigns — all at startup-friendly prices.",
    plans: [
      {
        name: "Social Starter",
        price: "$299",
        billingCycle: "/month",
        description: "Great entry point for startups building social presence.",
        features: [
          "2 Platforms Managed",
          "12 Posts/month",
          "Basic Design Graphics",
          "Community Engagement",
          "Monthly Analytics Report",
        ],
        cta: "Start Growing",
      },
      {
        name: "Social Growth",
        price: "$599",
        billingCycle: "/month",
        description: "Accelerated growth plan for active startups.",
        features: [
          "4 Platforms Managed",
          "24 Posts/month",
          "Professional Graphics & Reels",
          "Paid Ad Management ($400 budget)",
          "Competitor Monitoring",
          "Bi-weekly Reports",
        ],
        cta: "Accelerate Growth",
        highlighted: true,
      },
      {
        name: "Social Premium",
        price: "$999",
        billingCycle: "/month",
        description: "Full-service social media for scaling startups.",
        features: [
          "All Major Platforms",
          "35+ Posts/month",
          "Video Content & Stories",
          "Paid Ad Management ($1500 budget)",
          "Influencer Outreach",
          "Weekly Strategy & Reports",
        ],
        cta: "Go Premium",
      },
    ],
  },
  {
    slug: "ppc",
    icon: "Cpu",
    title: "PPC & Paid Advertising",
    description:
      "Maximize ROI with targeted pay-per-click campaigns across Google, Facebook, and Instagram. Immediate traffic for your startup.",
    features: [
      "Google Ads Management",
      "Facebook & Instagram Ads",
      "Landing Page Optimization",
      "Conversion Tracking Setup",
      "A/B Testing & Optimization",
      "ROI Reporting & Analytics",
    ],
    gradient: "from-amber-500 to-orange-400",
    glow: "group-hover:shadow-amber-500/20",
    number: "04",
    color: "from-amber-500 to-orange-600",
    price: "Starting from $99/mo",
    longDescription:
      "Affordable PPC management that drives qualified leads and sales for startups with smart targeting and continuous optimization.",
    plans: [
      {
        name: "PPC Starter",
        price: "$99",
        billingCycle: "/month",
        description: "Low-commitment entry for testing paid ads.",
        features: [
          "1 Platform (Google or Facebook)",
          "Campaign Setup & Management",
          "Keyword Research",
          "Ad Copy Creation",
          "Monthly Performance Report",
        ],
        cta: "Start Advertising",
      },
      {
        name: "PPC Growth",
        price: "$199",
        billingCycle: "/month",
        description: "Multi-platform campaigns for growing startups.",
        features: [
          "Google + Facebook/Instagram Ads",
          "Advanced Targeting & Retargeting",
          "Landing Page Optimization",
          "A/B Testing",
          "Conversion Tracking",
          "Bi-weekly Reports & Calls",
        ],
        cta: "Scale My Ads",
        highlighted: true,
      },
      {
        name: "PPC Enterprise",
        price: "$399",
        billingCycle: "/month",
        description: "Full-scale advertising for high-growth startups.",
        features: [
          "All Major Platforms",
          "Advanced Attribution Modeling",
          "Custom Audience Building",
          "Dynamic Remarketing",
          "CRM Integration",
          "Weekly Strategy & Optimization",
        ],
        cta: "Maximize ROI",
      },
    ],
  },
  {
    slug: "content",
    icon: "Layout",
    title: "Content Marketing",
    description:
      "Create valuable, SEO-optimized content that attracts, engages, and converts your target audience. Ideal for startups building authority.",
    features: [
      "Content Strategy & Planning",
      "SEO Blog Writing",
      "Video Script & Production",
      "Infographic Design",
      "Email Newsletter Content",
      "Content Calendar Management",
    ],
    gradient: "from-accent-500 to-primary-400",
    glow: "group-hover:shadow-accent-500/20",
    number: "05",
    color: "from-cyan-500 to-blue-600",
    price: "Starting from $249/mo",
    longDescription:
      "We produce high-quality, SEO-friendly content that helps startups establish thought leadership and drive organic traffic.",
    plans: [
      {
        name: "Content Starter",
        price: "$249",
        billingCycle: "/month",
        description:
          "Build your content foundation with quality blog posts.",
        features: [
          "2 Blog Articles/month (1200+ words)",
          "Keyword Research per Article",
          "On-page SEO Optimization",
          "1 Social Share Graphic",
          "Content Calendar",
        ],
        cta: "Start Writing",
      },
      {
        name: "Content Growth",
        price: "$499",
        billingCycle: "/month",
        description: "Scale content production for serious startup growth.",
        features: [
          "4 Blog Articles/month (1500+ words)",
          "2 Newsletter Emails",
          "Social Media Copy for All Posts",
          "Infographic Design (1/mo)",
          "Performance Reporting",
          "Content Distribution",
        ],
        cta: "Scale Content",
        highlighted: true,
      },
      {
        name: "Content Premium",
        price: "$899",
        billingCycle: "/month",
        description:
          "Full content engine with blogs, video, and campaigns.",
        features: [
          "6 Blog Articles/month",
          "Video Script + Editing (2/mo)",
          "Email Drip Campaigns",
          "Lead Magnet Creation",
          "Guest Posting (2/mo)",
          "Weekly Editorial Review",
        ],
        cta: "Build My Brand",
      },
    ],
  },
  {
    slug: "analytics",
    icon: "Database",
    title: "Analytics & Reporting",
    description:
      "Make data-driven decisions with comprehensive analytics setup, custom dashboards, and performance tracking across all channels.",
    features: [
      "Google Analytics 4 Setup",
      "Custom Dashboard Creation",
      "Conversion Tracking",
      "Tag Manager Implementation",
      "Heat Map & User Behavior Analysis",
      "Monthly Performance Reports",
    ],
    gradient: "from-purple-500 to-pink-400",
    glow: "group-hover:shadow-purple-500/20",
    number: "06",
    color: "from-pink-500 to-rose-600",
    price: "Starting from $199/mo",
    longDescription:
      "We set up clear analytics systems so startups can track performance, measure ROI, and make smart growth decisions.",
    plans: [
      {
        name: "Analytics Basic",
        price: "$199",
        billingCycle: "/month",
        description: "Essential analytics setup for startups.",
        features: [
          "GA4 Setup & Configuration",
          "5 Goal Conversions",
          "Basic Dashboard",
          "Monthly Summary Report",
          "UTM Tracking Setup",
        ],
        cta: "Get Insights",
      },
      {
        name: "Analytics Pro",
        price: "$399",
        billingCycle: "/month",
        description: "Advanced tracking and custom reporting for growing teams.",
        features: [
          "Full GA4 + GTM Setup",
          "Custom Conversion Funnels",
          "E-commerce Tracking",
          "Custom Looker Studio Dashboard",
          "Heat Map Analysis",
          "Bi-weekly Reports & Recommendations",
        ],
        cta: "Go Data-Driven",
        highlighted: true,
      },
      {
        name: "Analytics Enterprise",
        price: "$799",
        billingCycle: "/month",
        description:
          "Complete business intelligence for scaling startups.",
        features: [
          "Multi-platform Analytics Integration",
          "Advanced Attribution Modeling",
          "Predictive Analytics",
          "Custom API Data Feeds",
          "Real-time Dashboards",
          "Weekly Strategy & Data Review",
        ],
        cta: "Full Intelligence",
      },
    ],
  },
];