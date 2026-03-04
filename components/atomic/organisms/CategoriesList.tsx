import { cn } from "@/lib/utils";
import { CategorySidebarItem } from "../molecules";

interface ICategoriesListProps {
  className?: string;
}

const CategoriesList = ({ className }: ICategoriesListProps) => {
  return (
    <ul
      className={cn(
        "bg-primary-1 rounded-[20px] py-10 w-fit h-fit flex-shrink-0 min-w-[320px]",
        className,
      )}
    >
      {/* {categories.map((category, index) => (
        <li
          key={index}
          className="border-b border-1 border-textSecondary border-opacity-35 last-of-type:border-none"
        >
          <CategorySidebarItem category={category} />
        </li>
      ))} */}
    </ul>
  );
};

export default CategoriesList;
