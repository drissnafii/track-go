import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colis, StatusType } from "@/types";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface ColisCardProps {
  colis: Colis;
  onPress?: (colis: Colis) => void;
}

const statusConfig: Record<
  StatusType,
  { label: string; color: string; icon: string }
> = {
  EN_ATTENTE: { label: "À livrer", color: "#607D8B", icon: "clock.fill" },
  EN_COURS: { label: "En cours", color: "#FF9800", icon: "truck.fill" },
  LIVRE: { label: "Livré", color: "#4CAF50", icon: "checkmark.circle.fill" },
  INCIDENT: {
    label: "Incident",
    color: "#F44336",
    icon: "exclamationmark.triangle.fill",
  },
};

export function ColisCard({ colis, onPress }: ColisCardProps) {
  const colorScheme = useColorScheme() ?? "light";
  const { label, color, icon } = statusConfig[colis.status];

  return (
    <Pressable
      onPress={() => onPress?.(colis)}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF",
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.idContainer}>
          <ThemedText type="defaultSemiBold" style={styles.barcode}>
            {colis.barcode}
          </ThemedText>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: color }]}>
          <IconSymbol name={icon as any} size={14} color="#FFF" />
          <ThemedText style={styles.statusLabel}>{label}</ThemedText>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.infoRow}>
          <IconSymbol name="person.fill" size={16} color="#888" />
          <ThemedText style={styles.destinataire}>
            {colis.destinataire.prenom} {colis.destinataire.nom}
          </ThemedText>
        </View>

        <View style={styles.infoRow}>
          <IconSymbol name="mappin.and.ellipse" size={16} color="#888" />
          <ThemedText numberOfLines={1} style={styles.adresse}>
            {colis.destinataire.adresse}, {colis.destinataire.ville}
          </ThemedText>
        </View>

        <View style={styles.footer}>
          <View style={styles.timeTag}>
            <IconSymbol name="timer" size={14} color="#888" />
            <ThemedText style={styles.timeText}>
              {new Date(colis.creneauLivraison.debut).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(colis.creneauLivraison.fin).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </ThemedText>
          </View>
          <ThemedText style={styles.weight}>{colis.poids} kg</ThemedText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  idContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  barcode: {
    fontSize: 12,
    color: "#666",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  statusLabel: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },
  body: {
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  destinataire: {
    fontSize: 16,
    fontWeight: "bold",
  },
  adresse: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
    paddingTop: 8,
  },
  timeTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: "#888",
  },
  weight: {
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
  },
});
