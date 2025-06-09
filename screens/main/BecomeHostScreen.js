"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Switch, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useLanguage } from "../../context/LanguageContext"
import { useAuth } from "../../context/AuthContext"
import { COLORS } from "../../constants/Theme"

const BecomeHostScreen = ({ navigation }) => {
  const { t } = useLanguage()
  const { user, updateUserRole } = useAuth()

  const [loading, setLoading] = useState(false)
  const [hostData, setHostData] = useState({
    propertyType: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    hasBikeStorage: true,
    bikeRepairTools: false,
    bikeWashingArea: false,
    acceptTerms: false,
  })

  const handleInputChange = (field, value) => {
    setHostData({
      ...hostData,
      [field]: value,
    })
  }

  const handleSubmit = async () => {
    // Validate form
    if (!hostData.propertyType || !hostData.address || !hostData.city || !hostData.country) {
      Alert.alert(t("error"), t("pleaseCompleteForm"))
      return
    }
    Alert.alert(t("error"), t("pleaseCompleteForm"))
    return

    if (!hostData.acceptTerms) {
      Alert.alert(t("error"), t("pleaseAcceptTerms"))
      return
    }

    setLoading(true)
    try {
      // In a real app, update user role to host in API
      // await updateUserRole('host');

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      Alert.alert(t("congratulations"), t("hostAccountCreated"), [
        { text: "OK", onPress: () => navigation.navigate("Auth") },
      ])
    } catch (error) {
      Alert.alert(t("error"), t("hostAccountCreationFailed"))
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
        <Text style={styles.headerTitle}>{t("becomeHost")}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.introContainer}>
          <Text style={styles.introTitle}>{t("hostWithUs")}</Text>
          <Text style={styles.introText}>{t("hostIntroText")}</Text>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>{t("propertyDetails")}</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("propertyType")}</Text>
            <TextInput
              style={styles.input}
              value={hostData.propertyType}
              onChangeText={(text) => handleInputChange("propertyType", text)}
              placeholder={t("enterPropertyType")}
              placeholderTextColor={COLORS.textLight}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("address")}</Text>
            <TextInput
              style={styles.input}
              value={hostData.address}
              onChangeText={(text) => handleInputChange("address", text)}
              placeholder={t("enterAddress")}
              placeholderTextColor={COLORS.textLight}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("city")}</Text>
            <TextInput
              style={styles.input}
              value={hostData.city}
              onChangeText={(text) => handleInputChange("city", text)}
              placeholder={t("enterCity")}
              placeholderTextColor={COLORS.textLight}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("country")}</Text>
            <TextInput
              style={styles.input}
              value={hostData.country}
              onChangeText={(text) => handleInputChange("country", text)}
              placeholder={t("enterCountry")}
              placeholderTextColor={COLORS.textLight}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("postalCode")}</Text>
            <TextInput
              style={styles.input}
              value={hostData.postalCode}
              onChangeText={(text) => handleInputChange("postalCode", text)}
              placeholder={t("enterPostalCode")}
              placeholderTextColor={COLORS.textLight}
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>{t("cyclistAmenities")}</Text>

          <View style={styles.switchItem}>
            <View style={styles.switchLabel}>
              <Ionicons name="bicycle" size={20} color={COLORS.text} />
              <Text style={styles.switchText}>{t("bikeStorage")}</Text>
            </View>
            <Switch
              value={hostData.hasBikeStorage}
              onValueChange={(value) => handleInputChange("hasBikeStorage", value)}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>

          <View style={styles.switchItem}>
            <View style={styles.switchLabel}>
              <Ionicons name="construct" size={20} color={COLORS.text} />
              <Text style={styles.switchText}>{t("bikeRepairTools")}</Text>
            </View>
            <Switch
              value={hostData.bikeRepairTools}
              onValueChange={(value) => handleInputChange("bikeRepairTools", value)}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>

          <View style={styles.switchItem}>
            <View style={styles.switchLabel}>
              <Ionicons name="water" size={20} color={COLORS.text} />
              <Text style={styles.switchText}>{t("bikeWashingArea")}</Text>
            </View>
            <Switch
              value={hostData.bikeWashingArea}
              onValueChange={(value) => handleInputChange("bikeWashingArea", value)}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>

        <View style={styles.termsContainer}>
          <View style={styles.termsCheckbox}>
            <Switch
              value={hostData.acceptTerms}
              onValueChange={(value) => handleInputChange("acceptTerms", value)}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
            <Text style={styles.termsText}>{t("acceptHostTerms")}</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.termsLink}>{t("readTerms")}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>{loading ? t("processing") : t("becomeHostNow")}</Text>
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
    marginLeft: 15,
  },
  content: {
    flex: 1,
  },
  introContainer: {
    padding: 20,
  },
  introTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: COLORS.text,
    marginBottom: 10,
  },
  introText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: COLORS.textLight,
    lineHeight: 24,
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
  switchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  switchLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 10,
  },
  termsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  termsCheckbox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  termsText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 10,
    flex: 1,
  },
  termsLink: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: COLORS.primary,
    textDecorationLine: "underline",
  },
  submitButton: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: COLORS.white,
  },
})

export default BecomeHostScreen
