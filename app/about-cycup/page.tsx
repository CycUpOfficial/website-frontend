import type { Metadata } from "next";
import { InfoPageTemplate } from "@/components/atomic/templates";
import { aboutCycUpContent } from "@/config/static-pages";

export const metadata: Metadata = {
  title: aboutCycUpContent.title,
};

export default function AboutCycUpPage() {
  return <InfoPageTemplate {...aboutCycUpContent} />;
}
