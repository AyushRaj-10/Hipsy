import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChangePasswordScreen from "../screens/Profile/ChangePasswordScreen";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import TrainerProfileScreen from "../screens/Profile/TrainerProfileScreen";

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#F6F1E8" },
        headerShadowVisible: false,
        headerTintColor: "#0F172A",
        contentStyle: { backgroundColor: "#F6F1E8" },
      }}
    >
      <Stack.Screen name="ProfileHome" component={ProfileScreen} options={{ title: "Profile" }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: "Edit Profile" }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: "Change Password" }} />
      <Stack.Screen name="TrainerProfile" component={TrainerProfileScreen} options={{ title: "Trainer Profile" }} />
    </Stack.Navigator>
  );
}
