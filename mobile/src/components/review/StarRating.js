import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppTheme } from "../../theme";

export default function StarRating({ rating, setRating }) {
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((item) => (
        <TouchableOpacity key={item} onPress={() => setRating(item)} style={styles.starButton}>
          <Text style={[styles.star, item <= rating ? styles.active : styles.inactive]}>
            {item <= rating ? "★" : "☆"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
  },
  starButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppTheme.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
  },
  star: {
    fontSize: 22,
  },
  active: {
    color: AppTheme.colors.accent,
  },
  inactive: {
    color: AppTheme.colors.textMuted,
  },
});
