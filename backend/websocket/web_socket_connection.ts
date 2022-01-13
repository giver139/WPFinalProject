import {WebSocket, RawData} from 'ws';
import {isInteger, assertUnreachable} from '../utils';
import {UserView} from '../views/user';
import {RoomView} from '../views/room';
import {GameView} from '../views/game';
import {MoveView} from '../views/move';
import {readToken} from '../controller/auth';
import {isUserToken} from '../controller/user_token';

enum ConnectionState {
  INITIALIZING = 'INITIALIZING',
  HOME = 'HOME',
  MAIN = 'MAIN',
  ROOM = 'ROOM',
  GAME = 'GAME',
}

enum OperationType {
  NEW_ROOM = 'NEW_ROOM',
  CLOSE_ROOM = 'CLOSE_ROOM',
  JOIN_ROOM = 'JOIN_ROOM',
  LEAVE_ROOM = 'LEAVE_ROOM',
  START_GAME = 'START_GAME',
  MAKE_MOVE = 'MAKE_MOVE',
}

interface AuthorizationPayload {
  state: ConnectionState.INITIALIZING;
  token: string;
}

interface StatePayload {
  state: ConnectionState;
  id: number;
}

function isConnectionState(data: unknown): data is ConnectionState {
  switch(data) {
    case ConnectionState.HOME:
    case ConnectionState.MAIN:
    case ConnectionState.ROOM:
    case ConnectionState.GAME:
      return true;
    default:
      return false;
  }
}

function isAuthorizationPayload(data: unknown): data is AuthorizationPayload {
  const payload = data as AuthorizationPayload;
  return payload.state === ConnectionState.INITIALIZING && typeof payload.token === 'string';
}

function isStatePayload(data: unknown): data is StatePayload {
  const payload = data as StatePayload;
  return typeof payload.id === 'number' && isInteger(payload.id) && isConnectionState(payload.state);
}

export class WebSocketConnection {
  private static readonly connections: WebSocketConnection[] = [];
  static createConnection(ws: WebSocket): void {
    WebSocketConnection.connections.push(new WebSocketConnection(ws));
  }
  static broadcastNewRoom(room: RoomView): void {
    const targets = WebSocketConnection.connections.filter((connection) => connection.state === ConnectionState.MAIN);
    for(const connection of targets) {
      connection.sendData({type: OperationType.NEW_ROOM, room});
    }
  }
  static broadcastCloseRoom(roomId: number): void {
    const targets = WebSocketConnection.connections.filter((connection) => connection.state === ConnectionState.MAIN);
    for(const connection of targets) {
      connection.sendData({type: OperationType.CLOSE_ROOM, roomId});
    }
  }
  static broadcastJoinRoom(roomId: number, username: string): void {
    const targets = WebSocketConnection.connections.filter((connection) => connection.state === ConnectionState.ROOM && connection.id === roomId);
    for(const connection of targets) {
      connection.sendData({type: OperationType.JOIN_ROOM, username: username});
    }
  }
  static broadcastLeaveRoom(roomId: number, username: string): void {
    const targets = WebSocketConnection.connections.filter((connection) => connection.state === ConnectionState.ROOM && connection.id === roomId);
    for(const connection of targets) {
      connection.sendData({type: OperationType.LEAVE_ROOM, username: username});
    }
  }
  static broadcastStartGame(roomId: number, game: GameView): void {
    const targets = WebSocketConnection.connections.filter((connection) => connection.state === ConnectionState.ROOM && connection.id === roomId);
    for(const connection of targets) {
      connection.sendData({type: OperationType.START_GAME, game});
    }
  }
  static broadcastMakeMove(gameId: number, game: GameView, move: MoveView): void {
    const targets = WebSocketConnection.connections.filter((connection) => connection.state === ConnectionState.GAME && connection.id === gameId);
    for(const connection of targets) {
      connection.sendData({type: OperationType.MAKE_MOVE, game, move});
    }
  }

  private state: ConnectionState;
  private id: number;
  private user: string;

  constructor(private readonly ws: WebSocket) {
    this.state = ConnectionState.INITIALIZING;
    this.id = 0;
    this.user = '';
    this.ws.on('message', this.onData);
    this.ws.on('close', this.onClose);
  }

  close(): void {
    this.ws.close();
  }

  private async sendData(data: unknown): Promise<void> {
    this.ws.send(JSON.stringify(data));
  }

  private onData = async (rawData: RawData): Promise<void> => {
    try {
      const data = JSON.parse(rawData.toString());
      if(isAuthorizationPayload(data)) {
        const token = data.token;
        if(token === '') {
          this.user = '';
          return;
        }
        const jwtPayload = readToken(token);
        if(!isUserToken(jwtPayload)) {
          throw new Error('invalid token content');
        }
        this.user = jwtPayload.username;
        return;
      }
      if(this.user === '') {
        throw new Error('user has not authorized');
      }
      if(!isStatePayload(data)) {
        throw new Error('invalid state payload');
      }
      if((data.state === ConnectionState.HOME || data.state === ConnectionState.MAIN) && data.id !== 0) {
        throw new Error('invalid id');
      }
      this.state = data.state;
      this.id = data.id;
    } catch(err: unknown) {
      try {
        await this.sendData({error: err});
      } catch(e: unknown) {}
      this.close();
    }
  }
  
  private onClose = async (): Promise<void> => {
    const index = WebSocketConnection.connections.indexOf(this);
    if(index !== -1) {
      WebSocketConnection.connections.splice(index, 1);
    }
  }
}
