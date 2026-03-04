"use client";
import { cn } from "@/lib/utils";
import { Button, Icon, Input } from "../atoms";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { SearchSVG } from "@/components/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ISearchbarProps {
  isHeader?: boolean;
  className?: string;
  placeholder?: string;
}
const Searchbar = ({ className, isHeader, placeholder }: ISearchbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
  }, [searchParams]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = search.trim();
    const params = new URLSearchParams();

    if (query) {
      params.set("search", query);
    }

    if (pathname === "/search") {
      const itemType = searchParams.get("itemType");
      const condition = searchParams.get("condition");
      const sortBy = searchParams.get("sortBy");
      const sortOrder = searchParams.get("sortOrder");
      const categoryId = searchParams.get("categoryId");
      const city = searchParams.get("city");
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");

      if (itemType) params.set("itemType", itemType);
      if (condition) params.set("condition", condition);
      if (sortBy) params.set("sortBy", sortBy);
      if (sortOrder) params.set("sortOrder", sortOrder);
      if (categoryId) params.set("categoryId", categoryId);
      if (city) params.set("city", city);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
    }

    const queryString = params.toString();
    router.push(queryString ? `/search?${queryString}` : "/search");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        `rounded-md  ${isHeader ? "bg-textSecondary" : "bg-white"} w-[500px] h-[45px] flex items-center`,
        className,
      )}
    >
      <Input
        type="text"
        value={search}
        onChange={handleChange}
        className="h-full rounded-md w-full px-8"
        placeholder={placeholder}
      />
      <Button
        type="submit"
        className="py-2 px-4 bg-[#F3F3F3] h-[45px] rounded-r-md"
      >
        <Icon className="relative w-[21px] h-[21px]">
          <SearchSVG width="100%" heigth="100%" />
        </Icon>
      </Button>
    </form>
  );
};

export default Searchbar;
