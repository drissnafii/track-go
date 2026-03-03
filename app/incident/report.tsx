import { StyleSheet, Text, View } from "react-native";

export default function IncidentReportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Signaler un Incident</Text>
      <Text style={styles.subtitle}>
        (Formulaire multipart en construction)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f7f8",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
  },
});
