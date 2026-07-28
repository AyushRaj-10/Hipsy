import React from "react";
import { View, Button, Text } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Welcome to Hipsy</Text>
      <Button title="Find Trainers" onPress={() => navigation.navigate("TrainerList")} />
      <Button title="View Reviews" onPress={() => navigation.navigate("ReviewList", { trainerId: null })} />
      <Button title="Give Review" onPress={() => navigation.navigate("AddReview", { trainerId: null })} />
      <Button title="Notifications" onPress={() => navigation.navigate("Notifications")} />
    </View>
  );
}