"use client"
import { useState, useRef, useEffect } from "react"
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Animated,
  Dimensions,
  ImageBackground,
  StatusBar
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"

const { width, height } = Dimensions.get("window")

// Datos de ejemplo
const user = {
  name: "Carlos Rodríguez",
  email: "carlos@example.com",
  image: "https://picsum.photos/id/1/200/200",
  joinDate: "Junio 2022",
  completedRoutes: 24,
  totalReservations: 8,
  level: "Ciclista Avanzado",
  totalDistance: 1248,
  achievements: [
    { id: "1", name: "Montañero", icon: "trending-up", color: "#4CAF50", description: "Completó 5 rutas de montaña" },
    { id: "2", name: "Madrugador", icon: "sunny", color: "#FF9800", description: "Realizó 10 rutas al amanecer" },
    { id: "3", name: "Explorador", icon: "compass", color: "#2196F3", description: "Visitó 8 regiones diferentes" },
  ],
  nextAchievements: [
    { id: "4", name: "Maratonista", icon: "trophy", color: "#9C27B0", description: "Completa una ruta de más de 100km", progress: 75 },
    { id: "5", name: "Social", icon: "people", color: "#FF5722", description: "Participa en 5 eventos grupales", progress: 40 },
  ]
}

const menuItems = [
  {
    icon: "person-outline",
    title: "Información Personal",
    screen: "PersonalInfo",
    color: "#FF5A5F",
  },
  {
    icon: "calendar-outline",
    title: "Mis Reservas",
    screen: "Reservas",
    color: "#00A699",
  },
  {
    icon: "bicycle-outline",
    title: "Mis Rutas",
    screen: "Rutas",
    color: "#FC642D",
  },
  {
    icon: "heart-outline",
    title: "Favoritos",
    screen: "Favorites",
    color: "#FF385C",
  },
  {
    icon: "card-outline",
    title: "Métodos de Pago",
    screen: "PaymentMethods",
    color: "#00BCD4",
  },
  {
    icon: "settings-outline",
    title: "Configuración",
    screen: "Settings",
    color: "#607D8B",
  },
  {
    icon: "help-circle-outline",
    title: "Ayuda y Soporte",
    screen: "Support",
    color: "#8BC34A",
  },
]

