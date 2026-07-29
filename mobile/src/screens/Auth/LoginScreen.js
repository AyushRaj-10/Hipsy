import React, { useContext, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";
import Input from "../../components/common/Input";
import { loginUser } from "../../api/auth.api";
import { AuthContext } from "../../context/AuthContext";
import { AppTheme } from "../../theme";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await loginUser({ email, password });
      await login(response);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to login right now.");
      Alert.alert("Login failed", err?.response?.data?.message || "Unable to login right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <Text style={styles.kicker}>Welcome back</Text>
          <Text style={styles.heading}>Train smarter with Hipsy.</Text>
          <Text style={styles.subheading}>
            Jump back into trainer discovery, bookings, and your activity in one place.
          </Text>
        </View>

        <View style={styles.card}>
          <ErrorMessage message={error} />

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
            placeholder="Your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Button title="Login" onPress={handleLogin} loading={loading} style={styles.button} />

          <View style={styles.links}>
            <Button
              title="Create account"
              variant="secondary"
              onPress={() => navigation.navigate("Register")}
              style={styles.secondaryButton}
            />
            <Button
              title="Forgot password"
              variant="ghost"
              onPress={() => navigation.navigate("ForgotPassword")}
              style={styles.secondaryButton}
            />
          </View>
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
    fontSize: 34,
    lineHeight: 40,
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
  button: {
    marginTop: 4,
  },
  links: {
    gap: 10,
  },
  secondaryButton: {
    width: "100%",
  },
});
