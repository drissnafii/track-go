import { Colors } from "@/constants/colors";
import { useAuth } from "@/contexts/auth-context";
import { tourneeService } from "@/services/tournee.service";
import { Colis, TourneeStats } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TourneeScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"list" | "map">("list");
  const [colis, setColis] = useState<Colis[]>([]);
  const [stats, setStats] = useState<TourneeStats | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const scrollY = React.useRef(new Animated.Value(0)).current;

  const fetchData = useCallback(async () => {
    if (!user?.id) return;
    try {
      const tournees = await tourneeService.getTourneesForLivreur(user.id);
      if (tournees.length > 0) {
        // For demo, we take the first tournee found
        const tourneeId = tournees[0].id;
        const colisData = await tourneeService.getColisForTournee(tourneeId);
        setColis(colisData.sort((a, b) => a.ordre - b.ordre));
        setStats(tourneeService.computeStats(colisData));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // Header/Progress height is approx 120px. We want to hide it completely after scrolling 100px.
  const progressOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const progressTranslateY = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -40],
    extrapolate: "clamp",
  });

  const progressScaleY = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const progressPercent = stats ? `${stats.progressPercent}%` : "0%";

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJOwHfKDGINJ-RlABUC5eWXtiCy5N3FjK7uHCyULRTmFiPKsOa1p7oUcS998BfG4HFi8I0-xzY2R0VFQ9HX70Lsr7idxMVVXcMlHR7_2wr5VikPO6rT2YBSs73v6OiP8COg63qbrrYOluDBGCBmiEYC7eVut5cm-zAnirgwYG-nP2ou5JW_7ut3pMF-hzVBGTA-sVaWmfoKEcrg0NPNKMaTWyWJWXLLY4gc53udGpr8x7OPlQdFDCdKqmps4INnfKgWDbaTTljtd_mg",
                }}
                style={styles.avatar}
              />
            </View>
            <View>
              <Text style={styles.greetingTitle}>
                Bonjour, {user?.prenom || "Marc"}
              </Text>
              <Text style={styles.greetingSubtitle}>Track&Go Driver</Text>
            </View>
          </View>
          <Pressable style={styles.syncButton}>
            <Ionicons name="sync" size={24} color={Colors.neutral[500]} />
          </Pressable>
        </View>

        {/* Progress Summary - Animated */}
        <Animated.View
          style={[
            styles.progressSection,
            {
              opacity: progressOpacity,
              transform: [
                { translateY: progressTranslateY },
                { scaleY: progressScaleY },
              ],
              height: scrollY.interpolate({
                inputRange: [0, 60],
                outputRange: [80, 0],
                extrapolate: "clamp",
              }),
            },
          ]}
        >
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>
                Progression de la tournée
              </Text>
              <Text style={styles.progressText}>
                {stats?.livres || 0} / {stats?.total || 0} Livrés
              </Text>
            </View>
            <View style={styles.progressBarTrack}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: progressPercent as any },
                ]}
              />
            </View>
          </View>
        </Animated.View>

        {/* Top Tabs (List/Map inside the screen context) */}
        <View style={styles.topTabs}>
          <Pressable
            style={[styles.topTab, activeTab === "list" && styles.topTabActive]}
            onPress={() => setActiveTab("list")}
          >
            <Ionicons
              name="list"
              size={20}
              color={
                activeTab === "list" ? Colors.primary : Colors.neutral[500]
              }
            />
            <Text
              style={[
                styles.topTabText,
                activeTab === "list" && styles.topTabTextActive,
              ]}
            >
              Liste
            </Text>
          </Pressable>
          <Pressable
            style={[styles.topTab, activeTab === "map" && styles.topTabActive]}
            onPress={() => setActiveTab("map")}
          >
            <Ionicons
              name="map-outline"
              size={20}
              color={activeTab === "map" ? Colors.primary : Colors.neutral[500]}
            />
            <Text
              style={[
                styles.topTabText,
                activeTab === "map" && styles.topTabTextActive,
              ]}
            >
              Carte
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
      >
        {colis.map((item) => {
          const isLivre = item.status === "LIVRE";
          const isIncident =
            item.status === "ECHEC" || item.status === "INCIDENT";

          return (
            <View
              key={item.id}
              style={[styles.card, isLivre && styles.cardDelivered]}
            >
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.cardTitle,
                      isLivre && styles.textStrikethrough,
                    ]}
                  >
                    {item.destinataire.prenom} {item.destinataire.nom}
                  </Text>
                  <View style={styles.cardLocationRow}>
                    <Ionicons
                      name="location-outline"
                      size={14}
                      color={Colors.neutral[500]}
                    />
                    <Text
                      style={[
                        styles.cardLocationText,
                        isLivre && { color: Colors.neutral[500] },
                      ]}
                      numberOfLines={1}
                    >
                      {item.destinataire.adresse}, {item.destinataire.ville}
                    </Text>
                  </View>
                </View>
                <View
                  style={
                    isLivre
                      ? styles.statusBadgeDelivered
                      : isIncident
                        ? styles.statusBadgeIncident
                        : styles.statusBadgePending
                  }
                >
                  {isLivre && (
                    <Ionicons
                      name="checkmark-circle"
                      size={12}
                      color={Colors.status.LIVRE}
                    />
                  )}
                  <Text
                    style={
                      isLivre
                        ? styles.statusBadgeTextDelivered
                        : isIncident
                          ? styles.statusBadgeTextIncident
                          : styles.statusBadgeTextPending
                    }
                  >
                    {item.status.replace("_", " ")}
                  </Text>
                </View>
              </View>
              <View style={styles.cardFooter}>
                <View style={styles.footerLeft}>
                  <View style={styles.packageIconContainer}>
                    <Ionicons
                      name="cube-outline"
                      size={18}
                      color={
                        isLivre ? Colors.neutral[500] : Colors.neutral[900]
                      }
                    />
                  </View>
                  <Text
                    style={[
                      styles.timeInfoText,
                      isLivre && { color: Colors.neutral[500] },
                    ]}
                  >
                    {isLivre
                      ? `Livré à ${item.creneauLivraison.fin}`
                      : `Porte: ${item.creneauLivraison.debut} - ${item.creneauLivraison.fin}`}
                  </Text>
                </View>
                {isLivre ? (
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color={Colors.neutral[200]}
                  />
                ) : (
                  <Pressable
                    style={
                      item.status === "EN_COURS"
                        ? styles.startButton
                        : styles.detailsButton
                    }
                    onPress={() => router.push(`/package/${item.id}`)}
                  >
                    <Text
                      style={
                        item.status === "EN_COURS"
                          ? styles.startButtonText
                          : styles.detailsButtonText
                      }
                    >
                      {item.status === "EN_COURS" ? "Reprendre" : "Détails"}
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          );
        })}

        {colis.length === 0 && !loading && (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="basket-outline"
              size={48}
              color={Colors.neutral[200]}
            />
            <Text style={styles.emptyText}>
              Aucun colis pour aujourd&apos;hui
            </Text>
          </View>
        )}
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
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryContainer,
    borderWidth: 1,
    borderColor: "rgba(0, 98, 161, 0.2)",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  greetingTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.neutral[900],
  },
  greetingSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.neutral[500],
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  syncButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  progressSection: {
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  progressCard: {
    backgroundColor: "transparent",
    borderRadius: 16,
    paddingVertical: 8,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.neutral[700],
  },
  progressText: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.primary,
  },
  progressBarTrack: {
    height: 14,
    backgroundColor: "rgba(0, 0, 0, 0.05)", // Soft, modern translucent track
    borderRadius: 99,
    padding: 3,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.02)",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 99,
    // Add a slight glow/shadow to the fill for premium feel
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  topTabs: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[100],
  },
  topTab: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  topTabActive: {
    borderBottomColor: Colors.primary,
  },
  topTabText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.neutral[500],
  },
  topTabTextActive: {
    color: Colors.primary,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
    backgroundColor: Colors.neutral[100],
    paddingBottom: 100, // Extra space for bottom nav
    flexGrow: 1,
  },
  // Card Styles
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20, // More rounded MD3 style
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  cardPending: {
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardDelivered: {
    backgroundColor: Colors.neutral[50], // Very soft contrast
    opacity: 0.8,
    shadowOpacity: 0,
    elevation: 0,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.neutral[900],
    marginBottom: 2,
  },
  textStrikethrough: {
    textDecorationLine: "line-through",
    color: Colors.neutral[500],
  },
  cardLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardLocationText: {
    fontSize: 14,
    color: Colors.neutral[700],
  },
  statusBadgePending: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Colors.neutral[100],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  statusBadgeTextPending: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    color: Colors.neutral[700],
  },
  statusBadgeDelivered: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "rgba(0, 109, 59, 0.1)", // Soft green
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 109, 59, 0.2)",
  },
  statusBadgeTextDelivered: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    color: Colors.status.LIVRE,
  },
  statusBadgeIncident: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Colors.errorContainer,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(186, 26, 26, 0.2)",
  },
  statusBadgeTextIncident: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    color: Colors.error,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  packageIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.neutral[100],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  startButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 9999, // MD3 Pill style
  },
  startButtonText: {
    color: Colors.onPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  detailsButton: {
    backgroundColor: Colors.secondaryContainer,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 9999, // MD3 Pill style
  },
  detailsButtonText: {
    color: Colors.onSecondaryContainer,
    fontSize: 14,
    fontWeight: "700",
  },
  timeInfoText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.neutral[500],
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.neutral[500],
    fontWeight: "500",
  },
});
