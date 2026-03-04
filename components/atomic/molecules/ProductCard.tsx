import { cn } from "@/lib/utils";
import { Image, Text } from "../atoms";
import Location from "./Location";
import Price from "./Price";
import Link from "next/link";
import { IProductImages } from "@/types";
import NextImage from "next/image";
import { toSafeImageSrc } from "@/lib/image";

export interface ProductCardProps {
  id: string;
  title: string;
  description?: string;
  images: IProductImages[];
  price: number;
  location: string;
  className?: string;
  slug: string;
  variant?: "grid" | "similar";
}

const ProductCard = ({
  title,
  description,
  images,
  price,
  location,
  slug,
  className,
  variant = "grid",
}: ProductCardProps) => {
  if (variant === "similar") {
    return (
      <Link
        href={`/product/${slug}`}
        className={cn(
          "flex rounded-[20px] w-[386px] h-[575px] flex-col flex-shrink-0 bg-white shadow-md",
          className,
        )}
      >
        <div className="relative w-[421px] h-[367px] rounded-[20px]">
          <NextImage
            src={toSafeImageSrc(images[0].src)}
            alt={images[0].alt}
            fill
            className="rounded-[20px] object-cover"
          />
        </div>
        <div className="flex flex-col p-12 mt-11">
          <Price price={price} />
          <Text
            type="h2"
            className="line-clamp-1 font-medium text-base text-textPrimary"
          >
            {title}
          </Text>
          {description && (
            <Text
              type="p"
              className="text-[10px] text-textSecondary font-normal"
            >
              {description}
            </Text>
          )}
          <div className="flex flex-wrap gap-1.5 pt-2">
            <Location location={location} />
          </div>
        </div>
      </Link>
    );
  }

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
