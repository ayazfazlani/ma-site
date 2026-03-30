// scripts/list-projects.ts
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

async function listProjects() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected successfully.");

    const projects = await Project.find({}).sort({ order: 1 });
    console.log("Projects in database:");
    projects.forEach((p: any) => {
      console.log(`- ${p.title}: ${p.image}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Listing projects failed:", error);
    process.exit(1);
  }
}

listProjects();
