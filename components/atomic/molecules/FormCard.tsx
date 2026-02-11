import type { FormEventHandler, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Text } from "../atoms";

interface IFormCarProps {
  title: string;
  description?: string;
  message?: string; // Global success/error message
  isSuccess?: boolean;
  children: ReactNode; // The inputs go here
  action?: (payload: FormData) => void; // The server action connection
  onSubmit?: FormEventHandler<HTMLFormElement>;
  className?: string;
  formClassName?: string;
}
const FormCard = ({
  title,
  description,
  message,
  isSuccess,
  children,
  action,
  onSubmit,
  className,
  formClassName,
}: IFormCarProps) => {
  return (
    <div className={cn("bg-white rounded-lg p-6 w-full mx-auto", className)}>
      <div className="w-fill rounded-[15px] text-center bg-white flex justify-center shadow-md items-center mb-10">
        <Text type="h1" className="text-2xl font-bold text-primary mb-6 w-fit">
          {title}
        </Text>
      </div>

      {/* Standardized Message Display */}
      {message && (
        <div
          className={`p-3 rounded mb-4 text-sm ${isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {message}
        </div>
      )}

      <form
        action={action}
        onSubmit={onSubmit}
        className={cn(
          "space-y-4 shadow-md w-full px-[220px] py-[100px] rounded-[20px]",
          formClassName,
        )}
      >
        {children}
      </form>
    </div>
  );
};

export default FormCard;
