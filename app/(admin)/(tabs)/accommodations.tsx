import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../../../contexts/LanguageContext';
import { mockAccommodations } from '../../../data/mockData';
import { MapPin, Star, MoreVertical, Eye, Edit, Trash } from 'lucide-react-native';

export default function AdminAccommodationsScreen() {
  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('accommodations')}</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.accommodationsList}>
          {mockAccommodations.map((accommodation) => (
            <View key={accommodation.id} style={styles.accommodationCard}>
              <Image source={{ uri: accommodation.image }} style={styles.accommodationImage} />
              <View style={styles.accommodationContent}>
                <View style={styles.accommodationHeader}>
                  <Text style={styles.accommodationTitle}>{accommodation.title}</Text>
                  <TouchableOpacity style={styles.menuButton}>
                    <MoreVertical size={20} color="#CCCCCC" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.locationRow}>
                  <MapPin size={14} color="#CCCCCC" />
                  <Text style={styles.locationText}>{accommodation.location}</Text>
                </View>
                
                <Text style={styles.description} numberOfLines={2}>
                  {accommodation.description}
                </Text>
                
                <View style={styles.accommodationStats}>
                  <View style={styles.statItem}>
                    <Star size={14} color="#FFD700" />
                    <Text style={styles.statText}>{accommodation.rating}</Text>
                  </View>
                  <Text style={styles.price}>${accommodation.price}/night</Text>
                </View>
                
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Eye size={16} color="#FFFFFF" />
                    <Text style={styles.actionText}>View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Edit size={16} color="#FFFFFF" />
                    <Text style={styles.actionText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
                    <Trash size={16} color="#FFFFFF" />
                    <Text style={styles.actionText}>Delete</Text>
                  </TouchableOpacity>
                </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  filterButton: {
    backgroundColor: '#333333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  accommodationsList: {
    padding: 20,
  },
  accommodationCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  accommodationImage: {
    width: '100%',
    height: 200,
  },
  accommodationContent: {
    padding: 16,
  },
  accommodationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  accommodationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  menuButton: {
    padding: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  description: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
    marginBottom: 12,
  },
  accommodationStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  actionText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});