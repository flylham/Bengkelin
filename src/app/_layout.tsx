import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* mendaftarkan halaman utama */}
      <Stack.Screen
        name="index"
        options={{
          title: "Bengkelin",
          headerShown: false,
        }}
      />
      {/* mendaftarkan halaman Tentang */}
      <Stack.Screen
        name="explore"
        options={{
          title: "Tentang Bengkelin",
        }}
      />

      {/* mendaftarkan halaman booking */}

      <Stack.Screen
        name="booking"
        options={{
          title: "Booking Servis",
        }}
      />
    </Stack>
  );
}
