import { ItemSummary, SearchItemsQuery, SampleProduct } from "@/types";
import {
  getQueryValue,
  parseNumber,
  parsePositiveInt,
  SearchParamValue,
} from "@/lib/utils";

export const ITEMS_PER_PAGE = 16;

export function buildSearchItemsQuery(
  params: Record<string, SearchParamValue>,
  itemsPerPage: number = ITEMS_PER_PAGE,
): { query: SearchItemsQuery; currentPage: number } {
  const currentPage = parsePositiveInt(getQueryValue(params.page)) ?? 1;

  const itemType = getQueryValue(params.itemType);
  const condition = getQueryValue(params.condition);
  const sortBy = getQueryValue(params.sortBy);
  const sortOrder = getQueryValue(params.sortOrder);
  const categoryId = parsePositiveInt(getQueryValue(params.categoryId));

  const query: SearchItemsQuery = {
    search: getQueryValue(params.search),
    categoryId,
    city: getQueryValue(params.city),
    itemType:
      itemType === "selling" ||
      itemType === "lending" ||
      itemType === "giveaway"
        ? itemType
        : undefined,
    condition:
      condition === "used" || condition === "new" ? condition : undefined,
    minPrice: parseNumber(getQueryValue(params.minPrice)),
    maxPrice: parseNumber(getQueryValue(params.maxPrice)),
    sortBy: sortBy === "price" || sortBy === "date" ? sortBy : undefined,
    sortOrder:
      sortOrder === "asc" || sortOrder === "desc" ? sortOrder : undefined,
    page: currentPage,
    limit: itemsPerPage,
  };

  return { query, currentPage };
}

export function mapItemsToSampleProducts(
  items: ItemSummary[] = [],
): SampleProduct[] {
  return items.map((item) => {
    const images = item.photos?.length
      ? item.photos.map((photo: { url: string }) => ({
          src: photo.url,
          alt: `${item.title} image`,
        }))
      : [{ src: "/winter-jacket.png", alt: `${item.title} image` }];

    const price = item.sellingPrice ?? item.lendingPrice ?? item.price ?? 0;
    const ownerName =
      item.owner?.username ||
      `${item.owner?.firstName ?? ""} ${item.owner?.familyName ?? ""}`.trim() ||
      "seller";

    return {
      id: String(item.id),
      slug: item.slug ?? String(item.id),
      title: item.title,
      description: item.description ?? "",
      images,
      price: +price,
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
