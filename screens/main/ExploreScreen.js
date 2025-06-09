"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"
import AccommodationCard from "../../components/accommodation/AccommodationCard"

// Datos de ejemplo
const accommodations = [
  {
    id: "1",
    name: "Casa Rural El Ciclista",
    location: "Sierra de Gredos, Ávila",
    image: "https://picsum.photos/id/10/500/300",
    rating: 4.8,
    pricePerNight: 85,
    hasBikeStorage: true,
    hasWorkshop: true,
  },
  {
    id: "2",
    name: "Albergue Montaña Verde",
    location: "Picos de Europa, Asturias",
    image: "https://picsum.photos/id/11/500/300",
    rating: 4.6,
    pricePerNight: 65,
    hasBikeStorage: true,
    hasWorkshop: false,
  },
  {
    id: "3",
    name: "Hotel Ciclista Premium",
    location: "Sierra Nevada, Granada",
    image: "https://picsum.photos/id/12/500/300",
    rating: 4.9,
    pricePerNight: 120,
    hasBikeStorage: true,
    hasWorkshop: true,
  },
  {
    id: "4",
    name: "Hostal Ruta del Norte",
    location: "Cantabria",
    image: "https://picsum.photos/id/13/500/300",
    rating: 4.3,
    pricePerNight: 55,
    hasBikeStorage: true,
    hasWorkshop: false,
  },
  {
    id: "5",
    name: "Apartamentos Vía Verde",
    location: "Girona",
    image: "https://picsum.photos/id/14/500/300",
    rating: 4.7,
    pricePerNight: 95,
    hasBikeStorage: true,
    hasWorkshop: true,
  },
]

const ExploreScreen = ({ navigation }) => {
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("Todos")

  const filters = ["Todos", "Guardabicis", "Taller", "Económico", "Premium"]

  const filteredAccommodations = accommodations.filter((accommodation) => {
    // Filtro de búsqueda
    const matchesSearch =
      accommodation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      accommodation.location.toLowerCase().includes(searchQuery.toLowerCase())

    // Filtros de categoría
    let matchesFilter = true
    if (activeFilter === "Guardabicis") {
      matchesFilter = accommodation.hasBikeStorage
    } else if (activeFilter === "Taller") {
      matchesFilter = accommodation.hasWorkshop
    } else if (activeFilter === "Económico") {
      matchesFilter = accommodation.pricePerNight < 70
    } else if (activeFilter === "Premium") {
      matchesFilter = accommodation.pricePerNight >= 100
    }

    return matchesSearch && matchesFilter
  })

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <View
          style={[styles.searchContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
        >
          <Ionicons name="search" size={20} color={theme.colors.textLight} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Buscar alojamientos..."
            placeholderTextColor={theme.colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color={theme.colors.textLight} />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          style={[styles.mapButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate("Map")}
        >
          <Ionicons name="map" size={22} color="white" />
        </TouchableOpacity>
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
        data={filteredAccommodations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.accommodationItem}>
            <AccommodationCard accommodation={item} />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={50} color={theme.colors.textLight} />
            <Text style={[styles.emptyText, { color: theme.colors.textLight }]}>No se encontraron alojamientos</Text>
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
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingBottom: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  mapButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
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
  accommodationItem: {
    marginBottom: 16,
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

export default ExploreScreen
