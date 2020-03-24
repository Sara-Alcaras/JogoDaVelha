import React, { useState, useEffect } from 'react';
import './JogoDaVelha.css';

function JogoDaVelha() {
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [winner, setWinner] = useState(null);
  const [countX, setCountX] = useState(0);
  const [countO, setCountO] = useState(0);

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

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
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
      [board[3], board[5], board[7]],
      [board[7], board[8], board[9]]
    ];

    possibleWaysToWin.forEach(cells => {
      if (cells.every(cell => cell === "O")) {
        setCountO(countO+1)
        setWinner("O")
      };

      if (cells.every(cell => cell === "X")){
        setCountX(countX+1)
        setWinner("X");
      }
    });
    checkDraw();
  }

  const checkDraw = () => {
    if (board.every(item => item !== "")) setWinner("E");
    // Empate se todos forem diferentes de vazio
  }


  useEffect(checkWinner, [board]); // So ira passar uma função quando algo for alterado

  const resetGame = () => {
    setCurrentPlayer("O");
    setBoard(emptyBoard);
    setWinner(null);
  }

   //console.log("winner", winner)

  // console.log("currentPlayer", currentPlayer)

  return (
    <main> 
      <div className="topo">
        <div className="players">

          <div className="player">
            <div>{`Player X:`} </div>
            <div> {`${countX}`} </div>
          </div>

          <div className="player">
            <div>{`Player O:`} </div>
            <div> {`${countO}`} </div>
          </div>

        </div>
        <h1 className="title"> Jogo da Velha</h1>

        <div className="nextPlayer">
        {`Next Player: ${currentPlayer}`}
        </div>

      </div>
    
      <div className={`board ${winner ? "game-over" : ""}`}>
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

