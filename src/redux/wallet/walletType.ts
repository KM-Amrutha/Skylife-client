export interface WalletTransaction {
  transactionId: string;
  type: "credit";
  amount: number;
  description: string;
  bookingId?: string;
  passengerId?: string;
  createdAt: string;
}

export interface UserWallet {
  id: string;
  userId: string;
  balance: number;
  transactions: WalletTransaction[];
  createdAt: string;
  updatedAt: string;
}

export interface ProviderWalletTransaction {
  transactionId: string;
  type: "credit";
  amount: number;
  description: string;
  bookingId?: string;
  flightId?: string;
  createdAt: string;
}

export interface ProviderWallet {
  id: string;
  providerId: string;
  balance: number;
  transactions: ProviderWalletTransaction[];
  createdAt: string;
  updatedAt: string;
}

