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
      Alert.alert(`${winner} ganhou!`);
      winner === "X"
        ? setPlayerVictory((prev) => prev + 1)
        : setCpuVictory((prev) => prev + 1);
    } else if (!gameMatriz.includes(null)) {
      Alert.alert("Empate!");
    } else if (!isXNext) {
      setTimeout(randomCpuMove, 1000);
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
        <Text style={styles.scoreBoardText}>👤 VC: {playerVictory}   |   🤖 CPU: {cpuVictory}</Text>
      </View>
      <View style={styles.containerBoard}>
        {[0, 3, 6].map((startIndex) => (
          <View key={startIndex} style={styles.row}>
            <CustomButton text={gameMatriz[startIndex]} onPress={() => handlePress(startIndex)} />
            <CustomButton text={gameMatriz[startIndex + 1]} onPress={() => handlePress(startIndex + 1)} />
            <CustomButton text={gameMatriz[startIndex + 2]} onPress={() => handlePress(startIndex + 2)} />
          </View>
        ))}
      </View>
        <Text style={styles.TurnText}>Vez do <Text style={{color: "#ffcc54"}}>{isXNext ? "Jogador" : "Computador"}</Text></Text>
      <View style={styles.containerResetButton}>
        <TouchableOpacity style={styles.resetButton} onPress={restartGame} activeOpacity={0.8}>
          <Text style={styles.resetButtonText}>Reiniciar Jogo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },

  containerScoreBoard: {
    backgroundColor: "#2c2c2c",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: "#444",
    alignItems: "center",
  },
  
  scoreBoardText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },  

  containerBoard: {
    backgroundColor: "#333",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  TurnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  containerResetButton: {
    marginTop: 20,
    alignItems: "center",
  },
  
  resetButton: {
    backgroundColor: "#ff6666",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  
  resetButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
