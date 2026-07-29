import React, { useMemo, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";
import Input from "../../components/common/Input";
import { createBooking } from "../../api/booking.api";
import { AppTheme } from "../../theme";

const parseTime = (value) => {
  const normalized = value.trim().toLowerCase();
  const match = normalized.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/);

  if (!match) {
    return null;
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2] || 0);
  const meridiem = match[3];

  if (minutes > 59) {
    return null;
  }

  if (meridiem) {
    if (hours < 1 || hours > 12) {
      return null;
    }

    if (hours === 12) {
      hours = 0;
    }

    if (meridiem === "pm") {
      hours += 12;
    }
  } else if (hours > 23) {
    return null;
  }

  return { hours, minutes };
};

const combineDateAndTime = (dateValue, timeValue) => {
  const [year, month, day] = dateValue.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  const parsedTime = parseTime(timeValue);

  if (!parsedTime) {
    return null;
  }

  const localDate = new Date(
    year,
    month - 1,
    day,
    parsedTime.hours,
    parsedTime.minutes,
    0,
    0
  );

  return localDate;
};

export default function CreateBookingScreen({ route, navigation }) {
  const trainerId = route?.params?.trainerId;
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("10:00 AM");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const goToBookings = () => {
    navigation.navigate("Tabs", { screen: "MyBookings" });
  };

  const preview = useMemo(() => {
    const combined = combineDateAndTime(date, time);

    if (!combined) {
      return "Enter a valid date and time.";
    }

    const isExpired = combined.getTime() <= Date.now();
    return `${combined.toDateString()} at ${time.trim()}${isExpired ? " - expired" : ""}`;
  }, [date, time]);

  const submitBooking = async () => {
    if (!trainerId) {
      setError("Missing trainer id.");
      return;
    }

    const combined = combineDateAndTime(date, time);

    if (!combined) {
      setError("Enter a valid date and time, like 2026-07-29 and 6:30 PM.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await createBooking({
        trainerId,
        date: combined.toISOString(),
        time: time.trim(),
      });
      Alert.alert("Booking created", "Your session has been booked.");
      goToBookings();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to create booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.heading}>Choose a session</Text>
          <Text style={styles.subtitle}>
            Pick any date and any time. Use formats like `6:30 PM`, `14:30`, or `9 AM`.
          </Text>

          <ErrorMessage message={error} />

          <Input
            label="Date"
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            autoCapitalize="none"
          />

          <Input
            label="Time"
            value={time}
            onChangeText={setTime}
            placeholder="6:30 PM"
            autoCapitalize="characters"
          />

          <View style={styles.previewCard}>
            <Text style={styles.previewLabel}>Preview</Text>
            <Text style={styles.previewText}>{preview}</Text>
          </View>

          <Button title="Book now" onPress={submitBooking} loading={loading} />
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
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: AppTheme.colors.textMuted,
  },
  previewCard: {
    backgroundColor: AppTheme.colors.surfaceSoft,
    borderRadius: 20,
    padding: 14,
    gap: 6,
  },
  previewLabel: {
    fontSize: 12,
    color: AppTheme.colors.textMuted,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  previewText: {
    fontSize: 14,
    color: AppTheme.colors.text,
    fontWeight: "700",
  },
});
