import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../../../contexts/LanguageContext';
import { mockRoutes } from '../../../data/mockData';
import { MapPin, Clock, Mountain } from 'lucide-react-native';

export default function RoutesScreen() {
  const { t } = useLanguage();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      default: return '#CCCCCC';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('routes')}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.routesList}>
          {mockRoutes.map((route) => (
            <TouchableOpacity key={route.id} style={styles.routeCard}>
              <Image source={{ uri: route.image }} style={styles.routeImage} />
              <View style={styles.routeContent}>
                <Text style={styles.routeTitle}>{route.name}</Text>
                <View style={styles.locationRow}>
                  <MapPin size={14} color="#CCCCCC" />
                  <Text style={styles.locationText}>{route.location}</Text>
                </View>
                
                <View style={styles.routeStats}>
                  <View style={styles.statItem}>
                    <Mountain size={16} color="#FFFFFF" />
                    <Text style={styles.statText}>{route.distance}km</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Clock size={16} color="#FFFFFF" />
                    <Text style={styles.statText}>{route.duration}</Text>
                  </View>
                  <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(route.difficulty) }]}>
                    <Text style={styles.difficultyText}>{route.difficulty}</Text>
                  </View>
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
  content: {
    flex: 1,
  },
  routesList: {
    padding: 20,
  },
  routeCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  routeImage: {
    width: '100%',
    height: 200,
  },
  routeContent: {
    padding: 16,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  routeStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 'auto',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});