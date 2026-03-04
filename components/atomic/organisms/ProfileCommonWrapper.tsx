import { ReactNode } from "react";
import { Text } from "../atoms";
import { cn } from "@/lib/utils";

interface IProfileCommonWrapperProps {
  title: string;
  handlers: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  stickyHeader?: boolean;
}

const ProfileCommonWrapper = ({
  title,
  handlers,
  children,
  className,
  headerClassName,
  contentClassName,
  stickyHeader = false,
}: IProfileCommonWrapperProps) => {
  return (
    <div className={cn("flex w-full flex-col", className)}>
      <div
        className={cn(
          "flex items-center justify-between px-20 py-10 shadow-md rounded-t-[15px]",
          stickyHeader && "sticky top-0 z-10 bg-white",
          headerClassName,
        )}
      >
        <Text type="h1" className="font-bold text-xl">
          {title}
        </Text>
        {handlers}
      </div>
      <div className={cn("mt-2", contentClassName)}>{children}</div>
    </div>
  );
};

export default ProfileCommonWrapper;
