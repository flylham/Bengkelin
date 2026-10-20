import { Stack } from "expo-router"; // MODUL 2: menggunakan Stack untuk navigasi

export default function RootLayout() {
  return (
    <Stack>
      {/* MODUL 2: mendaftarkan halaman utama */}
      <Stack.Screen
        name="index"
        options={{
          title: "Bengkelin",
          headerShown: false,
        }}
      />

      {/* MODUL 2: mendaftarkan halaman Tentang */}
      <Stack.Screen
        name="explore"
        options={{
          title: "Tentang Bengkelin",
        }}
      />

      {/* MODUL 2: mendaftarkan halaman booking */}
      <Stack.Screen
        name="booking"
        options={{
          title: "Booking Servis",
        }}
      />
    </Stack>
  );
}
