import React, {useState, useRef} from 'react';
import {Button, Input} from 'antd';
import CreateRoom from '../components/Createroom';
import JoinRoom from '../components/Joinroom';
import Title from '../components/Title';
import MyRoompage from './MyRoompage';
import AllRoomspage from './AllRoomspage';
import { createRoomApi } from '../api';
import { RequireLoginError, InternalServerError } from '../error';

const Gamepage = ({username}) => {

  const myStyle = {
    backgroundImage: "url('https://pic.52112.com/180317/180317_143/n4SNygWU7T_small.jpg')",
    backgroundSize: 'cover',
    height: '675px',
  };

  const [joined, setJoined] = useState(false);
  const [created, setCreated] = useState(false);
  const [roomID, setRoomID] = useState(-1);
  const [host, setHost] = useState("");

  const handleOnJoin = () => {
    setJoined(true);
  }

  const handleOnCreate = async () => {
    try {
      const {room} = await createRoomApi();
      setRoomID(room.roomId);
      setHost(room.players[0]);
      setCreated(true);
    } catch(error) {
      if(error instanceof InternalServerError) {
        console.log("Internal Server Error!!");
      }

      else if(error instanceof RequireLoginError) {
        console.log("Please Log In Again!!!");
      }
    }
  }

  if(created) {
    return (
      <MyRoompage username={username} roomID = {roomID} host = {host}></MyRoompage>
    )
  }

  else if(joined) {
    return (
      <AllRoomspage username={username}></AllRoomspage>
    )
  }

  else {
    return (
      <div className='Gamepage' style = {myStyle}>
        <Title>
          <h1>開始遊戲</h1>
        </Title>
        <CreateRoom>
          <Button onClick={handleOnCreate}>創建房間</Button>
        </CreateRoom>
        <JoinRoom>
          <Button onClick={handleOnJoin}>加入房間</Button>
        </JoinRoom>
      </div>
    )
  }
}

export default Gamepage;
