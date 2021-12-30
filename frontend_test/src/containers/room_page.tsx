import {useNavigate} from 'react-router-dom';
import {usePage} from '../hooks/use_page';
import {api} from '../api';

export function RoomPage() {
  const {room, setRoom, setGame} = usePage();
  const navigate = useNavigate();

  const leaveRoom = async () => {
    if(!room) {
      throw new Error('room not found');
    }
    await api.post(`/leaveRoom/${room.roomId}`);
    setRoom(() => null);
    navigate('/main');
  };

  const startGame = async () => {
    if(!room) {
      throw new Error('room not found');
    }
    const {data} = await api.post(`/startGame/${room.roomId}`);
    setGame(() => data.game);
    setRoom(() => null);
    navigate('/game');
  };

  return (
    <div>
      <h1>Room</h1>
      {`${room}`}
      <input type="button" value="leave room" onClick={leaveRoom} />
      <input type="button" value="start game" onClick={startGame} />
    </div>
  );
}
