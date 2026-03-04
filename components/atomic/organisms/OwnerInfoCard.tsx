"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Icon, Text } from "../atoms";
import { StartChatSVG } from "@/components/icons";
import { OwnerInfo } from "../molecules";
import { ItemOwner } from "@/types";
import { chatLogic } from "@/lib/chat/chat-logic";
import { getAuthSession } from "@/lib/auth-session";
import { cn } from "@/lib/utils";

interface IOwnerInfoCardProps {
  owner: ItemOwner;
  itemId: string;
}

const OwnerInfoCard = ({ owner, itemId }: IOwnerInfoCardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isStartingChat, setIsStartingChat] = useState(false);
  const [error, setError] = useState<string>();

  const handleStartChat = async () => {
    const session = getAuthSession();

    if (!session?.authenticated || !session.userId) {
      const redirect = encodeURIComponent(pathname || `/product/${itemId}`);
      router.push(`/?auth=login&redirect=${redirect}`);
      return;
    }

    if (String(session.userId) === owner.id) {
      router.push("/profile/conversation");
      return;
    }

    setError(undefined);
    setIsStartingChat(true);

    try {
      chatLogic.connect();
      const chat = await chatLogic.startChat({
        itemId,
        otherUserId: owner.id,
      });

      if (!chat.id) {
        throw new Error("Chat id is missing. Please try again.");
      }

      router.push(`/profile/conversation/${chat.id}`);
    } catch (chatError) {
      setError(
        chatError instanceof Error
          ? chatError.message
          : "Failed to start chat.",
      );
    } finally {
      setIsStartingChat(false);
      chatLogic.disconnect();
    }
  };

  return (
    <div className="rounded-[10px] bg-white px-20 py-11 shadow-md flex flex-col items-center gap-2.5">
      <OwnerInfo owner={owner} />
      <button
        type="button"
        onClick={() => void handleStartChat()}
        disabled={isStartingChat}
        className="rounded-[5px] border-primary border border-1 bg-white py-2.5 w-[250px] flex items-center gap-1.5 justify-center"
      >
        <Icon className="w-[14px] h-[12px]">
          <StartChatSVG width="100%" heigth="100%" />
        </Icon>
        <Text type="span" className="text-[10px] text-primary font-normal">
          {isStartingChat ? "Starting..." : "Start Chat"}
        </Text>
      </button>
      {error && (
        <Text
          type="p"
          className={cn("text-xs text-red-600 text-center max-w-[250px]")}
        >
          {error}
        </Text>
      )}
    </div>
  );
};

export default OwnerInfoCard;
