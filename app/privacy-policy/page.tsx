import type { Metadata } from "next";
import { InfoPageTemplate } from "@/components/atomic/templates";
import { privacyPolicyContent } from "@/config/static-pages";

export const metadata: Metadata = {
  title: privacyPolicyContent.title,
};

export default function PrivacyPolicyPage() {
  return <InfoPageTemplate {...privacyPolicyContent} />;
}
