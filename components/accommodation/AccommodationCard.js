"use client"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../../context/ThemeContext"
import Card from "../ui/Card"

const AccommodationCard = ({ accommodation }) => {
  const navigation = useNavigation()
  const { theme } = useTheme()

  const handlePress = () => {
    navigation.navigate("AccommodationDetail", { accommodation })
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <Card style={styles.card}>
        <Image source={{ uri: accommodation.image }} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={1}>
              {accommodation.name}
            </Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={theme.colors.warning} />
              <Text style={[styles.rating, { color: theme.colors.text }]}>{accommodation.rating.toFixed(1)}</Text>
            </View>
          </View>

          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color={theme.colors.textLight} />
            <Text style={[styles.location, { color: theme.colors.textLight }]} numberOfLines={1}>
              {accommodation.location}
            </Text>
          </View>

          <View style={styles.amenitiesContainer}>
            {accommodation.hasBikeStorage && (
              <View style={styles.amenityItem}>
                <Ionicons name="bicycle-outline" size={14} color={theme.colors.primary} />
                <Text style={[styles.amenityText, { color: theme.colors.textLight }]}>Guardabicis</Text>
              </View>
            )}
            {accommodation.hasWorkshop && (
              <View style={styles.amenityItem}>
                <Ionicons name="construct-outline" size={14} color={theme.colors.primary} />
                <Text style={[styles.amenityText, { color: theme.colors.textLight }]}>Taller</Text>
              </View>
            )}
          </View>

          <View style={styles.footer}>
            <Text style={[styles.price, { color: theme.colors.primary }]}>€{accommodation.pricePerNight}</Text>
            <Text style={[styles.priceUnit, { color: theme.colors.textLight }]}>/noche</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 4,
    fontWeight: "500",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    marginLeft: 4,
  },
  amenitiesContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  amenityText: {
    fontSize: 12,
    marginLeft: 4,
  },
  footer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
  },
  priceUnit: {
    fontSize: 14,
    marginLeft: 2,
  },
})

export default AccommodationCard
