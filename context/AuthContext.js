"use client"

import { createContext, useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { auth } from "../services/api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Verificar si hay un usuario guardado al iniciar la app
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error("Error loading user:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  // Iniciar sesión
  const signIn = async (email, password) => {
    try {
      setLoading(true)
      const { user } = await auth.signIn(email, password)

      // Guardar usuario en el estado y AsyncStorage
      setUser(user)
      await AsyncStorage.setItem("user", JSON.stringify(user))

      return { success: true, user }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Registrar usuario
  const signUp = async (email, password, userData) => {
    try {
      setLoading(true)
      const { user } = await auth.signUp(email, password, userData)

      // Iniciar sesión automáticamente después del registro
      setUser(user)
      await AsyncStorage.setItem("user", JSON.stringify(user))

      return { success: true, user }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Cerrar sesión
  const signOut = async () => {
    try {
      setLoading(true)
      await auth.signOut()

      // Limpiar estado y AsyncStorage
      setUser(null)
      await AsyncStorage.removeItem("user")

      return { success: true }
    } catch (error) {
      console.error("Logout error:", error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Recuperar contraseña
  const resetPassword = async (email) => {
    try {
      setLoading(true)
      await auth.resetPassword(email)
      return { success: true }
    } catch (error) {
      console.error("Password reset error:", error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Actualizar perfil de usuario
  const updateProfile = async (userData) => {
    try {
      setLoading(true)

      // En una implementación real, aquí llamaríamos a la API
      // Por ahora, simplemente actualizamos el estado local

      const updatedUser = {
        ...user,
        user_metadata: {
          ...user.user_metadata,
          ...userData,
        },
      }

      setUser(updatedUser)
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser))

      return { success: true, user: updatedUser }
    } catch (error) {
      console.error("Profile update error:", error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
