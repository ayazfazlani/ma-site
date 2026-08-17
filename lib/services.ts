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
  metaTitle?: string;
  metaDescription?: string;
  features: string[];
  gradient?: string;
  glow?: string;
  number?: string;
  color?: string;
  price: string;
  longDescription?: string;
  plans?: PricingPlan[];
  whyChooseUs?: { title: string; description: string }[];
  process?: { title: string; description: string }[];
  faqs?: { q: string; a: string }[];
  techStack?: { name: string; icon: string; color?: string }[];
}

export const servicesData: ServiceData[] = [
  {
    slug: "custom-erp",
    icon: "Database",
    title: "Custom ERP Development",
    metaTitle: "Custom ERP Development",
    metaDescription:
      "Custom ERP development for manufacturers and growing businesses. Own your workflows, inventory, production, and reporting — no generic off-the-shelf ERP.",
    description:
      "Custom ERP development built around how your business actually runs. Inventory, production, suppliers, and reporting in one system you own.",
    features: [
      "Plastics & Pipe Operations Tracking",
      "Raw Materials Inventory & Waste Logging",
      "Supplier Ledger & Accounting Integration",
      "Detailed Production Machinery Scheduling",
      "Government Contract & Invoice Management",
      "Operational Reports & Performance Auditing",
    ],
    gradient: "from-blue-600 to-indigo-500",
    glow: "group-hover:shadow-indigo-500/20",
    number: "01",
    color: "from-indigo-500 to-purple-600",
    price: "Starting at $950",
    longDescription:
      "Custom ERP development from MA Softs means software shaped to your operations — not a bloated suite you have to work around. I build ERP systems for manufacturers, distributors, and growing teams that need inventory, production, supplier ledgers, and reporting in one place. You own the codebase. No per-user licenses.",
    plans: [
      {
        name: "Starter Manufacturing ERP",
        price: "$950",
        billingCycle: "one-time",
        description: "For small-to-medium factories needing core material and order tracking.",
        features: [
          "Raw Material Inventory",
          "Production Batch Tracking",
          "Order & Delivery Flow",
          "Basic Reporting Dashboard",
          "1 Month Handover Support",
        ],
        cta: "Request Demo",
      },
      {
        name: "Enterprise ERP Suite",
        price: "$2,400",
        billingCycle: "one-time",
        description: "Advanced ERP built for multi-plant operations and government contracting.",
        features: [
          "Multi-location Production Tracking",
          "Machinery Metrics & Uptime Audit",
          "Government Contract Invoicing",
          "Advanced Supplier Audits",
          "Multi-role Authentication & Logs",
          "6 Months Dedicated Support",
        ],
        cta: "Schedule Audit",
        highlighted: true,
      },
    ],
    whyChooseUs: [
      { title: "Built for Operations", description: "Bespoke features designed for real factory floors, not generic templates." },
      { title: "Local Compliance", description: "Configured for local taxes, supplier ledgers, and government contracts." },
      { title: "No Licensing Fees", description: "You own the custom software entirely, with zero recurring per-user fees." },
      { title: "Scalable Core", description: "Engineered on React/Next.js and Node.js for lightning performance and stability." }
    ],
    process: [
      { title: "Discovery", description: "I Map out your factory flows, inventory checkpoints, and reporting targets." },
      { title: "Prototype Design", description: "Modeling the user interface to ensure workers can enter data effortlessly." },
      { title: "Bespoke Development", description: "Writing lean code and setting up secure databases tailored to your metrics." },
      { title: "Onboarding & Launch", description: "Testing on-site, trailing operations, and coaching your staff to use the system." }
    ],
    faqs: [
      { q: "What is custom ERP development?", a: "Custom ERP development means building operations software around your workflows — inventory, production, suppliers, and reporting — instead of forcing your team into a generic package." },
      { q: "Is this ERP suitable for plastics and pipe factories?", a: "Yes. ERP for the plastic industry is a core use case: feedstock, granulator operations, pipe production, waste margins, and government order ledgers." },
      { q: "Can we run this offline or locally?", a: "Optionally yes. I can deploy it to a local container or intranet server, or as a secure cloud application accessible from anywhere." },
      { q: "How do we handle government contracts?", a: "I build specific modules to track tender requirements, milestones, advance billing, security deposits, and final clearance status." },
      { q: "What support is provided after launch?", a: "All projects include dedicated support to address adjustments, training queries, and ensure smooth daily operations." }
    ],
    techStack: [
      { name: "Next.js", icon: "Zap", color: "text-white" },
      { name: "Node.js", icon: "Layers", color: "text-green-500" },
      { name: "MongoDB", icon: "Database", color: "text-emerald-500" },
      { name: "Tailwind CSS", icon: "Layout", color: "text-cyan-400" }
    ]
  },
  {
    slug: "web-development",
    icon: "Code2",
    title: "Custom Website Development Services",
    metaTitle: "Custom Website Development Services",
    metaDescription:
      "Custom website development services for businesses that need more than a template. Fast, SEO-ready sites and web apps built around your brand and workflows.",
    description:
      "Custom website development services for companies that need a fast, conversion-focused site or web app — not another generic template.",
    features: [
      "Business websites & marketing sites",
      "Web apps and client portals",
      "SEO-ready Next.js architecture",
      "Ecommerce and booking flows",
      "CMS and content management",
      "Performance & Core Web Vitals",
    ],
    gradient: "from-primary-500 to-primary-400",
    glow: "group-hover:shadow-primary-500/20",
    number: "02",
    color: "from-blue-500 to-blue-600",
    price: "Starting at $150",
    longDescription:
      "Custom website development services from MA Softs cover marketing sites, client portals, and full web applications. I design and build fast, SEO-ready experiences on Next.js and React so your site ranks, converts, and scales with the business.",
    plans: [
      {
        name: "Starter Website",
        price: "$150",
        billingCycle: "one-time",
        description: "For new startups needing a professional online presence on a tight budget.",
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
        price: "$450",
        billingCycle: "one-time",
        description: "Feature-rich website for startups ready to grow and convert visitors.",
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
        price: "$850",
        billingCycle: "one-time",
        description: "Custom development for high-end web applications and business portals.",
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
    whyChooseUs: [
      { title: "Performance First", description: "My websites are lightning-fast, ensuring your users never have to wait." },
      { title: "SEO Optimized", description: "Built-in SEO best practices to help you rank higher from day one." },
      { title: "Conversion Focused", description: "Every element is designed to turn visitors into loyal customers." },
      { title: "Scale Ready", description: "Architecture designed to grow alongside your business and traffic." }
    ],
    process: [
      { title: "Discovery", description: "I dive deep into your brand, goals, and target audience." },
      { title: "Design", description: "Creating stunning, user-centric designs that reflect your brand." },
      { title: "Development", description: "Coding with the latest technologies for speed and reliability." },
      { title: "Launch", description: "Thorough testing and deployment to bring your vision to life." }
    ],
    faqs: [
      { q: "How long does a website take to build?", a: "Typical timelines: Starter (3-4 weeks), Professional (5-7 weeks), E-commerce (8-12 weeks)." },
      { q: "Can you migrate my existing website?", a: "Yes! I handle full migrations including data transfer, SEO setup, and zero downtime." },
      { q: "Will my website be mobile-friendly?", a: "Absolutely. All my websites are fully responsive and mobile-optimized." },
      { q: "What about ongoing support?", a: "All plans include free support beyond the initial launch period." }
    ],
    techStack: [
      { name: "React", icon: "Layers", color: "text-sky-400" },
      { name: "Next.js", icon: "Zap", color: "text-white" },
      { name: "TypeScript", icon: "Code2", color: "text-blue-500" },
      { name: "Tailwind", icon: "Layout", color: "text-cyan-400" }
    ]
  },
  {
    slug: "manufacturing",
    icon: "Factory",
    title: "Custom Software for Manufacturing",
    metaTitle: "Custom Software for Manufacturing",
    metaDescription:
      "Custom software for manufacturing — production tracking, inventory, machine logs, and shop-floor reporting built around your factory, not a generic package.",
    description:
      "Custom software for manufacturing that connects the shop floor to the office: production, inventory, quality, and reporting in one system.",
    features: [
      "Production & Batch Tracking",
      "Raw Materials & Inventory Control",
      "Machine Output & Downtime Logs",
      "Quality Checks & Waste Margins",
      "Supplier & Purchase Orders",
      "Live Factory Dashboards",
    ],
    gradient: "from-slate-600 to-blue-500",
    glow: "group-hover:shadow-blue-500/20",
    number: "03",
    color: "from-slate-600 to-blue-600",
    price: "Starting at $950",
    longDescription:
      "Custom software for manufacturing should match how your plant actually runs. I build systems for production scheduling, raw-material inventory, machine output, quality, and reporting — including ERP for the plastic industry and other industrial operations. No modules you never use. No per-user fees.",
    plans: [
      {
        name: "Plant Starter",
        price: "$950",
        billingCycle: "one-time",
        description: "Core production and inventory tracking for a single plant.",
        features: [
          "Raw Material Inventory",
          "Production Batch Tracking",
          "Order & Delivery Flow",
          "Basic Factory Dashboard",
          "1 Month Handover Support",
        ],
        cta: "Request Demo",
      },
      {
        name: "Factory Operations Suite",
        price: "$2,400",
        billingCycle: "one-time",
        description: "Full operations software for plants that need machinery, suppliers, and reporting together.",
        features: [
          "Multi-line Production Tracking",
          "Machinery Metrics & Downtime",
          "Supplier Ledger & Purchasing",
          "Quality & Waste Reporting",
          "Role-based Access",
          "6 Months Dedicated Support",
        ],
        cta: "Schedule Audit",
        highlighted: true,
      },
    ],
    whyChooseUs: [
      { title: "Built for the Floor", description: "Interfaces your operators can use on a busy shift — not desktop software designed for accountants only." },
      { title: "Your Process, Not Ours", description: "Workflows follow your plant: batches, machines, waste, and suppliers as you already run them." },
      { title: "You Own It", description: "Custom software you own outright, with no recurring per-user ERP licenses." },
      { title: "Ready to Grow", description: "Add a second line, warehouse, or plant without starting over." }
    ],
    process: [
      { title: "Plant Walkthrough", description: "I map materials, machines, shifts, and the reports you actually need." },
      { title: "Prototype", description: "Clickable screens so operators and managers can confirm the flow before we build." },
      { title: "Build", description: "Production software with secure data, roles, and the metrics that matter on your floor." },
      { title: "Go-Live", description: "On-site or remote training, parallel running, and support through the first live weeks." }
    ],
    faqs: [
      { q: "Is this custom software for manufacturing or a generic ERP?", a: "It is custom software for manufacturing. We model your plant — materials, machines, batches, and reports — instead of forcing you into a generic ERP template." },
      { q: "Do you work with plastic and pipe factories?", a: "Yes. ERP for the plastic industry is a core use case: feedstock, extrusion or moulding, waste, and supplier ledgers." },
      { q: "Can it run on a local server?", a: "Yes. Cloud, on-premise, or a hybrid setup depending on your network and IT policy." },
      { q: "How long does a typical plant system take?", a: "A focused first version is usually 6–12 weeks. Larger multi-plant suites take longer and ship in phases." }
    ],
    techStack: [
      { name: "Next.js", icon: "Zap", color: "text-white" },
      { name: "Node.js", icon: "Layers", color: "text-green-500" },
      { name: "MongoDB", icon: "Database", color: "text-emerald-500" },
      { name: "Tailwind CSS", icon: "Layout", color: "text-cyan-400" }
    ]
  },
  {
    slug: "small-business",
    icon: "Briefcase",
    title: "Custom Software for Small Business",
    metaTitle: "Custom Software for Small Business",
    metaDescription:
      "Custom software for small business — operations, invoicing, client portals, and automation built to fit your team without enterprise bloat or per-seat fees.",
    description:
      "Custom software for small business teams that have outgrown spreadsheets and generic tools, without paying enterprise prices.",
    features: [
      "Operations & Job Tracking",
      "Invoicing & Client Records",
      "Simple Inventory or Bookings",
      "Staff Roles & Permissions",
      "WhatsApp or Email Alerts",
      "Reports You Actually Use",
    ],
    gradient: "from-teal-500 to-emerald-400",
    glow: "group-hover:shadow-emerald-500/20",
    number: "04",
    color: "from-teal-500 to-emerald-600",
    price: "Starting at $450",
    longDescription:
      "Custom software for small business should feel simple on day one and still fit as you grow. I replace scattered spreadsheets, WhatsApp threads, and mismatched apps with one system for jobs, clients, invoicing, and reporting — sized for a small team, not an enterprise IT department.",
    plans: [
      {
        name: "Starter Ops",
        price: "$450",
        billingCycle: "one-time",
        description: "A focused first system for a small team replacing spreadsheets.",
        features: [
          "Client & Job Records",
          "Basic Invoicing",
          "Simple Dashboard",
          "Mobile-friendly Screens",
          "1 Month Support",
        ],
        cta: "Get Started",
      },
      {
        name: "Business Hub",
        price: "$950",
        billingCycle: "one-time",
        description: "Full operations software for small businesses ready to run on one platform.",
        features: [
          "Jobs, Clients & Invoicing",
          "Inventory or Bookings",
          "Staff Roles",
          "Email or WhatsApp Alerts",
          "Custom Reports",
          "3 Months Support",
        ],
        cta: "Build My System",
        highlighted: true,
      },
    ],
    whyChooseUs: [
      { title: "Sized for Small Teams", description: "No 200-feature suites. We build the workflows you use every week." },
      { title: "Clear Pricing", description: "Project-based custom software — not a surprise per-seat bill as you hire." },
      { title: "Easy to Learn", description: "If your team can use a phone, they can use the system after a short walkthrough." },
      { title: "Room to Grow", description: "Add modules later: inventory, a client portal, or a second location." }
    ],
    process: [
      { title: "Listen", description: "We list the spreadsheets, tools, and daily headaches that waste the most time." },
      { title: "Sketch", description: "Simple screens for the 3–5 jobs your team does every day." },
      { title: "Build", description: "A working system with your data, your wording, and your rules." },
      { title: "Handover", description: "Training, a short guide, and support while the team switches over." }
    ],
    faqs: [
      { q: "Is custom software for small business worth it versus off-the-shelf?", a: "If you are bending three tools and a spreadsheet to fit one process, custom software for small business usually pays back in time saved and fewer mistakes." },
      { q: "How small is too small?", a: "If two or more people touch the same jobs, invoices, or stock every day, a focused system is usually a good fit." },
      { q: "Can we start small and add later?", a: "Yes. Most small-business builds start with one core workflow, then add invoicing, inventory, or a client portal." },
      { q: "Do you provide training?", a: "Yes. Handover includes walkthroughs for the people who will use it daily, plus a window of support after launch." }
    ],
    techStack: [
      { name: "Next.js", icon: "Zap", color: "text-white" },
      { name: "Node.js", icon: "Layers", color: "text-green-500" },
      { name: "MongoDB", icon: "Database", color: "text-emerald-500" },
      { name: "Tailwind CSS", icon: "Layout", color: "text-cyan-400" }
    ]
  },
  {
    slug: "seo",
    icon: "Settings",
    title: "Affordable SEO Services for Startups",
    description:
      "Boost your startup's visibility with affordable SEO services designed for early-stage businesses. Get more organic traffic, higher rankings, and sustainable growth.",
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
    number: "03",
    color: "from-green-500 to-emerald-600",
    price: "Starting at $199/mo",
    longDescription:
      "My affordable SEO services for startups focus on high-ROI strategies including technical fixes, keyword targeting, and content optimization to help you rank faster and grow organically.",
    plans: [
      {
        name: "SEO Starter",
        price: "$199",
        billingCycle: "/month",
        description: "Budget-friendly SEO perfect for early-stage startups.",
        features: [
          "Up to 8 Target Keywords",
          "Complete Technical SEO Audit",
          "On-page SEO Optimization",
          "Keyword Research & Strategy",
          "Monthly SEO Report",
          "Search Console & Analytics Setup",
        ],
        cta: "Start Ranking",
      },
      {
        name: "Startup Growth SEO",
        price: "$349",
        billingCycle: "/month",
        description: "Comprehensive SEO for startups looking to scale traffic quickly.",
        features: [
          "Up to 20 Target Keywords",
          "Advanced On-page & Technical SEO",
          "Monthly Content Recommendations",
          "Link Building (8 links/mo)",
          "Competitor Analysis",
          "Bi-weekly Strategy Calls",
        ],
        cta: "Scale My Startup",
        highlighted: true,
      },
      {
        name: "Enterprise SEO",
        price: "$699",
        billingCycle: "/month",
        description: "Full-scale SEO for aggressive growth or competitive niches.",
        features: [
          "Unlimited Target Keywords",
          "Complete SEO Strategy",
          "Premium Link Building (15+/mo)",
          "Content Creation (5 articles/mo)",
          "Local SEO & Citations",
          "Weekly Strategy & Reports",
        ],
        cta: "Dominate Search",
      },
    ],
    whyChooseUs: [
      { title: "Data Driven", description: "I use hard data and analytics to shape your SEO strategy." },
      { title: "White Hat Only", description: "Ethical SEO practices that protect your site from penalties." },
      { title: "Transparent Reporting", description: "Clear, simplified reports that show real growth metrics." },
      { title: "Content Specialists", description: "I create content that both Google and users love." }
    ],
    process: [
      { title: "Audit", description: "Finding technical issues that hold your site back." },
      { title: "Strategy", description: "Identifying high-value keywords and content gaps." },
      { title: "Optimization", description: "Implementing changes for maximum visibility." },
      { title: "Reporting", description: "Measuring progress and refining the approach." }
    ],
    faqs: [
      { q: "How long until I see SEO results?", a: "Noticeable improvements in 3-6 months, significant results within 6-12 months." },
      { q: "What makes your SEO different?", a: "I combine technical expertise with data-driven growth strategies for startups." },
      { q: "Do you guarantee rankings?", a: "We guarantee effort, expertise, and transparency. Rankings depend on many market factors." },
      { q: "What's in the monthly retainer?", a: "Ongoing optimization, monitoring, and proactive strategy adjustments." }
    ],
    techStack: [
      { name: "Semrush", icon: "Search", color: "text-orange-500" },
      { name: "Ahrefs", icon: "Globe", color: "text-blue-600" },
      { name: "GA4", icon: "BarChart", color: "text-yellow-400" },
      { name: "GSC", icon: "Settings", color: "text-emerald-500" }
    ]
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
    number: "04",
    color: "from-purple-500 to-indigo-600",
    price: "Starting at $249/mo",
    longDescription:
      "I help startups grow their social presence with engaging content, consistent posting, and smart paid campaigns — all at startup-friendly prices.",
    plans: [
      {
        name: "Social Starter",
        price: "$249",
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
        price: "$499",
        billingCycle: "/month",
        description: "Accelerated growth plan for active startups.",
        features: [
          "4 Platforms Managed",
          "24 Posts/month",
          "Professional Graphics & Reels",
          "Paid Ad Management",
          "Competitor Monitoring",
          "Bi-weekly Reports",
        ],
        cta: "Accelerate Growth",
        highlighted: true,
      },
      {
        name: "Social Premium",
        price: "$849",
        billingCycle: "/month",
        description: "Full-service social media for scaling startups.",
        features: [
          "All Major Platforms",
          "35+ Posts/month",
          "Video Content & Stories",
          "Advanced Ad Management",
          "Influencer Outreach",
          "Weekly Strategy & Reports",
        ],
        cta: "Go Premium",
      },
    ],
    whyChooseUs: [
      { title: "Engagement focus", description: "I don't just post; I build active communities around your brand." },
      { title: "Platform Experts", description: "Deep knowledge of algorithms for TikTok, Instagram, and LinkedIn." },
      { title: "Creative Storytelling", description: "Content that stops the scroll and starts conversations." },
      { title: "ROI Oriented", description: "Social strategies that align with your actual business goals." }
    ],
    process: [
      { title: "Brand Discovery", description: "Defining your unique brand voice and aesthetic." },
      { title: "Content Creation", description: "Producing high-quality visuals and compelling copy." },
      { title: "Scheduling", description: "Strategic posting when your audience is most active." },
      { title: "Community Management", description: "Engaging with your audience in real-time." }
    ],
    faqs: [
      { q: "Which platforms do you manage?", a: "Facebook, Instagram, TikTok, LinkedIn, Twitter, and YouTube." },
      { q: "How often do you post?", a: "Varies by plan, from 12 posts/month to daily posting." },
      { q: "Can you create our brand voice?", a: "Absolutely! I'll develop an authentic voice that resonates with your audience." },
      { q: "How do you track success?", a: "Through detailed engagement metrics, reach, and conversion analytics." }
    ],
    techStack: [
      { name: "Buffer", icon: "Layers", color: "text-blue-400" },
      { name: "Canva", icon: "Layout", color: "text-cyan-500" },
      { name: "Meta Business", icon: "Globe", color: "text-blue-600" },
      { name: "CapCut", icon: "Zap", color: "text-white" }
    ]
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
    number: "05",
    color: "from-amber-500 to-orange-600",
    price: "Starting at $79/mo",
    longDescription:
      "Affordable PPC management that drives qualified leads and sales for startups with smart targeting and continuous optimization.",
    plans: [
      {
        name: "PPC Starter",
        price: "$79",
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
        price: "$169",
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
        price: "$329",
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
    whyChooseUs: [
      { title: "Immediate Impact", description: "Start getting traffic and leads within hours of launch." },
      { title: "Strict ROI focus", description: "Constant monitoring to ensure your ad spend yields profit." },
      { title: "Laser Targeting", description: "Reaching the exact people searching for your solution." },
      { title: "Creative A/B Testing", description: "I constantly test copy and visuals to optimize CPAs." }
    ],
    process: [
      { title: "KW Research", description: "Identifying high-intent search terms for your business." },
      { title: "Campaign Launch", description: "Setting up structured, high-performing ad sets." },
      { title: "Daily Monitoring", description: "Real-time adjustments to bids and budgets." },
      { title: "Scaling", description: "Incrementally increasing spend on winning campaigns." }
    ],
    faqs: [
      { q: "How much is the management fee?", a: "Management fees are separate from your ad spend, which you control." },
      { q: "What's a good budget to start?", a: "I recommend starting with at least $1,000/mo in spend for meaningful data." },
      { q: "How quickly will I see results?", a: "Immediate visibility, with peak optimization typically in 2-4 weeks." },
      { q: "Which platform is best?", a: "Depends on your niche; typically Google for intent and Meta for awareness." }
    ],
    techStack: [
      { name: "Google Ads", icon: "Zap", color: "text-blue-500" },
      { name: "Meta Ads", icon: "Globe", color: "text-blue-600" },
      { name: "Hotjar", icon: "Cpu", color: "text-red-500" },
      { name: "Looker Studio", icon: "BarChart", color: "text-blue-400" }
    ]
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
    number: "06",
    color: "from-cyan-500 to-blue-600",
    price: "Starting at $199/mo",
    longDescription:
      "I produce high-quality, SEO-friendly content that helps startups establish thought leadership and drive organic traffic.",
    plans: [
      {
        name: "Content Starter",
        price: "$199",
        billingCycle: "/month",
        description: "Build your content foundation with quality blog posts.",
        features: [
          "2 Blog Articles/month",
          "Keyword Research per Article",
          "On-page SEO Optimization",
          "1 Social Share Graphic",
          "Content Calendar",
        ],
        cta: "Start Writing",
      },
      {
        name: "Content Growth",
        price: "$399",
        billingCycle: "/month",
        description: "Scale content production for serious startup growth.",
        features: [
          "4 Blog Articles/month",
          "2 Newsletter Emails",
          "Social Media Copy",
          "Infographic Design",
          "Performance Reporting",
          "Content Distribution",
        ],
        cta: "Scale Content",
        highlighted: true,
      },
      {
        name: "Content Premium",
        price: "$749",
        billingCycle: "/month",
        description: "Full content engine with blogs, video, and campaigns.",
        features: [
          "6 Blog Articles/month",
          "Video Script + Editing",
          "Email Drip Campaigns",
          "Lead Magnet Creation",
          "Guest Posting",
          "Weekly Editorial Review",
        ],
        cta: "Build My Brand",
      },
    ],
    whyChooseUs: [
      { title: "Authority Building", description: "Establish your brand as a leader in your industry." },
      { title: "Human Centric", description: "Content written for real people, not just algorithms." },
      { title: "Evergreen ROI", description: "High-quality content that generates traffic for years." },
      { title: "Integrated SEO", description: "Seamlessly blending keywords into compelling narratives." }
    ],
    process: [
      { title: "Topic Research", description: "Finding what your audience is actually searching for." },
      { title: "Editorial Plan", description: "Developing a strategic calendar for consistent delivery." },
      { title: "Writing & Edit", description: "Crafting original, high-quality, long-form content." },
      { title: "Promotion", description: "Ensuring your content reaches the right eyes." }
    ],
    faqs: [
      { q: "Can you write in our voice?", a: "Yes, I create style guides to ensure perfect brand alignment." },
      { q: "How long are the articles?", a: "Typically 1,500-2,500 words for maximum SEO impact." },
      { q: "Do you include graphics?", a: "Yes, social graphics are included; infographics in higher tiers." },
      { q: "Can we request revisions?", a: "Absolutely. I include multiple revision rounds in every plan." }
    ],
    techStack: [
      { name: "Grammarly", icon: "Type", color: "text-green-500" },
      { name: "SurferSEO", icon: "Search", color: "text-blue-500" },
      { name: "Jasper", icon: "Zap", color: "text-indigo-400" },
      { name: "WordPress", icon: "Layout", color: "text-blue-600" }
    ]
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
    number: "07",
    color: "from-pink-500 to-rose-600",
    price: "Starting at $159/mo",
    longDescription:
      "I set up clear analytics systems so startups can track performance, measure ROI, and make smart growth decisions.",
    plans: [
      {
        name: "Analytics Basic",
        price: "$159",
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
        price: "$329",
        billingCycle: "/month",
        description: "Advanced tracking and custom reporting.",
        features: [
          "Full GA4 + GTM Setup",
          "Custom Conversion Funnels",
          "E-commerce Tracking",
          "Looker Studio Dashboard",
          "Heat Map Analysis",
          "Bi-weekly Strategy Calls",
        ],
        cta: "Go Data-Driven",
        highlighted: true,
      },
      {
        name: "Analytics Enterprise",
        price: "$649",
        billingCycle: "/month",
        description: "Complete business intelligence for scaling startups.",
        features: [
          "Multi-platform Integration",
          "Predictive Analytics",
          "Custom API Data Feeds",
          "Real-time Dashboards",
          "Advanced Attribution",
          "Weekly Strategy Review",
        ],
        cta: "Full Intelligence",
      },
    ],
    whyChooseUs: [
      { title: "Biolerplate-free", description: "Custom tracking tailored to your specific business model." },
      { title: "Clarity over Noise", description: "I highlight the metrics that actually drive growth." },
      { title: "GTM Experts", description: "Complex tracking implementations made reliable and fast." },
      { title: "Actionable Insights", description: "I don't just give data; I tell you what to do with it." }
    ],
    process: [
      { title: "Audit", description: "Evaluating your current tracking health and data gaps." },
      { title: "Implementation", description: "Configuring GA4, GTM, and custom event tracking." },
      { title: "Dashboarding", description: "Visualizing your data for easy daily monitoring." },
      { title: "Analysis", description: "Translating numbers into growth opportunities." }
    ],
    faqs: [
      { q: "Why GA4?", a: "It's the future of tracking, offering better user behavior insights." },
      { q: "Standard vs Custom?", a: "Custom reports focus only on the KPIs that matter to you." },
      { q: "How often reports?", a: "Weekly/Monthly based on your preference; real-time dashboards." },
      { q: "Can you track calls?", a: "Yes, I can implement full call and lead tracking systems." }
    ],
    techStack: [
      { name: "GA4", icon: "BarChart", color: "text-yellow-500" },
      { name: "GTM", icon: "Layers", color: "text-blue-500" },
      { name: "Clarity", icon: "Layout", color: "text-blue-400" },
      { name: "Looker", icon: "Zap", color: "text-blue-600" }
    ]
  },
];