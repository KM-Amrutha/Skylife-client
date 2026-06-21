
export interface Aircraft {
  id: string;
  providerId: string;
  aircraftType: string;
  aircraftName: string;
  manufacturer: string;
  buildYear: number;
  seatCapacity: number;
  seatLayoutType: string;
  flyingRangeKm: number;
  engineCount: number;
  lavatoryCount: number;
  baseStation?: {
    id: string;
    name: string;
    city?: string;
    country?: string;
  };

  currentLocation?: {
    id: string;
    name: string;
    city?: string;
    country?: string;
  };
  availableFrom: Date;
  status: "active" | "inactive" | "maintenance";
  createdAt: Date;
  updatedAt: Date;
}


export interface AircraftPagination {
  totalPages: number;
  currentPage: number;
}


export interface CreateAircraftDTO {
  providerId: string;
  aircraftType: string;
  aircraftName: string;
  manufacturer: string;
  buildYear: number|'';
  seatCapacity: number|'';
  flyingRangeKm: number|'';
  engineCount: number|'';
  lavatoryCount: number|'';
  baseStationId: string;
  currentLocationId: string;
  availableFrom: Date;
  status: "active" | "inactive" | "maintenance";
}