import type { Metadata } from "next";
import { InfoPageTemplate } from "@/components/atomic/templates";
import { howToSellOrBuyContent } from "@/config/static-pages";

export const metadata: Metadata = {
  title: howToSellOrBuyContent.title,
};

export default function HowToSellOrBuyPage() {
  return <InfoPageTemplate {...howToSellOrBuyContent} />;
}
