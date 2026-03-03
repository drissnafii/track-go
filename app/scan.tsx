import { StyleSheet, Text, View } from "react-native";

export default function ScanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scanner de Colis</Text>
      <Text style={styles.subtitle}>
        (Caméra et validation en construction)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f1723", // Dark background for camera
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
  },
});
