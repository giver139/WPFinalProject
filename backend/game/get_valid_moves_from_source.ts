import {GameNotFoundError, UserNotInGameError} from '../game/error';
import {GameModel} from '../models/game';
import {getValidDestinations} from '../board/get_valid_destinations';
import {Color, Move} from '../board/models';

export async function getValidMovesFromSource(username: string, gameId: number, source: number): Promise<Move[]> {
  const game = await GameModel.findOne({gameId});
  if(!game) {
    throw new GameNotFoundError;
  }
  const index = game.players.indexOf(username);
  if(index === -1) {
    throw new UserNotInGameError;
  }
  const color = (game.blackPlayer === index ? Color.BLACK : Color.RED);
  return getValidDestinations(game.board, color, source);
}
