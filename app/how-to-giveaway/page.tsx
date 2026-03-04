import type { Metadata } from "next";
import { InfoPageTemplate } from "@/components/atomic/templates";
import { howToGiveawayContent } from "@/config/static-pages";

export const metadata: Metadata = {
  title: howToGiveawayContent.title,
};

export default function HowToGiveawayPage() {
  return <InfoPageTemplate {...howToGiveawayContent} />;
}
