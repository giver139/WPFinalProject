import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import {Room, User, Game} from '../models';

export interface UserToken {
  username: string;
};

export function isUserToken(payload: unknown): payload is UserToken {
  return (payload as UserToken).username !== undefined;
}

export function usePage() {
  const [user, setUser] = useState<string>('');
  const [room, setRoom] = useState<Room|null>(null);
  const [game, setGame] = useState<Game|null>(null);

  useEffect(() => {
    const token = localStorage.getItem('user');
    if(token) {
      const data = jwtDecode(token);
      if(isUserToken(data)) {
        setUser(() => data.username);
      }
    }
  }, []);

  const relogin = () => {
    window.location.href = '/login';
  }

  return {user, setUser, relogin, room, setRoom, game, setGame};
}
