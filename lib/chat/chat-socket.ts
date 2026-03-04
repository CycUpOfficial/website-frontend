"use client";

import { io, type Socket } from "socket.io-client";
import type {
  Chat,
  ListChatsAck,
  ListMessagesAck,
  Message,
  SendMessageAck,
  SendMessageRequest,
  SocketListChatsRequest,
  SocketListMessagesRequest,
  StartChatAck,
  StartChatRequest,
} from "@/types";

const DEFAULT_ACK_TIMEOUT_MS = 10000;

type ChatSocketEvents = {
  onConnect?: () => void;
  onDisconnect?: (reason: string) => void;
  onConnectError?: (error: Error) => void;
  onChatStarted?: (chat: Chat) => void;
  onMessageNew?: (message: Message) => void;
};

function getBackendUrl() {
  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
  if (socketUrl) {
    return socketUrl;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  if (!apiUrl) {
    return "";
  }

  return apiUrl.replace(/\/?api\/?$/, "");
}

function normalizeSocketError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }
  return new Error("Socket connection failed.");
}

function withAckTimeout<T>(
  promiseFactory: () => Promise<T>,
  timeoutMs: number,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeoutHandle = globalThis.setTimeout(() => {
      reject(new Error("Socket acknowledgment timeout."));
    }, timeoutMs);

    promiseFactory()
      .then((result) => {
        globalThis.clearTimeout(timeoutHandle);
        resolve(result);
      })
      .catch((error) => {
        globalThis.clearTimeout(timeoutHandle);
        reject(error);
      });
  });
}

export class ChatSocketClient {
  private socket: Socket | null = null;
  private listeners: ChatSocketEvents = {};

  connect() {
    if (typeof window === "undefined") {
      return;
    }

    if (this.socket?.connected) {
      return;
    }

    const url = getBackendUrl();
    if (!url) {
      throw new Error("NEXT_PUBLIC_API_URL is not configured.");
    }

    this.socket = io(url, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    this.socket.on("connect", () => {
      this.listeners.onConnect?.();
    });

    this.socket.on("disconnect", (reason) => {
      this.listeners.onDisconnect?.(reason);
    });

    this.socket.on("connect_error", (error) => {
      this.listeners.onConnectError?.(normalizeSocketError(error));
    });

    this.socket.on("chat:started", (chat: Chat) => {
      this.listeners.onChatStarted?.(chat);
    });

    this.socket.on("message:new", (message) => {
      this.listeners.onMessageNew?.(message);
    });
  }

  disconnect() {
    this.socket?.removeAllListeners();
    this.socket?.disconnect();
    this.socket = null;
  }

  isConnected() {
    return Boolean(this.socket?.connected);
  }

  setListeners(listeners: ChatSocketEvents) {
    this.listeners = listeners;
  }

  async startChat(
    payload: StartChatRequest,
    timeoutMs = DEFAULT_ACK_TIMEOUT_MS,
  ): Promise<StartChatAck> {
    return this.emitWithAck<StartChatAck>("chat:start", payload, timeoutMs);
  }

  async listChats(
    payload: SocketListChatsRequest = {},
    timeoutMs = DEFAULT_ACK_TIMEOUT_MS,
  ): Promise<ListChatsAck> {
    return this.emitWithAck<ListChatsAck>("chat:list", payload, timeoutMs);
  }

  async listMessages(
    payload: SocketListMessagesRequest,
    timeoutMs = DEFAULT_ACK_TIMEOUT_MS,
  ): Promise<ListMessagesAck> {
    return this.emitWithAck<ListMessagesAck>(
      "chat:messages",
      payload,
      timeoutMs,
    );
  }

  async sendMessage(
    payload: SendMessageRequest,
    timeoutMs = DEFAULT_ACK_TIMEOUT_MS,
  ): Promise<SendMessageAck> {
    return this.emitWithAck<SendMessageAck>("message:send", payload, timeoutMs);
  }

  private async emitWithAck<TAck>(
    event: string,
    payload: object,
    timeoutMs: number,
  ): Promise<TAck> {
    if (!this.socket) {
      throw new Error("Socket is not connected.");
    }

    return withAckTimeout<TAck>(
      () =>
        new Promise<TAck>((resolve) => {
          this.socket?.emit(event, payload, (response: TAck) => {
            resolve(response);
          });
        }),
      timeoutMs,
    );
  }
}

export const chatSocketClient = new ChatSocketClient();
