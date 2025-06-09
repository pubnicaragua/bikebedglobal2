"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"

// Context
import { useLanguage } from "../../context/LanguageContext"

// Constants
import { COLORS } from "../../constants/Theme"

const BookingDetailScreen = ({ route, navigation }) => {
  const { booking } = route.params
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)

  // Format date to display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Calculate total price
  const calculateTotalPrice = () => {
    const checkIn = new Date(booking.check_in)
    const checkOut = new Date(booking.check_out)
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
    return (booking.price_per_night * nights).toFixed(2)
  }

  const handleAccept = () => {
    Alert.alert(
      t("confirm_action"),
      t("accept_booking_confirmation"),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("accept"),
          onPress: async () => {
            setIsLoading(true)
            // Simulate API call
            setTimeout(() => {
              setIsLoading(false)
              Alert.alert(t("success"), t("booking_accepted"), [{ text: "OK", onPress: () => navigation.goBack() }])
            }, 1000)
          },
        },
      ],
      { cancelable: true },
    )
  }

  const handleReject = () => {
    Alert.alert(
      t("confirm_action"),
      t("reject_booking_confirmation"),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("reject"),
          style: "destructive",
          onPress: async () => {
            setIsLoading(true)
            // Simulate API call
            setTimeout(() => {
              setIsLoading(false)
              Alert.alert(t("success"), t("booking_rejected"), [{ text: "OK", onPress: () => navigation.goBack() }])
            }, 1000)
          },
        },
      ],
      { cancelable: true },
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return COLORS.warning
      case "confirmed":
        return COLORS.success
      case "cancelled":
        return COLORS.error
      default:
        return COLORS.textLight
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("booking_details")}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <View style={styles.bookingHeader}>
            <Text style={styles.accommodationName}>{booking.accommodation.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
              <Text style={styles.statusText}>{t(booking.status)}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("guest_information")}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("guest_name")}:</Text>
              <Text style={styles.infoValue}>{booking.guest.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("email")}:</Text>
              <Text style={styles.infoValue}>{booking.guest.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("phone")}:</Text>
              <Text style={styles.infoValue}>{booking.guest.phone || t("not_provided")}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("booking_information")}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("booking_id")}:</Text>
              <Text style={styles.infoValue}>{booking.id}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("check_in")}:</Text>
              <Text style={styles.infoValue}>{formatDate(booking.check_in)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("check_out")}:</Text>
              <Text style={styles.infoValue}>{formatDate(booking.check_out)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("guests")}:</Text>
              <Text style={styles.infoValue}>{booking.guests_count}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("bikes")}:</Text>
              <Text style={styles.infoValue}>{booking.bikes_count || 0}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("special_requests")}:</Text>
              <Text style={styles.infoValue}>{booking.special_requests || t("no_special_requests")}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("payment_information")}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("price_per_night")}:</Text>
              <Text style={styles.infoValue}>€{booking.price_per_night.toFixed(2)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("total_amount")}:</Text>
              <Text style={[styles.infoValue, styles.totalPrice]}>€{calculateTotalPrice()}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("payment_status")}:</Text>
              <Text
                style={[
                  styles.infoValue,
                  { color: booking.payment_status === "paid" ? COLORS.success : COLORS.warning },
                ]}
              >
                {t(booking.payment_status)}
              </Text>
            </View>
          </View>

          {booking.status === "pending" && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.rejectButton]}
                onPress={handleReject}
                disabled={isLoading}
              >
                <Text style={styles.rejectButtonText}>{t("reject")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.acceptButton]}
                onPress={handleAccept}
                disabled={isLoading}
              >
                <Text style={styles.acceptButtonText}>{t("accept")}</Text>
              </TouchableOpacity>
            </View>
          )}

          {isLoading && <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  accommodationName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginLeft: 10,
  },
  statusText: {
    color: COLORS.background,
    fontWeight: "500",
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: COLORS.textLight,
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  totalPrice: {
    fontWeight: "bold",
    color: COLORS.primary,
    fontSize: 18,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  rejectButton: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.error,
    marginRight: 10,
  },
  acceptButton: {
    backgroundColor: COLORS.primary,
    marginLeft: 10,
  },
  rejectButtonText: {
    color: COLORS.error,
    fontWeight: "500",
  },
  acceptButtonText: {
    color: COLORS.background,
    fontWeight: "500",
  },
  loader: {
    marginTop: 20,
  },
})

export default BookingDetailScreen
