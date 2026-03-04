import { ItemCategory, ItemCity, ItemProps } from "@/types";
import Filters from "./Filters";

interface ISidebarProps {
  className?: string;
  categories?: ItemCategory[];
  cities?: ItemCity[];
  itemProps?: ItemProps;
}

const Sidebar = ({
  className,
  categories = [],
  cities = [],
  itemProps,
}: ISidebarProps) => {
  return (
    <Filters
      className={className}
      categories={categories}
      cities={cities}
      itemProps={itemProps}
    />
  );
};

export default Sidebar;
