import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../../../contexts/LanguageContext';
import { mockBookings, mockAccommodations } from '../../../data/mockData';
import { Calendar, MapPin, User } from 'lucide-react-native';

export default function HostBookingsScreen() {
  const { t } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#4CAF50';
      case 'pending': return '#FF9800';
      case 'cancelled': return '#F44336';
      default: return '#CCCCCC';
    }
  };

  const getAccommodationById = (id: string) => {
    return mockAccommodations.find(acc => acc.id === id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('bookings')}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.bookingsList}>
          {mockBookings.map((booking) => {
            const accommodation = getAccommodationById(booking.accommodationId);
            return (
              <TouchableOpacity key={booking.id} style={styles.bookingCard}>
                <View style={styles.bookingHeader}>
                  <Text style={styles.bookingId}>Booking #{booking.id}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
                    <Text style={styles.statusText}>{booking.status}</Text>
                  </View>
                </View>
                
                <View style={styles.bookingDetails}>
                  <View style={styles.detailRow}>
                    <MapPin size={16} color="#CCCCCC" />
                    <Text style={styles.detailText}>
                      {accommodation?.title || 'Unknown Property'}
                    </Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Calendar size={16} color="#CCCCCC" />
                    <Text style={styles.detailText}>
                      {booking.checkIn} - {booking.checkOut}
                    </Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <User size={16} color="#CCCCCC" />
                    <Text style={styles.detailText}>Guest #{booking.userId}</Text>
                  </View>
                </View>
                
                <View style={styles.bookingFooter}>
                  <Text style={styles.totalPrice}>${booking.totalPrice}</Text>
                  <View style={styles.actionButtons}>
                    {booking.status === 'pending' && (
                      <>
                        <TouchableOpacity style={styles.acceptButton}>
                          <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.declineButton}>
                          <Text style={styles.buttonText}>Decline</Text>
                        </TouchableOpacity>
                      </>
                    )}
                    <TouchableOpacity style={styles.viewButton}>
                      <Text style={styles.buttonText}>View</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
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
  bookingsList: {
    padding: 20,
  },
  bookingCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookingId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  bookingDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  declineButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewButton: {
    backgroundColor: '#333333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});