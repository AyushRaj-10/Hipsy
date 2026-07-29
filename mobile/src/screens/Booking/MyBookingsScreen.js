import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

import BookingCard from "../../components/booking/BookingCard";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import { getMyBookings } from "../../api/booking.api";
import { AppTheme } from "../../theme";

export default function MyBookingsScreen({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const goToTrainers = () => {
    navigation.navigate("Tabs", { screen: "TrainerList" });
  };

  useEffect(() => {
    loadBookings();

    const interval = setInterval(() => {
      loadBookings();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getMyBookings();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader label="Loading bookings..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <BookingCard
            booking={item}
            onPress={() => navigation.navigate("BookingDetails", { booking: item })}
          />
        )}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>My bookings</Text>
            <Text style={styles.subtitle}>Keep track of upcoming sessions and past appointments.</Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title={error ? "Couldn’t load bookings" : "No bookings yet"}
            description={error || "Book a trainer to see your sessions here."}
            actionLabel="Find trainers"
            onAction={goToTrainers}
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
    gap: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: AppTheme.colors.text,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: AppTheme.colors.textMuted,
  },
});
