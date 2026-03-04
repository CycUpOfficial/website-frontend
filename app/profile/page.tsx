import { ProfileTemplate } from "@/components/atomic/templates";
import { getUserAnalytics } from "@/services";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchUserAnalytics() {
  if (!API_URL) {
    return null;
  }

  try {
    const cookieHeader = (await cookies()).toString();
    const response = await getUserAnalytics({
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });
    console.log("🚀 ~ fetchUserAnalytics ~ response:", response);

    if (!response.success) {
      return null;
    }

    return response.data;
  } catch (error) {
    return null;
  }
}

export default async function ProfilePage() {
  const analytics = await fetchUserAnalytics();
  console.log("🚀 ~ ProfilePage ~ analytics:", analytics);

  // const analytics = {
  //   totalPosted: 0,
  //   totalSold: 0,
  //   totalGivenAway: 0,
  //   totalRented: 0,
  //   activeItems: 0,
  // };

  return <ProfileTemplate analytics={analytics!} />;
}
