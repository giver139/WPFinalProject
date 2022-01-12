import {GameNotFoundError, UserNotInGameError, NotCurrentPlayerError} from '../game/error';
import {GameModel} from '../models/game';
import {getValidDestinations} from '../board/get_valid_destinations';
import {Color, Move, toPosition} from '../board/models';
import {MoveView} from '../views/board';

export async function getValidMovesFromSource(username: string, gameId: number, source: number): Promise<MoveView[]> {
  const game = await GameModel.findOne({gameId});
  if(!game) {
    throw new GameNotFoundError;
  }
  const index = game.players.indexOf(username);
  if(index === -1) {
    throw new UserNotInGameError;
  }
  if(index !== game.currentPlayer) {
    throw new NotCurrentPlayerError;
  }
  const color = (game.blackPlayer === index ? Color.BLACK : Color.RED);
  return getValidDestinations(game, color, toPosition(source)).map((move: Move) => new MoveView(move));
}
