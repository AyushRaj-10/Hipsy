import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "../../components/common/Button";
import { AppTheme } from "../../theme";

export default function ChangePasswordScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.heading}>Change password</Text>
          <Text style={styles.description}>
            A password change endpoint is not wired in the current mobile API layer, so this screen
            intentionally stops here instead of pretending to save data.
          </Text>
          <Button title="Back to profile" onPress={() => navigation.goBack()} />
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
    gap: 14,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    ...AppTheme.shadow.card,
  },
  heading: {
    fontSize: 26,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: AppTheme.colors.textMuted,
  },
});
