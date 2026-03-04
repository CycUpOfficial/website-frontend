"use client";

import { getChatMessages, getChats } from "@/services";
import type {
  Chat,
  ListChatMessagesRequest,
  ListChatsRequest,
  Message,
  SendMessageRequest,
  SocketError,
  SocketListMessagesRequest,
  StartChatRequest,
} from "@/types";
import { chatSocketClient } from "./chat-socket";
import { chatStateManager } from "./chat-state";

export class ChatLogicError extends Error {
  code: string;

  constructor(message: string, code = "CHAT_LOGIC_ERROR") {
    super(message);
    this.code = code;
  }
}

type ChatLogicOptions = {
  onConnect?: () => void;
  onDisconnect?: (reason: string) => void;
  onConnectError?: (error: Error) => void;
};

type ChatWithMongoId = Partial<Chat> & { _id?: string };

function fromSocketError(error?: SocketError) {
  return new ChatLogicError(
    error?.message ?? "Unknown socket error",
    "SOCKET_ERROR",
  );
}

function updateChatWithMessage(chat: Chat, message: Message): Chat {
  return {
    ...chat,
    lastMessageAt: message.createdAt,
    lastMessagePreview:
      message.text ?? (message.file ? `[File] ${message.file.name}` : null),
    updatedAt: message.createdAt,
  };
}

function normalizeChat(chat: ChatWithMongoId): Chat {
  const id = chat.id || chat._id;

  if (!id) {
    throw new ChatLogicError(
      "Chat id is missing from server response.",
      "INVALID_CHAT",
    );
  }

  return {
    id,
    item: chat.item ?? null,
    participants: chat.participants ?? [],
    lastMessageAt: chat.lastMessageAt ?? null,
    lastMessagePreview: chat.lastMessagePreview ?? null,
    createdAt: chat.createdAt ?? new Date().toISOString(),
    updatedAt: chat.updatedAt ?? new Date().toISOString(),
  };
}

function normalizeChats(chats: ChatWithMongoId[]) {
  return chats.map((chat) => normalizeChat(chat));
}

function validateSendMessagePayload(payload: SendMessageRequest) {
  const text = payload.text?.trim();
  const hasText = Boolean(text);
  const hasFile = Boolean(payload.file);

  if (!hasText && !hasFile) {
    throw new ChatLogicError(
      "Message text or file is required.",
      "VALIDATION_ERROR",
    );
  }

  if (payload.file) {
    if (!payload.file.name || !payload.file.mimeType) {
      throw new ChatLogicError(
        "File name and mimeType are required.",
        "VALIDATION_ERROR",
      );
    }
  }
}

export class ChatLogic {
  connect(options?: ChatLogicOptions) {
    chatSocketClient.setListeners({
      onConnect: options?.onConnect,
      onDisconnect: options?.onDisconnect,
      onConnectError: options?.onConnectError,
      onChatStarted: (chat) => {
        chatStateManager.upsertChat(normalizeChat(chat as ChatWithMongoId));
      },
      onMessageNew: (message) => {
        chatStateManager.appendMessage(message);

        const state = chatStateManager.getState();
        const chat = state.chats.find((item) => item.id === message.chatId);
        if (chat) {
          chatStateManager.upsertChat(updateChatWithMessage(chat, message));
        }
      },
    });

    chatSocketClient.connect();
  }

  disconnect() {
    chatSocketClient.disconnect();
  }

  subscribe = chatStateManager.subscribe.bind(chatStateManager);
  getState = chatStateManager.getState.bind(chatStateManager);

  async fetchChats(query?: ListChatsRequest) {
    const response = await getChats(query);

    if (!response.success) {
      throw new ChatLogicError(
        response.error ?? "Failed to fetch chats",
        "REST_ERROR",
      );
    }

    const normalizedChats = normalizeChats(
      response.data.chats as ChatWithMongoId[],
    );
    chatStateManager.replaceChats(normalizedChats);
    return {
      ...response.data,
      chats: normalizedChats,
    };
  }

  async fetchMessages(chatId: string, query?: ListChatMessagesRequest) {
    const response = await getChatMessages(chatId, query);

    if (!response.success) {
      throw new ChatLogicError(
        response.error ?? "Failed to fetch messages",
        "REST_ERROR",
      );
    }

    chatStateManager.replaceMessages(chatId, response.data.messages);
    return response.data;
  }

  async startChat(payload: StartChatRequest) {
    const response = await chatSocketClient.startChat(payload);
    if (!response.ok) {
      throw fromSocketError(response.error);
    }

    const normalizedChat = normalizeChat(response.chat as ChatWithMongoId);
    chatStateManager.upsertChat(normalizedChat);
    return normalizedChat;
  }

  async listChatsViaSocket(page = 1, limit = 20) {
    const response = await chatSocketClient.listChats({ page, limit });
    if (!response.ok) {
      throw fromSocketError(response.error);
    }

    const normalizedChats = normalizeChats(response.chats as ChatWithMongoId[]);
    chatStateManager.replaceChats(normalizedChats);
    return {
      ...response,
      chats: normalizedChats,
    };
  }

  async loadMessagesViaSocket(payload: SocketListMessagesRequest) {
    const response = await chatSocketClient.listMessages(payload);
    if (!response.ok) {
      throw fromSocketError(response.error);
    }

    if (payload.before) {
      chatStateManager.prependOlderMessages(payload.chatId, response.messages);
    } else {
      chatStateManager.replaceMessages(payload.chatId, response.messages);
    }

    return response;
  }

  async sendMessage(payload: SendMessageRequest) {
    validateSendMessagePayload(payload);

    const response = await chatSocketClient.sendMessage(payload);
    if (!response.ok) {
      throw fromSocketError(response.error);
    }

    const message = response.message;
    chatStateManager.appendMessage(message);

    const state = chatStateManager.getState();
    const chat = state.chats.find((item) => item.id === message.chatId);
    if (chat) {
      chatStateManager.upsertChat(updateChatWithMessage(chat, message));
    }

    return message;
  }

  clearState() {
    chatStateManager.clear();
  }
}

export const chatLogic = new ChatLogic();
