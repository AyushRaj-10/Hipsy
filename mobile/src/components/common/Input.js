import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { AppTheme } from "../../theme";

export default function Input({
  label,
  error,
  style,
  inputStyle,
  multiline,
  ...props
}) {
  return (
    <View style={[styles.wrapper, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={AppTheme.colors.textMuted}
        multiline={multiline}
        style={[
          styles.input,
          multiline && styles.multiline,
          error && styles.inputError,
          inputStyle,
        ]}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  label: {
    color: AppTheme.colors.text,
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    minHeight: 52,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    backgroundColor: AppTheme.colors.surface,
    paddingHorizontal: 16,
    color: AppTheme.colors.text,
    fontSize: 15,
  },
  multiline: {
    minHeight: 120,
    paddingTop: 16,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: AppTheme.colors.danger,
  },
  error: {
    color: AppTheme.colors.danger,
    fontSize: 13,
  },
});
