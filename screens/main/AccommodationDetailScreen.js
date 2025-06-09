"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"
import Button from "../../components/ui/Button"

// Datos de ejemplo
const accommodation = {
  id: "1",
  name: "Casa Rural El Ciclista",
  location: "Sierra de Gredos, Ávila",
  images: [
    "https://picsum.photos/id/10/800/600",
    "https://picsum.photos/id/11/800/600",
    "https://picsum.photos/id/12/800/600",
    "https://picsum.photos/id/13/800/600",
  ],
  rating: 4.8,
  reviews: 124,
  pricePerNight: 85,
  description:
    "Alojamiento especialmente diseñado para ciclistas, con todas las comodidades necesarias para disfrutar de tu estancia. Ubicado en un entorno natural privilegiado, perfecto para rutas en bicicleta de montaña y carretera.",
  amenities: [
    { icon: "bicycle", name: "Guardabicis seguro" },
    { icon: "construct", name: "Taller de reparación" },
    { icon: "restaurant", name: "Desayuno incluido" },
    { icon: "wifi", name: "WiFi gratuito" },
    { icon: "car", name: "Aparcamiento gratuito" },
    { icon: "water", name: "Lavado de bicicletas" },
  ],
  host: {
    name: "Carlos",
    image: "https://picsum.photos/id/1/100/100",
    isSuperhost: true,
  },
  nearbyRoutes: [
    {
      id: "1",
      name: "Ruta de los Lagos",
      distance: 25.4,
      elevation: 850,
      difficulty: "Medio",
    },
    {
      id: "2",
      name: "Vía Verde del Tajuña",
      distance: 18.2,
      elevation: 120,
      difficulty: "Fácil",
    },
  ],
}

const AccommodationDetailScreen = ({ navigation, route }) => {
  const { theme } = useTheme()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  // En una aplicación real, obtendríamos los datos del alojamiento desde route.params.accommodation
  // const { accommodation } = route.params;

  const handleReserve = () => {
    navigation.navigate("Payment", { accommodation })
  }

  const renderImageIndicator = () => {
    return (
      <View style={styles.imageIndicatorContainer}>
        {accommodation.images.map((_, index) => (
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
          <FlatList
            data={accommodation.images}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const slideIndex = Math.floor(
                event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width,
              )
              setActiveImageIndex(slideIndex)
            }}
          />
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
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]}>{accommodation.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={theme.colors.warning} />
              <Text style={[styles.rating, { color: theme.colors.text }]}>{accommodation.rating.toFixed(1)}</Text>
              <Text style={[styles.reviews, { color: theme.colors.textLight }]}>({accommodation.reviews} reseñas)</Text>
            </View>
          </View>

          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={18} color={theme.colors.primary} />
            <Text style={[styles.location, { color: theme.colors.textLight }]}>{accommodation.location}</Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          <View style={styles.hostSection}>
            <View style={styles.hostInfo}>
              <Image source={{ uri: accommodation.host.image }} style={styles.hostImage} />
              <View>
                <Text style={[styles.hostedBy, { color: theme.colors.textLight }]}>Anfitrión:</Text>
                <Text style={[styles.hostName, { color: theme.colors.text }]}>{accommodation.host.name}</Text>
              </View>
            </View>
            {accommodation.host.isSuperhost && (
              <View style={[styles.superhostBadge, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.superhostText}>Superanfitrión</Text>
              </View>
            )}
          </View>

          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

          <View style={styles.descriptionSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Descripción</Text>
            <Text style={[styles.description, { color: theme.colors.textLight }]}>{accommodation.description}</Text>
          </View>

          <View style={styles.amenitiesSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Servicios para ciclistas</Text>
            <View style={styles.amenitiesGrid}>
              {accommodation.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Ionicons name={amenity.icon} size={20} color={theme.colors.primary} />
                  <Text style={[styles.amenityName, { color: theme.colors.text }]}>{amenity.name}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.routesSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Rutas cercanas</Text>
            {accommodation.nearbyRoutes.map((route, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.routeItem, { backgroundColor: theme.colors.card }]}
                onPress={() => navigation.navigate("RouteDetail", { route })}
              >
                <View style={styles.routeInfo}>
                  <Text style={[styles.routeName, { color: theme.colors.text }]}>{route.name}</Text>
                  <View style={styles.routeStats}>
                    <View style={styles.routeStat}>
                      <Ionicons name="resize-outline" size={14} color={theme.colors.primary} />
                      <Text style={[styles.routeStatText, { color: theme.colors.textLight }]}>{route.distance} km</Text>
                    </View>
                    <View style={styles.routeStat}>
                      <Ionicons name="trending-up-outline" size={14} color={theme.colors.primary} />
                      <Text style={[styles.routeStatText, { color: theme.colors.textLight }]}>{route.elevation} m</Text>
                    </View>
                    <View style={styles.routeStat}>
                      <Ionicons name="speedometer-outline" size={14} color={theme.colors.primary} />
                      <Text style={[styles.routeStatText, { color: theme.colors.textLight }]}>{route.difficulty}</Text>
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
        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: theme.colors.primary }]}>€{accommodation.pricePerNight}</Text>
          <Text style={[styles.priceUnit, { color: theme.colors.textLight }]}>/noche</Text>
        </View>
        <Button title="Reservar" onPress={handleReserve} style={styles.reserveButton} />
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
    height: 300,
  },
  image: {
    width: 400,
    height: 300,
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
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 4,
    fontWeight: "500",
  },
  reviews: {
    marginLeft: 4,
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
  divider: {
    height: 1,
    marginVertical: 16,
  },
  hostSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hostInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  hostImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  hostedBy: {
    fontSize: 12,
  },
  hostName: {
    fontSize: 16,
    fontWeight: "500",
  },
  superhostBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  superhostText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
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
  amenitiesSection: {
    marginBottom: 16,
  },
  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    marginBottom: 12,
  },
  amenityName: {
    marginLeft: 8,
  },
  routesSection: {
    marginBottom: 80,
  },
  routeItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  routeInfo: {
    flex: 1,
  },
  routeName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  routeStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  routeStat: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  routeStatText: {
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
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
  },
  priceUnit: {
    marginLeft: 2,
  },
  reserveButton: {
    width: 150,
  },
})

export default AccommodationDetailScreen
