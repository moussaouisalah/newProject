
export function evaluateBoard(board) {
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

export const getBestMove = (board, currPlayer) => {
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