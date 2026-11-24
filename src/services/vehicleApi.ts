import type { VehicleMake, VehicleMakeResponse } from "../types/vehicle";

// ==========================================
// 1. EXTERNAL API
// ==========================================

// API untuk mengambil daftar merek mobil
const CAR_API =
  "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json";

// API untuk mengambil daftar merek motor
const MOTOR_API =
  "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/motorcycle?format=json";

// Fungsi async buatan sendiri untuk mengambil data API
export async function fetchVehicleMakes(url: string): Promise<VehicleMake[]> {
  // Mengirim request ke External API menggunakan fetch()
  const response = await fetch(url);

  // Memeriksa apakah request berhasil
  if (!response.ok) {
    throw new Error("Gagal mengambil data kendaraan");
  }

  // Mengubah response API menjadi JSON
  const data: VehicleMakeResponse = await response.json();

  // Memastikan data Results berbentuk array
  if (!Array.isArray(data.Results)) {
    throw new Error("Format data API tidak valid");
  }

  // Mengembalikan data berupa array Object
  return data.Results;
}

// Mengambil data merek mobil menggunakan async function
export function getVehicleMakes(): Promise<VehicleMake[]> {
  return fetchVehicleMakes(CAR_API);
}

// Mengambil data merek motor menggunakan async function
export function getMotorcycleMakes(): Promise<VehicleMake[]> {
  return fetchVehicleMakes(MOTOR_API);
}

// Fungsi untuk memvalidasi data menggunakan Promise
export function validateVehicleResponse(
  data: VehicleMakeResponse,
): Promise<VehicleMake[]> {
  return new Promise<VehicleMake[]>((resolve, reject) => {
    // Jika data Results tersedia dan berbentuk array
    if (data && Array.isArray(data.Results)) {
      // RESOLVE: Menandakan Promise berhasil
      resolve(data.Results);
    } else {
      // REJECT: Menandakan Promise gagal
      reject(new Error("Format data API tidak valid"));
    }
  });
}

// Mengambil data API menggunakan metode .then()
export function fetchVehicleMakesWithThen(url: string): Promise<VehicleMake[]> {
  return (
    fetch(url)
      // THEN PERTAMA: Memeriksa response dari API
      .then((response) => {
        // Jika HTTP response gagal
        if (!response.ok) {
          // Promise.reject mengirimkan error ke catch()
          return Promise.reject(new Error("Gagal mengambil data kendaraan"));
        }

        // Mengubah response menjadi JSON
        return response.json() as Promise<VehicleMakeResponse>;
      })

      // THEN KEDUA: Memvalidasi data menggunakan resolve/reject
      .then((data) => {
        return validateVehicleResponse(data);
      })
  );
}

// Mengambil daftar merek mobil dengan .then()
export function getVehicleMakesWithThen(): Promise<VehicleMake[]> {
  return fetchVehicleMakesWithThen(CAR_API);
}

// Mengambil daftar merek motor dengan .then()
export function getMotorcycleMakesWithThen(): Promise<VehicleMake[]> {
  return fetchVehicleMakesWithThen(MOTOR_API);
}

// Fungsi untuk mengambil data mobil dengan nilai cadangan
export function getVehicleMakesOrEmpty(): Promise<VehicleMake[]> {
  return (
    getVehicleMakesWithThen()
      // Jika berhasil, kembalikan data menggunakan Promise.resolve()
      .then((data) => {
        console.log("Data mobil berhasil diambil");

        return Promise.resolve<VehicleMake[]>(data);
      })

      // Jika gagal, error ditangani menggunakan catch()
      .catch((error: unknown) => {
        console.error("Terjadi kesalahan:", error);

        // Mengembalikan array kosong sebagai nilai cadangan
        return Promise.resolve<VehicleMake[]>([]);
      })
  );
}
