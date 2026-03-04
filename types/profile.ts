export interface CurrentUser {
  id: number;
  email: string;
  username: string;
}

export interface UserProfile {
  id: number;
  email?: string;
  username?: string;
  firstName: string;
  familyName: string;
  address: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
  profileImage?: string;
  [key: string]: unknown;
}

export interface UpdateUserProfileRequest {
  username: string;
  firstName: string;
  familyName: string;
  address: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
  profileImage?: string;
}

export interface DashboardAnalytics {
  totalPosted: number;
  totalSold: number;
  totalGivenAway: number;
  totalRented: number;
  activeItems: number;
}

export type DashboardItemStatus = "published" | "deleted" | "expired" | "sold";

export interface DashboardItem {
  id: string;
  title: string;
  categoryId: string;
  category: string;
  brandName: string;
  condition: string;
  description: string;
  address: string;
  cityId: string;
  city: string;
  itemType: string;
  sellingPrice: string;
  lendingPrice: string;
  rentUnit: string;
  photos: { url: string; isMain: boolean }[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardItemsResponse {
  items: DashboardItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DashboardRating {
  id?: number;
  rating: number;
  comment?: string;
  createdAt?: string;
  reviewer?: string;
  [key: string]: unknown;
}

export interface DashboardRatingsResponse {
  overallRating: number;
  totalRatings: number;
  ratings: DashboardRating[];
}

export interface NotificationItem {
  id: number;
  title?: string;
  message?: string;
  isRead?: boolean;
  createdAt?: string;
  [key: string]: unknown;
}

export interface NotificationsResponse {
  notifications: NotificationItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DashboardItemsQuery {
  status?: DashboardItemStatus;
  page?: number;
  limit?: number;
}

export interface NotificationsQuery {
  unreadOnly?: boolean;
  page?: number;
  limit?: number;
}

export interface SavedSearch {
  id: number;
  searchTerms: string[];
  email?: boolean;
  in_app?: boolean;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface SavedSearchesResponse {
  savedSearches: SavedSearch[];
}

export interface ProfileListingItem {
  id: string;
  title: string;
  description: string;
  price: number;
  priceType: "selling" | "lending" | "unknown";
  imageSrc: string;
  status: DashboardItemStatus;
}

export interface CreateSavedSearchRequest {
  searchTerms: string[];
  email?: boolean;
  in_app?: boolean;
}

export interface UpdateSavedSearchRequest {
  email?: boolean;
  in_app?: boolean;
}
