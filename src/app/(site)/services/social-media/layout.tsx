import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Marketing Services – Grow Your Brand from $399/mo",
  description:
    "Build brand awareness and drive sales with social media marketing from $399/month. Content creation, paid ads, community management & analytics across all platforms.",
  alternates: {
    canonical: "/services/social-media",
  },
  openGraph: {
    title: "Social Media Marketing – MA Softs",
    description:
      "Professional social media management across all platforms. Content, paid ads & community management from $399/month.",
    url: "https://www.masofts.com/services/social-media",
    type: "website",
  },
};

export default function SocialMediaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
