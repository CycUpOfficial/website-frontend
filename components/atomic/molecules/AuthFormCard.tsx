import type { FormEventHandler, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Text } from "../atoms";

interface AuthFormCardProps {
  title: string;
  message?: string;
  isSuccess?: boolean;
  children: ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  className?: string;
  formClassName?: string;
}

const AuthFormCard = ({
  title,
  message,
  isSuccess,
  children,
  onSubmit,
  className,
  formClassName,
}: AuthFormCardProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "space-y-4 w-full px-[220px] py-[100px] rounded-[20px]",
        formClassName,
      )}
    >
      <Text type="h3" className="text-[40px] font-bold text-primary w-fit">
        {title}
      </Text>
      {message && (
        <div
          className={`p-3 rounded mb-4 text-sm ${isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {message}
        </div>
      )}
      {children}
    </form>
  );
};

export default AuthFormCard;
