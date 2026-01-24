import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Text } from "../atoms";

interface ICategorySidebarItemProps {
  category: { id: string; title: string; img: string };
  className?: string;
}
const CategorySidebarItem = ({
  category,
  className,
}: ICategorySidebarItemProps) => {
  return (
    <Link
      href={`/?categoryId=${category.id}`}
      className={cn(
        "flex items-center justify-between w-fit py-2.5 ml-10 gap-4",
        className
      )}
    >
      <Image
        src={category.img}
        alt={category.title}
        width={38}
        height={31}
        className="rounded-md"
      />
      <Text className="text-sm font-medium text-textPrimary">
        {category.title}
      </Text>
    </Link>
  );
};

export default CategorySidebarItem;
