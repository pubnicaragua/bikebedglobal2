import { Dimensions } from "react-native"
const { width, height } = Dimensions.get("window")

export const COLORS = {
  // Base colors
  primary: "#000000", // Black
  secondary: "#333333", // Dark gray

  // Background colors
  background: "#FFFFFF", // White
  card: "#F8F8F8", // Light gray

  // Text colors
  text: "#000000", // Black
  textLight: "#666666", // Medium gray
  placeholder: "#999999", // Light gray

  // Status colors
  success: "#4CAF50", // Green
  error: "#FF3B30", // Red
  warning: "#FF9500", // Orange
  info: "#007AFF", // Blue

  // Additional colors
  border: "#E0E0E0", // Light gray
  shadow: "rgba(0, 0, 0, 0.1)", // Shadow
  overlay: "rgba(0, 0, 0, 0.5)", // Overlay

  // Utility colors
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",

  // Status background colors (lighter versions)
  successBg: "rgba(76, 175, 80, 0.1)",
  errorBg: "rgba(255, 59, 48, 0.1)",
  warningBg: "rgba(255, 149, 0, 0.1)",
  infoBg: "rgba(0, 122, 255, 0.1)",
}

export const SIZES = {
  // Global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // Font sizes
  h1: 30,
  h2: 24,
  h3: 18,
  h4: 16,
  body1: 16,
  body2: 14,
  body3: 12,
  body4: 10,

  // App dimensions
  width,
  height,
}

export const FONTS = {
  h1: {
    fontFamily: "Poppins-Bold",
    fontSize: SIZES.h1,
    lineHeight: 36,
  },
  h2: {
    fontFamily: "Poppins-Bold",
    fontSize: SIZES.h2,
    lineHeight: 30,
  },
  h3: {
    fontFamily: "Poppins-SemiBold",
    fontSize: SIZES.h3,
    lineHeight: 22,
  },
  h4: {
    fontFamily: "Poppins-SemiBold",
    fontSize: SIZES.h4,
    lineHeight: 20,
  },
  body1: {
    fontFamily: "Poppins-Regular",
    fontSize: SIZES.body1,
    lineHeight: 22,
  },
  body2: {
    fontFamily: "Poppins-Regular",
    fontSize: SIZES.body2,
    lineHeight: 20,
  },
  body3: {
    fontFamily: "Poppins-Regular",
    fontSize: SIZES.body3,
    lineHeight: 18,
  },
  body4: {
    fontFamily: "Poppins-Regular",
    fontSize: SIZES.body4,
    lineHeight: 14,
  },
}

export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
}

export default { COLORS, SIZES, FONTS, SHADOWS }
