import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface IMasonryGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4 | 5;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

const columnClasses = {
  2: "columns-1 sm:columns-2",
  3: "columns-1 sm:columns-2 lg:columns-3",
  4: "columns-1 sm:columns-2 lg:columns-3 xl:columns-4",
  5: "columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5",
};

const gapClasses = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

const MasonryGrid = ({
  children,
  columns = 3,
  gap = "md",
  className,
}: IMasonryGridProps) => {
  return (
    <div className={cn(columnClasses[columns], gapClasses[gap], className)}>
      {children}
    </div>
  );
};

export default MasonryGrid;
