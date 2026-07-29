import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "../../components/common/Button";
import { AppTheme } from "../../theme";

export default function ForgotPasswordScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.heading}>Password reset</Text>
          <Text style={styles.description}>
            The mobile app does not have a password reset endpoint wired yet, so this screen is a
            safe handoff back to login instead of a broken submission flow.
          </Text>
          <Button title="Back to login" onPress={() => navigation.navigate("Login")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: AppTheme.spacing.lg,
  },
  card: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 30,
    padding: AppTheme.spacing.xl,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    gap: 14,
    ...AppTheme.shadow.card,
  },
  heading: {
    fontSize: 24,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: AppTheme.colors.textMuted,
  },
});
