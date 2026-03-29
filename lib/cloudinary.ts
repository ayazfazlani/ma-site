// src/lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

export interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  resource_type: string;
}

export const uploadToCloudinary = async (
  file: string, // Base64 or URL
  folder: string = "ma-site"
): Promise<CloudinaryResponse> => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: `ma-site/${folder}`,
      resource_type: "auto",
      transformation: [
        { width: 1200, crop: "limit" }, // Basic optimization
        { quality: "auto" },
        { fetch_format: "auto" }
      ]
    });
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
