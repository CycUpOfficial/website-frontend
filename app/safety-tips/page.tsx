import type { Metadata } from "next";
import { InfoPageTemplate } from "@/components/atomic/templates";
import { safetyTipsContent } from "@/config/static-pages";

export const metadata: Metadata = {
  title: safetyTipsContent.title,
};

export default function SafetyTipsPage() {
  return <InfoPageTemplate {...safetyTipsContent} />;
}
