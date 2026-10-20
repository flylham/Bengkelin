import { router } from "expo-router"; // MODUL 2: navigasi antarhalaman
import { useEffect, useState } from "react"; // MODUL 2: menggunakan hook useState dan useEffect
import {
  Pressable,
  ScrollView,
  Text,
  TextInput, // MODUL 2: input untuk pencarian layanan
  View,
} from "react-native";
import { styles } from "../styles";

type VehicleType = "Motor" | "Mobil";
type ServiceFilter = "Semua" | VehicleType; // MODUL 2: tipe filter layanan

interface Service {
  id: number;
  name: string;
  category: VehicleType;
  price: number;
  duration: string;
  color: string;
}

// Data layanan dari Modul 1
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

function formatPrice(price: number) {
  return "Rp" + price.toLocaleString("id-ID");
}
export default function HomeScreen() {
  // MODUL 2: menyimpan kata kunci pencarian menggunakan useState
  const [keyword, setKeyword] = useState("");

  // MODUL 2: menyimpan kategori filter yang dipilih
  const [activeFilter, setActiveFilter] = useState<ServiceFilter>("Semua");

  // MODUL 2: menyimpan hasil filter layanan
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);

  // MODUL 2: memperbarui daftar layanan saat keyword atau filter berubah
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

  // MODUL 2: pilihan kategori filter
  const filters: ServiceFilter[] = ["Semua", "Motor", "Mobil"];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Bengkelin</Text>
        <Text style={styles.subtitle}>Solusi servis kendaraan kamu</Text>
      </View>

      {/* MODUL 2: kolom pencarian layanan */}
      <Text style={styles.sectionTitle}>Cari Layanan Servis</Text>

      <TextInput
        style={styles.searchInput}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Contoh: ganti oli..."
      />

      {/* MODUL 2: tombol filter berdasarkan jenis kendaraan */}
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

      {/* MODUL 2: menampilkan jumlah layanan hasil filter */}
      <View style={styles.listHeading}>
        <Text style={styles.sectionTitle}>Layanan Bengkel</Text>
        <Text style={styles.resultCount}>
          {filteredServices.length} layanan
        </Text>
      </View>

      {/* MODUL 2: menampilkan layanan yang sudah difilter */}
      {filteredServices.length > 0 ? (
        filteredServices.map((service) => (
          <View key={service.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.category}>{service.category}</Text>
            </View>

            <Text style={styles.duration}>Durasi: {service.duration}</Text>

            <Text style={styles.price}>{formatPrice(service.price)}</Text>

            {/* MODUL 2: router.push membuka halaman booking dan mengirim parameter layanan */}
            <Pressable
              style={styles.button}
              onPress={() =>
                router.push({
                  pathname: "/booking",
                  params: {
                    service: service.name,
                    category: service.category,
                    price: String(service.price),
                    duration: service.duration,
                  },
                })
              }
            >
              <Text style={styles.buttonText}>Booking Sekarang</Text>
            </Pressable>
          </View>
        ))
      ) : (
        // MODUL 2: tampilan saat layanan tidak ditemukan
        <View style={styles.card}>
          <Text style={styles.serviceName}>Layanan tidak ditemukan</Text>
          <Text style={styles.duration}>Coba kata kunci yang lain.</Text>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Bengkelin © 2026</Text>
        <Text style={styles.footerSubText}>
          Servis mudah, kendaraan nyaman.
        </Text>
      </View>
    </ScrollView>
  );
}
