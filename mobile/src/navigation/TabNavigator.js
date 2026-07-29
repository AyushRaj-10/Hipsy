import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { House, Search, CalendarDays, Bell, UserRound } from "lucide-react-native";

import HomeScreen from "../screens/Home/HomeScreen";
import TrainerListScreen from "../screens/Trainer/TrainerListScreen";
import MyBookingsScreen from "../screens/Booking/MyBookingsScreen";
import NotificationScreen from "../screens/Notification/NotificationScreen";
import ProfileNavigator from "./ProfileNavigator";
import { AppTheme } from "../theme";

const Tab = createBottomTabNavigator();

const tabIcon = (Icon) => ({ color, size }) => <Icon color={color} size={size} strokeWidth={2.2} />;

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: AppTheme.colors.background },
        headerShadowVisible: false,
        headerTintColor: AppTheme.colors.text,
        tabBarActiveTintColor: AppTheme.colors.accent,
        tabBarInactiveTintColor: AppTheme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: "rgba(255,255,255,0.96)",
          borderTopColor: AppTheme.colors.border,
          height: 72,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Hipsy",
          tabBarIcon: tabIcon(House),
        }}
      />
      <Tab.Screen
        name="TrainerList"
        component={TrainerListScreen}
        options={{
          title: "Trainers",
          tabBarIcon: tabIcon(Search),
        }}
      />
      <Tab.Screen
        name="MyBookings"
        component={MyBookingsScreen}
        options={{
          title: "Bookings",
          tabBarIcon: tabIcon(CalendarDays),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          title: "Notifications",
          tabBarIcon: tabIcon(Bell),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          title: "Profile",
          tabBarIcon: tabIcon(UserRound),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
