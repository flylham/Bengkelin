import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [callsign, setCallsign] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Peringatan", "Email dan password wajib diisi.");
      return;
    }

    if (isRegister && !callsign.trim()) {
      Alert.alert("Peringatan", "Nama pengguna wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      if (isRegister) {
        const { data, error } = await signUp(email, password, callsign);

        if (error) throw error;

        if (data.session) {
          Alert.alert("Berhasil", "Akun berhasil dibuat.");
          router.replace("/");
        } else {
          Alert.alert(
            "Registrasi berhasil",
            "Silakan periksa email untuk konfirmasi akun.",
          );
        }
      } else {
        const { error } = await signIn(email, password);

        if (error) throw error;

        Alert.alert("Berhasil", "Login berhasil.");
        router.replace("/");
      }
    } catch (error: any) {
      Alert.alert("Gagal", error.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bengkelin</Text>
      <Text style={styles.subtitle}>
        {isRegister ? "Buat akun baru" : "Silakan masuk ke akun Anda"}
      </Text>

      {isRegister && (
        <TextInput
          style={styles.input}
          placeholder="Nama pengguna"
          value={callsign}
          onChangeText={setCallsign}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleAuth}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {isRegister ? "Daftar" : "Login"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsRegister(!isRegister)}
        disabled={loading}
      >
        <Text style={styles.switchText}>
          {isRegister ? "Sudah punya akun? Login" : "Belum punya akun? Daftar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#2563eb",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  switchText: {
    textAlign: "center",
    color: "#2563eb",
    marginTop: 20,
  },
});
