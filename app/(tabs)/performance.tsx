import { Colors } from "@/constants/colors";
import { useAuth } from "@/contexts/auth-context";
import { tourneeService } from "@/services/tournee.service";
import { TourneeStats } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PerformanceScreen() {
  const { user } = useAuth();
  const [stats, setStats] = useState<TourneeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      tourneeService
        .getTourneesForLivreur(user.id)
        .then(async (tournees) => {
          if (tournees.length > 0) {
            const colis = await tourneeService.getColisForTournee(
              tournees[0].id,
            );
            setStats(tourneeService.computeStats(colis));
          }
        })
        .finally(() => setLoading(false));
    }
  }, [user?.id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Votre Performance</Text>
          <Text style={styles.headerSubtitle}>
            Aujourd&apos;hui - {new Date().toLocaleDateString("fr-FR")}
          </Text>
        </View>

        {/* Hero Progress Section */}
        <View style={styles.heroCard}>
          <View style={styles.progressCircleContainer}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressPercent}>
                {stats?.progressPercent || 0}%
              </Text>
              <Text style={styles.progressLabel}>Complété</Text>
            </View>
          </View>
          <View style={styles.heroStats}>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>{stats?.livres || 0}</Text>
              <Text style={styles.heroStatLabel}>LIVRÉS</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>{stats?.total || 0}</Text>
              <Text style={styles.heroStatLabel}>TOTAL</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Récapitulatif</Text>

        <View style={styles.grid}>
          <View style={[styles.statCard, { backgroundColor: "#E8F5E9" }]}>
            <Ionicons name="checkmark-circle" size={24} color="#2E7D32" />
            <Text style={[styles.statCardValue, { color: "#2E7D32" }]}>
              {stats?.livres || 0}
            </Text>
            <Text style={styles.statCardLabel}>Succès</Text>
          </View>

          <View
            style={[
              styles.statCard,
              { backgroundColor: Colors.primaryContainer },
            ]}
          >
            <Ionicons name="time" size={24} color={Colors.primary} />
            <Text style={[styles.statCardValue, { color: Colors.primary }]}>
              {stats?.enAttente || 0}
            </Text>
            <Text style={styles.statCardLabel}>En attente</Text>
          </View>

          <View
            style={[
              styles.statCard,
              { backgroundColor: Colors.errorContainer },
            ]}
          >
            <Ionicons name="alert-circle" size={24} color={Colors.error} />
            <Text style={[styles.statCardValue, { color: Colors.error }]}>
              {stats?.echecs || 0}
            </Text>
            <Text style={styles.statCardLabel}>Incidents</Text>
          </View>

          <View
            style={[
              styles.statCard,
              { backgroundColor: Colors.secondaryContainer },
            ]}
          >
            <Ionicons name="cube" size={24} color={Colors.secondary} />
            <Text style={[styles.statCardValue, { color: Colors.secondary }]}>
              {stats?.total || 0}
            </Text>
            <Text style={styles.statCardLabel}>Total</Text>
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 24,
    gap: 24,
  },
  header: {
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.neutral[900],
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.neutral[500],
    marginTop: 4,
  },
  heroCard: {
    backgroundColor: Colors.primary,
    borderRadius: 32,
    padding: 32,
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  progressCircleContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 8,
    borderColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  progressCircle: {
    alignItems: "center",
  },
  progressPercent: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "800",
  },
  progressLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    fontWeight: "600",
  },
  heroStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  heroStatItem: {
    alignItems: "center",
  },
  heroStatValue: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
  },
  heroStatLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  heroStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.neutral[900],
    marginBottom: -8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    padding: 20,
    borderRadius: 24,
    gap: 8,
  },
  statCardValue: {
    fontSize: 24,
    fontWeight: "800",
  },
  statCardLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.neutral[700],
  },
});
