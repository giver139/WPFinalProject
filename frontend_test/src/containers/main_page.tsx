import {useEffect} from 'react';
import {useAsync} from 'react-async';
import {usePage} from '../hooks/use_page';
import {useNavigate} from 'react-router-dom';
import {api} from '../api';
import {JoinRoomButton} from '../components/join_room_button';
import {Room} from '../models';

async function getRooms(): Promise<Room[]> {
  const rooms = await api.get('/api/allRooms');
  console.log(rooms);
  return [] as Room[];
}

export function MainPage() {
  const {user, relogin} = usePage();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      relogin();
    }
  }, []);

  const {data, error, isPending} = useAsync({promiseFn: getRooms});

  if(isPending) {
    return (<div>Loading...</div>);
  }
  else if(error) {
    return (<div>{error.message}</div>);
  }
  else if(data) {
    return (
      <div>
        <h1>Main</h1>
        {data.map((room) => (<JoinRoomButton room={room} key={room.roomId} />))}
      </div>
    );
  }
  else {
    return null;
  }
}
