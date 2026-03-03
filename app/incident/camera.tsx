import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IncidentCameraScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <Text style={styles.headerTitle}>Prendre une photo (2/3)</Text>
        <Ionicons
          name="flash-outline"
          size={24}
          color="#ffffff"
          style={styles.flashIcon}
        />
      </View>

      <View style={styles.cameraPlaceholder}>
        <Ionicons name="camera-outline" size={64} color={Colors.neutral[500]} />
        <Text style={styles.instructionText}>
          Interface Caméra native à intégrer ici
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerHint}>
          Veuillez prendre une photo claire du problème.
        </Text>
        <Pressable
          style={styles.captureButton}
          onPress={() => router.push("/incident/comment")}
        >
          <View style={styles.captureInner} />
        </Pressable>
        <Pressable
          onPress={() => router.push("/incident/comment")}
          style={styles.skipLink}
        >
          <Text style={styles.skipText}>Ignorer cette étape</Text>
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
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  flashIcon: {
    padding: 8,
  },
  cameraPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  instructionText: {
    color: Colors.neutral[500],
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    padding: 32,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  footerHint: {
    color: "#ffffff",
    fontSize: 14,
    marginBottom: 24,
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  captureInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ffffff",
  },
  skipLink: {
    padding: 8,
  },
  skipText: {
    color: Colors.neutral[500],
    fontSize: 14,
    fontWeight: "600",
  },
});
