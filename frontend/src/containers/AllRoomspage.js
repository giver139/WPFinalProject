import Title from "../components/Title";
import {Input, Button} from "antd";
import SearchBox from "../components/SearchBox";
import {useState, useEffect} from "react";
import ConfirmButton from '../components/ConfirmButton';
import {joinRoomApi, listRoomsApi} from '../api'
import Gamepage from "./Gamepage";
import SearchButton from "../components/SearchButton";
import { RequireLoginError , InternalServerError, RoomIdNotFoundError } from "../error";
import MyRoompage from "./MyRoompage";
import { Card } from "antd";
import { useWebsocket, ConnectionState, WebSocketState } from '../useWebsocket';
import "./button.css";
import "./Box.css";

const AllRoomspage = ({username}) => {

  const myStyle = {
    backgroundImage: "url('https://pic.52112.com/180317/180317_143/n4SNygWU7T_small.jpg')",
    backgroundSize: 'contain',
    height: '720px',
  };

  const [roomId, setRoomId] = useState('');
  const [roomID, setRoomID] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [idCorrect, setIdCorrect] = useState(false);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [rooms, setRooms] = useState([]);

  const handleNewRoom = (newRoom) => {
    setRooms([...rooms, newRoom]);
  };

  const handleCloseRoom = (closedRoomId) => {
    setRooms(rooms.filter((room) => room.roomId !== closedRoomId));
  };

  const {state, sendConnectionState} = useWebsocket({handleNewRoom, handleCloseRoom});
  const [enterRoom, setEnterRoom] = useState(null);

  useEffect(() => {
    if (state === WebSocketState.OPEN) {
      sendConnectionState(ConnectionState.MAIN);
    }
  }, [state]);

  useEffect(async () => {
    const {rooms} = await listRoomsApi();
    setRooms([...rooms]);
  }, []);

  const handleOnClick = async (selectedRoomId) => {
    try {
      const {room} = await joinRoomApi(selectedRoomId);
      setEnterRoom(room);
      setPlayer1(room.players[0])
      setPlayer2(room.players[1])
      setRoomID(room.roomId);
      setIdCorrect(true);
    } catch(error) {
      if(error instanceof InternalServerError) {
        console.log("Internal Server Error!!");
      }

      else if(error instanceof RequireLoginError) {
        alert("Please Log In Again!!!");
      }

      else if(error instanceof RoomIdNotFoundError) {
        alert("RoomId Not Found!!!");
      }
    }
  }

  const handleOnReverse = () => {
    setReverse(true);
  }

  const fonts = {
    fontSize: "30px",
  }

  if(idCorrect) {
    return (
      <MyRoompage username={username} host={player1} guest={player2} roomID={roomID} roomInfo={enterRoom}></MyRoompage>
    )
  }

  else if(reverse) {
    return (
      <Gamepage username={username}></Gamepage>
    )
  }

  else {
    return (
      <div className="roomspage" style={myStyle}>
        <Title>
          <h1>加入房間</h1>
        </Title>
        <div className="site-card-border-less-wrapper">
          {rooms.map((room) => (
            <Card title={`Room ID: ${room.roomId}`} bordered={false} style={{width: 800}} className="Box" key={JSON.stringify(room)}>
              <p style={fonts}>Players name: {room.players.join(', ')}</p>
              <SearchButton><Button onClick={() => {handleOnClick(room.roomId);}}>加入</Button></SearchButton>
            </Card>
          ))}
        </div>
        <ConfirmButton>
            <Button onClick={handleOnReverse}>返回</Button>
        </ConfirmButton>
      </div>
    )
  }
};

export default AllRoomspage;
