"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useLanguage } from "../../context/LanguageContext"
import { COLORS } from "../../constants/Theme"

// Mock booking data
const mockBooking = {
  id: "1",
  accommodationName: "Mountain View Cabin",
  location: "Alps, Switzerland",
  checkIn: "2023-07-15",
  checkOut: "2023-07-20",
  guests: 2,
  nights: 5,
  price: 120,
  totalPrice: 600,
  status: "upcoming",
  host: {
    name: "Emma Thompson",
    rating: 4.9,
    image: null,
  },
  amenities: ["Bike Storage", "Wifi", "Kitchen", "Washing Machine"],
  coordinates: {
    latitude: 46.8182,
    longitude: 8.2275,
  },
}

const BookingDetailScreen = ({ navigation, route }) => {
  const { t } = useLanguage()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch booking details from API using route.params.bookingId
    setBooking(mockBooking)
    setLoading(false)
  }, [route.params?.bookingId])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("bookingDetails")}</Text>
        </View>

        <View style={styles.imageContainer}>
          <View style={styles.image} />
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {booking.status === "upcoming"
                ? t("upcoming")
                : booking.status === "completed"
                  ? t("completed")
                  : t("cancelled")}
            </Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.accommodationName}>{booking.accommodationName}</Text>
          <Text style={styles.location}>
            <Ionicons name="location-outline" size={16} color={COLORS.textLight} /> {booking.location}
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("bookingInfo")}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("checkIn")}</Text>
              <Text style={styles.infoValue}>{booking.checkIn}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("checkOut")}</Text>
              <Text style={styles.infoValue}>{booking.checkOut}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("guests")}</Text>
              <Text style={styles.infoValue}>{booking.guests}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("nights")}</Text>
              <Text style={styles.infoValue}>{booking.nights}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("priceDetails")}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{`${booking.nights} ${t("nights")} x $${booking.price}`}</Text>
              <Text style={styles.infoValue}>${booking.price * booking.nights}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("serviceFee")}</Text>
              <Text style={styles.infoValue}>$0</Text>
            </View>
            <View style={[styles.infoRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>{t("total")}</Text>
              <Text style={styles.totalValue}>${booking.totalPrice}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("host")}</Text>
            <View style={styles.hostContainer}>
              <View style={styles.hostImagePlaceholder}>
                <Text style={styles.hostInitial}>{booking.host.name.charAt(0)}</Text>
              </View>
              <View style={styles.hostInfo}>
                <Text style={styles.hostName}>{booking.host.name}</Text>
                <View style={styles.hostRating}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.hostRatingText}>{booking.host.rating}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.contactButtonText}>{t("contact")}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("location")}</Text>
            <TouchableOpacity
              style={styles.mapPreview}
              onPress={() =>
                navigation.navigate("Map", {
                  coordinates: booking.coordinates,
                  name: booking.accommodationName,
                })
              }
            >
              <Text style={styles.mapText}>{t("viewOnMap")}</Text>
              <Ionicons name="map-outline" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonsContainer}>
            {booking.status === "upcoming" && (
              <>
                <TouchableOpacity style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>{t("cancelBooking")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modifyButton}>
                  <Text style={styles.modifyButtonText}>{t("modifyBooking")}</Text>
                </TouchableOpacity>
              </>
            )}
            {booking.status === "completed" && (
              <TouchableOpacity
                style={styles.reviewButton}
                onPress={() => navigation.navigate("ReviewScreen", { bookingId: booking.id })}
              >
                <Text style={styles.reviewButtonText}>{t("leaveReview")}</Text>
              </TouchableOpacity>
            )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: COLORS.text,
    marginLeft: 15,
  },
  imageContainer: {
    height: 200,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.placeholder,
  },
  statusBadge: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: COLORS.white,
  },
  contentContainer: {
    padding: 20,
  },
  accommodationName: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: COLORS.text,
    marginBottom: 5,
  },
  location: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 15,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.textLight,
  },
  infoValue: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: COLORS.text,
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalLabel: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: COLORS.text,
  },
  totalValue: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: COLORS.text,
  },
  hostContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  hostImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  hostInitial: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: COLORS.white,
  },
  hostInfo: {
    flex: 1,
    marginLeft: 15,
  },
  hostName: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: COLORS.text,
  },
  hostRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  hostRatingText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 5,
  },
  contactButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  contactButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: COLORS.white,
  },
  mapPreview: {
    height: 100,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mapText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: COLORS.primary,
    marginRight: 10,
  },
  buttonsContainer: {
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: COLORS.error,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: COLORS.white,
  },
  modifyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  modifyButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: COLORS.white,
  },
  reviewButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  reviewButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: COLORS.white,
  },
})

export default BookingDetailScreen
