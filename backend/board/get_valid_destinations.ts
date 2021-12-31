import {InvalidSourceSelectionError, NoPossibleDestinationError} from './error';
import {Color, Move, Position, Board, ChessNo} from '../board/models';
import {Game} from '../models/game';

export function getValidDestinations(game: Readonly<Game>, color: Color, source: Position): Move[] {
  const board = new Board(game.board);
  if (board.board[source.index].chessNo === ChessNo.EMPTY) {
    throw new InvalidSourceSelectionError;
  }
  return [];
}
