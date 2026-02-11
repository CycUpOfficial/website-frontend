import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "children"
> & {
  hasError?: boolean;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className={cn(
          "w-full px-3 py-2 border rounded-md shadow-sm",
          "focus:ring-indigo-500 focus:border-indigo-500",
          hasError ? "border-red-500" : "border-gray-300",
          className,
        )}
      />
    );
  },
);

Textarea.displayName = "Textarea";
export default Textarea;
