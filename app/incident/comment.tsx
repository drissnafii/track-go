import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IncidentCommentScreen() {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    // In a real app, this would submit the payload (reason, photo, comment) to the backend
    // and then navigate back to the dashboard.
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.neutral[900]} />
          </Pressable>
          <Text style={styles.headerTitle}>Détails supplémentaires (3/3)</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Ajoutez un commentaire</Text>
          <Text style={styles.subtitle}>
            Précisez la situation pour aider le service client ou la logistique.
            (Optionnel)
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Ex: Le client n'a pas répondu à l'interphone..."
              placeholderTextColor={Colors.neutral[500] as string}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              value={comment}
              onChangeText={setComment}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Valider le rapport</Text>
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color={Colors.onPrimary}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
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
    fontSize: 16,
    fontWeight: "600",
    color: Colors.neutral[900],
  },
  content: {
    padding: 24,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.neutral[900],
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.neutral[500],
    marginBottom: 24,
    lineHeight: 20,
  },
  inputContainer: {
    backgroundColor: Colors.neutral[50],
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
    padding: 16,
  },
  textInput: {
    fontSize: 16,
    color: Colors.neutral[900],
    minHeight: 120,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    backgroundColor: Colors.background,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.error,
    paddingVertical: 16,
    borderRadius: 9999,
    gap: 8,
  },
  submitButtonText: {
    color: Colors.onErrorContainer,
    fontWeight: "700",
    fontSize: 16,
  },
});
