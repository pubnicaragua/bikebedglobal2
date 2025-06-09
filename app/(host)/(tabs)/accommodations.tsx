import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../../../contexts/LanguageContext';
import { mockAccommodations } from '../../../data/mockData';
import { Plus, MapPin, Star, Edit } from 'lucide-react-native';

export default function HostAccommodationsScreen() {
  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('accommodations')}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#FFFFFF" />
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
                  <TouchableOpacity style={styles.editButton}>
                    <Edit size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.locationRow}>
                  <MapPin size={14} color="#CCCCCC" />
                  <Text style={styles.locationText}>{accommodation.location}</Text>
                </View>
                
                <View style={styles.accommodationStats}>
                  <View style={styles.statItem}>
                    <Star size={14} color="#FFD700" />
                    <Text style={styles.statText}>{accommodation.rating}</Text>
                  </View>
                  <Text style={styles.price}>${accommodation.price}/night</Text>
                </View>
                
                <View style={styles.amenities}>
                  {accommodation.amenities.slice(0, 3).map((amenity, index) => (
                    <View key={index} style={styles.amenityTag}>
                      <Text style={styles.amenityText}>{amenity}</Text>
                    </View>
                  ))}
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
  addButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
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
  editButton: {
    backgroundColor: '#333333',
    padding: 8,
    borderRadius: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  accommodationStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityTag: {
    backgroundColor: '#333333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  amenityText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
});