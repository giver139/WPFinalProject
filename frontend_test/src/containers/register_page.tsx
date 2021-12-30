import {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {usePage} from '../hooks/use_page';
import {api} from '../api';

export function RegisterPage() {
  const [username, setUsername] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const register = async () => {
    const password = passwordRef.current?.value ?? '';
    if(username === '' || password === '' || nickname === '') {
      throw new Error('username, password, and nickname must not be empty');
    }
    await api.post('/register', {username, password, nickname});
    navigate('/login');
  };

  return (
    <div>
      <h1>register</h1>
      <div>
        <label>username: </label>
        <input onChange={(event) => {setUsername(() => (event.target as HTMLInputElement).value);}} />
      </div>
      <div>
        <label>password: </label>
        <input type="password" ref={passwordRef} />
      </div>
      <div>
        <label>nickname: </label>
        <input onChange={(event) => {setNickname(() => (event.target as HTMLInputElement).value);}} />
      </div>
      <div>
        <input type="button" onClick={register} value="register" />
      </div>
    </div>
  );
}
