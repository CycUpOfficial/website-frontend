import type { Metadata } from "next";
import { InfoPageTemplate } from "@/components/atomic/templates";
import { termsConditionsContent } from "@/config/static-pages";

export const metadata: Metadata = {
  title: termsConditionsContent.title,
};

export default function TermsConditionsPage() {
  return <InfoPageTemplate {...termsConditionsContent} />;
}
