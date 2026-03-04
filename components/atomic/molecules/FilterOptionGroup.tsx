"use client";

import { cn } from "@/lib/utils";

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterOptionGroupProps {
  options: FilterOption[];
  activeValue: string;
  onSelect: (value: string) => void;
  className?: string;
}

const FilterOptionGroup = ({
  options,
  activeValue,
  onSelect,
  className,
}: FilterOptionGroupProps) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {options.map((option) => {
        const selected = option.value === activeValue;

        return (
          <button
            key={option.value || option.label}
            type="button"
            onClick={() => onSelect(option.value)}
            className={cn(
              "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm",
              selected
                ? "bg-primary/10 text-primary"
                : "text-textPrimary hover:bg-primary/5",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterOptionGroup;
