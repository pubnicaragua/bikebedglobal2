"use client"
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native"
import { useTheme } from "../../context/ThemeContext"

const Button = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
  textStyle,
  ...props
}) => {
  const { theme } = useTheme()

  const getVariantStyle = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        }
      case "secondary":
        return {
          backgroundColor: "transparent",
          borderColor: theme.colors.primary,
        }
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: theme.colors.primary,
        }
      case "text":
        return {
          backgroundColor: "transparent",
          borderColor: "transparent",
        }
      default:
        return {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        }
    }
  }

  const getTextStyle = () => {
    switch (variant) {
      case "primary":
        return { color: "#FFFFFF" }
      case "secondary":
      case "outline":
      case "text":
        return { color: theme.colors.primary }
      default:
        return { color: "#FFFFFF" }
    }
  }

  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return {
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.md,
          borderRadius: theme.borderRadius.sm,
        }
      case "medium":
        return {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.lg,
          borderRadius: theme.borderRadius.md,
        }
      case "large":
        return {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.xl,
          borderRadius: theme.borderRadius.lg,
        }
      default:
        return {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.lg,
          borderRadius: theme.borderRadius.md,
        }
    }
  }

  const buttonStyles = [styles.button, getVariantStyle(), getSizeStyle(), disabled && styles.disabled, style]

  const textStyles = [
    styles.text,
    getTextStyle(),
    size === "small" && { fontSize: theme.fontSizes.sm },
    size === "large" && { fontSize: theme.fontSizes.lg },
    disabled && styles.disabledText,
    textStyle,
  ]

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#FFFFFF" : theme.colors.primary} />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
})

export default Button
