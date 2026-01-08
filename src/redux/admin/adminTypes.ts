import { User, Provider } from "../auth/authTypes";

export interface AdminState {
  users: User[];
  providers: Provider[];
  pendingProviders: Provider[]; // For approval list
  isLoading: boolean;
  error: string | null;
  userDetails: User | {};
  providerDetails: Provider | {};
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