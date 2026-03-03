// app/(tabs)/index.tsx — Dashboard Tournée Livreur

import ColisListItem from "@/components/dashboard/colis-list-item";
import ProgressRing from "@/components/dashboard/progress-ring";
import StatCard from "@/components/dashboard/stat-card";
import { useAuth } from "@/contexts/auth-context";
import { tourneeService } from "@/services/tournee.service";
import type { Colis, Tournee, TourneeStats } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Hardcoded IDs for now (would come from auth context later) ──────────────
const LIVREUR_ID = "liv-001";
const TOURNEE_ID = "tour-001";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function DashboardScreen() {
  const { user, logout } = useAuth();
  const [tournee, setTournee] = useState<Tournee | null>(null);
  const [colis, setColis] = useState<Colis[]>([]);
  const [stats, setStats] = useState<TourneeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Déconnexion",
          style: "destructive",
          onPress: () => {
            logout();
            router.replace("/login");
          },
        },
      ]
    );
  };

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const [tourneeData, colisData] = await Promise.all([
        tourneeService.getTourneeById(TOURNEE_ID),
        tourneeService.getColisForTournee(TOURNEE_ID),
      ]);
      setTournee(tourneeData);
      setColis(colisData);
      setStats(tourneeService.computeStats(colisData));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur réseau";
      setError(msg);
    }
  }, []);

  // Initial load
  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }, [fetchData]);

  // Pull-to-refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  // ── Loading ──
  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Chargement de la tournée…</Text>
      </SafeAreaView>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Ionicons name="cloud-offline-outline" size={48} color="#EF4444" />
        <Text style={styles.errorTitle}>Impossible de charger</Text>
        <Text style={styles.errorSub}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#2563EB"
            colors={["#2563EB"]}
          />
        }
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour,</Text>
            <Text style={styles.name}>
              {user ? `${user.prenom} ${user.nom}` : "Livreur"}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.zonePill}>
              <Ionicons name="location-outline" size={14} color="#2563EB" />
              <Text style={styles.zoneText}>{tournee?.zone ?? "—"}</Text>
            </View>
            <Pressable onPress={handleLogout} style={styles.logoutButton}>
              <Ionicons name="log-out-outline" size={22} color="#EF4444" />
            </Pressable>
          </View>
        </View>

        {/* ── Date ── */}
        {tournee && (
          <Text style={styles.dateText}>
            {capitalize(formatDate(tournee.date))}
          </Text>
        )}

        {/* ── Progress Ring ── */}
        <View style={styles.ringSection}>
          <Text style={styles.sectionTitle}>Avancement global</Text>
          <View style={styles.ringWrapper}>
            <ProgressRing
              percent={stats?.progressPercent ?? 0}
              livres={stats?.livres ?? 0}
              total={stats?.total ?? 0}
              size={180}
              strokeWidth={16}
            />
          </View>
        </View>

        {/* ── Stats Grid ── */}
        <Text style={styles.sectionTitle}>Statistiques</Text>
        <View style={styles.statsGrid}>
          <StatCard label="Total" value={stats?.total ?? 0} variant="total" />
          <StatCard label="Livrés" value={stats?.livres ?? 0} variant="livres" />
          <StatCard label="En cours" value={stats?.enCours ?? 0} variant="enCours" />
          <StatCard label="Échecs" value={stats?.echecs ?? 0} variant="echecs" />
        </View>

        {/* ── Colis List ── */}
        <View style={styles.colisSectionHeader}>
          <Text style={styles.sectionTitle}>Colis de la tournée</Text>
          <View style={styles.countPill}>
            <Text style={styles.countText}>{colis.length}</Text>
          </View>
        </View>

        <View style={styles.colisList}>
          {colis.length === 0 ? (
            <Text style={styles.emptyText}>Aucun colis pour cette tournée.</Text>
          ) : (
            colis
              .slice()
              .sort((a, b) => a.ordre - b.ordre)
              .map((c) => <ColisListItem key={c.id} colis={c} />)
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    gap: 12,
  },
  loadingText: {
    color: "#64748B",
    fontSize: 15,
    fontWeight: "500",
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 8,
  },
  errorSub: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    marginHorizontal: 32,
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  greeting: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },
  name: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },
  zonePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#EFF6FF",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  zoneText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2563EB",
  },
  logoutButton: {
    padding: 6,
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  dateText: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "400",
    marginBottom: 24,
  },
  // Ring
  ringSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  ringWrapper: {
    marginTop: 16,
    marginBottom: 4,
  },
  // Stats
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  // Colis
  colisSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  countPill: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  countText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  colisList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyText: {
    textAlign: "center",
    color: "#94A3B8",
    paddingVertical: 24,
    fontSize: 14,
  },
  bottomSpacer: {
    height: 32,
  },
});
