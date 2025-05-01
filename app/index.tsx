import { Text, View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import CustomButton from "@/componentes/custom_button";
import { useState, useEffect } from "react";

type Squares = (string | null)[];

export default function Index() {
  const [gameMatriz, setGameMatriz] = useState<Squares>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [playerVictory, setPlayerVictory] = useState<number>(0);
  const [cpuVictory, setCpuVictory] = useState<number>(0);

  const checkWinner = (squares: Squares): string | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const winner = checkWinner(gameMatriz);

    if (winner) {
      Alert.alert(`${winner === "X" ? "Jogador" : "Computador"} ganhou!`);
      winner === "X"
        ? setPlayerVictory((prev) => prev + 1)
        : setCpuVictory((prev) => prev + 1);
    } else if (!gameMatriz.includes(null)) {
      Alert.alert("Empate!");
    } else if (!isXNext) {
      setTimeout(randomCpuMove, 800);
    }
  }, [gameMatriz]);

  const handlePress = (index: number): void => {
    if (gameMatriz[index] || checkWinner(gameMatriz) || !isXNext) return;

    const newGameMatriz = [...gameMatriz];
    newGameMatriz[index] = "X";
    setGameMatriz(newGameMatriz);
    setIsXNext(false);
  };

  const randomCpuMove = (): void => {
    const availableMoves = gameMatriz
      .map((value, index) => (value === null ? index : null))
      .filter((value): value is number => value !== null);

    if (availableMoves.length === 0) return;

    const randomIndex =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];

    const newGameMatriz = [...gameMatriz];
    newGameMatriz[randomIndex] = "O";
    setGameMatriz(newGameMatriz);
    setIsXNext(true);
  };

  const restartGame = (): void => {
    setGameMatriz(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <View style={styles.main}>
      <View style={styles.containerScoreBoard}>
        <Text style={styles.scoreBoardText}>
          👤 Jogador: {playerVictory}   |   🤖 CPU: {cpuVictory}
        </Text>
      </View>

      <View style={styles.containerBoard}>
        {[0, 3, 6].map((startIndex) => (
          <View key={startIndex} style={styles.row}>
            {[0, 1, 2].map((offset) => (
              <CustomButton
                key={startIndex + offset}
                text={gameMatriz[startIndex + offset]}
                onPress={() => handlePress(startIndex + offset)}
              />
            ))}
          </View>
        ))}
      </View>

      <Text style={styles.turnText}>
        Vez do{" "}
        <Text
          style={{
            color: isXNext ? "#4dabf7" : "#f9c74f",
            fontWeight: "bold",
          }}
        >
          {isXNext ? "Jogador" : "Computador"}
        </Text>
      </Text>

      <View style={styles.containerResetButton}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={restartGame}
          activeOpacity={0.8}
        >
          <Text style={styles.resetButtonText}>🔄 Reiniciar Jogo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  containerScoreBoard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#3a3a3a",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },

  scoreBoardText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e0e0e0",
  },

  containerBoard: {
    backgroundColor: "#222",
    borderRadius: 20,
    padding: 16,
    marginBottom: 30,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 5,
  },

  turnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#aaa",
    marginBottom: 8,
  },

  containerResetButton: {
    marginTop: 20,
  },

  resetButton: {
    backgroundColor: "#e63946",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 4,
  },

  resetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
