import { ItemDetail } from "@/types";
import { Text } from "../atoms";
import OwnerInfoCard from "./OwnerInfoCard";
import SafetyTips from "./SafetyTips";
import { Price, ProductDescription } from "../molecules";
import ProductImagesWrapper from "./ProductImagesWrapper";

interface IProductProps {
  product: ItemDetail;
}
const Product = ({ product }: IProductProps) => {
  console.log("🚀 ~ Product ~ product:", product);
  return (
    <section className="flex flex-col gap-8 mt-[80px]">
      <div className="flex gap-[70px] w-full justify-between items-stretch">
        <ProductImagesWrapper imgs={product.photos} />
        <div className="flex flex-col gap-6 max-w-[432px] justify-between">
          <div className="bg-white shadow-md rounded-[10px] py-9 px-[100px] flex items-center justify-center flex-col gap-2">
            <Price
              price={+product.lendingPrice || +product.sellingPrice}
              className="text-black text-[34px]"
            />

            <Text
              type="h1"
              className="text-primary font-semibold text-3xl whitespace-nowrap"
            >
              {product.title}
            </Text>
            {/* <Text type="h2">{product.subtitle}</Text> */}
          </div>
          <OwnerInfoCard owner={product.owner} itemId={product.id} />
          <SafetyTips />
        </div>
      </div>
      <ProductDescription description={product.description} />
    </section>
  );
};

export default Product;
