import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BadgeCheck, MapPin } from "lucide-react-native";

import { AppTheme } from "../../theme";
import Rating from "./Rating";
import TrainerImage from "./TrainerImage";

export default function TrainerCard({ trainer, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.92}>
      <TrainerImage uri={trainer.userId?.profileImage} name={trainer.userId?.name} size={88} />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>
            {trainer.userId?.name}
          </Text>
          {trainer.isVerified ? <BadgeCheck color={AppTheme.colors.success} size={16} /> : null}
        </View>
        <Text style={styles.meta}>{trainer.specialization}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>Experience: {trainer.experience} years</Text>
          {trainer.location ? (
            <View style={styles.locationRow}>
              <MapPin color={AppTheme.colors.textMuted} size={13} />
              <Text style={styles.location} numberOfLines={1}>
                {trainer.location}
              </Text>
            </View>
          ) : null}
        </View>
        <Rating value={trainer.rating} count={trainer.totalReviews} />
        <Text style={styles.price}>₹{trainer.price || 0} per session</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    ...AppTheme.shadow.card,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 14,
    gap: 6,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  name: {
    fontSize: 17,
    fontWeight: "900",
    color: AppTheme.colors.text,
    flex: 1,
  },
  meta: {
    fontSize: 13,
    color: AppTheme.colors.textMuted,
  },
  metaRow: {
    gap: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  location: {
    fontSize: 12,
    color: AppTheme.colors.textMuted,
    flex: 1,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: AppTheme.colors.accent,
  },
});
