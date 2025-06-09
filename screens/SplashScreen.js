"use client"

import React, { useEffect } from "react"
import { View, Text, StyleSheet, Image, Animated } from "react-native"
import { COLORS, FONTS } from "../constants/Theme"
import Images from "../constants/Images"

const SplashScreen = () => {
  // Animaciones
  const fadeAnim = React.useRef(new Animated.Value(0)).current
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current

  useEffect(() => {
    // Iniciar animaciones cuando el componente se monta
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Bike & Bed Global</Text>
        <Text style={styles.subtitle}>Alojamiento para ciclistas</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.primary,
    marginBottom: 10,
  },
  subtitle: {
    ...FONTS.body2,
    color: COLORS.textLight,
  },
})

export default SplashScreen
