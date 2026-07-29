import React, { useContext, useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BadgeCheck, CalendarDays, Cake, LogOut, PencilLine, Lock, Shield, UserRound } from "lucide-react-native";

import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import ProfileAvatar from "../../components/profile/ProfileAvatar";
import { deleteAccount, getProfile } from "../../api/user.api";
import { AuthContext } from "../../context/AuthContext";
import { AppTheme } from "../../theme";

const formatLabel = (value) =>
  value
    ? value
        .toString()
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
    : "Not set";

export default function ProfileScreen({ navigation }) {
  const { user: authUser, logout } = useContext(AuthContext);
  const [user, setUser] = useState(authUser);
  const [loading, setLoading] = useState(!authUser);
  const [refreshing, setRefreshing] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function loadProfile(silent = false) {
    try {
      if (silent) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const data = await getProfile();
      setUser(data);
    } catch (error) {
      Alert.alert(
        "Profile unavailable",
        error?.response?.data?.message || "We couldn’t load your profile from the backend."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadProfile();

    const unsubscribe = navigation.addListener("focus", () => {
      loadProfile(true);
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
    } finally {
      setLoggingOut(false);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete account",
      "This permanently removes your account and cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete account",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAccount();
              await logout();
            } catch (error) {
              Alert.alert(
                "Unable to delete account",
                error?.response?.data?.message || "Please try again."
              );
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <Loader label="Loading your profile from the backend..." />;
  }

  if (!user) {
    return (
      <View style={styles.empty}>
        <Text style={styles.heading}>Profile unavailable</Text>
        <Text style={styles.emptyText}>
          We could not load your profile data right now.
        </Text>
        <Button title="Try again" onPress={() => loadProfile()} />
      </View>
    );
  }

  const profileStats = [
    {
      icon: Shield,
      label: "Role",
      value: formatLabel(user.role),
    },
    {
      icon: UserRound,
      label: "Gender",
      value: formatLabel(user.gender),
    },
    {
      icon: Cake,
      label: "Age",
      value: user.age ? `${user.age}` : "Not set",
    },
    {
      icon: CalendarDays,
      label: "Member since",
      value: user.createdAt ? new Date(user.createdAt).getFullYear() : "Unknown",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <View style={styles.heroTop}>
            <View style={styles.roleChip}>
              <BadgeCheck color={AppTheme.colors.success} size={14} />
              <Text style={styles.roleChipText}>{formatLabel(user.role)}</Text>
            </View>

            <TouchableOpacity style={styles.refreshChip} onPress={() => loadProfile(true)}>
              <Text style={styles.refreshText}>{refreshing ? "Refreshing..." : "Refresh"}</Text>
            </TouchableOpacity>
          </View>

          <ProfileAvatar image={user.profileImage} name={user.name} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>

          <View style={styles.detailPills}>
            <View style={styles.detailPill}>
              <Text style={styles.detailLabel}>Phone</Text>
              <Text style={styles.detailValue}>{user.phone || "Not set"}</Text>
            </View>
            <View style={styles.detailPill}>
              <Text style={styles.detailLabel}>Fitness goal</Text>
              <Text style={styles.detailValue}>{formatLabel(user.fitnessGoal)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile details</Text>
          <View style={styles.statsGrid}>
            {profileStats.map((item) => {
              const Icon = item.icon;

              return (
                <View key={item.label} style={styles.statCard}>
                  <View style={styles.statIcon}>
                    <Icon color={AppTheme.colors.accent} size={16} />
                  </View>
                  <Text style={styles.statLabel}>{item.label}</Text>
                  <Text style={styles.statValue}>{item.value}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account actions</Text>
          <View style={styles.actions}>
            <Button
              title="Edit profile"
              icon={<PencilLine color="#fff" size={16} />}
              onPress={() => navigation.navigate("EditProfile", { user })}
            />
            <Button
              title="Change password"
              variant="secondary"
              icon={<Lock color={AppTheme.colors.text} size={16} />}
              onPress={() => navigation.navigate("ChangePassword")}
            />
            {user.role === "TRAINER" ? (
              <Button
                title="Trainer profile"
                variant="secondary"
                onPress={() => navigation.navigate("TrainerProfile")}
              />
            ) : null}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Session controls</Text>
          <Button
            title={loggingOut ? "Logging out..." : "Logout"}
            variant="secondary"
            icon={<LogOut color={AppTheme.colors.text} size={16} />}
            onPress={handleLogout}
            loading={loggingOut}
          />
          <Button
            title="Delete account"
            variant="danger"
            onPress={handleDeleteAccount}
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
    padding: AppTheme.spacing.lg,
    gap: 18,
    paddingBottom: AppTheme.spacing.xxl,
  },
  hero: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 32,
    padding: AppTheme.spacing.lg,
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    ...AppTheme.shadow.card,
  },
  heroTop: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roleChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: AppTheme.colors.successSoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  roleChipText: {
    color: AppTheme.colors.success,
    fontSize: 12,
    fontWeight: "800",
  },
  refreshChip: {
    backgroundColor: AppTheme.colors.surfaceMuted,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  refreshText: {
    color: AppTheme.colors.textMuted,
    fontSize: 12,
    fontWeight: "800",
  },
  name: {
    fontSize: 26,
    fontWeight: "900",
    color: AppTheme.colors.text,
    textAlign: "center",
  },
  email: {
    fontSize: 14,
    color: AppTheme.colors.textMuted,
    textAlign: "center",
  },
  detailPills: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
  },
  detailPill: {
    flex: 1,
    backgroundColor: AppTheme.colors.surfaceSoft,
    borderRadius: 20,
    padding: 14,
    gap: 6,
  },
  detailLabel: {
    fontSize: 12,
    color: AppTheme.colors.textMuted,
    fontWeight: "700",
  },
  detailValue: {
    fontSize: 14,
    color: AppTheme.colors.text,
    fontWeight: "800",
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    width: "48%",
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    gap: 8,
    ...AppTheme.shadow.card,
  },
  statIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: AppTheme.colors.accentSoft,
    justifyContent: "center",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: AppTheme.colors.textMuted,
    fontWeight: "700",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  actions: {
    gap: 10,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    padding: AppTheme.spacing.lg,
    backgroundColor: AppTheme.colors.background,
  },
  heading: {
    fontSize: 22,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  emptyText: {
    fontSize: 14,
    color: AppTheme.colors.textMuted,
    textAlign: "center",
  },
});
