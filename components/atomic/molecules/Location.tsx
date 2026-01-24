import { cn } from "@/lib/utils";
import { Icon, Text } from "../atoms";
import { LocationSVG } from "@/components/icons";

interface ILocationProps {
  className?: string;
  location: string;
}

const Location = ({ location, className }: ILocationProps) => {
  return (
    <span className={cn("flex items-center gap-1 justify-between", className)}>
      <Icon className="relative w-[11px] h-[12px]">
        <LocationSVG width="100%" heigth="100%" />
      </Icon>
      <Text className="text-textSecondary font-normal text-[10px]">
        {location}
      </Text>
    </span>
  );
};

export default Location;
