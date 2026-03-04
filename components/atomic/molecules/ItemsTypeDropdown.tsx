"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select } from "../atoms";

const ItemsTypeDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedType = searchParams.get("itemType") ?? "all";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("itemType");
    } else {
      params.set("itemType", value);
    }

    params.set("page", "1");

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <Select
      value={selectedType}
      onChange={(event) => handleChange(event.target.value)}
      className="w-fit min-w-[170px] border-none bg-secondary px-2 py-1 text-sm text-white rounded-[5px] focus:ring-0 focus:border-none"
      aria-label="Filter items by type"
    >
      <option value="all">All items</option>
      <option value="selling">Items for sale</option>
      <option value="lending">Lending</option>
      <option value="giveaway">Giveaway</option>
    </Select>
  );
};

export default ItemsTypeDropdown;
