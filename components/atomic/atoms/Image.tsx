import { cn } from "@/lib/utils";
import { toSafeImageSrc } from "@/lib/image";

export interface ImageProps {
  src: string;
  alt: string;
  aspectRatio?: "square" | "video" | "auto";
  className?: string;
}

const Image = ({ src, alt, aspectRatio = "auto", className }: ImageProps) => {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "",
  };

  return (
    <div
      className={cn(
        "relative w-full overflow ",
        aspectClasses[aspectRatio],
        className,
      )}
    >
      <img
        src={toSafeImageSrc(src)}
        alt={alt}
        className="h-auto w-full object-cover rounded-[20px]"
      />
    </div>
  );
};

export default Image;
