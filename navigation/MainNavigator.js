"use client"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"

// Context
import { useLanguage } from "../context/LanguageContext"

// Screens
import HomeScreen from "../screens/main/HomeScreen"
import ExploreScreen from "../screens/main/ExploreScreen"
import RoutesScreen from "../screens/main/RoutesScreen"
import BookingsScreen from "../screens/main/BookingsScreen"
import ProfileScreen from "../screens/main/ProfileScreen"
import AccommodationDetailScreen from "../screens/main/AccommodationDetailScreen"
import RouteDetailScreen from "../screens/main/RouteDetailScreen"
import BookingDetailScreen from "../screens/main/BookingDetailScreen"
import PaymentScreen from "../screens/main/PaymentScreen"
import MapScreen from "../screens/main/MapScreen"
import SettingsScreen from "../screens/main/SettingsScreen"
import NotificationsScreen from "../screens/main/NotificationsScreen"
import EditProfileScreen from "../screens/main/EditProfileScreen"
import BecomeHostScreen from "../screens/main/BecomeHostScreen"

// Constants
import { COLORS } from "../constants/Theme"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// Stack navigators for each tab
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AccommodationDetail" component={AccommodationDetailScreen} />
      <Stack.Screen name="RouteDetail" component={RouteDetailScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  )
}

const ExploreStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
      <Stack.Screen name="AccommodationDetail" component={AccommodationDetailScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  )
}

const RoutesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RoutesScreen" component={RoutesScreen} />
      <Stack.Screen name="RouteDetail" component={RouteDetailScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  )
}

const BookingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BookingsScreen" component={BookingsScreen} />
      <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
      <Stack.Screen name="AccommodationDetail" component={AccommodationDetailScreen} />
    </Stack.Navigator>
  )
}

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="BecomeHost" component={BecomeHostScreen} />
    </Stack.Navigator>
  )
}

// Main tab navigator
const MainNavigator = () => {
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

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Explore") {
            iconName = focused ? "search" : "search-outline"
          } else if (route.name === "Routes") {
            iconName = focused ? "map" : "map-outline"
          } else if (route.name === "Bookings") {
            iconName = focused ? "calendar" : "calendar-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: t("home") }} />
      <Tab.Screen name="Explore" component={ExploreStack} options={{ tabBarLabel: t("explore") }} />
      <Tab.Screen name="Routes" component={RoutesStack} options={{ tabBarLabel: t("routes") }} />
      <Tab.Screen name="Bookings" component={BookingsStack} options={{ tabBarLabel: t("bookings") }} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{ tabBarLabel: t("profile") }} />
    </Tab.Navigator>
  )
}

export default MainNavigator
