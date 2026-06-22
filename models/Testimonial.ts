import mongoose, { Schema, model, models } from "mongoose";

const TestimonialSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    role: String,
    company: String,
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    rating: {
      type: Number,
      default: 5,
    },
    image: String,
    active: {
      type: Boolean,
      default: true,
    },
    showInHero: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // Only createdAt in Prisma
  }
);

const Testimonial = models.Testimonial || model("Testimonial", TestimonialSchema);
export default Testimonial;
