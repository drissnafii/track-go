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
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.emptyText}>Contenu supprimé</Text>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={styles.reportButton}
          onPress={() =>
            router.push({ pathname: "/incident", params: { colisId: id } })
          }
        >
          <Ionicons
            name="alert-circle-outline"
            size={18}
            color={Colors.error}
            style={{ marginRight: 6 }}
          />
          <Text style={styles.reportButtonText} numberOfLines={1}>
            Signaler un problème
          </Text>
        </Pressable>
        <Pressable
          style={styles.deliverButton}
          onPress={() =>
            router.push({ pathname: "/scan", params: { colisId: id } })
          }
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={18}
            color={Colors.onPrimary}
            style={{ marginRight: 6 }}
          />
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
  },
  emptyText: {
    fontSize: 16,
    color: Colors.neutral[500],
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
    flex: 1.4,
    flexDirection: "row",
    backgroundColor: Colors.errorContainer,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  reportButtonText: {
    color: Colors.error,
    fontWeight: "700",
    fontSize: 13,
  },
  deliverButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  deliverButtonText: {
    color: Colors.onPrimary,
    fontWeight: "700",
    fontSize: 14,
  },
});
