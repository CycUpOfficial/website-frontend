import { Text } from "../atoms";
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
  products: IProductListingGridProps["products"];
  columns?: number;
  gap?: IProductListingGridProps["gap"];
  className?: string;
}

const HomePageTemplate = ({ products, columns, gap }: IHomePageTemplate) => {
  return (
    <>
      <HeroSearchSection />

      <Container>
        <section className="px-20 my-12 flex justify-between gap-20">
          <Sidebar />
          <div className="flex flex-col gap-y-6">
            <div className="flex gap-2 items-center justify-between w-fit">
              <Text type="h1" className="font-medium text-xl text-textPrimary">
                Available Products
              </Text>
              <span className="px-2 bg-secondary text-white text-sm rounded-[5px] cursor-pointer">
                Type
              </span>
            </div>
            <ProductListingGrid
              products={products}
              columns={columns}
              gap={gap}
            />
          </div>
        </section>
      </Container>
    </>
  );
};

export default HomePageTemplate;
