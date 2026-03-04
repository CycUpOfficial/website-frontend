import { Container, ProfileSidebar } from "@/components/atomic/organisms";
import { cn } from "@/lib/utils";
import { getCurrentUserProfile } from "@/services";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getProfileUser() {
  if (!API_URL) {
    return null;
  }

  try {
    const cookieHeader = (await cookies()).toString();
    const response = await getCurrentUserProfile({
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });
    if (!response.success) {
      return null;
    }

    return response.data;
  } catch (error) {
    return null;
  }
}

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfileUser();
  const username =
    profile?.username ||
    (profile?.firstName && profile?.familyName
      ? `${profile.firstName} ${profile.familyName}`
      : undefined);

  return (
    <Container className={cn("w-full")}>
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[37.5%_1fr] lg:gap-[60px] my-16">
        <ProfileSidebar
          username={username}
          phoneNumber={profile?.phoneNumber}
          profileImage={profile?.profileImage}
        />
        <div className="min-w-0">{children}</div>
      </section>
    </Container>
  );
}
