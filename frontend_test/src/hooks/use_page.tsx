import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export interface UserToken {
  username: string;
};

export function isUserToken(payload: unknown): payload is UserToken {
  return (payload as UserToken).username !== undefined;
}

export function usePage() {
  const [user, setUser] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('user');
    if(token) {
      const data = jwtDecode(token);
      if(isUserToken(data)) {
        console.log(data);
        setUser(() => data.username);
      }
    }
  }, []);

  const relogin = () => {
    navigate('/login');
  }

  return {user, setUser, relogin};
}
