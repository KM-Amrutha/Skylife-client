export interface FoodResponseDTO {
  id: string;
  aircraftId: string;
  aircraftName?: string;
  providerId: string;
  foodName: string;
  foodType: string;
  vegNonveg: "veg" | "non-veg";
  serveMethod: string;
  isComplimentary: boolean;
  foodPrice: number;
  image: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedFoodResponseDTO {
  foods: FoodResponseDTO[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export interface CreateFoodDTO {
  aircraftId: string;
  foodName: string;
  foodType: string;
  vegNonveg: "veg" | "non-veg";
  serveMethod: string;
  isComplimentary: boolean;
  foodPrice: number;
  image?: string; // base64
}

export interface UpdateFoodDTO {
  foodName?: string;
  foodType?: string;
  vegNonveg?: "veg" | "non-veg";
  serveMethod?: string;
  isComplimentary?: boolean;
  foodPrice?: number;
  image?: string; // base64
  isActive?: boolean;
}