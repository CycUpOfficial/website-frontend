import type { Chat } from "@/types";
import { ConversationListItem } from "../molecules";
import { Text } from "../atoms";

interface ConversationsListProps {
  chats: Chat[];
  activeChatId?: string;
}

const ConversationsList = ({ chats, activeChatId }: ConversationsListProps) => {
  if (!chats.length) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-[14px] border border-textSecondary/20 bg-white">
        <Text type="p" className="text-sm text-textSecondary">
          No conversations yet.
        </Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {chats.map((chat) => (
        <ConversationListItem
          key={chat.id}
          chat={chat}
          href={`/profile/conversation/${chat.id}`}
          isActive={activeChatId === chat.id}
        />
      ))}
    </div>
  );
};

export default ConversationsList;
