import { cn } from "@/lib/utils";
import type { Message } from "@/types";
import { Text } from "../atoms";

interface ChatMessageBubbleProps {
  message: Message;
  isOwnMessage?: boolean;
}

function formatMessageTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const ChatMessageBubble = ({
  message,
  isOwnMessage = false,
}: ChatMessageBubbleProps) => {
  return (
    <div className={cn("flex", isOwnMessage ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3",
          isOwnMessage ? "bg-primaryGreen text-white" : "bg-slate-100",
        )}
      >
        {message.text && (
          <Text
            type="p"
            className={cn(
              "whitespace-pre-wrap break-words text-sm",
              isOwnMessage ? "text-white" : "text-textPrimary",
            )}
          >
            {message.text}
          </Text>
        )}

        {message.file && (
          <a
            href={message.file.url}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "mt-2 block truncate text-sm underline",
              isOwnMessage ? "text-white" : "text-primaryGreen",
            )}
          >
            {message.file.name}
          </a>
        )}

        <Text
          type="span"
          className={cn(
            "mt-1 block text-[11px]",
            isOwnMessage ? "text-white/80" : "text-textSecondary",
          )}
        >
          {formatMessageTime(message.createdAt)}
        </Text>
      </div>
    </div>
  );
};

export default ChatMessageBubble;
