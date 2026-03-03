import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const REASONS = [
  { id: "absent", label: "Client absent", icon: "home-outline" },
  { id: "damaged", label: "Colis endommagé", icon: "cube-outline" },
  { id: "address", label: "Adresse introuvable", icon: "location-outline" },
  { id: "refused", label: "Colis refusé", icon: "close-circle-outline" },
  {
    id: "other",
    label: "Autre motif",
    icon: "ellipsis-horizontal-circle-outline",
  },
];

export default function IncidentTypeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.neutral[500]}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Signaler un problème (1/3)</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Quel est le problème ?</Text>
        <Text style={styles.subtitle}>
          Sélectionnez la raison pour laquelle ce colis ne peut pas être livré.
        </Text>

        <View style={styles.optionsList}>
          {REASONS.map((reason) => (
            <Pressable
              key={reason.id}
              style={styles.optionCard}
              onPress={() => router.push("/incident/camera")}
            >
              <View style={styles.optionIconContainer}>
                <Ionicons
                  name={reason.icon as any}
                  size={24}
                  color={Colors.primary}
                />
              </View>
              <Text style={styles.optionLabel}>{reason.label}</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.neutral[500] as string}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
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
    fontSize: 16,
    fontWeight: "600",
    color: Colors.neutral[900],
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.neutral[900],
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.neutral[500],
    marginBottom: 32,
    lineHeight: 24,
  },
  optionsList: {
    gap: 12,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.neutral[50],
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.neutral[900],
  },
});
