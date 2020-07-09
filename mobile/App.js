import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'

export default function App() {
  const emptyBoard = Array(9).fill('')
  const [board, setBoard] = useState(emptyBoard)
  const [winner, setWinner] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("X")

  const handleClick = (index) => {
    if (winner) {
      resetGame()
      return null;
    };
    if (board[index] !== "") {
      alert("Posição ocupada");
      return null;
    };

    setBoard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item));

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
  }

  const veriVencedor = () => {
    const vencer = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    vencer.forEach(cells => {
      if (cells.every(cell => cell === "X")) setWinner("X");
      if (cells.every(cell => cell === "O")) setWinner("O");
    })

    veriEmpate();
  }

  const veriEmpate = () => {
    if (board.every(item => item !== "")) {
      setWinner("E")
    }
  }

  const resetGame = () => {
    setCurrentPlayer("X");
    setBoard(emptyBoard);
    setWinner(null)
  }

  useEffect(veriVencedor, [board]);
  
  return (
    <View style={styles.container}>
      
      {board.map((value,index) => (
        <TouchableOpacity
        style={styles.piece}
        key={index}
        onPress={() => handleClick(index)}
        >
          <Text style={styles.pieceText}>{value}</Text>
        </TouchableOpacity>
      ))}
      {
        <Text style={styles.textBelow}> Vex de "{currentPlayer}"</Text>
      }
      {winner &&
        alert(` VENCEDOR: ${winner}`, resetGame())
        
      }
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#f5f5f5'
  },
  piece: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    backgroundColor: "#ddd",
    alignItems: 'center',
    justifyContent:'center',
    borderWidth: 0.5,
    
  },
  pieceText:{
    fontSize: 60,
  },
  textBelow:{
    fontSize: 20
  }
})