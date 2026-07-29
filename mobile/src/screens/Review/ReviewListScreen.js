import React, { useContext, useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import ReviewCard from "../../components/review/ReviewCard";
import { deleteReview, getTrainerReviews } from "../../api/review.api";
import { AppTheme } from "../../theme";
import { AuthContext } from "../../context/AuthContext";

export default function ReviewListScreen({ route, navigation }) {
  const trainerId = route?.params?.trainerId;
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(Boolean(trainerId));
  const [error, setError] = useState("");

  const goToTrainers = () => {
    navigation.navigate("Tabs", { screen: "TrainerList" });
  };

  useEffect(() => {
    if (trainerId) {
      loadReviews();
    } else {
      setLoading(false);
    }
  }, [trainerId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getTrainerReviews(trainerId);
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  const removeReview = async (id) => {
    try {
      await deleteReview(id);
      loadReviews();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to delete review.");
    }
  };

  if (!trainerId) {
    return (
      <EmptyState
        title="Pick a trainer first"
        description="Reviews are loaded for a specific trainer, so open a trainer profile to continue."
        actionLabel="Browse trainers"
        onAction={goToTrainers}
      />
    );
  }

  if (loading) {
    return <Loader label="Loading reviews..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Trainer reviews</Text>
            <Text style={styles.subtitle}>
              A quick view of what other people are saying about this trainer.
            </Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title={error ? "Couldn’t load reviews" : "No reviews yet"}
            description={error || "Be the first to leave feedback once you’ve tried a session."}
            actionLabel="Leave review"
            onAction={() => navigation.navigate("AddReview", { trainerId })}
          />
        }
        renderItem={({ item }) => {
          const isMine = String(item.userId?._id || item.userId) === String(user?._id);

          return (
            <ReviewCard
              review={item}
              onEdit={isMine ? () => navigation.navigate("ReviewEdit", { review: item }) : undefined}
              onDelete={isMine ? () => removeReview(item._id) : undefined}
            />
          );
        }}
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
    lineHeight: 34,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: AppTheme.colors.textMuted,
  },
});
