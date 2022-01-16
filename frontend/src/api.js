import axios from 'axios';
import {InternalServerError, RequireLoginError, InvalidPayloadError, UnknownError, IncorrectUsernameOrPasswordError, UsernameAlreadyExistsError, RoomIdNotFoundError, UserAlreadyInTheRoomError, RoomIsFullError, UserNotInTheRoomError, PlayerNumberUnmatchError, InvalidParametersError, UserNotInTheGameError, InvalidSourceSelectionError, NoPossibleDestinationError, InvalidDestinationSelectionError, NotYourTurnError} from './error';
import {sendAuthorization} from './useWebsocket';

const api = axios.create({
  baseURL: `http://localhost:4000/api`,
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem('user');
  if(token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }
  return request;
}, (error) => {return Promise.reject(error);});

api.interceptors.response.use((response) => {return response;}, (error) => {
  if(error?.response?.status === 401) {
    return Promise.reject(new RequireLoginError);
  }
  else if(error?.response?.status === 500) {
    return Promise.reject(new InternalServerError(error.response.data.error));
  }
  else {
    return Promise.reject(error);
  }
});

export async function loginApi(payload) {
  try {
    const {data} = await api.post('/login', payload);
    if(!data.token.startsWith('Bearer ')) {
      throw new Error('invalid token');
    }
    localStorage.setItem('user', data.token.slice(7));
    try {
      await sendAuthorization(data.token.slice(7));
    } catch(error) {}
    return data; // {user: {username: string, nickname: string}, token: string}
  } catch(error) {
    if(error?.response?.status === 403) {
      const data = error.response.data.error;
      if(data === 'incorrect username or password') {
        throw new IncorrectUsernameOrPasswordError;
      }
      else if(data === 'invalid payload') {
        throw new InvalidPayloadError;
      }
      else {
        throw new UnknownError;
      }
    }
    else {
      throw error;
    }
  }
}

export async function registerApi(payload) {
  try {
    const {data} = await api.post('/register', payload);
    return data; // {user: {username: string, nickname: string}}
  } catch(error) {
    if(error?.response?.status === 403) {
      const data = error.response.data.error;
      if(data === 'username already exists') {
        throw new UsernameAlreadyExistsError;
      }
      else if(data === 'invalid payload' || data === 'user information must not be empty') {
        throw new InvalidPayloadError;
      }
      else {
        throw new UnknownError;
      }
    }
    else {
      throw error;
    }
  }
}

export async function logoutApi(payload) {
  try {
    const {data} = await api.post('/logout', payload);
    localStorage.removeItem('user');
    sendAuthorization('').catch(()=>{});
    return data; // {token: string}
  } catch(error) {
    throw error;
  }
}

export async function joinRoomApi(roomId) {
  try {
    const {data} = await api.post(`/joinRoom/${roomId}`);
    return data; // {room: {roomId: number, players: string[], timestamp: Date}}
  } catch(error) {
    if(error?.response?.status === 403) {
      const data = error.response.data.error;
      if(data === 'roomId not found' || data === 'invalid roomId') {
        throw new RoomIdNotFoundError;
      }
      else if(data === 'user already in the room') {
        throw new UserAlreadyInTheRoomError;
      }
      else if(data === 'the room is full') {
        throw new RoomIsFullError;
      }
      else {
        throw new UnknownError;
      }
    }
    else {
      throw error;
    }
  }
}

export async function listRoomsApi() {
  try {
    const {data} = await api.get('/allRooms');
    return data; // {rooms: {roomId: number, players: string[], timestamp: Date}[]}
  } catch(error) {
    throw error;
  }
}

export async function createRoomApi() {
  try {
    const {data} = await api.post('/createRoom');
    return data; // {room: {roomId: number, players: string[], timestamp: Date}}
  } catch(error) {
    throw error;
  }
}

export async function leaveRoomApi(roomId) {
  try {
    const {data} = await api.post(`/leaveRoom/${roomId}`);
    return data; // {}
  } catch(error) {
    if(error?.response?.status === 403) {
      const data = error.response.data.error;
      if(data === 'roomId not found' || data === 'invalid roomId') {
        throw new RoomIdNotFoundError;
      }
      else if(data === 'user not in this room') {
        throw new UserNotInTheRoomError;
      }
      else {
        throw new UnknownError;
      }
    }
    else {
      throw error;
    }
  }
}

export async function startGameApi(roomId) {
  try {
    const {data} = await api.post(`/startGame/${roomId}`);
    return data; // {game: {gameId: number, players: string[], timestamp: Date, blackPlayer: number, board: number[], noFlipEatCount: number}}
  } catch(error) {
    if(error?.response?.status === 403) {
      const data = error.response.data.error;
      if(data === 'user not in this room') {
        throw new UserNotInTheRoomError;
      }
      else if(data === 'player number is not 2') {
        throw new PlayerNumberUnmatchError;
      }
      else {
        throw error;
      }
    }
    else {
      throw error;
    }
  }
}

export async function firstClickApi(gameId, source) {
  try {
    const {data} = await api.get(`/firstClick/${gameId}`, {params: {source}});
    return data; // {moves: {source: number, destination: number}[]}
  } catch(error) {
    if(error?.response?.status === 403) {
      const data = error.response.data.error;
      if(data === 'invalid parameters') {
        throw new InvalidParametersError;
      }
      else if(data === 'user not in the game') {
        throw new UserNotInTheGameError;
      }
      else if(data === 'invalid source selection') {
        throw new InvalidSourceSelectionError;
      }
      else if(data === 'no possible destination') {
        throw new NoPossibleDestinationError;
      }
      else if(data === 'not your turn to move') {
        throw new NotYourTurnError;
      }
      else {
        throw new UnknownError;
      }
    }
    else {
      throw error;
    }
  }
}

export async function secondClickApi(gameId, source, destination) {
  try {
    const {data} = await api.post(`/secondClick/${gameId}`, {source, destination});
    return data; // {}
  } catch(error) {
    if(error?.response?.status === 403) {
      const data = error.response.data.error;
      if(data === 'invalid parameters') {
        throw new InvalidParametersError;
      }
      if(data === 'invalid payload') {
        throw new InvalidPayloadError;
      }
      else if(data === 'user not in the game') {
        throw new UserNotInTheGameError;
      }
      else if(data === 'invalid source selection') {
        throw new InvalidSourceSelectionError;
      }
      else if(data === 'invalid destination selection') {
        throw new InvalidDestinationSelectionError;
      }
      else if(data === 'not your turn to move') {
        throw new NotYourTurnError;
      }
      else {
        throw new UnknownError;
      }
    }
    else {
      throw error;
    }
  }
}

