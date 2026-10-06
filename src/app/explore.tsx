import { ScrollView, Text, View } from "react-native";

import { styles } from "../styles";

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Tentang Bengkelin</Text>

        <Text style={styles.subtitle}>Informasi layanan bengkel</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.serviceName}>Kenapa Bengkelin?</Text>

        <Text style={styles.duration}>
          Bengkelin membantu kamu menemukan layanan servis kendaraan dengan
          mudah.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.serviceName}>Layanan Kami</Text>

        <Text style={styles.duration}>
          • Ganti Oli{"\n"}• Servis Berkala{"\n"}• Tune Up{"\n"}• Ganti Oli
          Mobil
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.serviceName}>Jam Operasional</Text>

        <Text style={styles.duration}>
          Senin - Sabtu{"\n"}
          08.00 - 17.00 WIB
        </Text>
      </View>
    </ScrollView>
  );
}
