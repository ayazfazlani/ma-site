import mongoose, { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
    },
    slug: {
      type: String,
      required: [true, "Project slug is required"],
      unique: true,
    },
    category: String,
    description: String,
    content: String,
    image: String, // primary / cover image
    images: {
      type: [String],
      default: [],
    },
    link: String,
    color: String,
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = models.Project || model("Project", ProjectSchema);
export default Project;
