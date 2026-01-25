import { SingleProductTemplate } from "@/components/atomic/templates";
import { sampleProducts } from "@/config/constants";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const product = sampleProducts.find((product) => product.slug === slug);
  const similarProducts = sampleProducts.filter(
    (prod) => prod.id !== product!.id,
  );
  return (
    <SingleProductTemplate
      product={product!}
      similarProducts={similarProducts}
    />
  );
}
