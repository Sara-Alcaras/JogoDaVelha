import React, { useState, useEffect } from 'react';
import './JogoDaVelha.css';

/* Descrição: O jogo da velha foi criado com base em um video aula do Lucass Caton e 
tem como objetivo treinar o uso em React, CSS e Js */

function JogoDaVelha() {
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if (winner) {
    console.log("Game finalized");
    return null;
  }
    if (board[index] !== "") {
    console.log("Busy Position");
    return null;
    }
    setBoard(
      board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item)
      );

      setCurrentPlayer(currentPlayer === "X" ? "O" : "X" );
  }
  const checkWinner = () => {
    const possibleWaysToWin = [ 
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],  
    ];

    possibleWaysToWin.forEach(cells => {
      if (cells.every(cell => cell === "O")) setWinner("O");

      if (cells.every(cell => cell === "X")) setWinner("X"); 
    });
     
    checkDraw();
  }

  const checkDraw = () => {
    if (board.every(item => item !== "")) setWinner("E");
      // empate! se todos forem diferentes de vazio
  }


  useEffect(checkWinner, [board]); /* So ira passar uma função quando algo for alterado */
  
  const resetGame = () => {
    setCurrentPlayer("O");
    setBoard(emptyBoard);
    setWinner(null);
  }

  return (
    <main>  
      <h1 className="title"> Jogo da Velha</h1>
    
      <div className={`board ${winner ? "game-over" : ""}` }>
        {board.map((item, index) => (
          <div 
           key={index}
           className={`cell ${item}`}
           onClick={() => handleCellClick((index))}
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
              <span className={winner}>{winner}</span> venceu!
            </h2>
          } 

            <button onClick={resetGame}>Recomeçar jogo!</button>
          </footer> 
        } 
    </main>
  );
}

export default JogoDaVelha;