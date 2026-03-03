import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { HapticTab } from "@/components/haptic-tab";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0057d1",
        tabBarInactiveTintColor: "#64748b",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#e2e8f0",
          backgroundColor: "#ffffff",
          height: 70,
          paddingBottom: 12,
          paddingTop: 8,
          elevation: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: 0.1,
          shadowRadius: 15,
          position: "absolute",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tournée",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={24}
              name={focused ? "car" : "car-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Carte",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={24}
              name={focused ? "map" : "map-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="performance"
        options={{
          title: "Performance",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={24}
              name={focused ? "stats-chart" : "stats-chart-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
