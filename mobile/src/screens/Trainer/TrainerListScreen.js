import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Search } from "lucide-react-native";

import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import TrainerCard from "../../components/trainer/TrainerCard";
import { getTrainers } from "../../api/trainer.api";
import { AppTheme } from "../../theme";

export default function TrainerListScreen({ navigation }) {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTrainers();
  }, []);

  const loadTrainers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getTrainers();
      setTrainers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load trainers.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader label="Loading trainers..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={trainers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TrainerCard
            trainer={item}
            onPress={() => navigation.navigate("TrainerDetails", { id: item._id })}
          />
        )}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Explore trainers</Text>
            <Text style={styles.subtitle}>
              Choose a coach, open their profile, and book whenever you&apos;re ready.
            </Text>
            <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate("TrainerSearch")}>
              <Search color={AppTheme.colors.textMuted} size={18} />
              <Text style={styles.searchText}>Search trainers</Text>
            </TouchableOpacity>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title={error ? "Couldn’t load trainers" : "No trainers found"}
            description={error || "Try again or check back once the trainer directory is populated."}
            actionLabel="Retry"
            onAction={loadTrainers}
          />
        }
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
    gap: 8,
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
  searchButton: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: AppTheme.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
  },
  searchText: {
    color: AppTheme.colors.textMuted,
    fontSize: 14,
    fontWeight: "700",
  },
});
