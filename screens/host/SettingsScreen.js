"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

// Context
import { useLanguage } from "../../context/LanguageContext"
import { useAuth } from "../../context/AuthContext"

// Constants
import { COLORS } from "../../constants/Theme"

const SettingsScreen = ({ navigation }) => {
  const { t, changeLanguage, currentLanguage } = useLanguage()
  const { signOut } = useAuth()

  const [notifications, setNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const handleSignOut = async () => {
    Alert.alert(
      t("confirm_sign_out"),
      t("sign_out_confirmation"),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("sign_out"),
          onPress: async () => {
            try {
              await signOut()
              // Navigation will be handled by the AuthContext
            } catch (error) {
              Alert.alert(t("error"), t("sign_out_failed"))
            }
          },
        },
      ],
      { cancelable: true },
    )
  }

  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === "en" ? "es" : "en"
    changeLanguage(newLanguage)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("settings")}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("account")}</Text>

            <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate("EditProfile")}>
              <View style={styles.settingLeft}>
                <Ionicons name="person-outline" size={22} color={COLORS.primary} style={styles.settingIcon} />
                <Text style={styles.settingText}>{t("edit_profile")}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="lock-closed-outline" size={22} color={COLORS.primary} style={styles.settingIcon} />
                <Text style={styles.settingText}>{t("change_password")}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="card-outline" size={22} color={COLORS.primary} style={styles.settingIcon} />
                <Text style={styles.settingText}>{t("payment_methods")}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("preferences")}</Text>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="notifications-outline" size={22} color={COLORS.primary} style={styles.settingIcon} />
                <Text style={styles.settingText}>{t("push_notifications")}</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
                thumbColor={notifications ? COLORS.primary : COLORS.textLight}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="mail-outline" size={22} color={COLORS.primary} style={styles.settingIcon} />
                <Text style={styles.settingText}>{t("email_notifications")}</Text>
              </View>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
                thumbColor={emailNotifications ? COLORS.primary : COLORS.textLight}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="moon-outline" size={22} color={COLORS.primary} style={styles.settingIcon} />
                <Text style={styles.settingText}>{t("dark_mode")}</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
                thumbColor={darkMode ? COLORS.primary : COLORS.textLight}
              />
            </View>

            <TouchableOpacity style={styles.settingItem} onPress={handleLanguageChange}>
              <View style={styles.settingLeft}>
                <Ionicons name="language-outline" size={22} color={COLORS.primary} style={styles.settingIcon} />
                <Text style={styles.settingText}>{t("language")}</Text>
              </View>
              <Text style={styles.languageText}>{currentLanguage === "en" ? "English" : "Español"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("support")}</Text>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="help-circle-outline" size={22} color={COLORS.primary} style={styles.settingIcon} />
                <Text style={styles.settingText}>{t("help_center")}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="document-text-outline" size={22} color={COLORS.primary} style={styles.settingIcon} />
                <Text style={styles.settingText}>{t("terms_of_service")}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="shield-checkmark-outline" size={22} color={COLORS.primary} style={styles.settingIcon} />
                <Text style={styles.settingText}>{t("privacy_policy")}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
            <Text style={styles.signOutText}>{t("sign_out")}</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>Version 1.0.0</Text>
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
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 25,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 15,
  },
  settingText: {
    fontSize: 16,
    color: COLORS.text,
  },
  languageText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "500",
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.error,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  signOutText: {
    color: COLORS.error,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  versionText: {
    textAlign: "center",
    color: COLORS.textLight,
    marginBottom: 30,
  },
})

export default SettingsScreen
