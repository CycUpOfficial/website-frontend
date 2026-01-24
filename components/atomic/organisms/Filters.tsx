"use client";

import { BurgerSvg } from "@/components/icons";
import { Icon, Text } from "../atoms";

const Filters = () => {
  return (
    <div className="bg-white shadow-md rounded-[20px] py-14 px-9 w-fit h-fit flex-shrink-0 min-w-[320px]">
      <div className="flex items-center justify-between gap-2 w-fit">
        <Icon className="w-[25px] h-[15px]">
          <BurgerSvg width="100%" heigth="100%" />
        </Icon>
        <Text type="h3" className="text-xl font-semibold text-primary">
          Filter Products
        </Text>
      </div>
    </div>
  );
};

export default Filters;
