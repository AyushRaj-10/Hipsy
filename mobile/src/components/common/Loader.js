import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { AppTheme } from "../../theme";

export default function Loader({ label = "Loading..." }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ActivityIndicator size="large" color={AppTheme.colors.accent} />
        <Text style={styles.text}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppTheme.colors.background,
    padding: AppTheme.spacing.lg,
  },
  card: {
    alignItems: "center",
    gap: 14,
    backgroundColor: AppTheme.colors.surface,
    paddingVertical: 24,
    paddingHorizontal: 28,
    borderRadius: 28,
    ...AppTheme.shadow.card,
  },
  text: {
    color: AppTheme.colors.textMuted,
    fontSize: 14,
    fontWeight: "600",
  },
});
