import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Clock3,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react-native";

import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import ProfileAvatar from "../../components/profile/ProfileAvatar";
import Rating from "../../components/trainer/Rating";
import { getNotifications } from "../../api/notification.api";
import { getMyBookings } from "../../api/booking.api";
import { getTrainers } from "../../api/trainer.api";
import { AuthContext } from "../../context/AuthContext";
import { AppTheme } from "../../theme";

const quickActions = [
  { title: "Find trainers", icon: Search, route: "TrainerList" },
  { title: "My bookings", icon: CalendarDays, route: "MyBookings" },
  { title: "Notifications", icon: Bell, route: "Notifications" },
  { title: "Profile", icon: UserRound, route: "Profile" },
];

const formatMoney = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

const isUpcomingBooking = (booking) => {
  const status = String(booking?.status || "").toUpperCase();
  const isActiveStatus = status === "PENDING" || status === "ACCEPTED";
  return isActiveStatus && new Date(booking.date).getTime() >= Date.now();
};

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [trainers, setTrainers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const [trainerData, bookingData, notificationData] = await Promise.all([
        getTrainers(),
        getMyBookings(),
        getNotifications(),
      ]);

      setTrainers(Array.isArray(trainerData) ? trainerData : []);
      setBookings(Array.isArray(bookingData) ? bookingData : []);
      setNotifications(Array.isArray(notificationData) ? notificationData : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load your dashboard.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();

    const unsubscribe = navigation.addListener("focus", () => {
      loadDashboard();
    });

    const interval = setInterval(() => {
      loadDashboard();
    }, 60000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return <Loader label="Loading your dashboard from the backend..." />;
  }

  const unreadNotifications = notifications.filter((item) => !item.isRead);
  const upcomingBookings = bookings.filter(isUpcomingBooking).sort(
    (left, right) => new Date(left.date).getTime() - new Date(right.date).getTime()
  );
  const featuredTrainer = [...trainers]
    .sort(
      (left, right) =>
        (Number(right.rating) || 0) - (Number(left.rating) || 0) ||
        (Number(right.totalReviews) || 0) - (Number(left.totalReviews) || 0)
    )
    .find(Boolean);
  const firstName = user?.name?.split(" ")?.[0] || "there";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.kicker}>Hipsy dashboard</Text>
              <Text style={styles.title}>Welcome back, {firstName}.</Text>
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Notifications")}>
              <Bell color={AppTheme.colors.text} size={18} />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Your real-time view of trainers, bookings, and messages pulled from the backend.
          </Text>

          <View style={styles.heroMeta}>
            <ProfileAvatar image={user?.profileImage} name={user?.name} size={62} />
            <View style={styles.heroMetaCopy}>
              <Text style={styles.metaLabel}>Signed in as</Text>
              <Text style={styles.metaValue}>{user?.email}</Text>
              <Text style={styles.metaSubtle}>{user?.role || "USER"}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.heroCta} onPress={() => navigation.navigate("TrainerList")}>
            <View>
              <Text style={styles.heroCtaLabel}>Explore live trainers</Text>
              <Text style={styles.heroCtaText}>Open the trainer directory</Text>
            </View>
            <ArrowRight color="#fff" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          <View style={styles.highlightCard}>
            <Sparkles color={AppTheme.colors.accent} size={18} />
            <Text style={styles.highlightValue}>{trainers.length}</Text>
            <Text style={styles.highlightLabel}>Trainers loaded from backend</Text>
          </View>
          <View style={styles.highlightCard}>
            <CalendarDays color={AppTheme.colors.accent} size={18} />
            <Text style={styles.highlightValue}>{upcomingBookings.length}</Text>
            <Text style={styles.highlightLabel}>Upcoming bookings</Text>
          </View>
          <View style={styles.highlightCard}>
            <Bell color={AppTheme.colors.accent} size={18} />
            <Text style={styles.highlightValue}>{unreadNotifications.length}</Text>
            <Text style={styles.highlightLabel}>Unread notifications</Text>
          </View>
        </View>

        {error ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>Couldn’t refresh data</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={loadDashboard}>
              <Text style={styles.retryText}>Try again</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Next up</Text>
          <Text style={styles.sectionHint}>The nearest active booking from your account.</Text>
        </View>

        {upcomingBookings[0] ? (
          <View style={styles.featureCard}>
            <View style={styles.featureTop}>
              <View style={styles.featureIcon}>
                <Clock3 color={AppTheme.colors.accent} size={18} />
              </View>
              <Text style={styles.featureBadge}>{String(upcomingBookings[0].status).toUpperCase()}</Text>
            </View>
            <Text style={styles.featureTitle}>
              {upcomingBookings[0].trainerId?.userId?.name || "Trainer"} on{" "}
              {new Date(upcomingBookings[0].date).toDateString()}
            </Text>
            <Text style={styles.featureText}>{upcomingBookings[0].time}</Text>
            <Text style={styles.featureSubtext}>
              {upcomingBookings[0].trainerId?.specialization || "Training session"}
            </Text>
            <TouchableOpacity
              style={styles.featureAction}
              onPress={() => navigation.navigate("BookingDetails", { booking: upcomingBookings[0] })}
            >
              <Text style={styles.featureActionText}>View booking details</Text>
              <ArrowRight color={AppTheme.colors.primary} size={18} />
            </TouchableOpacity>
          </View>
        ) : (
          <EmptyState
            title="No upcoming bookings"
            description="Your next session will appear here once you book a trainer."
            actionLabel="Find trainers"
            onAction={() => navigation.navigate("TrainerList")}
          />
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured trainer</Text>
          <Text style={styles.sectionHint}>Pulled from the live trainer list and sorted by rating.</Text>
        </View>

        {featuredTrainer ? (
          <TouchableOpacity
            style={styles.trainerCard}
            onPress={() => navigation.navigate("TrainerDetails", { id: featuredTrainer._id })}
            activeOpacity={0.92}
          >
            <View style={styles.trainerHeader}>
              <ProfileAvatar
                image={featuredTrainer.userId?.profileImage}
                name={featuredTrainer.userId?.name}
                size={74}
              />
              <View style={styles.trainerHeaderCopy}>
                <Text style={styles.trainerName}>{featuredTrainer.userId?.name}</Text>
                <Text style={styles.trainerSpecialization}>{featuredTrainer.specialization}</Text>
                <Rating value={featuredTrainer.rating} count={featuredTrainer.totalReviews} />
              </View>
            </View>

            <View style={styles.trainerMetaRow}>
              <View style={styles.trainerMetaCard}>
                <Text style={styles.trainerMetaLabel}>Experience</Text>
                <Text style={styles.trainerMetaValue}>{featuredTrainer.experience} years</Text>
              </View>
              <View style={styles.trainerMetaCard}>
                <Text style={styles.trainerMetaLabel}>Price</Text>
                <Text style={styles.trainerMetaValue}>{formatMoney(featuredTrainer.price)}</Text>
              </View>
              <View style={styles.trainerMetaCard}>
                <Text style={styles.trainerMetaLabel}>Location</Text>
                <Text style={styles.trainerMetaValue} numberOfLines={1}>
                  {featuredTrainer.location || "Not shared"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <EmptyState
            title="No trainers yet"
            description="As soon as the backend has trainer profiles, they’ll appear here."
            actionLabel="Refresh"
            onAction={loadDashboard}
          />
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick actions</Text>
          <Text style={styles.sectionHint}>Jump to your most-used screens.</Text>
        </View>

        <View style={styles.actions}>
          {quickActions.map((item) => {
            const Icon = item.icon;

            return (
              <TouchableOpacity
                key={item.title}
                style={styles.actionCard}
                onPress={() => navigation.navigate(item.route)}
              >
                <View style={styles.actionIcon}>
                  <Icon color={AppTheme.colors.accent} size={18} />
                </View>
                <Text style={styles.actionTitle}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent notifications</Text>
          <Text style={styles.sectionHint}>The latest backend updates for your account.</Text>
        </View>

        <View style={styles.notificationList}>
          {notifications.slice(0, 3).length ? (
            notifications.slice(0, 3).map((item) => (
              <View key={item._id} style={styles.notificationCard}>
                <View style={styles.notificationDot} />
                <View style={styles.notificationCopy}>
                  <Text style={styles.notificationTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.notificationMessage} numberOfLines={2}>
                    {item.message}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <EmptyState
              title="No notifications yet"
              description="Notifications from bookings and account activity will show up here."
            />
          )}
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
    borderRadius: 34,
    padding: AppTheme.spacing.lg,
    gap: 16,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    ...AppTheme.shadow.card,
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  kicker: {
    color: AppTheme.colors.accent,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1.4,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900",
    color: AppTheme.colors.text,
    maxWidth: 260,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: AppTheme.colors.surfaceMuted,
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: AppTheme.colors.textMuted,
  },
  heroMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: AppTheme.colors.surfaceSoft,
    borderRadius: 24,
    padding: 14,
  },
  heroMetaCopy: {
    flex: 1,
    gap: 2,
  },
  metaLabel: {
    color: AppTheme.colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  metaValue: {
    color: AppTheme.colors.text,
    fontSize: 15,
    fontWeight: "900",
  },
  metaSubtle: {
    color: AppTheme.colors.accent,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  heroCta: {
    backgroundColor: AppTheme.colors.primary,
    borderRadius: 26,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroCtaLabel: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  heroCtaText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 4,
  },
  grid: {
    flexDirection: "row",
    gap: 12,
  },
  highlightCard: {
    flex: 1,
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 24,
    padding: 14,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    gap: 8,
    ...AppTheme.shadow.card,
  },
  highlightValue: {
    fontSize: 22,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  highlightLabel: {
    fontSize: 12,
    color: AppTheme.colors.textMuted,
    lineHeight: 16,
  },
  errorCard: {
    backgroundColor: AppTheme.colors.dangerSoft,
    borderWidth: 1,
    borderColor: AppTheme.colors.danger,
    borderRadius: 24,
    padding: 16,
    gap: 8,
  },
  errorTitle: {
    color: AppTheme.colors.danger,
    fontSize: 16,
    fontWeight: "900",
  },
  errorText: {
    color: AppTheme.colors.danger,
    fontSize: 13,
    lineHeight: 20,
  },
  retryButton: {
    alignSelf: "flex-start",
    backgroundColor: AppTheme.colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
  },
  retryText: {
    color: AppTheme.colors.text,
    fontWeight: "800",
    fontSize: 12,
  },
  sectionHeader: {
    gap: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  sectionHint: {
    color: AppTheme.colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  featureCard: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 30,
    padding: AppTheme.spacing.lg,
    gap: 10,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    ...AppTheme.shadow.card,
  },
  featureTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  featureIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: AppTheme.colors.accentSoft,
    justifyContent: "center",
    alignItems: "center",
  },
  featureBadge: {
    fontSize: 11,
    fontWeight: "900",
    color: AppTheme.colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  featureTitle: {
    color: AppTheme.colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
  },
  featureText: {
    color: AppTheme.colors.accentStrong,
    fontSize: 15,
    fontWeight: "800",
  },
  featureSubtext: {
    color: AppTheme.colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  featureAction: {
    marginTop: 4,
    backgroundColor: AppTheme.colors.accentSoft,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  featureActionText: {
    color: AppTheme.colors.primary,
    fontSize: 13,
    fontWeight: "900",
  },
  trainerCard: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 30,
    padding: AppTheme.spacing.lg,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    gap: 14,
    ...AppTheme.shadow.card,
  },
  trainerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  trainerHeaderCopy: {
    flex: 1,
    gap: 6,
  },
  trainerName: {
    fontSize: 20,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  trainerSpecialization: {
    fontSize: 14,
    color: AppTheme.colors.textMuted,
    fontWeight: "700",
  },
  trainerMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  trainerMetaCard: {
    flex: 1,
    minWidth: "30%",
    backgroundColor: AppTheme.colors.surfaceSoft,
    borderRadius: 18,
    padding: 12,
    gap: 4,
  },
  trainerMetaLabel: {
    color: AppTheme.colors.textMuted,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  trainerMetaValue: {
    color: AppTheme.colors.text,
    fontSize: 13,
    fontWeight: "900",
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
    width: "48%",
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    gap: 14,
    minHeight: 110,
    ...AppTheme.shadow.card,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppTheme.colors.accentSoft,
    justifyContent: "center",
    alignItems: "center",
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: AppTheme.colors.text,
  },
  notificationList: {
    gap: 12,
  },
  notificationCard: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    flexDirection: "row",
    gap: 12,
    ...AppTheme.shadow.card,
  },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: AppTheme.colors.accent,
    marginTop: 6,
  },
  notificationCopy: {
    flex: 1,
    gap: 4,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  notificationMessage: {
    fontSize: 13,
    color: AppTheme.colors.textMuted,
    lineHeight: 19,
  },
});
