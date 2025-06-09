"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"
import Card from "../../components/ui/Card"

// Datos de ejemplo
const reservations = [
  {
    id: "1",
    accommodationName: "Casa Rural El Ciclista",
    location: "Sierra de Gredos, Ávila",
    checkIn: "15/06/2023",
    checkOut: "18/06/2023",
    status: "Confirmada",
    totalPrice: 255,
    image: "https://picsum.photos/id/10/500/300",
  },
  {
    id: "2",
    accommodationName: "Albergue Montaña Verde",
    location: "Picos de Europa, Asturias",
    checkIn: "22/07/2023",
    checkOut: "25/07/2023",
    status: "Pendiente",
    totalPrice: 195,
    image: "https://picsum.photos/id/11/500/300",
  },
  {
    id: "3",
    accommodationName: "Hotel Ciclista Premium",
    location: "Sierra Nevada, Granada",
    checkIn: "10/08/2023",
    checkOut: "15/08/2023",
    status: "Completada",
    totalPrice: 600,
    image: "https://picsum.photos/id/12/500/300",
  },
]

const ReservationsScreen = ({ navigation }) => {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState("Próximas")

  const tabs = ["Próximas", "Completadas", "Canceladas"]

  const filteredReservations = reservations.filter((reservation) => {
    if (activeTab === "Próximas") {
      return reservation.status === "Confirmada" || reservation.status === "Pendiente"
    } else if (activeTab === "Completadas") {
      return reservation.status === "Completada"
    } else if (activeTab === "Canceladas") {
      return reservation.status === "Cancelada"
    }
    return true
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmada":
        return theme.colors.success
      case "Pendiente":
        return theme.colors.warning
      case "Completada":
        return theme.colors.info
      case "Cancelada":
        return theme.colors.error
      default:
        return theme.colors.textLight
    }
  }

  const renderReservationItem = ({ item }) => (
    <Card style={styles.reservationCard}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => navigation.navigate("AccommodationDetail", { accommodationId: item.id })}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.reservationInfo}>
          <Text style={[styles.accommodationName, { color: theme.colors.text }]} numberOfLines={1}>
            {item.accommodationName}
          </Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color={theme.colors.textLight} />
            <Text style={[styles.location, { color: theme.colors.textLight }]} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={14} color={theme.colors.primary} />
            <Text style={[styles.dates, { color: theme.colors.text }]}>
              {item.checkIn} - {item.checkOut}
            </Text>
          </View>
          <View style={styles.footer}>
            <Text style={[styles.price, { color: theme.colors.primary }]}>€{item.totalPrice}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Mis Reservas</Text>
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 }]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[styles.tabText, { color: activeTab === tab ? theme.colors.primary : theme.colors.textLight }]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredReservations}
        keyExtractor={(item) => item.id}
        renderItem={renderReservationItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={50} color={theme.colors.textLight} />
            <Text style={[styles.emptyText, { color: theme.colors.textLight }]}>
              No tienes reservas {activeTab.toLowerCase()}
            </Text>
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
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  tabText: {
    fontWeight: "500",
  },
  listContent: {
    padding: 16,
  },
  reservationCard: {
    marginBottom: 16,
    padding: 0,
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
  },
  imageContainer: {
    width: 100,
  },
  image: {
    width: 100,
    height: "100%",
    resizeMode: "cover",
  },
  reservationInfo: {
    flex: 1,
    padding: 12,
  },
  accommodationName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  location: {
    fontSize: 12,
    marginLeft: 4,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  dates: {
    fontSize: 14,
    marginLeft: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 40,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
  },
})

export default ReservationsScreen
