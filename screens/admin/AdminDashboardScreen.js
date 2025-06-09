"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"
import Card from "../../components/ui/Card"

// Datos de ejemplo
const stats = {
  totalUsers: 1248,
  totalAccommodations: 356,
  totalReservations: 892,
  totalRevenue: 78450,
  pendingReservations: 42,
  pendingReviews: 18,
}

const recentReservations = [
  {
    id: "1",
    user: "Carlos Rodríguez",
    accommodation: "Casa Rural El Ciclista",
    checkIn: "15/06/2023",
    checkOut: "18/06/2023",
    status: "Confirmada",
    amount: 255,
  },
  {
    id: "2",
    user: "Laura Martínez",
    accommodation: "Albergue Montaña Verde",
    checkIn: "22/07/2023",
    checkOut: "25/07/2023",
    status: "Pendiente",
    amount: 195,
  },
  {
    id: "3",
    user: "Miguel Sánchez",
    accommodation: "Hotel Ciclista Premium",
    checkIn: "10/08/2023",
    checkOut: "15/08/2023",
    status: "Confirmada",
    amount: 600,
  },
]

const AdminDashboardScreen = ({ navigation }) => {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState("Dashboard")

  const tabs = ["Dashboard", "Usuarios", "Alojamientos", "Reservas", "Pagos"]

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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Panel de Administración</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Ionicons name="exit-outline" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScrollContent}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && { backgroundColor: theme.colors.primary },
                { borderColor: theme.colors.primary },
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, { color: activeTab === tab ? "white" : theme.colors.primary }]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {activeTab === "Dashboard" && (
          <>
            <View style={styles.statsGrid}>
              <Card style={[styles.statCard, { backgroundColor: "#E3F2FD" }]}>
                <Ionicons name="people" size={24} color="#2196F3" />
                <Text style={styles.statValue}>{stats.totalUsers}</Text>
                <Text style={styles.statLabel}>Usuarios</Text>
              </Card>

              <Card style={[styles.statCard, { backgroundColor: "#E8F5E9" }]}>
                <Ionicons name="home" size={24} color="#4CAF50" />
                <Text style={styles.statValue}>{stats.totalAccommodations}</Text>
                <Text style={styles.statLabel}>Alojamientos</Text>
              </Card>

              <Card style={[styles.statCard, { backgroundColor: "#FFF8E1" }]}>
                <Ionicons name="calendar" size={24} color="#FFC107" />
                <Text style={styles.statValue}>{stats.totalReservations}</Text>
                <Text style={styles.statLabel}>Reservas</Text>
              </Card>

              <Card style={[styles.statCard, { backgroundColor: "#F3E5F5" }]}>
                <Ionicons name="cash" size={24} color="#9C27B0" />
                <Text style={styles.statValue}>€{stats.totalRevenue}</Text>
                <Text style={styles.statLabel}>Ingresos</Text>
              </Card>
            </View>

            <View style={styles.alertsSection}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Alertas</Text>
              <View style={styles.alertsContainer}>
                <Card style={[styles.alertCard, { borderLeftColor: theme.colors.warning }]}>
                  <View style={styles.alertIconContainer}>
                    <Ionicons name="alert-circle" size={24} color={theme.colors.warning} />
                  </View>
                  <View style={styles.alertContent}>
                    <Text style={[styles.alertTitle, { color: theme.colors.text }]}>
                      {stats.pendingReservations} reservas pendientes
                    </Text>
                    <Text style={[styles.alertDescription, { color: theme.colors.textLight }]}>
                      Reservas que requieren confirmación
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.alertAction}>
                    <Ionicons name="chevron-forward" size={20} color={theme.colors.textLight} />
                  </TouchableOpacity>
                </Card>

                <Card style={[styles.alertCard, { borderLeftColor: theme.colors.info }]}>
                  <View style={styles.alertIconContainer}>
                    <Ionicons name="chatbubble" size={24} color={theme.colors.info} />
                  </View>
                  <View style={styles.alertContent}>
                    <Text style={[styles.alertTitle, { color: theme.colors.text }]}>
                      {stats.pendingReviews} reseñas por moderar
                    </Text>
                    <Text style={[styles.alertDescription, { color: theme.colors.textLight }]}>
                      Reseñas que requieren aprobación
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.alertAction}>
                    <Ionicons name="chevron-forward" size={20} color={theme.colors.textLight} />
                  </TouchableOpacity>
                </Card>
              </View>
            </View>

            <View style={styles.recentSection}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Reservas Recientes</Text>
              {recentReservations.map((reservation) => (
                <Card key={reservation.id} style={styles.reservationCard}>
                  <View style={styles.reservationHeader}>
                    <Text style={[styles.reservationUser, { color: theme.colors.text }]}>{reservation.user}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(reservation.status) }]}>
                      <Text style={styles.statusText}>{reservation.status}</Text>
                    </View>
                  </View>
                  <Text style={[styles.reservationAccommodation, { color: theme.colors.primary }]}>
                    {reservation.accommodation}
                  </Text>
                  <View style={styles.reservationDetails}>
                    <View style={styles.reservationDetail}>
                      <Ionicons name="calendar-outline" size={14} color={theme.colors.textLight} />
                      <Text style={[styles.reservationDetailText, { color: theme.colors.textLight }]}>
                        {reservation.checkIn} - {reservation.checkOut}
                      </Text>
                    </View>
                    <View style={styles.reservationDetail}>
                      <Ionicons name="cash-outline" size={14} color={theme.colors.textLight} />
                      <Text style={[styles.reservationDetailText, { color: theme.colors.textLight }]}>
                        €{reservation.amount}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.reservationActions}>
                    <TouchableOpacity style={[styles.reservationAction, { backgroundColor: theme.colors.primary }]}>
                      <Ionicons name="eye-outline" size={16} color="white" />
                      <Text style={styles.reservationActionText}>Ver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.reservationAction, { backgroundColor: theme.colors.info }]}>
                      <Ionicons name="create-outline" size={16} color="white" />
                      <Text style={styles.reservationActionText}>Editar</Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}
            </View>
          </>
        )}

        {activeTab !== "Dashboard" && (
          <View style={styles.comingSoonContainer}>
            <Ionicons name="construct-outline" size={60} color={theme.colors.textLight} />
            <Text style={[styles.comingSoonTitle, { color: theme.colors.text }]}>En Construcción</Text>
            <Text style={[styles.comingSoonText, { color: theme.colors.textLight }]}>
              La sección de {activeTab} estará disponible próximamente.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tabsContainer: {
    paddingHorizontal: 16,
  },
  tabsScrollContent: {
    paddingBottom: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  tabText: {
    fontWeight: "500",
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    width: "48%",
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  alertsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  alertsContainer: {
    marginBottom: 8,
  },
  alertCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
  },
  alertIconContainer: {
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  alertDescription: {
    fontSize: 12,
  },
  alertAction: {
    padding: 4,
  },
  recentSection: {
    marginBottom: 24,
  },
  reservationCard: {
    marginBottom: 12,
    padding: 12,
  },
  reservationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  reservationUser: {
    fontSize: 16,
    fontWeight: "600",
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
  reservationAccommodation: {
    fontSize: 14,
    marginBottom: 8,
  },
  reservationDetails: {
    flexDirection: "row",
    marginBottom: 12,
  },
  reservationDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  reservationDetailText: {
    fontSize: 12,
    marginLeft: 4,
  },
  reservationActions: {
    flexDirection: "row",
  },
  reservationAction: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
  },
  reservationActionText: {
    color: "white",
    fontSize: 12,
    marginLeft: 4,
  },
  comingSoonContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 40,
  },
  comingSoonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  comingSoonText: {
    fontSize: 16,
    textAlign: "center",
  },
})

export default AdminDashboardScreen
