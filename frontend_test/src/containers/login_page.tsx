import {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {usePage} from '../hooks/use_page';
import {api} from '../api';

export function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const login = async () => {
    const password = passwordRef.current?.value ?? '';
    if(username === '' || password === '') {
      throw new Error('username and password must not be empty');
    }
    await api.post('/api/login', {username, password});
    navigate('/home');
  };

  return (
    <div>
      <h1>login</h1>
      <div>
        <label>username: </label>
        <input onChange={(event) => {setUsername(() => (event.target as HTMLInputElement).value);}} />
      </div>
      <div>
        <label>password: </label>
        <input ref={passwordRef} />
      </div>
      <div>
        <input type="button" onClick={login} value="login" />
      </div>
    </div>
  );
}
