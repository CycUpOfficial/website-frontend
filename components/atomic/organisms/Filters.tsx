"use client";

import { ArrowDownSVG, BurgerSvg } from "@/components/icons";
import { ItemCategory, ItemCity } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Icon,
  Text,
} from "../atoms";
import {
  FilterOption,
  FilterOptionGroup,
  FilterPriceRange,
} from "../molecules";

interface FiltersProps {
  className?: string;
  categories?: ItemCategory[];
  cities?: ItemCity[];
}

const PRICE_MAX = 5000;

const parseNumber = (value: string | null): number | undefined => {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const Filters = ({ className, categories = [], cities = [] }: FiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeMinPrice = parseNumber(searchParams.get("minPrice"));
  const activeMaxPrice = parseNumber(searchParams.get("maxPrice"));
  const activeCategoryId = searchParams.get("categoryId") ?? "";
  const activeItemType = searchParams.get("itemType") ?? "";
  const activeCondition = searchParams.get("condition") ?? "";
  const activeCity = searchParams.get("city") ?? "";
  const selectedMinForSlider = Math.max(
    0,
    Math.min(PRICE_MAX, activeMinPrice ?? 0),
  );
  const selectedMaxForSlider = Math.max(
    0,
    Math.min(PRICE_MAX, activeMaxPrice ?? PRICE_MAX),
  );

  const initialMinForSlider = Math.min(
    selectedMinForSlider,
    selectedMaxForSlider,
  );
  const initialMaxForSlider = Math.max(
    selectedMinForSlider,
    selectedMaxForSlider,
  );

  const [minPrice, setMinPrice] = useState<number>(initialMinForSlider);
  const [maxPrice, setMaxPrice] = useState<number>(initialMaxForSlider);

  const updateQueryParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.set("page", "1");

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const applyPriceRangeValues = (
    minValue: number | undefined,
    maxValue: number | undefined,
  ) => {
    const min = Number.isFinite(minValue) ? minValue : undefined;
    const max = Number.isFinite(maxValue) ? maxValue : undefined;

    const params = new URLSearchParams(searchParams.toString());

    if (min === undefined) {
      params.delete("minPrice");
    } else {
      params.set("minPrice", String(Math.max(0, min)));
    }

    if (max === undefined) {
      params.delete("maxPrice");
    } else {
      params.set("maxPrice", String(Math.max(0, max)));
    }

    params.set("page", "1");

    const queryString = params.toString();
    const currentQueryString = searchParams.toString();

    if (queryString === currentQueryString) {
      return;
    }

    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const applyPriceRange = () => {
    applyPriceRangeValues(minPrice, maxPrice);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    [
      "categoryId",
      "itemType",
      "condition",
      "city",
      "minPrice",
      "maxPrice",
    ].forEach((key) => params.delete(key));

    params.set("page", "1");

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const handleMinRangeChange = (value: number) => {
    const nextMin = Math.min(Math.max(0, value), maxPrice);
    setMinPrice(nextMin);
  };

  const handleMaxRangeChange = (value: number) => {
    const nextMax = Math.max(Math.min(PRICE_MAX, value), minPrice);
    setMaxPrice(nextMax);
  };

  const categoryOptions: FilterOption[] = [
    { label: "All categories", value: "" },
    ...categories.map((category) => ({
      label: category.name,
      value: String(category.id),
    })),
  ];

  const typeOptions: FilterOption[] = [
    { label: "All types", value: "" },
    { label: "Items for sale", value: "selling" },
    { label: "Lending", value: "lending" },
    { label: "Giveaway", value: "giveaway" },
  ];

  const conditionOptions: FilterOption[] = [
    { label: "Any condition", value: "" },
    { label: "New", value: "new" },
    { label: "Used", value: "used" },
  ];

  const cityOptions: FilterOption[] = [
    { label: "All cities", value: "" },
    ...cities.map((city) => ({ label: city.name, value: city.name })),
  ];

  return (
    <div
      className={cn(
        "bg-white shadow-md rounded-[20px] py-8 px-6 w-fit h-fit flex-shrink-0 min-w-[320px]",
        className,
      )}
    >
      <div className="flex items-center gap-2 w-fit mb-5">
        <Icon className="w-[25px] h-[15px]">
          <BurgerSvg width="100%" heigth="100%" />
        </Icon>
        <Text type="h3" className="text-xl font-semibold text-primary">
          Filter Products
        </Text>
      </div>

      <Accordion
        type="single"
        collapsible
        className="flex flex-col gap-3"
      >
        <AccordionItem
          value="categories"
          className="border-b border-textSecondary/20 bg-white"
        >
          <AccordionTrigger className="group flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-textPrimary">
            <span>Categories</span>
            <Icon className="h-2 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180">
              <ArrowDownSVG width="100%" heigth="100%" />
            </Icon>
          </AccordionTrigger>
          <AccordionContent className="border-textSecondary/20 px-3 py-3">
            <FilterOptionGroup
              options={categoryOptions}
              activeValue={activeCategoryId}
              onSelect={(value) => updateQueryParam("categoryId", value)}
              className="max-h-44 overflow-y-auto pr-1"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="type"
          className="border-textSecondary/20 bg-white border-b"
        >
          <AccordionTrigger className="group flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-textPrimary">
            <span>Type of products</span>
            <Icon className="h-2 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180">
              <ArrowDownSVG width="100%" heigth="100%" />
            </Icon>
          </AccordionTrigger>
          <AccordionContent className="border-textSecondary/20 px-3 py-3">
            <FilterOptionGroup
              options={typeOptions}
              activeValue={activeItemType}
              onSelect={(value) => updateQueryParam("itemType", value)}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="condition"
          className="border-b border-textSecondary/20 bg-white"
        >
          <AccordionTrigger className="group flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-textPrimary">
            <span>Condition</span>
            <Icon className="h-2 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180">
              <ArrowDownSVG width="100%" heigth="100%" />
            </Icon>
          </AccordionTrigger>
          <AccordionContent className="border-textSecondary/20 px-3 py-3">
            <FilterOptionGroup
              options={conditionOptions}
              activeValue={activeCondition}
              onSelect={(value) => updateQueryParam("condition", value)}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="city"
          className="border-b  border-textSecondary/20 bg-white"
        >
          <AccordionTrigger className="group flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-textPrimary">
            <span>City</span>
            <Icon className="h-2 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180">
              <ArrowDownSVG width="100%" heigth="100%" />
            </Icon>
          </AccordionTrigger>
          <AccordionContent className="border-textSecondary/20 px-3 py-3">
            <FilterOptionGroup
              options={cityOptions}
              activeValue={activeCity}
              onSelect={(value) => updateQueryParam("city", value)}
              className="max-h-44 overflow-y-auto pr-1"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="price"
          className="border-textSecondary/20 bg-white"
        >
          <AccordionTrigger className="group flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-textPrimary">
            <span>Price range</span>
            <Icon className="h-2 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180">
              <ArrowDownSVG width="100%" heigth="100%" />
            </Icon>
          </AccordionTrigger>
          <AccordionContent className="border-textSecondary/20 px-3 py-3">
            <FilterPriceRange
              minPrice={minPrice}
              maxPrice={maxPrice}
              priceMax={PRICE_MAX}
              onMinChange={handleMinRangeChange}
              onMaxChange={handleMaxRangeChange}
              onCommit={applyPriceRange}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <button
        type="button"
        onClick={clearAllFilters}
        className="mt-3 w-full rounded-md border border-primary px-3 py-2 text-sm font-medium text-primary"
      >
        Clear all filters
      </button>
    </div>
  );
};

export default Filters;
