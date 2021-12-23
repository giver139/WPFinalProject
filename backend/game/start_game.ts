import {CounterModel} from '../models/counter';
import {RoomModel} from '../models/room';
import {GameModel, GAME_MODEL} from '../models/game';
import {RoomNotFoundError} from '../room/error';
import {GameCounterNotFoundError, PlayerNumberUnmatchError} from './error';
import {GameView} from '../views/game';

export async function startGame(roomId: number): Promise<GameView> {
  const gameCounter = await CounterModel.findOne({model: GAME_MODEL});
  if(!gameCounter) {
    throw new GameCounterNotFoundError;
  }
  const gameId = gameCounter.count;
  gameCounter.count += 1;
  const room = await RoomModel.findOne({roomId});
  if(!room) {
    throw new RoomNotFoundError;
  }
  if(room.players.length !== 2) {
    throw new PlayerNumberUnmatchError;
  }
  const newGame = new GameModel({gameId, players: [...room.players], timestamp: Date.now()});
  await room.remove();
  await gameCounter.save();
  await newGame.save();
  return new GameView(newGame);
}
