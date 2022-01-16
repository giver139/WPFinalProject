import {InvalidSourceSelectionError, InvalidDestinationSelectionError} from './error';
import {Game} from '../models/game';
import {Color, Move, toMove, Board, ChessNo} from '../board/models';
import {checkFirstMoveBoard, flipChess, canMoveOneStep, checkPlayerLose} from '../board/helper'
import {getValidDestinations} from '../board/get_valid_destinations'

export function makeMove(game: Game, color: Color, move: Move, username: string): Move {
  let board = new Board(game.board);
  let initBoard = new Board(game.initialBoard);
  if (checkFirstMoveBoard(board)) {
    if (move.source.index !== move.destination.index) {
      throw new InvalidDestinationSelectionError;
    }
    // find out the real black player
    color = initBoard.board[move.source.index].color;
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
    if (board.board[move.destination.index].color !== color && board.board[move.destination.index].color !== Color.NONE) {
      // eat
      game.noFlipEatCount = 0;
    }
    else {
      // move
      game.noFlipEatCount++;
    }
    board.board[move.destination.index].chessType.color = board.board[move.source.index].chessType.color;
    board.board[move.destination.index].chessType.type = board.board[move.source.index].chessType.type;
    board.board[move.destination.index].chessType.chessNo = board.board[move.source.index].chessType.chessNo;
    board.board[move.source.index].chessType.chessNo = ChessNo.EMPTY;
  }
  game.board = board.toChessNoArray();
  if (checkPlayerLose(board, game.currentPlayer === game.blackPlayer ? Color.RED : Color.BLACK)) {
    game.winPlayer = game.currentPlayer;
  }
  return move;
}
