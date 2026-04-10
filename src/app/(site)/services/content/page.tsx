// app/services/content/page.tsx
import { Metadata } from "next";
import ContentClient from "./ContentClient";

export const metadata: Metadata = {
  title: "Content Marketing & Strategy Services – Authority Building",
  description: "Drive traffic and build authority with MA Softs' content marketing services. We create data-driven content strategies, high-quality blog posts, and technical case studies.",
  alternates: {
    canonical: "https://www.masofts.com/services/content",
  },
};

export default function ContentPage() {
  return <ContentClient />;
}
