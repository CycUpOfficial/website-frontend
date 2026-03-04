import { relatedItems } from "@/types";
import { Text } from "../atoms";
import { ProductCard } from "../molecules";

interface ISimilarProductsWrapperProps {
  products: relatedItems[];
}

const SimilarProductsWrapper = ({ products }: ISimilarProductsWrapperProps) => {
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
              images={[{ alt: prod.mainImage, src: prod.mainImage }]}
              price={+prod.lendingPrice || +prod.sellingPrice}
              location={prod.location}
              slug={prod.id}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SimilarProductsWrapper;
