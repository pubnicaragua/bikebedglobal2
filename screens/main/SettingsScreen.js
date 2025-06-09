"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useLanguage } from "../../context/LanguageContext"
import { useTheme } from "../../context/ThemeContext"
import { useAuth } from "../../context/AuthContext"
import { COLORS } from "../../constants/Theme"

const SettingsScreen = ({ navigation }) => {
  const { t, language, setLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { signOut } = useAuth()

  const [notifications, setNotifications] = useState(true)
  const [locationServices, setLocationServices] = useState(true)
  const [biometricLogin, setBiometricLogin] = useState(false)

  const handleLanguageChange = () => {
    // Toggle between English and Spanish
    setLanguage(language === "en" ? "es" : "en")
  }

  const handleLogout = async () => {
    try {
      await signOut()
      // Navigation will be handled by the auth state change in App.js
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("settings")}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("account")}</Text>

          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate("EditProfile")}>
            <View style={styles.settingInfo}>
              <Ionicons name="person-outline" size={22} color={COLORS.text} />
              <Text style={styles.settingText}>{t("editProfile")}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="card-outline" size={22} color={COLORS.text} />
              <Text style={styles.settingText}>{t("paymentMethods")}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="shield-checkmark-outline" size={22} color={COLORS.text} />
              <Text style={styles.settingText}>{t("privacySecurity")}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("preferences")}</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications-outline" size={22} color={COLORS.text} />
              <Text style={styles.settingText}>{t("notifications")}</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="location-outline" size={22} color={COLORS.text} />
              <Text style={styles.settingText}>{t("locationServices")}</Text>
            </View>
            <Switch
              value={locationServices}
              onValueChange={setLocationServices}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="finger-print-outline" size={22} color={COLORS.text} />
              <Text style={styles.settingText}>{t("biometricLogin")}</Text>
            </View>
            <Switch
              value={biometricLogin}
              onValueChange={setBiometricLogin}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>

          <TouchableOpacity style={styles.settingItem} onPress={handleLanguageChange}>
            <View style={styles.settingInfo}>
              <Ionicons name="language-outline" size={22} color={COLORS.text} />
              <Text style={styles.settingText}>{t("language")}</Text>
            </View>
            <View style={styles.languageValue}>
              <Text style={styles.languageText}>{language === "en" ? "English" : "Español"}</Text>
              <Ionicons name="chevron-forward" size={22} color={COLORS.textLight} />
            </View>
          </TouchableOpacity>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name={theme === "light" ? "sunny-outline" : "moon-outline"} size={22} color={COLORS.text} />
              <Text style={styles.settingText}>{t("darkMode")}</Text>
            </View>
            <Switch
              value={theme === "dark"}
              onValueChange={toggleTheme}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("support")}</Text>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="help-circle-outline" size={22} color={COLORS.text} />
              <Text style={styles.settingText}>{t("helpCenter")}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="chatbubble-ellipses-outline" size={22} color={COLORS.text} />
              <Text style={styles.settingText}>{t("contactUs")}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="document-text-outline" size={22} color={COLORS.text} />
              <Text style={styles.settingText}>{t("termsOfService")}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="lock-closed-outline" size={22} color={COLORS.text} />
              <Text style={styles.settingText}>{t("privacyPolicy")}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>{t("logout")}</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Bike & Bed Global v1.0.0</Text>
        </View>
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
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 15,
  },
  languageValue: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.textLight,
    marginRight: 5,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginVertical: 30,
    backgroundColor: COLORS.error,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: COLORS.white,
  },
  versionContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  versionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: COLORS.textLight,
  },
})

export default SettingsScreen
