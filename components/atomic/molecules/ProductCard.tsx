import { cn } from "@/lib/utils";
import { Image, Text } from "../atoms";
import Location from "./Location";
import Price from "./Price";
import Link from "next/link";

export interface ProductCardProps {
  id: string;
  title: string;
  description?: string;
  image: string;
  price: number;
  location: string;
  className?: string;
  slug: string;
}

const ProductCard = ({
  title,
  description,
  image,
  price,
  location,
  slug,
  className,
}: ProductCardProps) => {
  return (
    <Link
      href={`/product/${slug}`}
      className={cn(
        "break-inside-avoid mb-4 overflow-hidden rounded-lg bg-transparent transition-shadow cursor-pointer hover:shadow-md ",
        className,
      )}
    >
      <Image src={image} alt={title} />
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
