// components/dashboard/stat-card.tsx — Reusable Stat Card

import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type StatVariant = "total" | "livres" | "enCours" | "echecs";

interface StatCardProps {
    label: string;
    value: number;
    variant: StatVariant;
}

const VARIANT_CONFIG: Record<
    StatVariant,
    { icon: keyof typeof Ionicons.glyphMap; bg: string; fg: string; accent: string }
> = {
    total: {
        icon: "cube-outline",
        bg: "#EFF6FF",
        fg: "#1D4ED8",
        accent: Colors.primary,
    },
    livres: {
        icon: "checkmark-circle-outline",
        bg: "#F0FDF4",
        fg: "#15803D",
        accent: Colors.success,
    },
    enCours: {
        icon: "time-outline",
        bg: "#FFFBEB",
        fg: "#B45309",
        accent: Colors.warning,
    },
    echecs: {
        icon: "close-circle-outline",
        bg: "#FEF2F2",
        fg: "#B91C1C",
        accent: Colors.danger,
    },
};

export default function StatCard({ label, value, variant }: StatCardProps) {
    const cfg = VARIANT_CONFIG[variant];

    return (
        <View style={[styles.card, { backgroundColor: cfg.bg, borderColor: cfg.accent }]}>
            <View style={[styles.iconWrap, { backgroundColor: cfg.accent + "22" }]}>
                <Ionicons name={cfg.icon} size={22} color={cfg.accent} />
            </View>
            <Text style={[styles.value, { color: cfg.fg }]}>{value}</Text>
            <Text style={[styles.label, { color: cfg.fg + "BB" }]}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        minWidth: "44%",
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
        alignItems: "flex-start",
        gap: 8,
        marginBottom: 12,
    },
    iconWrap: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    value: {
        fontSize: 32,
        fontWeight: "800",
        lineHeight: 36,
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
});
