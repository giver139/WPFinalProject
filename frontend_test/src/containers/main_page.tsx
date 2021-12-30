import {useEffect} from 'react';
import {useAsync} from 'react-async';
import {usePage} from '../hooks/use_page';
import {useNavigate} from 'react-router-dom';
import {api} from '../api';
import {JoinRoomButton} from '../components/join_room_button';
import {Room} from '../models';

async function getRooms(): Promise<Room[]> {
  const {data} = await api.get('/allRooms');
  return data.rooms as Room[];
}

export function MainPage() {
  const {user, relogin, setRoom} = usePage();
  const navigate = useNavigate();

  const {data, error, isPending} = useAsync({promiseFn: getRooms});

  const createRoom = async () => {
    const {data} = await api.post('/createRoom');
    setRoom(() => data.room);
    navigate(`/room`);
  }

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
        <input type="button" value="create room" onClick={createRoom} />
        {data.map((room) => (<JoinRoomButton room={room} key={room.roomId} />))}
      </div>
    );
  }
  else {
    return null;
  }
}
