import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../../../contexts/LanguageContext';
import { mockAccommodations } from '../../../data/mockData';
import { Search, MapPin, Star, Filter } from 'lucide-react-native';

export default function ExploreScreen() {
  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('explore')}</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#666666" />
          <TextInput
            style={styles.searchInput}
            placeholder={t('search')}
            placeholderTextColor="#666666"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.accommodationsList}>
          {mockAccommodations.map((accommodation) => (
            <TouchableOpacity key={accommodation.id} style={styles.accommodationCard}>
              <Image source={{ uri: accommodation.image }} style={styles.accommodationImage} />
              <View style={styles.accommodationContent}>
                <Text style={styles.accommodationTitle}>{accommodation.title}</Text>
                <View style={styles.locationRow}>
                  <MapPin size={14} color="#CCCCCC" />
                  <Text style={styles.locationText}>{accommodation.location}</Text>
                </View>
                <Text style={styles.description} numberOfLines={2}>
                  {accommodation.description}
                </Text>
                <View style={styles.amenities}>
                  {accommodation.amenities.slice(0, 3).map((amenity, index) => (
                    <View key={index} style={styles.amenityTag}>
                      <Text style={styles.amenityText}>{amenity}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.cardFooter}>
                  <View style={styles.rating}>
                    <Star size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{accommodation.rating}</Text>
                  </View>
                  <Text style={styles.price}>${accommodation.price}/night</Text>
                </View>
              </View>
            </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 16,
  },
  filterButton: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
  accommodationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
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
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});