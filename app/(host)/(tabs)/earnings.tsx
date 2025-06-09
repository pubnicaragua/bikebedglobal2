import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../../../contexts/LanguageContext';
import { mockStats } from '../../../data/mockData';
import { DollarSign, TrendingUp, Calendar, CreditCard } from 'lucide-react-native';

export default function EarningsScreen() {
  const { t } = useLanguage();

  const earningsData = [
    { month: 'Jan', amount: 4200 },
    { month: 'Feb', amount: 5100 },
    { month: 'Mar', amount: 4800 },
    { month: 'Apr', amount: 6200 },
    { month: 'May', amount: 7100 },
    { month: 'Jun', amount: 8500 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Earnings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCards}>
          <View style={styles.summaryCard}>
            <View style={styles.cardIcon}>
              <DollarSign size={24} color="#4CAF50" />
            </View>
            <Text style={styles.cardValue}>${mockStats.revenue.toLocaleString()}</Text>
            <Text style={styles.cardLabel}>Total Earnings</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <View style={styles.cardIcon}>
              <TrendingUp size={24} color="#2196F3" />
            </View>
            <Text style={styles.cardValue}>{mockStats.monthlyGrowth}%</Text>
            <Text style={styles.cardLabel}>Growth Rate</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Earnings</Text>
          <View style={styles.chartContainer}>
            {earningsData.map((data, index) => (
              <View key={index} style={styles.chartBar}>
                <View 
                  style={[
                    styles.bar, 
                    { height: (data.amount / 8500) * 150 }
                  ]} 
                />
                <Text style={styles.barLabel}>{data.month}</Text>
                <Text style={styles.barValue}>${(data.amount / 1000).toFixed(1)}k</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {[
            { id: 1, date: '2024-01-15', amount: 240, type: 'Booking Payment' },
            { id: 2, date: '2024-01-12', amount: 180, type: 'Booking Payment' },
            { id: 3, date: '2024-01-08', amount: 320, type: 'Booking Payment' },
          ].map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionIcon}>
                <CreditCard size={20} color="#4CAF50" />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionType}>{transaction.type}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text style={styles.transactionAmount}>+${transaction.amount}</Text>
            </View>
          ))}
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
    height: 200,
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
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  transactionIcon: {
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#CCCCCC',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});