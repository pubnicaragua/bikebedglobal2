"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"

// Components
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"

// Context
import { useLanguage } from "../../context/LanguageContext"

// Services
import { createAccommodation, uploadImage } from "../../services/supabase"

// Constants
import { COLORS } from "../../constants/Theme"

const AddAccommodationScreen = ({ navigation }) => {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    price_per_night: "",
    has_bike_storage: true,
    amenities: "",
    max_guests: "",
    bedrooms: "",
    bathrooms: "",
  })

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== "granted") {
      Alert.alert(t("permission_denied"), t("camera_roll_permission"))
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImages([...images, result.assets[0].uri])
    }
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.description || !formData.location || !formData.price_per_night) {
      Alert.alert(t("error"), t("fill_required_fields"))
      return
    }

    if (images.length === 0) {
      Alert.alert(t("error"), t("add_at_least_one_image"))
      return
    }

    setIsLoading(true)

    try {
      // Upload images first
      const imageUrls = []
      for (const image of images) {
        const { url, error } = await uploadImage("accommodations", {
          uri: image,
          type: "image/jpeg",
          name: `accommodation_${Date.now()}.jpg`,
        })

        if (error) throw error
        imageUrls.push(url)
      }

      // Create accommodation with image URLs
      const accommodationData = {
        ...formData,
        price_per_night: Number.parseFloat(formData.price_per_night),
        max_guests: Number.parseInt(formData.max_guests),
        bedrooms: Number.parseInt(formData.bedrooms),
        bathrooms: Number.parseInt(formData.bathrooms),
        images: imageUrls,
        host_id: "current-user-id", // This should be the actual user ID
        created_at: new Date().toISOString(),
      }

      const { data, error } = await createAccommodation(accommodationData)

      if (error) throw error

      Alert.alert(t("success"), t("accommodation_created"), [{ text: "OK", onPress: () => navigation.goBack() }])
    } catch (error) {
      console.error("Error creating accommodation:", error)
      Alert.alert(t("error"), t("failed_to_create_accommodation"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("add_accommodation")}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>{t("basic_info")}</Text>

          <Input
            label={t("name")}
            placeholder={t("enter_accommodation_name")}
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
            required
          />

          <Input
            label={t("description")}
            placeholder={t("enter_description")}
            value={formData.description}
            onChangeText={(text) => handleInputChange("description", text)}
            multiline
            numberOfLines={4}
            required
          />

          <Input
            label={t("location")}
            placeholder={t("enter_location")}
            value={formData.location}
            onChangeText={(text) => handleInputChange("location", text)}
            required
          />

          <Input
            label={t("price_per_night")}
            placeholder="0.00"
            value={formData.price_per_night}
            onChangeText={(text) => handleInputChange("price_per_night", text)}
            keyboardType="numeric"
            required
          />

          <Text style={styles.sectionTitle}>{t("details")}</Text>

          <Input
            label={t("max_guests")}
            placeholder="1"
            value={formData.max_guests}
            onChangeText={(text) => handleInputChange("max_guests", text)}
            keyboardType="numeric"
          />

          <Input
            label={t("bedrooms")}
            placeholder="1"
            value={formData.bedrooms}
            onChangeText={(text) => handleInputChange("bedrooms", text)}
            keyboardType="numeric"
          />

          <Input
            label={t("bathrooms")}
            placeholder="1"
            value={formData.bathrooms}
            onChangeText={(text) => handleInputChange("bathrooms", text)}
            keyboardType="numeric"
          />

          <Input
            label={t("amenities")}
            placeholder={t("enter_amenities")}
            value={formData.amenities}
            onChangeText={(text) => handleInputChange("amenities", text)}
            multiline
            numberOfLines={3}
          />

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>{t("has_bike_storage")}</Text>
            <TouchableOpacity
              style={[styles.toggleButton, formData.has_bike_storage ? styles.toggleActive : styles.toggleInactive]}
              onPress={() => handleInputChange("has_bike_storage", !formData.has_bike_storage)}
            >
              <View
                style={[
                  styles.toggleCircle,
                  formData.has_bike_storage ? styles.toggleCircleRight : styles.toggleCircleLeft,
                ]}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>{t("images")}</Text>

          <View style={styles.imagesContainer}>
            {images.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => {
                    const newImages = [...images]
                    newImages.splice(index, 1)
                    setImages(newImages)
                  }}
                >
                  <Ionicons name="close-circle" size={24} color={COLORS.error} />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
              <Ionicons name="add" size={40} color={COLORS.primary} />
              <Text style={styles.addImageText}>{t("add_image")}</Text>
            </TouchableOpacity>
          </View>

          <Button
            title={isLoading ? t("creating") : t("create_accommodation")}
            onPress={handleSubmit}
            disabled={isLoading}
            style={styles.submitButton}
          />
          {isLoading && <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />}
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
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: COLORS.text,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
  toggleButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 5,
  },
  toggleActive: {
    backgroundColor: COLORS.primary,
  },
  toggleInactive: {
    backgroundColor: COLORS.textLight,
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.background,
  },
  toggleCircleLeft: {
    alignSelf: "flex-start",
  },
  toggleCircleRight: {
    alignSelf: "flex-end",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  imageContainer: {
    width: "48%",
    aspectRatio: 16 / 9,
    margin: "1%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  removeImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
  addImageButton: {
    width: "48%",
    aspectRatio: 16 / 9,
    margin: "1%",
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addImageText: {
    color: COLORS.primary,
    marginTop: 5,
  },
  submitButton: {
    marginTop: 30,
    marginBottom: 50,
  },
  loader: {
    marginTop: 20,
  },
})

export default AddAccommodationScreen
