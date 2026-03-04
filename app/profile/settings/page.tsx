import { ProfileSettingsForm } from "@/components/atomic/organisms";
import { getCities, getCurrentUserProfile } from "@/services";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchCurrentUserProfile(cookieHeader: string) {
  if (!API_URL) {
    return null;
  }

  try {
    const response = await getCurrentUserProfile({
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    if (!response.success) {
      return null;
    }

    return response.data;
  } catch {
    return null;
  }
}

async function fetchCities(cookieHeader: string) {
  if (!API_URL) {
    return [];
  }

  try {
    const response = await getCities({
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    if (!response.success) {
      return [];
    }

    return response.data.cities;
  } catch {
    return [];
  }
}

export default async function SettingsPage() {
  const cookieHeader = (await cookies()).toString();
  const [profile, cities] = await Promise.all([
    fetchCurrentUserProfile(cookieHeader),
    fetchCities(cookieHeader),
  ]);

  return <ProfileSettingsForm initialProfile={profile} cities={cities} />;
}
