import {InvalidSourceSelectionError, InvalidDestinationSelectionError} from './error';
import {Game} from '../models/game';
import {Color, Move, toMove, Board, ChessNo} from '../board/models';
import {checkFirstMoveBoard, flipChess} from '../board/helper'

export function makeMove(game: Game, color: Color, move: Move, username: string): Move {
  const board = new Board(game.board);
  if (checkFirstMoveBoard(board)) {
    // find out the real black player
    color = board.board[move.source.index].color;
    if (color === Color.BLACK) {
      game.blackPlayer = game.players.indexOf(username);
    }
    else {
      game.blackPlayer = 1 - game.players.indexOf(username);
    }
  }
  if (move.source === move.destination) {
    // flip
    board.board[move.source.index] = flipChess(board.board[move.source.index]);
  }
  else {
    // move
    board.board[move.destination.index] = board.board[move.source.index];
    board.board[move.source.index].chessType.chessNo = ChessNo.EMPTY;
  }
  game.board = board.toChessNoArray();
  return move;
}
