import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppTheme } from "../../theme";

export default function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppTheme.colors.dangerSoft,
    borderColor: AppTheme.colors.danger,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
  },
  text: {
    color: AppTheme.colors.danger,
    fontSize: 14,
    fontWeight: "600",
  },
});
