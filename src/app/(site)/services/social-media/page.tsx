// app/services/social-media/page.tsx
import { Metadata } from "next";
import SocialMediaClient from "./SocialMediaClient";

export const metadata: Metadata = {
  title: "Social Media Marketing & Management Services – Build Community",
  description: "Grow your brand presence across all social platforms. MA Softs provides strategic social media management, creative content creation, and targeted community engagement.",
  alternates: {
    canonical: "https://www.masofts.com/services/social-media",
  },
};

export default function SocialMediaPage() {
  return <SocialMediaClient />;
}
