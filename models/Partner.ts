import mongoose, { Schema, model, models } from "mongoose";

const PartnerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Partner name is required"],
    },
    logo: String,
    active: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Partner = models.Partner || model("Partner", PartnerSchema);
export default Partner;
