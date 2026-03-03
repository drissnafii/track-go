// constants/colors.ts — Track&Go Design System

import { Platform } from "react-native";

export const Colors = {
  // MD3-inspired soft and friendly palette
  primary: "#0062a1", // Soft Blue
  onPrimary: "#ffffff",
  primaryContainer: "#d1e4ff",
  onPrimaryContainer: "#001d36",

  secondary: "#535f71", // Muted Slate
  secondaryContainer: "#d7e3f7",
  onSecondaryContainer: "#101c2b",

  tertiary: "#6b5778", // Soft Purple
  tertiaryContainer: "#f2daff",
  onTertiaryContainer: "#251431",

  error: "#ba1a1a",
  errorContainer: "#ffdad6",
  onErrorContainer: "#410002",

  neutral: {
    50: "#fdfcff",
    100: "#f1f0f4",
    200: "#e3e2e6",
    500: "#76777a",
    700: "#44474b",
    900: "#1a1c1e",
  },

  background: "#fdfcff",

  status: {
    EN_ATTENTE: "#535f71",
    EN_COURS: "#6d5e00",
    LIVRE: "#006d3b",
    ECHEC: "#ba1a1a",
    INCIDENT: "#ba1a1a",
  },

  light: {
    text: "#1a1c1e",
    background: "#fdfcff",
    tint: "#0062a1",
    icon: "#44474b",
    tabIconDefault: "#44474b",
    tabIconSelected: "#0062a1",
  },
  dark: {
    text: "#e2e2e6",
    background: "#1a1c1e",
    tint: "#9ecaff",
    icon: "#8e9199",
    tabIconDefault: "#8e9199",
    tabIconSelected: "#9ecaff",
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
