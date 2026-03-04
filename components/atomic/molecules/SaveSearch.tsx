"use client";

import { BookmarkSVG } from "@/components/icons";
import { Button, Icon } from "../atoms";

interface SaveSearchProps {
  onClick?: () => void;
}

const SaveSearch = ({ onClick }: SaveSearchProps) => {
  return (
    <Button
      onClick={onClick}
      className="cursor-pointer bg-white flex gap-1 rounded-[10px] items-center text-textPrimary font-medium text-xl px-5 h-[45px]"
    >
      <Icon className="w-[12px] h-[16px]">
        <BookmarkSVG width="100%" heigth="100%" />
      </Icon>
      Save Search
    </Button>
  );
};

export default SaveSearch;
