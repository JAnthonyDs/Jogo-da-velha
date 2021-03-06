import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'

import './TicTacToe.css';
const socket = io('http://192.168.0.107:3333')

function TicTacToe() {
  const emptyBoard = Array(9).fill("")
  const [board, setBoard] = useState(emptyBoard)
  const [winner, setWinner] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("")
  
  socket.on('jogada', data => {
    setBoard(board.map((item, itemIndex) => itemIndex === data.position ? data.player : item));
  })

  socket.on('player',data =>{
    setCurrentPlayer(data)
  })

  const handleCellClick = (index) => {
    
    if (winner) {
      alert("Fim");
      return null;
    };
    if (board[index] !== "") {
      alert("Posição ocupada");
      return null;
    };

    setBoard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item));
    
    const object = {
      player: currentPlayer,
      position: index
    }

    socket.emit('enviarJogada',object)

    //setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
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

  useEffect(veriVencedor, [board]);

  const veriEmpate = () => {
    if (board.every(item => item !== "")) {
      setWinner("E")
    }
  }

  const resetGame = () => {
    //setCurrentPlayer("X");
    setBoard(emptyBoard);
    setWinner(null)
  }


  return (
    <main>
      <h1 className="title">Jogo da velha</h1>
      <div className="vez-jogada">
        <span className={currentPlayer}>Vez de {currentPlayer}</span>
      </div>

      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((item, index) => (
          <div
            className={`cell ${item}`}
            key={index}
            onClick={() => handleCellClick(index)}
          >
            {item}
          </div>
        ))}

      </div>

      {winner &&
        <footer>
          {winner === "E" ?
            <h2 className="winner-message">
              <span className={winner}>Empatou!</span>
            </h2>
            :
            <h2 className="winner-message">
              <span className={winner}>{winner} venceu!</span> 
            </h2>
          }


          <button onClick={resetGame}>Restart</button>
        </footer>
      }
    </main>
  );
}

export default TicTacToe;
