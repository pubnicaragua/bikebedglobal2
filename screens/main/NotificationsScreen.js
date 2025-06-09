"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useLanguage } from "../../context/LanguageContext"
import { COLORS } from "../../constants/Theme"

// Mock notifications data
const mockNotifications = [
  {
    id: "1",
    type: "booking",
    title: "Booking Confirmed",
    message: "Your booking at Mountain View Cabin has been confirmed.",
    date: "2023-06-15T10:30:00",
    read: false,
  },
  {
    id: "2",
    type: "message",
    title: "New Message",
    message: "You have a new message from Emma Thompson.",
    date: "2023-06-14T15:45:00",
    read: true,
  },
  {
    id: "3",
    type: "promo",
    title: "Special Offer",
    message: "Get 15% off your next booking with code SUMMER23.",
    date: "2023-06-12T09:15:00",
    read: true,
  },
  {
    id: "4",
    type: "system",
    title: "Account Update",
    message: "Your profile has been successfully updated.",
    date: "2023-06-10T14:20:00",
    read: true,
  },
]

const NotificationsScreen = ({ navigation }) => {
  const { t } = useLanguage()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch notifications from API
    setNotifications(mockNotifications)
    setLoading(false)
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      return t("today")
    } else if (diffInDays === 1) {
      return t("yesterday")
    } else if (diffInDays < 7) {
      return `${diffInDays} ${t("daysAgo")}`
    } else {
      return date.toLocaleDateString()
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "booking":
        return "calendar"
      case "message":
        return "chatbubble"
      case "promo":
        return "pricetag"
      case "system":
        return "information-circle"
      default:
        return "notifications"
    }
  }

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.read && styles.unreadNotification]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={[styles.iconContainer, { backgroundColor: getNotificationColor(item.type) }]}>
        <Ionicons name={getNotificationIcon(item.type)} size={20} color={COLORS.white} />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationDate}>{formatDate(item.date)}</Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  )

  const getNotificationColor = (type) => {
    switch (type) {
      case "booking":
        return COLORS.primary
      case "message":
        return "#4CAF50"
      case "promo":
        return "#FF9800"
      case "system":
        return "#2196F3"
      default:
        return COLORS.textLight
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("notifications")}</Text>
        <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
          <Text style={styles.markAllText}>{t("markAllRead")}</Text>
        </TouchableOpacity>
      </View>

      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationsList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={60} color={COLORS.textLight} />
          <Text style={styles.emptyText}>{t("noNotifications")}</Text>
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
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: COLORS.text,
  },
  markAllButton: {
    padding: 5,
  },
  markAllText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: COLORS.primary,
  },
  notificationsList: {
    padding: 15,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    position: "relative",
  },
  unreadNotification: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 5,
  },
  notificationMessage: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 10,
  },
  notificationDate: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: COLORS.textLight,
  },
  unreadDot: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
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

export default NotificationsScreen
