import { ListingsTemplate } from "@/components/atomic/templates";
import { getUserAnalytics, getUserItems } from "@/services";
import {
  DashboardItem,
  DashboardItemStatus,
  ProfileListingItem,
} from "@/types";
import { cookies } from "next/headers";

const LISTINGS_LIMIT = 20;

type DashboardListingSource = DashboardItem & {
  slug?: string;
  description?: string;
  city?: string;
  address?: string;
  sellingPrice?: number;
  lendingPrice?: number;
  price?: number;
  photos?: Array<{ url: string }>;
  owner?: {
    username?: string;
    firstName?: string;
    familyName?: string;
    profilePic?: string;
    university?: string;
    location?: string;
  };
};

function toDashboardItemStatus(status: string): DashboardItemStatus {
  if (
    status === "published" ||
    status === "deleted" ||
    status === "expired" ||
    status === "sold"
  ) {
    return status;
  }

  return "published";
}

function toNumber(value: string | number | undefined): number {
  if (typeof value === "number") {
    return value;
  }

  if (!value) {
    return 0;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function mapItemsToListings(items: DashboardItem[] = []): ProfileListingItem[] {
  return items.map((rawItem) => {
    const item = rawItem as DashboardListingSource;
    const sellingPrice = toNumber(item.sellingPrice);
    const lendingPrice = toNumber(item.lendingPrice);
    const fallbackPrice = toNumber(item.price);
    const priceType =
      sellingPrice > 0 ? "selling" : lendingPrice > 0 ? "lending" : "unknown";

    return {
      id: String(item.id),
      title: item.title ?? "Untitled item",
      description: item.description ?? "",
      price: sellingPrice || lendingPrice || fallbackPrice,
      priceType,
      imageSrc: item.photos?.[0]?.url ?? "/winter-jacket.png",
      status: toDashboardItemStatus(item.status),
    };
  });
}

export default async function ListingsPage() {
  const cookieHeader = (await cookies()).toString();
  const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;

  const [itemsResponse, analyticsResponse] = await Promise.all([
    getUserItems({ page: 1, limit: LISTINGS_LIMIT }, { headers: authHeaders }),
    getUserAnalytics({ headers: authHeaders }),
  ]);

  console.log(
    "🚀 ~ ListingsPage ~ itemsResponse.data.items:",
    itemsResponse.data.items[0].photos,
  );
  const listings = itemsResponse.success
    ? mapItemsToListings(itemsResponse.data.items)
    : [];

  const stats = {
    donated: analyticsResponse.success
      ? analyticsResponse.data.totalGivenAway
      : 0,
    posted: analyticsResponse.success ? analyticsResponse.data.totalPosted : 0,
    sold: analyticsResponse.success ? analyticsResponse.data.totalSold : 0,
  };

  return <ListingsTemplate listings={listings} stats={stats} />;
}
