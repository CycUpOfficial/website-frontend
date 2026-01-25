import { cn } from "@/lib/utils";
import { SampleProduct } from "@/types";
import Image from "next/image";
import { Text } from "../atoms";
import Price from "./Price";
import Location from "./Location";
import Link from "next/link";

interface ISimilarProductProps {
  className?: string;
  product: SampleProduct;
}

const SimilarProduct = ({ product, className }: ISimilarProductProps) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        "flex rounded-[20px] w-[386px] h-[575px] flex-col flex-shrink-0 bg-white shadow-md",
        className,
      )}
    >
      <div className="relative w-[421px] h-[367px] rounded-[20px]">
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          className="rounded-[20px] object-cover"
        />
      </div>
      <div className="flex flex-col p-12 mt-11">
        <Price price={product.price} />
        <Text
          type="h2"
          className="line-clamp-1 font-medium text-base text-textPrimary"
        >
          {product.title}
        </Text>
        {product.description && (
          <Text type="p" className="text-[10px] text-textSecondary font-normal">
            {product.description}
          </Text>
        )}
        <div className="flex flex-wrap gap-1.5 pt-2">
          <Location location={product.location} />
        </div>
      </div>
    </Link>
  );
};

export default SimilarProduct;
