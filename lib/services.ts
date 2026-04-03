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
    price: "Starting from $499",
    longDescription:
      "We design and develop custom websites and web applications that are fast, responsive, and conversion-optimized. From landing pages to complex SaaS dashboards, we build digital experiences that help your business grow.",
    plans: [
      {
        name: "Starter Website",
        price: "$499",
        billingCycle: "one-time",
        description:
          "Perfect for small businesses needing a professional web presence.",
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
        price: "$1,499",
        billingCycle: "one-time",
        description:
          "Feature-rich website for established businesses ready to scale.",
        features: [
          "Up to 15 Pages",
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
        price: "$3,999",
        billingCycle: "starting from",
        description:
          "Full-stack custom web application with advanced features.",
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
    title: "SEO Optimization",
    description:
      "Dominate search rankings with data-driven SEO strategies. We optimize technical SEO, content, keywords, and backlinks to drive organic growth.",
    features: [
      "Technical SEO Audit & Fixes",
      "Keyword Research & Strategy",
      "On-page SEO Optimization",
      "Link Building & Outreach",
      "Local SEO & Google My Business",
      "Monthly Reporting & Analytics",
    ],
    gradient: "from-rose-500 to-pink-400",
    glow: "group-hover:shadow-rose-500/20",
    number: "02",
    color: "from-green-500 to-emerald-600",
    price: "Starting from $299/mo",
    longDescription:
      "Our SEO services help your website rank higher on Google, drive more organic traffic, and convert visitors into customers. We use proven white-hat strategies tailored to your industry.",
    plans: [
      {
        name: "SEO Starter",
        price: "$299",
        billingCycle: "/month",
        description: "Essential SEO for small businesses getting started.",
        features: [
          "5 Target Keywords",
          "On-page Optimization",
          "Technical SEO Audit",
          "Monthly Reporting",
          "Google Search Console Setup",
        ],
        cta: "Start Ranking",
      },
      {
        name: "Growth SEO",
        price: "$599",
        billingCycle: "/month",
        description: "Comprehensive SEO for competitive markets.",
        features: [
          "15 Target Keywords",
          "On-page & Off-page SEO",
          "Content Optimization",
          "Link Building (5/mo)",
          "Competitor Analysis",
          "Bi-weekly Reporting",
        ],
        cta: "Grow Traffic",
        highlighted: true,
      },
      {
        name: "Enterprise SEO",
        price: "$1,299",
        billingCycle: "/month",
        description: "Full-scale SEO for maximum visibility and dominance.",
        features: [
          "30+ Target Keywords",
          "Complete SEO Strategy",
          "Premium Link Building (15/mo)",
          "Content Creation (4 articles/mo)",
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
      "Build brand awareness, engage your audience, and drive sales across all social platforms with data-driven content and paid ad strategies.",
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
    price: "Starting from $399/mo",
    longDescription:
      "We manage your social media presence across all major platforms, creating engaging content, running targeted paid campaigns, and building a loyal community around your brand.",
    plans: [
      {
        name: "Social Starter",
        price: "$399",
        billingCycle: "/month",
        description: "Get started with professional social media management.",
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
        price: "$799",
        billingCycle: "/month",
        description: "Accelerate your social presence and engagement.",
        features: [
          "4 Platforms Managed",
          "24 Posts/month",
          "Professional Graphics & Reels",
          "Paid Ad Management ($500 budget)",
          "Competitor Monitoring",
          "Bi-weekly Reports",
        ],
        cta: "Accelerate Growth",
        highlighted: true,
      },
      {
        name: "Social Premium",
        price: "$1,499",
        billingCycle: "/month",
        description: "Full-service social media domination.",
        features: [
          "All Platforms Managed",
          "40+ Posts/month",
          "Video Content & Stories",
          "Paid Ad Management ($2000 budget)",
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
      "Maximize ROI with targeted pay-per-click campaigns across Google, Facebook, and Instagram. Immediate traffic and qualified leads for your business.",
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
    price: "Starting from $499/mo",
    longDescription:
      "We create and manage high-performing PPC campaigns that drive immediate, qualified traffic to your business. Our data-driven approach ensures every dollar of ad spend generates maximum return.",
    plans: [
      {
        name: "PPC Starter",
        price: "$499",
        billingCycle: "/month",
        description: "Start driving targeted traffic to your business.",
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
        price: "$999",
        billingCycle: "/month",
        description: "Multi-platform campaigns for maximum reach.",
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
        price: "$1,999",
        billingCycle: "/month",
        description: "Full-scale advertising across all channels.",
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
      "Create valuable, SEO-optimized content that attracts, engages, and converts your target audience. Blog posts, videos, infographics, and more.",
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
    price: "Starting from $349/mo",
    longDescription:
      "We develop content strategies that position your brand as an industry authority, drive organic traffic, and nurture leads through every stage of the buyer journey.",
    plans: [
      {
        name: "Content Starter",
        price: "$349",
        billingCycle: "/month",
        description:
          "Build your content foundation with quality blog posts.",
        features: [
          "2 Blog Articles/month (1500+ words)",
          "Keyword Research per Article",
          "On-page SEO Optimization",
          "1 Social Share Graphic",
          "Content Calendar",
        ],
        cta: "Start Writing",
      },
      {
        name: "Content Growth",
        price: "$699",
        billingCycle: "/month",
        description: "Scale content production for serious growth.",
        features: [
          "4 Blog Articles/month (2000+ words)",
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
        price: "$1,299",
        billingCycle: "/month",
        description:
          "Full content engine with video, blogs, and campaigns.",
        features: [
          "8 Blog Articles/month",
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
      "Make data-driven decisions with comprehensive analytics setup, custom dashboards, and performance tracking across all your digital channels.",
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
    price: "Starting from $249/mo",
    longDescription:
      "We set up comprehensive analytics and reporting systems so you can understand your users, measure ROI, and make data-driven decisions that grow your business.",
    plans: [
      {
        name: "Analytics Basic",
        price: "$249",
        billingCycle: "/month",
        description: "Essential analytics setup for small businesses.",
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
        price: "$499",
        billingCycle: "/month",
        description: "Advanced tracking and custom reporting.",
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
        price: "$999",
        billingCycle: "/month",
        description:
          "Complete business intelligence and analytics stack.",
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
