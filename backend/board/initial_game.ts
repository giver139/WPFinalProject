import {ChessNo} from '../board/models';

export function getFirstMove(): number {
  return Math.floor(Math.random() * 2);
}

export function getInitialBoard(): {initialBoard: number[], board: number[]} {
  let chessNoOrder = [ChessNo.BLACK_KING, ChessNo.BLACK_GUARD, ChessNo.BLACK_MINISTER, ChessNo.BLACK_ROOK, ChessNo.BLACK_KNIGHT, ChessNo.BLACK_CANNON, ChessNo.BLACK_PAWN, ChessNo.RED_KING, ChessNo.RED_GUARD, ChessNo.RED_MINISTER, ChessNo.RED_ROOK, ChessNo.RED_KNIGHT, ChessNo.RED_CANNON, ChessNo.RED_PAWN];
  let chessCount = [1, 2, 2, 2, 2, 2, 5, 1, 2, 2, 2, 2, 2, 5];
  let board = new Array(32).fill(ChessNo.COVERED);
  let initialBoard = [];
  for (let i in chessCount) {
    while (chessCount[i] > 0) {
      initialBoard.push(chessNoOrder[i]);
      chessCount[i]--;
    }
  }
  // randomshuffle
  for (let i = initialBoard.length - 1; i > 0; i--) {
    let pos = Math.floor(Math.random() * (i + 1));
    [initialBoard[i], initialBoard[pos]] = [initialBoard[pos], initialBoard[i]];
  }
  return {initialBoard: initialBoard, board: board};
}
