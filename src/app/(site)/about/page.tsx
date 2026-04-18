// app/about/page.tsx
import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About US – MA Softs Heritage",
  description: "Learn about MA Softs mission, our story of pioneering software development in Pakistan, and our core values of delivering results and innovation.",
  alternates: {
    canonical: "https://masofts.com/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
