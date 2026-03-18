// src/lib/services.ts
import {
  Search,
  Share2,
  FileText,
  Globe,
  Target,
  BarChart3,
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
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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
    slug: "seo",
    icon: Search,
    title: "SEO Optimization",
    description:
      "Dominate search rankings with our comprehensive SEO services. We optimize your website technically and content-wise to attract qualified organic traffic.",
    features: [
      "Technical SEO Audit",
      "Keyword Research & Strategy",
      "On-Page Optimization",
      "Link Building",
      "Local SEO",
      "SEO Reporting & Analytics",
    ],
    gradient: "from-primary-500 to-primary-400",
    glow: "group-hover:shadow-primary-500/20",
    number: "01",
    color: "from-blue-500 to-blue-600",
    price: "Starting from $999/month",
    longDescription:
      "Our SEO services are designed to improve your website's visibility in search engine results. We use proven strategies and the latest SEO techniques to increase organic traffic and help your business grow online.",
    plans: [
      {
        name: "Starter",
        price: "$999",
        billingCycle: "/month",
        description: "Perfect for small businesses just starting their SEO journey",
        features: [
          "Technical SEO Audit",
          "Up to 20 target keywords",
          "On-Page Optimization",
          "Monthly Reporting",
          "Competitor Analysis",
        ],
        cta: "Get Started",
      },
      {
        name: "Professional",
        price: "$1,999",
        billingCycle: "/month",
        description: "Comprehensive SEO for growing businesses",
        features: [
          "Everything in Starter +",
          "Up to 50 target keywords",
          "Link Building Strategy",
          "Local SEO Optimization",
          "Weekly Performance Reports",
          "Content Optimization",
        ],
        cta: "Get Started",
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "$4,999",
        billingCycle: "/month",
        description: "Advanced SEO strategy for large-scale growth",
        features: [
          "Everything in Professional +",
          "Unlimited target keywords",
          "Advanced Link Building",
          "Dedicated SEO Specialist",
          "Daily Performance Monitoring",
          "Custom Strategy Development",
          "24/7 Support",
        ],
        cta: "Contact Us",
      },
    ],
  },
  {
    slug: "social-media",
    icon: Share2,
    title: "Social Media Marketing",
    description:
      "Build brand awareness and engage your audience across all major social platforms with compelling content strategies and community management.",
    features: [
      "Social Media Strategy",
      "Content Creation & Curation",
      "Community Management",
      "Paid Social Advertising",
      "Influencer Marketing",
      "Social Media Analytics",
    ],
    gradient: "from-purple-500 to-pink-400",
    glow: "group-hover:shadow-purple-500/20",
    number: "02",
    color: "from-pink-500 to-rose-600",
    price: "Starting from $799/month",
    longDescription:
      "Engage your audience and build brand loyalty with our strategic social media marketing. We create compelling content and manage your presence across all major platforms.",
    plans: [
      {
        name: "Growth",
        price: "$799",
        billingCycle: "/month",
        description: "Establish your social media presence",
        features: [
          "Management of 2-3 platforms",
          "12 posts per month",
          "Community Management",
          "Monthly Analytics Report",
          "Social Media Strategy",
        ],
        cta: "Get Started",
      },
      {
        name: "Accelerate",
        price: "$1,499",
        billingCycle: "/month",
        description: "Amplify your brand across all platforms",
        features: [
          "Management of 4-5 platforms",
          "24 posts per month",
          "Content Creation (graphics & videos)",
          "Paid Social Advertising",
          "Weekly Analytics Reports",
          "Engagement Optimization",
        ],
        cta: "Get Started",
        highlighted: true,
      },
      {
        name: "Influencer",
        price: "$2,999",
        billingCycle: "/month",
        description: "Full-service social media with influencer partnerships",
        features: [
          "Everything in Accelerate +",
          "All major platforms",
          "40+ posts per month",
          "Influencer Outreach & Management",
          "Advanced Ad Strategies",
          "Dedicated Account Manager",
          "Community Building Focus",
        ],
        cta: "Contact Us",
      },
    ],
  },
  {
    slug: "content",
    icon: FileText,
    title: "Content Marketing",
    description:
      "Create valuable, relevant content that attracts and retains your target audience while establishing thought leadership in your industry.",
    features: [
      "Content Strategy",
      "Blog Writing",
      "Video Content",
      "Infographics",
      "Email Marketing",
      "Content Distribution",
    ],
    gradient: "from-amber-500 to-orange-400",
    glow: "group-hover:shadow-amber-500/20",
    number: "03",
    color: "from-amber-500 to-orange-600",
    price: "Starting from $599/month",
    longDescription:
      "Content is king in digital marketing. Our team creates high-quality, SEO-optimized content that resonates with your audience and drives results.",
    plans: [
      {
        name: "Essential",
        price: "$599",
        billingCycle: "/month",
        description: "Consistent content creation for your brand",
        features: [
          "4 blog articles per month",
          "Content Calendar Planning",
          "SEO Optimization",
          "Monthly Performance Analysis",
          "Keyword Research",
        ],
        cta: "Get Started",
      },
      {
        name: "Premium",
        price: "$1,299",
        billingCycle: "/month",
        description: "Comprehensive content strategy and creation",
        features: [
          "8 blog articles per month",
          "2 video scripts/storyboards",
          "Infographic design (2/month)",
          "Email marketing campaigns",
          "Content distribution strategy",
          "Weekly Reports",
        ],
        cta: "Get Started",
        highlighted: true,
      },
      {
        name: "Elite",
        price: "$2,499",
        billingCycle: "/month",
        description: "Full content ecosystem and thought leadership",
        features: [
          "Everything in Premium +",
          "12 blog articles per month",
          "4 video productions",
          "4 infographics",
          "Podcast planning & launch",
          "Media outreach & publishing",
          "Dedicated Content Strategist",
        ],
        cta: "Contact Us",
      },
    ],
  },
  {
    slug: "web-development",
    icon: Globe,
    title: "Web Design & Development",
    description:
      "Stunning, responsive websites that convert visitors into customers. Built with the latest technologies for optimal performance and user experience.",
    features: [
      "Custom Web Design",
      "Responsive Development",
      "E-commerce Solutions",
      "CMS Integration",
      "Website Maintenance",
      "Performance Optimization",
    ],
    gradient: "from-emerald-500 to-teal-400",
    glow: "group-hover:shadow-emerald-500/20",
    number: "04",
    color: "from-purple-500 to-indigo-600",
    price: "Starting from $2,499/project",
    longDescription:
      "Your website is your digital storefront. We build fast, beautiful, and conversion-optimized websites that represent your brand.",
    plans: [
      {
        name: "Starter Website",
        price: "$2,499",
        billingCycle: "one-time",
        description: "Perfect for small businesses and startups",
        features: [
          "Up to 5 pages",
          "Mobile-responsive design",
          "Contact form & basic features",
          "SEO optimized",
          "SSL certificate",
          "1 month of free support",
        ],
        cta: "Get Started",
      },
      {
        name: "Professional Site",
        price: "$5,999",
        billingCycle: "one-time",
        description: "Comprehensive website for established businesses",
        features: [
          "Up to 15 pages",
          "Custom design & animations",
          "CMS integration (WordPress/Webflow)",
          "Blog section with SEO tools",
          "Advanced analytics tracking",
          "3 months of free support",
          "Monthly maintenance plan",
        ],
        cta: "Get Started",
        highlighted: true,
      },
      {
        name: "E-commerce Platform",
        price: "$9,999",
        billingCycle: "one-time",
        description: "Full e-commerce solution with payment integration",
        features: [
          "Unlimited pages & products",
          "Payment gateway integration",
          "Inventory management",
          "Customer account system",
          "Advanced analytics & reporting",
          "Dedicated developer support",
          "6 months of free support",
          "Ongoing optimization",
        ],
        cta: "Contact Us",
      },
    ],
  },
  {
    slug: "ppc",
    icon: Target,
    title: "PPC Advertising",
    description:
      "Maximize ROI with targeted pay-per-click campaigns on Google Ads, Facebook, Instagram, and other platforms.",
    features: [
      "Campaign Strategy",
      "Ad Copywriting",
      "Landing Page Design",
      "A/B Testing",
      "Remarketing",
      "Performance Tracking",
    ],
    gradient: "from-rose-500 to-pink-400",
    glow: "group-hover:shadow-rose-500/20",
    number: "05",
    color: "from-green-500 to-emerald-600",
    price: "Starting from $1,299/month",
    longDescription:
      "Drive immediate results with our PPC advertising services. We optimize every campaign to maximize ROI and minimize cost per acquisition.",
    plans: [
      {
        name: "Launch",
        price: "$1,299",
        billingCycle: "/month",
        description: "Perfect for starting with PPC advertising",
        features: [
          "Single platform campaigns (Google or Facebook)",
          "Up to 5 ad groups",
          "Campaign setup & optimization",
          "Keyword research & selection",
          "Weekly performance updates",
          "Ad copy optimization",
        ],
        cta: "Get Started",
      },
      {
        name: "Scale",
        price: "$2,499",
        billingCycle: "/month",
        description: "Multi-platform campaigns for growth",
        features: [
          "Google Ads & Facebook/Instagram",
          "Up to 10 ad groups per platform",
          "Landing page design & optimization",
          "A/B testing strategy",
          "Daily campaign monitoring",
          "Conversion tracking setup",
          "Bi-weekly strategy reviews",
        ],
        cta: "Get Started",
        highlighted: true,
      },
      {
        name: "Maximum ROI",
        price: "$4,999",
        billingCycle: "/month",
        description: "Enterprise-level PPC management",
        features: [
          "Everything in Scale +",
          "All major platforms managed",
          "Unlimited ad groups",
          "Remarketing & retargeting strategies",
          "Advanced audience segmentation",
          "Custom reporting dashboard",
          "Dedicated PPC Specialist",
          "Monthly strategy sessions",
        ],
        cta: "Contact Us",
      },
    ],
  },
  {
    slug: "analytics",
    icon: BarChart3,
    title: "Analytics & Reporting",
    description:
      "Data-driven insights and comprehensive reporting to track performance and optimize your marketing efforts for better results.",
    features: [
      "Google Analytics Setup",
      "Custom Dashboards",
      "Conversion Tracking",
      "User Behavior Analysis",
      "Monthly Reports",
      "Data Consulting",
    ],
    gradient: "from-accent-500 to-primary-400",
    glow: "group-hover:shadow-accent-500/20",
    number: "06",
    color: "from-cyan-500 to-blue-600",
    price: "Starting from $499/month",
    longDescription:
      "Make informed decisions with actionable data. We set up comprehensive tracking and provide insightful reports to guide your strategy.",
    plans: [
      {
        name: "Basic Insights",
        price: "$499",
        billingCycle: "/month",
        description: "Essential analytics for any business",
        features: [
          "Google Analytics 4 setup",
          "Monthly performance report",
          "Traffic analysis",
          "Basic conversion tracking",
          "Email reporting",
          "1 custom dashboard",
        ],
        cta: "Get Started",
      },
      {
        name: "Advanced Analysis",
        price: "$999",
        billingCycle: "/month",
        description: "Detailed insights and optimization recommendations",
        features: [
          "Everything in Basic +",
          "Full conversion funnel analysis",
          "User behavior analysis",
          "3 custom dashboards",
          "Weekly performance updates",
          "A/B test tracking",
          "Marketing source attribution",
        ],
        cta: "Get Started",
        highlighted: true,
      },
      {
        name: "Enterprise Intelligence",
        price: "$1,999",
        billingCycle: "/month",
        description: "Complete data strategy and predictive insights",
        features: [
          "Everything in Advanced +",
          "Predictive analytics",
          "Custom event tracking",
          "Cross-platform analytics",
          "Real-time dashboard access",
          "Data consulting & strategy",
          "Dedicated analytics specialist",
          "Quarterly business reviews",
        ],
        cta: "Contact Us",
      },
    ],
  },
];
