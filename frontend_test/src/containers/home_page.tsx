import {useEffect} from 'react';
import {usePage} from '../hooks/use_page';
import {useNavigate} from 'react-router-dom';

export function HomePage() {
  const {user, relogin} = usePage();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>
      <input type="button" value="player v.s. player" onClick={() => {navigate("/main");}} />
    </div>
  );
}
