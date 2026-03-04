"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import { chatLogic } from "@/lib/chat/chat-logic";
import { ProfileCommonWrapper, ConversationsList } from "../organisms";
import { Text } from "../atoms";
import type { Chat } from "@/types";

interface ConversationsPageTemplateProps {
  initialChats?: Chat[];
}

const ConversationsPageTemplate = ({
  initialChats = [],
}: ConversationsPageTemplateProps) => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);

  const chatState = useSyncExternalStore(
    chatLogic.subscribe,
    chatLogic.getState,
    chatLogic.getState,
  );

  useEffect(() => {
    let active = true;

    chatLogic.connect({
      onConnectError: (socketError) => {
        if (active) {
          setError(socketError.message);
        }
      },
    });

    const run = async () => {
      try {
        await chatLogic.fetchChats({ page: 1, limit: 50 });
      } catch (requestError) {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Failed to load conversations.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void run();

    return () => {
      active = false;
      chatLogic.disconnect();
      chatLogic.clearState();
    };
  }, [initialChats.length]);

  const chats = chatState.chats.length ? chatState.chats : initialChats;

  return (
    <section className="h-[640px] overflow-hidden rounded-[15px] bg-white">
      <ProfileCommonWrapper
        title="Conversations"
        stickyHeader
        className="h-full"
        contentClassName="flex-1 overflow-y-auto px-6 pb-8"
        handlers={
          <Text type="span" className="text-sm text-textSecondary">
            {chats.length} total
          </Text>
        }
      >
        {loading && !chats.length ? (
          <div className="flex min-h-[280px] items-center justify-center">
            <Text type="p" className="text-sm text-textSecondary">
              Loading conversations...
            </Text>
          </div>
        ) : (
          <ConversationsList chats={chats} />
        )}

        {error && (
          <Text type="p" className="mt-4 text-sm text-red-600">
            {error}
          </Text>
        )}
      </ProfileCommonWrapper>
    </section>
  );
};

export default ConversationsPageTemplate;
