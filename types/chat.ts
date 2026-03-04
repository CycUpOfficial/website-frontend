export interface ChatItemSnapshot {
  id: string;
  title: string;
  itemType: string;
  sellingPrice: number | null;
  lendingPrice: number | null;
  rentUnit: string | null;
  city: string | null;
  mainImage: string | null;
  ownerId: string;
}

export interface Chat {
  id: string;
  item: ChatItemSnapshot | null;
  participants: string[];
  lastMessageAt: string | null;
  lastMessagePreview: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ChatFileAttachment {
  url: string;
  name: string;
  size: number;
  mimeType: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string | null;
  file: ChatFileAttachment | null;
  createdAt: string;
}

export interface ChatPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ListChatsRequest {
  page?: number;
  limit?: number;
}

export interface ListChatsResponse {
  chats: Chat[];
  pagination: ChatPagination;
}

export interface ListChatMessagesRequest {
  limit?: number;
  before?: string | null;
}

export interface ListChatMessagesResponse {
  messages: Message[];
  nextCursor: string | null;
}

export interface StartChatRequest {
  itemId: string;
  otherUserId: string;
}

export interface SocketListChatsRequest {
  page?: number;
  limit?: number;
}

export interface SocketListMessagesRequest {
  chatId: string;
  limit?: number;
  before?: string | null;
}

export type BinaryData = ArrayBuffer | Uint8Array | string;

export interface SendMessageFileInput {
  data: BinaryData;
  name: string;
  mimeType: string;
}

export interface SendMessageRequest {
  chatId: string;
  text?: string | null;
  file?: SendMessageFileInput | null;
}

export interface SocketError {
  message: string;
}

export type SocketAck<TSuccess> =
  | ({ ok: true } & TSuccess)
  | { ok: false; error: SocketError };

export type StartChatAck = SocketAck<{ chat: Chat }>;
export type ListChatsAck = SocketAck<ListChatsResponse>;
export type ListMessagesAck = SocketAck<ListChatMessagesResponse>;
export type SendMessageAck = SocketAck<{ message: Message }>;
