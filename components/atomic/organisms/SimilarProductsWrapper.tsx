import { SampleProduct } from "@/types";
import { Text } from "../atoms";
import { ProductCard } from "../molecules";

interface ISimilarProductsWrapperProps {
  products: SampleProduct[];
}

const SimilarProductsWrapper = ({ products }: ISimilarProductsWrapperProps) => {
  console.log("🚀 ~ SimilarProductsWrapper ~ products:", products);
  return (
    <section>
      <Text type="h2" className="text-textPrimary font-normal text-[32px]">
        Other Similar Items
      </Text>
      {products.length > 0 && (
        <div className="overflow-auto w-full flex-nowrap flex gap-10 justify-between py-5">
          {products.map((prod, index) => (
            <ProductCard
              key={prod.id ?? index}
              variant="similar"
              id={prod.id}
              title={prod.title}
              description={prod.description}
              images={prod.images}
              price={prod.price}
              location={prod.location}
              slug={prod.slug}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SimilarProductsWrapper;
