"use client"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../../context/ThemeContext"
import Card from "../ui/Card"

const RouteCard = ({ route }) => {
  const navigation = useNavigation()
  const { theme } = useTheme()

  const handlePress = () => {
    navigation.navigate("RouteDetail", { route })
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <Card style={styles.card}>
        <Image source={{ uri: route.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={1}>
            {route.name}
          </Text>

          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color={theme.colors.textLight} />
            <Text style={[styles.location, { color: theme.colors.textLight }]} numberOfLines={1}>
              {route.location}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="trending-up-outline" size={14} color={theme.colors.primary} />
              <Text style={[styles.statText, { color: theme.colors.textLight }]}>{route.elevation}m</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="resize-outline" size={14} color={theme.colors.primary} />
              <Text style={[styles.statText, { color: theme.colors.textLight }]}>{route.distance}km</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={14} color={theme.colors.primary} />
              <Text style={[styles.statText, { color: theme.colors.textLight }]}>{route.duration}</Text>
            </View>
          </View>

          <View style={styles.difficultyContainer}>
            <Text style={[styles.difficultyLabel, { color: theme.colors.textLight }]}>Dificultad:</Text>
            <View
              style={[
                styles.difficultyBadge,
                {
                  backgroundColor:
                    route.difficulty === "Fácil"
                      ? theme.colors.success
                      : route.difficulty === "Medio"
                        ? theme.colors.warning
                        : theme.colors.error,
                },
              ]}
            >
              <Text style={styles.difficultyText}>{route.difficulty}</Text>
            </View>
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
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
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
  statsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  statText: {
    fontSize: 12,
    marginLeft: 4,
  },
  difficultyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  difficultyLabel: {
    fontSize: 12,
    marginRight: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  difficultyText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
})

export default RouteCard
