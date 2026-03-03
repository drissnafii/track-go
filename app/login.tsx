import { Colors } from "@/constants/colors";
import { useAuth } from "@/contexts/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

export default function LoginScreen() {
  const { login } = useAuth();
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [identifiantFocused, setIdentifiantFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    if (!identifiant || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      await login(identifiant, password);
      router.replace("/(tabs)");
    } catch {
      setErrorMessage("Identifiant ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          {/* Top Accent Bar */}
          <View style={styles.accentBar} />

          {/* Logo Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Ionicons name="cube" size={48} color={Colors.primary} />
            </View>
            <Text style={styles.title}>Track&Go</Text>
            <Text style={styles.subtitle}>
              Suivez vos expéditions en temps réel
            </Text>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            {errorMessage ? (
              <View style={styles.errorContainer}>
                <Ionicons
                  name="alert-circle-outline"
                  size={18}
                  color={Colors.error}
                />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* Identifiant Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Identifiant</Text>
              <View
                style={[
                  styles.inputWrapper,
                  identifiantFocused && styles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={
                    identifiantFocused ? Colors.primary : Colors.neutral[500]
                  }
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="nom@exemple.com"
                  placeholderTextColor={Colors.neutral[500]}
                  value={identifiant}
                  onChangeText={setIdentifiant}
                  onFocus={() => setIdentifiantFocused(true)}
                  onBlur={() => setIdentifiantFocused(false)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Password Field */}
            <View style={styles.fieldContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Mot de passe</Text>
                <Pressable>
                  <Text style={styles.forgotLink}>Oublié ?</Text>
                </Pressable>
              </View>
              <View
                style={[
                  styles.inputWrapper,
                  passwordFocused && styles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={passwordFocused ? Colors.primary : Colors.neutral[500]}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Votre mot de passe"
                  placeholderTextColor={Colors.neutral[500]}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={Colors.neutral[500]}
                  />
                </Pressable>
              </View>
            </View>

            {/* Submit Button */}
            <Pressable
              style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.submitButtonPressed,
                loading && styles.submitButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <>
                  <Text style={styles.submitText}>Se connecter</Text>
                  <Ionicons name="arrow-forward" size={18} color="#ffffff" />
                </>
              )}
            </Pressable>
          </View>

          {/* Footer Section */}
          <View style={styles.footer}>
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OU CONTINUER AVEC</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialButtons}>
              <Pressable
                style={({ pressed }) => [
                  styles.socialButton,
                  pressed && styles.socialButtonPressed,
                ]}
              >
                <Ionicons
                  name="logo-google"
                  size={20}
                  color={Colors.neutral[700]}
                />
                <Text style={styles.socialButtonText}>Google</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.socialButton,
                  pressed && styles.socialButtonPressed,
                ]}
              >
                <Ionicons
                  name="logo-apple"
                  size={20}
                  color={Colors.neutral[700]}
                />
                <Text style={styles.socialButtonText}>Apple</Text>
              </Pressable>
            </View>

            <Text style={styles.signupText}>
              Pas encore de compte ?{" "}
              <Text style={styles.signupLink}>S&apos;inscrire</Text>
            </Text>
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 32,
  },
  accentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: Colors.primary,
  },
  logoSection: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 48,
  },
  logoContainer: {
    backgroundColor: Colors.primaryContainer,
    padding: 16,
    borderRadius: 24,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: Colors.neutral[900],
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.neutral[500],
  },
  formContainer: {
    gap: 16,
    marginBottom: 48,
  },
  fieldContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.neutral[700],
    paddingHorizontal: 4,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  forgotLink: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.primary,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
    paddingHorizontal: 16,
    height: 56,
  },
  inputWrapperFocused: {
    borderColor: Colors.primary,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.neutral[900],
  },
  passwordInput: {
    paddingRight: 8,
  },
  eyeButton: {
    padding: 4,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 9999,
    height: 56,
    marginTop: 16,
    gap: 8,
  },
  submitButtonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  footer: {
    gap: 24,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.neutral[200],
  },
  dividerText: {
    fontSize: 11,
    fontWeight: "500",
    color: Colors.neutral[500],
    letterSpacing: 1.2,
  },
  socialButtons: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
    height: 52,
    gap: 8,
  },
  socialButtonPressed: {
    backgroundColor: Colors.neutral[50],
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.neutral[700],
  },
  signupText: {
    fontSize: 14,
    color: Colors.neutral[500],
    textAlign: "center",
  },
  signupLink: {
    fontWeight: "700",
    color: Colors.primary,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.errorContainer,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(186, 26, 26, 0.2)",
    gap: 8,
    marginBottom: 8,
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
    fontWeight: "600",
  },
});
