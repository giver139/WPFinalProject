import {CounterModel} from '../models/counter';
import {RoomModel} from '../models/room';
import {GameModel, GAME_MODEL} from '../models/game';
import {RoomNotFoundError} from '../room/error';
import {GameCounterNotFoundError, PlayerNumberUnmatchError} from './error';
import {GameView} from '../views/game';
import {WebSocketConnection} from '../websocket/web_socket_connection';
import {getFirstMove, getInitialBoard} from '../board/initial_game';

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
  const newBoard = getInitialBoard();
  const newGame = new GameModel({gameId, players: [...room.players], timestamp: Date.now(), firstMove: getFirstMove(), ...newBoard});
  await room.remove();
  await gameCounter.save();
  await newGame.save();
  const gameView = new GameView(newGame);
  WebSocketConnection.broadcastStartGame(roomId, gameView);
  return gameView;
}
