import type {
  ApiResponse,
  ListChatMessagesRequest,
  ListChatMessagesResponse,
  ListChatsRequest,
  ListChatsResponse,
} from "@/types";
import { buildQuery, requestJson } from "./request";

export async function getChats(
  query?: ListChatsRequest,
  options?: RequestInit,
): Promise<ApiResponse<ListChatsResponse>> {
  const search = buildQuery(query);
  return requestJson<ListChatsResponse>(`/chats${search}`, {
    method: "GET",
    cache: "no-store",
    ...(options ?? {}),
    headers: {
      ...(options?.headers ?? {}),
    },
  });
}

export async function getChatMessages(
  chatId: string,
  query?: ListChatMessagesRequest,
  options?: RequestInit,
): Promise<ApiResponse<ListChatMessagesResponse>> {
  const search = buildQuery(query);
  return requestJson<ListChatMessagesResponse>(
    `/chats/${chatId}/messages${search}`,
    {
      method: "GET",
      cache: "no-store",
      ...(options ?? {}),
      headers: {
        ...(options?.headers ?? {}),
      },
    },
  );
}
