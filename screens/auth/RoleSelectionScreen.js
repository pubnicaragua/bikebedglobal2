"use client"

import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import * as Haptics from "expo-haptics"

// Contexts
import { useLanguage } from "../../context/LanguageContext"
import { useAuth } from "../../context/AuthContext"

// Constants
import { COLORS, FONTS, SIZES, SHADOWS } from "../../constants/Theme"
import Images from "../../constants/Images"

const RoleSelectionScreen = ({ navigation, route }) => {
  // Get user data from route params
  const { userData } = route.params || {}

  // Context hooks
  const { t } = useLanguage()
  const { register, loading } = useAuth()

  // State
  const [selectedRole, setSelectedRole] = useState(null)

  // Animations
  const fadeAnim = React.useRef(new Animated.Value(0)).current
  const slideAnim = React.useRef(new Animated.Value(50)).current

  // Start animations when component mounts
  React.useEffect(() => {
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
  }, [])

  // Handle role selection
  const handleRoleSelect = (role) => {
    Haptics.selectionAsync()
    setSelectedRole(role)
  }

  // Handle continue
  const handleContinue = async () => {
    if (!selectedRole) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      return
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    // Register user with selected role
    const result = await register(userData.email, userData.password, {
      ...userData,
      role: selectedRole,
    })

    if (!result.success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            Haptics.selectionAsync()
            navigation.goBack()
          }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        {/* Header */}
        <Animated.View
          style={[
            styles.headerContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>{t("selectRole")}</Text>
          <Text style={styles.subtitle}>{t("selectRoleDescription")}</Text>
        </Animated.View>

        {/* Role Options */}
        <Animated.View
          style={[
            styles.rolesContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* User Role */}
          <TouchableOpacity
            style={[styles.roleCard, selectedRole === "user" && styles.selectedRoleCard]}
            onPress={() => handleRoleSelect("user")}
            activeOpacity={0.8}
          >
            <View style={styles.roleIconContainer}>
              <Image source={Images.bikeIcon} style={styles.roleIcon} />
            </View>
            <View style={styles.roleContent}>
              <Text style={styles.roleName}>{t("userRole")}</Text>
              <Text style={styles.roleDescription}>{t("userRoleDescription")}</Text>

              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                  <Text style={styles.featureText}>{t("userFeature1")}</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                  <Text style={styles.featureText}>{t("userFeature2")}</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                  <Text style={styles.featureText}>{t("userFeature3")}</Text>
                </View>
              </View>
            </View>

            {selectedRole === "user" && (
              <View style={styles.selectedIndicator}>
                <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
              </View>
            )}
          </TouchableOpacity>

          {/* Host Role */}
          <TouchableOpacity
            style={[styles.roleCard, selectedRole === "host" && styles.selectedRoleCard]}
            onPress={() => handleRoleSelect("host")}
            activeOpacity={0.8}
          >
            <View style={[styles.roleIconContainer, styles.hostIconContainer]}>
              <Image source={Images.bedIcon} style={styles.roleIcon} />
            </View>
            <View style={styles.roleContent}>
              <Text style={styles.roleName}>{t("hostRole")}</Text>
              <Text style={styles.roleDescription}>{t("hostRoleDescription")}</Text>

              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                  <Text style={styles.featureText}>{t("hostFeature1")}</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                  <Text style={styles.featureText}>{t("hostFeature2")}</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                  <Text style={styles.featureText}>{t("hostFeature3")}</Text>
                </View>
              </View>
            </View>

            {selectedRole === "host" && (
              <View style={styles.selectedIndicator}>
                <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.continueButton, !selectedRole && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!selectedRole}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.continueButtonText}>{t("continue")}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SIZES.padding,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 10,
  },
  headerContainer: {
    marginBottom: SIZES.margin,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.h1,
    color: COLORS.text,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.body3,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: SIZES.base,
  },
  rolesContainer: {
    marginBottom: SIZES.margin,
  },
  roleCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    flexDirection: "row",
    alignItems: "center",
    ...SHADOWS.medium,
  },
  selectedRoleCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  roleIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.lightGray,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SIZES.margin,
  },
  hostIconContainer: {
    backgroundColor: COLORS.lightPrimary,
  },
  roleIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  roleContent: {
    flex: 1,
  },
  roleName: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.h3,
    color: COLORS.text,
  },
  roleDescription: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.body4,
    color: COLORS.gray,
    marginTop: SIZES.base / 2,
  },
  featuresList: {
    marginTop: SIZES.base,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.base / 2,
  },
  featureText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.body4,
    color: COLORS.text,
    marginLeft: SIZES.base / 2,
  },
  selectedIndicator: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  continueButton: {
    width: "100%",
    height: 60,
    borderRadius: SIZES.radius,
    overflow: "hidden",
    marginBottom: SIZES.margin * 2,
  },
  disabledButton: {
    opacity: 0.6,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonText: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.h3,
    color: COLORS.white,
  },
})

export default RoleSelectionScreen
