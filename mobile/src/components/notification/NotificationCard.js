import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppTheme } from "../../theme";

export default function NotificationCard({ notification, onPress, onDelete }) {
  return (
      <TouchableOpacity
      style={[styles.card, notification.isRead ? styles.read : styles.unread]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.row}>
        <View style={styles.dot} />
        <View style={styles.body}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.message}>{notification.message}</Text>
          <Text style={styles.date}>
            {new Date(notification.createdAt).toDateString()}
          </Text>
          {onDelete ? (
            <TouchableOpacity
              style={styles.deleteChip}
              onPress={(event) => {
                event?.stopPropagation?.();
                onDelete();
              }}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 22,
    borderWidth: 1,
  },
  unread: {
    backgroundColor: AppTheme.colors.surface,
    borderColor: AppTheme.colors.border,
  },
  read: {
    backgroundColor: AppTheme.colors.surfaceSoft,
    borderColor: AppTheme.colors.border,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: AppTheme.colors.accent,
    marginTop: 6,
  },
  body: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: AppTheme.colors.text,
  },
  message: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: AppTheme.colors.textMuted,
  },
  date: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "600",
    color: AppTheme.colors.accent,
  },
  deleteChip: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: AppTheme.colors.dangerSoft,
  },
  deleteText: {
    color: AppTheme.colors.danger,
    fontSize: 12,
    fontWeight: "800",
  },
});
