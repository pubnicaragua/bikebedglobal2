"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"
import RouteCard from "../../components/routes/RouteCard"

// Datos de ejemplo
const routes = [
  {
    id: "1",
    name: "Ruta de los Lagos",
    location: "Covadonga, Asturias",
    image: "https://picsum.photos/id/15/500/300",
    distance: 25.4,
    elevation: 850,
    duration: "2h 30min",
    difficulty: "Medio",
  },
  {
    id: "2",
    name: "Vía Verde del Tajuña",
    location: "Madrid",
    image: "https://picsum.photos/id/16/500/300",
    distance: 18.2,
    elevation: 120,
    duration: "1h 45min",
    difficulty: "Fácil",
  },
  {
    id: "3",
    name: "Subida a Sierra Nevada",
    location: "Granada",
    image: "https://picsum.photos/id/17/500/300",
    distance: 32.7,
    elevation: 1200,
    duration: "3h 15min",
    difficulty: "Difícil",
  },
  {
    id: "4",
    name: "Ruta del Cares",
    location: "León, Castilla y León",
    image: "https://picsum.photos/id/18/500/300",
    distance: 22.5,
    elevation: 600,
    duration: "2h 15min",
    difficulty: "Medio",
  },
  {
    id: "5",
    name: "Camino de Santiago - Etapa Sarria",
    location: "Galicia",
    image: "https://picsum.photos/id/19/500/300",
    distance: 28.3,
    elevation: 450,
    duration: "2h 45min",
    difficulty: "Medio",
  },
]

const RoutesScreen = ({ navigation }) => {
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("Todos")

  const filters = ["Todos", "Fácil", "Medio", "Difícil", "Corta", "Larga"]

  const filteredRoutes = routes.filter((route) => {
    // Filtro de búsqueda
    const matchesSearch =
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.location.toLowerCase().includes(searchQuery.toLowerCase())

    // Filtros de categoría
    let matchesFilter = true
    if (activeFilter === "Fácil") {
      matchesFilter = route.difficulty === "Fácil"
    } else if (activeFilter === "Medio") {
      matchesFilter = route.difficulty === "Medio"
    } else if (activeFilter === "Difícil") {
      matchesFilter = route.difficulty === "Difícil"
    } else if (activeFilter === "Corta") {
      matchesFilter = route.distance < 20
    } else if (activeFilter === "Larga") {
      matchesFilter = route.distance >= 30
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
            placeholder="Buscar rutas..."
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
          onPress={() => navigation.navigate("Map", { showRoutes: true })}
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
        data={filteredRoutes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.routeItem}>
            <RouteCard route={item} />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={50} color={theme.colors.textLight} />
            <Text style={[styles.emptyText, { color: theme.colors.textLight }]}>No se encontraron rutas</Text>
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
  routeItem: {
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

export default RoutesScreen
