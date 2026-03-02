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
  id: number;
  status: DashboardItemStatus;
  title?: string;
  price?: number;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
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
