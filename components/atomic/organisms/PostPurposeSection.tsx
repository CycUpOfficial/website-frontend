"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { FormField, PriceTypeToggle } from "../molecules";
import { Input, Select, Text } from "../atoms";
import type { PriceType } from "../molecules/PriceTypeToggle";

interface PostPurposeSectionProps {
  className?: string;
  defaultValue?: PriceType;
}

const durationOptions = [
  { value: "minutely", label: "Minutely" },
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
];

const PostPurposeSection = ({
  className,
  defaultValue = "giveaway",
}: PostPurposeSectionProps) => {
  const [purpose, setPurpose] = useState<PriceType>(defaultValue);
  const isGiveaway = purpose === "giveaway";
  const isLending = purpose === "lending";

  return (
    <section className={cn("mt-8", className)}>
      <Text type="h3" className="text-textPrimary font-medium text-[20px]">
        Set Price
      </Text>
      <Text
        type="p"
        className="text-textSecondary text-[16px] font-normal mt-2 mb-4"
      >
        Click on item type below and set the price requirements accordingly{" "}
      </Text>

      <div className="bg-[#EBFFF5] rounded-[15px] flex flex-col gap-12 items-center pb-[60px]">
        <PriceTypeToggle
          value={purpose}
          onChange={setPurpose}
          className="self-start"
        />

        <div className="flex items-center w-fit self-center gap-4">
          <FormField htmlFor="price">
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="Price rate"
              className="w-[285px] h-[60px] bg-transparent"
              required={!isGiveaway}
              disabled={isGiveaway}
            />
          </FormField>

          <FormField htmlFor="durationRate">
            <Select
              id="durationRate"
              name="durationRate"
              defaultValue=""
              required={isLending}
              disabled={!isLending}
              className="w-[285px] h-[60px] bg-transparent"
            >
              <option value="">Duration rate</option>
              {durationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormField>
        </div>
      </div>
    </section>
  );
};

export default PostPurposeSection;
