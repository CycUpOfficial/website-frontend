import Link from "next/link";
import { Icon, Text } from "../atoms";
import { StartChatSVG } from "@/components/icons";
import { OwnerInfo } from "../molecules";
import { ItemOwner } from "@/types";

interface IOwnerInfoCardProps {
  owner: ItemOwner;
}

const OwnerInfoCard = ({ owner }: IOwnerInfoCardProps) => {
  return (
    <div className="rounded-[10px] bg-white px-20 py-11 shadow-md flex flex-col items-center gap-2.5">
      <OwnerInfo owner={owner} />
      <Link
        href="/chat"
        className="rounded-[5px] border-primary border border-1 bg-white py-2.5 w-[250px] flex items-center gap-1.5 justify-center"
      >
        <Icon className="w-[14px] h-[12px]">
          <StartChatSVG width="100%" heigth="100%" />
        </Icon>
        <Text type="span" className="text-[10px] text-primary font-normal">
          Start Chat
        </Text>
      </Link>
    </div>
  );
};

export default OwnerInfoCard;
