export interface OfferResponseDTO {
  id: string;
  aircraftId: string;
  aircraftName: string;
  providerId: string;
  offerCode: string;
  description: string;
  discountPercentage: number;
  minimumAmount: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  usageCount: number;
  usageLimit?: number;
  isEditable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedOffersResponseDTO {
  offers: OfferResponseDTO[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export interface CreateOfferDTO {
  aircraftId: string;
  offerCode: string;
  description: string;
  discountPercentage: number;
  minimumAmount: number;
  validFrom: string;
  validTo: string;
  usageLimit?: number;
}

export interface UpdateOfferDTO {
  description?: string;
  validFrom?: string;
  validTo?: string;
  isActive?: boolean;
  offerCode?: string;
  discountPercentage?: number;
  minimumAmount?: number;
  usageLimit?: number;
}