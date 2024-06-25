import { useState } from "react";

function Square( {value, onSquareClick, win} ) {
  const buttonStyle = win ? { backgroundColor: "red" } : {};

  return (
    <button className="square" 
      onClick={onSquareClick}
      style={buttonStyle} >
      {value}
    </button>
  );
}

function Board({squares, player, onPlay}) {

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) 
      return;
    const nextSquares = squares.slice();
    nextSquares[i] = player;
    onPlay(nextSquares);
  }

  let status;
  const winner = calculateWinner(squares);
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.includes(null)){
    status = "Next Player: " + player
  } else {
    status = "DRAW"
  }

  return (
    <>
      <div className="status">{status}</div>
      {[0, 1, 2].map((row) => 
        <div className="board-row" key={row}>
        {[0, 1, 2].map((col) => {
          const index = 3 * row + col;
          // console.log(winner,index);
          if (winner && winner.includes(index)){
            return <Square key={col} 
              value={squares[index]} 
              onSquareClick={() => handleClick(index)}
              win={true} />
          }
          return <Square key={col} 
            value={squares[index]} 
            onSquareClick={() => handleClick(index)}
            win={false} />
        }
        )}
        </div>
      )}
    </>
  );
}

export default function Game() {

  const [player, setPlayer] = useState("X");
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [historyOrder, setHistoryOrder] = useState(true);
  
  const cur_state = history[history.length - 1];
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
    setPlayer(player === "X" ? "O" : "X");
    setHistory(nextHistory);
    setCurrentMove(currentMove+1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setPlayer(nextMove % 2 ? 'O' : 'X');
  }
  
  function handleReorder() {
    setHistoryOrder(!historyOrder);
  }

  const moves = history.map((squares, move) => {
    let description;
    
    if (move > 0) {
      let pos = 0;
      for (let i = 0; i < squares.length; i++){
        if (squares[i] !== history[move-1][i]){
          pos = i;
          break;
        }
      }


      if(move === currentMove) {
        description = 'You are at move #' + move + `at (${pos%3}, ${Math.floor(pos/3)})`;
      } else {
        description = 'Go to move #' + move + pos + `at (${pos%3}, ${Math.floor(pos/3)})`;
      }
      
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={history[currentMove]} player={player} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={handleReorder}>Reorder</button>
        <ol>{historyOrder ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

