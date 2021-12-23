import {GameModel} from '../models/game';
import {GameNotFoundError, UserNotInGameError} from './error';

export async function checkUserInGame(username: string, gameId: number): Promise<boolean> {
  const game = await GameModel.findOne({gameId});
  if(!game) {
    return false;
  }
  const index = game.players.indexOf(username);
  return index !== -1;
}
