"use client"
import { View, StyleSheet } from "react-native"
import { useTheme } from "../../context/ThemeContext"

const Card = ({ children, style, ...props }) => {
  const { theme } = useTheme()

  return (
    <View
      style={[
        styles.card,
        {
          borderRadius: theme.borderRadius.md,
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.shadow,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
})

export default Card
