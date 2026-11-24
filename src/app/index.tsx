import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  getMotorcycleMakes,
  getMotorcycleMakesWithThen,
  getVehicleMakes,
  getVehicleMakesOrEmpty,
} from "../services/vehicleApi";

import { styles } from "../styles";
import type { VehicleMake } from "../types/vehicle";

type VehicleType = "Motor" | "Mobil";
type ServiceFilter = "Semua" | VehicleType;

interface Service {
  id: number;
  name: string;
  category: VehicleType;
  price: number;
  duration: string;
  color: string;
}

// Daftar layanan Bengkelin
const services: Service[] = [
  {
    id: 1,
    name: "Ganti Oli Motor",
    category: "Motor",
    price: 75000,
    duration: "30 Menit",
    color: "#00fbde",
  },
  {
    id: 2,
    name: "Ganti Oli Mobil",
    category: "Mobil",
    price: 375000,
    duration: "30 Menit",
    color: "#00fbde",
  },
  {
    id: 3,
    name: "Servis Berkala",
    category: "Motor",
    price: 150000,
    duration: "1 Jam",
    color: "#c507a2",
  },
  {
    id: 4,
    name: "Tune Up",
    category: "Mobil",
    price: 350000,
    duration: "2 Jam",
    color: "#3e0be3",
  },
  {
    id: 5,
    name: "Ganti Roda",
    category: "Motor",
    price: 250000,
    duration: "45 Menit",
    color: "#f50b0b",
  },
];

