import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface IButtonProps {
  onClick: () => void;
  className?: string;
  children: ReactNode;
}

const Button = ({ onClick, children, className }: IButtonProps) => {
  return (
    <button className={cn("", className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
