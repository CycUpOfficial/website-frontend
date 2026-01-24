import { SampleProduct } from "@/types";
import { Container, Product } from "../organisms";

interface ISingleProductTemplateProps {
  product: SampleProduct;
  similarProducts: any[];
}

const SingleProductTemplate = ({
  product,
  similarProducts,
}: ISingleProductTemplateProps) => {
  return (
    <Container>
      <Product product={product} />
      {/* <SimilarProductWrapper products={similarProducts} /> */}
    </Container>
  );
};

export default SingleProductTemplate;
