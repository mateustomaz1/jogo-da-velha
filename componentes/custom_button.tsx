import { Text, StyleSheet, TouchableOpacity } from "react-native";

interface IButtonProps {
  text: string | null;
  color?: string;
  size?: number;
  onPress: () => void;
}

export default function CustomButton(props: IButtonProps) {
  const { text, color = "#f5f0eb", size = 80, onPress } = props;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: color,
          height: size,
          width: size,
          borderRadius: 5,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
});
