import Link from "next/link";
import { Button, Text } from "../atoms";

interface IProductDescriptionProps {
  description: string;
}

const ProductDescription = ({ description }: IProductDescriptionProps) => {
  return (
    <div className="rounded-[10px] bg-white p-12 shadow-md mb-20">
      <Text type="p" className="mb-10">
        {description}
      </Text>
      {/* <Link
        href="/"
        className="bg-secondary text-white text-xl rounded-[10px] font-medium py-1.5 px-8"
      >
        Claim
      </Link> */}
    </div>
  );
};

export default ProductDescription;
