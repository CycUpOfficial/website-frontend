import { ItemCategory, ItemCity, SampleProduct } from "@/types";
import { Text } from "../atoms";
import { CatalogPagination, ItemsTypeDropdown } from "../molecules";
import {
  Sidebar,
  HeroSearchSection,
  IProductListingGridProps,
  ProductListingGrid,
  Container,
} from "../organisms";

interface IHomePageTemplate {
  title?: string;
  description?: string;
  products: SampleProduct[];
  categories: ItemCategory[];
  cities: ItemCity[];
  currentPage: number;
  totalPages: number;
  showHeroSearchSection?: boolean;
  columns?: IProductListingGridProps["columns"];
  gap?: IProductListingGridProps["gap"];
  className?: string;
}

const HomePageTemplate = ({
  products,
  categories,
  cities,
  currentPage,
  totalPages,
  showHeroSearchSection = true,
  columns,
  gap,
}: IHomePageTemplate) => {
  return (
    <>
      {showHeroSearchSection && <HeroSearchSection />}

      <Container>
        <section className="px-20 my-12 flex gap-20">
          <Sidebar categories={categories} cities={cities} />
          <div className="flex flex-col gap-y-6">
            <div className="flex gap-2 items-center justify-between w-fit">
              <Text type="h1" className="font-medium text-xl text-textPrimary">
                Available Products
              </Text>
              <ItemsTypeDropdown />
            </div>
            {products.length ? (
              <>
                <ProductListingGrid
                  products={products}
                  columns={columns}
                  gap={gap}
                />
                <CatalogPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <Text type="p" className="text-sm text-textSecondary">
                No items found for the selected filters.
              </Text>
            )}
          </div>
        </section>
      </Container>
    </>
  );
};

export default HomePageTemplate;
