import {GameNotFoundError, UserNotInGameError} from '../game/error';
import {GameModel} from '../models/game';
import {makeMove} from '../board/make_move';
import {Color} from '../board/models';

export async function confirmMove(username: string, gameId: number, source: number, destination: number): Promise<void> {
  const game = await GameModel.findOne({gameId});
  if(!game) {
    throw new GameNotFoundError;
  }
  const index = game.players.indexOf(username);
  if(index === -1) {
    throw new UserNotInGameError;
  }
  const color = (game.blackPlayer === index ? Color.BLACK : Color.RED);
  makeMove(game.board, color, source, destination);
  await game.save();
}
