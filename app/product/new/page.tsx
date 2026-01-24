import { HomePageTemplate } from "@/components/atomic/templates";
import { sampleProducts } from "@/config/constants";

export default function Home() {
  return (
    <HomePageTemplate
      title="Marketplace Gallery"
      description="Discover unique artwork from talented vendors around the world"
      products={sampleProducts}
      columns={4}
      gap="md"
    />
  );
}
