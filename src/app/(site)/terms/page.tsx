import { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service – MA Softs",
  description:
    "Read the terms and conditions that govern your use of the MA Softs website and software development services.",
  alternates: {
    canonical: "https://masofts.com/terms",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
