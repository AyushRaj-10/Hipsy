import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "../../components/common/Button";
import BookingStatus from "../../components/booking/BookingStatus";
import { cancelBooking } from "../../api/booking.api";
import { AppTheme } from "../../theme";

export default function BookingDetailsScreen({ route, navigation }) {
  const booking = route?.params?.booking;
  const [loading, setLoading] = useState(false);
  const isExpired =
    booking?.date &&
    ["PENDING", "ACCEPTED"].includes(String(booking.status || "").toUpperCase()) &&
    new Date(booking.date).getTime() <= Date.now();

  const goToBookings = () => {
    navigation.navigate("Tabs", { screen: "MyBookings" });
  };

  if (!booking) {
    return (
      <View style={styles.empty}>
        <Text style={styles.heading}>Booking unavailable</Text>
        <Button title="Back to bookings" onPress={goToBookings} />
      </View>
    );
  }

  const handleCancel = async () => {
    try {
      setLoading(true);
      await cancelBooking(booking._id);
      Alert.alert("Booking cancelled", "The session has been cancelled.");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Unable to cancel", err?.response?.data?.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.heading}>{booking.trainerId?.userId?.name}</Text>
          <Text style={styles.meta}>{booking.trainerId?.specialization}</Text>
          <BookingStatus status={isExpired ? "EXPIRED" : booking.status} scheduledAt={booking.date} />

          <View style={styles.section}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{new Date(booking.date).toDateString()}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>{booking.time}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Price</Text>
            <Text style={styles.value}>₹{booking.trainerId?.price}</Text>
          </View>

          {isExpired ? (
            <Text style={styles.expiredNote}>
              This booking time has passed, so it is marked as expired.
            </Text>
          ) : (
            <Button
              title="Cancel booking"
              variant="secondary"
              onPress={handleCancel}
              loading={loading}
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
    flexGrow: 1,
    justifyContent: "center",
    padding: AppTheme.spacing.lg,
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
  heading: {
    fontSize: 26,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  meta: {
    fontSize: 14,
    color: AppTheme.colors.textMuted,
  },
  section: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    color: AppTheme.colors.textMuted,
    fontWeight: "700",
  },
  value: {
    fontSize: 15,
    color: AppTheme.colors.text,
    fontWeight: "700",
  },
  expiredNote: {
    fontSize: 13,
    color: AppTheme.colors.textMuted,
    lineHeight: 19,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: AppTheme.spacing.lg,
    gap: 16,
  },
});
