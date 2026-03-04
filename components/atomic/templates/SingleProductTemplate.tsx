import { ItemDetail, SampleProduct } from "@/types";
import { Container, Product, SimilarProductsWrapper } from "../organisms";

interface ISingleProductTemplateProps {
  product: ItemDetail;
  similarProducts: any[];
}

const SingleProductTemplate = ({
  product,
  similarProducts,
}: ISingleProductTemplateProps) => {
  return (
    <Container className="flex flex-col w-full gap-[60px]">
      <Product product={product} />
      <SimilarProductsWrapper products={similarProducts.slice(1, 6)} />
    </Container>
  );
};

export default SingleProductTemplate;
