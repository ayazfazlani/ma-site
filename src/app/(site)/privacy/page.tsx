import { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy – MA Softs",
  description:
    "Learn how MA Softs collects, uses, and protects your personal information when you use our website and services.",
  alternates: {
    canonical: "https://masofts.com/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
