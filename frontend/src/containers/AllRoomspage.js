import Title from "../components/Title";
import {Input, Button} from "antd";
import SearchBox from "../components/SearchBox";
import {useState} from "react";
import ConfirmButton from '../components/ConfirmButton';
import {joinRoomApi} from '../api'
import Gamepage from "./Gamepage";
import SearchButton from "../components/SearchButton";
import { RequireLoginError , InternalServerError, RoomIdNotFoundError } from "../error";
import MyRoompage from "./MyRoompage";
import { Card } from "antd";
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

  const handleOnClick = async () => {
    if(roomId !== "") {
      try {
        const {room} = await joinRoomApi(roomId);
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
  }

  const handleOnReverse = () => {
    setReverse(true);
  }

  const fonts = {
    fontSize: "30px",
  }

  if(idCorrect) {
    return (
      <MyRoompage username={username} host={player1} guest={player2} roomID={roomID}></MyRoompage>
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
          <Card title="Room ID: 0" bordered={false} style={{width: 800}} className="Box">
            <p style={fonts}>Player name: {username}</p>
            <SearchButton><Button onClick={handleOnClick}>加入</Button></SearchButton>
          </Card>
        </div>
        <ConfirmButton>
            <Button onClick={handleOnReverse}>返回</Button>
        </ConfirmButton>
      </div>
    )
  }
};

export default AllRoomspage;
