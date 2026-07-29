import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "./Button";
import { AppTheme } from "../../theme";

export default function EmptyState({
  title = "Nothing here yet",
  description,
  actionLabel,
  onAction,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
        {actionLabel && onAction ? (
          <Button title={actionLabel} onPress={onAction} style={styles.button} />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: AppTheme.spacing.lg,
  },
  card: {
    borderRadius: 28,
    backgroundColor: AppTheme.colors.surface,
    padding: AppTheme.spacing.xl,
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
  },
  title: {
    color: AppTheme.colors.text,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  description: {
    color: AppTheme.colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  button: {
    alignSelf: "stretch",
    marginTop: 8,
  },
});
