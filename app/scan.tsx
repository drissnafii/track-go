import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScanScreen() {
  const { colisId } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={28} color="#ffffff" />
        </Pressable>
        <Text style={styles.headerTitle}>Scan Colis</Text>
        <Ionicons
          name="flash-outline"
          size={24}
          color="#ffffff"
          style={styles.flashIcon}
        />
      </View>

      <View style={styles.cameraPlaceholder}>
        <View style={styles.scanTarget}>
          {/* Top Left */}
          <View style={[styles.corner, styles.topLeft]} />
          {/* Top Right */}
          <View style={[styles.corner, styles.topRight]} />
          {/* Bottom Left */}
          <View style={[styles.corner, styles.bottomLeft]} />
          {/* Bottom Right */}
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
        <Text style={styles.instructionText}>
          Alignez le code-barres dans le cadre
        </Text>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={styles.bypassButton}
          onPress={() =>
            router.replace({ pathname: "/signature", params: { colisId } })
          }
        >
          <Text style={styles.bypassButtonText}>Simuler Scan Réussi</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  flashIcon: {
    padding: 8,
  },
  cameraPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scanTarget: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: Colors.primary,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  instructionText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 32,
    textAlign: "center",
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  bypassButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: "center",
  },
  bypassButtonText: {
    color: Colors.onPrimary,
    fontWeight: "700",
    fontSize: 16,
  },
});
