import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Chat } from "@/types";
import { Text } from "../atoms";

interface ConversationListItemProps {
  chat: Chat;
  href: string;
  isActive?: boolean;
}

function formatTime(value?: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const ConversationListItem = ({
  chat,
  href,
  isActive = false,
}: ConversationListItemProps) => {
  const title = chat.item?.title || "Conversation";
  const subtitle = chat.lastMessagePreview || "No messages yet";
  const created = formatTime(chat.lastMessageAt ?? chat.updatedAt);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-start justify-between gap-4 rounded-[12px] border px-4 py-3 transition-colors",
        isActive
          ? "border-primaryGreen bg-green-50"
          : "border-textSecondary/20 bg-white hover:bg-slate-50",
      )}
    >
      <div className="min-w-0 flex-1">
        <Text
          type="h4"
          className="truncate text-sm font-semibold leading-5 text-textPrimary"
        >
          {title}
        </Text>
        <Text
          type="p"
          className="mt-1 truncate text-xs leading-5 text-textSecondary"
        >
          {subtitle}
        </Text>
      </div>
      <Text type="span" className="shrink-0 text-[11px] text-textSecondary">
        {created}
      </Text>
    </Link>
  );
};

export default ConversationListItem;
