import { Stack } from "expo-router"; // MODUL 2: menggunakan Stack untuk navigasi

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Bengkelin",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="explore"
        options={{
          title: "Tentang Bengkelin",
        }}
      />

      <Stack.Screen
        name="booking"
        options={{
          title: "Booking Servis",
        }}
      />
    </Stack>
  );
}
