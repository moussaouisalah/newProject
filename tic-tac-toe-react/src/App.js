import './App.css';
import { useEffect, useState } from 'react';
//import { minimax } from './GameLogic';

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currPlayer, setCurrPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const checkWinner = () => {
      const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [2, 4, 6], [0, 4, 8]
      ];

      for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          setWinner(board[a]);
          return;
        }
      }

      if (!board.includes(null) && !winner) {
        setWinner('Tie');
      }
    };

    checkWinner();
    if (!winner && currPlayer === 'O') { 
      const move = bestMove(board, currPlayer);
      if (move !== -1) {
        const newBoard = [...board];
        newBoard[move] = currPlayer;
        setBoard(newBoard);
        setCurrPlayer(prevPlayer => prevPlayer === 'X' ? 'O' : 'X');
      }
    }

  }, [board, winner, currPlayer]); 

  const handleClick = (index) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = currPlayer;
      setBoard(newBoard);
      setCurrPlayer(prevPlayer => prevPlayer === 'X' ? 'O' : 'X');
      
    }
  }

  function evaluateBoard(board) {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [2, 4, 6], [0, 4, 8]
    ];
  
    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] === 'O' ? 1 : -1; 
      }
    }
  
    if (!board.includes(null)) {
      return 0; 
    }
  
    return null; 
  }
  

  function minimax(board, depth, isMax){
    let score = evaluateBoard(board);
    if (score !== null) return score;
    if(isMax){
      let bestScore=-Infinity;
      for (let index = 0; index < board.length; index++) {
          if (!board[index]) {
            board[index] = 'O';
            let score = minimax(board, depth+1, false); 
            board[index] = null;
            bestScore=Math.max(score, bestScore) 
          }
        }
        return bestScore;
      }else{
        let bestScore=+Infinity;
      for (let index = 0; index < board.length; index++) {
          if (!board[index]) {
            board[index] = 'X';
            let score = minimax(board, depth+1, true); 
            board[index] = null;
            bestScore=Math.min(score, bestScore) 
          }
        }
        return bestScore;
      }
    }


  const handleReset = ()=>{
    setBoard(Array(9).fill(null));
    setCurrPlayer('X');
    setWinner(null);
  }

  const bestMove = (board, currPlayer) => {
    let bestScore = -Infinity;
    let bestMoveIndex = -1;
    for (let index = 0; index < board.length; index++) {
      if (!board[index]) {
        board[index] = currPlayer;
        let score = minimax(board, 0, false); 
        board[index] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMoveIndex = index;
        }
      }
    }
    return bestMoveIndex;
  }
  

  return ( 
    <>
    <div className='kulshi'>
      <div className="board-row">
        <Square value={board[0]} onClick={() => handleClick(0)} />
        <Square value={board[1]} onClick={() => handleClick(1)} />
        <Square value={board[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={board[3]} onClick={() => handleClick(3)} />
        <Square value={board[4]} onClick={() => handleClick(4)} />
        <Square value={board[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={board[6]} onClick={() => handleClick(6)} />
        <Square value={board[7]} onClick={() => handleClick(7)} />
        <Square value={board[8]} onClick={() => handleClick(8)} />
      </div>
      {!winner &&(
        <div className='turn'>
          <h2>It's {currPlayer}'s turn</h2>
        </div>
      )}
      {winner && (
    <div className="winner-message">
        <h2>{winner === 'Tie' ? "It's a tie!" : `Winner is ${winner}`}</h2>
        <button onClick={()=>handleReset()}>Reset game</button>
    </div>
    )}
    </div>

    </>
  );
}
export default App;