const ProfileScreen = ({ navigation }) => {
  const { theme } = useTheme()
  const scrollY = useRef(new Animated.Value(0)).current
  const [activeTab, setActiveTab] = useState("Logros")
  
  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  
  // Iniciar animaciones al montar el componente
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start()
  }, [])

  // Animación para el header
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [height * 0.4, height * 0.15],
    extrapolate: 'clamp'
  })

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100, 150],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp'
  })

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, 100, 150],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp'
  })

  const imageScale = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.6],
    extrapolate: 'clamp'
  })

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -30],
    extrapolate: 'clamp'
  })

  const handleLogout = () => {
    // Lógica para cerrar sesión
    navigation.navigate("Login")
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Animado */}
      <Animated.View 
        style={[
          styles.header, 
          { 
            height: headerHeight,
          }
        ]}
      >
        <Animated.View style={[styles.headerBackground, { opacity: headerOpacity }]}>
          <ImageBackground 
            source={{ uri: "https://picsum.photos/id/29/800/600" }} 
            style={styles.headerImage}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
              style={styles.headerGradient}
            >
              <SafeAreaView style={styles.headerContainer}>
                <View style={styles.headerTop}>
                  <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => navigation.goBack()}
                  >
                    <Ionicons name="chevron-back" size={24} color="white" />
                  </TouchableOpacity>
                  <Text style={styles.headerTitle}>Mi Perfil</Text>
                  <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() => navigation.navigate("Settings")}
                  >
                    <Ionicons name="settings-outline" size={24} color="white" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.profileHeaderContent}>
                  <Animated.View 
                    style={[
                      styles.profileImageContainer,
                      {
                        transform: [
                          { scale: imageScale },
                          { translateY: imageTranslateY }
                        ]
                      }
                    ]}
                  >
                    <Image source={{ uri: user.image }} style={styles.profileImage} />
                    <View style={styles.levelBadge}>
                      <Text style={styles.levelText}>{user.level}</Text>
                    </View>
                  </Animated.View>
                  
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                  
                  <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>{user.completedRoutes}</Text>
                      <Text style={styles.statLabel}>Rutas</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>{user.totalReservations}</Text>
                      <Text style={styles.statLabel}>Reservas</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>{user.totalDistance} km</Text>
                      <Text style={styles.statLabel}>Recorridos</Text>
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </LinearGradient>
          </ImageBackground>
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.compactHeader, 
            { opacity: headerTitleOpacity }
          ]}
        >
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.compactHeaderTitle}>{user.name}</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate("Settings")}
          >
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
      
      {/* Contenido principal */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === "Logros" && styles.activeTab]}
            onPress={() => setActiveTab("Logros")}
          >
            <Text style={[styles.tabText, activeTab === "Logros" && styles.activeTabText]}>
              Logros
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === "Menú" && styles.activeTab]}
            onPress={() => setActiveTab("Menú")}
          >
            <Text style={[styles.tabText, activeTab === "Menú" && styles.activeTabText]}>
              Menú
            </Text>
          </TouchableOpacity>
        </View>
        
        {activeTab === "Logros" ? (
          <Animated.View 
            style={[
              styles.achievementsContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.sectionTitle}>Logros Desbloqueados</Text>
            
            {user.achievements.map((achievement, index) => (
              <View 
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  { animationDelay: index * 100 }
                ]}
              >
                <View style={[styles.achievementIconContainer, { backgroundColor: achievement.color + '20' }]}>
                  <Ionicons name={achievement.icon} size={24} color={achievement.color} />
                </View>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementName}>{achievement.name}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                </View>
                <View style={[styles.achievementBadge, { backgroundColor: achievement.color }]}>
                  <Ionicons name="checkmark" size={16} color="white" />
                </View>
              </View>
            ))}
            
            <Text style={styles.sectionTitle}>Próximos Logros</Text>
            
            {user.nextAchievements.map((achievement, index) => (
              <View 
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  { animationDelay: (user.achievements.length + index) * 100 }
                ]}
              >
                <View style={[styles.achievementIconContainer, { backgroundColor: achievement.color + '20' }]}>
                  <Ionicons name={achievement.icon} size={24} color={achievement.color} />
                </View>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementName}>{achievement.name}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { width: `${achievement.progress}%`, backgroundColor: achievement.color }]} />
                  </View>
                  <Text style={styles.progressText}>{achievement.progress}% completado</Text>
                </View>
              </View>
            ))}
          </Animated.View>
        ) : (
          <Animated.View 
            style={[
              styles.menuContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  { animationDelay: index * 100 }
                ]}
                onPress={() => navigation.navigate(item.screen)}
              >
                <View style={[styles.menuIconContainer, { backgroundColor: item.color + '15' }]}>
                  <Ionicons name={item.icon} size={24} color={item.color} />
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              style={styles.logoutButton} 
              onPress={handleLogout}
            >
              <LinearGradient
                colors={['#FF5A5F', '#FF7E5F']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.logoutGradient}
              >
                <Ionicons name="log-out-outline" size={20} color="white" />
                <Text style={styles.logoutText}>Cerrar Sesión</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <View style={styles.versionContainer}>
              <Text style={styles.versionText}>Versión 1.0.0</Text>
            </View>
          </Animated.View>
        )}
      </Animated.ScrollView>
      
      {/* Botón flotante de editar perfil */}
      <TouchableOpacity 
        style={styles.editProfileButton}
        onPress={() => navigation.navigate("PersonalInfo")}
      >
        <LinearGradient
          colors={['#FF5A5F', '#FF7E5F']}
          style={styles.editButtonGradient}
        >
          <Ionicons name="pencil" size={20} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: 'hidden',
    backgroundColor: '#FF5A5F',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerGradient: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeaderContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 30,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'white',
  },
  levelBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF5A5F',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
  },
  levelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  compactHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  compactHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContent: {
    paddingTop: height * 0.4,
    paddingBottom: 30,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#FF5A5F15',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#FF5A5F',
    fontWeight: '600',
  },
  achievementsContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    marginTop: 8,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  achievementBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#999',
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  logoutButton: {
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    marginTop: 16,
    marginBottom: 24,
  },
  logoutGradient: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  },
  editProfileButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  editButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ProfileScreen
