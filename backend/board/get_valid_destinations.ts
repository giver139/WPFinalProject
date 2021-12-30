import {InvalidSourceSelectionError, NoPossibleDestinationError} from './error';
import {Color, Move, Position, Board} from '../board/models';
import {Game} from '../models/game';

export function getValidDestinations(game: Readonly<Game>, color: Color, source: Position): Move[] {
  const board = new Board(game.board);
  return [];
}
