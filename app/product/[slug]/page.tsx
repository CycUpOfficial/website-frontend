import { SingleProductTemplate } from "@/components/atomic/templates";
import { getItemById, getItemDetailById } from "@/services";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const itemId = slug;
  // if (!Number.isInteger(itemId) || itemId <= 0) {
  //   notFound();
  // }

  const itemResponse = await getItemDetailById(itemId);
  console.log("🚀 ~ ProductPage ~ itemResponse:", itemResponse.data);
  if (!itemResponse.success || !itemResponse.data) {
    notFound();
  }

  const product = itemResponse.data;
  // const similarProducts = sampleProducts.filter(
  //   (prod) => prod.id !== product!.id,
  // );
  return (
    <SingleProductTemplate
      product={product}
      // similarProducts={similarProducts}
    />
  );
}
