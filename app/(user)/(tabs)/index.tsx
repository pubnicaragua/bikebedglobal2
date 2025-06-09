import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';
import { mockAccommodations, mockRoutes } from '../../../data/mockData';
import { Search, MapPin, Star } from 'lucide-react-native';

export default function UserHomeScreen() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{t('welcome')}, {user?.name}!</Text>
            <Text style={styles.subtitle}>Find your next cycling adventure</Text>
          </View>
          <Image source={{ uri: user?.avatar }} style={styles.avatar} />
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard}>
            <Search size={24} color="#FFFFFF" />
            <Text style={styles.actionText}>{t('findAccommodations')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <MapPin size={24} color="#FFFFFF" />
            <Text style={styles.actionText}>{t('discoverRoutes')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Accommodations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mockAccommodations.map((accommodation) => (
              <View key={accommodation.id} style={styles.card}>
                <Image source={{ uri: accommodation.image }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{accommodation.title}</Text>
                  <View style={styles.cardLocation}>
                    <MapPin size={12} color="#CCCCCC" />
                    <Text style={styles.cardLocationText}>{accommodation.location}</Text>
                  </View>
                  <View style={styles.cardFooter}>
                    <View style={styles.rating}>
                      <Star size={12} color="#FFD700" />
                      <Text style={styles.ratingText}>{accommodation.rating}</Text>
                    </View>
                    <Text style={styles.price}>${accommodation.price}/night</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Routes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mockRoutes.map((route) => (
              <View key={route.id} style={styles.card}>
                <Image source={{ uri: route.image }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{route.name}</Text>
                  <View style={styles.cardLocation}>
                    <MapPin size={12} color="#CCCCCC" />
                    <Text style={styles.cardLocationText}>{route.location}</Text>
                  </View>
                  <View style={styles.routeStats}>
                    <Text style={styles.statText}>{route.distance}km</Text>
                    <Text style={styles.statText}>{route.difficulty}</Text>
                    <Text style={styles.statText}>{route.duration}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
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
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 20,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  card: {
    width: 280,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginLeft: 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 4,
  },
  cardLocationText: {
    fontSize: 12,
    color: '#CCCCCC',
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
    fontSize: 12,
    color: '#CCCCCC',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  routeStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statText: {
    fontSize: 12,
    color: '#CCCCCC',
  },
});