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
    color: "#fe0707",
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 12,
  },

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

  filterRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },

  filterButton: {
    borderWidth: 1,
    borderColor: "#2563EB",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: "#FFFFFF",
  },

  activeFilterButton: {
    backgroundColor: "#2563EB",
  },

  filterText: {
    color: "#2563EB",
    fontWeight: "600",
  },

  activeFilterText: {
    color: "#FFFFFF",
  },

  listHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

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

  secondaryButton: {
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 10,
  },

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

  successIcon: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#16A34A",
    marginBottom: 12,
  },

  successTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#15803D",
    marginBottom: 10,
    textAlign: "center",
  },

  successMessage: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
});