// Fungsi mengubah angka menjadi format Rupiah
function formatPrice(price: number) {
  return "Rp" + price.toLocaleString("id-ID");
}
export default function HomeScreen() {
  // menyimpan kata kunci pencarian menggunakan useState
  const [keyword, setKeyword] = useState("");

  // menyimpan kategori filter yang dipilih
  const [activeFilter, setActiveFilter] = useState<ServiceFilter>("Semua");

  // menyimpan hasil filter layanan
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);

  // memperbarui daftar layanan saat keyword atau filter berubah

  // Filter tampilan merek kendaraan
  const [activeVehicleFilter, setActiveVehicleFilter] =
    useState<VehicleType>("Mobil");

  // Data merek mobil dari API
  const [vehicleMakes, setVehicleMakes] = useState<VehicleMake[]>([]);

  // Data merek motor dari API
  const [motorcycleMakes, setMotorcycleMakes] = useState<VehicleMake[]>([]);

  // Merek mobil yang dipilih
  const [selectedCar, setSelectedCar] = useState<VehicleMake | null>(null);

  // Merek motor yang dipilih
  const [selectedMotor, setSelectedMotor] = useState<VehicleMake | null>(null);

  // Status loading API
  const [loading, setLoading] = useState(true);

  // Pesan error API
  const [errorMessage, setErrorMessage] = useState("");

  // Filter layanan berdasarkan pencarian dan kategori
  useEffect(() => {
    const result = services.filter((service) => {
      const matchesKeyword = service.name
        .toLowerCase()
        .includes(keyword.toLowerCase());

      const matchesCategory =
        activeFilter === "Semua" || service.category === activeFilter;

      return matchesKeyword && matchesCategory;
    });

    setFilteredServices(result);
  }, [keyword, activeFilter]);

  // pilihan kategori filter
  // Mengambil data merek mobil dan motor dari API
  // Fungsi ini tetap mempertahankan alur loading, error, dan state sebelumnya.
  const loadVehicleMakes = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      // 1. CUSTOM ASYNC FUNCTION + PRE-BUILT PROMISE.ALL
      const [carsAsync, motorcyclesAsync] = await Promise.all([
        getVehicleMakes().catch((error: unknown) => {
          console.error(
            "Gagal mengambil data mobil dengan async/await:",
            error,
          );
          return Promise.resolve<VehicleMake[]>([]);
        }),
        getMotorcycleMakes().catch((error: unknown) => {
          console.error(
            "Gagal mengambil data motor dengan async/await:",
            error,
          );
          return Promise.resolve<VehicleMake[]>([]);
        }),
      ]);

      // 2. PRE-BUILT FETCH + PROMISE .THEN()
      const [carsThen, motorcyclesThen] = await Promise.all([
        getVehicleMakesOrEmpty(),
        getMotorcycleMakesWithThen().catch((error: unknown) => {
          console.error("Gagal mengambil data motor dengan .then():", error);

          // Promise.resolve() mengembalikan Promise yang berhasil
          // dengan nilai cadangan berupa array kosong.
          return Promise.resolve<VehicleMake[]>([]);
        }),
      ]);

      // 3. MENYIMPAN DATA KE DALAM STATE
      const finalCars = carsAsync.length > 0 ? carsAsync : carsThen;
      const finalMotorcycles =
        motorcyclesAsync.length > 0 ? motorcyclesAsync : motorcyclesThen;

      setVehicleMakes(finalCars);
      setMotorcycleMakes(finalMotorcycles);

      // Menampilkan jumlah data dari kedua pendekatan di console.
      console.log("=== HASIL ASYNC/AWAIT ===");
      console.log("Jumlah merek mobil:", carsAsync.length);
      console.log("Jumlah merek motor:", motorcyclesAsync.length);

      console.log("=== HASIL .THEN() ===");
      console.log("Jumlah merek mobil:", carsThen.length);
      console.log("Jumlah merek motor:", motorcyclesThen.length);

      // Jika kedua pendekatan sama-sama tidak mendapatkan data,
      // tampilkan pesan agar pengguna dapat mencoba kembali.
      if (finalCars.length === 0 && finalMotorcycles.length === 0) {
        setErrorMessage(
          "Data kendaraan tidak tersedia. Periksa koneksi internet lalu coba lagi.",
        );
      }
    } catch (error) {
      // Menangani error yang tidak tertangani oleh catch masing-masing request.
      console.error("Kesalahan mengambil data kendaraan:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengambil data",
      );
    } finally {
      // Loading selalu dihentikan setelah seluruh proses selesai.
      setLoading(false);
    }
  };

  // Mengambil data saat halaman pertama dibuka
  useEffect(() => {
    loadVehicleMakes();
  }, []);

  // Memilih merek mobil
  const handleSelectCar = (vehicle: VehicleMake) => {
    setSelectedCar(vehicle);

    Alert.alert("Kendaraan Dipilih", `Merek mobil: ${vehicle.MakeName}`);
  };

  // Memilih merek motor
  const handleSelectMotor = (vehicle: VehicleMake) => {
    setSelectedMotor(vehicle);

    Alert.alert("Kendaraan Dipilih", `Merek motor: ${vehicle.MakeName}`);
  };

  // Filter kategori layanan
  const filters: ServiceFilter[] = ["Semua", "Motor", "Mobil"];

  // Filter kategori kendaraan
  const vehicleFilters: VehicleType[] = ["Mobil", "Motor"];

  return (
    <ScrollView style={styles.container}>
      {/* HEADER BENGKELIN */}
      <View style={styles.header}>
        <Text style={styles.logo}>Bengkelin</Text>
        <Text style={styles.subtitle}>Solusi servis kendaraan kamu</Text>
      </View>

      {/* kolom pencarian layanan */}
      {/* INFORMASI MEREK KENDARAAN */}
      <View style={styles.card}>
        <Text style={styles.serviceName}>Informasi Merek Kendaraan</Text>

        <Text style={styles.duration}>
          Pilih jenis kendaraan untuk melihat daftar mereknya.
        </Text>

        {/* FILTER MOBIL DAN MOTOR */}
        <View style={styles.filterRow}>
          {vehicleFilters.map((filter) => (
            <Pressable
              key={filter}
              style={[
                styles.filterButton,
                activeVehicleFilter === filter && styles.activeFilterButton,
              ]}
              onPress={() => setActiveVehicleFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeVehicleFilter === filter && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* KONDISI LOADING */}
        {loading ? (
          <View
            style={{
              padding: 15,
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#333" />

            <Text style={{ marginTop: 10 }}>
              Sedang mengambil data dari server...
            </Text>
          </View>
        ) : errorMessage ? (
          /* KONDISI ERROR */
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: "red" }}>{errorMessage}</Text>

            <Pressable style={styles.button} onPress={loadVehicleMakes}>
              <Text style={styles.buttonText}>Coba Lagi</Text>
            </Pressable>
          </View>
        ) : (
          /* DATA KENDARAAN */
          <View style={{ marginTop: 15 }}>
            {/* FILTER MOBIL */}
            {activeVehicleFilter === "Mobil" && (
              <View>
                <Text style={[styles.serviceName, { marginBottom: 10 }]}>
                  Daftar Merek Mobil
                </Text>

                {vehicleMakes.length > 0 ? (
                  vehicleMakes.slice(0, 12).map((vehicle) => (
                    <Pressable
                      key={vehicle.MakeId}
                      onPress={() => handleSelectCar(vehicle)}
                      style={{
                        padding: 12,
                        marginBottom: 8,
                        borderRadius: 8,
                        borderWidth: 1,
                        backgroundColor:
                          selectedCar?.MakeId === vehicle.MakeId
                            ? "#d1e7dd"
                            : "#f2f2f2",
                        borderColor:
                          selectedCar?.MakeId === vehicle.MakeId
                            ? "#198754"
                            : "#dddddd",
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>
                        {vehicle.MakeName}
                      </Text>

                      <Text
                        style={{
                          fontSize: 12,
                          color: "#666",
                        }}
                      >
                        {selectedCar?.MakeId === vehicle.MakeId
                          ? "Merek dipilih"
                          : "Tekan untuk memilih"}
                      </Text>
                    </Pressable>
                  ))
                ) : (
                  <Text style={styles.duration}>
                    Data merek mobil tidak ditemukan.
                  </Text>
                )}

                {/* MOBIL YANG DIPILIH */}
                {selectedCar && (
                  <Text style={{ marginTop: 5 }}>
                    Mobil pilihan: {selectedCar.MakeName}
                  </Text>
                )}
              </View>
            )}

            {/* FILTER MOTOR */}
            {activeVehicleFilter === "Motor" && (
              <View>
                <Text style={[styles.serviceName, { marginBottom: 10 }]}>
                  Daftar Merek Motor
                </Text>

                {motorcycleMakes.length > 0 ? (
                  motorcycleMakes.slice(0, 12).map((motor) => (
                    <Pressable
                      key={motor.MakeId}
                      onPress={() => handleSelectMotor(motor)}
                      style={{
                        padding: 12,
                        marginBottom: 8,
                        borderRadius: 8,
                        borderWidth: 1,
                        backgroundColor:
                          selectedMotor?.MakeId === motor.MakeId
                            ? "#d1e7dd"
                            : "#f2f2f2",
                        borderColor:
                          selectedMotor?.MakeId === motor.MakeId
                            ? "#198754"
                            : "#dddddd",
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>
                        {motor.MakeName}
                      </Text>

                      <Text
                        style={{
                          fontSize: 12,
                          color: "#666",
                        }}
                      >
                        {selectedMotor?.MakeId === motor.MakeId
                          ? "Merek dipilih"
                          : "Tekan untuk memilih"}
                      </Text>
                    </Pressable>
                  ))
                ) : (
                  <Text style={styles.duration}>
                    Data merek motor tidak ditemukan.
                  </Text>
                )}

                {/* MOTOR YANG DIPILIH */}
                {selectedMotor && (
                  <Text style={{ marginTop: 5 }}>
                    Motor pilihan: {selectedMotor.MakeName}
                  </Text>
                )}
              </View>
            )}
          </View>
        )}
      </View>

      {/* PENCARIAN LAYANAN */}
      <Text style={styles.sectionTitle}>Cari Layanan Servis</Text>

      <TextInput
        style={styles.searchInput}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Contoh: ganti oli..."
      />

      {/* tombol filter berdasarkan jenis kendaraan */}
      {/* FILTER LAYANAN */}
      <View style={styles.filterRow}>
        {filters.map((filter) => (
          <Pressable
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.activeFilterButton,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* menampilkan jumlah layanan hasil filter */}
      {/* JUMLAH LAYANAN */}
      <View style={styles.listHeading}>
        <Text style={styles.sectionTitle}>Layanan Bengkel</Text>

        <Text style={styles.resultCount}>
          {filteredServices.length} layanan
        </Text>
      </View>

      {/* menampilkan layanan yang sudah difilter */}
      {/* DAFTAR LAYANAN */}
      {filteredServices.length > 0 ? (
        filteredServices.map((service) => (
          <View key={service.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.serviceName}>{service.name}</Text>

              <Text style={styles.category}>{service.category}</Text>
            </View>

            <Text style={styles.duration}>Durasi: {service.duration}</Text>

            <Text style={styles.price}>{formatPrice(service.price)}</Text>

            {/* router.push membuka halaman booking dan mengirim parameter layanan */}
            {/* TOMBOL BOOKING */}
            <Pressable
              style={styles.button}
              onPress={() => {
                // Mengambil merek sesuai kategori layanan
                const selectedVehicle =
                  service.category === "Mobil" ? selectedCar : selectedMotor;

                // Memastikan merek sudah dipilih
                if (!selectedVehicle) {
                  Alert.alert(
                    "Pilih Kendaraan",
                    `Silakan pilih merek ${service.category.toLowerCase()} terlebih dahulu.`,
                  );

                  return;
                }

                // Mengirim data ke halaman booking
                router.push({
                  pathname: "/booking",
                  params: {
                    service: service.name,
                    category: service.category,
                    price: String(service.price),
                    duration: service.duration,
                    vehicleMake: selectedVehicle.MakeName,
                  },
                });
              }}
            >
              <Text style={styles.buttonText}>Booking Sekarang</Text>
            </Pressable>
          </View>
        ))
      ) : (
        // tampilan saat layanan tidak ditemukan
        /* JIKA LAYANAN TIDAK DITEMUKAN */
        <View style={styles.card}>
          <Text style={styles.serviceName}>Layanan tidak ditemukan</Text>

          <Text style={styles.duration}>Coba kata kunci yang lain.</Text>
        </View>
      )}

      {/* FOOTER BENGKELIN */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Bengkelin © 2026</Text>

        <Text style={styles.footerSubText}>
          Servis mudah, kendaraan nyaman.
        </Text>
      </View>
    </ScrollView>
  );
}
