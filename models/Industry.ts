import mongoose, { Schema, model, models } from "mongoose";

const IndustrySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: String,
    icon: String,
    image: String,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Industry = models.Industry || model("Industry", IndustrySchema);
export default Industry;
