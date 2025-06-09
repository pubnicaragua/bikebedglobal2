"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useLanguage } from "../../context/LanguageContext"
import { COLORS } from "../../constants/Theme"

// Mock data
const mockBookings = [
  {
    id: "1",
    guestName: "Michael Johnson",
    checkIn: "2023-07-15",
    checkOut: "2023-07-20",
    accommodationName: "Mountain View Cabin",
    guests: 2,
    totalPrice: 600,
    status: "confirmed",
  },
  {
    id: "2",
    guestName: "Sarah Williams",
    checkIn: "2023-07-22",
    checkOut: "2023-07-25",
    accommodationName: "Mountain View Cabin",
    guests: 1,
    totalPrice: 360,
    status: "pending",
  },
  {
    id: "3",
    guestName: "David Brown",
    checkIn: "2023-08-05",
    checkOut: "2023-08-10",
    accommodationName: "Urban Loft",
    guests: 2,
    totalPrice: 475,
    status: "confirmed",
  },
  {
    id: "4",
    guestName: "Emma Davis",
    checkIn: "2023-06-10",
    checkOut: "2023-06-15",
    accommodationName: "Coastal Retreat",
    guests: 3,
    totalPrice: 750,
    status: "completed",
  },
  {
    id: "5",
    guestName: "James Wilson",
    checkIn: "2023-06-20",
    checkOut: "2023-06-22",
    accommodationName: "Urban Loft",
    guests: 1,
    totalPrice: 190,
    status: "cancelled",
  },
]

const HostBookingsScreen = ({ navigation }) => {
  const { t } = useLanguage()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")

  useEffect(() => {
    // In a real app, fetch bookings from API
    setBookings(mockBookings)
    setLoading(false)
  }, [])

  const filteredBookings =
    activeFilter === "all" ? bookings : bookings.filter((booking) => booking.status === activeFilter)

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "#4CAF50"
      case "pending":
        return "#FF9800"
      case "completed":
        return "#2196F3"
      case "cancelled":
        return "#F44336"
      default:
        return COLORS.textLight
    }
  }

  const renderBookingItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => navigation.navigate("BookingDetail", { bookingId: item.id })}
    >
      <View style={styles.bookingHeader}>
        <Text style={styles.guestName}>{item.guestName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{t(item.status)}</Text>
        </View>
      </View>

      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="home-outline" size={16} color={COLORS.textLight} />
          <Text style={styles.detailText}>{item.accommodationName}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.textLight} />
          <Text style={styles.detailText}>
            {item.checkIn} - {item.checkOut}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="people-outline" size={16} color={COLORS.textLight} />
          <Text style={styles.detailText}>
            {item.guests} {item.guests === 1 ? t("guest") : t("guests")}
          </Text>
        </View>
      </View>

      <View style={styles.bookingFooter}>
        <Text style={styles.totalPrice}>${item.totalPrice}</Text>

        {item.status === "pending" && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.actionButtonText}>{t("accept")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.declineButton}>
              <Text style={styles.actionButtonText}>{t("decline")}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("bookings")}</Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === "all" && styles.activeFilter]}
            onPress={() => setActiveFilter("all")}
          >
            <Text style={[styles.filterText, activeFilter === "all" && styles.activeFilterText]}>{t("all")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === "pending" && styles.activeFilter]}
            onPress={() => setActiveFilter("pending")}
          >
            <Text style={[styles.filterText, activeFilter === "pending" && styles.activeFilterText]}>
              {t("pending")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === "confirmed" && styles.activeFilter]}
            onPress={() => setActiveFilter("confirmed")}
          >
            <Text style={[styles.filterText, activeFilter === "confirmed" && styles.activeFilterText]}>
              {t("confirmed")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === "completed" && styles.activeFilter]}
            onPress={() => setActiveFilter("completed")}
          >
            <Text style={[styles.filterText, activeFilter === "completed" && styles.activeFilterText]}>
              {t("completed")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === "cancelled" && styles.activeFilter]}
            onPress={() => setActiveFilter("cancelled")}
          >
            <Text style={[styles.filterText, activeFilter === "cancelled" && styles.activeFilterText]}>
              {t("cancelled")}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : filteredBookings.length > 0 ? (
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
            {activeFilter === "all" ? t("noBookings") : t("noBookingsWithStatus", { status: t(activeFilter) })}
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
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: COLORS.text,
  },
  filterContainer: {
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
  bookingsList: {
    padding: 20,
  },
  bookingCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  guestName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: COLORS.text,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: COLORS.white,
  },
  bookingDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 10,
  },
  bookingFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 15,
  },
  totalPrice: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: COLORS.text,
  },
  actionButtons: {
    flexDirection: "row",
  },
  acceptButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  declineButton: {
    backgroundColor: COLORS.error,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: COLORS.white,
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

export default HostBookingsScreen
