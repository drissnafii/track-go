import { Colors } from "@/constants/colors";
import { tourneeService } from "@/services/tournee.service";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignatureScreen() {
  const { colisId } = useLocalSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSign = async () => {
    if (!colisId) return;

    setIsSubmitting(true);
    try {
      // In a real app, we'd also upload the signature image as proof
      await tourneeService.updateColisStatus(colisId as string, "LIVRE");

      Alert.alert("Succès", "Livraison confirmée !", [
        { text: "OK", onPress: () => router.dismissAll() },
      ]);
    } catch (error) {
      console.error("Error confirming delivery:", error);
      Alert.alert("Erreur", "Impossible de valider la livraison.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.neutral[900]} />
        </Pressable>
        <Text style={styles.headerTitle}>Signature Client</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.infoBox}>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={Colors.status.LIVRE}
          />
          <Text style={styles.infoText}>
            Scan réussi. Veuillez faire signer le client pour valider la
            livraison.
          </Text>
        </View>

        <View style={styles.signatureBox}>
          <Text style={styles.placeholderText}>
            Zone de Signature (Canvas à intégrer)
          </Text>
          <Ionicons
            name="create-outline"
            size={48}
            color={Colors.neutral[200]}
          />
        </View>

        <Pressable style={styles.clearButton}>
          <Ionicons
            name="trash-outline"
            size={16}
            color={Colors.neutral[500]}
          />
          <Text style={styles.clearText}>Effacer</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={[
            styles.confirmButton,
            (isSubmitting || !colisId) && { opacity: 0.7 },
          ]}
          onPress={handleSign}
          disabled={isSubmitting || !colisId}
        >
          {isSubmitting ? (
            <ActivityIndicator color={Colors.onPrimary} />
          ) : (
            <>
              <Text style={styles.confirmButtonText}>
                Confirmer la Réception
              </Text>
              <Ionicons name="checkmark" size={20} color={Colors.onPrimary} />
            </>
          )}
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
  content: {
    flex: 1,
    padding: 24,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 109, 59, 0.1)",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 109, 59, 0.2)",
    marginBottom: 24,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.neutral[900],
    lineHeight: 20,
  },
  signatureBox: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.neutral[200],
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.neutral[500],
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  clearText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.neutral[500],
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    backgroundColor: Colors.background,
  },
  confirmButton: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  confirmButtonText: {
    color: Colors.onPrimary,
    fontWeight: "700",
    fontSize: 16,
  },
});
