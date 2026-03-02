import { SampleProduct } from "@/types";
import { cn } from "@/lib/utils";
import { Text } from "../atoms";
import ProductListingGrid from "./ProductListingGrid";

interface ListingsWrapperProps {
  listings: SampleProduct[];
  className?: string;
}

const ListingsWrapper = ({ listings, className }: ListingsWrapperProps) => {
  if (!listings.length) {
    return (
      <div
        className={cn(
          "flex min-h-[220px] items-center justify-center rounded-[16px] border border-textSecondary/20 bg-white",
          className,
        )}
      >
        <Text type="p" className="text-sm text-textSecondary">
          No listings yet.
        </Text>
      </div>
    );
  }

  return (
    <ProductListingGrid
      products={listings}
      columns={3}
      gap="md"
      className={cn("w-full", className)}
    />
  );
};

export default ListingsWrapper;
