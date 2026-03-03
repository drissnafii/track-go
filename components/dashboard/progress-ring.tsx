import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

interface ProgressRingProps {
  percent: number; // 0–100
  livres: number;
  total: number;
  size?: number;
  strokeWidth?: number;
}

export default function ProgressRing({
  percent,
  livres,
  total,
  size = 180,
  strokeWidth = 16,
}: ProgressRingProps) {
  const animPercent = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animPercent, {
      toValue: percent,
      duration: 900,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [percent, animPercent]);

  // We render a track circle + a filled arc using the "rotate half-disk" trick.
  // The arc is split into two rotatable half-disks clipped by an outer mask.
  const half = size / 2;
  const rotation1 = animPercent.interpolate({
    inputRange: [0, 50, 50, 100],
    outputRange: ["0deg", "180deg", "180deg", "180deg"],
    extrapolate: "clamp",
  });
  const rotation2 = animPercent.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ["0deg", "0deg", "180deg"],
    extrapolate: "clamp",
  });

  // Percentage label interpolation (JS-driven, not native)
  const displayPercent = useRef(new Animated.Value(0)).current;
  const displayRef = useRef(0);
  useEffect(() => {
    Animated.timing(displayPercent, {
      toValue: percent,
      duration: 900,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    displayPercent.addListener(({ value }) => {
      displayRef.current = Math.round(value);
    });
    return () => displayPercent.removeAllListeners();
  }, [percent, displayPercent]);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Track */}
      <View
        style={[
          styles.track,
          {
            width: size,
            height: size,
            borderRadius: half,
            borderWidth: strokeWidth,
          },
        ]}
      />

      {/* Progress arc using two rotating half-disk masks */}
      {/* Left half-disk (covers 0–180°) */}
      <View
        style={[
          styles.halfContainer,
          { width: half, height: size, left: 0, top: 0 },
        ]}
      >
        <Animated.View
          style={[
            styles.halfDisk,
            {
              width: size,
              height: size,
              borderRadius: half,
              borderWidth: strokeWidth,
              borderColor: "#2563EB",
              borderRightColor: "transparent",
              borderTopColor: "transparent",
              transform: [{ rotate: rotation1 }],
              left: 0,
            },
          ]}
        />
      </View>

      {/* Right half-disk (covers 180–360°) */}
      <View
        style={[
          styles.halfContainer,
          { width: half, height: size, left: half, top: 0 },
        ]}
      >
        <Animated.View
          style={[
            styles.halfDisk,
            {
              width: size,
              height: size,
              borderRadius: half,
              borderWidth: strokeWidth,
              borderColor: "#2563EB",
              borderLeftColor: "transparent",
              borderBottomColor: "transparent",
              transform: [{ rotate: rotation2 }],
              left: -half,
            },
          ]}
        />
      </View>

      {/* Center labels */}
      <View style={styles.center}>
        <Text style={styles.percent}>{percent}%</Text>
        <Text style={styles.sub}>
          {livres}/{total} livrés
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignSelf: "center",
  },
  track: {
    position: "absolute",
    borderColor: "#E2E8F0",
  },
  halfContainer: {
    position: "absolute",
    overflow: "hidden",
  },
  halfDisk: {
    position: "absolute",
  },
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  percent: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
  },
  sub: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
    marginTop: 2,
  },
});
