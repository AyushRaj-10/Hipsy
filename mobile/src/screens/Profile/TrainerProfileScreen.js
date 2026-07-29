import React, { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import Input from "../../components/common/Input";
import Loader from "../../components/common/Loader";
import BookingStatus from "../../components/booking/BookingStatus";
import { AppTheme } from "../../theme";
import {
  createTrainerProfile,
  getMyTrainerProfile,
  getTrainerBookings,
  updateTrainerProfile,
} from "../../api/trainer.api";
import { updateBookingStatus } from "../../api/booking.api";

export default function TrainerProfileScreen() {
  const [trainer, setTrainer] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    specialization: "",
    experience: "",
    bio: "",
    location: "",
    price: "",
  });

  useEffect(() => {
    loadTrainerProfile();
  }, []);

  const loadTrainerProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const profile = await getMyTrainerProfile();
      setTrainer(profile);
      setForm({
        specialization: profile.specialization || "",
        experience: String(profile.experience ?? ""),
        bio: profile.bio || "",
        location: profile.location || "",
        price: String(profile.price ?? ""),
      });

      const trainerBookings = await getTrainerBookings(profile._id);
      setBookings(Array.isArray(trainerBookings) ? trainerBookings : []);
    } catch (err) {
      setTrainer(null);
      setBookings([]);
      setError(err?.response?.data?.message || "No trainer profile found yet.");
    } finally {
      setLoading(false);
    }
  };

  const saveTrainer = async () => {
    if (!form.specialization.trim() || !form.experience.trim() || !form.price.trim()) {
      setError("Specialization, experience, and price are required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        specialization: form.specialization.trim(),
        experience: Number(form.experience),
        bio: form.bio.trim(),
        location: form.location.trim(),
        price: Number(form.price),
      };

      const saved = trainer
        ? await updateTrainerProfile(payload)
        : await createTrainerProfile(payload);

      setTrainer(saved);
      Alert.alert("Trainer profile saved", "Your trainer profile is ready.");
      const trainerBookings = await getTrainerBookings(saved._id);
      setBookings(Array.isArray(trainerBookings) ? trainerBookings : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to save trainer profile.");
    } finally {
      setSaving(false);
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status);
      const trainerBookings = await getTrainerBookings(trainer?._id);
      setBookings(Array.isArray(trainerBookings) ? trainerBookings : []);
    } catch (err) {
      Alert.alert("Unable to update", err?.response?.data?.message || "Please try again.");
    }
  };

  if (loading) {
    return <Loader label="Loading trainer profile..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.heading}>Trainer profile</Text>
          <Text style={styles.subtitle}>
            Create or update your trainer profile and manage booking requests from one place.
          </Text>

          <ErrorMessage message={error} />

          <Input
            label="Specialization"
            value={form.specialization}
            onChangeText={(value) => setForm((prev) => ({ ...prev, specialization: value }))}
          />
          <Input
            label="Experience"
            value={form.experience}
            onChangeText={(value) => setForm((prev) => ({ ...prev, experience: value }))}
            keyboardType="numeric"
          />
          <Input
            label="Price"
            value={form.price}
            onChangeText={(value) => setForm((prev) => ({ ...prev, price: value }))}
            keyboardType="numeric"
          />
          <Input
            label="Location"
            value={form.location}
            onChangeText={(value) => setForm((prev) => ({ ...prev, location: value }))}
          />
          <Input
            label="Bio"
            value={form.bio}
            onChangeText={(value) => setForm((prev) => ({ ...prev, bio: value }))}
            multiline
          />

          <Button
            title={trainer ? "Update trainer profile" : "Create trainer profile"}
            onPress={saveTrainer}
            loading={saving}
          />
          <Button title="Refresh" variant="secondary" onPress={loadTrainerProfile} />
        </View>

        {trainer ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Booking requests</Text>
            {bookings.length ? (
              <FlatList
                data={bookings}
                scrollEnabled={false}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View style={styles.bookingCard}>
                    <Text style={styles.bookingName}>{item.userId?.name || "Client"}</Text>
                    <Text style={styles.bookingMeta}>
                      {new Date(item.date).toDateString()} at {item.time}
                    </Text>
                    <BookingStatus status={item.status} />
                    {item.status === "PENDING" ? (
                      <View style={styles.bookingActions}>
                        <Button
                          title="Accept"
                          onPress={() => changeBookingStatus(item._id, "ACCEPTED")}
                          style={styles.actionButton}
                        />
                        <Button
                          title="Reject"
                          variant="secondary"
                          onPress={() => changeBookingStatus(item._id, "REJECTED")}
                          style={styles.actionButton}
                        />
                      </View>
                    ) : null}
                  </View>
                )}
              />
            ) : (
              <EmptyState
                title="No bookings yet"
                description="Trainer booking requests will appear here when clients start booking you."
              />
            )}
          </View>
        ) : null}
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
  card: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 30,
    padding: AppTheme.spacing.lg,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    gap: 14,
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
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: AppTheme.colors.text,
    paddingHorizontal: 4,
  },
  bookingCard: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 24,
    padding: AppTheme.spacing.lg,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    gap: 8,
    marginBottom: 12,
    ...AppTheme.shadow.card,
  },
  bookingName: {
    fontSize: 16,
    fontWeight: "800",
    color: AppTheme.colors.text,
  },
  bookingMeta: {
    fontSize: 13,
    color: AppTheme.colors.textMuted,
  },
  bookingActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
  },
});
