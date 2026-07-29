import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";
import Input from "../../components/common/Input";
import StarRating from "../../components/review/StarRating";
import { updateReview } from "../../api/review.api";
import { AppTheme } from "../../theme";

export default function ReviewEditScreen({ route, navigation }) {
  const { review } = route.params;
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    if (!rating || !comment.trim()) {
      setError("Please fill in both the rating and comment.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await updateReview(review._id, {
        trainerId: review.trainerId?._id || review.trainerId,
        rating,
        comment,
      });
      Alert.alert("Review updated", "Your feedback has been saved.");
      navigation.goBack();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to update review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.heading}>Edit review</Text>
          <Text style={styles.subtitle}>Make quick changes to your feedback.</Text>

          <ErrorMessage message={error} />

          <View style={styles.ratingBlock}>
            <Text style={styles.label}>Rating</Text>
            <StarRating rating={rating} setRating={setRating} />
          </View>

          <Input
            label="Comment"
            value={comment}
            onChangeText={setComment}
            multiline
          />

          <Button title="Save review" onPress={save} loading={loading} />
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
  subtitle: {
    fontSize: 14,
    color: AppTheme.colors.textMuted,
    lineHeight: 21,
  },
  ratingBlock: {
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: AppTheme.colors.text,
  },
});
