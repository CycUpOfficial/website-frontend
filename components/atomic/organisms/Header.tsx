"use client";

import { cn } from "@/lib/utils";
import { Logo, Searchbar } from "../molecules";
import { ProfileSVG } from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IHeaderProps {
  classname?: string;
}

const Header = ({ classname }: IHeaderProps) => {
  const pathname = usePathname();

  const isHomeRoute = pathname === "/";

  return (
    <header
      className={cn(
        "w-full fixed flex justify-between items-center py-4 px-20 bg-primary shadow-[#00000026] shadow-md z-50",
        classname,
      )}
    >
      <Logo />
      {!isHomeRoute && <Searchbar placeholder="What are you looking for?" />}

      <div className="flex items-center justify-between gap-10">
        <ProfileSVG />
        <Link
          className="bg-secondary px-4 py-2 text-sm font-bold text-white"
          href="/product/new"
        >
          Post Item
        </Link>
      </div>
    </header>
  );
};

export default Header;
