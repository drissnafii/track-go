import { StyleSheet, Text, View } from "react-native";

export default function PerformanceScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Performance (En construction)</Text>
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
    color: "#0057d1",
  },
});
