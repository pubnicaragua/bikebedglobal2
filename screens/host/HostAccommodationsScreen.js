"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useLanguage } from "../../context/LanguageContext"
import { COLORS } from "../../constants/Theme"

// Mock data
const mockAccommodations = [
  {
    id: "1",
    name: "Mountain View Cabin",
    location: "Alps, Switzerland",
    price: 120,
    rating: 4.8,
    reviews: 24,
    image: null,
    status: "active",
  },
  {
    id: "2",
    name: "Urban Loft",
    location: "Berlin, Germany",
    price: 95,
    rating: 4.6,
    reviews: 18,
    image: null,
    status: "active",
  },
  {
    id: "3",
    name: "Coastal Retreat",
    location: "Barcelona, Spain",
    price: 150,
    rating: 4.9,
    reviews: 32,
    image: null,
    status: "inactive",
  },
]

const HostAccommodationsScreen = ({ navigation }) => {
  const { t } = useLanguage()
  const [accommodations, setAccommodations] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")

  useEffect(() => {
    // In a real app, fetch accommodations from API
    setAccommodations(mockAccommodations)
    setLoading(false)
  }, [])

  const filteredAccommodations =
    activeFilter === "all" ? accommodations : accommodations.filter((acc) => acc.status === activeFilter)

  const renderAccommodationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.accommodationCard}
      onPress={() => navigation.navigate("AccommodationDetail", { accommodationId: item.id })}
    >
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder} />
        <View
          style={[styles.statusBadge, { backgroundColor: item.status === "active" ? "#4CAF50" : COLORS.textLight }]}
        >
          <Text style={styles.statusText}>{item.status === "active" ? t("active") : t("inactive")}</Text>
        </View>
      </View>
      <View style={styles.accommodationInfo}>
        <Text style={styles.accommodationName}>{item.name}</Text>
        <Text style={styles.accommodationLocation}>
          <Ionicons name="location-outline" size={14} color={COLORS.textLight} /> {item.location}
        </Text>
        <View style={styles.accommodationStats}>
          <Text style={styles.accommodationPrice}>
            ${item.price} / {t("night")}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>
              {item.rating} ({item.reviews})
            </Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditAccommodation", { accommodationId: item.id })}
          >
            <Ionicons name="create-outline" size={16} color={COLORS.white} />
            <Text style={styles.buttonText}>{t("edit")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calendarButton}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.white} />
            <Text style={styles.buttonText}>{t("calendar")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("accommodations")}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddAccommodation")}>
          <Ionicons name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === "all" && styles.activeFilter]}
          onPress={() => setActiveFilter("all")}
        >
          <Text style={[styles.filterText, activeFilter === "all" && styles.activeFilterText]}>{t("all")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === "active" && styles.activeFilter]}
          onPress={() => setActiveFilter("active")}
        >
          <Text style={[styles.filterText, activeFilter === "active" && styles.activeFilterText]}>{t("active")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === "inactive" && styles.activeFilter]}
          onPress={() => setActiveFilter("inactive")}
        >
          <Text style={[styles.filterText, activeFilter === "inactive" && styles.activeFilterText]}>
            {t("inactive")}
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : filteredAccommodations.length > 0 ? (
        <FlatList
          data={filteredAccommodations}
          renderItem={renderAccommodationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.accommodationsList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="home-outline" size={60} color={COLORS.textLight} />
          <Text style={styles.emptyText}>
            {activeFilter === "all"
              ? t("noAccommodations")
              : activeFilter === "active"
                ? t("noActiveAccommodations")
                : t("noInactiveAccommodations")}
          </Text>
          <TouchableOpacity
            style={styles.addAccommodationButton}
            onPress={() => navigation.navigate("AddAccommodation")}
          >
            <Text style={styles.addAccommodationText}>{t("addAccommodation")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: COLORS.text,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: COLORS.textLight,
  },
  activeFilterText: {
    color: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  accommodationsList: {
    padding: 20,
  },
  accommodationCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
  },
  imageContainer: {
    height: 150,
    position: "relative",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.placeholder,
  },
  statusBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: COLORS.white,
  },
  accommodationInfo: {
    padding: 15,
  },
  accommodationName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 5,
  },
  accommodationLocation: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 10,
  },
  accommodationStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  accommodationPrice: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: COLORS.text,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 5,
  },
  actionButtons: {
    flexDirection: "row",
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  calendarButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: COLORS.white,
    marginLeft: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  addAccommodationButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addAccommodationText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: COLORS.white,
  },
})

export default HostAccommodationsScreen
