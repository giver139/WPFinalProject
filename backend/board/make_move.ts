import {InvalidSourceSelectionError, InvalidDestinationSelectionError} from './error';
import {Game} from '../models/game';
import {Color, Move} from '../board/models';

export function makeMove(game: Game, color: Color, source: number, destination: number): Move {
  return {source: '', destination: ''};
}
