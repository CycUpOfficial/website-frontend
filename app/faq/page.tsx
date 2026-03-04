import type { Metadata } from "next";
import { InfoPageTemplate } from "@/components/atomic/templates";
import { faqContent } from "@/config/static-pages";

export const metadata: Metadata = {
  title: faqContent.title,
};

export default function FaqPage() {
  return <InfoPageTemplate {...faqContent} />;
}
