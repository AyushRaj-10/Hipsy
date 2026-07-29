import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";
import Input from "../../components/common/Input";
import { registerUser } from "../../api/auth.api";
import { AppTheme } from "../../theme";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all of the fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await registerUser({ name, email, password });
      Alert.alert("Account created", "You can now log in.");
      navigation.navigate("Login");
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <Text style={styles.kicker}>Get started</Text>
          <Text style={styles.heading}>Create your Hipsy account.</Text>
          <Text style={styles.subheading}>
            Join the app, find a trainer, and keep every session organized in one place.
          </Text>
        </View>

        <View style={styles.card}>
          <ErrorMessage message={error} />

          <Input label="Full name" placeholder="Your name" value={name} onChangeText={setName} />
          <Input
            label="Email"
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Password"
            placeholder="Choose a password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Button title="Create account" onPress={submit} loading={loading} />
          <Button
            title="Back to login"
            variant="secondary"
            onPress={() => navigation.navigate("Login")}
          />
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
    padding: AppTheme.spacing.lg,
    justifyContent: "center",
    gap: 24,
  },
  hero: {
    gap: 10,
  },
  kicker: {
    color: AppTheme.colors.accent,
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.3,
  },
  heading: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  subheading: {
    color: AppTheme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 30,
    padding: AppTheme.spacing.lg,
    gap: 16,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    ...AppTheme.shadow.card,
  },
});
