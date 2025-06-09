"use client"

import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Dimensions,
  ActivityIndicator,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import * as Haptics from "expo-haptics"

// Contexts
import { useAuth } from "../../context/AuthContext"
import { useLanguage } from "../../context/LanguageContext"

// Constants and assets
import Images from "../../constants/Images"
import { COLORS, FONTS, SIZES } from "../../constants/Theme"

const { width, height } = Dimensions.get("window")

const LoginScreen = ({ navigation }) => {
  // Context hooks
  const { login, loading, error } = useAuth()
  const { t, changeLanguage, locale } = useLanguage()

  // State
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [formErrors, setFormErrors] = useState({})

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

  // Validate form
  const validateForm = () => {
    const errors = {}

    if (!email) {
      errors.email = t("required")
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = t("invalidEmail")
    }

    if (!password) {
      errors.password = t("required")
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle login
  const handleLogin = async () => {
    if (!validateForm()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      return
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    const result = await login(email, password)

    if (!result.success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    }
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    Haptics.selectionAsync()
    setIsPasswordVisible(!isPasswordVisible)
  }

  // Toggle language
  const toggleLanguage = () => {
    Haptics.selectionAsync()
    changeLanguage(locale === "en" ? "es" : "en")
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoid}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Language Toggle */}
          <TouchableOpacity style={styles.languageToggle} onPress={toggleLanguage}>
            <Text style={styles.languageText}>{locale === "en" ? "ES" : "EN"}</Text>
          </TouchableOpacity>

          {/* Logo and Title */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>{t("appName")}</Text>
            <Text style={styles.subtitle}>{t("login")}</Text>
          </Animated.View>

          {/* Error Message */}
          {error && (
            <Animated.View
              style={[
                styles.errorContainer,
                {
                  opacity: fadeAnim,
                },
              ]}
            >
              <Ionicons name="alert-circle" size={20} color={COLORS.error} />
              <Text style={styles.errorMessage}>{t("loginError")}</Text>
            </Animated.View>
          )}

          {/* Form */}
          <Animated.View
            style={[
              styles.formContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>{t("email")}</Text>
              <View style={[styles.inputContainer, formErrors.email && styles.inputError]}>
                <Ionicons name="mail-outline" size={20} color={COLORS.text} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={t("email")}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor={COLORS.placeholder}
                />
              </View>
              {formErrors.email && <Text style={styles.errorText}>{formErrors.email}</Text>}
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>{t("password")}</Text>
              <View style={[styles.inputContainer, formErrors.password && styles.inputError]}>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.text} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={t("password")}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  placeholderTextColor={COLORS.placeholder}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.visibilityIcon}>
                  <Ionicons
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={COLORS.text}
                  />
                </TouchableOpacity>
              </View>
              {formErrors.password && <Text style={styles.errorText}>{formErrors.password}</Text>}
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={() => {
                Haptics.selectionAsync()
                navigation.navigate("ForgotPassword")
              }}
            >
              <Text style={styles.forgotPasswordText}>{t("forgotPassword")}</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <Text style={styles.loginButtonText}>{t("loginButton")}</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>{t("noAccount")}</Text>
              <TouchableOpacity
                onPress={() => {
                  Haptics.selectionAsync()
                  navigation.navigate("Register")
                }}
              >
                <Text style={styles.registerLink}>{t("signUp")}</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding * 2,
    paddingBottom: SIZES.padding,
  },
  languageToggle: {
    position: "absolute",
    top: SIZES.padding,
    right: SIZES.padding,
    backgroundColor: COLORS.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radius,
    zIndex: 10,
  },
  languageText: {
    ...FONTS.body3,
    color: COLORS.primary,
    fontWeight: "600",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: SIZES.height * 0.05,
    marginBottom: SIZES.padding * 2,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: SIZES.padding,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.text,
    marginBottom: SIZES.base,
  },
  subtitle: {
    ...FONTS.body2,
    color: COLORS.textLight,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.errorBg,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
  },
  errorMessage: {
    ...FONTS.body3,
    color: COLORS.error,
    marginLeft: SIZES.base,
  },
  formContainer: {
    width: "100%",
  },
  inputWrapper: {
    marginBottom: SIZES.padding,
  },
  inputLabel: {
    ...FONTS.body3,
    color: COLORS.text,
    marginBottom: SIZES.base,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    height: 56,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  inputIcon: {
    marginRight: SIZES.base,
  },
  input: {
    flex: 1,
    ...FONTS.body2,
    color: COLORS.text,
  },
  visibilityIcon: {
    padding: SIZES.base,
  },
  errorText: {
    ...FONTS.body4,
    color: COLORS.error,
    marginTop: SIZES.base / 2,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: SIZES.padding,
  },
  forgotPasswordText: {
    ...FONTS.body3,
    color: COLORS.primary,
  },
  loginButton: {
    height: 56,
    borderRadius: SIZES.radius,
    overflow: "hidden",
    marginBottom: SIZES.padding,
  },
  gradient: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SIZES.padding,
  },
  registerText: {
    ...FONTS.body3,
    color: COLORS.textLight,
    marginRight: SIZES.base / 2,
  },
  registerLink: {
    ...FONTS.body3,
    color: COLORS.primary,
    fontWeight: "600",
  },
})

export default LoginScreen
