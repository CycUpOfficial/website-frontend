import { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean;
};

const Select = ({ className, hasError, children, ...props }: SelectProps) => {
  return (
    <select
      {...props}
      className={cn(
        "w-full px-3 py-2 border rounded-md bg-white shadow-sm",
        "focus:ring-indigo-500 focus:border-indigo-500",
        hasError ? "border-red-500" : "border-gray-300",
        className,
      )}
    >
      {children}
    </select>
  );
};

export default Select;
