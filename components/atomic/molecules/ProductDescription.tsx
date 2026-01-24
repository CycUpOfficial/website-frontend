import Link from "next/link";
import { Button, Text } from "../atoms";

interface IProductDescriptionProps {
  description: string;
}

const ProductDescription = ({ description }: IProductDescriptionProps) => {
  return (
    <div className="rounded-[10px] bg-white p-12 shadow-md">
      <Text type="p" className="mb-10">
        {description}
      </Text>
      <Link
        href="/"
        className="bg-secondary text-white rounded-[10px] font-medium py-1.5 w-[130px]"
      >
        Claim
      </Link>
    </div>
  );
};

export default ProductDescription;
