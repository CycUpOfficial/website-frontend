import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface IButtonProps {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}

const Button = ({
  onClick,
  children,
  className,
  type = "button",
  disabled,
}: IButtonProps) => {
  return (
    <button
      className={cn("", className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
