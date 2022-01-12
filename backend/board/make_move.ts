import {InvalidSourceSelectionError, InvalidDestinationSelectionError} from './error';
import {Game} from '../models/game';
import {Color, Move, toMove, Board, ChessNo} from '../board/models';
import {checkFirstMoveBoard, flipChess, canMoveOneStep} from '../board/helper'

export function makeMove(game: Game, color: Color, move: Move, username: string): Move {
  let board = new Board(game.board);
  let initBoard = new Board(game.initialBoard);
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
    board.board[move.source.index] = flipChess(initBoard.board[move.source.index]);
    game.noFlipEatCount = 0;
  }
  else {
    if (board.board[move.source.index].color !== color) {
      throw new InvalidSourceSelectionError;
    }
    if (canMoveOneStep(move.source, move.destination) === false) {
      throw new InvalidDestinationSelectionError;
    }
    // move
    if (board.board[move.destination.index].color !== color) {
      game.noFlipEatCount = 0;
    }
    else {
      game.noFlipEatCount++;
    }
    board.board[move.destination.index].chessType = board.board[move.source.index].chessType;
    board.board[move.source.index].chessType.chessNo = ChessNo.EMPTY;
  }
  game.board = board.toChessNoArray();
  return move;
}
