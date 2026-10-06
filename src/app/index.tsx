import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import { styles } from "../styles";

// TYPE
type VehicleType = "Motor" | "Mobil";

// INTERFACE
interface Service {
  id: number;
  name: string;
  category: VehicleType;
  price: number;
  duration: string;
}

// ARRAY OF OBJECTS
const services: Service[] = [
  {
    id: 1,
    name: "Ganti Oli",
    category: "Motor",
    price: 75000,
    duration: "30 Menit",
  },
  {
    id: 2,
    name: "Servis Berkala",
    category: "Motor",
    price: 150000,
    duration: "1 Jam",
  },
  {
    id: 3,
    name: "Tune Up",
    category: "Mobil",
    price: 350000,
    duration: "2 Jam",
  },
  {
    id: 4,
    name: "Ganti Oli Mobil",
    category: "Mobil",
    price: 250000,
    duration: "45 Menit",
  },
];

// CUSTOM FUNCTION
function formatPrice(price: number): string {
  return "Rp" + price.toLocaleString("id-ID");
}

// CUSTOM COMPONENT / FUNCTION
function ServiceCard({ service }: { service: Service }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.serviceName}>{service.name}</Text>

        <Text style={styles.category}>{service.category}</Text>
      </View>

      <Text style={styles.duration}>Durasi: {service.duration}</Text>

      <Text style={styles.price}>{formatPrice(service.price)}</Text>

      <Pressable
        style={styles.button}
        onPress={() =>
          Alert.alert("Booking Servis", `Kamu memilih ${service.name}`)
        }
      >
        <Text style={styles.buttonText}>Booking Sekarang</Text>
      </Pressable>
    </View>
  );
}

// SCREEN
export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>Bengkelin</Text>

        <Text style={styles.subtitle}>Solusi servis kendaraan kamu</Text>
      </View>

      {/* INLINE STYLE */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 15,
        }}
      >
        Layanan Bengkel
      </Text>

      {/* LOOP */}
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Bengkelin © 2026</Text>

        <Text style={styles.footerSubText}>
          Servis mudah, kendaraan nyaman.
        </Text>
      </View>
    </ScrollView>
  );
}
