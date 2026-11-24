import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

// Masukkan URL API dari aslab di sini
const API_URL = "https://fakestoreapi.com/products?utm_source=chatgpt.com";

export default function ApiData() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fungsi untuk mengambil data API
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Gagal mengambil data API");
      }

      const result = await response.json();

      // Sesuaikan dengan struktur response API dari aslab
      setData(Array.isArray(result) ? result : result.Results || []);
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#F8FAFC" }}>
      <Pressable onPress={() => router.back()}>
        <Text style={{ color: "blue", marginBottom: 20 }}>Kembali</Text>
      </Pressable>

      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Data dari API</Text>

      <Pressable
        onPress={fetchData}
        style={{
          backgroundColor: "#2563EB",
          padding: 12,
          borderRadius: 8,
          marginVertical: 15,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Refresh Data
        </Text>
      </Pressable>

      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" />
      ) : error ? (
        <Text style={{ color: "red" }}>{error}</Text>
      ) : (
        <ScrollView>
          {data.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "white",
                padding: 15,
                marginBottom: 10,
                borderRadius: 8,
              }}
            >
              <Text>{JSON.stringify(item, null, 2)}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
