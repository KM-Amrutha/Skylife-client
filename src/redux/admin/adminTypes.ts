import { User, Provider } from "../auth/authTypes";

export interface AdminState {
  users: User[];
  providers: Provider[];
  pendingProviders: Provider[];

  isLoading: boolean;
  error: string | null;

  userDetails: User | {};
  providerDetails: Provider | {};

  pagination: Pagination | null;

  dashboardStats: AdminDashboardStats | null;
  isLoadingDashboard: boolean;
  dashboardError: string | null;

  adminWallet: AdminWallet | null;
  isLoadingAdminWallet: boolean;
  adminWalletError: string | null;

  isSettingCommission: boolean;
  commissionError: string | null;
}

export interface Pagination {
  page: number; 
  limit: number;
  totalPages: number; 
  pages: number;  
  hasNext: boolean;   
  hasPrev: boolean;  
}


export interface RequestVerifyProvider {
  providerId: string;
}

export interface RequestRejectProvider {
  providerId: string;
  reason: string;
}
export interface GetAllProvidersResponse {
  providers: Provider[];  
}
export interface UpdateProviderStatusRequest {
  providerId: string;
  isActive: boolean;
}

export interface GetAllUsersResponse {
  users: User[];
}

export interface UpdateUserStatusRequest {
  userId: string;
  isActive: boolean;
} 
export interface AdminDashboardStats {
  totalConfirmedBookings: number;
  totalRevenue: number;
  totalCommission: number;
  totalUsers: number;
  totalProviders: number;
  monthlyStats: {
    month: string;
    bookings: number;
    revenue: number;
  }[];
}

export interface AdminWalletTransaction {
  transactionId: string;
  type: "credit";
  amount: number;
  description: string;
  bookingId?: string;
  providerId?: string;
  commissionRate: number;
  createdAt: string;
}

export interface AdminWallet {
  id: string;
  balance: number;
  transactions: AdminWalletTransaction[];
  createdAt: string;
  updatedAt: string;
}