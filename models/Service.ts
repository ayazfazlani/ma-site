import mongoose, { Schema, model, models } from "mongoose";

const ServiceSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
    },
    slug: {
      type: String,
      required: [true, "Service slug is required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
    },
    longDescription: String,
    icon: String,
    image: String,
    price: String,
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    features: String, // Stored as JSON string as in Prisma schema
    plans: String,    // Stored as JSON string as in Prisma schema
  },
  {
    timestamps: true,
  }
);

const Service = models.Service || model("Service", ServiceSchema);
export default Service;
