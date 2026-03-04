import { forwardRef, InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="radio"
        {...props}
        className={cn("accent-[#0B8458]", className)}
      />
    );
  },
);

Radio.displayName = "Radio";

export default Radio;
