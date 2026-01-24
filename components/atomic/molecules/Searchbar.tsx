"use client";
import { cn } from "@/lib/utils";
import { Button, Icon, Input } from "../atoms";
import { ChangeEvent, useState } from "react";
import { SearchSVG } from "@/components/icons";

interface ISearchbarProps {
  isHeader?: boolean;
  className?: string;
  placeholder?: string;
}
const Searchbar = ({ className, isHeader, placeholder }: ISearchbarProps) => {
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div
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
        onClick={() => {}}
        className="py-2 px-4 bg-[#F3F3F3] h-[45px] rounded-r-md"
      >
        <Icon className="relative w-[21px] h-[21px]">
          <SearchSVG width="100%" heigth="100%" />
        </Icon>
      </Button>
    </div>
  );
};

export default Searchbar;
