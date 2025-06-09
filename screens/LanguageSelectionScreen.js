"use client"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useLanguage } from "../context/LanguageContext"
import { COLORS } from "../constants/Theme"

const LanguageSelectionScreen = ({ onComplete }) => {
  const { changeLanguage } = useLanguage()

  const handleLanguageSelect = async (language) => {
    await changeLanguage(language)
    await AsyncStorage.setItem("hasSelectedLanguage", "true")
    onComplete()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />

        <Text style={styles.title}>Welcome to Bike & Bed Global</Text>
        <Text style={styles.subtitle}>Please select your preferred language</Text>

        <View style={styles.languageOptions}>
          <TouchableOpacity style={styles.languageButton} onPress={() => handleLanguageSelect("en")}>
            <Text style={styles.languageText}>English</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.languageButton} onPress={() => handleLanguageSelect("es")}>
            <Text style={styles.languageText}>Español</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 40,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: "center",
    marginBottom: 40,
  },
  languageOptions: {
    width: "100%",
    maxWidth: 300,
  },
  languageButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  languageText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: COLORS.white,
  },
})

export default LanguageSelectionScreen
