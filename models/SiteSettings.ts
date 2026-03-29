import mongoose, { Schema, model, models } from "mongoose";

const SiteSettingsSchema = new Schema(
  {
    _id: {
      type: String,
      default: "settings",
    },
    siteName: {
      type: String,
      default: "MA Softs",
    },
    logo: String,
    email: String,
    phone: String,
    address: String,
    facebook: String,
    twitter: String,
    linkedin: String,
    instagram: String,
    github: String,
    metaTitle: String,
    metaDescription: String,
    
    // SMTP Settings
    smtpHost: String,
    smtpPort: Number,
    smtpUser: String,
    smtpPass: String,
    
    // Cloudinary Settings
    cloudinaryCloudName: String,
    cloudinaryApiKey: String,
    cloudinaryApiSecret: String,
  },
  {
    timestamps: { createdAt: false, updatedAt: true },
  }
);

const SiteSettings = models.SiteSettings || model("SiteSettings", SiteSettingsSchema);
export default SiteSettings;
