import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppTheme } from "../../theme";

export default function ReviewCard({ review, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{review.userId?.name}</Text>
      <Text style={styles.rating}>{"⭐".repeat(review.rating || 0)}</Text>
      <Text style={styles.comment}>{review.comment}</Text>
      {onEdit || onDelete ? (
        <View style={styles.actions}>
          {onEdit ? (
            <TouchableOpacity style={styles.actionChip} onPress={onEdit}>
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
          ) : null}
          {onDelete ? (
            <TouchableOpacity style={[styles.actionChip, styles.destructive]} onPress={onDelete}>
              <Text style={[styles.actionText, styles.destructiveText]}>Delete</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    ...AppTheme.shadow.card,
  },
  name: {
    fontSize: 16,
    fontWeight: "800",
    color: AppTheme.colors.text,
  },
  rating: {
    marginTop: 6,
    fontSize: 15,
    color: AppTheme.colors.accent,
  },
  comment: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: AppTheme.colors.textMuted,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  actionChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: AppTheme.colors.surfaceMuted,
  },
  actionText: {
    fontSize: 12,
    fontWeight: "800",
    color: AppTheme.colors.text,
  },
  destructive: {
    backgroundColor: AppTheme.colors.dangerSoft,
  },
  destructiveText: {
    color: AppTheme.colors.danger,
  },
});
