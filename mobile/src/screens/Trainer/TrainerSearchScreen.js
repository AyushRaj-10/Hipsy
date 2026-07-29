import React, { useEffect, useMemo, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import TrainerCard from "../../components/trainer/TrainerCard";
import { getTrainers } from "../../api/trainer.api";
import { AppTheme } from "../../theme";

export default function TrainerSearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrainers();
  }, []);

  const loadTrainers = async () => {
    try {
      setLoading(true);
      const data = await getTrainers();
      setTrainers(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return trainers;
    }

    return trainers.filter((trainer) => {
      const name = trainer.userId?.name?.toLowerCase() || "";
      const specialization = trainer.specialization?.toLowerCase() || "";
      return name.includes(term) || specialization.includes(term);
    });
  }, [query, trainers]);

  if (loading) {
    return <Loader label="Searching trainers..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filtered}
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
            <Text style={styles.title}>Search trainers</Text>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search by name or specialization"
              placeholderTextColor={AppTheme.colors.textMuted}
              style={styles.input}
            />
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title="No matches"
            description="Try a different name or specialization."
            actionLabel="Clear search"
            onAction={() => setQuery("")}
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
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  input: {
    minHeight: 52,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    backgroundColor: AppTheme.colors.surface,
    paddingHorizontal: 16,
    color: AppTheme.colors.text,
    fontSize: 15,
  },
});
