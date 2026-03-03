import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PackageDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.neutral[900]} />
        </Pressable>
        <Text style={styles.headerTitle}>Détails Colis #{id}</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      <View style={styles.content}>
        <Ionicons
          name="cube-outline"
          size={64}
          color={Colors.primary}
          style={styles.icon}
        />
        <Text style={styles.title}>Destinataire: Client {id}</Text>
        <Text style={styles.text}>
          Informations complètes du colis et instructions de livraison
          spécifiques apparaîtront ici.
        </Text>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={styles.reportButton}
          onPress={() => router.push("/incident")}
        >
          <Text style={styles.reportButtonText}>Signaler un problème</Text>
        </Pressable>
        <Pressable
          style={styles.deliverButton}
          onPress={() => router.push("/scan")}
        >
          <Text style={styles.deliverButtonText}>Livrer</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.neutral[900],
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.neutral[900],
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: Colors.neutral[500],
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    backgroundColor: Colors.background,
  },
  reportButton: {
    flex: 1,
    backgroundColor: Colors.errorContainer,
    paddingVertical: 14,
    borderRadius: 9999,
    alignItems: "center",
  },
  reportButtonText: {
    color: Colors.error,
    fontWeight: "700",
    fontSize: 16,
  },
  deliverButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 9999,
    alignItems: "center",
  },
  deliverButtonText: {
    color: Colors.onPrimary,
    fontWeight: "700",
    fontSize: 16,
  },
});
