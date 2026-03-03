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
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Accent Bar */}
          <View style={styles.accentBar} />

          {/* Logo Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Ionicons name="cube" size={48} color="#0057d1" />
            </View>
            <Text style={styles.title}>Track&amp;Go</Text>
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
                  color="#ef4444"
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
                  color={identifiantFocused ? "#0057d1" : "#94a3b8"}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="nom@exemple.com"
                  placeholderTextColor="#94a3b8"
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
                  color={passwordFocused ? "#0057d1" : "#94a3b8"}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Votre mot de passe"
                  placeholderTextColor="#94a3b8"
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
                    color="#94a3b8"
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
                <Ionicons name="logo-google" size={20} color="#0F172A" />
                <Text style={styles.socialButtonText}>Google</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.socialButton,
                  pressed && styles.socialButtonPressed,
                ]}
              >
                <Ionicons name="logo-apple" size={20} color="#0F172A" />
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
    backgroundColor: "#f5f7f8",
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
    backgroundColor: "#0057d1",
  },
  logoSection: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 48,
  },
  logoContainer: {
    backgroundColor: "rgba(0, 87, 209, 0.1)",
    padding: 16,
    borderRadius: 24,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#64748B",
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
    color: "#334155",
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
    color: "#0057d1",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 16,
    height: 56,
  },
  inputWrapperFocused: {
    borderColor: "#0057d1",
    shadowColor: "#0057d1",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#0F172A",
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
    backgroundColor: "#0057d1",
    borderRadius: 9999,
    height: 56,
    marginTop: 16,
    gap: 8,
    shadowColor: "#0057d1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
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
    backgroundColor: "#e2e8f0",
  },
  dividerText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#94a3b8",
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
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    height: 48,
    gap: 8,
  },
  socialButtonPressed: {
    backgroundColor: "#f8fafc",
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  signupText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
  signupLink: {
    fontWeight: "700",
    color: "#0057d1",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    padding: 12,
    borderRadius: 12,
    gap: 8,
    marginBottom: 8,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "600",
  },
});
