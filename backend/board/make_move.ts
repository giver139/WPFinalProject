import {InvalidSourceSelectionError, InvalidDestinationSelectionError} from './error';
import {Game} from '../models/game';
import {Color, Move, toMove, Board, ChessNo} from '../board/models';
import {checkFirstMoveBoard, flipChess, canMoveOneStep} from '../board/helper'
import {getValidDestinations} from '../board/get_valid_destinations'

export function makeMove(game: Game, color: Color, move: Move, username: string): Move {
  let board = new Board(game.board);
  let initBoard = new Board(game.initialBoard);
  console.log('move = ', move)
  console.log(move.source.index, move.destination.index)
  if (checkFirstMoveBoard(board)) {
    // find out the real black player
    color = board.board[move.source.index].color;
    if (color === Color.BLACK) {
      game.blackPlayer = game.players.indexOf(username);
    }
    else {
      game.blackPlayer = 1 - game.players.indexOf(username);
    }
    board.board[move.source.index] = flipChess(board.board[move.source.index], initBoard.board[move.source.index]);
    game.noFlipEatCount = 0;
  }
  else if (move.source.index === move.destination.index) {
    console.log('here flip');
    // flip
    board.board[move.source.index] = flipChess(board.board[move.source.index], initBoard.board[move.source.index]);
    game.noFlipEatCount = 0;
  }
  else {
    if (board.board[move.source.index].color !== color) {
      throw new InvalidSourceSelectionError;
    }
    if (getValidDestinations(game, color, move.source).filter(_ => _.destination.index === move.destination.index).length === 0) {
      throw new InvalidDestinationSelectionError;
    }
    // move
    if (board.board[move.destination.index].color !== color) {
      game.noFlipEatCount = 0;
    }
    else {
      game.noFlipEatCount++;
    }
    board.board[move.destination.index].chessType.color = board.board[move.source.index].chessType.color;
    board.board[move.destination.index].chessType.type = board.board[move.source.index].chessType.type;
    board.board[move.destination.index].chessType.chessNo = board.board[move.source.index].chessType.chessNo;
    board.board[move.source.index].chessType.chessNo = ChessNo.EMPTY;
  }
  game.board = board.toChessNoArray();
  console.log(game);
  return move;
}
