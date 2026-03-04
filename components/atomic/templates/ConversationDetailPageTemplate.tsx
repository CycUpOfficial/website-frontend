"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

import { getAuthSession } from "@/lib/auth-session";
import { chatLogic } from "@/lib/chat/chat-logic";
import type { Chat, Message } from "@/types";
import {
  ProfileCommonWrapper,
  ConversationsList,
  ConversationThread,
} from "../organisms";
import { Text } from "../atoms";

interface ConversationDetailPageTemplateProps {
  chatId: string;
  initialChats?: Chat[];
  initialMessages?: Message[];
}

const ConversationDetailPageTemplate = ({
  chatId,
  initialChats = [],
  initialMessages = [],
}: ConversationDetailPageTemplateProps) => {
  const [loading, setLoading] = useState(true);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [error, setError] = useState<string>();

  const chatState = useSyncExternalStore(
    chatLogic.subscribe,
    chatLogic.getState,
    chatLogic.getState,
  );

  const currentUserId = useMemo(() => {
    const session = getAuthSession();
    return session?.userId ? String(session.userId) : undefined;
  }, []);

  const chats = chatState.chats.length ? chatState.chats : initialChats;

  const selectedChat = useMemo(
    () => chats.find((chat) => chat.id === chatId),
    [chatId, chats],
  );

  const messages = useMemo(
    () => chatState.messagesByChatId[chatId] ?? initialMessages,
    [chatId, chatState.messagesByChatId, initialMessages],
  );

  const handleLoadOlder = useCallback(async () => {
    if (!nextCursor) {
      return;
    }

    setLoadingOlder(true);
    try {
      const response = await chatLogic.loadMessagesViaSocket({
        chatId,
        before: nextCursor,
        limit: 50,
      });
      setNextCursor(response.nextCursor);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to load older messages.",
      );
    } finally {
      setLoadingOlder(false);
    }
  }, [chatId, nextCursor]);

  const handleSendMessage = useCallback(
    async (payload: {
      text?: string;
      file?: {
        data: ArrayBuffer;
        name: string;
        mimeType: string;
      };
    }) => {
      await chatLogic.sendMessage({
        chatId,
        text: payload.text,
        file: payload.file,
      });
    },
    [chatId],
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
        if (!initialChats.length) {
          await chatLogic.fetchChats({ page: 1, limit: 50 });
        }

        const response = await chatLogic.loadMessagesViaSocket({
          chatId,
          limit: 50,
        });
        if (active) {
          setNextCursor(response.nextCursor);
        }
      } catch {
        try {
          const restResponse = await chatLogic.fetchMessages(chatId, {
            limit: 50,
          });
          if (active) {
            setNextCursor(restResponse.nextCursor);
          }
        } catch (requestError) {
          if (active) {
            setError(
              requestError instanceof Error
                ? requestError.message
                : "Failed to load messages.",
            );
          }
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
  }, [chatId, initialChats.length]);

  const title = selectedChat?.item?.title || "Conversation";

  return (
    <section className="h-[640px] overflow-hidden rounded-[15px] bg-white">
      <ProfileCommonWrapper
        title="Conversation"
        stickyHeader
        className="h-full"
        contentClassName="flex-1 overflow-hidden px-6 pb-6"
        handlers={
          <Text type="span" className="text-sm text-textSecondary">
            {loading ? "Loading..." : `${messages.length} messages`}
          </Text>
        }
      >
        <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
          <div className="h-full overflow-y-auto rounded-[14px] border border-textSecondary/20 bg-slate-50 p-3">
            <ConversationsList chats={chats} activeChatId={chatId} />
          </div>

          <ConversationThread
            title={title}
            messages={messages}
            currentUserId={currentUserId}
            nextCursor={nextCursor}
            loadingOlder={loadingOlder}
            onLoadOlder={handleLoadOlder}
            onSendMessage={handleSendMessage}
          />
        </div>

        {error && (
          <Text type="p" className="mt-3 text-sm text-red-600">
            {error}
          </Text>
        )}
      </ProfileCommonWrapper>
    </section>
  );
};

export default ConversationDetailPageTemplate;
