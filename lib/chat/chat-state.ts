"use client";

import type { Chat, Message } from "@/types";

type ChatState = {
  chats: Chat[];
  messagesByChatId: Record<string, Message[]>;
};

type Listener = (state: ChatState) => void;

function sortChatsByLastActivity(a: Chat, b: Chat) {
  const aTs = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
  const bTs = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
  return bTs - aTs;
}

function uniqueMessages(messages: Message[]) {
  const seen = new Set<string>();
  const deduped: Message[] = [];

  for (const message of messages) {
    if (seen.has(message.id)) {
      continue;
    }

    seen.add(message.id);
    deduped.push(message);
  }

  return deduped;
}

function sortMessagesByCreatedAt(messages: Message[]) {
  return [...messages].sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
}

export class ChatStateManager {
  private state: ChatState = {
    chats: [],
    messagesByChatId: {},
  };

  private listeners = new Set<Listener>();

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    listener(this.getState());

    return () => {
      this.listeners.delete(listener);
    };
  }

  getState() {
    return this.state;
  }

  replaceChats(chats: Chat[]) {
    this.state = {
      ...this.state,
      chats: [...chats].sort(sortChatsByLastActivity),
    };
    this.notify();
  }

  upsertChat(chat: Chat) {
    const index = this.state.chats.findIndex(
      (candidate) => candidate.id === chat.id,
    );

    if (index === -1) {
      this.state = {
        ...this.state,
        chats: [chat, ...this.state.chats].sort(sortChatsByLastActivity),
      };
    } else {
      const next = [...this.state.chats];
      next[index] = chat;
      this.state = {
        ...this.state,
        chats: next.sort(sortChatsByLastActivity),
      };
    }

    this.notify();
  }

  replaceMessages(chatId: string, messages: Message[]) {
    this.state = {
      ...this.state,
      messagesByChatId: {
        ...this.state.messagesByChatId,
        [chatId]: sortMessagesByCreatedAt(uniqueMessages(messages)),
      },
    };
    this.notify();
  }

  appendMessage(message: Message) {
    const chatMessages = this.state.messagesByChatId[message.chatId] ?? [];
    const merged = sortMessagesByCreatedAt(
      uniqueMessages([...chatMessages, message]),
    );
    this.state = {
      ...this.state,
      messagesByChatId: {
        ...this.state.messagesByChatId,
        [message.chatId]: merged,
      },
    };
    this.notify();
  }

  prependOlderMessages(chatId: string, olderMessages: Message[]) {
    const currentMessages = this.state.messagesByChatId[chatId] ?? [];
    this.state = {
      ...this.state,
      messagesByChatId: {
        ...this.state.messagesByChatId,
        [chatId]: sortMessagesByCreatedAt(
          uniqueMessages([...olderMessages, ...currentMessages]),
        ),
      },
    };
    this.notify();
  }

  clear() {
    this.state = {
      chats: [],
      messagesByChatId: {},
    };
    this.notify();
  }

  private notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

export const chatStateManager = new ChatStateManager();
