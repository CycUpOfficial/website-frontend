"use client";

import { usePathname } from "next/navigation";
import CategoriesList from "./CategoriesList";
import Filters from "./Filters";

interface ISidebarProps {
  className?: string;
}

const Sidebar = ({ className }: ISidebarProps) => {
  const pathname = usePathname();

  const isHomeRoute = pathname === "/";

  return <>{isHomeRoute ? <CategoriesList /> : <Filters />}</>;
};

export default Sidebar;
