"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Icon, Input, Text } from "../atoms";
import { ArrowDownSVG } from "@/components/icons";

interface FilterOption {
  label: string;
  value: number;
}

interface PropertyFilterProps {
  title: string;
  paramKey: string;
  options: FilterOption[];
}

export default function PropertyFilter({
  title,
  paramKey,
  options,
}: PropertyFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      const currentValues = params.getAll(paramKey);

      if (currentValues.includes(value)) {
        const newValues = currentValues.filter((v) => v !== value);
        params.delete(paramKey);
        newValues.forEach((v) => params.append(paramKey, v));
      } else {
        params.append(paramKey, value);
      }
      const newUrl = `${pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
      setTimeout(() => {});
    },
    [paramKey, router, searchParams],
  );

  return (
    <div className="bg-white px-[20px] py-[22px]">
      <div className="flex items-center justify-between pb-2">
        <Text type="span">{title}</Text>
        <span
          className={`${isOpen && "rotate-180"} 300ms cursor-pointer items-center self-center transition-all`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon className="w-[14px] h-[8px]">
            <ArrowDownSVG width="100%" heigth="100%" />
          </Icon>
        </span>
      </div>
      <div
        className={`300ms max-h-[100px] overflow-scroll transition-all ${isOpen ? "block opacity-100" : "hidden opacity-0"}`}
      >
        <div className="flex flex-col space-y-1">
          {options.map((opt) => {
            const checked = searchParams
              .getAll(paramKey)
              .includes(String(opt.value));
            return (
              <label key={opt.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleChange(String(opt.value))}
                />
                {opt.label}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
