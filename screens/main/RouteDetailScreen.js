"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"
import Button from "../../components/ui/Button"

// Datos de ejemplo
const route = {
  id: "1",
  name: "Ruta de los Lagos",
  location: "Covadonga, Asturias",
  images: [
    "https://picsum.photos/id/15/800/600",
    "https://picsum.photos/id/16/800/600",
    "https://picsum.photos/id/17/800/600",
  ],
  description:
    "Una de las rutas más emblemáticas de Asturias. Recorre los lagos de Covadonga y disfruta de paisajes espectaculares en el corazón de los Picos de Europa. Ideal para ciclistas con experiencia debido a sus fuertes pendientes.",
  distance: 25.4,
  elevation: 850,
  duration: "2h 30min",
  difficulty: "Medio",
  terrain: "Asfalto",
  startPoint: {
    latitude: 43.2707,
    longitude: -5.0634,
    name: "Cangas de Onís",
  },
  endPoint: {
    latitude: 43.2361,
    longitude: -4.9906,
    name: "Lagos de Covadonga",
  },
  waypoints: [
    { latitude: 43.2707, longitude: -5.0634 },
    { latitude: 43.2651, longitude: -5.0401 },
    { latitude: 43.2598, longitude: -5.0201 },
    { latitude: 43.2512, longitude: -5.0102 },
    { latitude: 43.2423, longitude: -4.9998 },
    { latitude: 43.2361, longitude: -4.9906 },
  ],
  nearbyAccommodations: [
    {
      id: "1",
      name: "Hotel Lagos de Covadonga",
      distance: 1.2,
      pricePerNight: 95,
    },
    {
      id: "2",
      name: "Albergue Picos de Europa",
      distance: 3.5,
      pricePerNight: 45,
    },
  ],
}

const { width } = Dimensions.get("window")

