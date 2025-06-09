"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useLanguage } from "../../context/LanguageContext"
import { useAuth } from "../../context/AuthContext"
import { COLORS } from "../../constants/Theme"

// Mock data
const mockStats = {
  totalEarnings: 2450,
  pendingPayouts: 350,
  totalBookings: 12,
  upcomingBookings: 3,
  occupancyRate: 78,
  averageRating: 4.8,
}

const mockRecentBookings = [
  {
    id: "1",
    guestName: "Michael Johnson",
    checkIn: "2023-07-15",
    checkOut: "2023-07-20",
    accommodationName: "Mountain View Cabin",
    status: "confirmed",
  },
  {
    id: "2",
    guestName: "Sarah Williams",
    checkIn: "2023-07-22",
    checkOut: "2023-07-25",
    accommodationName: "Mountain View Cabin",
    status: "pending",
  },
]

const HostDashboardScreen = ({ navigation }) => {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [stats, setStats] = useState(mockStats)
  const [recentBookings, setRecentBookings] = useState(mockRecentBookings)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch dashboard data from API
    setLoading(false)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "#4CAF50"
      case "pending":
        return "#FF9800"
      case "cancelled":
        return "#F44336"
      default:
        return COLORS.textLight
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            {t("hello")}, {user?.user_metadata?.firstName || "Host"}
          </Text>
          <Text style={styles.headerTitle}>{t("dashboard")}</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate("Notifications")}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>${stats.totalEarnings}</Text>
            <Text style={styles.statLabel}>{t("totalEarnings")}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.totalBookings}</Text>
            <Text style={styles.statLabel}>{t("totalBookings")}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.occupancyRate}%</Text>
            <Text style={styles.statLabel}>{t("occupancyRate")}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.averageRating}</Text>
            <Text style={styles.statLabel}>{t("averageRating")}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.earningsCard} onPress={() => navigation.navigate("Earnings")}>
          <View style={styles.earningsInfo}>
            <Text style={styles.earningsTitle}>{t("earnings")}</Text>
            <Text style={styles.earningsValue}>${stats.totalEarnings}</Text>
            <Text style={styles.earningsPending}>
              ${stats.pendingPayouts} {t("pendingPayout")}
            </Text>
          </View>
          <View style={styles.earningsIcon}>
            <Ionicons name="wallet-outline" size={40} color={COLORS.primary} />
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t("upcomingBookings")}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Bookings")}>
              <Text style={styles.seeAllText}>{t("seeAll")}</Text>
            </TouchableOpacity>
          </View>

          {recentBookings.length > 0 ? (
            recentBookings.map((booking) => (
              <TouchableOpacity
                key={booking.id}
                style={styles.bookingCard}
                onPress={() => navigation.navigate("BookingDetail", { bookingId: booking.id })}
              >
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingGuest}>{booking.guestName}</Text>
                  <Text style={styles.bookingDates}>
                    {booking.checkIn} - {booking.checkOut}
                  </Text>
                  <Text style={styles.bookingAccommodation}>{booking.accommodationName}</Text>
                </View>
                <View style={styles.bookingStatus}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
                    <Text style={styles.statusText}>{t(booking.status)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyBookings}>
              <Text style={styles.emptyText}>{t("noUpcomingBookings")}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t("quickActions")}</Text>
          </View>

          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate("AddAccommodation")}>
              <Ionicons name="add-circle-outline" size={30} color={COLORS.primary} />
              <Text style={styles.actionText}>{t("addAccommodation")}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate("Accommodations")}>
              <Ionicons name="home-outline" size={30} color={COLORS.primary} />
              <Text style={styles.actionText}>{t("manageAccommodations")}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate("Calendar")}>
              <Ionicons name="calendar-outline" size={30} color={COLORS.primary} />
              <Text style={styles.actionText}>{t("manageCalendar")}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate("Messages")}>
              <Ionicons name="chatbubble-outline" size={30} color={COLORS.primary} />
              <Text style={styles.actionText}>{t("messages")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  greeting: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: COLORS.textLight,
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: COLORS.text,
  },
  notificationButton: {
    position: "relative",
    padding: 5,
  },
  notificationBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  statValue: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: COLORS.text,
    marginBottom: 5,
  },
  statLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.textLight,
  },
  earningsCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  earningsInfo: {
    flex: 1,
  },
  earningsTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 5,
  },
  earningsValue: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    color: COLORS.text,
    marginBottom: 5,
  },
  earningsPending: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.textLight,
  },
  earningsIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: COLORS.text,
  },
  seeAllText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: COLORS.primary,
  },
  bookingCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingGuest: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 5,
  },
  bookingDates: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 5,
  },
  bookingAccommodation: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.text,
  },
  bookingStatus: {
    justifyContent: "center",
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
  emptyBookings: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: "center",
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  actionCard: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  actionText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: COLORS.text,
    textAlign: "center",
    marginTop: 10,
  },
})

export default HostDashboardScreen
