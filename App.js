"use client"

import { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ThemeProvider } from "./context/ThemeContext"
import { AuthProvider } from "./context/AuthContext"
import { LanguageProvider } from "./context/LanguageContext"
import * as SplashScreen from "expo-splash-screen"
import * as Font from "expo-font"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Navigation
import AuthNavigator from "./navigation/AuthNavigator"
import MainNavigator from "./navigation/MainNavigator"
import HostNavigator from "./navigation/HostNavigator"

// Screens
import CustomSplashScreen from "./screens/SplashScreen"
import LanguageSelectionScreen from "./screens/LanguageSelectionScreen"

// Auth context
import { useAuth } from "./context/AuthContext"

const Stack = createNativeStackNavigator()

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync()

// Root navigator that handles auth state
const RootNavigator = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <CustomSplashScreen />
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Main\" component={MainNavigator} />
      ) : user.user_metadata?.role === "host" ? (
        <Stack.Screen name="Host" component={HostNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  )
}

// Main App component
export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [initialLanguageSelected, setInitialLanguageSelected] = useState(false)

  // Load fonts and other resources
  const loadResources = async () => {
    try {
      // Check if language has been selected before
      const hasSelectedLanguage = await AsyncStorage.getItem("hasSelectedLanguage")
      setInitialLanguageSelected(!!hasSelectedLanguage)
      setIsReady(true)
    } catch (e) {
      console.warn(e)
      setIsReady(true)
    }
  }

  useEffect(() => {
    loadResources()
  }, [])

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync()
    }
  }, [isReady])

  if (!isReady) {
    return null
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <NavigationContainer>
              <StatusBar style="auto" />
              {!initialLanguageSelected ? (
                <LanguageSelectionScreen onComplete={() => setInitialLanguageSelected(true)} />
              ) : (
                <RootNavigator />
              )}
            </NavigationContainer>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}