import { Colors } from "@/constants/colors";
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
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
});