// Fallback component for map section
const MapSectionFallback = ({ onNavigate }) => {
  return (
    <View style={styles.mapFallbackContainer}>
      <View style={styles.mapFallbackContent}>
        <Ionicons name="map-outline" size={40} color="#4CAF50" />
        <Text style={styles.mapFallbackTitle}>Route Map</Text>
        <Text style={styles.mapFallbackText}>
          From {route.startPoint.name} to {route.endPoint.name}
        </Text>
        <TouchableOpacity style={styles.mapFallbackButton} onPress={onNavigate}>
          <Text style={styles.mapFallbackButtonText}>View Full Map</Text>
          <Ionicons name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const RouteDetailScreen = ({ navigation, route: navigationRoute }) => {
  const { theme } = useTheme()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  // En una aplicación real, obtendríamos los datos de la ruta desde navigationRoute.params.route
  // const { route } = navigationRoute.params;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Fácil":
        return theme.colors.success
      case "Medio":
        return theme.colors.warning
      case "Difícil":
        return theme.colors.error
      default:
        return theme.colors.info
    }
  }

  const handleDownloadGPX = () => {
    // Lógica para descargar el archivo GPX
    alert("Descargando archivo GPX...")
  }

  const handleNavigate = () => {
    navigation.navigate("Map", {
      routeData: {
        points: route.waypoints,
        markers: [
          { id: 1, coordinate: route.startPoint, title: `Start: ${route.startPoint.name}` },
          { id: 2, coordinate: route.endPoint, title: `End: ${route.endPoint.name}` },
        ],
      },
    })
  }

  const renderImageIndicator = () => {
    return (
      <View style={styles.imageIndicatorContainer}>
        {route.images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.imageIndicator,
              {
                backgroundColor: index === activeImageIndex ? theme.colors.primary : "rgba(255, 255, 255, 0.6)",
              },
            ]}
          />
        ))}
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const slideIndex = Math.floor(event.nativeEvent.contentOffset.x / width)
              setActiveImageIndex(slideIndex)
            }}
          >
            {route.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={[styles.image, { width }]} />
            ))}
          </ScrollView>
          {renderImageIndicator()}

          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.favoriteButton, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={22}
              color={isFavorite ? theme.colors.error : "white"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{route.name}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={18} color={theme.colors.primary} />
            <Text style={[styles.location, { color: theme.colors.textLight }]}>{route.location}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="resize-outline" size={20} color={theme.colors.primary} />
              <View style={styles.statTextContainer}>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>{route.distance} km</Text>
                <Text style={[styles.statLabel, { color: theme.colors.textLight }]}>Distancia</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <Ionicons name="trending-up-outline" size={20} color={theme.colors.primary} />
              <View style={styles.statTextContainer}>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>{route.elevation} m</Text>
                <Text style={[styles.statLabel, { color: theme.colors.textLight }]}>Desnivel</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={20} color={theme.colors.primary} />
              <View style={styles.statTextContainer}>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>{route.duration}</Text>
                <Text style={[styles.statLabel, { color: theme.colors.textLight }]}>Duración</Text>
              </View>
            </View>
          </View>

          <View style={styles.difficultyContainer}>
            <Text style={[styles.difficultyLabel, { color: theme.colors.textLight }]}>Dificultad:</Text>
            <View
              style={[
                styles.difficultyBadge,
                {
                  backgroundColor: getDifficultyColor(route.difficulty),
                },
              ]}
            >
              <Text style={styles.difficultyText}>{route.difficulty}</Text>
            </View>
            <Text style={[styles.terrainText, { color: theme.colors.text }]}>Terreno: {route.terrain}</Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          <View style={styles.descriptionSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Descripción</Text>
            <Text style={[styles.description, { color: theme.colors.textLight }]}>{route.description}</Text>
          </View>

          <View style={styles.mapSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Mapa de la Ruta</Text>
            <MapSectionFallback onNavigate={handleNavigate} />
          </View>

          <View style={styles.accommodationsSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Alojamientos Cercanos</Text>
            {route.nearbyAccommodations.map((accommodation, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.accommodationItem, { backgroundColor: theme.colors.card }]}
                onPress={() => navigation.navigate("AccommodationDetail", { accommodationId: accommodation.id })}
              >
                <View style={styles.accommodationInfo}>
                  <Text style={[styles.accommodationName, { color: theme.colors.text }]}>{accommodation.name}</Text>
                  <View style={styles.accommodationDetails}>
                    <View style={styles.accommodationDetail}>
                      <Ionicons name="location-outline" size={14} color={theme.colors.primary} />
                      <Text style={[styles.accommodationDetailText, { color: theme.colors.textLight }]}>
                        A {accommodation.distance} km
                      </Text>
                    </View>
                    <View style={styles.accommodationDetail}>
                      <Ionicons name="cash-outline" size={14} color={theme.colors.primary} />
                      <Text style={[styles.accommodationDetailText, { color: theme.colors.textLight }]}>
                        €{accommodation.pricePerNight}/noche
                      </Text>
                    </View>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textLight} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.colors.background, borderTopColor: theme.colors.border }]}>
        <Button
          title="Descargar GPX"
          variant="outline"
          onPress={handleDownloadGPX}
          style={styles.downloadButton}
          icon={<Ionicons name="download-outline" size={18} color={theme.colors.primary} />}
        />
        <Button
          title="Navegar"
          onPress={handleNavigate}
          style={styles.navigateButton}
          icon={<Ionicons name="navigate-outline" size={18} color="white" />}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    height: 250,
  },
  image: {
    height: 250,
    resizeMode: "cover",
  },
  imageIndicatorContainer: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  imageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  location: {
    marginLeft: 4,
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statTextContainer: {
    marginLeft: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  statLabel: {
    fontSize: 12,
  },
  difficultyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  difficultyLabel: {
    marginRight: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  difficultyText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  terrainText: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  descriptionSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  description: {
    lineHeight: 22,
  },
  mapSection: {
    marginBottom: 16,
  },
  mapFallbackContainer: {
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  mapFallbackContent: {
    alignItems: "center",
    padding: 16,
  },
  mapFallbackTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
    color: "#333",
  },
  mapFallbackText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  mapFallbackButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  mapFallbackButtonText: {
    color: "#fff",
    fontWeight: "500",
    marginRight: 8,
  },
  accommodationsSection: {
    marginBottom: 80,
  },
  accommodationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  accommodationInfo: {
    flex: 1,
  },
  accommodationName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  accommodationDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  accommodationDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  accommodationDetailText: {
    fontSize: 12,
    marginLeft: 4,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
  },
  downloadButton: {
    flex: 1,
    marginRight: 8,
  },
  navigateButton: {
    flex: 1,
    marginLeft: 8,
  },
})

export default RouteDetailScreen
