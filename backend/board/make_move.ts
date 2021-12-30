import {InvalidSourceSelectionError, InvalidDestinationSelectionError} from './error';
import {Game} from '../models/game';
import {Color, Move, toMove, Board} from '../board/models';

export function makeMove(game: Game, color: Color, move: Move): Move {
  const board = new Board(game.board);

  return toMove(0,0);
}
