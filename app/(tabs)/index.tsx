import { useAuth } from "@/contexts/auth-context";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TourneeScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"list" | "map">("list");

  // Hardcoded for UI design matching
  const progression = { current: 12, total: 20 };
  const progressPercent = `${(progression.current / progression.total) * 100}%`;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJOwHfKDGINJ-RlABUC5eWXtiCy5N3FjK7uHCyULRTmFiPKsOa1p7oUcS998BfG4HFi8I0-xzY2R0VFQ9HX70Lsr7idxMVVXcMlHR7_2wr5VikPO6rT2YBSs73v6OiP8COg63qbrrYOluDBGCBmiEYC7eVut5cm-zAnirgwYG-nP2ou5JW_7ut3pMF-hzVBGTA-sVaWmfoKEcrg0NPNKMaTWyWJWXLLY4gc5udGpr8x7OPlQdFDCdKqmps4INnfKgWDbaTTljtd_mg",
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
            <Ionicons name="sync" size={24} color="#475569" />
          </Pressable>
        </View>

        {/* Progress Summary */}
        <View style={styles.progressSection}>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>
                Progression de la tournée
              </Text>
              <Text style={styles.progressText}>
                {progression.current} / {progression.total} Livrés
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
        </View>

        {/* Top Tabs (List/Map inside the screen context) */}
        <View style={styles.topTabs}>
          <Pressable
            style={[styles.topTab, activeTab === "list" && styles.topTabActive]}
            onPress={() => setActiveTab("list")}
          >
            <Ionicons
              name="list"
              size={20}
              color={activeTab === "list" ? "#0057d1" : "#64748b"}
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
              color={activeTab === "map" ? "#0057d1" : "#64748b"}
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
      >
        {/* Delivery Card 1: Pending */}
        <View style={[styles.card, styles.cardPending]}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Jean Dupont</Text>
              <View style={styles.cardLocationRow}>
                <Ionicons name="location-outline" size={14} color="#64748b" />
                <Text style={styles.cardLocationText}>
                  12 Rue de la Paix, Paris
                </Text>
              </View>
            </View>
            <View style={styles.statusBadgePending}>
              <Text style={styles.statusBadgeTextPending}>En attente</Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <View style={styles.packageIconContainer}>
              <Ionicons name="cube-outline" size={18} color="#0F172A" />
            </View>
            <Pressable style={styles.startButton}>
              <Text style={styles.startButtonText}>Démarrer</Text>
            </Pressable>
          </View>
        </View>

        {/* Delivery Card 2: Pending */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Marie Lefebvre</Text>
              <View style={styles.cardLocationRow}>
                <Ionicons name="location-outline" size={14} color="#64748b" />
                <Text style={styles.cardLocationText}>
                  45 Avenue des Champs-Élysées, Paris
                </Text>
              </View>
            </View>
            <View style={styles.statusBadgePending}>
              <Text style={styles.statusBadgeTextPending}>En attente</Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.timeInfoText}>Prévu: 14:30 - 15:00</Text>
            <Pressable style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Détails</Text>
            </Pressable>
          </View>
        </View>

        {/* Delivery Card 3: Delivered */}
        <View style={[styles.card, styles.cardDelivered]}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={[styles.cardTitle, styles.textStrikethrough]}>
                Lucas Bernard
              </Text>
              <View style={styles.cardLocationRow}>
                <Ionicons name="location-outline" size={14} color="#94a3b8" />
                <Text style={[styles.cardLocationText, { color: "#94a3b8" }]}>
                  8 Boulevard Saint-Germain, Paris
                </Text>
              </View>
            </View>
            <View style={styles.statusBadgeDelivered}>
              <Ionicons name="checkmark-circle" size={12} color="#15803d" />
              <Text style={styles.statusBadgeTextDelivered}>Livré</Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Text style={[styles.timeInfoText, { color: "#94a3b8" }]}>
              Livré à 10:15
            </Text>
            <Ionicons name="time-outline" size={20} color="#cbd5e1" />
          </View>
        </View>

        {/* Delivery Card 4: Delivered */}
        <View style={[styles.card, styles.cardDelivered]}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={[styles.cardTitle, styles.textStrikethrough]}>
                Sophie Martin
              </Text>
              <View style={styles.cardLocationRow}>
                <Ionicons name="location-outline" size={14} color="#94a3b8" />
                <Text style={[styles.cardLocationText, { color: "#94a3b8" }]}>
                  21 Rue de Rivoli, Paris
                </Text>
              </View>
            </View>
            <View style={styles.statusBadgeDelivered}>
              <Ionicons name="checkmark-circle" size={12} color="#15803d" />
              <Text style={styles.statusBadgeTextDelivered}>Livré</Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Text style={[styles.timeInfoText, { color: "#94a3b8" }]}>
              Livré à 09:45
            </Text>
            <Ionicons name="time-outline" size={20} color="#cbd5e1" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
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
    backgroundColor: "#e0e7ff",
    borderWidth: 1,
    borderColor: "#c7d2fe",
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
    color: "#0f172a",
  },
  greetingSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748b",
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
    paddingBottom: 16,
  },
  progressCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  progressText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0057d1",
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: "#e2e8f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#0057d1",
    borderRadius: 4,
  },
  topTabs: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
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
    borderBottomColor: "#0057d1",
  },
  topTabText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748b",
  },
  topTabTextActive: {
    color: "#0057d1",
  },
  scrollContent: {
    padding: 16,
    gap: 16,
    backgroundColor: "#f5f7f8",
    paddingBottom: 100, // Extra space for bottom nav
    flexGrow: 1,
  },
  // Card Styles
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardPending: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardDelivered: {
    backgroundColor: "#f8fafc", // Or slightly transparent
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
    color: "#0f172a",
    marginBottom: 2,
  },
  textStrikethrough: {
    textDecorationLine: "line-through",
    color: "#94a3b8",
  },
  cardLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardLocationText: {
    fontSize: 14,
    color: "#64748b",
  },
  statusBadgePending: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#f1f5f9",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  statusBadgeTextPending: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#475569",
  },
  statusBadgeDelivered: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#dcfce7", // green-100
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#bbf7d0", // green-200
  },
  statusBadgeTextDelivered: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#15803d", // green-700
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  packageIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  startButton: {
    backgroundColor: "#0057d1",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  startButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
  detailsButton: {
    backgroundColor: "#f1f5f9",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  detailsButtonText: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "700",
  },
  timeInfoText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#94a3b8",
  },
});
