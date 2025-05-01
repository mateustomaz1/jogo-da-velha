import { Text, StyleSheet, TouchableOpacity } from "react-native";

interface IButtonProps {
  text: string | null;
  onPress: () => void;
  size?: number;
}

export default function CustomButton({ text, onPress, size = 90 }: IButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          height: size,
          width: size,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Text style={[styles.text, text === "X" ? styles.textX : styles.textO]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    margin: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#444",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },

  text: {
    fontSize: 40,
    fontWeight: "bold",
  },

  textX: {
    color: "#4dabf7", 
  },

  textO: {
    color: "#f9c74f", 
  },
});
