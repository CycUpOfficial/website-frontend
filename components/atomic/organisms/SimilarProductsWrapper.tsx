import { SampleProduct } from "@/types";
import { Text } from "../atoms";
import { SimilarProduct } from "../molecules";

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
            <SimilarProduct key={index} product={prod} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SimilarProductsWrapper;
