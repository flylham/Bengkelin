import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    paddingHorizontal: 20,
  },

  header: {
    paddingTop: 32,
    paddingBottom: 24,
  },

  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1D4ED8",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
  },

  // MODUL 2: judul bagian pencarian dan daftar layanan
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 12,
  },

  // MODUL 2: style kolom pencarian
  searchInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 16,
  },

  // MODUL 2: tata letak tombol filter
  filterRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },

  // MODUL 2: tombol filter biasa
  filterButton: {
    borderWidth: 1,
    borderColor: "#2563EB",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: "#FFFFFF",
  },

  // MODUL 2: tombol filter yang sedang aktif
  activeFilterButton: {
    backgroundColor: "#2563EB",
  },

  // MODUL 2: teks filter biasa
  filterText: {
    color: "#2563EB",
    fontWeight: "600",
  },

  // MODUL 2: teks filter aktif
  activeFilterText: {
    color: "#FFFFFF",
  },

  // MODUL 2: judul daftar dan jumlah layanan
  listHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  // MODUL 2: jumlah layanan hasil pencarian
  resultCount: {
    fontSize: 12,
    color: "#64748B",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },

  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 6,
  },

  category: {
    color: "#2563EB",
    backgroundColor: "#DBEAFE",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 12,
    overflow: "hidden",
  },

  duration: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 8,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#15803D",
    marginBottom: 14,
  },

  button: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 4,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  // MODUL 2: tombol kembali pada halaman booking
  secondaryButton: {
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 10,
  },

  // MODUL 2: teks tombol kembali
  secondaryButtonText: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "bold",
  },

  footer: {
    paddingTop: 16,
    paddingBottom: 32,
    alignItems: "center",
  },

  footerText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#475569",
  },

  footerSubText: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
  },

  // MODUL 2: kartu yang ditampilkan setelah booking berhasil
  successCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 24,
    marginTop: 8,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },

  // MODUL 2: ikon keberhasilan booking
  successIcon: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#16A34A",
    marginBottom: 12,
  },

  // MODUL 2: judul pesan keberhasilan
  successTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#15803D",
    marginBottom: 10,
    textAlign: "center",
  },

  // MODUL 2: keterangan booking berhasil
  successMessage: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
});
