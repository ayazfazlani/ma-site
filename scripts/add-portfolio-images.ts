// scripts/add-portfolio-images.ts
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Project from "../models/Project";

dotenv.config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env",
  );
}

async function addPortfolioImages() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected successfully.");

    // Add new projects with the uploaded images
    console.log("Adding portfolio projects...");
    await Project.insertMany([
      {
        title: "Jami Trading Platform",
        slug: "jami-trading",
        category: "E-commerce",
        description:
          "A comprehensive trading platform for Jami Trading, featuring inventory management, order processing, and customer analytics.",
        image: "/portfolio/jamitrading.jpg",
        active: true,
        order: 3,
        link: "https://ma-softs.com",
      },
      {
        title: "Plastic Factory ERP System",
        slug: "plastic-factory-erp",
        category: "Manufacturing ERP",
        description:
          "Custom ERP solution for plastic manufacturing operations, including production tracking, quality control, and supply chain management.",
        image: "/portfolio/plastic-factory-erp.png",
        active: true,
        order: 4,
        link: "https://ma-softs.com",
      },
      {
        title: "Property Dealer Pakistan",
        slug: "property-dealer-pk",
        category: "Real Estate Platform",
        description:
          "Digital platform for property dealers in Pakistan, offering property listings, client management, and transaction tracking.",
        image: "/portfolio/property-dealer-pk.png",
        active: true,
        order: 5,
        link: "https://ma-softs.com",
      },
    ]);

    console.log("Portfolio images added successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Adding portfolio images failed:", error);
    process.exit(1);
  }
}

addPortfolioImages();
