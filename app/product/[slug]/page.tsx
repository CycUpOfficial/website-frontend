import { SingleProductTemplate } from "@/components/atomic/templates";
import { getItemDetailById } from "@/services";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const itemId = slug;

  const itemResponse = await getItemDetailById(itemId);
  if (!itemResponse.success || !itemResponse.data) {
    notFound();
  }

  const product = itemResponse.data;
  const similarProducts = product.relatedItems!;
  return (
    <SingleProductTemplate
      product={product}
      similarProducts={similarProducts}
    />
  );
}
