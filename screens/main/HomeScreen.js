"use client"

import { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  Dimensions,
  StatusBar,
  RefreshControl,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import * as Haptics from "expo-haptics"

// Contexts
import { useLanguage } from "../../context/LanguageContext"
import { useAuth } from "../../context/AuthContext"

// Constants and components
import { COLORS, SHADOWS } from "../../constants/Theme"
import mockAPI from "../../services/mockData"

// Get screen dimensions
const { width, height } = Dimensions.get("window")

const HomeScreen = ({ navigation }) => {
  // Context hooks
  const { t } = useLanguage()
  const { user } = useAuth()

  // State
  const [featuredAccommodations, setFeaturedAccommodations] = useState([])
  const [popularRoutes, setPopularRoutes] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)

  // Animation values
  const scrollY = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current

  // Banner images for the carousel
  const bannerImages = [
    "https://picsum.photos/id/17/800/600",
    "https://picsum.photos/id/29/800/600",
    "https://picsum.photos/id/26/800/600",
  ]

  // Header animation values
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [height * 0.45, height * 0.15],
    extrapolate: "clamp",
  })

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [1, 0.3, 0],
    extrapolate: "clamp",
  })

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [0, 0.5, 1],
    extrapolate: "clamp",
  })

  // Load data
  useEffect(() => {
    loadData()

    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()

    // Auto-scroll banner
    const bannerInterval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % bannerImages.length)
    }, 5000)

    return () => clearInterval(bannerInterval)
  }, [])

  // Load data function
  const loadData = async () => {
    setLoading(true)
    try {
      // In a real app, these would be API calls to Supabase
      const accommodationsResponse = await mockAPI.getAccommodations()
      const routesResponse = await mockAPI.getRoutes()

      if (accommodationsResponse.success) {
        setFeaturedAccommodations(accommodationsResponse.data.filter((acc) => acc.featured))
      }

      if (routesResponse.success) {
        setPopularRoutes(routesResponse.data.filter((route) => route.featured))
      }
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true)
    loadData()
  }

  // Render accommodation item
  const renderAccommodationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.accommodationCard}
      onPress={() => {
        Haptics.selectionAsync()
        navigation.navigate("AccommodationDetail", { id: item.id })
      }}
      activeOpacity={0.9}
    >
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: item.images[0] }} style={styles.accommodationImage} />
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.7)"]} style={styles.imageGradient} />
        <View style={styles.cardBadge}>
          <Ionicons name="star" size={12} color="#FFF" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.accommodationContent}>
        <Text style={styles.accommodationName} numberOfLines={1}>
          {item.name}
        </Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color={COLORS.textLight} />
          <Text style={styles.locationText} numberOfLines={1}>
            {item.location}
          </Text>
        </View>

        <View style={styles.accommodationFooter}>
          <Text style={styles.priceText}>
            <Text style={styles.priceValue}>€{item.pricePerNight}</Text> {t("night")}
          </Text>

          <View style={styles.amenitiesRow}>
            {item.amenities.slice(0, 2).map((amenity, index) => (
              <View key={index} style={styles.amenityIcon}>
                <Ionicons name={amenity.icon} size={14} color={COLORS.primary} />
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  // Render route item
  const renderRouteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.routeCard}
      onPress={() => {
        Haptics.selectionAsync()
        navigation.navigate("RouteDetail", { id: item.id })
      }}
      activeOpacity={0.9}
    >
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: item.images[0] }} style={styles.routeImage} />
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.7)"]} style={styles.imageGradient} />
        <View
          style={[
            styles.difficultyBadge,
            {
              backgroundColor:
                item.difficulty === "Fácil"
                  ? COLORS.success
                  : item.difficulty === "Medio"
                    ? COLORS.warning
                    : COLORS.error,
            },
          ]}
        >
          <Text style={styles.difficultyText}>{item.difficulty}</Text>
        </View>
      </View>

      <View style={styles.routeContent}>
        <Text style={styles.routeName} numberOfLines={1}>
          {item.name}
        </Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color={COLORS.textLight} />
          <Text style={styles.locationText} numberOfLines={1}>
            {item.location}
          </Text>
        </View>

        <View style={styles.routeStats}>
          <View style={styles.routeStat}>
            <Ionicons name="trending-up" size={14} color={COLORS.primary} />
            <Text style={styles.routeStatText}>{item.elevation}m</Text>
          </View>
          <View style={styles.routeStat}>
            <Ionicons name="resize" size={14} color={COLORS.primary} />
            <Text style={styles.routeStatText}>{item.distance}km</Text>
          </View>
          <View style={styles.routeStat}>
            <Ionicons name="time-outline" size={14} color={COLORS.primary} />
            <Text style={styles.routeStatText}>{item.duration}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Animated Header */}
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
          },
        ]}
      >
        <Animated.View style={[styles.headerBackground, { opacity: headerOpacity }]}>
          <Image source={{ uri: bannerImages[activeSlide] }} style={styles.headerImage} />
          <LinearGradient colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]} style={styles.headerGradient}>
            <View style={styles.headerContent}>
              <Text style={styles.greeting}>
                {t("hello")}, {user?.name?.split(" ")[0] || t("cyclist")}
              </Text>
              <Text style={styles.welcomeText}>{t("whereToday")}</Text>

              <View style={styles.indicatorContainer}>
                {bannerImages.map((_, index) => (
                  <View key={index} style={[styles.indicator, activeSlide === index && styles.activeIndicator]} />
                ))}
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.compactHeader, { opacity: headerTitleOpacity }]}>
          <Text style={styles.compactHeaderTitle}>{t("appName")}</Text>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => {
              Haptics.selectionAsync()
              navigation.navigate("Profile")
            }}
          >
            <Image source={{ uri: user?.image || "https://picsum.photos/id/1/200/200" }} style={styles.profileImage} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => {
            Haptics.selectionAsync()
            navigation.navigate("Explore")
          }}
          activeOpacity={0.9}
        >
          <Ionicons name="search" size={20} color={COLORS.primary} />
          <Text style={styles.searchPlaceholder}>{t("searchPlaceholder")}</Text>
          <View style={styles.searchIconContainer}>
            <Ionicons name="options-outline" size={20} color={COLORS.primary} />
          </View>
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        {/* Categories */}
        <Animated.View
          style={[
            styles.categoriesContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => {
              Haptics.selectionAsync()
              navigation.navigate("Explore")
            }}
          >
            <View style={[styles.categoryIcon, { backgroundColor: `#FF5A5F15` }]}>
              <Ionicons name="home-outline" size={24} color="#FF5A5F" />
            </View>
            <Text style={styles.categoryText}>{t("accommodations")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => {
              Haptics.selectionAsync()
              navigation.navigate("Routes")
            }}
          >
            <View style={[styles.categoryIcon, { backgroundColor: `#00A69915` }]}>
              <Ionicons name="map-outline" size={24} color="#00A699" />
            </View>
            <Text style={styles.categoryText}>{t("routes")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => {
              Haptics.selectionAsync()
              navigation.navigate("BikeRental")
            }}
          >
            <View style={[styles.categoryIcon, { backgroundColor: `#FC642D15` }]}>
              <Ionicons name="bicycle-outline" size={24} color="#FC642D" />
            </View>
            <Text style={styles.categoryText}>{t("rental")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => {
              Haptics.selectionAsync()
              navigation.navigate("Explore", { filter: "workshop" })
            }}
          >
            <View style={[styles.categoryIcon, { backgroundColor: `#76767615` }]}>
              <Ionicons name="construct-outline" size={24} color="#767676" />
            </View>
            <Text style={styles.categoryText}>{t("workshops")}</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Featured Accommodations */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t("featuredAccommodations")}</Text>
            <TouchableOpacity
              style={styles.seeAllButton}
              onPress={() => {
                Haptics.selectionAsync()
                navigation.navigate("Explore")
              }}
            >
              <Text style={styles.seeAllText}>{t("seeAll")}</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            data={featuredAccommodations}
            keyExtractor={(item) => item.id}
            renderItem={renderAccommodationItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
          />
        </View>

        {/* Popular Routes */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t("popularRoutes")}</Text>
            <TouchableOpacity
              style={styles.seeAllButton}
              onPress={() => {
                Haptics.selectionAsync()
                navigation.navigate("Routes")
              }}
            >
              <Text style={styles.seeAllText}>{t("seeAll")}</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            data={popularRoutes}
            keyExtractor={(item) => item.id}
            renderItem={renderRouteItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
          />
        </View>

        {/* Featured Experience */}
        <View style={styles.experienceContainer}>
          <Image source={{ uri: "https://picsum.photos/id/30/500/300" }} style={styles.experienceImage} />
          <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.experienceGradient}>
            <View style={styles.experienceContent}>
              <Text style={styles.experienceTitle}>{t("discoverLocalRoutes")}</Text>
              <TouchableOpacity
                style={styles.experienceButton}
                onPress={() => {
                  Haptics.selectionAsync()
                  navigation.navigate("Experiences")
                }}
              >
                <Text style={styles.experienceButtonText}>{t("explore")}</Text>
                <Ionicons name="arrow-forward" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: "hidden",
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  headerGradient: {
    flex: 1,
    justifyContent: "flex-end",
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  greeting: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginRight: 8,
  },
  activeIndicator: {
    width: 24,
    backgroundColor: "white",
  },
  compactHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  compactHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "white",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  searchBarContainer: {
    position: "absolute",
    top: height * 0.4,
    left: 24,
    right: 24,
    zIndex: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 30,
    backgroundColor: "white",
    ...SHADOWS.medium,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.textLight,
  },
  searchIconContainer: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
  },
  scrollContent: {
    paddingTop: height * 0.5,
    paddingBottom: 30,
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  categoryItem: {
    alignItems: "center",
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    ...SHADOWS.small,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.text,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.primary,
    marginRight: 4,
  },
  horizontalListContent: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  accommodationCard: {
    width: width * 0.7,
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: "white",
    ...SHADOWS.medium,
    overflow: "hidden",
  },
  cardImageContainer: {
    position: "relative",
    height: 180,
  },
  accommodationImage: {
    width: "100%",
    height: "100%",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  cardBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 4,
  },
  accommodationContent: {
    padding: 16,
  },
  accommodationName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  locationText: {
    fontSize: 13,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  accommodationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    fontSize: 14,
    color: COLORS.text,
  },
  priceValue: {
    fontWeight: "bold",
  },
  amenitiesRow: {
    flexDirection: "row",
  },
  amenityIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  routeCard: {
    width: width * 0.7,
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: "white",
    ...SHADOWS.medium,
    overflow: "hidden",
  },
  routeImage: {
    width: "100%",
    height: "100%",
  },
  difficultyBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  routeContent: {
    padding: 16,
  },
  routeName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  routeStats: {
    flexDirection: "row",
    marginTop: 12,
  },
  routeStat: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  routeStatText: {
    fontSize: 13,
    color: COLORS.text,
    marginLeft: 4,
  },
  experienceContainer: {
    marginHorizontal: 24,
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
    ...SHADOWS.medium,
  },
  experienceImage: {
    height: 180,
    width: "100%",
  },
  experienceGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
  },
  experienceContent: {
    padding: 20,
  },
  experienceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  experienceButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  experienceButtonText: {
    color: "white",
    fontWeight: "600",
    marginRight: 8,
  },
})

export default HomeScreen
