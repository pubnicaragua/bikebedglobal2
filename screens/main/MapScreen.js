"use client"

import { useState, useEffect } from "react"
import { StyleSheet, View, Text, ActivityIndicator, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

// Fallback component when maps aren't available
const MapFallback = ({ routeData }) => {
  return (
    <ScrollView style={styles.fallbackContainer}>
      <View style={styles.fallbackHeader}>
        <Ionicons name="map-outline" size={48} color="#4CAF50" />
        <Text style={styles.fallbackTitle}>Map View</Text>
      </View>

      <View style={styles.fallbackSection}>
        <Text style={styles.fallbackSectionTitle}>Route Information</Text>
        <View style={styles.fallbackCard}>
          <Text style={styles.fallbackCardTitle}>Start Point</Text>
          <Text style={styles.fallbackCardText}>{routeData?.markers?.[0]?.title || "Barcelona"}</Text>
        </View>

        <View style={styles.fallbackCard}>
          <Text style={styles.fallbackCardTitle}>End Point</Text>
          <Text style={styles.fallbackCardText}>{routeData?.markers?.[1]?.title || "Sabadell"}</Text>
        </View>

        <View style={styles.fallbackCard}>
          <Text style={styles.fallbackCardTitle}>Route Distance</Text>
          <Text style={styles.fallbackCardText}>25.4 km</Text>
        </View>

        <View style={styles.fallbackCard}>
          <Text style={styles.fallbackCardTitle}>Estimated Time</Text>
          <Text style={styles.fallbackCardText}>2h 30min</Text>
        </View>
      </View>

      <View style={styles.fallbackSection}>
        <Text style={styles.fallbackSectionTitle}>Waypoints</Text>
        {(routeData?.points || []).map((point, index) => (
          <View key={index} style={styles.fallbackCard}>
            <Text style={styles.fallbackCardTitle}>Point {index + 1}</Text>
            <Text style={styles.fallbackCardText}>
              Lat: {point.latitude.toFixed(4)}, Long: {point.longitude.toFixed(4)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.fallbackNote}>
        <Ionicons name="information-circle-outline" size={20} color="#666" />
        <Text style={styles.fallbackNoteText}>
          Map view is currently unavailable. Please try again later or check your device settings.
        </Text>
      </View>
    </ScrollView>
  )
}

const MapScreen = ({ route }) => {
  const [loading, setLoading] = useState(true)
  const [mapError, setMapError] = useState(true) // Set to true to use fallback by default

  // Default route data
  const routeData = route?.params?.routeData || {
    points: [
      { latitude: 41.3851, longitude: 2.1734 }, // Barcelona
      { latitude: 41.4489, longitude: 2.2461 }, // Badalona
      { latitude: 41.5307, longitude: 2.1191 }, // Sabadell
    ],
    markers: [
      { id: 1, coordinate: { latitude: 41.3851, longitude: 2.1734 }, title: "Start: Barcelona" },
      { id: 2, coordinate: { latitude: 41.5307, longitude: 2.1191 }, title: "End: Sabadell" },
    ],
  }

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {mapError ? (
        <MapFallback routeData={routeData} />
      ) : (
        <View style={styles.mapContainer}>
          <Text>Map would be displayed here</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  fallbackContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  fallbackHeader: {
    alignItems: "center",
    marginVertical: 24,
  },
  fallbackTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    color: "#333",
  },
  fallbackSection: {
    marginBottom: 24,
  },
  fallbackSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  fallbackCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  fallbackCardTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    color: "#4CAF50",
  },
  fallbackCardText: {
    fontSize: 14,
    color: "#666",
  },
  fallbackNote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  fallbackNoteText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
})

export default MapScreen
