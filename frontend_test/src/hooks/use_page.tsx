import {useState} from 'react';

export function usePage() {
  const [page, setPage] = useState<JSX.Element>();
  const [user, setUser] = useState<string>(localStorage.getItem('user') ?? '');
  /*
  const relogin = () => {
    localStorage.removeItem('user');
    setUser(() => '');
    setPage(<>);
  }
  */

  return {user, setUser, page};
}
