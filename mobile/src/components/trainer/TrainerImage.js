import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { AppTheme } from "../../theme";

const getInitials = (value = "") =>
  value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "T";

export default function TrainerImage({ uri, name, size = 96 }) {
  const initials = getInitials(name);

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[styles.image, { width: size, height: size, borderRadius: size * 0.28 }]}
      />
    );
  }

  return (
    <View style={[styles.fallback, { width: size, height: size, borderRadius: size * 0.28 }]}>
      <Text style={styles.initials}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: AppTheme.colors.surfaceMuted,
  },
  fallback: {
    backgroundColor: AppTheme.colors.accentSoft,
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    color: AppTheme.colors.accentStrong,
    fontSize: 24,
    fontWeight: "900",
  },
});
