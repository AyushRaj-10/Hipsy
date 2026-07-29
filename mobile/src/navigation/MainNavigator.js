import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppTabs from "./TabNavigator";
import AddReviewScreen from "../screens/Review/AddReviewScreen";
import BookingDetailsScreen from "../screens/Booking/BookingDetailsScreen";
import ChangePasswordScreen from "../screens/Profile/ChangePasswordScreen";
import CreateBookingScreen from "../screens/Booking/CreateBookingScreen";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";
import ReviewEditScreen from "../screens/Review/ReviewEditScreen";
import ReviewListScreen from "../screens/Review/ReviewListScreen";
import TrainerDetailsScreen from "../screens/Trainer/TrainerDetailsScreen";
import TrainerSearchScreen from "../screens/Trainer/TrainerSearchScreen";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#F6F1E8" },
        headerShadowVisible: false,
        headerTintColor: "#0F172A",
        contentStyle: { backgroundColor: "#F6F1E8" },
      }}
    >
      <Stack.Screen name="Tabs" component={AppTabs} options={{ headerShown: false }} />
      <Stack.Screen name="TrainerDetails" component={TrainerDetailsScreen} options={{ title: "Trainer" }} />
      <Stack.Screen name="CreateBooking" component={CreateBookingScreen} options={{ title: "Book Session" }} />
      <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} options={{ title: "Booking" }} />
      <Stack.Screen name="AddReview" component={AddReviewScreen} options={{ title: "Leave Review" }} />
      <Stack.Screen name="ReviewList" component={ReviewListScreen} options={{ title: "Reviews" }} />
      <Stack.Screen name="ReviewEdit" component={ReviewEditScreen} options={{ title: "Edit Review" }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: "Edit Profile" }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: "Change Password" }} />
      <Stack.Screen name="TrainerSearch" component={TrainerSearchScreen} options={{ title: "Search Trainers" }} />
    </Stack.Navigator>
  );
}
