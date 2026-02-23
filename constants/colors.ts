// constants/colors.ts — Track&Go Design System

import { Platform } from "react-native";

export const Colors = {
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  secondary: "#7C3AED",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  neutral: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    500: "#64748B",
    700: "#334155",
    900: "#0F172A",
  },
  background: "#FFFFFF",
  backgroundDark: "#0F172A",

  // Status-specific colors for map markers and badges
  status: {
    EN_ATTENTE: "#94A3B8", // Gray
    EN_COURS: "#F59E0B", // Orange
    LIVRE: "#22C55E", // Green
    ECHEC: "#EF4444", // Red
    INCIDENT: "#EF4444", // Red
  },

  light: {
    text: "#11181C",
    background: "#FFFFFF",
    tint: "#2563EB",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: "#2563EB",
  },
  dark: {
    text: "#ECEDEE",
    background: "#0F172A",
    tint: "#60A5FA",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#60A5FA",
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
