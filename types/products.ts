export interface IProduct {
  id: string;
  title: string;
  categoryId: string;
  category: string;
  brandName: string;
  condition: "used" | "new";
  description: string;
  address: string;
  cityId: string;
  city: string;
  itemType: "selling" | "lending" | "giveaway";
  sellingPrice: number;
  lendingPrice: number;
  rentUnit: "month" | "week" | "day" | "hour";
  photos: {
    url: string;
    isMain: boolean;
  }[];
  status: "published" | "pending";
  createdAt: string;
  updatedAt: string;
  owner: {
    id: string;
    firstName: string;
    familyName: string;
    email: string;
  };
}

export type ItemType = "selling" | "lending" | "giveaway";
export type ItemCondition = "used" | "new";

export interface ItemSummary {
  id: string;
  slug?: string;
  title: string;
  description?: string;
  city?: string;
  address?: string;
  itemType?: ItemType;
  condition?: ItemCondition;
  sellingPrice?: number;
  lendingPrice?: number;
  price?: number;
  photos?: {
    url: string;
    isMain?: boolean;
  }[];
  owner?: {
    username?: string;
    firstName?: string;
    familyName?: string;
    profilePic?: string;
    university?: string;
    location?: string;
  };
}

export interface ItemsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SearchItemsQuery {
  search?: string;
  categoryId?: number;
  city?: string;
  itemType?: ItemType;
  condition?: ItemCondition;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "date";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface SearchItemsResponse {
  items: ItemSummary[];
  pagination: ItemsPagination;
}

export interface ItemCategory {
  id: number;
  name: string;
}

export interface ItemCity {
  id: number;
  name: string;
}

export interface CategoriesResponse {
  categories: ItemCategory[];
}

export interface CitiesResponse {
  cities: ItemCity[];
}

export interface SampleProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  images: IProductImages[];
  price: number;
  location: string;
  owner: IProductOwner;
}

export interface IProductImages {
  src: string;
  alt: string;
}

export interface IProductOwner {
  username: string;
  profilePic: string;
  university: string;
  location: string;
}

export interface ICreateProductInput {
  title: string;
  categoryId: string;
  brandName: string;
  condition: "used" | "new";
  description: string;
  address: string;
  cityId: string;
  itemType: "selling" | "lending" | "giveaway";
  sellingPrice?: number;
  lendingPrice?: number;
  rentUnit?: "month" | "week" | "day" | "hour";
  photos?: string[];
  mainPhotoIndex?: 0 | 1 | 2;
}

export interface IUpdateProductInput extends Partial<ICreateProductInput> {
  id: string;
}
