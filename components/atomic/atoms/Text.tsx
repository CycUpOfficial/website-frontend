import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ITextProps {
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
  children: ReactNode;
}

const Text = ({ type, children, className }: ITextProps) => {
  const rootClassName = cn("", className);
  const typeHandler = () => {
    switch (type) {
      case "h1":
        return <h1 className={rootClassName}>{children}</h1>;
      case "h2":
        return <h2 className={rootClassName}>{children}</h2>;
      case "h3":
        return <h3 className={rootClassName}>{children}</h3>;
      case "h4":
        return <h4 className={rootClassName}>{children}</h4>;
      case "h5":
        return <h5 className={rootClassName}>{children}</h5>;
      case "h6":
        return <h6 className={rootClassName}>{children}</h6>;
      case "p":
        return <p className={rootClassName}>{children}</p>;
      case "span":
        return <span className={rootClassName}>{children}</span>;
      default:
        return <div className={rootClassName}>{children}</div>;
    }
  };

  return <>{typeHandler()}</>;
};

export default Text;
