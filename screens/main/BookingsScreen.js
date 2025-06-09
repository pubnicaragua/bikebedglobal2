"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useLanguage } from "../../context/LanguageContext"
import { COLORS } from "../../constants/Theme"

// Mock data for bookings
const mockBookings = [
  {
    id: "1",
    accommodationName: "Mountain View Cabin",
    location: "Alps, Switzerland",
    checkIn: "2023-07-15",
    checkOut: "2023-07-20",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59",
  },
  {
    id: "2",
    accommodationName: "Coastal Retreat",
    location: "Barcelona, Spain",
    checkIn: "2023-08-10",
    checkOut: "2023-08-15",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
  {
    id: "3",
    accommodationName: "Urban Loft",
    location: "Berlin, Germany",
    checkIn: "2023-06-01",
    checkOut: "2023-06-05",
    status: "completed",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  },
]

const BookingsScreen = ({ navigation }) => {
  const { t } = useLanguage()
  const [bookings, setBookings] = useState([])
  const [activeTab, setActiveTab] = useState("upcoming")

  useEffect(() => {
    // In a real app, fetch bookings from API
    setBookings(mockBookings)
  }, [])

  const filteredBookings = bookings.filter((booking) => booking.status === activeTab)

  const renderBookingItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => navigation.navigate("BookingDetail", { bookingId: item.id })}
    >
      <View style={styles.bookingImageContainer}>
        <View style={styles.bookingImage} />
      </View>
      <View style={styles.bookingInfo}>
        <Text style={styles.bookingName}>{item.accommodationName}</Text>
        <Text style={styles.bookingLocation}>
          <Ionicons name="location-outline" size={14} color={COLORS.textLight} /> {item.location}
        </Text>
        <View style={styles.bookingDates}>
          <Text style={styles.bookingDateLabel}>{t("checkIn")}</Text>
          <Text style={styles.bookingDate}>{item.checkIn}</Text>
          <Text style={styles.bookingDateLabel}>{t("checkOut")}</Text>
          <Text style={styles.bookingDate}>{item.checkOut}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("bookings")}</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
          onPress={() => setActiveTab("upcoming")}
        >
          <Text style={[styles.tabText, activeTab === "upcoming" && styles.activeTabText]}>{t("upcoming")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "completed" && styles.activeTab]}
          onPress={() => setActiveTab("completed")}
        >
          <Text style={[styles.tabText, activeTab === "completed" && styles.activeTabText]}>{t("completed")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "cancelled" && styles.activeTab]}
          onPress={() => setActiveTab("cancelled")}
        >
          <Text style={[styles.tabText, activeTab === "cancelled" && styles.activeTabText]}>{t("cancelled")}</Text>
        </TouchableOpacity>
      </View>

      {filteredBookings.length > 0 ? (
        <FlatList
          data={filteredBookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.bookingsList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={60} color={COLORS.textLight} />
          <Text style={styles.emptyText}>
            {activeTab === "upcoming"
              ? t("noUpcomingBookings")
              : activeTab === "completed"
                ? t("noCompletedBookings")
                : t("noCancelledBookings")}
          </Text>
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
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    color: COLORS.text,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: COLORS.textLight,
  },
  activeTabText: {
    color: COLORS.white,
  },
  bookingsList: {
    padding: 20,
  },
  bookingCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookingImageContainer: {
    width: 100,
  },
  bookingImage: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.placeholder,
  },
  bookingInfo: {
    flex: 1,
    padding: 15,
  },
  bookingName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 5,
  },
  bookingLocation: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 10,
  },
  bookingDates: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bookingDateLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: COLORS.textLight,
    width: "30%",
  },
  bookingDate: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: COLORS.text,
    width: "20%",
    marginBottom: 5,
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
  },
})

export default BookingsScreen
