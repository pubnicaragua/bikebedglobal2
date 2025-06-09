"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"

const ForgotPasswordScreen = ({ navigation }) => {
  const { theme } = useTheme()
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleResetPassword = () => {
    if (!email) {
      setError("Por favor, introduce tu correo electrónico")
      return
    }

    // Aquí iría la lógica para enviar el correo de restablecimiento
    setIsSubmitted(true)
    setError("")
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Recuperar Contraseña</Text>

          {!isSubmitted ? (
            <>
              <Text style={[styles.description, { color: theme.colors.textLight }]}>
                Introduce tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
              </Text>

              <Input
                label="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                placeholder="tu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                error={error}
              />

              <Button title="Enviar Enlace" onPress={handleResetPassword} style={styles.submitButton} />
            </>
          ) : (
            <View style={styles.successContainer}>
              <Ionicons name="mail-outline" size={60} color={theme.colors.primary} style={styles.successIcon} />
              <Text style={[styles.successTitle, { color: theme.colors.text }]}>¡Correo Enviado!</Text>
              <Text style={[styles.successDescription, { color: theme.colors.textLight }]}>
                Hemos enviado un enlace de recuperación a {email}. Por favor, revisa tu bandeja de entrada.
              </Text>
              <Button
                title="Volver al Inicio de Sesión"
                onPress={() => navigation.navigate("Login")}
                style={styles.backToLoginButton}
              />
            </View>
          )}

          <TouchableOpacity style={styles.loginLinkContainer} onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.loginLinkText, { color: theme.colors.primary }]}>Volver al inicio de sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    marginBottom: 24,
    lineHeight: 22,
  },
  submitButton: {
    marginTop: 10,
  },
  loginLinkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loginLinkText: {
    fontWeight: "500",
  },
  successContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  successIcon: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  successDescription: {
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  backToLoginButton: {
    marginTop: 10,
  },
})

export default ForgotPasswordScreen
