// Interface untuk satu data merek kendaraan dari API
export interface VehicleMake {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

// Interface untuk keseluruhan response dari API
export interface VehicleMakeResponse {
  Count: number;
  Message: string;
  Results: VehicleMake[];
}
