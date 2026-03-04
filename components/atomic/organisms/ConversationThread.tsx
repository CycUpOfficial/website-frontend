import type { Message } from "@/types";
import { Button, Text } from "../atoms";
import { ChatMessageBubble, ChatMessageComposer } from "../molecules";

interface ConversationThreadProps {
  title: string;
  messages: Message[];
  currentUserId?: string;
  nextCursor?: string | null;
  loadingOlder?: boolean;
  onLoadOlder?: () => Promise<void>;
  onSendMessage: (payload: {
    text?: string;
    file?: {
      data: ArrayBuffer;
      name: string;
      mimeType: string;
    };
  }) => Promise<void>;
}

const ConversationThread = ({
  title,
  messages,
  currentUserId,
  nextCursor,
  loadingOlder = false,
  onLoadOlder,
  onSendMessage,
}: ConversationThreadProps) => {
  return (
    <section className="flex h-full flex-col overflow-hidden rounded-[15px] bg-white">
      <div className="border-b px-6 py-5">
        <Text type="h2" className="text-lg font-bold text-textPrimary">
          {title}
        </Text>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        {nextCursor && onLoadOlder && (
          <div className="mb-4 flex justify-center">
            <Button
              onClick={() => void onLoadOlder()}
              disabled={loadingOlder}
              className="rounded-full border border-textSecondary/20 px-4 py-2 text-xs text-textSecondary disabled:opacity-60"
            >
              {loadingOlder ? "Loading..." : "Load older messages"}
            </Button>
          </div>
        )}

        {!messages.length ? (
          <div className="flex h-full min-h-[220px] items-center justify-center">
            <Text type="p" className="text-sm text-textSecondary">
              No messages yet.
            </Text>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((message) => (
              <ChatMessageBubble
                key={message.id}
                message={message}
                isOwnMessage={
                  currentUserId ? message.senderId === currentUserId : false
                }
              />
            ))}
          </div>
        )}
      </div>

      <ChatMessageComposer onSend={onSendMessage} />
    </section>
  );
};

export default ConversationThread;
