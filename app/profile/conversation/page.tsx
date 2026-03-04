import { ConversationsPageTemplate } from "@/components/atomic/templates";
import { getChats } from "@/services";
import { cookies } from "next/headers";

export default async function ConversationsPage() {
  const cookieHeader = (await cookies()).toString();
  const chatsResponse = await getChats(
    {
      page: 1,
      limit: 50,
    },
    {
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    },
  );

  const chats = chatsResponse.success ? chatsResponse.data.chats : [];

  return <ConversationsPageTemplate initialChats={chats} />;
}
