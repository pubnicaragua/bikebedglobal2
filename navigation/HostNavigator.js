"use client"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"

// Context
import { useLanguage } from "../context/LanguageContext"

// Screens
import HostDashboardScreen from "../screens/host/HostDashboardScreen"
import HostAccommodationsScreen from "../screens/host/HostAccommodationsScreen"
import HostBookingsScreen from "../screens/host/HostBookingsScreen"
import HostProfileScreen from "../screens/host/HostProfileScreen"
import AddAccommodationScreen from "../screens/host/AddAccommodationScreen"
import EditAccommodationScreen from "../screens/host/EditAccommodationScreen"
import AccommodationDetailScreen from "../screens/host/AccommodationDetailScreen"
import BookingDetailScreen from "../screens/host/BookingDetailScreen"
import SettingsScreen from "../screens/host/SettingsScreen"
import EditProfileScreen from "../screens/host/EditProfileScreen"
import EarningsScreen from "../screens/host/EarningsScreen"

// Constants
import { COLORS } from "../constants/Theme"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// Stack navigators for each tab
const DashboardStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardScreen" component={HostDashboardScreen} />
      <Stack.Screen name="Earnings" component={EarningsScreen} />
    </Stack.Navigator>
  )
}

const AccommodationsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccommodationsScreen" component={HostAccommodationsScreen} />
      <Stack.Screen name="AddAccommodation" component={AddAccommodationScreen} />
      <Stack.Screen name="EditAccommodation" component={EditAccommodationScreen} />
      <Stack.Screen name="AccommodationDetail" component={AccommodationDetailScreen} />
    </Stack.Navigator>
  )
}

const BookingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BookingsScreen" component={HostBookingsScreen} />
      <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
    </Stack.Navigator>
  )
}

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={HostProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  )
}

// Main host navigator
const HostNavigator = () => {
  const { t } = useLanguage()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Dashboard") {
            iconName = focused ? "grid" : "grid-outline"
          } else if (route.name === "Accommodations") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Bookings") {
            iconName = focused ? "calendar" : "calendar-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} options={{ tabBarLabel: t("dashboard") }} />
      <Tab.Screen
        name="Accommodations"
        component={AccommodationsStack}
        options={{ tabBarLabel: t("accommodations") }}
      />
      <Tab.Screen name="Bookings" component={BookingsStack} options={{ tabBarLabel: t("bookings") }} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{ tabBarLabel: t("profile") }} />
    </Tab.Navigator>
  )
}

export default HostNavigator
