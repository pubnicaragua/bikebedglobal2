"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../context/ThemeContext"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import Card from "../../components/ui/Card"

const PaymentScreen = ({ navigation, route }) => {
  const { theme } = useTheme()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})

  // En una aplicación real, obtendríamos los datos del item desde route.params
  // const { type, item, amount } = route.params;

  // Datos de ejemplo para mostrar
  const paymentDetails = {
    type: "accommodation", // o "bikeRental"
    item: {
      name: "Casa Rural El Ciclista",
      location: "Sierra de Gredos, Ávila",
      checkIn: "15/06/2023",
      checkOut: "18/06/2023",
      nights: 3,
      pricePerNight: 85,
    },
    amount: 255, // precio total
  }

  const validate = () => {
    const newErrors = {}
    if (!cardNumber) newErrors.cardNumber = "El número de tarjeta es obligatorio"
    if (!cardName) newErrors.cardName = "El nombre del titular es obligatorio"
    if (!expiryDate) newErrors.expiryDate = "La fecha de caducidad es obligatoria"
    if (!cvv) newErrors.cvv = "El código de seguridad es obligatorio"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = () => {
    if (validate()) {
      setIsProcessing(true)

      // Simulamos el procesamiento del pago
      setTimeout(() => {
        setIsProcessing(false)
        navigation.navigate("Main", {
          screen: "Reservas",
          params: { paymentSuccess: true },
        })
      }, 2000)
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.colors.text }]}>Pago</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.summarySection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Resumen del Pedido</Text>
          <Card style={styles.summaryCard}>
            {paymentDetails.type === "accommodation" ? (
              <View>
                <Text style={[styles.itemName, { color: theme.colors.text }]}>{paymentDetails.item.name}</Text>
                <Text style={[styles.itemLocation, { color: theme.colors.textLight }]}>
                  {paymentDetails.item.location}
                </Text>
                <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: theme.colors.textLight }]}>Check-in:</Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>{paymentDetails.item.checkIn}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: theme.colors.textLight }]}>Check-out:</Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>{paymentDetails.item.checkOut}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: theme.colors.textLight }]}>
                    {paymentDetails.item.nights} noches x €{paymentDetails.item.pricePerNight}:
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                    €{paymentDetails.item.nights * paymentDetails.item.pricePerNight}
                  </Text>
                </View>
              </View>
            ) : (
              <View>
                <Text style={[styles.itemName, { color: theme.colors.text }]}>{paymentDetails.item.name}</Text>
                <Text style={[styles.itemLocation, { color: theme.colors.textLight }]}>Alquiler de bicicleta</Text>
                <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: theme.colors.textLight }]}>Precio por día:</Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                    €{paymentDetails.item.pricePerDay}
                  </Text>
                </View>
              </View>
            )}
            <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: theme.colors.text }]}>Total:</Text>
              <Text style={[styles.totalValue, { color: theme.colors.primary }]}>€{paymentDetails.amount}</Text>
            </View>
          </Card>
        </View>

        <View style={styles.paymentMethodSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Método de Pago</Text>
          <View style={styles.paymentOptions}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === "card" && { borderColor: theme.colors.primary },
                { borderColor: theme.colors.border },
              ]}
              onPress={() => setPaymentMethod("card")}
            >
              <Ionicons
                name="card-outline"
                size={24}
                color={paymentMethod === "card" ? theme.colors.primary : theme.colors.textLight}
              />
              <Text
                style={[
                  styles.paymentOptionText,
                  { color: paymentMethod === "card" ? theme.colors.primary : theme.colors.text },
                ]}
              >
                Tarjeta
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === "paypal" && { borderColor: theme.colors.primary },
                { borderColor: theme.colors.border },
              ]}
              onPress={() => setPaymentMethod("paypal")}
            >
              <Ionicons
                name="logo-paypal"
                size={24}
                color={paymentMethod === "paypal" ? theme.colors.primary : theme.colors.textLight}
              />
              <Text
                style={[
                  styles.paymentOptionText,
                  { color: paymentMethod === "paypal" ? theme.colors.primary : theme.colors.text },
                ]}
              >
                PayPal
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {paymentMethod === "card" && (
          <View style={styles.cardDetailsSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Detalles de la Tarjeta</Text>
            <Input
              label="Número de Tarjeta"
              value={cardNumber}
              onChangeText={setCardNumber}
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              error={errors.cardNumber}
            />
            <Input
              label="Nombre del Titular"
              value={cardName}
              onChangeText={setCardName}
              placeholder="NOMBRE APELLIDOS"
              autoCapitalize="characters"
              error={errors.cardName}
            />
            <View style={styles.cardRow}>
              <View style={styles.expiryDateContainer}>
                <Input
                  label="Fecha de Caducidad"
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                  placeholder="MM/AA"
                  keyboardType="numeric"
                  error={errors.expiryDate}
                />
              </View>
              <View style={styles.cvvContainer}>
                <Input
                  label="CVV"
                  value={cvv}
                  onChangeText={setCvv}
                  placeholder="123"
                  keyboardType="numeric"
                  maxLength={3}
                  error={errors.cvv}
                />
              </View>
            </View>
          </View>
        )}

        <View style={styles.securePaymentSection}>
          <View style={styles.securePaymentHeader}>
            <Ionicons name="lock-closed" size={16} color={theme.colors.success} />
            <Text style={[styles.securePaymentText, { color: theme.colors.success }]}>Pago Seguro</Text>
          </View>
          <Text style={[styles.securePaymentDescription, { color: theme.colors.textLight }]}>
            Tus datos de pago están protegidos con encriptación SSL de 256 bits.
          </Text>
        </View>

        <Button
          title={isProcessing ? "Procesando..." : "Pagar €" + paymentDetails.amount}
          onPress={handlePayment}
          loading={isProcessing}
          style={styles.payButton}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  summarySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  summaryCard: {
    padding: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  itemLocation: {
    fontSize: 14,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  paymentMethodSection: {
    marginBottom: 24,
  },
  paymentOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderWidth: 2,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  paymentOptionText: {
    marginLeft: 8,
    fontWeight: "500",
  },
  cardDetailsSection: {
    marginBottom: 24,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expiryDateContainer: {
    flex: 1,
    marginRight: 8,
  },
  cvvContainer: {
    flex: 1,
    marginLeft: 8,
  },
  securePaymentSection: {
    marginBottom: 24,
  },
  securePaymentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  securePaymentText: {
    marginLeft: 4,
    fontWeight: "500",
  },
  securePaymentDescription: {
    fontSize: 12,
  },
  payButton: {
    marginBottom: 24,
  },
})

export default PaymentScreen
