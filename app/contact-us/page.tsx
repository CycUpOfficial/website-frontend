import type { Metadata } from "next";
import { InfoPageTemplate } from "@/components/atomic/templates";
import { contactUsContent } from "@/config/static-pages";

export const metadata: Metadata = {
  title: contactUsContent.title,
};

export default function ContactUsPage() {
  return <InfoPageTemplate {...contactUsContent} />;
}
