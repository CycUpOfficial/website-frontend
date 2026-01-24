import { cn } from "@/lib/utils";

interface IContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ className, children }: IContainerProps) => {
  return (
    <div className={cn("mx-auto w-full px-6 lg:px-8 xl:px-20", className)}>
      {children}
    </div>
  );
};

export default Container;
