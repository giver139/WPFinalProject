import {usePage} from '../hooks/use_page';
import {Navigate} from 'react-router-dom';

export function LogoutPage() {

  const {user, setUser} = usePage();

  localStorage.removeItem('user');
  if(user) {
    setUser(() => '');
  }

  return (<Navigate to="/login" />);
}
