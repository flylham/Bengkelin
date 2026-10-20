import {
    router,
    useLocalSearchParams, // MODUL 2: membaca parameter dari halaman sebelumnya
} from "expo-router";
import { useState } from "react"; // MODUL 2: menyimpan status booking
import { Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "../styles";

export default function BookingScreen() {
  // MODUL 2: menerima detail layanan dari router.push()
  const params = useLocalSearchParams<{
    service?: string;
    category?: string;
    price?: string;
    duration?: string;
  }>();

  // MODUL 2: menentukan apakah booking sudah dikonfirmasi
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const price = Number(params.price ?? 0);

  // MODUL 2: mengubah status agar pesan berhasil ditampilkan
  function confirmBooking() {
    setBookingSuccess(true);
  }

  // MODUL 2: kembali ke halaman utama setelah booking selesai
  function finishBooking() {
    router.replace("/");
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Konfirmasi Booking</Text>
        <Text style={styles.subtitle}>Periksa layanan pilihanmu</Text>
      </View>

      {/* MODUL 2: tampilan berubah setelah konfirmasi ditekan */}
      {bookingSuccess ? (
        <View style={styles.successCard}>
          <Text style={styles.successIcon}>✓</Text>

          <Text style={styles.successTitle}>Booking Berhasil!</Text>

          <Text style={styles.successMessage}>
            Layanan {params.service ?? "servis"} berhasil dikonfirmasi.
          </Text>

          <Pressable style={styles.button} onPress={finishBooking}>
            <Text style={styles.buttonText}>Kembali ke Beranda</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.duration}>Nama layanan</Text>
          <Text style={styles.serviceName}>{params.service ?? "-"}</Text>

          <Text style={styles.duration}>Jenis kendaraan</Text>
          <Text style={styles.serviceName}>{params.category ?? "-"}</Text>

          <Text style={styles.duration}>Durasi</Text>
          <Text style={styles.serviceName}>{params.duration ?? "-"}</Text>

          <Text style={styles.duration}>Harga</Text>
          <Text style={styles.price}>
            {"Rp" + price.toLocaleString("id-ID")}
          </Text>

          {/* MODUL 2: menjalankan fungsi konfirmasi booking */}
          <Pressable style={styles.button} onPress={confirmBooking}>
            <Text style={styles.buttonText}>Konfirmasi Booking</Text>
          </Pressable>

          {/* MODUL 2: router.back() kembali ke halaman sebelumnya */}
          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.secondaryButtonText}>Kembali</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
