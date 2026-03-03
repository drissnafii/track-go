import { Colors } from "@/constants/colors";
import { tourneeService } from "@/services/tournee.service";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScanScreen() {
  const { colisId } = useLocalSearchParams();

  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = React.useState(true);
  const [isVerifying, setIsVerifying] = React.useState(false);

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>Accès caméra requis</Text>
          <Text style={styles.permissionText}>
            Pour scanner le code-barres du colis, autorisez l&apos;accès à la
            caméra.
          </Text>
          <Pressable
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Autoriser la caméra</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const handleBarcodeScanned = async ({
    data,
  }: {
    data: string;
    type: string;
  }) => {
    if (!isScanning || !colisId) return;

    setIsScanning(false);
    setIsVerifying(true);

    try {
      const colis = await tourneeService.getColisById(colisId as string);

      const matchesBarcode =
        data.trim() === colis.barcode.trim() || data.trim() === colis.id.trim();

      if (!matchesBarcode) {
        Alert.alert(
          "Code incorrect",
          "Le code scanné ne correspond pas à ce colis.",
          [
            {
              text: "Réessayer",
              onPress: () => setIsScanning(true),
            },
            {
              text: "Annuler",
              style: "cancel",
              onPress: () => router.back(),
            },
          ],
        );
        return;
      }

      router.replace({ pathname: "/signature", params: { colisId } });
    } catch (error) {
      console.error("Erreur vérification scan:", error);
      Alert.alert(
        "Erreur",
        "Impossible de vérifier le colis. Vérifiez votre connexion et réessayez.",
        [
          {
            text: "Réessayer",
            onPress: () => setIsScanning(true),
          },
          {
            text: "Annuler",
            style: "cancel",
            onPress: () => router.back(),
          },
        ],
      );
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={28} color="#ffffff" />
        </Pressable>
        <Text style={styles.headerTitle}>Scan Colis</Text>
        <Ionicons
          name="flash-outline"
          size={24}
          color="#ffffff"
          style={styles.flashIcon}
        />
      </View>

      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "ean13", "ean8", "code128", "code39"],
          }}
          onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
        >
          <View style={styles.overlay}>
            <View style={styles.scanTarget}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </View>
        </CameraView>
        <Text style={styles.instructionText}>
          Alignez le code-barres dans le cadre pour valider le colis.
        </Text>
        {isVerifying && (
          <View style={styles.verifyingBadge}>
            <ActivityIndicator color="#ffffff" size="small" />
            <Text style={styles.verifyingText}>Vérification du colis...</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Pressable
          style={styles.bypassButton}
          onPress={() =>
            router.replace({ pathname: "/signature", params: { colisId } })
          }
        >
          <Text style={styles.bypassButtonText}>Simuler Scan Réussi</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  flashIcon: {
    padding: 8,
  },
  cameraContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    width: "90%",
    aspectRatio: 3 / 4,
    borderRadius: 24,
    overflow: "hidden",
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  scanTarget: {
    width: 230,
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: Colors.primary,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  instructionText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 16,
    textAlign: "center",
  },
  verifyingBadge: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  verifyingText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  bypassButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: "center",
  },
  bypassButtonText: {
    color: Colors.onPrimary,
    fontWeight: "700",
    fontSize: 16,
  },
  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 12,
    textAlign: "center",
  },
  permissionText: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 9999,
  },
  permissionButtonText: {
    color: Colors.onPrimary,
    fontWeight: "700",
    fontSize: 15,
  },
});
