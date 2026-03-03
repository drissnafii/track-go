import { Colors } from "@/constants/colors";
import { useAuth } from "@/contexts/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
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
  const scrollY = React.useRef(new Animated.Value(0)).current;

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
      >
        {/* Delivery Card 1: Pending */}
        <View style={[styles.card, styles.cardPending]}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Jean Dupont</Text>
              <View style={styles.cardLocationRow}>
                <Ionicons
                  name="location-outline"
                  size={14}
                  color={Colors.neutral[500]}
                />
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
              <Ionicons
                name="cube-outline"
                size={18}
                color={Colors.neutral[900]}
              />
            </View>
            <Pressable
              style={styles.startButton}
              onPress={() => router.push("/package/1")}
            >
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
                <Ionicons
                  name="location-outline"
                  size={14}
                  color={Colors.neutral[500]}
                />
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
            <Pressable
              style={styles.detailsButton}
              onPress={() => router.push("/package/2")}
            >
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
                <Ionicons
                  name="location-outline"
                  size={14}
                  color={Colors.neutral[500]}
                />
                <Text
                  style={[
                    styles.cardLocationText,
                    { color: Colors.neutral[500] },
                  ]}
                >
                  8 Boulevard Saint-Germain, Paris
                </Text>
              </View>
            </View>
            <View style={styles.statusBadgeDelivered}>
              <Ionicons
                name="checkmark-circle"
                size={12}
                color={Colors.status.LIVRE}
              />
              <Text style={styles.statusBadgeTextDelivered}>Livré</Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Text style={[styles.timeInfoText, { color: Colors.neutral[500] }]}>
              Livré à 10:15
            </Text>
            <Ionicons
              name="time-outline"
              size={20}
              color={Colors.neutral[200]}
            />
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
                <Ionicons
                  name="location-outline"
                  size={14}
                  color={Colors.neutral[500]}
                />
                <Text
                  style={[
                    styles.cardLocationText,
                    { color: Colors.neutral[500] },
                  ]}
                >
                  21 Rue de Rivoli, Paris
                </Text>
              </View>
            </View>
            <View style={styles.statusBadgeDelivered}>
              <Ionicons
                name="checkmark-circle"
                size={12}
                color={Colors.status.LIVRE}
              />
              <Text style={styles.statusBadgeTextDelivered}>Livré</Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Text style={[styles.timeInfoText, { color: Colors.neutral[500] }]}>
              Livré à 09:45
            </Text>
            <Ionicons
              name="time-outline"
              size={20}
              color={Colors.neutral[200]}
            />
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
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  },
});
