import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import NotificationCard from "../../components/notification/NotificationCard";
import { deleteNotification, getNotifications, markNotificationRead } from "../../api/notification.api";
import { AppTheme } from "../../theme";

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getNotifications();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  const openNotification = async (id) => {
    try {
      await markNotificationRead(id);
      loadNotifications();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to open notification.");
    }
  };

  const removeNotification = async (id) => {
    try {
      await deleteNotification(id);
      loadNotifications();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to delete notification.");
    }
  };

  if (loading) {
    return <Loader label="Loading notifications..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <NotificationCard
            notification={item}
            onPress={() => openNotification(item._id)}
            onDelete={() => removeNotification(item._id)}
          />
        )}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Notifications</Text>
            <Text style={styles.subtitle}>Updates about bookings, reminders, and account activity.</Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title={error ? "Couldn’t load notifications" : "You’re all caught up"}
            description={error || "No new updates right now."}
            actionLabel="Refresh"
            onAction={loadNotifications}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
  content: {
    paddingTop: AppTheme.spacing.lg,
    paddingBottom: AppTheme.spacing.xxl,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: AppTheme.colors.textMuted,
  },
});
