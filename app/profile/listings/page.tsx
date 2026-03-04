import { ListingsTemplate } from "@/components/atomic/templates";
import { getUserAnalytics, getUserItems } from "@/services";
import { DashboardItem, SampleProduct } from "@/types";
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

function mapItemsToSampleProducts(
  items: DashboardItem[] = [],
): SampleProduct[] {
  return items.map((rawItem) => {
    const item = rawItem as DashboardListingSource;
    const images = item.photos?.length
      ? item.photos.map((photo) => ({
          src: photo.url,
          alt: `${item.title ?? "Item"} image`,
        }))
      : [{ src: "/winter-jacket.png", alt: `${item.title ?? "Item"} image` }];

    const ownerName =
      item.owner?.username ||
      `${item.owner?.firstName ?? ""} ${item.owner?.familyName ?? ""}`.trim() ||
      "seller";

    return {
      id: String(item.id),
      slug: item.slug ?? String(item.id),
      title: item.title ?? "Untitled item",
      description: item.description ?? "",
      images,
      price: +(item.sellingPrice ?? item.lendingPrice ?? item.price ?? 0),
      location: item.city ?? item.address ?? "Unknown location",
      owner: {
        username: ownerName,
        profilePic: item.owner?.profilePic ?? "/profiles/alex.png",
        university: item.owner?.university ?? "",
        location: item.owner?.location ?? item.city ?? "",
      },
    };
  });
}

export default async function ListingsPage() {
  const cookieHeader = (await cookies()).toString();
  const authHeaders = cookieHeader ? { cookie: cookieHeader } : undefined;

  const [itemsResponse, analyticsResponse] = await Promise.all([
    getUserItems(
      { page: 1, limit: LISTINGS_LIMIT },
      { headers: authHeaders },
    ),
    getUserAnalytics({ headers: authHeaders }),
  ]);

  const listings = itemsResponse.success
    ? mapItemsToSampleProducts(itemsResponse.data.items)
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
