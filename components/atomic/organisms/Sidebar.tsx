import { ItemCategory, ItemCity } from "@/types";
import Filters from "./Filters";

interface ISidebarProps {
  className?: string;
  categories?: ItemCategory[];
  cities?: ItemCity[];
}

const Sidebar = ({
  className,
  categories = [],
  cities = [],
}: ISidebarProps) => {
  return (
    <Filters className={className} categories={categories} cities={cities} />
  );
};

export default Sidebar;
