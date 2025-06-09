import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../../../contexts/LanguageContext';
import { mockStats } from '../../../data/mockData';
import { TrendingUp, Users, Building, DollarSign } from 'lucide-react-native';

export default function AdminAnalyticsScreen() {
  const { t } = useLanguage();

  const analyticsData = [
    { month: 'Jan', users: 120, bookings: 85, revenue: 12500 },
    { month: 'Feb', users: 145, bookings: 102, revenue: 15200 },
    { month: 'Mar', users: 168, bookings: 118, revenue: 17800 },
    { month: 'Apr', users: 192, bookings: 134, revenue: 20100 },
    { month: 'May', users: 215, bookings: 156, revenue: 23400 },
    { month: 'Jun', users: 248, bookings: 178, revenue: 26800 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('analytics')}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCards}>
          <View style={styles.summaryCard}>
            <View style={styles.cardIcon}>
              <TrendingUp size={24} color="#4CAF50" />
            </View>
            <Text style={styles.cardValue}>{mockStats.monthlyGrowth}%</Text>
            <Text style={styles.cardLabel}>Growth Rate</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <View style={styles.cardIcon}>
              <Users size={24} color="#2196F3" />
            </View>
            <Text style={styles.cardValue}>{mockStats.occupancyRate}%</Text>
            <Text style={styles.cardLabel}>Occupancy Rate</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Trends</Text>
          <View style={styles.chartContainer}>
            {analyticsData.map((data, index) => (
              <View key={index} style={styles.chartBar}>
                <View 
                  style={[
                    styles.bar, 
                    { height: (data.users / 250) * 120, backgroundColor: '#4CAF50' }
                  ]} 
                />
                <Text style={styles.barLabel}>{data.month}</Text>
                <Text style={styles.barValue}>{data.users}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Building size={20} color="#2196F3" />
              <Text style={styles.metricValue}>156</Text>
              <Text style={styles.metricLabel}>Active Properties</Text>
            </View>
            <View style={styles.metricCard}>
              <Users size={20} color="#4CAF50" />
              <Text style={styles.metricValue}>1,248</Text>
              <Text style={styles.metricLabel}>Total Users</Text>
            </View>
            <View style={styles.metricCard}>
              <DollarSign size={20} color="#FF9800" />
              <Text style={styles.metricValue}>$78.4k</Text>
              <Text style={styles.metricLabel}>Monthly Revenue</Text>
            </View>
            <View style={styles.metricCard}>
              <TrendingUp size={20} color="#9C27B0" />
              <Text style={styles.metricValue}>12.5%</Text>
              <Text style={styles.metricLabel}>Growth Rate</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Insights</Text>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>User Acquisition</Text>
            <Text style={styles.insightDescription}>
              New user registrations increased by 15% this month, primarily driven by mobile app downloads.
            </Text>
          </View>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Booking Trends</Text>
            <Text style={styles.insightDescription}>
              Weekend bookings show 23% higher conversion rates compared to weekday bookings.
            </Text>
          </View>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Revenue Growth</Text>
            <Text style={styles.insightDescription}>
              Average booking value increased by 8% due to premium accommodation uptake.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  summaryCards: {
    flexDirection: 'row',
    padding: 20,
    gap: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 12,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 12,
    height: 180,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    backgroundColor: '#4CAF50',
    width: 20,
    borderRadius: 2,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    color: '#CCCCCC',
    marginBottom: 4,
  },
  barValue: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  insightCard: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  insightDescription: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },
});