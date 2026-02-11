import type { FormEventHandler, ReactNode } from "react";

import { cn } from "@/lib/utils";
import FormCard from "./FormCard";

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
    <FormCard
      title={title}
      message={message}
      isSuccess={isSuccess}
      onSubmit={onSubmit}
      className={cn("max-w-2xl", className)}
      formClassName={cn(
        "space-y-4 w-full rounded-[20px] border border-gray-100 bg-white px-6 py-8 shadow-sm",
        formClassName,
      )}
    >
      {children}
    </FormCard>
  );
};

export default AuthFormCard;
