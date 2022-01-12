import Title from "../components/Title";
import ConfirmButton from "../components/ConfirmButton";
import { Button } from "antd";
import {useState} from "react";
import BoardPage from "./Boardpage";
import Gamepage from "./Gamepage";
import { useContext } from "react";
import { leaveRoomApi, startGameApi } from "../api";

const MyRoompage = () => {

  const [startGame, setStartGame] = useState(false);
  const [leave, setLeave] = useState(false);

  const myStyle = {
    backgroundImage: "url('https://pic.52112.com/180317/180317_143/n4SNygWU7T_small.jpg')",
    backgroundSize: 'cover',
    height: '675px',
  };

  const [roomId, setRoomId] = useState(0);

  const handleOnStart = async () => {
    try {
      const {game} = await startGameApi(roomId) ;
      setStartGame(true);
    } catch(error) {
      
    }
  }

  const handleOnLeave = async () => {
    try {
      await leaveRoomApi(roomId);
      setLeave(true);
    } catch(error) {

    } 
  }

  if(startGame) {
    return (
      <BoardPage></BoardPage>
    )
  }

  else if(leave) {
    return (
      <Gamepage></Gamepage>
    )
  }

  else { 
    return (
      <div className="roomspage" style={myStyle}>
        <Title>
          <h1>我的房間</h1>
        </Title>
        <Title>
          <h2>Room ID: {}</h2>
        </Title>
        <ConfirmButton>
          <Button onClick={handleOnStart}>開始遊戲</Button>
          <Button onClick={handleOnLeave}>離開房間</Button>
        </ConfirmButton>
      </div>
    )
  }
};

export default MyRoompage;