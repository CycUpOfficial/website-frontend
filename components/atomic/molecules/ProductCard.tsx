import { cn } from "@/lib/utils";
import { Image, Text } from "../atoms";
import Location from "./Location";
import Price from "./Price";
import Link from "next/link";
import { IProductImages } from "@/types";

export interface ProductCardProps {
  id: string;
  title: string;
  description?: string;
  images: IProductImages[];
  price: number;
  location: string;
  className?: string;
  slug: string;
}

const ProductCard = ({
  title,
  description,
  images,
  price,
  location,
  slug,
  className,
}: ProductCardProps) => {
  return (
    <Link
      href={`/product/${slug}`}
      className={cn(
        "break-inside-avoid mb-4 flex-shrink-0 inline-block overflow-hidden rounded-lg bg-transparent transition-shadow cursor-pointer hover:shadow-md ",
        className,
      )}
    >
      <Image src={images[0].src} alt={title} />
      <div className="p-4 space-y-2">
        <Price price={price} />
        <Text
          type="h2"
          className="line-clamp-1 font-medium text-base text-textPrimary"
        >
          {title}
        </Text>
        {description && (
          <Text type="p" className="text-[10px] text-textSecondary font-normal">
            {description}
          </Text>
        )}
        <div className="flex flex-wrap gap-1.5 pt-2">
          <Location location={location} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
