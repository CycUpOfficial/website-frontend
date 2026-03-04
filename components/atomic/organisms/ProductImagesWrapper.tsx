import { toSafeImageSrc } from "@/lib/image";
import { IProductImages } from "@/types";
import Image from "next/image";

interface IProductImagesWrapperProps {
  imgs: {
    url: string;
    isMain: boolean;
  }[];
}

const ProductImagesWrapper = ({ imgs }: IProductImagesWrapperProps) => {
  console.log("🚀 ~ ProductImagesWrapper ~ imgs:", imgs);
  return (
    <div className="flex flex-col bg-primary-1 rounded-[10px] gap-10">
      <div className="relative w-[770px] aspect-[770/528]">
        <Image
          src={toSafeImageSrc(imgs[0].url)}
          alt="Product main Image"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
        />
      </div>
      {imgs.length > 1 && (
        <div className="flex items-center gap-4 justify-start overflow-hidden">
          {imgs.slice(1, 4).map((img, index) => (
            <div
              key={index}
              className="relative h-[140px] w-[140px] rounded-[10px]"
            >
              <Image
                fill
                alt={img.url}
                src={toSafeImageSrc(img.url)}
                unoptimized={true}
                decoding="async"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImagesWrapper;
