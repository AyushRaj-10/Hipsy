import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppTheme } from "../../theme";
import BookingStatus from "./BookingStatus";

export default function BookingCard({ booking, onPress }) {
  const scheduledAt = booking?.date ? new Date(booking.date).getTime() : 0;
  const isExpired =
    scheduledAt > 0 &&
    ["PENDING", "ACCEPTED"].includes(String(booking.status || "").toUpperCase()) &&
    scheduledAt <= Date.now();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Text style={styles.label}>Trainer</Text>
      <Text style={styles.value}>{booking.trainerId?.userId?.name}</Text>

      <Text style={styles.label}>Date</Text>
      <Text style={styles.value}>{new Date(booking.date).toDateString()}</Text>

      <Text style={styles.label}>Time</Text>
      <Text style={styles.value}>{booking.time}</Text>

      <Text style={styles.label}>Status</Text>
      <BookingStatus status={isExpired ? "EXPIRED" : booking.status} scheduledAt={booking.date} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    ...AppTheme.shadow.card,
  },
  label: {
    fontSize: 13,
    color: AppTheme.colors.textMuted,
    fontWeight: "600",
    marginTop: 4,
  },
  value: {
    fontSize: 15,
    color: AppTheme.colors.text,
    fontWeight: "700",
  },
});
