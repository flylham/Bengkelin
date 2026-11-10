import type { VehicleMake, VehicleMakeResponse } from "../types/vehicle";

// API untuk mengambil daftar merek mobil
const CAR_API =
  "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json";

// API untuk mengambil daftar merek motor
const MOTOR_API =
  "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/motorcycle?format=json";

// Fungsi untuk mengambil data berdasarkan URL API
async function fetchVehicleMakes(url: string): Promise<VehicleMake[]> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Gagal mengambil data kendaraan");
  }

  const data: VehicleMakeResponse = await response.json();

  if (!Array.isArray(data.Results)) {
    throw new Error("Format data API tidak valid");
  }

  return data.Results;
}

// Mengambil daftar merek mobil
export function getVehicleMakes(): Promise<VehicleMake[]> {
  return fetchVehicleMakes(CAR_API);
}

// Mengambil daftar merek motor
export function getMotorcycleMakes(): Promise<VehicleMake[]> {
  return fetchVehicleMakes(MOTOR_API);
}
