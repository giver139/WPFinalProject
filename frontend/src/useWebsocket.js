import {useState, useEffect} from 'react';

export const WebSocketState = Object.freeze({
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
});

export const ConnectionState = Object.freeze({
  INITIALIZING: 'INITIALIZING',
  HOME: 'HOME',
  MAIN: 'MAIN',
  ROOM: 'ROOM',
  GAME: 'GAME',
});

const OperationType = Object.freeze({
  NEW_ROOM: 'NEW_ROOM',
  CLOSE_ROOM: 'CLOSE_ROOM',
  JOIN_ROOM: 'JOIN_ROOM',
  LEAVE_ROOM: 'LEAVE_ROOM',
  START_GAME: 'START_GAME',
  MAKE_MOVE: 'MAKE_MOVE',
});

const client = new WebSocket('ws://localhost:4000');

async function sendData(data) {
  if(client.readyState !== WebSocketState.OPEN) throw new Error('web socket not ready');
  client.send(JSON.stringify(data));
}

async function sendConnectionState(connectionState, id = 0) {
  sendData({state: connectionState, id});
}

export async function sendAuthorization(loginToken) {
  const token = loginToken ?? localStorage.getItem('user');
  await sendData({state: ConnectionState.INITIALIZING, token: token ? `Bearer ${token}` : ''});
}

client.addEventListener('open', () => {sendAuthorization();}, {once: true});

function createOnDataHandler({handleNewRoom, handleCloseRoom, handleJoinRoom, handleLeaveRoom, handleStartGame, handleMakeMove}) {
  return async (event: MessageEvent) => {
    const payload = JSON.parse(event.data);
    switch(payload.type) {
      case OperationType.NEW_ROOM:
        if(handleNewRoom) {
          handleNewRoom(payload.room); // {roomId: number, players: string[], timestamp: Date}
        }
        break;
      case OperationType.CLOSE_ROOM:
        if(handleCloseRoom) {
          handleCloseRoom(payload.roomId); // number
        }
        break;
      case OperationType.JOIN_ROOM:
        if(handleJoinRoom) {
          handleJoinRoom(payload.username); // string
        }
        break;
      case OperationType.LEAVE_ROOM:
        if(handleLeaveRoom) {
          handleLeaveRoom(payload.username); // string
        }
        break;
      case OperationType.START_GAME:
        if(handleStartGame) {
          handleStartGame(payload.game); // {gameId: number, players: string[], timestamp: Date, blackPlayer: number, board: number[], noFlipEatCount: number}
        }
        break;
      case OperationType.MAKE_MOVE:
        if(handleMakeMove) {
          handleMakeMove(payload.game, payload.move); // {game: {gameId: number, players: string[], timestamp: Date, blackPlayer: number, board: number[], noFlipEatCount: number}}, {source: number, destination: number}
        }
        break;
      default:
        break;
    }
  };
}

export function useWebsocket({handleNewRoom, handleCloseRoom, handleJoinRoom, handleLeaveRoom, handleStartGame, handleMakeMove}) {
  const [state, setState] = useState(client.readyState);

  client.addEventListener('open', () => {setState(() => WebSocketState.OPEN);}, {once: true});
 
  useEffect(() => {
    const onData = createOnDataHandler({handleNewRoom, handleCloseRoom, handleJoinRoom, handleLeaveRoom, handleStartGame, handleMakeMove});
    client.addEventListener('message', onData);
    return () => {client.removeEventListener('message', onData);};
  }, []);

  return {state, sendConnectionState};
}

/* in each page:
 * const {state, sendConnectionState} = useWebsocket({...});
 * useEffect(() => {
 *   if(state === WebSocketState.OPEN) {
 *     sendConnectionState(ConnectionState.XXXX, ...);
 *   }
 * }, [state]);
*/
