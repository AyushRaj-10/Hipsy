import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppTheme } from "../../theme";

const STATUS_STYLES = {
  pending: { bg: AppTheme.colors.accentSoft, fg: AppTheme.colors.accentStrong },
  accepted: { bg: AppTheme.colors.successSoft, fg: AppTheme.colors.success },
  rejected: { bg: AppTheme.colors.dangerSoft, fg: AppTheme.colors.danger },
  cancelled: { bg: AppTheme.colors.dangerSoft, fg: AppTheme.colors.danger },
  expired: { bg: AppTheme.colors.surfaceMuted, fg: AppTheme.colors.textMuted },
};

export default function BookingStatus({ status, scheduledAt }) {
  const key = useMemo(() => {
    const normalized = String(status || "PENDING").toLowerCase();

    if (
      scheduledAt &&
      ["pending", "accepted"].includes(normalized) &&
      new Date(scheduledAt).getTime() <= Date.now()
    ) {
      return "expired";
    }

    return normalized;
  }, [scheduledAt, status]);

  const theme = STATUS_STYLES[key] || STATUS_STYLES.pending;
  const label = key.charAt(0).toUpperCase() + key.slice(1);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.text, { color: theme.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
});
