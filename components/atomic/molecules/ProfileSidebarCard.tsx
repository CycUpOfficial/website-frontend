import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ProfileSidebarCardProps {
  className?: string;
  children: ReactNode;
}

const ProfileSidebarCard = ({
  className,
  children,
}: ProfileSidebarCardProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center rounded-[15px] bg-white",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ProfileSidebarCard;
