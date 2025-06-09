"use client"

import { createContext, useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Localization from "expo-localization"

// Definir traducciones directamente
const translations = {
  en: {
    // Navegación
    home: "Home",
    explore: "Explore",
    routes: "Routes",
    bookings: "Bookings",
    profile: "Profile",

    // Auth
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot Password?",
    noAccount: "Don't have an account?",
    signUp: "Sign Up",

    // Configuración
    settings: "Settings",
    account: "Account",
    preferences: "Preferences",
    support: "Support",
    editProfile: "Edit Profile",
    paymentMethods: "Payment Methods",
    privacySecurity: "Privacy & Security",
    notifications: "Notifications",
    locationServices: "Location Services",
    biometricLogin: "Biometric Login",
    language: "Language",
    darkMode: "Dark Mode",
    helpCenter: "Help Center",
    contactUs: "Contact Us",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    logout: "Logout",

    // Alojamientos
    accommodations: "Accommodations",
    featured: "Featured",
    popular: "Popular",
    nearby: "Nearby",
    viewAll: "View All",

    // Detalles
    amenities: "Amenities",
    reviews: "Reviews",
    location: "Location",
    book: "Book Now",
    perNight: "per night",

    // Rutas
    difficulty: "Difficulty",
    distance: "Distance",
    duration: "Duration",
    elevation: "Elevation",

    // Errores
    required: "Required",
    invalidEmail: "Invalid email address",
    loginError: "Invalid email or password",
  },
  es: {
    // Navegación
    home: "Inicio",
    explore: "Explorar",
    routes: "Rutas",
    bookings: "Reservas",
    profile: "Perfil",

    // Auth
    login: "Iniciar Sesión",
    register: "Registrarse",
    email: "Correo Electrónico",
    password: "Contraseña",
    forgotPassword: "¿Olvidaste tu contraseña?",
    noAccount: "¿No tienes una cuenta?",
    signUp: "Regístrate",

    // Configuración
    settings: "Configuración",
    account: "Cuenta",
    preferences: "Preferencias",
    support: "Soporte",
    editProfile: "Editar Perfil",
    paymentMethods: "Métodos de Pago",
    privacySecurity: "Privacidad y Seguridad",
    notifications: "Notificaciones",
    locationServices: "Servicios de Ubicación",
    biometricLogin: "Inicio de Sesión Biométrico",
    language: "Idioma",
    darkMode: "Modo Oscuro",
    helpCenter: "Centro de Ayuda",
    contactUs: "Contáctanos",
    termsOfService: "Términos de Servicio",
    privacyPolicy: "Política de Privacidad",
    logout: "Cerrar Sesión",

    // Alojamientos
    accommodations: "Alojamientos",
    featured: "Destacados",
    popular: "Populares",
    nearby: "Cercanos",
    viewAll: "Ver Todos",

    // Detalles
    amenities: "Comodidades",
    reviews: "Reseñas",
    location: "Ubicación",
    book: "Reservar Ahora",
    perNight: "por noche",

    // Rutas
    difficulty: "Dificultad",
    distance: "Distancia",
    duration: "Duración",
    elevation: "Elevación",

    // Errores
    required: "Obligatorio",
    invalidEmail: "Correo electrónico inválido",
    loginError: "Correo o contraseña inválidos",
  },
}

const LanguageContext = createContext()

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState("en")
  const [loading, setLoading] = useState(true)

  // Initialize language from storage or device settings
  useEffect(() => {
    const initLanguage = async () => {
      try {
        // Try to get saved language preference
        const savedLocale = await AsyncStorage.getItem("userLanguage")

        if (savedLocale) {
          setLocale(savedLocale)
        } else {
          // Use device locale as default, or fallback to English
          const deviceLocale = Localization.locale.split("-")[0]
          const supportedLocale = ["en", "es"].includes(deviceLocale) ? deviceLocale : "en"

          setLocale(supportedLocale)
          await AsyncStorage.setItem("userLanguage", supportedLocale)
        }
      } catch (error) {
        console.error("Error initializing language:", error)
        // Fallback to English
        setLocale("en")
      } finally {
        setLoading(false)
      }
    }

    initLanguage()
  }, [])

  // Change language function
  const changeLanguage = async (newLocale) => {
    try {
      setLocale(newLocale)
      await AsyncStorage.setItem("userLanguage", newLocale)
      return true
    } catch (error) {
      console.error("Error changing language:", error)
      return false
    }
  }

  // Translate function
  const t = (key) => {
    if (translations[locale] && translations[locale][key]) {
      return translations[locale][key]
    }
    // Fallback a inglés si no se encuentra la traducción
    if (translations.en && translations.en[key]) {
      return translations.en[key]
    }
    return key // Devolver la clave si no hay traducción
  }

  const value = {
    locale,
    loading,
    changeLanguage,
    t,
    isEnglish: locale === "en",
    isSpanish: locale === "es",
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
