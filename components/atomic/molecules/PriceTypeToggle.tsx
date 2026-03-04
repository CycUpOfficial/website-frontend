"use client"; // Needs interactivity for clicking

import { useState } from "react";

import { cn } from "@/lib/utils";

const options = ["giveaway", "selling", "lending"] as const;
export type PriceType = (typeof options)[number];

interface PriceTypeToggleProps {
  value?: PriceType;
  defaultValue?: PriceType;
  onChange?: (value: PriceType) => void;
  name?: string;
  className?: string;
}

const PriceTypeToggle = ({
  value,
  defaultValue = "giveaway",
  onChange,
  name = "priceType",
  className,
}: PriceTypeToggleProps) => {
  const [internalValue, setInternalValue] = useState<PriceType>(defaultValue);
  const selected = value ?? internalValue;

  const handleSelect = (option: PriceType) => {
    if (value === undefined) {
      setInternalValue(option);
    }
    onChange?.(option);
  };

  return (
    <div className={cn("flex gap-2", className)}>
      {/* Hidden input ensures the value is submitted with FormData */}
      <input type="hidden" name={name} value={selected} />

      {options.map((option, index) => (
        <button
          key={option}
          type="button" // Ensure clicking doesn't submit the form
          onClick={() => handleSelect(option)}
          className={`px-4 py-2 w-[150px] text-sm font-medium capitalize ${
            selected === option
              ? "bg-[#0B8458] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } ${index === 0 && "rounded-t-[15px] !rounded-r-none"}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default PriceTypeToggle;
