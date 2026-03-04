import Image from "next/image";
import { Icon, Text } from "../atoms";
import { LocationSVG } from "@/components/icons";
import PlaceholderImage from "@/public/profile-placeholder.jpg";
import { ItemOwner } from "@/types";
interface IOwnerInfo {
  owner: ItemOwner;
}
const OwnerInfo = ({ owner }: IOwnerInfo) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <Image
        src={PlaceholderImage}
        alt={owner.username}
        className="rounded-full"
        width={84}
        height={84}
      />
      <div className="flex flex-col justify-between items-start">
        <Text type="h3">{owner.username}</Text>
        <div className="flex gap-[1.5px]">
          <Icon className="w-[9.2px] h-[10.5px] mt-[0.5px]">
            <LocationSVG width="100%" heigth="100%" isGrean />
          </Icon>
          <Text type="span" className="text-primary text-[10px] font-light">
            {owner.location}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default OwnerInfo;
