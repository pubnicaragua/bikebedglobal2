"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"

// Datos de ejemplo
const bikes = [
  {
    id: "1",
    name: "MTB Specialized Epic",
    type: "Montaña",
    image: "https://picsum.photos/id/146/500/300",
    pricePerDay: 35,
    available: true,
    specs: {
      size: "M/L",
      wheels: '29"',
      suspension: "Doble",
      gears: "12 velocidades",
    },
  },
  {
    id: "2",
    name: "Cannondale SuperSix",
    type: "Carretera",
    image: "https://picsum.photos/id/147/500/300",
    pricePerDay: 40,
    available: true,
    specs: {
      size: "54cm",
      wheels: '28"',
      suspension: "Rígida",
      gears: "11 velocidades",
    },
  },
  {
    id: "3",
    name: "Trek Fuel EX",
    type: "Montaña",
    image: "https://picsum.photos/id/148/500/300",
    pricePerDay: 38,
    available: false,
    specs: {
      size: "L",
      wheels: '29"',
      suspension: "Doble",
      gears: "12 velocidades",
    },
  },
  {
    id: "4",
    name: "Giant Revolt",
    type: "Gravel",
    image: "https://picsum.photos/id/149/500/300",
    pricePerDay: 32,
    available: true,
    specs: {
      size: "M",
      wheels: '28"',
      suspension: "Rígida",
      gears: "11 velocidades",
    },
  },
  {
    id: "5",
    name: "Orbea Gain",
    type: "Eléctrica",
    image: "https://picsum.photos/id/150/500/300",
    pricePerDay: 50,
    available: true,
    specs: {
      size: "M",
      wheels: '28"',
      suspension: "Rígida",
      gears: "11 velocidades",
      battery: "500Wh",
    },
  },
]

const BikeRentalScreen = ({ navigation }) => {
  const { theme } = useTheme()
  const [activeFilter, setActiveFilter] = useState("Todos")
  const [selectedBike, setSelectedBike] = useState(null)

  const filters = ["Todos", "Montaña", "Carretera", "Gravel", "Eléctrica"]

  const filteredBikes = bikes.filter((bike) => {
    if (activeFilter === "Todos") return true
    return bike.type === activeFilter
  })

  const handleRentBike = (bike) => {
    navigation.navigate("Payment", {
      type: "bikeRental",
      item: bike,
      amount: bike.pricePerDay,
    })
  }

  const renderBikeItem = ({ item }) => (
    <Card style={styles.bikeCard}>
      <Image source={{ uri: item.image }} style={styles.bikeImage} />
      <View style={styles.bikeContent}>
        <View style={styles.bikeHeader}>
          <Text style={[styles.bikeName, { color: theme.colors.text }]}>{item.name}</Text>
          <View
            style={[
              styles.typeBadge,
              {
                backgroundColor:
                  item.type === "Montaña"
                    ? "#4CAF50"
                    : item.type === "Carretera"
                      ? "#2196F3"
                      : item.type === "Gravel"
                        ? "#FF9800"
                        : "#9C27B0",
              },
            ]}
          >
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
        </View>

        <View style={styles.specsContainer}>
          {Object.entries(item.specs).map(([key, value]) => (
            <View key={key} style={styles.specItem}>
              <Text style={[styles.specLabel, { color: theme.colors.textLight }]}>
                {key === "size"
                  ? "Talla"
                  : key === "wheels"
                    ? "Ruedas"
                    : key === "suspension"
                      ? "Suspensión"
                      : key === "gears"
                        ? "Cambio"
                        : key === "battery"
                          ? "Batería"
                          : key}
                :
              </Text>
              <Text style={[styles.specValue, { color: theme.colors.text }]}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.bikeFooter}>
          <Text style={[styles.bikePrice, { color: theme.colors.primary }]}>€{item.pricePerDay}/día</Text>
          <Button
            title={item.available ? "Alquilar" : "No disponible"}
            onPress={() => handleRentBike(item)}
            disabled={!item.available}
            size="small"
          />
        </View>
      </View>
    </Card>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Alquiler de Bicicletas</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textLight }]}>
          Encuentra la bicicleta perfecta para tu ruta
        </Text>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && { backgroundColor: theme.colors.primary },
                { borderColor: theme.colors.primary },
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, { color: activeFilter === filter ? "white" : theme.colors.primary }]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredBikes}
        keyExtractor={(item) => item.id}
        renderItem={renderBikeItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="bicycle-outline" size={50} color={theme.colors.textLight} />
            <Text style={[styles.emptyText, { color: theme.colors.textLight }]}>
              No hay bicicletas disponibles en esta categoría
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  filtersScrollContent: {
    paddingRight: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  filterText: {
    fontWeight: "500",
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  bikeCard: {
    marginBottom: 16,
    padding: 0,
    overflow: "hidden",
  },
  bikeImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  bikeContent: {
    padding: 12,
  },
  bikeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  bikeName: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  specsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  specItem: {
    flexDirection: "row",
    width: "50%",
    marginBottom: 4,
  },
  specLabel: {
    fontSize: 12,
    marginRight: 4,
  },
  specValue: {
    fontSize: 12,
    fontWeight: "500",
  },
  bikeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bikePrice: {
    fontSize: 18,
    fontWeight: "700",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
  },
})

export default BikeRentalScreen
