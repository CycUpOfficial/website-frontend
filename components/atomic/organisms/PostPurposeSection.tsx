"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { FormField, NegotiationRadio, PriceTypeToggle } from "../molecules";
import { Input, Select, Text } from "../atoms";
import type { PriceType } from "../molecules/PriceTypeToggle";

interface PostPurposeSectionProps {
  className?: string;
  defaultValue?: PriceType;
  errors?: Record<string, string[] | undefined>;
  values?: Record<string, string | undefined>;
}

const durationOptions = [
  { value: "hour", label: "Hourly" },
  { value: "day", label: "Daily" },
  { value: "week", label: "Weekly" },
  { value: "month", label: "Monthly" },
];

const PostPurposeSection = ({
  className,
  defaultValue = "giveaway",
  errors,
  values,
}: PostPurposeSectionProps) => {
  const [purpose, setPurpose] = useState<PriceType>(defaultValue);
  const isGiveaway = purpose === "giveaway";
  const isLending = purpose === "lending";
  const priceErrorKey = isLending ? "lendingPrice" : "sellingPrice";
  const priceDefaultValue = isLending
    ? values?.lendingPrice
    : values?.sellingPrice;

  useEffect(() => {
    setPurpose(defaultValue);
  }, [defaultValue]);

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
          name="itemType"
          className="self-start"
        />

        {errors?.itemType && (
          <p className="text-sm text-red-600 -mt-8 self-start">
            {errors.itemType[0]}
          </p>
        )}

        <div className="flex items-center w-fit self-center gap-4">
          <FormField htmlFor="price" error={errors?.[priceErrorKey]}>
            <Input
              id="price"
              name={isLending ? "lendingPrice" : "sellingPrice"}
              type="number"
              min="0"
              step="0.01"
              placeholder="Price rate"
              className="w-[285px] h-[60px] bg-transparent"
              required={!isGiveaway}
              disabled={isGiveaway}
              defaultValue={priceDefaultValue}
            />
          </FormField>

          <FormField htmlFor="rentUnit" error={errors?.rentUnit}>
            <Select
              id="rentUnit"
              name="rentUnit"
              defaultValue={values?.rentUnit ?? ""}
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

        <div className="w-full px-8">
          <NegotiationRadio />
        </div>
      </div>
    </section>
  );
};

export default PostPurposeSection;
