import './App.css';
import { useEffect, useState } from 'react';
import { getBestMove } from './utils'
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
    const result = evaluateBoard(board);
    if(result !== null){
      const resultWinner = result === 1 ? 'O' : result === -1 ? 'X' : 'Tie'
      setWinner(resultWinner);
    }
    if (!winner && currPlayer === 'O') { 
      const move = getBestMove(board, currPlayer);
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
      const newBoard = board.map((item, i) => i === index ? currPlayer : item)
      setBoard(newBoard);
      setCurrPlayer(prevPlayer => prevPlayer === 'X' ? 'O' : 'X');
      
    }
  }
  
  const handleReset = ()=>{
    setBoard(Array(9).fill(null));
    setCurrPlayer('X');
    setWinner(null);
  }


  return ( 
    <>
    <div className='kulshi'>
      {
        Array.from({length: 3}).map((_, i) => <div className="board-row">
          {Array.from({length: 3}).map((_, j) => <Square value={board[i + j]} onClick={() => handleClick(i + j)} />)}
        </div>)
      }
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
