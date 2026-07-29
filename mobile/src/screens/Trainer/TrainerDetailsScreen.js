import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import Rating from "../../components/trainer/Rating";
import TrainerImage from "../../components/trainer/TrainerImage";
import { getTrainerById } from "../../api/trainer.api";
import { AppTheme } from "../../theme";

export default function TrainerDetailsScreen({ route, navigation }) {
  const id = route?.params?.id;
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const goToTrainers = () => {
    navigation.navigate("Tabs", { screen: "TrainerList" });
  };

  useEffect(() => {
    loadTrainer();
  }, [id]);

  const loadTrainer = async () => {
    try {
      if (!id) {
        setError("Missing trainer id.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      const data = await getTrainerById(id);
      setTrainer(data);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load trainer details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader label="Loading trainer details..." />;
  }

  if (!trainer) {
    return (
      <EmptyState
        title="Trainer unavailable"
        description={error || "Try another trainer from the list and come back later."}
        actionLabel="Back to trainers"
        onAction={goToTrainers}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <TrainerImage uri={trainer.userId?.profileImage} size={112} />
          <View style={styles.headerCopy}>
            <Text style={styles.name}>{trainer.userId?.name}</Text>
            <Text style={styles.specialization}>{trainer.specialization}</Text>
            <Rating value={trainer.rating} count={trainer.totalReviews} />
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Trainer info</Text>
          <Text style={styles.detailText}>Experience: {trainer.experience} years</Text>
          <Text style={styles.detailText}>Price: ₹{trainer.price} per session</Text>
          <Text style={styles.detailText}>Total reviews: {trainer.totalReviews}</Text>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>About this trainer</Text>
          <Text style={styles.description}>
            {trainer.bio ||
              "This trainer is part of the Hipsy mobile experience and ready for booking."}
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            title="Book trainer"
            onPress={() => navigation.navigate("CreateBooking", { trainerId: id })}
          />
          <Button
            title="View reviews"
            variant="secondary"
            onPress={() => navigation.navigate("ReviewList", { trainerId: id })}
          />
          <Button
            title="Leave review"
            variant="ghost"
            onPress={() => navigation.navigate("AddReview", { trainerId: id })}
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
  content: {
    padding: AppTheme.spacing.lg,
    gap: 16,
  },
  card: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 30,
    padding: AppTheme.spacing.lg,
    flexDirection: "row",
    gap: 16,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    ...AppTheme.shadow.card,
  },
  headerCopy: {
    flex: 1,
    justifyContent: "center",
    gap: 8,
  },
  name: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  specialization: {
    fontSize: 15,
    color: AppTheme.colors.textMuted,
    fontWeight: "600",
  },
  detailsCard: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 28,
    padding: AppTheme.spacing.lg,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    gap: 10,
    ...AppTheme.shadow.card,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  detailText: {
    fontSize: 14,
    lineHeight: 21,
    color: AppTheme.colors.textMuted,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: AppTheme.colors.textMuted,
  },
  actions: {
    gap: 12,
    marginBottom: AppTheme.spacing.xxl,
  },
});
