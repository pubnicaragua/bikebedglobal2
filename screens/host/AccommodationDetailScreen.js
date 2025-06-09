"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

// Context
import { useLanguage } from "../../context/LanguageContext"

// Constants
import { COLORS } from "../../constants/Theme"

const AccommodationDetailScreen = ({ route }) => {
  const { accommodation } = route.params
  const { t } = useLanguage()
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleEdit = () => {
    navigation.navigate("EditAccommodation", { accommodation })
  }

  const handleDelete = () => {
    Alert.alert(
      t("confirm_delete"),
      t("delete_accommodation_confirmation"),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("delete"),
          style: "destructive",
          onPress: () => {
            // Implement delete functionality
            Alert.alert(t("success"), t("accommodation_deleted"), [{ text: "OK", onPress: () => navigation.goBack() }])
          },
        },
      ],
      { cancelable: true },
    )
  }

  const nextImage = () => {
    if (accommodation.images && accommodation.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % accommodation.images.length)
    }
  }

  const prevImage = () => {
    if (accommodation.images && accommodation.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + accommodation.images.length) % accommodation.images.length)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("accommodation_details")}</Text>
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Image Carousel */}
        <View style={styles.imageCarousel}>
          {accommodation.images && accommodation.images.length > 0 ? (
            <>
              <Image
                source={{ uri: accommodation.images[currentImageIndex] }}
                style={styles.image}
                resizeMode="cover"
              />
              {accommodation.images.length > 1 && (
                <>
                  <TouchableOpacity style={styles.prevButton} onPress={prevImage}>
                    <Ionicons name="chevron-back" size={30} color={COLORS.background} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.nextButton} onPress={nextImage}>
                    <Ionicons name="chevron-forward" size={30} color={COLORS.background} />
                  </TouchableOpacity>
                  <View style={styles.pagination}>
                    {accommodation.images.map((_, index) => (
                      <View
                        key={index}
                        style={[styles.paginationDot, index === currentImageIndex && styles.paginationDotActive]}
                      />
                    ))}
                  </View>
                </>
              )}
            </>
          ) : (
            <View style={styles.noImageContainer}>
              <Ionicons name="image-outline" size={50} color={COLORS.textLight} />
              <Text style={styles.noImageText}>{t("no_images")}</Text>
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{accommodation.name}</Text>
          <Text style={styles.location}>
            <Ionicons name="location-outline" size={16} color={COLORS.textLight} /> {accommodation.location}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              €{accommodation.price_per_night} <Text style={styles.priceUnit}>/ {t("night")}</Text>
            </Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons name="people-outline" size={20} color={COLORS.text} />
              <Text style={styles.detailText}>
                {accommodation.max_guests} {t("guests")}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="bed-outline" size={20} color={COLORS.text} />
              <Text style={styles.detailText}>
                {accommodation.bedrooms} {t("bedrooms")}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="water-outline" size={20} color={COLORS.text} />
              <Text style={styles.detailText}>
                {accommodation.bathrooms} {t("bathrooms")}
              </Text>
            </View>
            {accommodation.has_bike_storage && (
              <View style={styles.detailItem}>
                <Ionicons name="bicycle-outline" size={20} color={COLORS.text} />
                <Text style={styles.detailText}>{t("bike_storage")}</Text>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("description")}</Text>
            <Text style={styles.description}>{accommodation.description}</Text>
          </View>

          {accommodation.amenities && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t("amenities")}</Text>
              <Text style={styles.description}>{accommodation.amenities}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("availability")}</Text>
            <Text style={styles.description}>{t("availability_description")}</Text>
          </View>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={20} color={COLORS.error} />
            <Text style={styles.deleteButtonText}>{t("delete_accommodation")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  editButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  imageCarousel: {
    width: "100%",
    height: 250,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  prevButton: {
    position: "absolute",
    left: 10,
    top: "50%",
    transform: [{ translateY: -15 }],
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 5,
  },
  nextButton: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -15 }],
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 5,
  },
  pagination: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: COLORS.background,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  noImageContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.border,
  },
  noImageText: {
    color: COLORS.textLight,
    marginTop: 10,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 15,
  },
  priceContainer: {
    marginBottom: 20,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  priceUnit: {
    fontSize: 16,
    fontWeight: "normal",
    color: COLORS.textLight,
  },
  detailsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    marginVertical: 5,
  },
  detailText: {
    marginLeft: 8,
    color: COLORS.text,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.error,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 30,
  },
  deleteButtonText: {
    color: COLORS.error,
    marginLeft: 8,
    fontWeight: "500",
  },
})

export default AccommodationDetailScreen
