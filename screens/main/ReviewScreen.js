"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"

const ReviewScreen = ({ navigation, route }) => {
  const { theme } = useTheme()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // En una aplicación real, obtendríamos los datos del alojamiento desde route.params
  // const { accommodationId } = route.params;

  // Datos de ejemplo
  const accommodation = {
    id: "1",
    name: "Casa Rural El Ciclista",
    location: "Sierra de Gredos, Ávila",
    image: "https://picsum.photos/id/10/500/300",
  }

  const handleSubmitReview = () => {
    if (rating === 0) {
      setError("Por favor, selecciona una calificación")
      return
    }

    if (!comment.trim()) {
      setError("Por favor, escribe un comentario")
      return
    }

    setIsSubmitting(true)

    // Simulamos el envío de la reseña
    setTimeout(() => {
      setIsSubmitting(false)
      navigation.navigate("AccommodationDetail", {
        accommodationId: accommodation.id,
        reviewSubmitted: true,
      })
    }, 1500)
  }

  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={36}
            color={i <= rating ? theme.colors.warning : theme.colors.textLight}
            style={styles.star}
          />
        </TouchableOpacity>,
      )
    }
    return stars
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.colors.text }]}>Escribir Reseña</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.accommodationInfo}>
          <Text style={[styles.accommodationName, { color: theme.colors.text }]}>{accommodation.name}</Text>
          <Text style={[styles.accommodationLocation, { color: theme.colors.textLight }]}>
            {accommodation.location}
          </Text>
        </View>

        <View style={styles.ratingSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>¿Cómo calificarías tu experiencia?</Text>
          <View style={styles.starsContainer}>{renderStars()}</View>
          {rating > 0 && (
            <Text style={[styles.ratingText, { color: theme.colors.text }]}>
              {rating === 1
                ? "Malo"
                : rating === 2
                  ? "Regular"
                  : rating === 3
                    ? "Bueno"
                    : rating === 4
                      ? "Muy bueno"
                      : "Excelente"}
            </Text>
          )}
        </View>

        <View style={styles.commentSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Comparte tu experiencia</Text>
          <Input
            placeholder="Escribe tu opinión sobre el alojamiento..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={5}
            style={styles.commentInput}
          />
          {error ? <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text> : null}
        </View>

        <View style={styles.tipsSection}>
          <Text style={[styles.tipsTitle, { color: theme.colors.text }]}>Consejos para una buena reseña:</Text>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color={theme.colors.primary} />
            <Text style={[styles.tipText, { color: theme.colors.textLight }]}>
              Sé específico y detallado sobre tu experiencia
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color={theme.colors.primary} />
            <Text style={[styles.tipText, { color: theme.colors.textLight }]}>
              Menciona aspectos positivos y áreas de mejora
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color={theme.colors.primary} />
            <Text style={[styles.tipText, { color: theme.colors.textLight }]}>
              Comparte información útil para otros ciclistas
            </Text>
          </View>
        </View>

        <Button
          title={isSubmitting ? "Enviando..." : "Enviar Reseña"}
          onPress={handleSubmitReview}
          loading={isSubmitting}
          style={styles.submitButton}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  placeholder: {
    width: 24,
  },
  accommodationInfo: {
    marginBottom: 24,
  },
  accommodationName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  accommodationLocation: {
    fontSize: 14,
  },
  ratingSection: {
    marginBottom: 24,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  star: {
    marginHorizontal: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 8,
  },
  commentSection: {
    marginBottom: 24,
  },
  commentInput: {
    height: 120,
  },
  errorText: {
    marginTop: 8,
    fontSize: 14,
  },
  tipsSection: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "rgba(164, 212, 62, 0.1)",
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  tipText: {
    fontSize: 12,
    marginLeft: 8,
  },
  submitButton: {
    marginBottom: 24,
  },
})

export default ReviewScreen
