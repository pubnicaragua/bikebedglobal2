"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LineChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"

// Context
import { useLanguage } from "../../context/LanguageContext"

// Constants
import { COLORS } from "../../constants/Theme"

const EarningsScreen = ({ navigation }) => {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [timeFrame, setTimeFrame] = useState("month") // 'week', 'month', 'year'
  const [earningsData, setEarningsData] = useState(null)
  const [totalEarnings, setTotalEarnings] = useState(0)
  const [pendingPayouts, setPendingPayouts] = useState(0)
  const [bookingsCount, setBookingsCount] = useState(0)

  // Mock data for the chart
  const mockWeekData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [50, 75, 100, 75, 150, 200, 175],
        color: (opacity = 1) => `rgba(46, 134, 222, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  }

  const mockMonthData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: [400, 550, 700, 600],
        color: (opacity = 1) => `rgba(46, 134, 222, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  }

  const mockYearData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: [1200, 1400, 1800, 2000, 2200, 2500, 2700, 2900, 3100, 3300, 3500, 3700],
        color: (opacity = 1) => `rgba(46, 134, 222, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  }

  useEffect(() => {
    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      switch (timeFrame) {
        case "week":
          setEarningsData(mockWeekData)
          setTotalEarnings(825)
          setPendingPayouts(175)
          setBookingsCount(7)
          break
        case "month":
          setEarningsData(mockMonthData)
          setTotalEarnings(2250)
          setPendingPayouts(600)
          setBookingsCount(18)
          break
        case "year":
          setEarningsData(mockYearData)
          setTotalEarnings(28600)
          setPendingPayouts(3700)
          setBookingsCount(215)
          break
        default:
          setEarningsData(mockMonthData)
          setTotalEarnings(2250)
          setPendingPayouts(600)
          setBookingsCount(18)
      }
      setIsLoading(false)
    }, 1000)
  }, [timeFrame])

  const formatCurrency = (amount) => {
    return `€${amount.toFixed(2)}`
  }

  const chartConfig = {
    backgroundGradientFrom: COLORS.background,
    backgroundGradientTo: COLORS.background,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(46, 134, 222, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: COLORS.primary,
    },
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("earnings")}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <View style={styles.timeFrameSelector}>
            <TouchableOpacity
              style={[styles.timeFrameButton, timeFrame === "week" && styles.timeFrameButtonActive]}
              onPress={() => setTimeFrame("week")}
            >
              <Text style={[styles.timeFrameText, timeFrame === "week" && styles.timeFrameTextActive]}>
                {t("week")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.timeFrameButton, timeFrame === "month" && styles.timeFrameButtonActive]}
              onPress={() => setTimeFrame("month")}
            >
              <Text style={[styles.timeFrameText, timeFrame === "month" && styles.timeFrameTextActive]}>
                {t("month")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.timeFrameButton, timeFrame === "year" && styles.timeFrameButtonActive]}
              onPress={() => setTimeFrame("year")}
            >
              <Text style={[styles.timeFrameText, timeFrame === "year" && styles.timeFrameTextActive]}>
                {t("year")}
              </Text>
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
          ) : (
            <>
              <View style={styles.earningsSummary}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>{t("total_earnings")}</Text>
                  <Text style={styles.summaryValue}>{formatCurrency(totalEarnings)}</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>{t("pending_payouts")}</Text>
                  <Text style={styles.summaryValue}>{formatCurrency(pendingPayouts)}</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>{t("bookings")}</Text>
                  <Text style={styles.summaryValue}>{bookingsCount}</Text>
                </View>
              </View>

              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>
                  {timeFrame === "week"
                    ? t("weekly_earnings")
                    : timeFrame === "month"
                      ? t("monthly_earnings")
                      : t("yearly_earnings")}
                </Text>
                <LineChart
                  data={earningsData}
                  width={Dimensions.get("window").width - 40}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chart}
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t("recent_payouts")}</Text>
                <View style={styles.payoutItem}>
                  <View>
                    <Text style={styles.payoutDate}>May 15, 2023</Text>
                    <Text style={styles.payoutReference}>REF: PAY-2023-05-15</Text>
                  </View>
                  <Text style={styles.payoutAmount}>{formatCurrency(550)}</Text>
                </View>
                <View style={styles.payoutItem}>
                  <View>
                    <Text style={styles.payoutDate}>Apr 15, 2023</Text>
                    <Text style={styles.payoutReference}>REF: PAY-2023-04-15</Text>
                  </View>
                  <Text style={styles.payoutAmount}>{formatCurrency(475)}</Text>
                </View>
                <View style={styles.payoutItem}>
                  <View>
                    <Text style={styles.payoutDate}>Mar 15, 2023</Text>
                    <Text style={styles.payoutReference}>REF: PAY-2023-03-15</Text>
                  </View>
                  <Text style={styles.payoutAmount}>{formatCurrency(625)}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllButtonText}>{t("view_all_transactions")}</Text>
              </TouchableOpacity>
            </>
          )}
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
    padding: 20,
  },
  timeFrameSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: COLORS.border,
    borderRadius: 10,
    padding: 4,
  },
  timeFrameButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  timeFrameButtonActive: {
    backgroundColor: COLORS.background,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timeFrameText: {
    color: COLORS.textLight,
    fontWeight: "500",
  },
  timeFrameTextActive: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  earningsSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
  },
  chartContainer: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  section: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 15,
  },
  payoutItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  payoutDate: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
  },
  payoutReference: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  payoutAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.success,
  },
  viewAllButton: {
    padding: 15,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  viewAllButtonText: {
    color: COLORS.primary,
    fontWeight: "500",
  },
  loader: {
    marginTop: 50,
  },
})

export default EarningsScreen
