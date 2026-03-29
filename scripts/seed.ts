// scripts/seed.ts
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Service from "../models/Service";
import Project from "../models/Project";
import Testimonial from "../models/Testimonial";
import Partner from "../models/Partner";
import Industry from "../models/Industry";
import { servicesData } from "../lib/services";

dotenv.config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected successfully.");

    // clear existing data
    console.log("Cleaning database...");
    await Service.deleteMany({});
    await Project.deleteMany({});
    await Testimonial.deleteMany({});
    await Partner.deleteMany({});
    await Industry.deleteMany({});

    // seed services
    console.log("Seeding services...");
    await Service.insertMany(servicesData.map((s, index) => ({
      ...s,
      features: JSON.stringify(s.features),
      plans: JSON.stringify(s.plans),
      active: true,
      order: index + 1
    })));

    // seed projects
    console.log("Seeding projects...");
    await Project.insertMany([
      {
        title: "AI-Powered ERP Solution",
        slug: "ai-erp",
        category: "Business Software",
        description: "Custom enterprise resource planning system with AI-driven inventory forecasting and real-time analytics.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        active: true,
        order: 1,
        link: "https://ma-softs.com"
      },
      {
        title: "Fintech SaaS Dashboard",
        slug: "fintech-saas",
        category: "Web Application",
        description: "High-performance financial monitoring dashboard for a European startup, built with Next.js and Chart.js.",
        image: "https://images.unsplash.com/photo-1551288049-bbda646261c6?w=800&q=80",
        active: true,
        order: 2,
        link: "https://ma-softs.com"
      }
    ]);

    // seed testimonials
    console.log("Seeding testimonials...");
    await Testimonial.insertMany([
      {
        name: "James Wilson",
        role: "CEO at TechFlow",
        content: "Ayaz delivered a complex ERP system that transformed our operations. His attention to detail and technical expertise is unmatched.",
        rating: 5
      },
      {
        name: "Sarah Chen",
        role: "Founder of BrightScale",
        content: "The custom SaaS dashboard build by MA Softs helped us secure our Series A. Highly recommended for any scaling startup.",
        rating: 5
      }
    ]);

    // seed partners
    console.log("Seeding partners...");
    await Partner.insertMany([
      { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", active: true, order: 1 },
      { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg", active: true, order: 2 },
      { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", active: true, order: 3 }
    ]);

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
