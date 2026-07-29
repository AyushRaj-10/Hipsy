import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppTheme } from "../../theme";

const getInitials = (value = "") =>
  value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "U";

export default function ProfileAvatar({ image, name, onPress, size = 128 }) {
  const initials = getInitials(name);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.8 : 1}>
      {image ? (
        <Image source={{ uri: image }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
      ) : (
        <View style={[styles.fallback, { width: size, height: size, borderRadius: size / 2 }]}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: AppTheme.colors.surfaceMuted,
    borderWidth: 3,
    borderColor: AppTheme.colors.surface,
  },
  fallback: {
    backgroundColor: AppTheme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: AppTheme.colors.surface,
  },
  initials: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
  },
});
