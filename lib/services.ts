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
  whyChooseUs?: { title: string; description: string }[];
  process?: { title: string; description: string }[];
  faqs?: { q: string; a: string }[];
  techStack?: { name: string; icon: string; color?: string }[];
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
    whyChooseUs: [
      { title: "Performance First", description: "Our websites are lightning-fast, ensuring your users never have to wait." },
      { title: "SEO Optimized", description: "Built-in SEO best practices to help you rank higher from day one." },
      { title: "Conversion Focused", description: "Every element is designed to turn visitors into loyal customers." },
      { title: "Scale Ready", description: "Architecture designed to grow alongside your business and traffic." }
    ],
    process: [
      { title: "Discovery", description: "We dive deep into your brand, goals, and target audience." },
      { title: "Design", description: "Creating stunning, user-centric designs that reflect your brand." },
      { title: "Development", description: "Coding with the latest technologies for speed and reliability." },
      { title: "Launch", description: "Thorough testing and deployment to bring your vision to life." }
    ],
    faqs: [
      { q: "How long does a website take to build?", a: "Typical timelines: Starter (3-4 weeks), Professional (5-7 weeks), E-commerce (8-12 weeks)." },
      { q: "Can you migrate my existing website?", a: "Yes! We handle full migrations including data transfer, SEO setup, and zero downtime." },
      { q: "Will my website be mobile-friendly?", a: "Absolutely. All our websites are fully responsive and mobile-optimized." },
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
      "Our affordable SEO services for startups focus on high-ROI strategies including technical fixes, keyword targeting, and content optimization to help you rank faster and grow organically.",
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
          "Search Console & Analytics Setup",
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
          "Bi-weekly Strategy Calls",
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
          "Weekly Strategy & Reports",
        ],
        cta: "Dominate Search",
      },
    ],
    whyChooseUs: [
      { title: "Data Driven", description: "We use hard data and analytics to shape your SEO strategy." },
      { title: "White Hat Only", description: "Ethical SEO practices that protect your site from penalties." },
      { title: "Transparent Reporting", description: "Clear, simplified reports that show real growth metrics." },
      { title: "Content Specialists", description: "Our team creates content that both Google and users love." }
    ],
    process: [
      { title: "Audit", description: "Finding technical issues that hold your site back." },
      { title: "Strategy", description: "Identifying high-value keywords and content gaps." },
      { title: "Optimization", description: "Implementing changes for maximum visibility." },
      { title: "Reporting", description: "Measuring progress and refining the approach." }
    ],
    faqs: [
      { q: "How long until I see SEO results?", a: "Noticeable improvements in 3-6 months, significant results within 6-12 months." },
      { q: "What makes your SEO different?", a: "We combine technical expertise with data-driven growth strategies for startups." },
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
          "Paid Ad Management",
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
          "Advanced Ad Management",
          "Influencer Outreach",
          "Weekly Strategy & Reports",
        ],
        cta: "Go Premium",
      },
    ],
    whyChooseUs: [
      { title: "Engagement focus", description: "We don't just post; we build active communities around your brand." },
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
      { q: "Can you create our brand voice?", a: "Absolutely! We'll develop an authentic voice that resonates with your audience." },
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
    whyChooseUs: [
      { title: "Immediate Impact", description: "Start getting traffic and leads within hours of launch." },
      { title: "Strict ROI focus", description: "Constant monitoring to ensure your ad spend yields profit." },
      { title: "Laser Targeting", description: "Reaching the exact people searching for your solution." },
      { title: "Creative A/B Testing", description: "We constantly test copy and visuals to optimize CPAs." }
    ],
    process: [
      { title: "KW Research", description: "Identifying high-intent search terms for your business." },
      { title: "Campaign Launch", description: "Setting up structured, high-performing ad sets." },
      { title: "Daily Monitoring", description: "Real-time adjustments to bids and budgets." },
      { title: "Scaling", description: "Incrementally increasing spend on winning campaigns." }
    ],
    faqs: [
      { q: "How much is the management fee?", a: "Management fees are separate from your ad spend, which you control." },
      { q: "What's a good budget to start?", a: "We recommend starting with at least $1,000/mo in spend for meaningful data." },
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
        price: "$499",
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
        price: "$899",
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
      { q: "Can you write in our voice?", a: "Yes, we create style guides to ensure perfect brand alignment." },
      { q: "How long are the articles?", a: "Typically 1,500-2,500 words for maximum SEO impact." },
      { q: "Do you include graphics?", a: "Yes, social graphics are included; infographics in higher tiers." },
      { q: "Can we request revisions?", a: "Absolutely. We include multiple revision rounds in every plan." }
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
        price: "$799",
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
      { title: "Clarity over Noise", description: "We highlight the metrics that actually drive growth." },
      { title: "GTM Experts", description: "Complex tracking implementations made reliable and fast." },
      { title: "Actionable Insights", description: "We don't just give data; we tell you what to do with it." }
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
      { q: "Can you track calls?", a: "Yes, we can implement full call and lead tracking systems." }
    ],
    techStack: [
      { name: "GA4", icon: "BarChart", color: "text-yellow-500" },
      { name: "GTM", icon: "Layers", color: "text-blue-500" },
      { name: "Clarity", icon: "Layout", color: "text-blue-400" },
      { name: "Looker", icon: "Zap", color: "text-blue-600" }
    ]
  },
];