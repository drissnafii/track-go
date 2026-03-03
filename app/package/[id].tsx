import { Colors } from "@/constants/colors";
import { tourneeService } from "@/services/tournee.service";
import { Colis } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PackageDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [colis, setColis] = useState<Colis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof id === "string") {
      tourneeService
        .getColisById(id)
        .then(setColis)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!colis) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Colis non trouvé</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.neutral[900]} />
        </Pressable>
        <Text style={styles.headerTitle}>Détails Colis #{colis.id}</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Status Section */}
        <View style={styles.statusSection}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>
              {colis.status.replace("_", " ")}
            </Text>
          </View>
          <Text style={styles.barcodeText}>{colis.barcode}</Text>
        </View>

        {/* Destinataire Card */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>DESTINATAIRE</Text>
          <Text style={styles.destName}>
            {colis.destinataire.prenom} {colis.destinataire.nom}
          </Text>
          <View style={styles.infoRow}>
            <Ionicons
              name="location-outline"
              size={20}
              color={Colors.neutral[500]}
            />
            <Text style={styles.infoText}>
              {colis.destinataire.adresse}, {colis.destinataire.ville}{" "}
              {colis.destinataire.codePostal}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons
              name="call-outline"
              size={20}
              color={Colors.neutral[500]}
            />
            <Text style={styles.infoText}>{colis.destinataire.telephone}</Text>
          </View>

          <View style={styles.actionRow}>
            <Pressable
              style={styles.actionSubButton}
              onPress={() =>
                Linking.openURL(`tel:${colis.destinataire.telephone}`)
              }
            >
              <Ionicons name="call" size={18} color={Colors.primary} />
              <Text style={styles.actionSubButtonText}>Appeler</Text>
            </Pressable>
            <Pressable
              style={styles.actionSubButton}
              onPress={() =>
                Linking.openURL(
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(colis.destinataire.adresse)}`,
                )
              }
            >
              <Ionicons name="map" size={18} color={Colors.primary} />
              <Text style={styles.actionSubButtonText}>Itinéraire</Text>
            </Pressable>
          </View>
        </View>

        {/* Package Specs */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>SPÉCIFICATIONS</Text>
          <View style={styles.specsRow}>
            <View style={styles.specItem}>
              <Text style={styles.specValue}>{colis.poids} kg</Text>
              <Text style={styles.specLabel}>Poids</Text>
            </View>
            <View style={styles.specDivider} />
            <View style={styles.specItem}>
              <Text style={styles.specValue}>{colis.dimensions}</Text>
              <Text style={styles.specLabel}>Dimensions</Text>
            </View>
          </View>
          <Text style={styles.descriptionText}>{colis.description}</Text>
        </View>

        {/* Delivery Window */}
        <View
          style={[
            styles.sectionCard,
            { borderLeftWidth: 4, borderLeftColor: Colors.primary },
          ]}
        >
          <Text style={styles.sectionLabel}>CRÉNEAU DE LIVRAISON</Text>
          <Text style={styles.deliveryWindow}>
            {colis.creneauLivraison.debut} - {colis.creneauLivraison.fin}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.reportButton}
          onPress={() =>
            router.push({
              pathname: "/incident",
              params: { colisId: colis.id },
            })
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
            router.push({ pathname: "/scan", params: { colisId: colis.id } })
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  statusSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusBadgeText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  barcodeText: {
    color: Colors.neutral[500],
    fontSize: 14,
    fontWeight: "600",
  },
  sectionCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
    gap: 12,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.neutral[500],
    letterSpacing: 1,
  },
  destName: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.neutral[900],
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoText: {
    fontSize: 15,
    color: Colors.neutral[700],
    flex: 1,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[100],
  },
  actionSubButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.primaryContainer + "40", // 25% opacity
    paddingVertical: 10,
    borderRadius: 12,
  },
  actionSubButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.primary,
  },
  specsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  specItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  specValue: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.neutral[900],
  },
  specLabel: {
    fontSize: 12,
    color: Colors.neutral[500],
    fontWeight: "500",
  },
  specDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.neutral[200],
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.neutral[500],
    lineHeight: 20,
    fontStyle: "italic",
  },
  deliveryWindow: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
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
    flex: 1.4, // Give slightly more space to the longer text
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
    fontSize: 13, // Reduced slightly for breathing room
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
