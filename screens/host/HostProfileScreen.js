"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useLanguage } from "../../context/LanguageContext"
import { useAuth } from "../../context/AuthContext"
import { COLORS } from "../../constants/Theme"

// Mock data
const mockHostData = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 8901",
  bio: "Passionate cyclist and host. I love providing comfortable accommodations for fellow cyclists exploring the beautiful routes in my area.",
  profileImage: null,
  joinDate: "2022-05-15",
  totalAccommodations: 3,
  totalBookings: 45,
  totalEarnings: 5840,
  rating: 4.8,
  reviews: 32,
  superHost: true,
}

const HostProfileScreen = ({ navigation }) => {
  const { t } = useLanguage()
  const { user, signOut } = useAuth()
  const [hostData, setHostData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch host data from API
    setHostData(mockHostData)
    setLoading(false)
  }, [])

  const handleLogout = async () => {
    try {
      await signOut()
      // Navigation will be handled by the auth state change in App.js
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (loading || !hostData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {hostData.profileImage ? (
              <Image source={{ uri: hostData.profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileInitial}>{hostData.firstName.charAt(0)}</Text>
              </View>
            )}
            <Text style={styles.profileName}>
              {hostData.firstName} {hostData.lastName}
            </Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>
                {hostData.rating} ({hostData.reviews} {t("reviews")})
              </Text>
            </View>
            {hostData.superHost && (
              <View style={styles.superHostBadge}>
                <Text style={styles.superHostText}>{t("superHost")}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{hostData.totalAccommodations}</Text>
            <Text style={styles.statLabel}>{t("accommodations")}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{hostData.totalBookings}</Text>
            <Text style={styles.statLabel}>{t("bookings")}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>${hostData.totalEarnings}</Text>
            <Text style={styles.statLabel}>{t("earnings")}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("about")}</Text>
          <Text style={styles.bioText}>{hostData.bio}</Text>
          <Text style={styles.joinDateText}>
            {t("memberSince")} {new Date(hostData.joinDate).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("contactInfo")}</Text>
          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={20} color={COLORS.text} />
            <Text style={styles.contactText}>{hostData.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={20} color={COLORS.text} />
            <Text style={styles.contactText}>{hostData.phone}</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("EditProfile")}>
            <Ionicons name="person-outline" size={20} color={COLORS.primary} />
            <Text style={styles.actionText}>{t("editProfile")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Settings")}>
            <Ionicons name="settings-outline" size={20} color={COLORS.primary} />
            <Text style={styles.actionText}>{t("settings")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Earnings")}>
            <Ionicons name="wallet-outline" size={20} color={COLORS.primary} />
            <Text style={styles.actionText}>{t("earnings")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Help")}>
            <Ionicons name="help-circle-outline" size={20} color={COLORS.primary} />
            <Text style={styles.actionText}>{t("help")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
            <Text style={[styles.actionText, styles.logoutText]}>{t("logout")}</Text>
          </TouchableOpacity>
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
    backgroundColor: COLORS.primary,
    paddingTop: 30,
    paddingBottom: 80,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  profileInitial: {
    fontFamily: "Poppins-Bold",
    fontSize: 40,
    color: COLORS.primary,
  },
  profileName: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: COLORS.white,
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: COLORS.white,
    marginLeft: 5,
  },
  superHostBadge: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
  },
  superHostText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: COLORS.primary,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -40,
    marginHorizontal: 20,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: COLORS.text,
  },
  statLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: COLORS.textLight,
  },
  section: {
    margin: 20,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 15,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 10,
  },
  bioText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: 10,
  },
  joinDateText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: COLORS.textLight,
    fontStyle: "italic",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contactText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 10,
  },
  actionsContainer: {
    margin: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  actionText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 15,
  },
  logoutButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  logoutText: {
    color: COLORS.error,
  },
})

export default HostProfileScreen
