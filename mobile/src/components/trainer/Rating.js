import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppTheme } from "../../theme";

export default function Rating({ value = 0, count }) {
  return (
    <View style={styles.container}>
      <Text style={styles.star}>★</Text>
      <Text style={styles.value}>{Number(value).toFixed(1)}</Text>
      {typeof count === "number" ? <Text style={styles.count}>({count})</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  star: {
    color: AppTheme.colors.accent,
    fontSize: 14,
  },
  value: {
    color: AppTheme.colors.text,
    fontWeight: "700",
  },
  count: {
    color: AppTheme.colors.textMuted,
    fontSize: 12,
  },
});
