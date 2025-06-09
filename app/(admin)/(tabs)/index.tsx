import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';
import { mockStats } from '../../../data/mockData';
import { Users, Building, Calendar, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react-native';

export default function AdminDashboardScreen() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{t('welcome')}, {user?.name}!</Text>
            <Text style={styles.subtitle}>System Overview & Management</Text>
          </View>
          <Image source={{ uri: user?.avatar }} style={styles.avatar} />
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Users size={24} color="#4CAF50" />
            </View>
            <Text style={styles.statValue}>{mockStats.totalUsers.toLocaleString()}</Text>
            <Text style={styles.statLabel}>{t('totalUsers')}</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Building size={24} color="#2196F3" />
            </View>
            <Text style={styles.statValue}>{mockStats.totalHosts}</Text>
            <Text style={styles.statLabel}>{t('totalHosts')}</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Calendar size={24} color="#FF9800" />
            </View>
            <Text style={styles.statValue}>{mockStats.totalBookings}</Text>
            <Text style={styles.statLabel}>{t('totalBookings')}</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <DollarSign size={24} color="#9C27B0" />
            </View>
            <Text style={styles.statValue}>${mockStats.revenue.toLocaleString()}</Text>
            <Text style={styles.statLabel}>{t('revenue')}</Text>
          </View>
        </View>

        <View style={styles.alertsSection}>
          <Text style={styles.sectionTitle}>System Alerts</Text>
          <View style={styles.alertCard}>
            <AlertTriangle size={20} color="#FF9800" />
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Pending Reviews</Text>
              <Text style={styles.alertDescription}>12 accommodations awaiting approval</Text>
            </View>
          </View>
          <View style={styles.alertCard}>
            <AlertTriangle size={20} color="#F44336" />
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Reported Issues</Text>
              <Text style={styles.alertDescription}>3 user reports require attention</Text>
            </View>
          </View>
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Users size={24} color="#FFFFFF" />
              <Text style={styles.actionText}>{t('manageUsers')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Building size={24} color="#FFFFFF" />
              <Text style={styles.actionText}>{t('manageProperties')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <TrendingUp size={24} color="#FFFFFF" />
              <Text style={styles.actionText}>View Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <AlertTriangle size={24} color="#FFFFFF" />
              <Text style={styles.actionText}>System Health</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {[
            { id: 1, action: 'New user registration', time: '2 minutes ago', type: 'user' },
            { id: 2, action: 'Property approved', time: '15 minutes ago', type: 'property' },
            { id: 3, action: 'Booking completed', time: '1 hour ago', type: 'booking' },
            { id: 4, action: 'Host verification', time: '2 hours ago', type: 'host' },
          ].map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.activityIcon}>
                {activity.type === 'user' && <Users size={16} color="#4CAF50" />}
                {activity.type === 'property' && <Building size={16} color="#2196F3" />}
                {activity.type === 'booking' && <Calendar size={16} color="#FF9800" />}
                {activity.type === 'host' && <TrendingUp size={16} color="#9C27B0" />}
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityAction}>{activity.action}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
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
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  alertsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  alertContent: {
    marginLeft: 12,
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  quickActions: {
    padding: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  actionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  recentActivity: {
    padding: 20,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  activityIcon: {
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#CCCCCC',
  },
});