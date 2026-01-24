import { cn } from "@/lib/utils";

interface IPriceProps {
  className?: string;
  price: number;
}

const Price = ({ className, price }: IPriceProps) => {
  return (
    <span className={cn("text-primary font-medium, text-base", className)}>
      &#8364;{price.toFixed(2)}
    </span>
  );
};

export default Price;
