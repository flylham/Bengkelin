import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  header: {
    backgroundColor: "#222",
    padding: 25,
    borderRadius: 15,
    marginBottom: 25,
  },

  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },

  subtitle: {
    fontSize: 15,
    color: "#f4eeee",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,

    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  serviceName: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#222",
  },

  category: {
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    fontSize: 12,
  },

  duration: {
    marginTop: 10,
    color: "#666",
  },

  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#222",
    padding: 13,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  footer: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
  },

  footerText: {
    fontWeight: "bold",
    fontSize: 15,
  },

  footerSubText: {
    color: "#777",
    marginTop: 5,
  },
});
