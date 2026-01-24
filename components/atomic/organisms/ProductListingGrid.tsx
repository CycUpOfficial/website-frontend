import { cn } from "@/lib/utils";
import { ProductCard, ProductCardProps } from "../molecules";
import MasonryGrid, { IMasonryGridProps } from "./MasonryGrid";

export interface IProductListingGridProps {
  products: ProductCardProps[];
  columns?: IMasonryGridProps["columns"];
  gap?: IMasonryGridProps["gap"];
  className?: string;
}

const ProductListingGrid = ({
  products,
  columns = 4,
  gap = "md",
  className,
}: IProductListingGridProps) => {
  return (
    <MasonryGrid columns={columns} gap={gap} className={cn(className)}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </MasonryGrid>
  );
};

export default ProductListingGrid;
