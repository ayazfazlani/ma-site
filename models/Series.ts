import mongoose, { Schema, model, models } from "mongoose";

const SeriesSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Series title is required"],
    },
    slug: {
      type: String,
      required: [true, "Series slug is required"],
      unique: true,
    },
    description: String,
    image: String,
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

const Series = models.Series || model("Series", SeriesSchema);
export default Series;
