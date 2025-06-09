"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Platform, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { useLanguage } from "../../context/LanguageContext"
import { useAuth } from "../../context/AuthContext"
import { COLORS } from "../../constants/Theme"

// Mock user data
const mockUser = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 8901",
  bio: "Passionate cyclist and traveler. Love exploring new routes and meeting fellow cyclists.",
  profileImage: null,
  address: "123 Main St, New York, NY",
  emergencyContact: "Jane Doe, +1 234 567 8902",
}

const EditProfileScreen = ({ navigation }) => {
  const { t } = useLanguage()
  const { user, updateUserProfile } = useAuth()

  const [userData, setUserData] = useState(mockUser)
  const [loading, setLoading] = useState(false)
  const [profileImage, setProfileImage] = useState(null)

  useEffect(() => {
    // Request permission for image library
    ;(async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          Alert.alert(t("permissionDenied"), t("cameraRollPermission"))
        }
      }
    })()

    // In a real app, fetch user data from API
    // setUserData(user);
  }, [])

  const handleInputChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    })
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // In a real app, update user profile in API
      // await updateUserProfile(userData, profileImage);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      Alert.alert(t("profileUpdated"), t("profileUpdatedSuccess"), [{ text: "OK", onPress: () => navigation.goBack() }])
    } catch (error) {
      Alert.alert(t("error"), t("profileUpdateFailed"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("editProfile")}</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
          <Text style={styles.saveButtonText}>{loading ? t("saving") : t("save")}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileImageContainer}>
          {profileImage || userData.profileImage ? (
            <Image source={{ uri: profileImage || userData.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileInitial}>{userData.firstName ? userData.firstName.charAt(0) : "U"}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.changePhotoButton} onPress={pickImage}>
            <Ionicons name="camera" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>{t("personalInfo")}</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("firstName")}</Text>
            <TextInput
              style={styles.input}
              value={userData.firstName}
              onChangeText={(text) => handleInputChange("firstName", text)}
              placeholder={t("enterFirstName")}
              placeholderTextColor={COLORS.textLight}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("lastName")}</Text>
            <TextInput
              style={styles.input}
              value={userData.lastName}
              onChangeText={(text) => handleInputChange("lastName", text)}
              placeholder={t("enterLastName")}
              placeholderTextColor={COLORS.textLight}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("email")}</Text>
            <TextInput
              style={styles.input}
              value={userData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              placeholder={t("enterEmail")}
              placeholderTextColor={COLORS.textLight}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("phone")}</Text>
            <TextInput
              style={styles.input}
              value={userData.phone}
              onChangeText={(text) => handleInputChange("phone", text)}
              placeholder={t("enterPhone")}
              placeholderTextColor={COLORS.textLight}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>{t("additionalInfo")}</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("address")}</Text>
            <TextInput
              style={styles.input}
              value={userData.address}
              onChangeText={(text) => handleInputChange("address", text)}
              placeholder={t("enterAddress")}
              placeholderTextColor={COLORS.textLight}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("emergencyContact")}</Text>
            <TextInput
              style={styles.input}
              value={userData.emergencyContact}
              onChangeText={(text) => handleInputChange("emergencyContact", text)}
              placeholder={t("enterEmergencyContact")}
              placeholderTextColor={COLORS.textLight}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("bio")}</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={userData.bio}
              onChangeText={(text) => handleInputChange("bio", text)}
              placeholder={t("enterBio")}
              placeholderTextColor={COLORS.textLight}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.changePasswordButton} onPress={() => navigation.navigate("ChangePassword")}>
          <Text style={styles.changePasswordText}>{t("changePassword")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: COLORS.text,
  },
  saveButton: {
    padding: 5,
  },
  saveButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: COLORS.primary,
  },
  content: {
    flex: 1,
  },
  profileImageContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
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
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    fontFamily: "Poppins-Bold",
    fontSize: 48,
    color: COLORS.white,
  },
  changePhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: COLORS.background,
  },
  formSection: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 5,
  },
  input: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.card,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  changePasswordButton: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: COLORS.card,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  changePasswordText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: COLORS.primary,
  },
})

export default EditProfileScreen
