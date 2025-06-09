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
import { useAuth } from "../../context/AuthContext"

// Services
import { uploadImage } from "../../services/supabase"

// Constants
import { COLORS } from "../../constants/Theme"

const EditProfileScreen = ({ navigation }) => {
  const { t } = useLanguage()
  const { user, updateUserProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState(user?.avatar_url || null)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    bio: user?.bio || "",
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
      aspect: [1, 1],
      quality: 0.8,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri)
    }
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      Alert.alert(t("error"), t("fill_required_fields"))
      return
    }

    setIsLoading(true)

    try {
      let avatarUrl = user?.avatar_url

      // Upload new profile image if changed
      if (profileImage && profileImage !== user?.avatar_url) {
        const { url, error } = await uploadImage("avatars", {
          uri: profileImage,
          type: "image/jpeg",
          name: `avatar_${user.id}_${Date.now()}.jpg`,
        })

        if (error) throw error
        avatarUrl = url
      }

      // Update user profile
      const userData = {
        ...formData,
        avatar_url: avatarUrl,
      }

      await updateUserProfile(userData)

      Alert.alert(t("success"), t("profile_updated"), [{ text: "OK", onPress: () => navigation.goBack() }])
    } catch (error) {
      console.error("Error updating profile:", error)
      Alert.alert(t("error"), t("failed_to_update_profile"))
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
        <Text style={styles.headerTitle}>{t("edit_profile")}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.profileImageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Ionicons name="person" size={50} color={COLORS.textLight} />
              </View>
            )}
            <TouchableOpacity style={styles.changeImageButton} onPress={pickImage}>
              <Ionicons name="camera" size={20} color={COLORS.background} />
            </TouchableOpacity>
          </View>

          <Input
            label={t("name")}
            placeholder={t("enter_your_name")}
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
            required
          />

          <Input
            label={t("email")}
            placeholder={t("enter_your_email")}
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
            keyboardType="email-address"
            required
            editable={false} // Email is usually not editable
          />

          <Input
            label={t("phone")}
            placeholder={t("enter_your_phone")}
            value={formData.phone}
            onChangeText={(text) => handleInputChange("phone", text)}
            keyboardType="phone-pad"
          />

          <Input
            label={t("address")}
            placeholder={t("enter_your_address")}
            value={formData.address}
            onChangeText={(text) => handleInputChange("address", text)}
          />

          <Input
            label={t("bio")}
            placeholder={t("enter_your_bio")}
            value={formData.bio}
            onChangeText={(text) => handleInputChange("bio", text)}
            multiline
            numberOfLines={4}
          />

          <Button
            title={isLoading ? t("updating") : t("update_profile")}
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
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 30,
    position: "relative",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },
  changeImageButton: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  submitButton: {
    marginTop: 30,
    marginBottom: 50,
  },
  loader: {
    marginTop: 20,
  },
})

export default EditProfileScreen
