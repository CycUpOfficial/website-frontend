import { ConversationDetailPageTemplate } from "@/components/atomic/templates";
import { getChatMessages, getChats } from "@/services";
import { cookies } from "next/headers";

interface ConversationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ConversationDetailPage({
  params,
}: ConversationDetailPageProps) {
  const { id } = await params;
  const cookieHeader = (await cookies()).toString();

  const [chatsResponse, messagesResponse] = await Promise.all([
    getChats(
      {
        page: 1,
        limit: 50,
      },
      {
        headers: cookieHeader ? { cookie: cookieHeader } : undefined,
      },
    ),
    getChatMessages(
      id,
      {
        limit: 50,
      },
      {
        headers: cookieHeader ? { cookie: cookieHeader } : undefined,
      },
    ),
  ]);

  return (
    <ConversationDetailPageTemplate
      chatId={id}
      initialChats={chatsResponse.success ? chatsResponse.data.chats : []}
      initialMessages={
        messagesResponse.success ? messagesResponse.data.messages : []
      }
    />
  );
}
