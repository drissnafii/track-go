// components/dashboard/colis-list-item.tsx — Colis Preview Row

import { Colors } from "@/constants/colors";
import type { Colis, ColisStatus } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ColisListItemProps {
    colis: Colis;
}

const STATUS_CONFIG: Record<
    ColisStatus,
    { label: string; color: string; icon: keyof typeof Ionicons.glyphMap }
> = {
    EN_ATTENTE: { label: "En attente", color: Colors.status.EN_ATTENTE, icon: "ellipse-outline" },
    EN_COURS: { label: "En cours", color: Colors.status.EN_COURS, icon: "time-outline" },
    LIVRE: { label: "Livré", color: Colors.status.LIVRE, icon: "checkmark-circle" },
    ECHEC: { label: "Échec", color: Colors.status.ECHEC, icon: "close-circle" },
    INCIDENT: { label: "Incident", color: Colors.status.INCIDENT, icon: "warning" },
};

export default function ColisListItem({ colis }: ColisListItemProps) {
    const cfg = STATUS_CONFIG[colis.status];
    const { destinataire, ordre } = colis;

    return (
        <View style={styles.row}>
            {/* Order number bubble */}
            <View style={styles.orderBubble}>
                <Text style={styles.orderText}>{ordre}</Text>
            </View>

            {/* Main info */}
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>
                    {destinataire.prenom} {destinataire.nom}
                </Text>
                <Text style={styles.address} numberOfLines={1}>
                    {destinataire.adresse}, {destinataire.ville}
                </Text>
            </View>

            {/* Status badge */}
            <View style={[styles.badge, { backgroundColor: cfg.color + "20", borderColor: cfg.color }]}>
                <Ionicons name={cfg.icon} size={12} color={cfg.color} />
                <Text style={[styles.badgeText, { color: cfg.color }]}>{cfg.label}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
        gap: 12,
    },
    orderBubble: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#EFF6FF",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    orderText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#2563EB",
    },
    info: {
        flex: 1,
        gap: 2,
    },
    name: {
        fontSize: 14,
        fontWeight: "600",
        color: "#0F172A",
    },
    address: {
        fontSize: 12,
        color: "#64748B",
    },
    badge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
        flexShrink: 0,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: "600",
    },
});
