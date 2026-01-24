import { cn } from "@/lib/utils";

import { ReactNode } from "react";

interface IIconProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Icon = (props: IIconProps) => {
  const { className, children, onClick } = props;
  const rootClassName = cn(className);

  return (
    <div className={rootClassName} onClick={onClick}>
      {children}
    </div>
  );
};

export default Icon;
